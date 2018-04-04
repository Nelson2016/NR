import React from 'react';
import NEditor from 'ne';

const Editor = NEditor.Editor;

class Markdown extends React.Component {

    /**
     * @description 获取/设置编辑器内容
     */
    val(value) {
        return this.editor.val(value);
    }

    render() {

        return <div className="n-editor">
            <Editor ref={e => this.editor = e}/>
        </div>
    }

}

export default Markdown;