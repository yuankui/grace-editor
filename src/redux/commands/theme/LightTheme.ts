import Color from 'color';
import {Theme} from "./Theme";

const black = Color('black').alpha(1);
const white = Color("white").alpha(1);

export const LightTheme: Theme = {
    type: "light",
    '--base-sider-menu-color': Color('#F9F9F9'),
    '--base-font-color': black.alpha(.65),
    "--base-font-active-color": black.alpha(.85),
    "--base-font-hover-color": black,
    "--base-font-disable-color": black.alpha(.40),

    '--base-text-color': black.alpha(.65),
    '--base-background-color': white,
    '--base-hover-background-color': Color('#e6e6e6'),
    '--base-active-background-color': Color('#d6d6d6'),
    '--base-disable-color': Color('#CFCFCD'),
    '--base-content-backend-color': white,
    '--base-background-highlight-color': Color('#f7f6f3'),
    "--base-text-inactive-color": Color('#c3c3c3'),
    "--base-text-hover-color": Color('#8b8b8b'),
    "--base-text-active-color": Color('#3b3b3b'),
    '--markdown-code-background-color': Color("rgb(224, 224, 224)"),
};