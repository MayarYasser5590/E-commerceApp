export interface WishlistProduct {
  _id: string;
  id: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount: number;
  discount: number;
  rateAvg: number;
}

export interface WishlistToggleProduct {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount: number;
  rateAvg: number;
  discount?: number;
}

export interface WishlistResponse {
  message: string;
  count: number;
  wishlist: {
    _id: string;
    user: string;
    products: WishlistProduct[];
    createdAt: string;
    updatedAt: string;
  };
}

export interface CheckWishlistResponse {
  message: string;
  isInWishlist: boolean;
}
