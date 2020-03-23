import Color from 'color';
import {Theme} from "./Theme";

const white = Color("white").alpha(1);

const darkBaseBg = Color('#363C3F');
export const DarkTheme: Theme = {
    '--base-sider-menu-color': Color('#363C3F',),
    '--base-font-color': white.alpha(.65),
    '--base-font-hover-color': white.alpha(.85),
    '--base-font-active-color': white,
    "--base-font-disable-color": white.alpha(.40),
    '--base-text-color': white.alpha(.8),
    '--base-background-color': darkBaseBg,
    '--base-hover-background-color': darkBaseBg.lighten(0.3),
    '--base-active-background-color': Color('#363C3F').lighten(0.6),
    '--base-disable-color': Color('#363C3F'),
    '--base-content-backend-color': Color('#2E3437'),
    "--base-background-highlight-color": Color('#3f4447'),
    "--base-text-inactive-color": Color('rgba(147,147,147,1)'),
    "--base-text-hover-color": Color('rgb(199,199,199)'),
    "--base-text-active-color": Color('rgb(241,241,241)')

};