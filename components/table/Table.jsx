import React from 'react';

import styles from './style/table.scss';

class Table extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const title = [<tr key={"tr-th"}>
            {
                this.props.data.title.map((th, thIndex) => <th key={"th-" + thIndex}>
                    {th.data}
                </th>)
            }
        </tr>];

        const data = this.props.data.rows.map((tr, trIndex) => <tr key={"tr-" + trIndex}
                                                                   onClick={this.props.data.onClickRow && this.props.data.onClickRow.bind(this)}>
            {
                tr.map((td, tdIndex) => <td key={"td-" + tdIndex}>
                    {td.data}
                </td>)
            }
        </tr>);

        const rows = title.concat(data);

        return <div className={styles["n-table"]}>
            <table>
                {this.props.caption && <caption>{this.props.caption}</caption>}
                <tbody>
                {rows}
                </tbody>
            </table>
        </div>
    }

}

export default Table;