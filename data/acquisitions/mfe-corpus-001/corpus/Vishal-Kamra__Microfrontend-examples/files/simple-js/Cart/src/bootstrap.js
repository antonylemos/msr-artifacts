import { faker } from "@faker-js/faker";

export const mount = (el) => {
  const randomNumber = faker.number.int({ min: 1, max: 10 });
  let cartText = `<div>You have ${randomNumber} items in your cart</div>`;

  el.innerHTML = cartText;
};

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#dev-cart");
  if (el) {
    mount(el);
  }
}
