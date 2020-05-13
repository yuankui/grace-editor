import CodeMirror from "codemirror";
import "codemirror/addon/mode/simple";

// @ts-ignore
CodeMirror.defineSimpleMode("plantuml", {
    // The start state contains the rules that are intially used
    start: [
        // 时序图
        {
            regex: /(?:@startuml|@enduml)\b/,
            token: "keyword"
        },
        {
            regex: /\'.*/,
            token: "comment",
        },
        // message ->
        {
            regex: /(\w+)(\s*)(-->|->|<-|->x|->>|-\\|\\\\-|\/\/--|->o|o\\\\--|<->|<->o)(\s*)(\w+)(\s*:\s*)(.+)/,
            token: ["variable-2", null, null, null, "variable-2", null, "string"],
        },
        // return
        {
            regex: /(return)(\s+)(.+)/,
            token: ['keyword', null, 'string']
        },
        // title
        {
            regex: /(title)(\s+)(.+)/,
            token: ['keyword', null, 'string'],
        },
        // [de]activate
        {
            regex: /(activate|deactivate|participant)(\s+)(.+)/,
            token: ['keyword', null, 'variable-2'],
        },
        // delay message
        {
            regex: /(\.\.\.)(.+)(\.\.\.)/,
            token: ['keyword', 'string', 'keyword'],
        },
        // inline note
        {
            regex: /(note\s+left|note\s+right)(\s*:\s*)(.+)/,
            token: ['keyword',null, 'string'],
        },
        // inline note of somebody
        {
            regex: /(note\s+left\s+of\s+)(\w+)(\s*:\s*)(.+)/,
            token: ['keyword', 'variable-2', null, 'string'],
        },
        // block note
        {
            regex: /note\s+left/,
            token: 'keyword',
            next: 'blockNote',
        }
    ],
    blockNote: [
        {
            regex: /end\s+note/,
            token: 'keyword',
            next: 'start',
        },
        {
            regex: /.+/,
            token: 'string',
        }
    ],
    meta: {
        dontIndentStates: ["comment"],
        lineComment: "'"
    }
});
