import faker from "faker";

const mount = (el) => {
  const cartText = `<div>You have ${faker.random.number()} items in your cart</div>`;

  el.innerHTML = cartText;
};

// Context/Situation #1
// we are running this file in development in isolation
// we are using our local index.html file
// which DEFINITELY has an element with id of 'dev-products'
// we want to immediately render our app into that element
if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#dev-cart");
  if (el) {
    mount(el);
  }
}

// Context/Situation #2
// we are running this file in development or production
// we are running through the container app
// NO guarantee that an element with id of 'dev-products' exists
// we want to NOT immediately render the app
export { mount };
