export interface Product {
    readonly id: string;
    readonly code: string;
    readonly name: string;
    readonly price: number;
    readonly originalPrice?: number;
    readonly discount?: string;
    readonly image: string;
    readonly dimensions: string;
    readonly unit: string;
    readonly inStock: boolean;
    readonly isExclusive?: boolean;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export interface Category {
    readonly id: string;
    readonly name: string;
    readonly icon: string;
    readonly image: string;
}

export interface CartItem {
    readonly product: Product;
    readonly quantity: number;
}

export interface Cart {
    readonly items: CartItem[];
    readonly totalItems: number;
    readonly totalPrice: number;
}

export type ProductId = string;
export type CategoryId = string;

export interface ProductAddedToCart {
    readonly productId: ProductId;
    readonly quantity: number;
    readonly timestamp: Date;
}
