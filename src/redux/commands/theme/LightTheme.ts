import Color from 'color';
import {Theme} from "./Theme";

const black = Color('black').alpha(1);
const white = Color("white").alpha(1);

export const LightTheme: Theme = {
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
};