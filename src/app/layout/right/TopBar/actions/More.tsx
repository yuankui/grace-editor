import React, {useState} from "react";
import {Rotate} from "../../../../../utils";
import {Icon, Switch} from "antd";
import {useDispatch} from "react-redux";
import {ToggleDarkModeCommand} from "../../../../../redux/commands/settings/ToggleDarkModeCommand";
import {ToggleSettingCommand} from "../../../../../redux/commands/ToggleSettingCommand";
import Popover from "./popover/Popover";
import {Action} from "./popover/Action";
import Actions from "./popover/Actions";
import {ToggleFullWidthCommand} from "../../../../../redux/commands/settings/ToggleFullWidthCommand";
import {UpdateProfileSettingCommand} from "../../../../../redux/commands/profile/UpdateProfileSettingCommand";
import {toggleAboutCommand} from "../../../../../redux/commands/ToggleAboutCommand";
import useAppStore from "../../../../hooks/useAppStore";
import {useLang} from "../../../../../i18n/i18n";
import {usePluginContext} from "../../../../../globalPlugins/usePluginContext";

const More: React.FC<any> = props => {
    const dispatch = useDispatch();
    const state = useAppStore();
    const profile = state.profile || {};
    const isDarkMode = !!profile.isDarkMode;
    const fullWidth = profile.content && !!profile.content.fullWidth;
    const isPreview = !!(profile?.markdownPreview);
    const lang = useLang();
    const [showPopup, setShow] = useState(false);
    const toggle = (show: boolean) => {
        setShow(show);
    };

    let context = usePluginContext();
    let hooks = context.getContainerHooks("app.more.settings");
    const factory = (title, value, onChange) => {
        return <Action title={title} onClick={() => {
            onChange(!value);
        }}>
            <Switch checked={value}/>
        </Action>
    };

    let hookActions = hooks.map(hook => hook.hook({factory}));

    const actions = <Actions width={200}>
        <Action title={lang["more.dark-mode"]} onClick={() => {
            dispatch(new ToggleDarkModeCommand(!isDarkMode));
        }}>
            <Switch checked={isDarkMode}/>
        </Action>
        <Action title={lang["more.full-width"]} onClick={() => {
            dispatch(new ToggleFullWidthCommand(!fullWidth));
        }}>
            <Switch checked={fullWidth}/>
        </Action>
        <Action title={lang["more.markdown.preview"]} onClick={() => {
            dispatch(new UpdateProfileSettingCommand({
                markdownPreview: !isPreview
            }));
        }}>
            <Switch checked={isPreview}/>
        </Action>
        {hookActions}
        <Action title={lang["setting.title"]} onClick={() => {
            dispatch(new ToggleSettingCommand(true));
            toggle(false);
        }}/>

        <Action title={lang["more.about"]} onClick={() => {
            dispatch(new toggleAboutCommand(true));
            toggle(false);
        }}/>
    </Actions>;

    return <Popover placement="bottomLeft"
                    content={actions}
                    visible={showPopup}
                    onVisibleChange={toggle}
    >
        <a>
            <Rotate deg={90}>
                <Icon type='more'/>
            </Rotate>
        </a>
    </Popover>
};

export default More;