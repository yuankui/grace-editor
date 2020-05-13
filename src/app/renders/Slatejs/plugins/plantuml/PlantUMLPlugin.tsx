import {Plugin} from "slate-react";
import React from "react";
import PlantUMLBlock from "./PlantUMLBlock";

export const BlockPlantUML = 'block-plantuml';

/**
 * 公式
 */
export function createPlantUMLPlugin(): Plugin {
    return {
        schema: {
            blocks: {
                [BlockPlantUML]: {
                    // isAtomic: true,
                    isVoid: true,
                }
            }
        },
        renderBlock: (props, editor, next) => {
            const {node} = props;
            if (node.type != BlockPlantUML) {
                return next();
            }

            return <PlantUMLBlock props={props} editor={editor} />
        }
    }
}