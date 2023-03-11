import { Typography } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddContact from "./AddContact";
import App from "./App";
import EditContact, { loadContact } from "./EditContact";
import ListContacts, { loadContacts } from "./ListContacts";
import VerifyCid from "./VerifyCid";

const routes = createBrowserRouter([
  {
    path: "/ui/",
    element: (<App />),
    children:[
      {
        path: "contacts/all",
        loader: loadContacts,
        element: (<ListContacts />)
      },
      {
        path: "contacts/:contactId",
        loader: loadContact,
        element: (<EditContact />)
      },
      {
        path: "contacts/add",
        element: (<AddContact />)
      },
      {
        path: "caller-id/inbound",
        element: (<Typography>Inbound history</Typography>)
      },
      {
        path: "caller-id/verify",
        element: (<VerifyCid />)
      }
    ]
  },
])

const Router = () => {
  return (<RouterProvider router={routes} />)
}

export default Router