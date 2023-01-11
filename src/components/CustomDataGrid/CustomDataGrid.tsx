import React, { useMemo } from "react";
import { columnsConfigs } from "../../configs";
import { useAPI } from "../../api";
import { useMediaQuery, useTheme } from "@mui/material";
import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableOptions,
} from "mui-datatables";

interface IProps {
  title?: string;
  subtitle?: string;
}
export const CustomDataGrid = ({ title, subtitle }: IProps) => {
  const { data } = useAPI(process.env.REACT_APP_DATA_API);
  const theme = useTheme();
  const isMobile = useMediaQuery(() => theme.breakpoints.down("sm"));
  const columns = useMemo<MUIDataTableColumnDef[]>(
    () =>
      columnsConfigs
        .sort((x, y) => {
          if (x.key === title) return -1;
          else if (y.key === subtitle) return 1;
          return 0;
        })
        .reduce((acc: MUIDataTableColumnDef[], column, index) => {
          if (isMobile) {
            if (acc.length < 2)
              acc.push({
                label: column.label,
                name: column.key,
                options: {
                  filter: true,
                  viewColumns: false,
                  sort: true,
                },
              });
          } else
            acc.push({
              label: column.label,
              name: column.key,
              options: {
                filter: true,
                sort: true,
              },
            });
          return acc;
        }, []),
    [isMobile, title, subtitle]
  );

  const options: MUIDataTableOptions = {
    responsive: "simple",
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
