import { Button, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Contact } from "./contact";
import SaveIcon from '@mui/icons-material/Save';
import BadgeIcon from '@mui/icons-material/Badge';
import SipIcon from '@mui/icons-material/Sip';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';
import { useForm } from "react-hook-form";
import { RefetchFunction } from "axios-hooks";
import { removeEmptyFields } from "./utils";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from "react";
import ContactFormTextField from "./ContactFormTextField";

interface ContactFormProps {
  contact?: Contact,
  submitContact: RefetchFunction<any, any>
}

const schema = yup.object({
  name: yup.string().trim().required("Name cannot be empty"),
  internalExtension: yup.string().nullable().matches(/^\+?\d+$|^$/, "This phone number is not valid"),
  homeNumber: yup.string().nullable().matches(/^\+?\d+$|^$/, "This phone number is not valid"),
  mobileNumber: yup.string().nullable().matches(/^\+?\d+$|^$/, "This phone number is not valid"),
  officeNumber: yup.string().nullable().matches(/^\+?\d+$|^$/, "This phone number is not valid"),
  officeMobileNumber: yup.string().nullable().matches(/^\+?\d+$|^$/, "This phone number is not valid"),
  otherNumber: yup.string().nullable().matches(/^\+?\d+$|^$/, "This phone number is not valid"),
}).required();

const ContactForm = ({ contact, submitContact }: ContactFormProps) => {
  const navigate = useNavigate()
  const { handleSubmit, formState: { isValid }, control, trigger, watch } = useForm<Contact>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "", 
      internalExtension: "", 
      officeNumber: "", 
      officeMobileNumber: "", 
      homeNumber: "", 
      mobileNumber: "", 
      otherNumber: "",
      synced: false,
      ...contact
    }
  });

  watch(() => trigger())

  useEffect(() => {
    const subscription = watch((_, {name}) => {
      trigger(name)
    })
    return () => subscription.unsubscribe()
  }, [watch, trigger])

  const onSubmit = (data: Contact) => {
    removeEmptyFields(data)
    submitContact({
      data: {
        ...data,
        name: data.name.trim()
      }
    }).then(() => {
      navigate("/contacts/all")
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid><Typography variant="h4">{contact ? `Editing ${contact.name}` : 'Add New Contact'}</Typography></Grid>
        <Grid>
          <Button color="primary" aria-label="save" variant="contained" size="large" type="submit" disabled={!isValid}>
            <SaveIcon /> &nbsp;&nbsp;
            <Typography>Save</Typography>
          </Button>
        </Grid>
      </Grid>

      <ContactFormTextField 
        name="name" 
        control={control} 
        disabled={contact && contact.synced} 
        label="Name (required)" 
        icon={<BadgeIcon />} 
        extraHelperText={contact && contact.synced && "This contact has been synced with FreePBX and you cannot edit the name."}  
      />

      <ContactFormTextField 
        name="internalExtension" 
        control={control} 
        disabled={contact && contact.synced} 
        label="Internal Extension" 
        icon={<SipIcon />} 
        extraHelperText={contact && contact.synced && "This contact has been synced with FreePBX and you cannot edit the internal extension."}  
      />

      <ContactFormTextField 
        name="homeNumber" 
        control={control} 
        label="Home Number" 
        icon={<HomeIcon />} 
      />

      <ContactFormTextField 
        name="mobileNumber" 
        control={control} 
        label="Mobile Number" 
        icon={<SmartphoneIcon />} 
      />

      <ContactFormTextField 
        name="officeNumber" 
        control={control} 
        label="Office Number" 
        icon={<BusinessIcon />} 
      />

      <ContactFormTextField 
        name="officeMobileNumber" 
        control={control} 
        label="Office Mobile Number" 
        icon={<PhonelinkIcon />} 
      />

      <ContactFormTextField 
        name="otherNumber" 
        control={control} 
        label="Other Number" 
        icon={<DeviceUnknownIcon />} 
      />
    </form>
  )
}

export default ContactForm