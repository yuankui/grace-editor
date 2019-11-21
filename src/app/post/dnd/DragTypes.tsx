import {DragObjectWithType} from "react-dnd";

export const DragSourceTypes = {
    PostTitle: 'post-title'
};

export interface DragObjectPost extends DragObjectWithType {
    srcId: string,
}