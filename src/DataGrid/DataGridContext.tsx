import * as React from "react";
import {dataGridContext} from "./Interfaces/ColumnInterface";


let defaults: dataGridContext = {
    options: {},
    setOptions: () => {
    },
};
export const DataGridDataContext = React.createContext(defaults);
