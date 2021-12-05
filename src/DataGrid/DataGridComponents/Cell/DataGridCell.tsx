import React, {useEffect, useRef, useState} from "react";
import {GridCellMode, GridCellParams, GridColDef, GridRowId, GridColTypes} from "../../Interfaces/ColumnInterface";
import "./DataGridCell.css"

function useOutsideAlerter(ref: any, switchFun: any) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                switchFun()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


export default function DataGridCell(props: { column: GridColDef, row: any, data: any, rowId: GridRowId }) {

    const [mode, setMode] = useState<GridCellMode>("view");
    const [data, setData] = useState<any>(props.data);
    const wrapperRef = useRef(null);

    useEffect(() => {
        setData(props.data);
    }, [props.data])

    let param: GridCellParams = {
        row: props.row,
        rowId: props.rowId,
        field: props.column.field,
        value: props.data,
        isEditable: props.column.editable,
        cellMode: mode,
    }

    const handleBlur = () => {
        switchToViewMode()
    }
    useOutsideAlerter(wrapperRef, handleBlur);

    const handleChange = (event: { target: { value: any; }; }) => {
        let newValue = event.target.value;
        setData(newValue)
    }

    const renderEditMode = () => {
        let column: GridColDef = props.column;
        if (column.editable) {
            return column.renderEditCell ? column.renderEditCell(param) :
                <input ref={wrapperRef} type="text" className="editInput" value={data} onChange={handleChange}
                       onBlur={handleBlur}/>
        }
        return data;
    }

    const switchToEditMode = () => {
        if (props.column.editable) {
            setMode("edit")
        }
    }

    const switchToViewMode = () => {
        if (props.column.editable) {
            setMode("view")
        }
    }
    return (
        mode === "view" ?
            <div className="data-grid-cell" onDoubleClick={() => {
                switchToEditMode()
            }} style={{minWidth: `${props.column.width}px`, maxWidth: `${props.column.width}px`}}>
                {props.column.renderCell ? props.column.renderCell(param) : data}
            </div>
            :
            <div className="data-grid-cell"
                 style={{minWidth: `${props.column.width}px`, maxWidth: `${props.column.width}px`}}>
                {props.column.renderEditCell ? props.column.renderEditCell(param) :
                    renderEditMode()
                }
            </div>
    );
}