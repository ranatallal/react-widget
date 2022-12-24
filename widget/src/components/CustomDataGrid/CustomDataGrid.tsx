import React, {useMemo} from 'react';
import { DataGrid,GridColDef,GridToolbarContainer} from '@mui/x-data-grid';
import {createBrowserHistory} from "history";
import {columnsConfigs} from "../../configs";
import {useAPI} from "../../api";

const CustomToolbar=()=> {
    return (
        <GridToolbarContainer style={{ justifyContent: 'center' }}>
            <p className={"heading"}>
                Hey Iam a DataGrid Widget!
            </p>
        </GridToolbarContainer>
    );
}

export const CustomDataGrid=({history=createBrowserHistory(),widget=false})=> {
    const {loading,data}=useAPI(process.env.REACT_APP_DATA_API);
    const columns=useMemo<GridColDef[]>(()=>columnsConfigs.map((column)=>{
        return {
            field:column.key,
            headerName:column.label,
            type:column.type,
            flex:1,
            valueGetter: ({ value }) => column.type==='date'? value && new Date(value):value,
        }
    }),[])

    return (
           <div style={{ height:'100%', width: '100%' }}>
              <DataGrid components={{Toolbar: CustomToolbar}} loading={loading} rows={data} columns={columns} />
           </div>
    );
};
