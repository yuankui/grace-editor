import React, {FunctionComponent, useEffect} from 'react';
import url from './Mechanical-Keyboard-single-button-presses-8-www.FesliyanStudios.com.mp3';

interface Props {}

const KeyboardSound: FunctionComponent<Props> = (props) => {
    useEffect(() => {
        const onKeyPress = (e) => {
            const audio = new Audio(url);
            audio.play();
        };
        window.addEventListener('keypress', onKeyPress);
        return () => window.removeEventListener('keypress', onKeyPress);
    }, []);

    return null;
};

export default KeyboardSound;
