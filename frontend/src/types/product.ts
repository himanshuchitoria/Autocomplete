

export interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;

}

export interface ProductSearchResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
