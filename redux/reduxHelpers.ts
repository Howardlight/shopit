import { Category, Product } from "../utils/types";
import { WritableDraft } from "immer/dist/types/types-external";
import { cartState } from "./CartSlice";

/**
 *
 * Checks if Product Category is of MenSClothing or WomenSClothing
 *
 * @param payload
 *
 * @returns `True` if Product is Clothing
 * @returns `False` if Product is NOT Clothing
 */
export function checkIfClothing(payload: Product) {

    return payload.category == Category.MenSClothing ||
        payload.category == Category.WomenSClothing;
}
/**
 *
 * Looks for Product inside of state and returns it
 *
 * @param payload - The payload input which we have to find inside of state
 * @param state - The Redux State
 *
 * @returns `Product` | `undefined`
 */
export function findProduct(payload: Product, state: WritableDraft<cartState>): WritableDraft<Product> | undefined {
    let itemExists: WritableDraft<Product> | undefined;

    if (checkIfClothing(payload))
        itemExists = state.content.find((item: Product) => item.id === payload.id && item.Size == payload.Size);
    else
        itemExists = state.content.find((item: Product) => item.id === payload.id);

    return itemExists;
}
/**
 * Looks for Index of Product inside of state and returns it
 *
 * @param payload - The payload input which we have to find inside of state
 * @param state - The Redux State
 * @returns `number`
 */
export function findIndexOfProduct(payload: Product, state: WritableDraft<cartState>): number {
    let index: number;

    if (checkIfClothing(payload))
        index = state.content.findIndex((item: Product) => item.id === payload.id && item.Size == payload.Size);
    else
        index = state.content.findIndex((item: Product) => item.id === payload.id);

    return index;
}
