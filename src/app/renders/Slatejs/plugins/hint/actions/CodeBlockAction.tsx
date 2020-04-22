import {HintAction} from "./index";
import React, {ReactNode} from "react";
import {BlockTypeCodeBlock} from "../../code/CodePlugin";


export default class CodeBlockAction implements HintAction {
    action(editor): void {
        editor.setBlocks(BlockTypeCodeBlock)
            .deleteBackward();
    }

    icon(width: number): ReactNode {
        // https://icons8.com/icons/set/todo
        return <img width={width}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAEY0lEQVR4nO2dPWwcRRSAv4t9NjKNgcLYRoDoEhqK9Li1CbaEBBYSAgk3oKCkQ8IVDVQp4hpoqJKWICWdqRIkGypEhcW/DyOi4OBEiogxxezKO+tde+9uZufN7vuklfyjffNmPu/O7M6zDYqiKIqiKIpfxoD3gK+BPeBAD6/HHnALOJ+MvcUM8K2AJNt6fANMpzLGVIaIYxPojgDvAm+jhGYG6IGZM7Kmvki+qfhlFriGPfY3Af7JfXE2UIJt5Cnssb/bST7I0qk7q5Zjjf+pUFkoxagQYagQYagQYagQYRStspSA6BUiDBUiDBUijNGCr+mTer3ok7pkVIgwVIgwVIgwVIgwVIgw2iKkGzqBqrRByBKwjdmqfiNwLpXIl6M0iQngNod9+wt5P4TW+EtLzjWvA49nPv8X+C9QLpVp8hWygd23y2HTKeTI+DdVyFmO9u35oBkV0xohn2H3az1sOqW0QsgkRyv4XwuaUTmtEHIRu09/UFDyL4RWCPkOu08fhU3nWBovZA67P/vAswHzOYnGC7mK3Z9rYdM5EVFCRoFHHcabAh5g9+ecw/g+ECFkHHgf2AEeApccxV3F7stPwEjFc98C7gB/JrmNO8rpJIILeQXYKmj3uSHjjmAEZGOuVjy3y9Fl8laSq2+CCXkB83CWb+8A845puvzUSpzLxXyAuYVVoQvsluS2nuTui9qFTAGfYFY7RR3exdwuhiX/62FX+jz/Vcql7GP6UFVwP9QmpIt5QPu7oI20k58DTzpo62nMXJSN/+IAcZ4A1gpipcce8CHwyNAZH1KLkJeBHwpi+7oNfJyL/z3DFfydBq5Tnv8vwJtDtpHiVcgZ4EZBzHxHXDKGeTWSbeeCo9h1/GB5ERLiUk9ZzrV1H3jMYXzft17nQhYIMxmmrOfa/NRTO1UWJwsDxHUu5NeSBF3PE0WcxmzJZts9W0ObZfPLb/Q/r1gxXOypu1oIDMI72AOwmRw+6VA+6E7GYtgrZJ4wt6wJzKuObHsrHtpJqXLLmh8gbmMm9ZVcG3dw+6IyJbpJPUud6/c6KkqiXfbm8d0R3xUldT5P1SIE/F7qvipKGvvqJEuVyXCxj3iTwL1cjGUHeS7R8JeLeY57/b7dR5wLuXNdVZT0SnJzMU8cRzAhKUUbVFWFdDAvDrPnuqooyQtp/AZVlnQLtwf8jlkEVGEOO9eHwDOOclpMcunRsi3cYYitoqQK0Qopqih5KWhGbohWSL6i5GeqV5RIJkohp4AfsfP8IGhG7ohSyDAVJdKJUsiX2Dn2W1EimeiEuKookUp0QlxXlEgjKiE+K0qkEJUQ3xUlEohKyFfYufmqKAlJNEJCVJSEIBoha9h5bYRNxxvRCNnBzstnRUlIohDSwV5d3caU/TSRKISA2Z/oJUfV/ZIYscZf/8NOeKzxb/qfZ4oOFSIMFSIMFSIMFSIMFSIMFSIMFSIMFSIMFSIMFSIM/T+GwtArRBgqRBgqRFEURVEURWkB/wNBz3CwglUtIgAAAABJRU5ErkJggg=="/>;
    }

    subtitle(): string {
        return "Code block";
    }

    title(): string {
        return "Code Block"
    }

    key: string = this.title();
}