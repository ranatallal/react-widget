import React, { useMemo } from "react";
import { createBrowserHistory } from "history";
import { columnsConfigs } from "../../configs";
import { useAPI } from "../../api";
import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableOptions,
} from "mui-datatables";

export const CustomDataGrid = ({
  history = createBrowserHistory(),
  widget = false,
}) => {
  const {data} = useAPI(process.env.REACT_APP_DATA_API);

  const columns = useMemo<MUIDataTableColumnDef[]>(
    () =>
      columnsConfigs.map((column) => {
        return {
          label: column.label,
          name: column.key,
          options: {
            filter: true,
            sort: true,
          },
        };
      }),
    []
  );

  const options: MUIDataTableOptions = {
    responsive: "simple",
    tableBodyHeight: "100%",
  };

  return (
    <>
      {/*@ts-ignore*/}
      <MUIDataTable
        title={"Hey Iam a DataGrid widget!"}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
};
