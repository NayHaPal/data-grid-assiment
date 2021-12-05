import React, {useContext} from "react";
import {DataGridDataContext} from "../../DataGridContext";
import "./DataGridHeader.css"

export default function DataGridHeader(props: any) {
    const {options, setOptions} = useContext(DataGridDataContext)
    return (
        <div className="data-gird-header">
            {options.columns && options.columns.map((column) => {
                return <div key={column.field} title={column.headerName} className={"data-grid-cell header"} style={{
                    minWidth: `${column.width}px`,
                    maxWidth: `${column.width}px`
                }}>{column.headerName}</div>
            })}
        </div>
    );
}