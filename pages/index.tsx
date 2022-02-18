import type { GetStaticProps, NextPage } from 'next'



// NEXT
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';


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
  Button,
  CardActionArea,
  CardActions
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

//Redux
import { addToCart } from '../redux/CartSlice';
import { useAppSelector, useAppDispatch} from "../redux/hooks";

// Components
import imageLoader from '../imageLoader';
import TopBar from "./TopBar";



//TODO: Add a footer
//TODO: branch different components into their own file
//TODO: add Pages to each item
//TODO: add a cart system
//TODO: Improve the ProductCard
//TODO: add category based searches

const Home: NextPage<{productTable: Product[]}> = ({productTable}) => {

  return(
    <Grid>

      <TopBar />

      <Grid style={{display: "flex", justifyContent: "space-evenly", flexDirection: "row", flexWrap: "wrap", margin: "25px"}}>
      {productTable.map((product) => {
        return (
          <Grid item xs={8} md={4} key={product.id} style={{padding: "25px"}}>
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

const ProductCard = ( props: {product: Product}) => {
  
  const dispatch = useAppDispatch();
  

  // TODO: at AddToCart Button, Add a notification for when the user clicks the button
  // example: Item Added to your cart!
  return (
    <Card
      variant="outlined"
      key={props.product.id}
    >
      <Link href={`/product/${props.product.id}`}>
        <CardActionArea>

          <Paper style={{ display: "flex", justifyContent: "center", margin: "25px" }} elevation={0}>
            <Image
              src={props.product.image}
              alt={props.product.title}
              unoptimized
              loader={imageLoader}
              width="200"
              height="250"
            />
          </Paper>
          <CardContent>
            <Typography gutterBottom variant="h6">{props.product.title}</Typography>
            <Typography color="text.secondary" >{props.product.price}$</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button 
        size="small" 
        style={{ color: "#C78283", backgroundColor: "#F2E3E3" }} 
        endIcon={<ShoppingCartIcon />}
        onClick={() => dispatch(addToCart(props.product))}
        >
          Add to Cart
        </Button>
      </CardActions>
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
