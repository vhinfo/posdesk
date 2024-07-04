export async function getProducts(page: number|null, sku:number|null): Promise<{
    id: number,
    description: string,
    sku: string,
    categoryId: number|null,
    categoryName: string,
    image: string,
    brand: string,
    price: number
  }[]|undefined> {
    return window.productService.getProducts(page, sku);
}