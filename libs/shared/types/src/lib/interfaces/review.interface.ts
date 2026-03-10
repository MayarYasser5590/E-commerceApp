import { Metadata } from "./metadata.interface";

export interface Review {
  _id: string;
  title: string;
  ratings: number;
  comment: string;
  user: string;
  createdAt: string;
}

export interface ProductReviewsResponse {
  message: string;
  metadata: Metadata;
  reviews: Review[];
}