import {getEventTransfer, Plugin} from "slate-react";
import Html from "slate-html-serializer";
import {from, zip} from "rxjs";
import {filter, first, map, toArray} from "rxjs/operators";

/**
 * args: document: Document(slatejs)
 */
export const COMMAND_PASTE = "paste-command";

/**
 * args: files: Array<DataTransferItem>
 */
export const COMMAND_PASTE_FILE = "paste-file-command";

export function createCopyPaste(plugins: Array<Plugin>): Plugin {
    const serializer = new Html({rules: []});

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
            const items = from(event.clipboardData.items);
            const types = from(event.clipboardData.types);

            const data = zip(items, types).pipe(
                map(([item, type]) => ({item, type}))
            );

            // file
            data.pipe(
                filter(d => d.type == 'file'),
                map(d => d.item),
                toArray(),
            ).subscribe(files => {
                editor.command(COMMAND_PASTE_FILE, files);
            });

            // text
            data.pipe(
                filter(d => d.type != 'file'),
                map(d => d.item),
                first(),
            ).subscribe(item => {
                item.getAsString(str => {
                    const value = serializer.deserialize(str);
                    editor.command(COMMAND_PASTE, value);
                })
            });

            event.preventDefault();
        },
    }
}