export interface Product {
  id: string;
  name: string;
  code: string;
  dimensions: string;
  price: number;
  originalPrice?: number;
  image: string;
  isExclusive?: boolean;
  discount?: string;
  inStock: boolean;
  unit: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface NavItem {
  label: string;
  icon?: React.ReactNode;
  href: string;
}
