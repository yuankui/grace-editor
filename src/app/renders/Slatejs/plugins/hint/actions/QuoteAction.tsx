import {HintAction} from "./index";
import React, {ReactNode} from "react";
import {Editor} from "slate";
import {QuoteBlockType} from "../../quote/QuotePlugin";


export default class QuoteAction implements HintAction {

    action(editor: Editor): void {
        editor.setBlocks(QuoteBlockType);
    }

    icon(width: number): ReactNode {
        // https://icons8.com/icons/set/todo
        return <svg width={width} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path
                d="M 25 4 C 12.328125 4 2 12.878906 2 23.992188 C 2 30.445313 5.53125 36.0625 10.960938 39.730469 C 10.953125 39.945313 10.96875 40.296875 10.683594 41.34375 C 10.335938 42.644531 9.625 44.472656 8.1875 46.535156 L 7.164063 48 L 8.949219 48 C 15.140625 48 18.722656 43.964844 19.277344 43.316406 C 21.121094 43.75 23.019531 43.988281 25 43.988281 C 37.671875 43.988281 48 35.109375 48 23.992188 C 48 12.878906 37.671875 4 25 4 Z M 23 21.5 L 23 24 C 23 26.980469 21.386719 30.765625 17 32.449219 L 17 29.144531 C 19.824219 27.5 20 24.660156 20 24 L 17 24 L 17 17 L 23 17 Z M 33 21.5 L 33 24 C 33 26.980469 31.386719 30.765625 27 32.449219 L 27 29.144531 C 29.824219 27.5 30 24.660156 30 24 L 27 24 L 27 17 L 33 17 Z"></path>
        </svg>;
    }

    subtitle(): string {
        return "Show a Quotation";
    }

    title(): string {
        return "Quotation"
    }

    key: string = this.title();
}