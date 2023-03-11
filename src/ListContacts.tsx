import { Button, Unstable_Grid2 as Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import axios from "axios"
import useAxios from "axios-hooks"
import { useLoaderData, useRevalidator } from "react-router-dom"
import { Contact } from "./contact"
import ListContactsRow from "./ListContactsRow"
import RefreshIcon from '@mui/icons-material/Refresh';

export const loadContacts = async (): Promise<Contact[]> => {
  const data = (await axios.get<Contact[]>(`https://pbx-manager.afonsogarcia.dev/api/contacts/`)).data
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

  const deleteAndReload = (contactId: number) => {
    executeDelete({
      url: `https://pbx-manager.afonsogarcia.dev/api/contacts/${contactId}`
    }).then(() => revalidateContacts.revalidate())
  }

  return (
    <>
      <Grid container spacing={2} justifyContent="space-between" mb={1}>
        <Grid><Typography variant="h4">All Contacts</Typography></Grid>
        <Grid>
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
            {contacts?.sort((a, b) => a.name.localeCompare(b.name)).map((row) => (
              <ListContactsRow row={row} deleteAndReload={deleteAndReload} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ListContacts