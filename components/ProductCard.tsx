// NEXT JS IMPORTS
import Image from "next/image";
import Link from "next/link";
import imageLoader from "../imageLoader";

// TYPESCRIPT INTERFACES
import { Product } from "../types";

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
    Snackbar,
    Alert
} from "@mui/material";

// MATERIAL UI ICONS
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Favorite from "@mui/icons-material/Favorite";

export default function ProductCard(props: { product: Product }) {

    const dispatch = useAppDispatch();



    const [openCart, setOpenCart] = useState(false);
    const [openWishList, setOpenWishlist] = useState(false);
    function AddToCartButton() {
        
        const handleClick = () => {
            setOpenCart(true);

            dispatch(addToCart(props.product));
        };
        
        const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
            if (reason === 'clickaway') {
                return;
            }
    
            setOpenCart(false);
        };


        return (
            <>
                <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    endIcon={<ShoppingCartIcon />}
                    onClick={handleClick}
                >
                    Add to Cart
                </Button>
                <Snackbar open={openCart} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Item Added to Cart!
                    </Alert>
                </Snackbar>
            </>
        );
    }
    // TODO: at AddToCart Button, Add a notification for when the user clicks the button
    // example: Item Added to your cart!
    
    // TODO: Add functionality to wishlist Icon Button
    return (
        <Card
            variant="outlined"
            key={props.product.id}
            style={{ minHeight: "300px" }}
        >
            <Link href={`/product/${props.product.id}`}>
                <a>
                    <CardActionArea>

                        <Paper style={{ display: "flex", justifyContent: "center", margin: "15px" }} elevation={0}>
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
                            <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography color="text.secondary" fontSize={"small"}>{props.product.price}$</Typography>
                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <Typography color="text.secondary" fontSize={"small"} style={{ marginRight: "2px" }}>{props.product.rating.rate}</Typography>
                                    <StarIcon fontSize='medium' style={{ color: "#FF9529" }} />
                                </div>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </a>
            </Link>
            <CardActions style={{display: "flex", justifyContent: "space-between"}}>
                {/* <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    endIcon={<ShoppingCartIcon />}
                    onClick={() => dispatch(addToCart(props.product))}
                >
                    Add to Cart
                </Button> */}
                <AddToCartButton />
                {/* <IconButton color="primary"><Favorite /></IconButton> */}
            </CardActions>
        </Card>
    );
};