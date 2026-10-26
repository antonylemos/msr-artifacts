import faker from "faker";

// Takes a reference to an HTML element and adds the products component to it
const mount = (el) => {
  let products = "";
  for (let i = 0; i < 3; i++) {
    const name = faker.commerce.productName();
    const price = faker.commerce.price();
    const image = faker.image.imageUrl();
    products += `<div>Name: ${name}, Price: ${price}, Image: ${image}</div>`;
  }
  el.innerHTML = products;
};

// If we are in development and in isolation, call mount immediately
// ENV variable is set up by webpack automatically
if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#dev-products");

  // Assume our container (HOST) does not have an element with id 'dev-products'
  if (el) {
    // We are running in isolation.
    mount(el);
  }
}
export { mount };
