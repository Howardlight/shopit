import imageLoader from "../../imageLoader";
import { Product } from "../../types";
import Image from "next/image";
import axios from "axios";

function ProductPage({product}: {product: Product}) {
    return(
        <ul>
            <li>{product.title}</li>
            <li>{product.description}</li>
            <li>{product.id}</li>
            <li>{product.price}</li>
        </ul>        
    );
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