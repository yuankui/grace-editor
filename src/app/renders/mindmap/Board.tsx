import React, {FunctionComponent, useEffect, useState} from 'react';
import {useNotifier} from "./hooks/useListener";
import {useMindMapContext} from "./context/MindMapContext";
import {useDndContext} from "./dragdrop/DndContext";

interface Props {
    width: number,
    height: number,
    onClick?: () => void,
}

const Board: FunctionComponent<Props> = (props) => {
    const [[x, y], setPos] = useState([0, 0]);

    const [start, setStart] = useState([0, 0]);
    const [move, setMove] = useState([0, 0]);
    const [moving, setMoving] = useState(false);
    const [startX, startY] = start;

    const dndContext = useDndContext();

    useEffect(() => {
        const [startX, startY] = start;
        const [moveX, moveY] = move;

        const onMove = (e: MouseEvent) => {
            if (!moving) {
                return;
            }

            if (dndContext.value.moving) {
                return;
            }
            setMove([e.clientX, e.clientY]);
        };
        const onMouseUp = (e: MouseEvent) => {
            console.log('svg up');

            if (!moving) {
                return;
            }

            if (dndContext.value.moving) {
                return;
            }

            setMoving(false);
            setPos([x - (moveX - startX), y - (moveY - startY)]);
            setStart([0, 0]);
            setMove([0, 0]);
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onMouseUp);
        }
    }, [moving, start, move, x, y, dndContext.value.moving]);

    let notifier = useNotifier();
    const [moveX, moveY] = move;



    let scaleContext = useMindMapContext();
    const {scale, setScale} = scaleContext;

    return <svg
        onClick={e=> {
            e.stopPropagation();
            notifier('BoardClick');
        }}

        onFocus={e => {
            console.log('focus');
        }}

        onBlur={e => {
            console.log("blur");
        }}
        onWheel={e => {
            console.log(e.clientX, e.clientY);
            if (e.deltaY > 0) {
                setScale(scale * 1.1);
            } else {
                setScale(scale / 1.1);
            }
        }}

        onMouseDown={e => {
            console.log("svg down")
            setMoving(true);
            setStart([e.clientX, e.clientY]);
            setMove([e.clientX, e.clientY]);
        }}
        width={'100%'}
        height={'100%'}
        className='board'
        viewBox={`${x - (moveX - startX)} ${y - (moveY - startY)} ${props.width * scale} ${props.height * scale}`}>
        {props.children}
    </svg>;
};

export default Board;
