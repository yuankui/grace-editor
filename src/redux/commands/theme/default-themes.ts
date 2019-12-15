import {Theme} from "../../store";
import Color from 'color';

const black = Color('black').alpha(1);
const white = Color("white").alpha(1);

export const LightTheme: Theme = {
    '--base-sider-menu-color': Color('#F9F9F9'),
    '--base-font-color': black.alpha(.65),
    "--base-font-active-color": black.alpha(.85),
    "--base-font-hover-color": black,
    "--base-font-disable-color": black.alpha(.40),

    '--base-background-color': white,
    '--base-hover-background-color': Color('#e6e6e6'),
    '--base-active-background-color': Color('#d6d6d6'),
    '--base-disable-color': Color('#CFCFCD'),
    '--base-content-backend-color': white,
};


const darkBaseBg = Color('#363C3F');
export const DarkTheme: Theme = {
    '--base-sider-menu-color': Color('#363C3F',),
    '--base-font-color': white.alpha(.65),
    '--base-font-hover-color': white.alpha(.85),
    '--base-font-active-color': white,
    "--base-font-disable-color": white.alpha(.40),
    '--base-background-color': darkBaseBg,
    '--base-hover-background-color': darkBaseBg.lighten(0.3),
    '--base-active-background-color': Color('#363C3F').lighten(0.6),
    '--base-disable-color': Color('#363C3F'),
    '--base-content-backend-color': Color('#2E3437'),
};