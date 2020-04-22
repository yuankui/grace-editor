import {HintAction} from "./index";
import React, {ReactNode} from "react";
import {BlockTypeBulletedList, BlockTypeNumberedList, CommandToggleList} from "../../list/ListPlugin";

const listMap = {
    [BlockTypeBulletedList]: (width: number) => <img width={width}
                                                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAABTElEQVR4nO3aQU7CQBQG4F8XsNETcEXlVHoVwRWuvAis1QVdkBhbBmhnkO9LZkMnb8i8kinpnwAAAAAAAMCtmydZJlkn2XVjneS5u8aIFkk+knz/MTbdHEYwT//mHzah5JcwVO+/jZMtCxZ5Kqhbe0OupgHvBYusCurW3pCmGnDXc22b5GGoQGeX5PHIuWfdFVeob49zf6FFvi5U5+b0NeCzoE7JXA70NeCloM7ruV+E3+bZP2IOHTKbJLOCurUPxaYO4SGL9DfBH7EJzLJ/zl9l/2S0TfLWfVZy5wMAAAAAA+SCKpILqkguqPILGbmgyg2QC5qgAXJB45MLaplcUGVyQQ2TC5rgEB4iF9QAuSAAAAAAmIhcUEVyQRXJBVV+ISMXVLkBckETNEAuaHxyQS2TC6pMLqhhckETHMJD5IIaIBcEAAAAAAAAnOgHCyKoJVBEw8UAAAAASUVORK5CYII="/>,
    [BlockTypeNumberedList]: (width: number) => <img width={width}
                                                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABmJLR0QA/wD/AP+gvaeTAAACAklEQVRoge3au2sUURjG4UeNhAiChSlCAvHSqJ1YKFpZ2NrZaCmIgmXAyr/CxlIbGwuxsNFCbARBDBIERQTxghi18kLEy1qcLHuymcXJ7CRnZjk/GNjdszO875xvZ773zJJpF1txAe/Rwb20coZjBq8EI91tPqmiCmyOXn/GVCohdREbWsItzCXSsq5UKblOE7Z4hkaCbKjpjNV4rE01HqsyIzdDI2doUMmdxnahc8hkMplMIzmAa3iLP/iw/H46naTqzAh5qKglf4mJdNKqMSbMzE/cxU180zN1Pp206hwVyq7LnJ6hK0kUVSBufR72jcXrC69LHKsztJp1ZD++CyJ/YLbEPsnjtwEndRfeRF+4VOoUpDdSaGjayrW568oHt9RGVhnajefRwBMcxqHlsdaxaLDr1qygxol1MpmKGokv292UWkROrplMpp1sKfhsG/YIIW9pY+XUyxk8s/KG+hTHUooahjuKu4Qv2JlQ15qIS24cR3AVt3FQKL8JISu92HB1NTKOR3qzdCKtnOocF7rsr3pmHgv/X/gfqWNDB53+pw+zQqnFzON3CUONZArncBkf9ZxfLLFv8tlRkFhj4lWfB20xFJfcDWFt7j5+4VQ0tljCUCOesXbZIfxOilz/xcl00qoxiQWrzXzC2YS61kx/mezDXiG5vhMu2a3u5zJN4x8/SmP2eJNdYAAAAABJRU5ErkJggg=="/>
};

const titleMap = {
    [BlockTypeBulletedList]: 'Bulleted List',
    [BlockTypeNumberedList]: 'Numbered List',
};

const subtitleMap = {
    [BlockTypeBulletedList]: 'Show a List of Bulleted rows',
    [BlockTypeNumberedList]: 'Show a List of Numbered rows',
};

export default class ListAction implements HintAction {
    private readonly listType: string;

    constructor(listType: string) {
        this.listType = listType;
    }

    action(editor): void {
        editor.command(CommandToggleList, this.listType);
    }

    icon(width: number): ReactNode {
        // https://icons8.com/icons/set/todo
        return listMap[this.listType](width);
    }

    subtitle(): string {
        return subtitleMap[this.listType];
    }

    title(): string {
        return titleMap[this.listType];
    }

    key: string = this.title();
}