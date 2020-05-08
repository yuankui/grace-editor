import React from "react";

export function renderDecoration(props, editor, next) {
    const {children, decoration, attributes} = props

    switch (decoration.type) {
        case 'bold':
            return <strong {...attributes}>{children}</strong>;

        case 'code':
            return <code {...attributes}>{children}</code>;
        case 'pre':
            return <pre {...attributes}>{children}</pre>;

        case 'italic':
            return <em {...attributes}>{children}</em>;

        case 'underlined':
            return <u {...attributes}>{children}</u>;

        case 'title': {
            return (
                <span
                    {...attributes}
                    className={'app-markdown-header'}
                >
            {children}
          </span>
            )
        }

        case 'punctuation': {
            return (
                <span {...attributes} style={{opacity: 0.2}}>
            {children}
          </span>
            )
        }

        case 'list': {
            return <span
                    {...attributes}
                    style={{
                        paddingLeft: '10px',
                        fontWeight: 'bold',
                    }}
                >
            {children}
          </span>
        }

        case 'blockquote': {
            return <blockquote {...attributes}>
                {children}
            </blockquote>
        }

        case 'hr': {
            return <span
                {...attributes}
                style={{
                    borderBottom: '2px solid #000',
                    display: 'block',
                    opacity: 0.2,
                }}
            >
            {children}
          </span>
        }

        case 'code-block': {
            return <pre {...attributes} style={{backgroundColor: 'black'}}>
                {children}
            </pre>
        }

        default: {
            return next()
        }
    }
}