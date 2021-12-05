import React, {useEffect, useMemo, useState} from "react";
import {dataGridData} from "./Interfaces/ColumnInterface";
import {DataGridDataContext} from "./DataGridContext";
import DataGridRows from "./DataGridComponents/Rows/DataGridRows";
import DataGridNoData from "./DataGridComponents/NoDataFound/DataGridNoData";
import DataGridFooter from "./DataGridComponents/Footer/DataGridFooter";
import "./DataGrid.css"
import {clone} from "./_helper";
import DataGridVirtualRows from "./DataGridComponents/VirtualRows/DataGridVirtualRows";

export default function DataGrid(props: dataGridData) {
    const [_rows, setRows] = useState([]);
    const [visibleRows, setVisibleRows] = useState([]);
    const [options, setOptions] = useState({...props});

    const optionsMemo = useMemo(
        () => {
            return ({options, setOptions})
        },
        [options, _rows]
    );


    function updateVisibleRows() {
        if (!options.pagination) {
            setVisibleRows(_rows);
        } else {
            let firsIndex = ((options.page || 1) - 1) * (options.pageSize || 1);
            let pageSize = options.pageSize || 0;
            setVisibleRows(_rows.slice(firsIndex, firsIndex + pageSize))
        }
    }

    useEffect(() => {
        setRows(clone(props.rows));
        setOptions({...options, rows: clone(props.rows)})
    }, [props.rows])


    useEffect(() => {
        updateVisibleRows();
    }, [options, _rows])

    return (
        <div className="data-gird" style={{width: "100%"}}>
            <DataGridDataContext.Provider value={optionsMemo}>
                <div className={""}>
                    {visibleRows && visibleRows.length ?
                        !options.virtualized ?
                            <DataGridRows items={visibleRows}/> : <DataGridVirtualRows items={visibleRows}/> :
                        <DataGridNoData/>
                    }
                </div>
                <DataGridFooter/>
            </DataGridDataContext.Provider>
        </div>
    );
}