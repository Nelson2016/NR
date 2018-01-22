import React from 'react';

import fonts from '../../asset/style/fonts.scss';
import styles from './style/tree.scss';

class Tree extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data
        }
    }

    toggleTree(ref) {
        const aimTreeItem = this[ref],
            activeClassName = styles['n-active'];

        let aimTreeItemContainer = aimTreeItem.parentNode;
        let aimTreeItemSiblings = aimTreeItemContainer.parentNode.children;

        if (aimTreeItemContainer.children.length <= 1) {
            this.props.onChoose && this.props.onChoose();
        }

        if (aimTreeItem.classList.contains(activeClassName)) {
            aimTreeItem.classList.remove(activeClassName)
        } else {
            for (let i = 0; i < aimTreeItemSiblings.length; i++) {
                aimTreeItemSiblings[i].children[0].classList[aimTreeItemSiblings[i] === aimTreeItem.parentNode ? "add" : "remove"](activeClassName);
            }
        }
    }


    createTree(parentIndex, data) {
        let tree = data.map((item, index) => {
            let subData = item.subData,
                parentIndexForSub = parentIndex + "-" + index,
                ref = "treeItem" + parentIndex + "-" + index;

            return <li key={"tree-item-" + parentIndex + "-" + index}>
                <div className={styles['n-tree-title-container']}
                     ref={e => this[ref] = e}
                     onClick={this.toggleTree.bind(this, ref)}>
                    <span className={styles["n-tree-arrow"]}>
                        {subData && <i className={fonts['icon-tree-arrow']} data-icon></i>}
                    </span>
                    <span className={styles['n-tree-title']}>{item.title}</span>
                </div>
                {subData && this.createTree(parentIndexForSub, subData)}
            </li>
        });

        return [<div key={"n-tree-container-" + parentIndex} className={styles['n-tree-container']}>
            <ul>{tree}</ul>
        </div>];
    }

    render() {

        const tree = this.createTree("", this.state.data);

        return <div className={styles['n-tree']}>
            {tree}
        </div>
    }

}

export default Tree;