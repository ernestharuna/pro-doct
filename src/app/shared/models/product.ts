export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    rating: number;
    stock: number;
    imageUrl: string;
    thumbnailUrl: string;
}

export type NewProduct = Omit<Product, 'id'>;

export interface Category {
  id: string;
  name: string;
}

export interface ProductQuery {
  page: number;
  pageSize: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}
