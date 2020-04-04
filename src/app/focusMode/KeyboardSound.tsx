import React, {FunctionComponent, useEffect} from 'react';
import url from './Mechanical-Keyboard-single-button-presses-8-www.FesliyanStudios.com.mp3';
import {usePluginSettings} from "../../globalPlugins/usePluginSettings";

interface Props {}

const KeyboardSound: FunctionComponent<Props> = (props) => {
    const on = usePluginSettings("pluginId.keySound").switch;

    useEffect(() => {
        const onKeyPress = (e: KeyboardEvent) => {
            if (on && e.key.match(/^[a-zA-Z]$/)) {
                const audio = new Audio(url);
                audio.play();
            }
        };
        window.addEventListener('keydown', onKeyPress);
        return () => window.removeEventListener('keydown', onKeyPress);
    }, [on]);

    return null;
};

export default KeyboardSound;
