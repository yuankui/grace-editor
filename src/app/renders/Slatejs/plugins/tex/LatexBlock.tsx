import React, {FunctionComponent, useEffect, useMemo, useRef} from 'react';
import * as Katex from 'katex';

interface Props {
    latex: string,
}

const LatexBlock: FunctionComponent<Props> = (props) => {
    const ref = useRef<HTMLDivElement>(null);

    const render = () => {
        try {
            if (ref.current)
                Katex.render(props.latex, ref.current, {
                    throwOnError: false,
                });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(render);
    useMemo(() => {
        render();
    }, [props.latex]);

    return <>
        <div className='latex-wrapper'>
            <div ref={ref}/>
        </div>
    </>;
};

export default LatexBlock;
