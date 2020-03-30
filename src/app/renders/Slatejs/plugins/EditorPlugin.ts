import {Editor, Plugin} from 'slate-react';

export interface EditorPlugin extends Plugin {

    // plugin name
    onPasteText?(str: string, type: string, editor: Editor, next: () => void);
    name: string,
    [key: string]: any,
}