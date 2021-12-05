import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import './App.css';
import DataGrid from "./DataGrid/DataGrid";
import {GridCellParams, GridColDef} from "./DataGrid/Interfaces/ColumnInterface";
import ImageColumn from "./ImageColumn/ImageColumn";
import {clone} from "./DataGrid/_helper";

function App() {

    const [data, setData] = useState([]);
    const [dataSmall, setDataSmall] = useState([]);
    const refGrid = useRef(null);
    let dataVar: any;

    // @ts-ignore
    useEffect(async () => {
        const getData = async () => {
            let data = await fetch('http://localhost:3000/MOCK_DATA.json');
            data = await data.json()
            return data;
        }
        let ListOfCity = await getData();
        // @ts-ignore
        setData(ListOfCity);
        dataVar = ListOfCity;

        const getDataSmall = async () => {
            let data = await fetch('http://localhost:3000/MOCK_DATA_SMALL.json');
            data = await data.json()
            return data;
        }
        let ListOfCity2 = await getDataSmall();
        // @ts-ignore
        setDataSmall(ListOfCity2);
    }, [])


    function deleteRow(param: GridCellParams) {
        let _data = clone(dataVar)
        _data = _data.filter((item: any) => item.id !== param.row.id);
        dataVar = _data;
        setData(_data);
    }

    let columns: GridColDef [] = [
        {
            field: "id",
            headerName: "Id",
            description: "Id",
            width: 30,
            hide: false,
            editable: false,
            type: "number",
        },
        {
            field: "cityName",
            headerName: "City Name",
            description: "City Name",
            width: 140,
            hide: false,
            editable: true,
            type: "string",
        },
        {
            field: "description",
            headerName: "Description",
            description: "Description",
            width: 350,
            hide: false,
            editable: false,
            type: "string",
            renderEditCell: (params: any) => null,
        },
        {
            field: "image",
            headerName: "Image",
            description: "Image",
            width: 360,
            hide: false,
            editable: false,
            type: "custom",
            renderCell: (params) => {
                return <ImageColumn {...params} />;
            },
            renderEditCell: (params) => null,
        },
        {
            field: "options",
            headerName: "Options",
            description: "Options",
            width: 100,
            hide: false,
            editable: false,
            type: "custom",
            renderCell: (params) => {
                return <button onClick={() => deleteRow(params)}> Delete </button>;
            },
            renderEditCell: (params: any) => null,
        }
    ]

    return (
        <div className="App">


            <h4>Simple data Grid with few rows</h4>
            <div>
                <DataGrid
                    columns={columns}
                    rows={dataSmall}
                    height={500}
                />
            </div>

            <h4>Data Grid Table with pagination Example </h4>
            <div>
                <DataGrid
                    columns={columns}
                    rows={data}
                    height={600}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    // @TODO: Implement some more Item and APIS next phase
                    //     onCellEditFinished={(params) => {
                    //     }}
                    //      onPageChange={(newPage: number) => {
                    //          alert(newPage);
                    //      }}
                    //     loading={"loading..."}
                    //     serverPagination
                    //     totalItem = {5000}
                    //     onCellEditBegin={(params) => {
                    //     }}
                    //     onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                />
            </div>

            <h4>Data Grid Table virtual Example</h4>
            <div>
                <DataGrid
                    columns={columns}
                    rows={data}
                    height={500}
                    rowHeight={50}
                    pageSize={5000}
                    virtualized
                />
            </div>


        </div>
    );
}

export default App;
