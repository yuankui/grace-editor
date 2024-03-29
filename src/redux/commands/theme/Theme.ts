import Color from "color";

export interface Theme {
    type: 'light' |'dark',
    '--base-sider-menu-color': Color,
    '--base-font-color': Color,
    '--base-background-color': Color,
    '--base-hover-background-color': Color,
    '--base-active-background-color': Color,
    '--base-disable-color': Color,
    '--base-font-hover-color': Color,
    '--base-font-active-color': Color,
    '--base-content-backend-color': Color,
    '--base-font-disable-color': Color,
    '--base-text-color': Color,
    '--base-background-highlight-color': Color,
    '--base-text-inactive-color': Color,
    '--base-text-hover-color': Color,
    '--base-text-active-color': Color,
    '--markdown-code-background-color': Color,
    '--base-selection-background-color': Color,
    '--base-selection-text-color': Color,
    '--checkbox-background-checked-color': Color,
    '--checkbox-background-color': Color,
    '--checkbox-border-color': Color,
    '--base-link-color': Color,

    // tour
    '--tour-tooltip-background-color': Color,
    '--tour-tooltip-action-color': Color,

    // input
    '--base-input-background-color': Color,

    // mindmap
    '--mindmap-background-color': Color,
    '--mindmap-node-background-color': Color,
    '--mindmap-text-color': Color,
    '--mindmap-edge-color': Color,
    '--mindmap-node-border-color': Color,
}