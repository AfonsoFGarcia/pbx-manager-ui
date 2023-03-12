import { Button, Unstable_Grid2 as Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import axios from "axios"
import useAxios from "axios-hooks"
import { useLoaderData, useRevalidator } from "react-router-dom"
import { Contact } from "./contact"
import ListContactsRow from "./ListContactsRow"
import RefreshIcon from '@mui/icons-material/Refresh';
import SyncIcon from '@mui/icons-material/Sync';
import useSyncWithFreePbx from "./useSyncWithFreePbx"
import pbxManagerUrl from "./pbxManagerUrl"

export const loadContacts = async (): Promise<Contact[]> => {
  const data = (await axios.get<Contact[]>(pbxManagerUrl("/contacts/"))).data
  return data;
}

const ListContacts = () => {
  const contacts = useLoaderData() as Contact[];
  const revalidateContacts = useRevalidator();
  const [, executeDelete] = useAxios({
    method: "DELETE"
  }, {
    manual: true
  })
  const syncWithFreePbx = useSyncWithFreePbx(() => revalidateContacts.revalidate())

  const deleteAndReload = (contactId: number) => {
    executeDelete({
      url: pbxManagerUrl(`/contacts/${contactId}`)
    }).then(() => revalidateContacts.revalidate())
  }

  return (
    <>
      <Grid container spacing={2} justifyContent="space-between" mb={1}>
        <Grid><Typography variant="h4">All Contacts</Typography></Grid>
        <Grid>
          <Button color="warning" aria-label="save" variant="contained" size="large" onClick={() => syncWithFreePbx()} sx={{marginRight: 2}}>
            <SyncIcon /> &nbsp;&nbsp;
            <Typography>Sync with FreePBX</Typography>
          </Button>
          <Button color="primary" aria-label="save" variant="contained" size="large" onClick={() => revalidateContacts.revalidate()}>
            <RefreshIcon /> &nbsp;&nbsp;
            <Typography>Refresh</Typography>
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Internal&nbsp;Extension</TableCell>
              <TableCell>Home</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Office</TableCell>
              <TableCell>Office&nbsp;Mobile</TableCell>
              <TableCell>Other&nbsp;Number</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts?.map((row) => (
              <ListContactsRow row={row} deleteAndReload={deleteAndReload} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ListContacts