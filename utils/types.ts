export interface getProductResults {
    results: Product[];
}

export interface Product {
    id:          number;
    title:       string;
    price:       number;
    description: string;
    category:    Category;
    image:       string;
    rating:      Rating;
    quantity?:   number;
    Size?: Size | null;
}

export enum Size {
    Small = "S",
    Medium = "M",
    Large = "L",
    ExtraLarge = "XL"
}

export enum Category {
    Electronics = "electronics",
    Jewelery = "jewelery",
    MenSClothing = "men's clothing",
    WomenSClothing = "women's clothing",
}

export interface Rating {
    rate:  number;
    count: number;
}
  