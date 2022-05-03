// NEXT JS IMPORTS
import Image from "next/image";
import Link from "next/link";
import imageLoader from "../imageLoader";

// TYPESCRIPT INTERFACES
import { Product } from "../utils/types";

// REDUX TOOLKIT
import { useAppSelector, useAppDispatch} from "../redux/hooks";
import { addToCart } from "../redux/CartSlice";

// MATERIAL UI
import {
    Card,
    Paper,
    CardContent,
    Typography,
    Box,
    CardActionArea,
    Button,
    CardActions,
    IconButton,
} from "@mui/material";

// MATERIAL UI ICONS
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Favorite from "@mui/icons-material/Favorite";


import { addToWishlist, removeFromWishlist } from "../redux/WishlistSlice";
import { checkIfInWishlist } from "../utils/WishlistUtils";

import styles from "../styles/ProductCard.module.css";


export default function ProductCard(props: { product: Product }) {

    const dispatch = useAppDispatch();
    const wishlist = useAppSelector((state) => state.wishlist.content);


    function AddToCartButton() {

        const handleAddToCartClick = () => {
            //TODO: Update this to account for clothing Items
            //TODO: maybe display sizes on card
            //TODO: Abstract handling adding carts to its own component, since they all are similar
            dispatch(addToCart(props.product));
        };


        return (
            <Button
                size="small"
                color="primary"
                variant="outlined"
                endIcon={<ShoppingCartIcon />}
                onClick={handleAddToCartClick}
            >
                Add to Cart
            </Button>
        );
    }


    function AddToWishlistButton() {

        const handleAddtoWishlistClick = () => {
            if(checkIfInWishlist(props.product, wishlist)) dispatch(removeFromWishlist(props.product.id));
            else dispatch(addToWishlist(props.product));
        };

        return (
            <IconButton
                color="primary"
                onClick={handleAddtoWishlistClick}
            >
                <Favorite />
            </IconButton>
        );
    }


    return (
        <Card
            variant="outlined"
            key={props.product.id}
            style={{height: "430px"}}
        >
            <Link href={`/product/${props.product.id}`}>
                <a>
                    <CardActionArea>

                        <Paper className={styles.imagePaper} elevation={0}>
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
                            <Typography gutterBottom className={styles.productTitle}  variant="subtitle1">{props.product.title}</Typography>
                            <Box className={[styles.cardContentBox].join(" ")}>
                                <Typography color="text.secondary" fontSize={"small"}>{props.product.price}$</Typography>
                                <Box className={[styles.ratingDiv].join(" ")}>
                                    <Typography color="text.secondary" fontSize={"small"} style={{ marginRight: "2px" }}>{props.product.rating.rate}</Typography>
                                    <StarIcon fontSize='medium' style={{ color: "#FF9529" }} />
                                </Box>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </a>
            </Link>
            <CardActions className={[styles.buttonsBox].join(" ")}>
                <AddToCartButton />
                <AddToWishlistButton />
            </CardActions>
        </Card>
    );
};