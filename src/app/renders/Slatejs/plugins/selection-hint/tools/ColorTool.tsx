import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {Color, HighlightMarkType, RemoveColorCommand, ToggleColorCommand} from "../../highlight/HighlightPlugin";
import {Dropdown, Icon, Popover} from "antd";
import {Dispatch} from "redux";
import {ToggleHighlightColorCommand} from "../../../../../../redux/commands/slatejs/color/ToggleHighlightColorCommand";
import {GetState} from "../../../SlatejsRender";
import {useDispatch} from "react-redux";

export function createColorTool(getState: GetState, dispatch: Dispatch<any>): Tool {
    return {
        hint: 'Highlight',
        isActive(editor: Editor): boolean {
            const {focus, anchor} = editor.value.selection;
            const marks = editor.value.document.getMarksAtRange({
                focus,
                anchor,
            });
            const active = marks != null && marks.toArray()
                .some(m => m && m.type === HighlightMarkType);
            return active;
        },
        dynamicTitle: editor => {
            return <Dropdown trigger={["click", "hover"]} overlay={<ColorBoxes editor={editor}/>}>
              <span style={{
                  backgroundColor: '#EAE4F2',
                  display: 'inline-block',
                  padding: '0px 6px',
                  lineHeight: '20px',
              }}>A</span>
            </Dropdown>;
        },
        hotkey: 'meta+shift+m',
        action(editor: Editor): void {

        }
    }
}

const colors: Array<Color> = [
    {
        background: '#F4DFEB', color: 'black',
    },
    {
        background: '#DDECEA', color: 'black',
    },
    {
        background: '#EAE4F2', color: 'black',
    },
    {
        background: '#AD1A72', color: 'white',
    },
    {
        background: '#076E99', color: 'white',
    }
];

export const ColorBoxes = ({editor}) => {
    const boxes = colors.map(c => {
        return <ColorBox editor={editor} color={c}/>
    });
    return <div className='app-color-box' onClick={e => {
        e.stopPropagation();
        e.preventDefault();
    }}>
        <ClearBox editor={editor}/>
        {boxes}
    </div>
};

const ColorBox = ({color, editor}) => {
    const dispatch = useDispatch();

    return <div className='app-color-box-outer' onClick={e => {
        e.stopPropagation();
    }}>
        <div className='app-color-box-inner'
             onClick={e => {
                 setTimeout(() => {
                     dispatch(new ToggleHighlightColorCommand(color));
                 }, 100);

                 (editor as Editor).command(ToggleColorCommand, color);
             }}
             style={{
                 backgroundColor: color.background,
             }}/>
    </div>
};

const ClearBox = ({editor}) => {
    return <div className='app-color-box-outer' onClick={e => {
        e.stopPropagation();
        e.preventDefault();
    }}>
        <div className='app-color-box-clear'
             onClick={e => {
                 (editor as Editor).command(RemoveColorCommand);
                 e.stopPropagation();
                 e.preventDefault();
             }}>
            <Icon type="stop"/>
        </div>
    </div>
};