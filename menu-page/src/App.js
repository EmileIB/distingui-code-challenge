import React, { useRef, createRef } from "react";

import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

import { DrawerAppBar } from "./components";

import menu from "./menu";

function App() {
  const categories = menu.map((category) => category.name);

  const categoryRefs = useRef(
    categories.reduce((acc, category) => {
      acc[category] = createRef();
      return acc;
    }, {})
  );

  const scrollToCategory = (categoryName) => {
    const categoryRef = categoryRefs.current[categoryName];
    categoryRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <DrawerAppBar menuItems={categories} scrollTo={scrollToCategory} />
      <Container maxWidth="lg">
        {/*
          ●  The Menu is split into categories.
          ● Each category with an icon and a title.
          ● Each category consists of a list of items.
          ● The item has an optional image, price and description, and a mandatory title.
          ● The website is a single page app. */}
        <Box sx={{ my: 4 }}>
          {menu.map((category) => (
            <Box key={category.name} sx={{ my: 4 }}>
              <Typography
                variant="h4"
                gutterBottom
                ref={categoryRefs.current[category.name]}
              >
                {category.name}
              </Typography>
              <Grid container spacing={2}>
                {category.items.map((item) => (
                  <Grid item xs={6} md={3} key={item.name}>
                    <Card
                      style={{
                        height: "385px",
                      }}
                    >
                      {item.image && (
                        <CardMedia
                          component="img"
                          height="200"
                          image={item.image}
                          alt={item.name}
                        />
                      )}

                      {!item.image && (
                        <div
                          style={{
                            height: "200px",
                            backgroundColor: "#e0e0e0",
                          }}
                        ></div>
                      )}

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          style={{
                            height: "30px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          style={{
                            height: "70px",
                            overflow: "hidden",
                            overflowY: "auto",
                            marginBottom: "1rem",
                          }}
                          sx={{
                            "&::-webkit-scrollbar": {
                              display: "none",
                            },
                          }}
                        >
                          {item.description}
                        </Typography>
                        <Typography variant="body2">
                          Price: ${item.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}

export default App;
