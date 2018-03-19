import React from 'react';
import NEditor from 'ne';

class Markdown extends React.Component {

    /**
     * @description 获取/设置编辑器内容
     */
    val(value) {
        return this.editor.val(value);
    }

    render() {

        return <div className="n-editor">
            <NEditor ref={e => this.editor = e}/>
        </div>
    }

}

export default Markdown;