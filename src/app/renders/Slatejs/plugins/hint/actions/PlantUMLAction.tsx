import {HintAction} from "./index";
import React, {ReactNode} from "react";
import {BlockTex} from "../../tex/TexPlugin";
import {BlockPlantUML} from "../../plantuml/PlantUMLPlugin";


export default class PlantUMLAction implements HintAction {

    action(editor): void {
        editor.insertBlock({
            type: BlockPlantUML,
            data: {
                src: '@startuml\n' +
                    'Bob -> Alice : hello\n' +
                    '@enduml',
            }
        })
    }

    icon(width: number): ReactNode {
        // https://icons8.com/icons/set/flow-chart
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
            <path
                d="M 23 2.4140625 C 22.744125 2.4140625 22.488469 2.5115312 22.292969 2.7070312 L 18.707031 6.2929688 C 18.316031 6.6829687 18.316031 7.3160312 18.707031 7.7070312 L 22.292969 11.292969 C 22.682969 11.682969 23.317031 11.682969 23.707031 11.292969 L 27.292969 7.7070312 C 27.683969 7.3170313 27.683969 6.6839688 27.292969 6.2929688 L 23.707031 2.7070312 C 23.512031 2.5115312 23.255875 2.4140625 23 2.4140625 z M 7 3 A 4 4 0 0 0 3 7 A 4 4 0 0 0 7 11 A 4 4 0 0 0 11 7 A 4 4 0 0 0 7 3 z M 14 6 A 1.0001 1.0001 0 1 0 14 8 L 16 8 A 1.0001 1.0001 0 1 0 16 6 L 14 6 z M 6.984375 12.986328 A 1.0001 1.0001 0 0 0 6 14 L 6 16 A 1.0001 1.0001 0 1 0 8 16 L 8 14 A 1.0001 1.0001 0 0 0 6.984375 12.986328 z M 22.984375 12.986328 A 1.0001 1.0001 0 0 0 22 14 L 22 16 A 1.0001 1.0001 0 1 0 24 16 L 24 14 A 1.0001 1.0001 0 0 0 22.984375 12.986328 z M 7 19 A 1 1 0 0 0 6.1191406 19.529297 L 2.1679688 25.445312 A 1 1 0 0 0 2 26 A 1 1 0 0 0 3 27 L 7 27 L 11 27 A 1 1 0 0 0 12 26 A 1 1 0 0 0 11.832031 25.445312 L 11.832031 25.443359 L 11.826172 25.435547 A 1 1 0 0 0 11.820312 25.427734 L 7.8808594 19.529297 L 7.8769531 19.521484 A 1 1 0 0 0 7 19 z M 21 19 C 19.895 19 19 19.895 19 21 L 19 25 C 19 26.105 19.895 27 21 27 L 25 27 C 26.105 27 27 26.105 27 25 L 27 21 C 27 19.895 26.105 19 25 19 L 21 19 z"></path>
        </svg>;
    }

    subtitle(): string {
        return 'Insert PlantUML Diagram'
    }

    title(): string {
        return 'PlantUML Diagram'
    }

    key: string = this.title();
}