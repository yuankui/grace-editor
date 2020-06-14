import Color from 'color';
import {Theme} from "./Theme";

const black = Color('black').alpha(1);
const white = Color("white").alpha(1);

const linkColor = Color("rgb(21, 160, 177)");
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
    "--base-selection-background-color": Color("#B4D8FE"),
    "--base-selection-text-color": Color("#000"),

    '--checkbox-background-checked-color': black.alpha(.40),
    '--checkbox-background-color': Color('rgba(0, 0, 0, 0)'),
    '--checkbox-border-color': black.alpha(.40),

    '--base-link-color': linkColor,

    // tour
    "--tour-tooltip-action-color": white,
    "--tour-tooltip-background-color": white,

    // input
    "--base-input-background-color": white,

    "--mindmap-background-color": Color("#EEEEF3"),
    "--mindmap-edge-color": Color("#FF5F8C"),
    "--mindmap-node-background-color": white,
    "--mindmap-text-color": Color("#4A4A4A"),
    "--mindmap-node-border-color": Color("#B3D7FF"),
};