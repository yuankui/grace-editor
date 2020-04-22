import {Extension} from "../Extension";
import React from "react";
import {createSlateFocusModePlugin} from "./createSlateFocusModePlugin";
import isHotkey from "is-hotkey";
import {notify} from "../../app/message/message";

export function createFocusModePlugin(): Extension {
    return {
        id: "core.focus.mode",
        title: "Focus Mode",
        // language=Markdown
        desc: "### 开启专注模式，安静，认真地写作吧.\n快捷键\n\n- window: `alt`+`enter`\n- mac: `cmd`+`enter`",
        init: context => {
            // 监听全屏事件
            context.electron.remote.getCurrentWindow()
                .on('enter-full-screen', () => {
                    context.setState('on', true);
                });
            context.electron.remote.getCurrentWindow()
                .on('leave-full-screen', () => {
                    context.setState('on', false);
                });


            context.registerHook({
                containerId: 'app.more.settings',
                priority: 0,
                hookId: 'app.more.settings.focusMode.switch',
                title: 'FocusMode',
                hook: (props: any) => {
                    // factory(title, value, onChange) => ReactNode
                    const value = context.getState("on");
                    return props.factory("FocusMode", value, (state) => {
                        setTimeout(() => {
                            context.electron.remote.getCurrentWindow().setFullScreen(!!state);
                        }, 100);
                        context.setState("on", state);
                    })
                }
            });

            // 动态调整当前行位置到中间
            context.registerHook({
                containerId: 'internal.render.content',
                priority: 0,
                hookId: 'app.content.render.focusMode',
                title: 'FocusMode',
                hook: (content: any) => {
                    if (!context.getState('on')) {
                        return content;
                    }
                    return <div className='focus-mode-container'>
                        <div className='focus-mode-scroll'>{content}</div>
                    </div>
                }
            });

            // 高亮当前行
            context.registerHook({
                containerId: 'hookId.slate.render.block',
                priority: 0,
                hookId: 'hookId.slate.render.block-focusMode',
                title: 'FocusMode',
                hook: () => {
                    if (!context.getState('on')) {
                        return undefined;
                    }
                    return createSlateFocusModePlugin().renderBlock;
                },
            });

            setInterval(() => {
                // 如果focusMode开启
                if (context.getState('on')) {
                    const selectionRect = window.getSelection()?.getRangeAt(0).getClientRects().item(0);
                    if (selectionRect == null) return;

                    const container = document.getElementsByClassName('focus-mode-scroll')?.item(0) as HTMLElement;
                    if (container == null) {
                        return;
                    }

                    const containerRect = container.getClientRects().item(0);
                    if (containerRect == null) return;

                    const bodyHeight = document.body.getBoundingClientRect().height;

                    container.style.top = `${containerRect.y + bodyHeight / 2 - selectionRect.y}px`;
                }
            }, 200);

            // toggle最大化窗口
            window.addEventListener('keydown', e => {
                if (isHotkey('mod+enter', e)) {
                    const isFocus = context.getState('on');

                    context.electron.remote.getCurrentWindow()
                        .setFullScreen(!isFocus);

                    if (!isFocus) {
                        setTimeout(()=> {
                            notify("title-enter");
                        }, 1000);
                    }
                }
            })
        }
    }
}