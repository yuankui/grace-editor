import React, {CSSProperties, FC, useEffect, useState} from "react";

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
        }
        window.addEventListener('wheel', onScroll)
        return () => {
            window.removeEventListener('wheel', onScroll);
        }
    }, [scale])

    const scaleStyle: CSSProperties = {
        transform: `scale(${scale})`,
    }
    return <img src={props.src} style={scaleStyle}>
    </img>;
};

export default ScaleImage;