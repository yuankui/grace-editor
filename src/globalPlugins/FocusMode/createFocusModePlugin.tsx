import {GlobalPlugin} from "../GlobalPlugin";
import React from "react";

export function createFocusModePlugin(): GlobalPlugin {
    return {
        init: context => {
            // 监听全屏事件
            context.electron.remote.getCurrentWindow()
                .on('enter-full-screen', () => {
                    context.setSetting('pluginId.FocusMode', 'on', true);
                });
            context.electron.remote.getCurrentWindow()
                .on('leave-full-screen', () => {
                    context.setSetting('pluginId.FocusMode', 'on', false);
                });


            context.registerHook({
                containerId: 'app.more.settings',
                priority: 0,
                hookId: 'app.more.settings.focusMode.switch',
                title: 'FocusMode',
                hook: (props: any) => {
                    // factory(title, value, onChange) => ReactNode
                    const value = context.getSetting("pluginId.FocusMode", "on");
                    return props.factory("FocusMode", value, (state) => {
                        setTimeout(() => {
                            context.electron.remote.getCurrentWindow().setFullScreen(!!state);
                        }, 100);
                        context.setSetting("pluginId.FocusMode", "on", state);
                    })
                }
            });

            context.registerHook({
                containerId: 'internal.render.content',
                priority: 0,
                hookId: 'app.content.render.focusMode',
                title: 'FocusMode',
                hook: (content: any) => {
                    return <div className='focus-mode-container'>
                        <div id='focus-mode-rect' style={{
                            position: 'fixed'
                        }}></div>
                        <div className='focus-mode-scroll'>{content}</div>
                    </div>
                }
            });

            window.addEventListener('keydown', e => {
                const rect = window.getSelection()?.getRangeAt(0).getClientRects().item(0);
                let ele = document.getElementById('focus-mode-rect');
                if (ele != null && rect != null) {
                    ele.style.top = `${rect.top}px`;
                    ele.style.height = `${rect.height}px`;

                    ele.style.left = `100px`;
                    ele.style.width = `200px`;
                }

                console.log('rect', rect);
            })
        }
    }
}