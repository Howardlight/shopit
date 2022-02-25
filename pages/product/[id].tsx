import imageLoader from "../../imageLoader";
import { Product } from "../../types";
import Image from "next/image";
import axios from "axios";

import { 
    Grid,
    Typography,
    Container,
    Button,
    Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Category, Rating } from "../../types";

//Components
// import TopBar from "../../components/TopBar";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart } from "../../redux/CartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/WishlistSlice";
import { useEffect, useState } from "react";


function ProductPage({product}: {product: Product}) {
    
    const dispatch = useAppDispatch();
    const wishlist = useAppSelector((state) => state.wishlist.content);

    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {

        // console.warn("useEffect Rerendered");
        for(let i: number = 0; i < wishlist.length; i++) {
            if(wishlist[i].id === product.id) {
                setIsWishlisted(true);
            };
        };
    }, []);


    function handleWishlistButton(product: Product) {

        // console.log("boop");
        // console.log(product);

        console.log("HandleWishlist Button rendered");

        for(let i: number = 0; i < wishlist.length; i++) {
            // if(wishlist[i] === product) {
            if(wishlist[i].id === product.id) {
                console.log("Product found in wishlist\nSetting isWishlisted to false");
                setIsWishlisted(false);
                dispatch(removeFromWishlist(product));
                break;
            }
        };

        console.log("Setting isWishlisted to true");
        if(isWishlisted == false) {
            setIsWishlisted(true);
            dispatch(addToWishlist(product));
        };
    };

    return(
            <Grid style={{minHeight: "80vh",display: "flex", justifyContent: "space-evenly", marginTop: "50px", marginBottom: "50px", alignItems: "center", gap: "30px"}}>
                <Image 
                src={product.image} 
                alt={product.title} 
                loader={imageLoader} 
                unoptimized 
                height={"350"} 
                width={"300"}
                />
                <Grid style={{padding: "1rem", maxWidth:"500px"}}>
                    <Typography variant="h5">{product.title}</Typography>
                    <Typography variant="h6" style={{display: "flex", justifyContent: "flex-start", padding: "1rem"}}>{product.price}$</Typography>
                    <Box style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        <Button
                        size="large"
                        variant="contained"
                        style={{ 
                            // color: "#C78283",
                            // backgroundColor: "#F2E3E3"
                        }} 
                        color="primary"
                        endIcon={<ShoppingCartIcon />}
                        onClick={() => dispatch(addToCart(product))}
                        >
                            Add To Cart
                        </Button>
                        <Button
                        size="large"
                        variant={isWishlisted ? "contained" : "outlined"}
                        endIcon={isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        onClick={() => handleWishlistButton(product=(product))}
                        >
                            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        </Button>
                    </Box>
                    <br />
                    <Typography variant="body1" gutterBottom>{product.description}</Typography>
                </Grid>


            </Grid>
    );
}

ProductPage.getLayout = function getLayout(page: typeof ProductPage) {
    return <Layout>{page}</Layout>
}

export async function getStaticPaths() {

    const {data} = await axios.get("https://fakestoreapi.com/products");
    const table: Product[] = data;

    return {
        paths: table.map((product) => {
            return {params: {id: String(product.id)}}
        }),
        fallback: false,
    }
}

export async function getStaticProps({params}: {params: {id: string}}) {

    const {data} = await axios.get(`https://fakestoreapi.com/products/${params.id}`);
    const product: Product = data;

    return {
        props: {
            product,
        }
    }

}

export default ProductPage;