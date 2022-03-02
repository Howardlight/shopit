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


// import styles from '../styles/Home.module.css'
const axios = require('axios').default;
import * as React from "react";
import { 
  // getProductResults,
  Product 
} from '../utils/types';
import {
  // Card, 
  // CardContent, 
  // CardMedia, 
  // Typography,
  // Container,
  Grid,
  // Box,
  // Paper,
  // AppBar,
  // Toolbar,
  // IconButton,
  // Button,
  // CardActionArea,
  // CardActions
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

//Redux
// import { addToCart } from '../redux/CartSlice';
// import { useAppSelector, useAppDispatch} from "../redux/hooks";

// Components
// import imageLoader from '../imageLoader';
import Layout from '../components/Layout';
import ProductCard from "../components/ProductCard";


//TODO: Add a footer
//TODO: branch different components into their own file
//TODO: Improve the ProductCard
//TODO: add category based searches

function Home({ productTable }: { productTable: Product[] }) {

  return (
    <Grid>

      <Grid style={{ display: "flex", justifyContent: "space-evenly", flexDirection: "row", flexWrap: "wrap", margin: "25px" }}>
        {productTable.map((product) => {
          return (
            <Grid item xs={8} md={4} key={product.id} style={{ padding: "25px" }}>
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
}


export const getStaticProps: GetStaticProps = async () => {
  
  const {data} = await axios.get("https://fakestoreapi.com/products");
  const table: Product[] = data;
  // console.log(table);

  return {
    props: {
      productTable: 
      table,
    }
  }
};


export default Home
