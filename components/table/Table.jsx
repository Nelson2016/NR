import React from 'react';

import styles from './style/table.scss';

class Table extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const data = this.props.data,
            titleData = data.title || [],
            rowsData = data.rows || [];

        let title = [], rows = [];

        if (titleData.length > 0) {
            title = [<tr key={"tr-th"}>
                {
                    titleData.map((th, thIndex) => <th key={"th-" + thIndex}>
                        {th.data}
                    </th>)
                }
            </tr>]
        }

        if (rowsData.length > 0) {
            rows = rowsData.map((tr, trIndex) => <tr key={"tr-" + trIndex}
                                                      onClick={data.onClickRow && data.onClickRow.bind(this)}>
                {
                    tr.map((td, tdIndex) => <td key={"td-" + tdIndex}>
                        {td.data}
                    </td>)
                }
            </tr>)
        }

        const all = title.concat(rows);

        return <div className={styles["n-table"]}>
            <table>
                {this.props.caption && <caption>{this.props.caption}</caption>}
                <tbody>
                {all}
                </tbody>
            </table>
        </div>
    }

}

export default Table;