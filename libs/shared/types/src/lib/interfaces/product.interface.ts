export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  sold: number;
  rateAvg: number;
  rateCount: number;
}