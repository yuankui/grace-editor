import React, {MouseEvent, CSSProperties, FC, useEffect, useState} from "react";

interface Props {
    src: string,
}

const ScaleImage: FC<Props> = (props) => {
    const [scale, setScale] = useState(1);
    useEffect(() => {
        const onScroll = (e: WheelEvent) => {
            if (e.deltaY < 0) {
                let newScale = scale * 1.2;
                if (newScale > 10) {
                    newScale = 10;
                }
                setScale(newScale);
            } else {
                let newScale = scale / 1.2;
                if (newScale < .1) {
                    newScale = .1;
                }
                setScale(newScale);
            }

            console.log(e);
        };
        window.addEventListener('wheel', onScroll);
        return () => {
            window.removeEventListener('wheel', onScroll);
        }
    }, [scale]);

    const [pos, setPos] = useState([0, 0]);

    const [mouseStartPos, setMouseStartPos] = useState([0, 0]);
    const [mouseCurrentPos, setMouseCurrentPos] = useState([0, 0]);
    const [moving, setMoving] = useState(false);

    const onMouseDown = (e: MouseEvent) => {
        setMoving(true);
        setMouseCurrentPos([e.clientX, e.clientY]);
        setMouseStartPos([e.clientX, e.clientY]);
    };

    const onMouseMoving = (e: MouseEvent) => {
        setMouseCurrentPos([e.clientX, e.clientY]);
    };

    const onMouseUp = (e: MouseEvent) => {

        const [oldX, oldY] = pos;
        const [startX, startY] = mouseStartPos;
        const [currentX, currentY] = mouseCurrentPos;

        setMoving(false);
        setPos([oldX + currentX - startX, oldY + currentY - startY]);
    };

    const [startX, startY] = mouseStartPos;
    const [currentX, currentY] = mouseCurrentPos;
    const [x, y] = pos;

    const [xx, yy] = moving?[x + currentX - startX, y + currentY - startY] : pos;

    const scaleStyle: CSSProperties = {
        transform: `scale(${scale})`,
        position: 'relative',
        top: `${yy}px`,
        left: `${xx}px`,
    };
    return <img src={props.src}
                draggable={false}
                style={scaleStyle}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMoving}
                onMouseUp={onMouseUp}>
    </img>;
};

export default ScaleImage;