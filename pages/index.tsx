import * as React from "react";
import type {GetStaticProps,} from 'next'
import {Product} from '../utils/types';
import {Grid} from "@mui/material";
import Layout from '../components/Layout';
import ProductCard from "../components/ProductCard";
import styles from "../styles/Home.module.css";
import Head from "next/head";
const axios = require('axios').default;


//TODO: add category based searches
function Home({productTable}: { productTable: Product[] }) {


    // let mensClothing = productTable.filter(function (product) {
    //         return product.category == Category.MenSClothing;
    // });
    // mensClothing.splice(4);
    //
    // let womansClothing = productTable.filter(function(product) {
    //     return product.category == Category.WomenSClothing;
    // });
    // womansClothing.splice(4);
    //test
    return (
      <React.Fragment>
        <Head>
          <title>ShoptIt - Home</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        </Head>
        <Grid style={{ margin: "40px" }}>

          {/*<Box component={"div"} style={{padding: "10px"}}>*/}
          {/*    <Typography variant={"h6"}>{"Men's Clothing"}</Typography>*/}
          {/*    <Grid container columns={{xs: 4, sm: 8, md: 12, lg: 16}}>*/}
          {/*        {mensClothing.map((product) => {*/}
          {/*            return(*/}
          {/*                <Grid item  xs={2} sm={2} md={3} lg={3} key={product.id}>*/}
          {/*                    <ProductCard product={product} />*/}
          {/*                </Grid>*/}
          {/*            );*/}
          {/*        })}*/}
          {/*    </Grid>*/}
          {/*</Box>*/}

          {/*<Box component={"div"} style={{padding: "10px"}}>*/}
          {/*    <Typography variant={"h6"}>{"Woman's Clothing"}</Typography>*/}
          {/*    <Grid container columns={{xs: 4, sm: 8, md: 12, lg: 16}}>*/}
          {/*        {womansClothing.map((product) => {*/}
          {/*            return(*/}
          {/*                <Grid item  xs={2} sm={2} md={3} lg={3} key={product.id}>*/}
          {/*                    <ProductCard product={product} />*/}
          {/*                </Grid>*/}
          {/*            );*/}
          {/*        })}*/}
          {/*    </Grid>*/}
          {/*</Box>*/}

          <Grid container columns={{ xs: 4, sm: 8, md: 12, lg: 16 }} className={styles.mainGrid}>
            {productTable.map((product, index) => {
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
      </React.Fragment>
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
