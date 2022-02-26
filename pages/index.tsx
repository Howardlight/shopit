import type { GetStaticProps, NextPage, GetServerSideProps } from 'next'



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
import StarIcon from '@mui/icons-material/Star';

//Redux
import { addToCart } from '../redux/CartSlice';
import { useAppSelector, useAppDispatch} from "../redux/hooks";

// Components
import imageLoader from '../imageLoader';
import Layout from '../components/Layout';
// import TopBar from "../components/TopBar";



//TODO: Add a footer
//TODO: branch different components into their own file
//TODO: Improve the ProductCard
//TODO: add category based searches

function Home({productTable}: {productTable: Product[]}) {

  return(
    <Grid>

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


Home.getLayout = function getLayout(page: typeof Home) {
  return <Layout>{page}</Layout>
}

const ProductCard = ( props: {product: Product}) => {
  
  const dispatch = useAppDispatch();
  

  // TODO: at AddToCart Button, Add a notification for when the user clicks the button
  // example: Item Added to your cart!
  return (
    <Card
      variant="outlined"
      key={props.product.id}
      style={{minHeight: "300px"}}
    >
      <Link href={`/product/${props.product.id}`}>
        <a>
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
            <Box style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <Typography color="text.secondary" fontSize={"small"}>{props.product.price}$</Typography>
              <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Typography color="text.secondary" fontSize={"small"} style={{marginRight: "2px"}}>{props.product.rating.rate}</Typography>
                <StarIcon fontSize='medium' style={{color: "#FF9529"}} />
              </div>
            </Box>
          </CardContent>
        </CardActionArea>
        </a>
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
