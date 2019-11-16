import {HintAction} from "./index";
import React, {Dispatch, ReactNode} from "react";
import {Editor} from "slate";
import {HeaderTypePrefix} from "../../header/HeaderPlugin";

const headerMap = {
    1: (width: number) => <img width={width}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAA9UlEQVRoge2YsQ3CMBBFX1BKGko2YABWoGEJRmAWVmANRAWpaKGiZgBKCgQFCoIIEl9iyCn6T3KTnH/0bPkUGYQQQgjRPTLgVjI2EbO2hqwJsLfklRXmI5QYWUNgGZj1ludFJAXmwNkg4U5kDOyMAq5EBsACuNaUcCNybCDwzEtePl5FUl1SK8uySF/zehFCXCCRP3ACZtZJbR724rsLjy7Wr5PXtGvUbpeF5ytg1GRh2hRZAwdgymeit9+YhLZyCGznng+7CYl4QyLeSA21MX8ao9OZHZGINyTiDYl4QyLeyEWyijrrJXYZlkvsX+QJIYQQwj13sbA02CFBAqgAAAAASUVORK5CYII="/>,
    2: (width: number) => <img width={width}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABg0lEQVRoge2YPy8EURRHDwoUopMIiSg0dCQKBYlaoSb0PoFEovUFkEh8A4WeRGUXiUSUG42C0FH4E2RkFZORZ2Pue293dt8j9yS32N17fzMnb3fmzYKiKIqiKIqieFIGqjl13IS5jEFgDTgAboAX4BW4BQ6BdWDIRyTvZLIqeq4b2AQ+HDISYBfojU2kBzh3mK2tCtAfk8h+HRJZnQHtMYjMNCCR1bIZKFo1kaUCMhalD1u1IldC7zYwCkwDF0LffQwiTzl9n0CX0TcvZL6bgaG+Wpc57x8Bb8brMSHjTjpAoz9A35WUmAKehcydvyAyDjwIeQkwErvIBPBoyduyhYQWmUReiSpwCnTGLDJL/tUsq2tgwCUslMgc6W7XJjHsIuEiUvQcwAL23W8Fx5UIJbJCehOUZk+APh+JVousOsztkT6zeNMqkQ2HGVuVzMC2X05Iora/3rkE6LDMuPCdG2qvVYTED0KJFM6/FSkLvba/g3zmpH5XSvYWRVEURVEURTH4AtM0+6vNqEsKAAAAAElFTkSuQmCC"/>,
    3: (width: number) => <img width={width}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABUElEQVRoge3XvytFYRzH8RdFKYPFqpTJRBlZzVJkYLEaZeQvMZAMIpvJdlEWg0EMDFjlV/mx+DHcbt10znV/qefq+67P9HzOt/Oup+c5hyAIgiAIgiAI/hFH+PqRgyb22zGBNZzhDh94wiW2MIOOBhzIeKlSmtHvx0mFZ8pzgaEURXpwVaVEKffoS01kpUaJUlZTEzmtU+Q2NZHXnN4UurGYs/6emkgho1MoW2/HW0bnptkitaYWOrGUM2e9FUSy7qDyvGGwFUR+m7GtuOVaXuQLO2hLXeSwylnzqYuU6MA4XnJmHTVTpJH+MJ4zOvs/ens5sx5TEZms0JtGF8bwkNN5SEVkoEKvmhTUwV+IwHEDIrMpiYzI/gT5LZv1SPylCIziukqBFyxr4ELMOtsr7dFa+52YwwbOFX91PxVPpkvsYgG99QoEQRAEQRAEQZA034+N79KJLKxRAAAAAElFTkSuQmCC"/>
};

const subTitleMap = {
    1: "Big section heading",
    2: "Medium section heading",
    3: "Small section heading",
};

const titleMap = {
    1: "Heading 1",
    2: "Heading 2",
    3: "Heading 3",
};


export default class HeaderAction implements HintAction {
    private readonly level: number;

    constructor(level: number) {
        this.level = level;
    }

    action(editor: Editor): void {
        const blockType = HeaderTypePrefix + this.level;

        editor.setBlocks(blockType)
            .deleteBackward();
    }

    icon(width: number): ReactNode {
        // https://icons8.com/icons/set/todo
        let header = headerMap[this.level];
        return header(width);
    }

    subtitle(): string {
        return subTitleMap[this.level];
    }

    title(): string {
        return titleMap[this.level];
    }

    key: string = this.title();
}