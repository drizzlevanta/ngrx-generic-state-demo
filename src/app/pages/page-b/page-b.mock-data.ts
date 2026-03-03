export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

export const DEMO_PRODUCTS: Product[] = [
  { id: '1', name: 'Wireless Headphones', category: 'Audio', price: 89.99 },
  { id: '2', name: 'Mechanical Keyboard', category: 'Input', price: 149.99 },
  { id: '3', name: 'Ultra-wide Monitor', category: 'Display', price: 599.99 },
  { id: '4', name: 'Ergonomic Mouse', category: 'Input', price: 69.99 },
  { id: '5', name: 'USB-C Hub', category: 'Accessories', price: 49.99 },
  { id: '6', name: 'Webcam HD', category: 'Video', price: 79.99 },
  { id: '7', name: 'Desk Lamp', category: 'Accessories', price: 39.99 },
  { id: '8', name: 'Monitor Arm', category: 'Accessories', price: 119.99 },
  { id: '9', name: 'Condenser Mic', category: 'Audio', price: 129.99 },
];
