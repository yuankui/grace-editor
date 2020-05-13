import CodeMirror from "codemirror";
import "codemirror/addon/mode/simple";

// @ts-ignore
CodeMirror.defineSimpleMode("plantuml", {
    // The start state contains the rules that are intially used
    start: [
    ],
    meta: {
        dontIndentStates: ["comment"],
        lineComment: "'"
    }
});
