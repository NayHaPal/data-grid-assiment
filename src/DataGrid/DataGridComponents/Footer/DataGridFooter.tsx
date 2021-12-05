import React, {useContext} from "react";
import {DataGridDataContext} from "../../DataGridContext";
import "./DataGridFooter.css"

export default function DataGridFooter(props: any) {

    const {options, setOptions} = useContext(DataGridDataContext)
    const defaultListPageSize: number[] = [5, 10, 15, 20, 50, 100];
    const rowsTotal: number = options.rows.length;
    const visibleRowsStart: number = (((options.page || 1) - 1) * (options.pageSize || 0)) + 1;
    let visibleRowsEnd: number = (((options.page || 1)) * (options.pageSize || 0)) + 1;
    visibleRowsEnd = rowsTotal < visibleRowsEnd ? rowsTotal : visibleRowsEnd;


    const handleChange = (event: any) => {
        setOptions({...options, pageSize: parseInt(event.target.value)});
    }

    const nextPage = () => {
        if (options.rows.length >= (options.page || 1) * (options.pageSize || 1)) {
            setOptions({...options, page: (options.page || 1) + 1});
        }
    }

    const previousPage = () => {
        if (options.page && options.page > 1) {
            setOptions({...options, page: (options.page || 1) - 1});
        }
    }

    return (
        options.pagination && !options.virtualized ?
            <div className="data-gird-footer">
            <span>
                 {visibleRowsStart} - {visibleRowsEnd} of {rowsTotal}
            </span>
                <span className={"pagination"}>
                    <button disabled={options.page === 1 || typeof options.page === "undefined"}
                            className={"pagination-sign"} onClick={() => {
                        previousPage()
                    }}>  &#60; </button>
                    {options.page || 1}
                    <button disabled={options.rows.length <= (options.page || 1) * (options.pageSize || 1)}
                            className={"pagination-sign"} onClick={() => {
                        nextPage()
                    }}>    &#62;    </button>
                </span>
                <span>
                    <label>
                        {`Rows per page `}
                        <select value={options.pageSize} onChange={handleChange}>
                            {
                                options.rowsPerPageOptions && options.rowsPerPageOptions.length ? options.rowsPerPageOptions.map((item, index) => {
                                        return <option key={index} value={item}>{item}</option>
                                    }) :
                                    defaultListPageSize.map((item) => {
                                        return <option key={`x${item}`} value={item}>{item}</option>
                                    })
                            }
                        </select>
                    </label>
            </span>
            </div>
            :
            <div className="data-gird-footer">
                total {rowsTotal}
            </div>
    );
}