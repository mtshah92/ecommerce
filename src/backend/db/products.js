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
    price: "1000",
    rating: "2",
    categoryName: "non-fiction",
  },
  {
    _id: uuid(),
    title: "You: The Story",
    author: "Ruta Sepetys",
    price: "700",
    rating: "3",
    categoryName: "horror",
    url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1662733876i/62296519.jpg",
  },
  {
    _id: uuid(),
    title: "Think and Grow Rich",
    author: "Shiv Khera",
    price: "1000",
    categoryName: "fiction",
    rating: "2.5",
    url: "https://m.media-amazon.com/images/I/411OtAf040L._SY264_BO1,204,203,200_QL40_FMwebp_.jpg",
  },
  {
    _id: uuid(),
    title: "THE ABYSS",
    author: "Jeyamohan",
    price: "500",
    categoryName: "fiction",
    rating: "4",
    url: "https://m.media-amazon.com/images/I/41a6cinT9RL._SX312_BO1,204,203,200_.jpg",
  },
  {
    _id: uuid(),
    title: "We'll Never Tell",
    author: "Wendy Heard",
    price: "500",
    categoryName: "horror",
    rating: "3.5",
    url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1662500006i/62315614.jpg",
  },
  {
    _id: uuid(),
    title: "The 5 AM Club",
    author: "Robin S. Sharma",
    price: "300",
    rating: "4.5",
    categoryName: "horror",
    url: "https://m.media-amazon.com/images/I/41lhTyHPIrL._SX330_BO1,204,203,200_.jpg",
  },
];
