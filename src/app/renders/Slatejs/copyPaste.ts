import {getEventTransfer, Plugin} from "slate-react";
import Html, {Rule} from "slate-html-serializer";
import {ClipboardData, ProcessClipboard} from "./serde";
import _ from 'lodash';

function createRules(plugins: Array<any>): Array<Rule> {
    return plugins.filter(p => p.rule != null)
        .map(p => p.rule);
}

function getPasteProcessors(plugins: Array<any>): Array<ProcessClipboard> {
    return plugins.filter(p => p.paste != null)
        .map(p => p.paste);
}

export function createCopyPaste(plugins: Array<Plugin>): Plugin {
    const serializer = new Html({rules: createRules(plugins)});
    const pasteProcessor = getPasteProcessors(plugins);

    return {
        onCopy: (event, editor, next) => {
            event.preventDefault();
            const transfer = getEventTransfer(event);
            if (transfer.type !== 'html') return next();

            const html: any = (transfer as any).html;
            const {document} = serializer.deserialize(html);
            editor.insertFragment(document);
            const fragment = editor.value.fragment;
            console.log('fragment', fragment.text);

            next();
        },
        // paste 只能上全局性的，不能是插件式的
        onPaste: (event, editor, next) => {
            let data = [] as Array<ClipboardData>;

            const items = event.clipboardData.items;
            const types = event.clipboardData.types;
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const type = types[i];
                data.push({
                    item,
                    type,
                })
            }

            // 先进行 html 解析，然后再把剩余的交给下游处理
            const remain = [];
            for (let one of data) {
                if (one.type.toLowerCase() === "text/html") {
                    processed.push(one);
                    one.item.getAsString(s => {
                        const transfer: any = {
                            html: s,
                            type: 'html',
                        };
                        const {document} = serializer.deserialize(transfer.html);
                        editor.insertFragment(document);
                    })
                } else {
                    remain.push(one);
                }
            }

            data = remain;

            for (let processor of pasteProcessor) {
                if (data == null || data.length == 0) {
                    break;
                }

                data = processor(data, editor);
            }
            event.preventDefault();
        },
    }
}