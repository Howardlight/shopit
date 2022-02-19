import imageLoader from "../../imageLoader";
import { Product } from "../../types";
import Image from "next/image";
import axios from "axios";

import { 
    Grid,
    Typography,
    Container,
    Button,
    Box
} from "@mui/material";
import { Category, Rating } from "../../types";

//Components
// import TopBar from "../../components/TopBar";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";



function ProductPage({product}: {product: Product}) {
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
                    <Box style={{display: "flex", flexDirection: "column"}}>
                        <Button>Add To Cart</Button>
                        <Button>Add to WishList</Button>
                        {/* Makes these stretch to take up the whole area */}
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

// export const getServerSideProps: GetServerSideProps = async (context) => {

//     const {data} = await axios.get(`https://fakestoreapi.com/products/${context.query.id}`);
//     const product: Product = data;

//     return {
//         props: {
//             product,
//         }
//     }

// }



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