import { IconButton, TableCell, TableRow } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { Contact } from "./contact"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface ListContactsRowProps { 
  row: Contact, 
  deleteAndReload: (contactId: number) => void 
}

const ListContactsRow = ({ row, deleteAndReload }: ListContactsRowProps) => {
  const navigate = useNavigate();
  
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell>{row.internalExtension ?? "-"}</TableCell>
      <TableCell>{row.homeNumber ?? "-"}</TableCell>
      <TableCell>{row.mobileNumber ?? "-"}</TableCell>
      <TableCell>{row.officeNumber ?? "-"}</TableCell>
      <TableCell>{row.officeMobileNumber ?? "-"}</TableCell>
      <TableCell>{row.otherNumber ?? "-"}</TableCell>
      <TableCell>
        <IconButton aria-label="edit" onClick={() => navigate(`/contacts/${row.id}`)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => deleteAndReload(row.id)}>
          <DeleteIcon />
        </IconButton></TableCell>
    </TableRow>
  )
}

export default ListContactsRow