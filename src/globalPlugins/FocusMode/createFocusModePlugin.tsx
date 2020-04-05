import {GlobalPlugin} from "../GlobalPlugin";
import React from "react";

export function createFocusModePlugin(): GlobalPlugin {
    return {
        init: context => {
            // 监听全屏事件
            context.electron.remote.getCurrentWindow()
                .on('enter-full-screen', () => {
                    context.setState('pluginId.FocusMode', 'on', true);
                });
            context.electron.remote.getCurrentWindow()
                .on('leave-full-screen', () => {
                    context.setState('pluginId.FocusMode', 'on', false);
                });


            context.registerHook({
                containerId: 'app.more.settings',
                priority: 0,
                hookId: 'app.more.settings.focusMode.switch',
                title: 'FocusMode',
                hook: (props: any) => {
                    // factory(title, value, onChange) => ReactNode
                    const value = context.getState("pluginId.FocusMode", "on");
                    return props.factory("FocusMode", value, (state) => {
                        setTimeout(() => {
                            context.electron.remote.getCurrentWindow().setFullScreen(!!state);
                        }, 100);
                        context.setState("pluginId.FocusMode", "on", state);
                    })
                }
            });

            context.registerHook({
                containerId: 'internal.render.content',
                priority: 0,
                hookId: 'app.content.render.focusMode',
                title: 'FocusMode',
                hook: (content: any) => {
                    if (!context.getState('pluginId.FocusMode', 'on')) {
                        return content;
                    }
                    return <div className='focus-mode-container'>
                        <div className='focus-mode-scroll'>{content}</div>
                    </div>
                }
            });

            setInterval(() => {
                // 如果focusMode开启
                if (context.getState('pluginId.FocusMode', 'on')) {
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
        }
    }
}