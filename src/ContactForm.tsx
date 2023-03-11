import { Button, InputAdornment, TextField, Typography, Unstable_Grid2 as Grid } from "@mui/material";
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

interface ContactFormProps {
  contact?: Contact,
  submitContact: RefetchFunction<any, any>
}

const schema = yup.object({
  name: yup.string().required(),
  internalExtension: yup.string().matches(/^\+?\d+$|^$/, "Invalid phone number"),
  homeNumber: yup.string().matches(/^\+?\d+$|^$/, "Invalid phone number"),
  mobileNumber: yup.string().matches(/^\+?\d+$|^$/, "Invalid phone number"),
  officeNumber: yup.string().matches(/^\+?\d+$|^$/, "Invalid phone number"),
  officeMobileNumber: yup.string().matches(/^\+?\d+$|^$/, "Invalid phone number"),
  otherNumber: yup.string().matches(/^\+?\d+$|^$/, "Invalid phone number"),
}).required();

const ContactForm = ({ contact, submitContact }: ContactFormProps) => {
  const navigate = useNavigate()
  const { handleSubmit, register, formState: { isValid, errors } } = useForm<Contact>({
    resolver: yupResolver(schema),
    ...(contact ? {
      defaultValues: contact
    } : {})
  });

  const onSubmit = (data: Contact) => {
    removeEmptyFields(data)
    submitContact({
      data: data
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

      <TextField fullWidth label="Name (required)" variant="outlined" margin="normal" InputProps={{
        startAdornment: <InputAdornment position="start"> <BadgeIcon /></InputAdornment>,
      }} {...register("name")} error={errors.name !== undefined} helperText={errors.name?.message} />

      <TextField fullWidth label="Internal Extension" variant="outlined" margin="normal" InputProps={{
        startAdornment: <InputAdornment position="start"> <SipIcon /></InputAdornment>,
      }} {...register("internalExtension")} />

      <TextField fullWidth label="Home Number" variant="outlined" margin="normal" InputProps={{
        startAdornment: <InputAdornment position="start"> <HomeIcon /></InputAdornment>,
      }} {...register("homeNumber")} />

      <TextField fullWidth label="Mobile Number" variant="outlined" margin="normal" InputProps={{
        startAdornment: <InputAdornment position="start"> <SmartphoneIcon /></InputAdornment>,
      }} {...register("mobileNumber")} />

      <TextField fullWidth label="Office Number" variant="outlined" margin="normal" InputProps={{
        startAdornment: <InputAdornment position="start"> <BusinessIcon /></InputAdornment>,
      }} {...register("officeNumber")} />

      <TextField fullWidth label="Office Mobile Number" variant="outlined" margin="normal" InputProps={{
        startAdornment: <InputAdornment position="start"> <PhonelinkIcon /></InputAdornment>,
      }} {...register("officeMobileNumber")} />

      <TextField fullWidth label="Other Number" variant="outlined" margin="normal" InputProps={{
        startAdornment: <InputAdornment position="start"> <DeviceUnknownIcon /></InputAdornment>,
      }} {...register("otherNumber")} />
    </form>
  )
}

export default ContactForm