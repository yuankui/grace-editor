import {FunctionRender} from "../renders";
import React, {useMemo, useState} from "react";
import {Editor} from "slate-react";
import {Value, ValueJSON} from "slate";
import createSlateEditorPlugins from "./plugins/plugins";
import {AppStore} from "../../../redux/store";
import {debug} from "../../../utils/debug";
import {BlockParagraph} from "./plugins/common";
import {createCopyPaste} from "./paste/copyPaste";
import {lazyExecute} from "../../../utils/lazyExecute";
import {useDispatch, useStore} from "react-redux";
import {useRefMessage} from "../../message/message";
import {createSlateFocusModePlugin} from "../../../globalPlugins/FocusMode/createSlateFocusModePlugin";
import {usePluginHooks} from "../../../globalPlugins/usePluginHooks";

export interface GetState {
    (): AppStore,
}

const defaultValue: ValueJSON = {
    document: {
        object: "document",
        nodes: [
            {
                object: 'block',
                type: BlockParagraph,
                nodes: [
                    {
                        object:'text',
                        text: '',
                    }
                ]
            }
        ],
    }
};
const SlatejsRender: FunctionRender = props => {

    const [value, setValue] = useState(Value.fromJSON(props.value ? props.value : defaultValue));
    const store = useStore();
    const dispatch = useDispatch();
    const [plugins,copyPaste, lazySave] = useMemo(() => {
        const plugins = createSlateEditorPlugins(() => store.getState(), dispatch);
        const copyPaste = createCopyPaste(plugins);
        const lazySave = lazyExecute((value: Value) => {
            debug(() => {
                // console.log('value, ', JSON.stringify(value.toJSON()));
            });
            props.onChange(value.toJSON());
        }, 100);
        return [
            plugins,
            copyPaste,
            lazySave,
        ]
    }, []);

    const onChange = (v: Value) => {
        setValue(v);
        lazySave(v);
    };

    const ref = useRefMessage<any, Editor>('title-enter', (editor, data) => {
        editor?.focus();
    });

    // find first. TODO 支持链式封装，多个book同时生效
    let renderBlock = usePluginHooks('hookId.slate.render.block').find(()=> true)?.hook();
    const attrs = renderBlock ? {
        renderBlock,
    } : {};

    return <Editor value={value}
                   ref={ref}
                   className='slate-editor'
                   placeholder="Start from here..."
                   plugins={plugins}
                   {...attrs}
                   readOnly={!!props.readOnly}
                   onPaste={copyPaste.onPaste}
                   onCopy={copyPaste.onCopy}
                   commands={copyPaste.commands}
                   onChange={e => onChange(e.value)}/>
};

export default SlatejsRender;