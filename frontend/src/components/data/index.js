import RolexWatch1 from "../../assets/images/product/rolex_submariner.png";
import RolexWatch2 from "../../assets/images/product/rolex_submariner2.png";
import AppleWatch1 from "../../assets/images/product/apple-watch1.png";
import AppleWatch2 from "../../assets/images/product/apple-watch2.png";
import HarshalBag1 from "../../assets/images/product/HerschelBackbag1.png";
import HarshalBag2 from "../../assets/images/product/HerschelBackbag2.png";
import GucciBag1 from "../../assets/images/product/gucciBag1.png";
import GucciBag2 from "../../assets/images/product/gucciBag2.png";
import Baseballcap1 from "../../assets/images/product/cowBoyCap1.png";
import Baseballcap2 from "../../assets/images/product/cowBoyCap2.png";
import CowboyCap1 from "../../assets/images/product/stcap1.png";
import CowboyCap2 from "../../assets/images/product/stcap2.png";
import AdidasShoes1 from "../../assets/images/product/bacca1.png";
import AdidasShoes2 from "../../assets/images/product/bacca2.png";
import TimberlandShoes1 from "../../assets/images/product/timberland1.png";
import TimberlandShoes2 from "../../assets/images/product/timberland2.png";
import RayBandShoes1 from "../../assets/images/product/sunglass1.png";
import RayBandShoes2 from "../../assets/images/product/sunglass2.png";
import OakleyShoes1 from "../../assets/images/product/oaklesun1.png";
import OakleyShoes2 from "../../assets/images/product//oaklesun2.png";

export const Products = [
  // Watches
  {
    id: "1x1",
    name: "Rolex Submariner",
    price: 34000,
    description: "Luxurious and timeless design.",
    ratings: 5,
    // images: [{ image: RolexWatch1 }, { image: RolexWatch2 }],
    images:RolexWatch1,
    seller: "TimeVault",
    stock: 5,
    numOfReviews: 58,
    reviews: [],
  },
  {
    id: "1x2",
    name: "Apple Series 9",
    price: 53000,
    description: "Advanced features and sleek design.",
    ratings: 4,
    // images: [{ image: AppleWatch1 }, { image: AppleWatch2 }],
    images:AppleWatch1,
    seller: "TechHub",
    stock: 15,
    numOfReviews: 142,
    reviews: [],
  },

  // Bags
  {
    id: "1x3",
    name: "Herschel Little America",
    price: 4200,
    description: "Stylish and durable for everyday use.",
    ratings: 4.5,
    // images: [{ image: HarshalBag1 }, { image: HarshalBag2 }],
    images:HarshalBag1,
    seller: "BagStore",
    stock: 20,
    numOfReviews: 76,
    reviews: [],
  },
  {
    id: "1x4",
    name: "Gucci Leather",
    price: 2450,
    description: "Premium leather and iconic design.",
    ratings: 5,
    // images: [{ image: GucciBag1 }, { image: GucciBag2 }],
    images:GucciBag1,
    seller: "LuxuryBags",
    stock: 8,
    numOfReviews: 44,
    reviews: [],
  },

  // Hats
  {
    id: "1x5",
    name: "New Era Baseball Cap",
    price: 1200,
    description: "Classic cap for any occasion.",
    ratings: 4.3,
    // images: [{ image: Baseballcap1 }, { image: Baseballcap2 }],
    images:Baseballcap1,
    seller: "CapWorld",
    stock: 50,
    numOfReviews: 91,
    reviews: [],
  },
  {
    id: "1x6",
    name: "Stetson Cowboy Hat",
    price: 1800,
    description: "Traditional style with modern comfort.",
    ratings: 4.8,
    // images: [{ image: CowboyCap1 }, { image: CowboyCap2 }],
    images:CowboyCap1,
    seller: "WesternStyle",
    stock: 12,
    numOfReviews: 32,
    reviews: [],
  },

  // Footwear
  {
    id: "1x7",
    name: "Adidas Ultraboost",
    price: 4900,
    description: "Top-notch comfort for runners.",
    ratings: 4.9,
    // images: [{ image: AdidasShoes1 }, { image: AdidasShoes2 }],
    images:AdidasShoes1,
    seller: "SneakerShop",
    stock: 25,
    numOfReviews: 87,
    reviews: [],
  },
  {
    id: "1x8",
    name: "Timberland Classic Boots",
    price: 12500,
    description: "Durable boots for all terrains.",
    ratings: 4.7,
    // images: [{ image: TimberlandShoes1 }, { image: TimberlandShoes2 }],
    images:TimberlandShoes1,
    seller: "OutdoorGear",
    stock: 18,
    numOfReviews: 61,
    reviews: [],
  },

  // Sunglasses
  {
    id: "1x9",
    name: "Ray-Ban Wayfarer",
    price: 17650,
    description: "Iconic style with UV protection.",
    ratings: 4.6,
    // images: [{ image: RayBandShoes1 }, { image: RayBandShoes2 }],
    images:RayBandShoes1,
    seller: "VisionWorld",
    stock: 30,
    numOfReviews: 129,
    reviews: [],
  },
  {
    id: "1x10",
    name: "Oakley Sports Sunglasses",
    price: 22000,
    description: "Designed for high-performance activities.",
    ratings: 4.8,
    // images: [{ image: OakleyShoes1 }, { image: OakleyShoes2 }],
    images:OakleyShoes1,
    seller: "ProGear",
    stock: 15,
    numOfReviews: 72,
    reviews: [],
  },
];
