import {getEventTransfer, Plugin} from "slate-react";
import Html from "slate-html-serializer";
import {from} from "rxjs";
import {filter, reduce, toArray} from "rxjs/operators";
import {Document} from "slate";
import {Base64} from 'js-base64';

/**
 * args: document: Document(slatejs)
 */
export const COMMAND_PASTE = "paste-command";

/**
 * args: files: Array<DataTransferItem>
 */
export const COMMAND_PASTE_FILE = "paste-file-command";

function createCommandChain(command: string, plugins: Array<Plugin>) {
    return (editor, args) => {
        for (let plugin of plugins) {
            if (plugin.onCommand) {
                let next = false;
                plugin.onCommand({
                    type: command,
                    args: args,
                }, editor, () => {
                    next = true;
                });
                if (!next) {
                    break;
                }
            }
        }
        return editor;
    };
}

export function createCopyPaste(plugins: Array<Plugin>): Plugin {
    const serializer = new Html({rules: []});

    return {
        commands: {
            [COMMAND_PASTE]: createCommandChain(COMMAND_PASTE, plugins),
        },
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
            const items = from(event.clipboardData.items);

            // file
            items.pipe(
                filter(d => d.kind == 'file'),
                toArray(),
            ).subscribe(files => {
                if (files.length != 0) {
                    editor.command(COMMAND_PASTE_FILE, files);
                }
            });

            const supportedType: { [key: string]: number } = {
                'application/x-slate-fragment': 1,
                'text/html': 2,
                'text/plain': 3,
            };

            // text
            items.pipe(
                filter(d => d.kind == 'string'),
                reduce((v1, v2) => {
                    const order1 = supportedType[v1.type] || 99;
                    const order2 = supportedType[v2.type] || 99;
                    if (order2 < order1) {
                        return v2;
                    }
                    return v1;
                }),
            ).subscribe(item => {
                const itemType = item.type;
                item.getAsString(str => {
                    if (itemType == 'application/x-slate-fragment') {
                        const urlCode = Base64.decode(str);
                        const json = decodeURIComponent(urlCode);
                        const obj = JSON.parse(json);
                        const document = Document.fromJSON(obj);
                        editor.command(COMMAND_PASTE, document);
                    } else {
                        const value = serializer.deserialize(str);
                        editor.command(COMMAND_PASTE, value);
                    }
                })
            });

            event.preventDefault();
        },
    }
}