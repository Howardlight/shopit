import imageLoader from "../../imageLoader";
import { Product } from "../../utils/types";
import Image from "next/image";
import axios from "axios";

import { 
    Grid,
    Typography,
    // Container,
    Button,
    Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

//Components
import Layout from "../../components/Layout";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart } from "../../redux/CartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/WishlistSlice";

// React, Utils
import { useEffect, useState } from "react";
import { checkIfInWishlist } from "../../utils/WishlistUtils";

import styles from "../../styles/[id].module.css";

function ProductPage({product}: {product: Product}) {
    
    const dispatch = useAppDispatch();
    const wishlist = useAppSelector((state) => state.wishlist.content);

    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        // console.warn("useEffect Rerendered");

        if(checkIfInWishlist(product, wishlist) == true) setIsWishlisted(true);
        else setIsWishlisted(false);

    }, [isWishlisted, wishlist, product]);


    function handleWishlistButton(product: Product) {
        // console.log("HandleWishlist Button rendered");

        if(isWishlisted) dispatch(removeFromWishlist(product));
        else if(!isWishlisted) {
            dispatch(addToWishlist(product));
            setIsWishlisted(true);
        };
    };

    return(
            <Grid className={styles.mainGrid}>
                <Image 
                src={product.image} 
                alt={product.title} 
                loader={imageLoader} 
                unoptimized 
                height={"350"} 
                width={"300"}
                />
                <Grid className={styles.contentGrid}>
                    <Typography variant="h5">{product.title}</Typography>
                    <Typography variant="h6" className={styles.price}>{product.price}$</Typography>
                    <Box className={styles.buttonBox}>
                        <Button
                        size="large"
                        variant="contained"
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
};

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