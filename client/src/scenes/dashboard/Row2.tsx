import BoxHeader from "@/components/BoxHeader";
import { Box, Typography, useTheme } from "@mui/material";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery, useGetTransactionsQuery } from "@/state/api";
import { DataGrid, GridCellParams} from "@mui/x-data-grid";

const Row2 = () => {

  const {data: kpiData} = useGetKpisQuery()
  console.log("kpiData",kpiData)
  const {data : transactionsData} = useGetTransactionsQuery()
  console.log("transactionsData",transactionsData)

  const {palette} = useTheme()

  const transactionscolumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.3,
      renderCell: (params: GridCellParams) =>`$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Counts",
      flex: 0.1,
      renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
    },
  ]

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="List of Transactions"
          sideText={`${transactionsData?.length} Latest Transactions`}
        />
        <Box
          mt="1rem"
          p="0 0.7rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none"
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `0.9px solid ${palette.grey[800]}`,
            },
            "& .MuiDataGrid-columnHeader": {
              borderBottom: `1px solid ${palette.grey[800]}`
            },
            "& .MuiDataGrid-columnSeperator": {
              visibility: "hidden"
            }
          }}
        >
          <DataGrid 
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionsData || []}
            columns={transactionscolumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="e">
      <BoxHeader title="Overall Summary Data" sideText="+31%" />
          <Box
            height="20px"
            margin="1.25rem 1rem 0.4rem 1rem"
            bgcolor={palette.primary[800]}
            borderRadius="1rem"
          >
            <Box
              height="20px"
              bgcolor={palette.primary[600]}
              borderRadius="1rem"
              width="40%"
            >
            </Box>
            <Typography  paddingTop="20px"margin="0 1rem" variant="h5">
              <ul>
                <li>All the Transaction is shown in Data-Grid is Random Transaction which is connected through the backend</li>
                <li>The Charts is taken reference from the Recharts website.</li>
                <li>The Website is Connected through Server and Client page which will be helpful to see the real time changes which are occur in Page.</li>
                <li>There are 3 types of charts are used the ResponsiveContainer Charts, LineCharts and PieCharts. which have some data in the backend. All of this is Developed by <b><u>Nikhil Mishra</u></b></li>
              </ul>

            </Typography>
          </Box>


      </DashboardBox>
    </>
  );
};

export default Row2;