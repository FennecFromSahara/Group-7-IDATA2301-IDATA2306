import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { postCheckout } from "../../hooks/apiService";
import { useTheme } from "@emotion/react";

const steps = ["Shipping address", "Payment details", "Review your order"];

/**
 * Code adapted from:
 * https://github.com/mui/material-ui/blob/v5.13.3/docs/data/material/getting-started/templates/checkout/Checkout.js
 * 
 * Displays a checkout process for the user.
 *
 * @returns {JSX.Element} The rendered React component.
 */
export default function Checkout() {
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);
  const [addressInfo, setAddressInfo] = React.useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    saveAddress: false,
  });
  const [paymentInfo, setPaymentInfo] = React.useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    saveCard: false,
  });

  const [order, setOrder] = React.useState(null);

  const handleNext = async () => {
    setActiveStep(activeStep + 1);

    if (activeStep === steps.length - 1) {
      const orderData = await postCheckout();
      setOrder(orderData);
      console.log(orderData);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            addressInfo={addressInfo}
            setAddressInfo={setAddressInfo}
          />
        );
      case 1:
        return (
          <PaymentForm
            paymentInfo={paymentInfo}
            setPaymentInfo={setPaymentInfo}
          />
        );
      case 2:
        return <Review addressInfo={addressInfo} paymentInfo={paymentInfo} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <div>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="sm"
        sx={{ mb: 4, minHeight: theme.boxSizes.full }}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                {`Your order number is #${order?.id}. We have emailed your order confirmation, and will send you an update when your order has shipped. (thats a lie, we didn't actually email you)`}
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </div>
  );
}
