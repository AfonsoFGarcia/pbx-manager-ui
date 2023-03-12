import { TextField, InputAdornment } from "@mui/material"
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import { Contact } from "./contact"

interface ContactFormTextFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>,
  label: string,
  disabled?: boolean,
  control?: Control<TFieldValues>,
  extraHelperText?: React.ReactNode,
  icon: JSX.Element
}

const ContactFormTextField = ({name, control, disabled = false, label, icon, extraHelperText}: ContactFormTextFieldProps<Contact>) => {
  return (
    <Controller name={name} control={control} render={
        ({field, fieldState}) =>
          <TextField fullWidth label={label} variant="outlined" margin="normal" disabled={disabled} InputProps={{
            startAdornment: <InputAdornment position="start"> {icon} </InputAdornment>,
          }} error={fieldState.isTouched && fieldState.invalid} helperText={extraHelperText || (fieldState.isTouched && fieldState.error?.message)}
          {...field} />
      } />
  )
}

export default ContactFormTextField