import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {InlineMarkTypes, MarkTypeBold} from "../../inline/InlinePlugin";

export default function createResetTool(): Tool {
    return {
        isActive(editor: Editor): boolean {
            return false;
        },
        title: <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABvklEQVRoge2XvU7DMBRGD4gOoMIAbAyVgKoV7MCEWFkQD9BXQLDAzHMw8VAMVKyFhY6FoZUKQ1KVXuzEduxYIB/JQ2Tnu/fzX24gEZelgNpfdcRaDiFaJ8lAbJKB2CQDsUkGYpMMxCYZiE0yEBsXAyvADfAETMjqflWT6MZNcq3rXDs4DwXJVG2PoZM/CZj8rB3ZJGS7hS4sx7twaTPY1sCheO6R/etWaT2heWCTkK2Brnh+tnxfRb8khjcawJj5Xp0CGx5013Otme44j+WdLouHbeBReyC0O6Yv2ty7UnQH9X3vgw6/t5YSmzMQbG9WiWVjwHhZPWAc688bsGHI4kFredRuCe2hR20AtkWAT/xWssvAh4ixZfqiCXJJ+2R3ty+mwEtJTCWmBuStYHTFWeL0Ra6yAi5sAvuaPlmWeF0BXwbawLmmT2oG3UK6Iq5ohsn7TA14+3CqirimZuwxcFWgdU92g60p+po4FHUmK7AnhF6BkWZs0QzP+leBU0XfCHj78dwAdsuSMzFgs//bwBnqGYb59tKZdDrIZdwR/j9Y127LknNZgTopjW1ioM4yOkhsWcTV2d59GEgk/jPflZnGtEFxn6UAAAAASUVORK5CYII="/>,
        action(editor: Editor): void {
            let e = editor;
            for (let inlineMarkType of InlineMarkTypes) {
                e = e.removeMark(inlineMarkType);
            }
            e.setBlocks('paragraph');
        }
    }
}