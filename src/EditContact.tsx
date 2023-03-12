import axios from "axios";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Contact } from "./contact";
import useAxios from "axios-hooks";
import ContactForm from "./ContactForm";
import pbxManagerUrl from "./pbxManagerUrl";

export const loadContact = async ({ params }: LoaderFunctionArgs): Promise<Contact> => {
  const data = (await axios.get<Contact>(pbxManagerUrl(`/contacts/${params.contactId}`))).data
  return data;
}

const EditContact = () => {
  const contact = useLoaderData() as Contact;

  const [, submitContact] = useAxios({
    url: pbxManagerUrl(`/contacts/${contact.id}`),
    method: "PATCH"
  }, {
    manual: true
  })

  return (
    <ContactForm contact={contact} submitContact={submitContact} />
  )
}

export default EditContact