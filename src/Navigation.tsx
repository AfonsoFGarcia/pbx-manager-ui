import { Divider, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ContactsIcon from '@mui/icons-material/Contacts';
import PhoneIcon from '@mui/icons-material/Phone';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  
  return (
    <List component="nav">
      <ListSubheader component="div" inset>
        Contacts
      </ListSubheader>
      <ListItemButton onClick={() => navigate("/contacts/all")}>
        <ListItemIcon>
          <ContactsIcon />
        </ListItemIcon>
        <ListItemText primary="Show All Contacts" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/contacts/add")}>
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="Add New Contact" />
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      <ListSubheader component="div" inset>
        Caller ID
      </ListSubheader>
      <ListItemButton onClick={() => navigate("/caller-id/inbound")}>
        <ListItemIcon>
          <CallReceivedIcon />
        </ListItemIcon>
        <ListItemText primary="Show Inbound History" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/caller-id/verify")}>
        <ListItemIcon>
          <PhoneIcon />
        </ListItemIcon>
        <ListItemText primary="Verify Caller ID" />
      </ListItemButton>
    </List>
  )
}

export default Navigation