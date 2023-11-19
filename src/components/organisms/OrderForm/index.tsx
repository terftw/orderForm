import * as React from "react";
import {
  Box,
  Container,
  Grid,
  Slider,
  Switch,
  Tab,
  Tabs,
  TextField,
  FormControlLabel,
  styled,
  Divider,
  Paper,
  Link,
} from "@mui/material";
import { useChain } from "@cosmos-kit/react";
import { WalletStatus } from "@cosmos-kit/core";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  marginLeft: 8,
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      "& + .MuiSwitch-track": {
        backgroundColor: "#76fbcb",
        opacity: 1,
        border: 0,
      },
      "& .MuiSwitch-thumb": {
        color: "#FFF",
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    color: "#07081b",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#76fbcb",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const OrderForm = (): React.ReactElement => {
  const [value, _] = React.useState(0);
  const { status } = useChain("nyks");
  const isNotConnected = status !== WalletStatus.Connected;

  return (
    <Container maxWidth="md">
      {isNotConnected ? (
        <Paper sx={{ mt: 2, p: 2 }}>
          <h1 className="text-lg">No wallet selected</h1>
          <h5 className="text-sm">
            Download the Keplr Browser Extension to select your wallet
          </h5>
          <Link href="https://www.keplr.app/download" target="_blank">
            https://www.keplr.app/download
          </Link>
          <br />
          <br />
          <h5 className="text-sm">
            Once you have selected a wallet, you will be able to view the order
            form
          </h5>
        </Paper>
      ) : (
        <Box
          sx={{
            bgcolor: "#07081b",
            height: "100vh",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 2,
            padding: 2,
            marginTop: 2,
          }}
        >
          <Box display="flex" justifyContent="space-between" sx={{ mr: 2 }}>
            <Box
              display="flex"
              justifyContent="center"
              sx={{ py: 1, px: 4, background: "#212031", borderRadius: 2 }}
            >
              <h5 className="py-1 pr-4 text-gray-300">Cross</h5>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: "rgb(209, 213, 219)" }}
              />
              <h5 className="py-1 pl-4 text-gray-300">5.00x</h5>
            </Box>
            <FormControlLabel
              value="Open"
              control={<CustomSwitch />}
              label="Open"
              labelPlacement="start"
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                aria-label="basic tabs example"
                TabIndicatorProps={{
                  sx: {
                    backgroundColor: "#ec56c8",
                  },
                }}
                sx={{ borderBottom: "1px solid gray" }}
              >
                <Tab
                  label="Limit"
                  {...a11yProps(0)}
                  className="normal-case text-gray-500"
                  sx={{
                    "&.Mui-selected": { color: "white", fontWeight: "bold" },
                  }}
                />
                <Tab
                  label="Market"
                  {...a11yProps(1)}
                  className="normal-case text-gray-500"
                />
                <Tab
                  label="Stop"
                  {...a11yProps(2)}
                  className="normal-case text-gray-500"
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Box display="flex" flexDirection="column" sx={{ marginTop: 4 }}>
                <h5 className="text-gray-400 m-1">Price (USDT)</h5>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      id="outlined-number"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                      sx={{
                        background: "#212031",
                        flexGrow: 1,
                        width: "100%",
                        input: { color: "rgba(255, 255, 255, 0.87)" },
                        borderRadius: "8px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="some-type"
                      placeholder="BBO"
                      sx={{
                        background: "#212031",
                        width: "100%",
                        input: { color: "rgba(255, 255, 255, 0.87)" },
                        borderRadius: "8px",
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box display="flex" flexDirection="column" sx={{ marginTop: 2 }}>
                <h5 className="text-gray-400 m-1">Amount (Cont)</h5>
                <TextField
                  sx={{
                    background: "#212031",
                    marginBottom: 2,
                    input: { color: "rgba(255, 255, 255, 0.87)" },
                  }}
                  placeholder="Single contract value 0.01 BTC"
                />
                <Slider
                  step={2.5}
                  max={10}
                  marks={[
                    { value: 0, label: "0" },
                    { value: 2.5, label: "" },
                    { value: 5, label: "" },
                    { value: 7.5, label: "" },
                    { value: 10, label: "100%" },
                  ]}
                  sx={{
                    color: "gray",
                    width: "98%",
                    "& .MuiSlider-thumb": {
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      marginLeft: "6px",
                      color: "white",
                      "&:before": {
                        boxShadow: "none",
                      },
                    },
                  }}
                  classes={{
                    markLabel: "text-gray-400",
                    mark: "h-4 w-4 rounded-lg",
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="column" sx={{ marginTop: 2 }}>
                <span className="text-gray-400 mb-4">
                  Available <span className="text-gray-50">-- USDT</span>
                </span>
                <span className="text-gray-400">
                  Max (Long) <span className="text-gray-50 mr-4">-- Cont</span>
                  Max (Short) <span className="text-gray-50">-- Cont</span>
                </span>
              </Box>
            </CustomTabPanel>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default OrderForm;
