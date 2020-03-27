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
import {useLazyMessage} from "../../hooks/useMessage";


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
                console.log('value, ', JSON.stringify(value.toJSON()));
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

    const setConsumer = useLazyMessage('title-enter');
    return <Editor value={value}

                   ref={editor => {
                       setConsumer(data => {
                           editor?.focus();
                       })
                   }}
                   className='slate-editor'
                   placeholder="Start from here..."
                   plugins={plugins}
                   renderBlock={(props, editor, next) => {
                       if (props.node.type === BlockParagraph) {
                           return <div className={BlockParagraph} {...props.attributes}>
                               {props.children}
                           </div>
                       }
                       return next();
                   }}
                   readOnly={!!props.readOnly}
                   onPaste={copyPaste.onPaste}
                   onCopy={copyPaste.onCopy}
                   commands={copyPaste.commands}
                   onChange={e => onChange(e.value)}/>
};

export default SlatejsRender;