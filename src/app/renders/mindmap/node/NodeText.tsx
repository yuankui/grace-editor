import React, {FunctionComponent, useEffect, useMemo, useState} from 'react';
import {useNodeContext} from "./NodeContext";
import {Size} from "../model/Size";
import isHotkey from "is-hotkey";
import {useDrag} from "../dragdrop/hooks";
import {useMindMapContext} from "../context/MindMapContext";

interface Props {
    onAreaChange: (area: Size) => void,
}

const NodeText: FunctionComponent<Props> = (props) => {
    const {eventBus} = useMindMapContext();
    const nodeContext = useNodeContext();
    const {id: nodeId, text} = nodeContext.nodeConf;
    const {
        textSize: size,
        textPos: leftPos,
        onNodeConfChange,
        nodeStyle,
        select,
        nodeConf,
    } = nodeContext;

    const {fontSize} = nodeStyle;
    // 显示文本
    const [showTextEdit, setShowTextEdit] = useState(false);

    eventBus.useListener("NodeDoubleClick", event => {
        if (event.nodeId === nodeId) {
            setShowTextEdit(true);
        } else {
            setShowTextEdit(false);
        }
    });

    eventBus.useListener('BoardClick', () => {
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
    }, [lineCount, text]);

    // 拖动节点
    const onMouseDown = useDrag(nodeConf);
    const editY = leftPos.y - size.height / 2;

    const textElement = <foreignObject x={leftPos.x} y={editY} width={size.width + 6} height={size.height}>
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                {texts.map((t) => {
                    return <span>{t}</span>
                })}
            </div>
        </div>
    </foreignObject>


    useEffect(() => {
        const listener = () => {
            if (select) {
                setShowTextEdit(!showTextEdit);
            }
        };
        eventBus.on('EditNode', listener)
        return () => eventBus.off("EditNode", listener);
    }, [select, showTextEdit]);

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
                      onNodeConfChange(old => {
                          return {
                              ...old,
                              text: value,
                          }
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