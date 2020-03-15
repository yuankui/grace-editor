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
                    style={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                        margin: '20px 0 10px 0',
                        display: 'inline-block',
                    }}
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