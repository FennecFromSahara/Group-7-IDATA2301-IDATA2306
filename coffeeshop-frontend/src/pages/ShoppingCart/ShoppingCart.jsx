import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function ShoppingCart() {
  return (
    <div>
      <Container sx={{ py: 8 }}>
        <Stack spacing={2}>
          {cards.map((card) => (
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                image="./img/coffe placeholder.jpg"
                alt="random"
                sx={{ maxWidth: 100 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Product name
                </Typography>
                <Typography>
                  This is a media card. You can use this section to describe the
                  content.
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Button size="small">
                      <RemoveIcon />
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    "count"
                  </Grid>
                  <Grid item xs={4}>
                    <Button size="small">
                      <AddIcon />
                    </Button>
                  </Grid>
                </Grid>
                <Button size="small">
                  <HighlightOffIcon />
                </Button>
              </CardActions>
            </Card>
          ))}
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <Typography mr={2}>
              Sub total: $"amount" 
            </Typography>
            <Button
              variant="contained"
              href="/checkout"
            >
              Checkout
            </Button>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
