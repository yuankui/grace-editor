import {getEventTransfer, Plugin} from "slate-react";
import Html, {Rule} from "slate-html-serializer";
import {ClipboardData, ProcessClipboard} from "./serde";

function createRules(plugins: Array<any>): Array<Rule> {
    return plugins.filter(p => p.rule != null)
        .map(p => p.rule);
}

function getPasteProcessors(plugins: Array<any>): Array<ProcessClipboard> {
    return plugins.filter(p => p.paste != null)
        .map(p => p.paste);
}

/**
 * 猴子补丁，如果又 text/html，就去掉 text/plain,否则就会出现重复插入
 * @param data
 */
function filter(data: Array<ClipboardData>) {

    const hasHtml = data.some(d => d.type === 'text/html');
    if (hasHtml) {
        return data.filter(d => d.type !== 'text/plain');
    }
    return data;
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

                item.getAsString(s => {
                    console.log('item', s);
                });
                data.push({
                    item,
                    type,
                })
            }

            data = filter(data);

            // 先进行 html 解析，然后再把剩余的交给下游处理
            const remain: Array<ClipboardData> = [];
            for (let one of data) {
                if (one.type.toLowerCase() === "text/html") {
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