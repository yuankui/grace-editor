import {Field} from "./Field";
import {Detail} from "./Detail";
import path from 'path';
import {PkField} from "./PkField";
import {ReverseMap} from "./ReverseMap";
import {IdMap} from "./IdMap";
import {SearchReq} from "./SearchReq";
import {HookRegister} from "./HookRegister";
import {Filter} from "./Filter";
import {RoaringBitmap32} from "roaring";
import * as rxjs from "rxjs";
import {take, toArray} from "rxjs/operators";
import {HookRegisterConsumer} from "./HookRegisterConsumer";
import {createBooleanFieldSupporter} from "./field-types/boolean-type/createBooleanFieldSupporter";
import {createIntegerFieldSupporter} from "./field-types/int-type/createIntegerFieldSupporter";
import {createListFieldSupporter} from "./field-types/list-type/createListFieldSupporter";
import {createStringFieldSupporter} from "./field-types/string-type/createStringFieldSupporter";

export class Index<T = any> {
    private path: string;
    private readonly fields: Array<Field>;
    private pkField: PkField;
    private detail: Detail;
    private reverseMap: ReverseMap;
    private idMap: IdMap;
    private readonly hookRegister: HookRegister;
    private readonly filters: Array<Filter>;
    private readonly fieldSupporters: Array<HookRegisterConsumer>;

    constructor(dir: string) {
        this.hookRegister = new HookRegister();
        this.path = dir;
        this.fields = [];
        this.detail = new Detail(path.join(dir, 'detail'));
        this.pkField = new PkField<T>();
        this.reverseMap = new ReverseMap(path.join(dir, 'reverse'));
        this.idMap = new IdMap(path.join(dir, 'id_map'));
        this.filters = [];
        this.fieldSupporters = [
            createBooleanFieldSupporter(),
            createIntegerFieldSupporter(),
            createListFieldSupporter(),
            createStringFieldSupporter(),
        ]
    }

    async init() {
        await this.detail.init();

        // TODO 这是干啥的？
        for (let field of this.fields) {
            await field.init(this.hookRegister);
        }

        for (let filter of this.filters) {
            await filter.init(this.hookRegister);
        }

        // field supporters
        for (let fieldSupporter of this.fieldSupporters) {
            await fieldSupporter.init(this.hookRegister);
        }
    }

    static async open(path: string): Promise<Index> {
        const index = new Index(path);
        await index.init();
        return index;
    }

    async jsonSearch(query: SearchReq): Promise<Array<T>> {
        const hooks = this.hookRegister.getHooks("hook.filter");

        const hook = hooks.find(hook => {
            return hook.hook.accept(query.where);
        });

        if (hook == null) {
            throw new Error("unsupported where: " + JSON.stringify(query.where));
        }

        // 获取bitmap
        const bitmap: RoaringBitmap32 = hook.hook.filter(query.where);

        // 拉取详情
        return new Promise<any>((resolve, reject) => {
            rxjs.from(bitmap.iterator())
                .pipe(
                    take(100),
                    toArray(),
                )
                .subscribe(array => {
                    resolve(array);
                }, error => {
                    reject(error);
                })
        })
    }

    async get(docId: string): Promise<T> {
        return await this.detail.get(docId);
    }

    async add(doc: T) {
        const pk = this.pkField.getPK(doc);
        const id = await this.idMap.getOrCreate(pk, 'pk');
        // 1. 加入详情
        this.detail.add(pk, doc);
        // 2. 解析字段
        for (let f of this.fields) {
            const fieldName = f.name;
            // 3. 构造索引
            const tokens = f.parse(doc);

            // 构造倒排key
            const keys = tokens.map(token => {
                return `inverse_${fieldName}_${token}`;
            });

            // 4. 写入索引
            for (let key of keys) {
                const bitmap = await this.reverseMap.get(key);
                bitmap.add(id);
                await this.reverseMap.set(key, bitmap);
            }
        }
    }

    async delete(docId: string) {
        // 1. 获取详情
        const doc = await this.detail.get(docId);
        const pk = this.pkField.getPK(doc);
        const id = await this.idMap.getOrCreate(pk, 'pk');

        // 2. 根据详情，解析倒排
        for (let f of this.fields) {
            const fieldName = f.name;
            // 3. 构造索引
            const tokens = f.parse(doc);

            // 构造倒排key
            const keys = tokens.map(token => {
                return `inverse_${fieldName}_${token}`;
            });

            for (let key of keys) {
                const bitmap = await this.reverseMap.get(key);
                bitmap.remove(id);
                // 3. 删除倒排
                await this.reverseMap.set(key, bitmap);
            }
        }
        // 4. 删除详情
        await this.detail.remove(pk);
    }
}