import React, {useContext} from "react";
import DataGridRow from "../Row/DataGridRow";
import {DataGridDataContext} from "../../DataGridContext";
import "./DataGridRows.css"
import DataGridHeader from "../Header/DataGridHeader";

export default function DataGridRows(props: any) {
    const {options, setOptions} = useContext(DataGridDataContext);
    let height = options.height ? {height: options.height + "px"} : {};
    return (
        <div className="data-gird-rows" style={height}>
            <DataGridHeader/>
            {props.items && props.items.length ? props.items.map((item: any, index: number) => {
                    return <DataGridRow key={index} item={item} rowId={index}/>
                })
                : ""}
        </div>
    );
}