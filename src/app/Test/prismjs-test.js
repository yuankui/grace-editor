const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/');
loadLanguages(['markdown']);
// The code snippet you want to highlight, as a string
const code = `# hello
## kitty

\`hello\`

> hello
> kitty
`;

// Returns a highlighted HTML string
// const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');

const tokens = Prism.tokenize(code, Prism.languages.markdown);

console.log(JSON.stringify(tokens));