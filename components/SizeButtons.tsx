import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {Size} from "../utils/types";
import {Button} from "@mui/material";

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

export function ItemSizesGroup({setSize}: { setSize: Dispatch<SetStateAction<Size | null>> }) {

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