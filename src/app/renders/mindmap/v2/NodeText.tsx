import React, {FunctionComponent, useEffect, useMemo, useState} from 'react';
import isHotkey from "is-hotkey";
import {defaultRect, useMindMapContext} from "./MindMapContext";

interface Props {
    nodeId: string,
}

const NodeText: FunctionComponent<Props> = ({nodeId}) => {

    const {eventBus, nodeInfoMap} = useMindMapContext();
    const {value, rect = defaultRect} = nodeInfoMap.get(nodeId);
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
    const texts = value.text.split('\n');

    // 文字
    // TODO 通过state保存refs
    const refs = useMemo(() => [] as Array<SVGTextElement | null>, []);

    useEffect(() => {
        let maxWidth = 0;
        let totalHeight = 0;
        for (let i = 0; i < texts.length; i++) {
            const ref = refs[i];
            if (ref == null) {
                return;
            }
            const rect = ref.getClientRects()[0];
            maxWidth = Math.max(rect.width, maxWidth);
            totalHeight += rect.height;
        }

        eventBus.emit('NodeSizeChange', {
            nodeId,
            size: {
                width: maxWidth,
                height: totalHeight,
            },
        })
    }, []);

    const frame = <foreignObject x={rect.left} y={rect.top} width={rect.width} height={rect.height}>
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
    </foreignObject>;


    const textEditInput = !showTextEdit ? null :
        <foreignObject x={rect.left} y={rect.top} width={rect.width} height={rect.height}>
        <textarea autoFocus={true}
                  onChange={e => {
                      const value = e.target.value;
                      eventBus.emit('NodeTextChange', {
                          nodeId,
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
                  }} defaultValue={value.text}/>
        </foreignObject>;

    return <>
        {frame}
        {textEditInput}
    </>;
};

export default NodeText;
