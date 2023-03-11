import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddContact from "./AddContact";
import App from "./App";
import CallHistoryList, { loadCallHistory } from "./CallHistoryList";
import EditContact, { loadContact } from "./EditContact";
import ListContacts, { loadContacts } from "./ListContacts";
import VerifyCid from "./VerifyCid";

const routes = createBrowserRouter([
  {
    path: "/",
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
        loader: loadCallHistory,
        element: (<CallHistoryList />)
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