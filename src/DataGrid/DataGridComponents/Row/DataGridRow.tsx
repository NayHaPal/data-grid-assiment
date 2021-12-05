import React, {useContext} from "react";
import {DataGridDataContext} from "../../DataGridContext";
import {GridColDef} from "../../Interfaces/ColumnInterface";
import DataGridCell from "../Cell/DataGridCell";
import "./DataGridRow.css"


export default function DataGridRow(props: any) {
    let {options} = useContext(DataGridDataContext);
    let columns = options.columns;
    let rowHeight = options.rowHeight ? {minHeight: `${options.rowHeight}px`, maxHeight: `${options.rowHeight}px`} : {};
    return (
        <div className="data-gird-row" style={rowHeight}>
            {columns && columns.map((column: GridColDef, index: number) => {
                return <DataGridCell key={column.field || index} column={column} row={props.item} rowId={props.rowId}
                                     data={column.field ? props.item[column.field] : ""}/>
            })}
        </div>
    );
}