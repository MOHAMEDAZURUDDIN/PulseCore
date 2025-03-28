import { Facebook, Twitter, Instagram } from "@mui/icons-material";

export const nav_title = [
  { display: "Home", path: "/" },
  { display: "Products", path: "#popular-sales" },
  { display: "Services", path: "#services" },
  { display: "About Us", path: "#about-us" },
];

export const socialMedia = [
  { icon: <Facebook />, link: "https://www.facebook.com" },
  { icon: <Twitter />, link: "https://www.twitter.com" },
  { icon: <Instagram />, link: "https://www.instagram.com" },
];

export const footerLinks = [
  {
    title: "Products",
    links: [
      {
        name: "Apple Series",
        link: "https://www.apple.com/in/shop/buy-watch/apple-watch/42mm-cellular-slate-titanium-slate-milanese-loop-onesize?cid=aos-in-seo-pla-watch-watch",
      },
      {
        name: "Casio Watches",
        link: "https://www.amazon.in/Casio-Vintage-Digital-Womens-Watch-B640WC-5ADF/dp/B008PDQT6I/ref=asc_df_B008PDQT6I/?tag=googleshopdes-21&linkCode=df0&hvadid=709883154391&hvpos=&hvnetw=g&hvrand=4857012627570077995&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9300470&hvtargid=pla-338142538304&psc=1&mcid=3c7a72b97d1d37b99e8eb1ce85f64020&gad_source=1",
      },
      {
        name: "Herschel Backpack",
        link: "https://www.amazon.in/Herschel-Supply-Co-America-Backpack/dp/B072DTN4SW?gQT=2",
      },
      {
        name: "Gucci Leather",
        link: "https://www.amazon.in/s?k=Gucci+Leather&i=apparel&crid=1AYTVXNAGJRV0&sprefix=gucci+leather%2Capparel%2C318&ref=nb_sb_noss_2",
      },
      {
        name: "Ray-Ban Wayfarer",
        link: "https://www.amazon.in/Herschel-Supply-Co-America-Backpack/dp/B072DTN4SW?gQT=2",
      },
      {
        name: "Adidas Ultraboost",
        link: "https://www.amazon.in/Herschel-Supply-Co-America-Backpack/dp/B072DTN4SW?gQT=2",
      },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "About us", link: "/" },
      { name: "FAQs", link: "/" },
      { name: "How it works", link: "/" },
      { name: "Privacy policy", link: "/" },
      { name: "Payment policy", link: "/" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { name: "customer@pulsecore.com", link: "mailto:customer@pulsecore.com" },
      { name: "+92554862354", link: "tel:+92554862354" },
    ],
  },
];
