import "./App.css";
import React from "react";
import marked from "marked";
import DOMPurify from "dompurify";

const INITIALCODE = `# Header 1
## Header 2
[link](https://freecodecamp.org)
\`some code\`
- item 1
- item 2
>quote this or that
**bold**
![an image](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)
\`\`\`javascript
function (a) {
  return a.toString();
}
\`\`\`
`;

class ParseMarkdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: INITIALCODE
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      code: e.target.value
    });
  }

  render() {
    return (
      <div>
        <textarea
          id="editor"
          value={this.state.code}
          onChange={this.handleChange}
          cols="70"
          rows="20"
        />
        <MarkdownArea code={marked(this.state.code, { breaks: true })} />
      </div>
    );
  }
}

class MarkdownArea extends React.Component {
  render() {
    var { code } = this.props;
    return (
      <div
        id="preview"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(code) }}
      />
    );
  }
}

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <ParseMarkdown />
      </header>
    </div>
  );
}

export default App;
