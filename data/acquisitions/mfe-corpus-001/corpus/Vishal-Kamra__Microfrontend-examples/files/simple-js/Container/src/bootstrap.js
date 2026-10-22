import { mount as mountProducts } from "products/ProductsIndex";
import { mount as mountCart } from "cart/CartShow";

mountProducts(document.querySelector("#dev-products"));
mountCart(document.querySelector("#dev-cart"));
