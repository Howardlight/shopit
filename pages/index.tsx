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

const Home: NextPage<{productTable: Product[]}> = ({productTable}) => {

  return(
    <div>
      <button onClick={() => console.log(productTable)} >Click me</button>
      {productTable.map((product: Product, index: number) => (
        <div key={product.id}>
          <h5>{product.title}</h5>
          <p>{product.description}</p>
          <p>{product.image}</p>
        </div>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  
  // const res: getProductResults = await fetchData();
  const {data} = await axios.get("https://fakestoreapi.com/products");
  const table: Product[] = data;
  console.log(table);

  return {
    props: {
      productTable: 
      table,
    }
  }
};


export default Home
