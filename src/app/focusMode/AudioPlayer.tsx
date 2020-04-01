import React, {FunctionComponent, useEffect} from 'react';
import url from './Mechanical-Keyboard-single-button-presses-8-www.FesliyanStudios.com.mp3';
import fs from 'fs';

interface Props {}

const AudioPlayer: FunctionComponent<Props> = (props) => {
    useEffect(() => {
        const onKeyPress = (e) => {
            console.log('url', url);
            const audio = new Audio(url);
            audio.play();
        };
        window.addEventListener('keypress', onKeyPress);
        return () => window.removeEventListener('keypress', onKeyPress);
    }, []);

    return null;
};

export default AudioPlayer;
