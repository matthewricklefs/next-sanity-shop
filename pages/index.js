import { Typography } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sanity Shopping Demonstration </title>
        <meta name="description" content="Next E-Commerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Typography component="h1" variant="h1">
        Sanity Shopping
      </Typography>
    </div>
  );
}
