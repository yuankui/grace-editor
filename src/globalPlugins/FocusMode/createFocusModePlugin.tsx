import {GlobalPlugin} from "../GlobalPlugin";

export function createFocusModePlugin(): GlobalPlugin {
    return {
        init: context => {
            context.registerHook({
                containerId: 'app.more.settings',
                priority: 0,
                hookId: 'app.more.settings.focusMode.switch',
                title: 'FocusMode',
                hook: (props: any) => {
                    // factory(title, value, onChange) => ReactNode
                    const value = context.getSetting("pluginId.FocusMode", "on");
                    return props.factory("FocusMode", value, (state) => {
                        context.setSetting("pluginId.FocusMode", "on", state);
                    })
                }
            });
        }
    }
}