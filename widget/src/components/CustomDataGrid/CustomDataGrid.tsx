import React, {useMemo} from 'react';
import {Grid, useMediaQuery, useTheme} from '@mui/material';
import {DataGrid, GridColDef, GridToolbarContainer} from '@mui/x-data-grid';
import {createBrowserHistory} from "history";
import {columnsConfigs} from "../../configs";
import {useAPI} from "../../api";

const CustomToolbar = () => {
    return (
        <GridToolbarContainer style={{justifyContent: 'center'}}>
            <p className={"heading"}>
                Hey Iam a DataGrid Widget!
            </p>
        </GridToolbarContainer>
    );
}

const MobileRow = ({rowData}: { rowData: any }) => {
    return (
        <Grid sx={{borderBottom: '1px solid black', p: '0.5rem 0 0.5rem 0'}} container justifyContent={'center'}
              alignItems={'center'}>
            {columnsConfigs.map((column, index) =>
                <Grid container item key={index}>
                    <Grid sx={{fontWeight: 'bold'}} item xs={6} sm={6}>{column.label}</Grid>
                    <Grid item xs={6} sm={6}>{rowData[column.key]}</Grid>
                </Grid>
            )}
        </Grid>
    )
}

export const CustomDataGrid = ({history = createBrowserHistory(), widget = false}) => {
    const {loading, data} = useAPI(process.env.REACT_APP_DATA_API);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const columns = useMemo<GridColDef[]>(() => columnsConfigs.map((column) => {
        return {
            field: column.key,
            headerName: column.label,
            type: column.type,
            flex: 1,
            hide: matches,
            valueGetter: ({value}) => column.type === 'date' ? value && new Date(value) : value,
        }
    }), [matches])

    return (
        <div style={{height: '100%', width: '100%'}}>
            <DataGrid disableVirtualization={matches} components={{
                Toolbar: CustomToolbar, ...matches && {
                    Row: (rowData) => <MobileRow rowData={rowData.row}/>
                }
            }} loading={loading} rows={data} columns={columns}/>
        </div>
    );
};
