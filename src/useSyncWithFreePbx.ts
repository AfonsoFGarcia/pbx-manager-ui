import useAxios from "axios-hooks"
import pbxManagerUrl from "./pbxManagerUrl"

type UseSyncWithFreePbxCallback = () => void
type UseSyncWithFreePbxReturn = () => void


const useSyncWithFreePbx = (callback: UseSyncWithFreePbxCallback): UseSyncWithFreePbxReturn => {
  const [, reload] = useAxios(pbxManagerUrl("/contacts/sync/"), {
    manual: true
  })
  return () => {
    reload().then(it => callback())
  }
}

export default useSyncWithFreePbx