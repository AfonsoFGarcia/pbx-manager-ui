import useAxios from "axios-hooks";
import ContactForm from "./ContactForm";
import pbxManagerUrl from "./pbxManagerUrl";

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