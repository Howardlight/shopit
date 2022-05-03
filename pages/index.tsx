
import * as React from "react";

// NEXT INTERFACES
import type {
  GetStaticProps,
  // NextPage,
  // GetServerSideProps 
} from 'next'

// NEXT
// import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';

const axios = require('axios').default;
import { Product } from '../utils/types';
import { Grid } from "@mui/material";

// Components
import Layout from '../components/Layout';
import ProductCard from "../components/ProductCard";

import styles from "../styles/Home.module.css";

//TODO: add category based searches
function Home({ productTable }: { productTable: Product[] }) {

  return (
    <Grid>
      <Grid container columns={{xs: 4, sm: 8, md: 12, lg: 16}} className={styles.mainGrid}>
        {productTable.map((product) => {
          return (
            <Grid item xs={4} sm={4} md={4} lg={4} key={product.id} style={{ padding: "25px" }}>
              <ProductCard
                product={product}
                key={product.id}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}


Home.getLayout = function getLayout(page: typeof Home) {
  return <Layout>{page}</Layout>
};


export const getStaticProps: GetStaticProps = async () => {
  
  const {data} = await axios.get("https://fakestoreapi.com/products");
  const table: Product[] = data;

  return {
    props: {
      productTable: 
      table,
    }
  };
};


// @ts-ignore
export default Home
