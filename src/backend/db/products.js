import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    title: "You Can Win",
    author: "Shiv Khera",
    url: "https://d2i0w0hu6hvxgc.cloudfront.net/B00HQE51N4/9381233f/cover.jpeg",
    price: "5000",
    categoryName: "non-fiction",
  },
  {
    _id: uuid(),
    title: "You are Winner",
    author: "Junaid Qureshi",
    price: "3000",
    categoryName: "horror",
  },
  {
    _id: uuid(),
    title: "Think and Grow Rich",
    author: "Shiv Khera",
    price: "1000",
    categoryName: "fiction",
    url: "https://m.media-amazon.com/images/I/411OtAf040L._SY264_BO1,204,203,200_QL40_FMwebp_.jpg",
  },
];
