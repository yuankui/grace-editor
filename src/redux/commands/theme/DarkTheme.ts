import Color from 'color';
import {Theme} from "./Theme";

const white = Color("white").alpha(1);

const darkBaseBg = Color('#363C3F');
const linkColor = Color('#6BCAFB');

export const DarkTheme: Theme = {
    type: "dark",
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
    "--base-text-active-color": Color('rgb(241,241,241)'),
    '--markdown-code-background-color': Color("rgb(73, 76, 80)"),
    "--base-selection-background-color": Color("#98b5d4"),
    "--base-selection-text-color": Color("#FFF"),

    '--checkbox-background-checked-color': white.alpha(.40),
    '--checkbox-background-color': Color('rgba(0, 0, 0, 0)'),
    '--checkbox-border-color': white.alpha(.80),

    '--base-link-color': linkColor,
};