import {HintAction} from "./index";
import React, {ReactNode} from "react";
import {Editor} from "slate";
import {TodoBlockType} from "../../todo/TodoPlugin";

export default class TodoAction implements HintAction {
    action(editor: Editor): void {
        editor.setBlocks(TodoBlockType)
            .deleteBackward();
    }

    icon(width: number): ReactNode {
        // https://icons8.com/icons/set/todo
        return <img width={width} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAACgUlEQVR4nO3asWtTUQCF8S8oRcF2colLBwdFBXErboKTm4i4u4mOgpPgakFwdVRER10V9C8QdJKOdrCLUpAOWqytw2tIJTxym0bvse/7wZ0CuYd3QqDNAUmSJEmS/oGDwNnaITT0APgJ3KkdRHAZ2AS2ts8z4EjVRB12EvjGsIzBWQJOV8zVSbPAR0bLGJw14Fq1dB3TA17SXsbOc6FSxk65S1kZL2jK0190EdhgfBlLwFyljJ0xD3xhfBlrwKlKGTvjEPCO8WVsAlcL3q/kK+9/PFN1Blhoee1xYaDFwrtqP7j4Qo4By8APRj/htwrDvKX5N0qJ2g8uupA54MOON90Abm6/tgCsFwRZAfq7uLP2g4stZAZ40/LmD4HPBSHWaf+qa1P7wUUW0gOeTCHEjQnurv3gIgtZnEKApxPeXfvBxRXSB1b3ePl74PCE99d+cHGFQPPH2/KEF68Cx/caQKP6NJ/03ZTxC7hUI2xXzAKvKC/kXpWUHTMDPGd8Ga+BA5Uydk4PuE97GZ+Ao7XCddlt/vydfAv4DpyrGarrrtCUMCjket04AjgPfAUe1Q6ioRM0v4VI0j7htjeM294gbnuDuO0N4rY3iNveMG57g7jtDTKP294YbnvLzlS57Q0qxG1vUCFue4MKcdsbVIjb3rBC3PYGFeK2N6wQcNsbyW1vILe9gdz2BnLbG8ptbyC3vYHc9gZy2ytpn3HbG8ZtbxC3vUHc9gZx2xvEbW8Yt71B3PYGmcdtbwy3vWVnqtz2BhXitjeoELe9QYW47Q0qxG1vWCFue4MKcdsbVgi47Y3ktjeQ295AbnsDue0N5bY3kNveQG57A7ntlSRJkiRpWn4DVt7kOYa4w80AAAAASUVORK5CYII="/>;
    }

    subtitle(): string {
        return "Track tasks with todo list";
    }

    title(): string {
        return "Todo List";
    }

    key: string = this.title();
}