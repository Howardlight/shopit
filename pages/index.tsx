import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
const axios = require('axios').default;
import * as React from "react";
import { getProductResults, Product } from '../types';
import {
  Card, 
  CardContent, 
  CardMedia, 
  Typography,
  Container,
  Grid,
  Box,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Button
} from "@mui/material";
import imageLoader from '../imageLoader';


//TODO: Add a footer
//TODO: branch different components into their own file
//TODO: add Pages to each item
//TODO: add a cart system
//TODO: Improve the ProductCard

  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const results: getProductResults = response.body;

    console.log(results);
    console.log("fetchData Finished");
    return results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      axios.handleAxiosError(error);
    } else {
      axios.handleUnexpectedError(error);
    }
  }
}

const ProductCard = ( props: {product: Product}) => {
  return(
    <Card
      variant="outlined"
      key={props.product.id}
      style={{paddingTop: "25px", paddingBottom: "25px"}}
      // sx={{maxHeight: "100", maxWidth: "100"}}
    >        
      <Paper style={{display: "flex", justifyContent: "center"}} elevation={0}>
        <Image
          src={props.product.image}
          alt={props.product.title}
          unoptimized
          loader={imageLoader}
          width="200"
          height="250"
          // style={{}}
        />
    </Paper>
      <CardContent>
        <Typography gutterBottom variant="h6">{props.product.title}</Typography>
        <Typography >{props.product.price}$</Typography>
      </CardContent>
    </Card>
  );
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
