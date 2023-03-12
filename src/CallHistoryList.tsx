import axios from "axios";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { CallHistory } from "./callHistory"
import { Button, Unstable_Grid2 as Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import RefreshIcon from '@mui/icons-material/Refresh';
import moment from "moment";
import pbxManagerUrl from "./pbxManagerUrl";

export const loadCallHistory = async (): Promise<CallHistory[]> => {
  const data = (await axios.get<CallHistory[]>(pbxManagerUrl("/call-history/"))).data
  return data;
}

const CallHistoryList = () => {
  const callHistory = useLoaderData() as CallHistory[];
  const revalidateCallHistory = useRevalidator();

  return (
    <>
      <Grid container spacing={2} justifyContent="space-between" mb={1}>
        <Grid><Typography variant="h4">All Contacts</Typography></Grid>
        <Grid>
          <Button color="primary" aria-label="save" variant="contained" size="large" onClick={() => revalidateCallHistory.revalidate()}>
            <RefreshIcon /> &nbsp;&nbsp;
            <Typography>Refresh</Typography>
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {callHistory?.sort((a, b) => {
              if (a.callTime < b.callTime)
                return -1;
              if (a.callTime > b.callTime)
                return 1;
              return 0;
            }).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{moment.unix(row.callTime).format('YYYY/MM/DD HH:mm:ss')}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.number ?? "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CallHistoryList