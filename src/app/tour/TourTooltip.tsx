import React from 'react';

export const TourTooltip = (props) => {
    const {
        continuous,
        index,
        step,
        backProps,
        closeProps,
        primaryProps,
        isLastStep,
        tooltipProps,
    } = props;

    return <div {...tooltipProps} className='tour-body'>
        {step.title && <div className='tour-title'>{step.title}</div>}
        <div className='tour-content'>{step.content}</div>
        <div className='tour-footer'>

            <a {...backProps}>
                {index > 0 && (
                    <span className="material-icons">arrow_back</span>
                )}
            </a>

            <a {...primaryProps}>
                {continuous && !isLastStep && (
                <span className="material-icons">arrow_forward</span>
                )}
            </a>

            {/*{continuous && (*/}
            {/*    <a {...closeProps}>*/}
            {/*        <span className="material-icons">close</span>*/}
            {/*    </a>*/}
            {/*)}*/}
        </div>
    </div>;
};
