import React from 'react';

export declare type GridColTypes = 'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'image' | 'custom';
export declare type GridCellMode = 'edit' | 'view';
declare type MuiEvent<E> = E & {
    defaultMuiPrevented?: boolean;
};

export interface GridCellParams {
    rowId: GridRowId;
    field: string;
    row: any;
    value: any;
    isEditable?: boolean;
    cellMode: GridCellMode;
}

declare type GridCellValue = string | number | boolean | Date | null | undefined | object;

export interface GridColDef {
    field: string;
    headerName?: string;
    description?: string;
    width?: number;
    minWidth?: number;
    hide?: boolean;
    editable?: boolean;
    type?: GridColTypes;
    renderCell?: (params: GridCellParams) => React.ReactNode;
    renderEditCell?: (params: any) => React.ReactNode;
}

export interface dataGridContext {
    options: dataGridData,
    setOptions: any
}

export interface dataGridData {
    columns?: GridColDef[];
    rows?: any;
    height?:number;
    page?: number;
    onPageChange?: (page: number, details?: any) => void;
    onPageSizeChange?: (pageSize: number, details?: any) => void;
    pageSize?: number;
    pagination?: boolean;
    virtualized?: boolean;
    rowHeight?: number;
    rowsPerPageOptions?: number[];
    loading?:any;
    rowCount?: number;
    ref?:any;
    onEditCellPropsChange?: (params: GridEditCellPropsParams, event: MuiEvent<React.SyntheticEvent>, details?: any) => void;
    onCellEditCommit?: (params: GridCellEditCommitParams, event: MuiEvent<React.SyntheticEvent>, details?: any) => void;
    onCellEditStart?: (params: GridCellParams, event: MuiEvent<React.SyntheticEvent>) => void;
    onCellEditStop?: (params: GridCellParams, event: MuiEvent<React.SyntheticEvent>) => void;
}

interface GridEditCellPropsParams {
    id: GridRowId;
    field: string;
    props: GridEditCellProps;
}

interface GridEditCellProps {
    value: GridCellValue;
    [prop: string]: any;
}


export declare type GridRowId =  number;

declare type GridColumnLookup = {
    [field: string]: GridStateColDef;
};

interface GridColumnsState {
    all: string[];
    lookup: GridColumnLookup;
}

interface GridStateColDef extends GridColDef {
    computedWidth: number;
}


interface GridPaginationState {
    pageSize: number;
    page: number;
    pageCount: number;
    rowCount: number;
}

interface GridCellEditCommitParams {
    id: GridRowId;
    field: string;
    value: GridCellValue;
}
