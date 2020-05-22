import React, {FunctionComponent, useEffect, useMemo, useState} from 'react';
import {useListener, useNotifier} from "../hooks/useListener";
import {useNodeContext} from "./NodeContext";
import {Size} from "../model/Size";
import isHotkey from "is-hotkey";

interface Props {
    onAreaChange: (area: Size) => void,
}

const NodeText: FunctionComponent<Props> = (props) => {
    const nodeContext = useNodeContext();
    const {id: nodeId, text} = nodeContext.nodeConf;
    const {
        textSize: size,
        textPos: leftPos,
        onNodeConfChange,
        nodeStyle,
        select,
    } = nodeContext;

    const {fontSize} = nodeStyle;
    // 显示文本
    const [showTextEdit, setShowTextEdit] = useState(false);

    useListener("NodeDoubleClick", (type, id) => {
        if (id === nodeId) {
            setShowTextEdit(true);
        } else {
            setShowTextEdit(false);
        }
    });

    useListener('BoardClick', () => {
        setShowTextEdit(false);
    });
    const texts = text.split('\n');
    let lineCount = texts.length;

    // 文字
    // TODO 通过state保存refs
    const refs = useMemo(() => [] as Array<SVGTextElement | null>, []);

    useEffect(() => {
        let maxWidth = 0;
        let totalHeight = 0;
        for (let i = 0; i < lineCount; i++) {
            const ref = refs[i];
            if (ref == null) {
                return;
            }
            const rect = ref.getClientRects()[0];
            maxWidth = Math.max(rect.width, maxWidth);
            totalHeight += rect.height;
        }

        props.onAreaChange({
            width: maxWidth,
            height: totalHeight,
        })
    }, [size.width, size.height, lineCount, text]);

    let notifier = useNotifier();
    const textElement = texts.map((t, i) => {
        let textY = leftPos.y + fontSize * (i - lineCount / 2 + 0.5);
        return <React.Fragment key={i}>
            <text fontSize={fontSize}
                  key={i}
                  ref={ref => {
                      refs[i] = ref;
                  }}
                  dominantBaseline={'middle'} // https://stackoverflow.com/questions/5546346/how-to-place-and-center-text-in-an-svg-rectangle
                  onDoubleClick={e => {
                      setShowTextEdit(true);
                      e.stopPropagation();
                  }}
                  onClick={e => {
                      e.stopPropagation();
                      notifier('NodeClick', nodeId);
                  }}
                  x={leftPos.x}
                  y={textY}>
                {t}
            </text>
            {/*<circle cx={leftPos.x} cy={textY} r={2} fill='red'/>*/}
        </React.Fragment>;
    });


    useListener('EditNode', () => {
        if (select) {
            setShowTextEdit(!showTextEdit);
        }
    }, [select, showTextEdit]);

    const editY = leftPos.y - size.height / 2;
    const textEditInput = !showTextEdit ? null :
        <foreignObject x={leftPos.x} y={editY} width={size.width + 6} height={size.height}>
        <textarea style={{height: size.height, width: size.width + 12, fontSize: fontSize - 2}} // 这里fontSize-2，以解决text和textarea字体不一致的情况
                  ref={e => {
                      const textarea = e as any;
                      if (textarea == null) return;
                      textarea.style.height = textarea.scrollHeight + "px";
                      textarea.focus();
                  }}
                  onChange={e => {
                      const value = e.target.value;
                      onNodeConfChange({
                          ...nodeContext.nodeConf,
                          text: value,
                      })
                  }}
                  onKeyDown={e=> {
                      if (isHotkey('mod+enter', e.nativeEvent)) {
                          setShowTextEdit(false);
                      }
                      // 阻断自检发给window，全局，防止删除节点
                      e.stopPropagation();
                  }}
                  onMouseDown={e => {
                      e.stopPropagation();
                  }}
                  onClick={e => {
                      e.stopPropagation();
                  }}
                  onInput={e => {
                      const textarea = e.target as any;
                      textarea.style.height = textarea.scrollHeight + "px";
                  }} defaultValue={text}/>
        </foreignObject>;
    return <>
        {textElement}
        {textEditInput}
    </>;
};

export default NodeText;