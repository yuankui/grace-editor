import React, {FunctionComponent} from 'react';
import Markdown from 'markdown-to-jsx';
import Anchor from "./preview/Anchor";
import Pre from "./preview/Pre";
import _ from "lodash";
import Code from "./preview/Code";

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
                          code: Code,
                      },
                      createElement: (type, p, children) => {
                          if (!(type === 'pre' && _.isObject(children))) {
                              return React.createElement(type, p, children);
                          }

                          return <Pre props={p}>
                              {children}
                          </Pre>

                      },
                  }} />
    </div>;
};

export default MarkdownPreview;
