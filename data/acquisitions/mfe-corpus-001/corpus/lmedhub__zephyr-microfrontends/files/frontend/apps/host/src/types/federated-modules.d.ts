declare module "remote_header/Header" {
  import { ComponentType } from "react";
  const Header: ComponentType;
  export default Header;
}

declare module "remote_footer/Footer" {
  import { ComponentType } from "react";
  const Footer: ComponentType;
  export default Footer;
}

declare module "url_shortener/Shortener" {
  import { DefineComponent } from "vue";
  const Shortener: DefineComponent<{}, {}, any>;
  export default Shortener;
}
