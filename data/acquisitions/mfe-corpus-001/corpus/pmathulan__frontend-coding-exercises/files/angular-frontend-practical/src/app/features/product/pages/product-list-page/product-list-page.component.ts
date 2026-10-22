import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductComponent } from "../../components/product/product.component";

@Component({
  selector: 'app-product-list-page',
  imports: [RouterModule, ProductComponent],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss'
})
export class ProductListPageComponent {
  products: Product[] = [
    { id: 'p1', name: 'Laptop', price: 999 },
    { id: 'p2', name: 'Headphones', price: 199 },
    { id: 'p3', name: 'Keyboard', price: 99 }
  ];
}
