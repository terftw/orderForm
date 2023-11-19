import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import ModeNightIcon from "@mui/icons-material/ModeNight";
import { useChain } from "@cosmos-kit/react";
import { WalletStatus } from "@cosmos-kit/core";

const ResponsiveAppBar = (): React.ReactElement => {
  const chainContext = useChain("nyks");
  const { status, connect, disconnect, address } = chainContext;

  const buttonEventHandler = React.useCallback(() => {
    return status === WalletStatus.Connected ? disconnect() : connect();
  }, [status]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#563c5c" }}>
        <Toolbar variant="dense">
          <ModeNightIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            Twilight
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography
              variant="subtitle2"
              sx={{ mr: 2 }}
            >{`Status: ${status}`}</Typography>
            {address && (
              <Typography variant="subtitle2">{`Wallet Address: ${address}`}</Typography>
            )}
            <Button color="inherit" onClick={buttonEventHandler}>
              {status === WalletStatus.Connected ? `Log Out` : `Login`}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default React.memo(ResponsiveAppBar);
