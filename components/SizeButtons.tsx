import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {Product, Size} from "../utils/types";
import {Button, Box} from "@mui/material";
import {AnyAction} from "redux";
import {addToCart} from "../redux/CartSlice";

// Sizes: S|M|L|XL
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

export function ItemSizesButtonGroup({setSize}: { setSize: Dispatch<SetStateAction<Size | null>> }) {

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

//TODO: Explain this
export function ItemSizeButtonFrontPage(
    {size, dispatch, product}: { size: string, dispatch: Dispatch<AnyAction>, product: Product }) {
    return (
        <Button
            variant={"outlined"}
            size={"small"}
            style={{minWidth: "50px"}}
            onClick={() => {

                // Take the product, then give it its associated Size
                // then pass it into cart
                let toBeCartedProduct = product;
                toBeCartedProduct.Size = size as Size;

                dispatch(addToCart(toBeCartedProduct));
            }}
        >
            {size}
        </Button>
    )
}

//TODO: Explain this
export function ItemSizesButtonGroupFrontPage({dispatch, product}: {dispatch: Dispatch<AnyAction>, product: Product}) {

    // Sizes: S|M|L|XL
    //TODO: Global this, maybe export it
    const sizes: Size[] = [Size.Small, Size.Medium, Size.Large, Size.ExtraLarge];
    return (
        <React.Fragment>
            <Box
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "5px"
                }}>
                {sizes.map((size: string) => {
                    return (
                        <ItemSizeButtonFrontPage
                            size={size}
                            key={size.toString()}
                            dispatch={dispatch}
                            product={product}
                        />
                    );
                })}
            </Box>
        </React.Fragment>
    );
}