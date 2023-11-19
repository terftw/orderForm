import ResponsiveAppBar from "@/components/organisms/NavBar";
import OrderForm from "@/components/organisms/OrderForm";
import { WalletStatus } from "@cosmos-kit/core";
import { useChain } from "@cosmos-kit/react";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

const MainPage = (): React.ReactElement => {
  const { status } = useChain("nyks");

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={status === WalletStatus.Error || status === WalletStatus.Rejected}
        autoHideDuration={3000}
      >
        <Alert severity="error">
          {status === WalletStatus.Error
            ? "A log in error has occurred. Click on the LOGIN button to retry"
            : "Your log in attempt is rejected. Click on the LOGIN button to retry"}
        </Alert>
      </Snackbar>
      <ResponsiveAppBar />
      <OrderForm />
    </>
  );
};

export { MainPage };
