import useAxios from "axios-hooks";
import ContactForm from "./ContactForm";

const AddContact = () => {
  const [, submitContact] = useAxios({
    url: `https://pbx-manager.afonsogarcia.dev/api/contacts/`,
    method: "POST"
  }, {
    manual: true
  })

  return (
    <ContactForm submitContact={submitContact} />
  )
}

export default AddContact