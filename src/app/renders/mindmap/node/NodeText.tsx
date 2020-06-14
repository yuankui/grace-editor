import React, {FunctionComponent, useEffect, useMemo, useRef, useState} from 'react';
import {useNodeContext} from "./NodeContext";
import {Size} from "../model/Size";
import isHotkey from "is-hotkey";
import {useDrag} from "../dragdrop/hooks";
import {useMindMapContext} from "../context/MindMapContext";
import {computeGroupHeight} from "./computeGroupHeight";

interface Props {
}

const NodeText: FunctionComponent<Props> = (props) => {
    const {eventBus} = useMindMapContext();
    const nodeContext = useNodeContext();
    const {id: nodeId} = nodeContext.nodeConf;
    const {
        textPos: leftPos,
        onNodeConfChange,
        nodeStyle,
        select,
        nodeConf,
    } = nodeContext;

    const [text, setText] = useState(nodeConf.text);
    const [size, setSize] = useState<Size>({
        width: 100,
        height: 20,
    })

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

    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        eventBus.emit('RefreshNodeSize', {
            nodeId,
        })
    }, []);

    // 拖动节点
    const onMouseDown = useDrag(nodeConf);
    const editY = leftPos.y - size.height / 2;

    const textElement = <foreignObject x={leftPos.x} y={editY} width={size.width + 6} height={size.height}>
        <div style={{
            flexDirection: "column",
            overflow: "hidden",
            width: "900px",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
        }}>
            <div ref={textRef}
                 onDoubleClick={e => {
                     eventBus.emit('NodeDoubleClick', {
                         nodeId,
                     })
                     e.stopPropagation();
                 }}
                 onMouseDown={onMouseDown}
                 onClick={(e) => {
                     eventBus.emit('NodeClick', {
                         nodeId: nodeId,
                     })
                     e.stopPropagation();
                 }} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
            }}>
                {texts.map((t, i) => {
                    return <span key={i}>{t}</span>
                })}
            </div>
        </div>
    </foreignObject>;


    eventBus.useListener('RefreshNodeSize', event => {
        if (event.nodeId != nodeId) return;
        if (textRef.current) {
            const rect = textRef.current.getClientRects()[0];
            const s: Size = {
                width: Math.max(rect.width, 10),
                height: Math.max(rect.height, 20),
            }
            setSize(s)
            eventBus.emit('AdjustNodeSize', {
                nodeId,
                ...s,
            })
        }
    })

    eventBus.useListener("EditNode", (event, resolve) => {
        if (select) {
            setShowTextEdit(!showTextEdit);
        }
        resolve();
    }, [select, showTextEdit])

    const textEditInput = !showTextEdit ? null :
        <foreignObject x={leftPos.x}
                       y={editY}
                       width={size.width + 6}
                       height={size.height}>
        <textarea style={{
            height: size.height,
            width: size.width + 12,
            fontSize: fontSize,
        }}
                  ref={e => {
                      const textarea = e as any;
                      if (textarea == null) return;
                      textarea.style.height = textarea.scrollHeight + "px";
                      textarea.focus();
                  }}
                  onChange={e => {
                      const value = e.target.value;
                      setText(value);
                      eventBus.emit('RefreshNodeSize', {
                          nodeId,
                      })
                  }}
                  onBlur={e => {
                      onNodeConfChange(old => {
                          return {
                              ...old,
                              text: text,
                          }
                      });

                      setShowTextEdit(false);
                  }}
                  onKeyDown={e => {
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


    return <React.Fragment key={nodeId}>
        {textElement}
        {textEditInput}
    </React.Fragment>;
};

export default NodeText;