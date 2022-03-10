import { createTheme } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import classes from "../utils/classes";

export default function Layout({ title, description, children }) {
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
      },
    },
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      mode: "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#20808o",
      },
    },
  });
  return (
    <>
      <Head>
        <title>
          {title ? `${title} - Sanity Shopping` : "Sanity Shopping"}
          {description && (
            <meta name="description" content={description}></meta>
          )}
        </title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar sx={classes.appbar} position="static">
          <Toolbar sx={classes.toolbar}>
            <NextLink href="/" passHref>
              <Link>
                <Typography sx={classes.brand}>Sanity Shopping</Typography>
              </Link>
            </NextLink>
          </Toolbar>
        </AppBar>

        <Container sx={classes.main} component="main">
          {children}
        </Container>

        <Box sx={classes.footer} component="footer">
          <Typography>All rights reserved. Sanity Shopping.</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
