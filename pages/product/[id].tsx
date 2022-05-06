import imageLoader from "../../imageLoader";
import {Category, Product, Size} from "../../utils/types";
import Image from "next/image";
import axios from "axios";
import {Alert, Box, Button, Collapse, Grid, Typography,} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import * as React from "react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Layout from "../../components/Layout";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {addToWishlist, removeFromWishlist} from "../../redux/WishlistSlice";
import {checkIfInWishlist} from "../../utils/WishlistUtils";
import styles from "../../styles/[id].module.css";
import {addToCart} from "../../redux/CartSlice";
import Head from "next/head";

function ProductPage({product}: { product: Product }) {

    const dispatch = useAppDispatch();
    const wishlist = useAppSelector((state) => state.wishlist.content);

    const [isWishlisted, setIsWishlisted] = useState(false);
    const [size, setSize] = useState< Size | null >(null);
    const [displayError, setDisplayError] = useState<boolean>(false);

    useEffect(() => {
        // console.warn("useEffect Rerendered");

        if (checkIfInWishlist(product, wishlist)) setIsWishlisted(true);
        else setIsWishlisted(false);

    }, [isWishlisted, wishlist, product]);

    function handleWishlistButton(product: Product) {
        // console.log("HandleWishlist Button rendered");

        if (isWishlisted) dispatch(removeFromWishlist(product.id));
        else if (!isWishlisted) {
            dispatch(addToWishlist(product));
            setIsWishlisted(true);
        }
    }
    function handleAddToCartButton(product: Product) {

        let toBeCartedProduct: Product;
        toBeCartedProduct = product;

        // If user did not select a size, Promp Error
        if( product.category == Category.MenSClothing || product.category == Category.WomenSClothing) {
            if (size == null) {
                setDisplayError(true);
                return;
            }
            toBeCartedProduct.Size = size;
        }

        dispatch(addToCart(toBeCartedProduct));
    }


    return (
        <React.Fragment>
            <Head>
                <title>{product.title} - ShopIt</title>
            </Head>
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
                            endIcon={<ShoppingCartIcon/>}
                            onClick={() => handleAddToCartButton(product)}
                        >
                            Add To Cart
                        </Button>
                        <Button
                            size="large"
                            variant={isWishlisted ? "contained" : "outlined"}
                            endIcon={isWishlisted ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                            onClick={() => handleWishlistButton(product = (product))}
                        >
                            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        </Button>
                        {product.category == Category.WomenSClothing || product.category == Category.MenSClothing ?
                            <React.Fragment>
                                <ItemSizesGroup setSize={setSize}/>
                                <Collapse in={displayError}>
                                    <Alert severity={"error"} onClose={() => setDisplayError(false)}>You must select
                                        a <strong>size</strong></Alert>
                                </Collapse>
                            </React.Fragment>
                            : ""
                        }
                    </Box>
                    <br/>
                    <Typography variant="body1" gutterBottom>{product.description}</Typography>

                </Grid>
            </Grid>
        </React.Fragment>
    );
}

// Sizes: S|M|L|XL
//TODO: maybe export this along with ItemSizesGroup
function ItemSizeButton(
    {size, keyId, isActive, setIsActive, setSize}:
    { size: string, keyId: string, isActive: string | null, setIsActive: Dispatch<SetStateAction<string | null>>, setSize: Dispatch<SetStateAction<Size | null>> }) {
    return (
        <Button
            variant={isActive === keyId ? "contained" : "outlined"}
            onClick={() => {
                setIsActive(keyId);
                setSize(keyId as Size);
            }}
        >
            {size}
        </Button>
    )
}

function ItemSizesGroup({setSize}: { setSize: Dispatch<SetStateAction< Size | null>> }) {

    // used to specify which size is Active
    const [isActive, setIsActive] = useState<string | null>(null);

    // Sizes: S|M|L|XL
    //TODO: Global this, maybe export it
    const sizes: Size[] = [Size.Small, Size.Medium, Size.Large, Size.ExtraLarge];
    return (
        <React.Fragment>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                {sizes.map((size: string) => {
                    return (
                        <ItemSizeButton
                            size={size}
                            isActive={isActive}
                            key={size.toString()}
                            keyId={size.toString()}
                            setIsActive={setIsActive}
                            setSize={setSize}
                        />
                    );
                })}
            </div>
        </React.Fragment>
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

export async function getStaticProps({params}: { params: { id: string } }) {

    const {data} = await axios.get(`https://fakestoreapi.com/products/${params.id}`);
    const product: Product = data;

    return {
        props: {
            product,
        }
    }

}

export default ProductPage;