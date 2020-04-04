import {GlobalPlugin} from "../GlobalPlugin";
import React from "react";

export const createKeySoundPlugin = () => {
    return {
        init: context => {
            context.registerHook({
                containerId: 'app.more.settings',
                priority: 0,
                hookId: 'keysound.settings.switch',
                title: 'KeySound',
                hook: (props: any) => {
                    // factory(title, value, onChange) => ReactNode
                    const value = context.getSetting("pluginId.keySound", "switch");
                    return props.factory("KeySound", value, (state) => {
                        context.setSetting("pluginId.keySound", "switch", state);
                    })
                }
            })
        }
    } as GlobalPlugin;
};