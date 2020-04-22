import {Extension} from "../Extension";
import React from "react";
import url from "./Mechanical-Keyboard-single-button-presses-8-www.FesliyanStudios.com.mp3";

export function createKeySoundPlugin(): Extension {
    return {
        id: "core.key.sound",
        title: "节奏打击",
        // language=Markdown
        desc: "模拟机械键盘打字声音\uD83D\uDE06",
        init: context => {
            context.registerHook({
                containerId: 'app.more.settings',
                priority: 0,
                hookId: 'keysound.settings.switch',
                title: 'KeySound',
                hook: (props: any) => {
                    // factory(title, value, onChange) => ReactNode
                    const value = context.getSetting("switch");
                    return props.factory("KeySound", value, (state) => {
                        context.setSetting("switch", state);
                    })
                }
            });

            context.registerHook({
                containerId: 'internal.render.content',
                title: 'KeyStrokeSound',
                hookId: 'internal.render.content-key.stroke',
                priority: 0,
                hook: (content) => {
                    const on = context.getSetting("switch");

                    if (!on) {
                        return content;
                    }
                    return <div className='key-stroke' style={{
                        height: '100%',
                    }} onKeyPress={e => {
                        if (on && e.key.match(/^[a-zA-Z]$/)) {
                            const audio = new Audio(url);
                            audio.play();
                        }
                    }}>
                        {content}
                    </div>
                }
            })
        }
    };
};