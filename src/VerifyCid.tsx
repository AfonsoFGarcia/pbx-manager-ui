import { Box, Paper, TextField, Typography } from "@mui/material"
import useAxios from "axios-hooks"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import pbxManagerUrl from "./pbxManagerUrl"

const VerifyCid = () => {
  const [callerId, setCallerId] = useState<String>("")
  const [debouncedCallerId] = useDebounce(callerId, 500)
  const [{data}, refreshData] = useAxios(pbxManagerUrl(`/cid/check/${debouncedCallerId}`))

  useEffect(() => {
    refreshData()
  }, [callerId, refreshData])

  return (
    <Paper>
      <Box p={2}>
        <TextField label="Phone number" variant="outlined" fullWidth margin="normal" value={callerId} onChange={value => setCallerId(value.target.value)} />
        <Typography>Caller ID: <b>{data}</b></Typography>
      </Box>
    </Paper>
  )
}

export default VerifyCid