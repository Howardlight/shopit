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




// Components
import imageLoader from '../imageLoader';
import TopBar from "./TopBar";



//TODO: Add a footer
//TODO: branch different components into their own file
//TODO: add Pages to each item
//TODO: add a cart system
//TODO: Improve the ProductCard

const Home: NextPage<{productTable: Product[]}> = ({productTable}) => {

  return(
    <Grid>


      
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{backgroundColor: "#F3D9DC", color: "#C78283"}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ShopIt
            </Typography>
            <Button 
            color="inherit"
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Grid style={{display: "flex", justifyContent: "space-evenly", flexDirection: "row", flexWrap: "wrap"}}>
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
  return(
      <Card
        variant="outlined"
        key={props.product.id}
      >
    >        
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
          <Button size="small" style={{ color: "#C78283", backgroundColor: "#F2E3E3" }} endIcon={<ShoppingCartIcon />}>Add to Cart</Button>
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
