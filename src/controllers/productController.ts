import { Product } from "../types";

export async function getProducts(page: number|null, sku:number|null, force: boolean): Promise<Product[]|undefined> {
    return window.productService.getProducts(page, sku, force);
}