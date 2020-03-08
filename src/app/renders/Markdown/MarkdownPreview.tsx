import React, {FunctionComponent} from 'react';
import Markdown from 'markdown-to-jsx';
import Anchor from "./preview/Anchor";

interface Props {
    value: string,
}

const MarkdownPreview: FunctionComponent<Props> = (props) => {
    return <div className='app-markdown-preview'>
        <Markdown children={props.value}
                  options={{
                      forceBlock: true,
                      overrides: {
                          a: Anchor,
                      }
                  }}/>
    </div>;
};

export default MarkdownPreview;
