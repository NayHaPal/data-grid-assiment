import React, {useContext, useEffect} from "react";
import DataGridRow from "../Row/DataGridRow";
import {DataGridDataContext} from "../../DataGridContext";
import "./DataGridVirtualRows.css"
// @ts-ignore
import {List} from 'react-virtualized';

import DataGridHeader from "../Header/DataGridHeader";

export default function DataGridVirtualRows(props: any) {
    const {options, setOptions} = useContext(DataGridDataContext);
    let height = options.height ? {height: options.height + "px"} : {};
    function rowRenderer({
                             index, // Index of row
                             isScrolling, // The List is currently being scrolled
                             isVisible, // This row is visible within the List (eg it is not an overscanned row)
                             key, // Unique key within array of rendered rows
                             parent, // Reference to the parent List (instance)
                             style, // Style object to be applied to row (to position it);
                         }: any) {
        const item = props.items[index];
        const content = isScrolling ? '...' : <DataGridRow key={item.id} item={item} style={style} rowId={index}/>;
        return (
            <div key={key} style={style}>
                {content}
            </div>
        );
    }
    useEffect(()=>{
        // let firstElement = document.querySelector(".ReactVirtualized__List");
        // let innerElement = document.querySelector(".ReactVirtualized__Grid__innerScrollContainer");
        // ((firstElement||{}).style||{}).width= '100%';
        // ((innerElement||{}).style||{}).width= '100%';
        //


    },[])

    return (
        <div className="data-gird-virtual-rows">
            <DataGridHeader/>
            <List
                width={1000}
                height={options.height}
                rowCount={props.items.length}
                rowHeight={options.rowHeight}
                rowRenderer={rowRenderer}
            />
        </div>
    );
}