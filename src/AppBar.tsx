import { AppBar, AppBarProps, styled } from "@mui/material";
import { drawerWidth } from "./constants";

interface PbxManagerAppBarProps extends AppBarProps {
  open?: boolean;
}

const PbxManagerAppBar = styled(AppBar)<PbxManagerAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default PbxManagerAppBar