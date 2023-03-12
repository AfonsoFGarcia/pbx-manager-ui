import useAxios from "axios-hooks";
import { pbxManagerUrl } from "./constants";
import ContactForm from "./ContactForm";

const AddContact = () => {
  const [, submitContact] = useAxios({
    url: pbxManagerUrl("/contacts/"),
    method: "POST"
  }, {
    manual: true
  })

  return (
    <ContactForm submitContact={submitContact} />
  )
}

export default AddContact