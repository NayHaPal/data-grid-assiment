import React, {useContext} from "react";
import DataGridRow from "../Row/DataGridRow";
import {DataGridDataContext} from "../../DataGridContext";
import "./DataGridVirtualRows.css"
// @ts-ignore
import {List} from 'react-virtualized';

import DataGridHeader from "../Header/DataGridHeader";
import {GridColDef} from "../../Interfaces/ColumnInterface";

export default function DataGridVirtualRows(props: any) {
    const {options, setOptions} = useContext(DataGridDataContext);
    function rowRenderer({
                             index, // Index of row
                             isScrolling, // The List is currently being scrolled
                             isVisible, // This row is visible within the List (eg it is not an overscanned row)
                             key, // Unique key within array of rendered rows
                             parent, // Reference to the parent List (instance)
                             style, // Style object to be applied to row (to position it);
                         }: any) {
        const item = props.items[index];
        const content = isScrolling ? '...' : <DataGridRow key={key} item={item} style={style} rowId={index}/>;
        return (
            <div key={key} style={style}>
                {content}
            </div>
        );
    }

    const  getColumnsWidth = ()=>{
        let columnsWidth = 0;
        options && options.columns && (options.columns || []).map((item: GridColDef) => {
            columnsWidth = columnsWidth + (item.width || 0);
        })
        return columnsWidth + ((options.columns || []).length * 20);
    }

    let columnsWidth = getColumnsWidth();

    return (
        <div className="data-gird-virtual-rows">
            <DataGridHeader/>
            <List
                width={columnsWidth}
                height={options.height}
                rowCount={props.items.length}
                rowHeight={options.rowHeight}
                rowRenderer={rowRenderer}
            />
        </div>
    );
}