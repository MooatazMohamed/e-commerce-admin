import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { CardComponent } from './cards/components/card/card.component';

const routes: Routes = [
  {
    path:"products",
    component:AllProductsComponent
  },
  {
    path:"details",
    component:ProductsDetailsComponent
  },
  {
    path:"card",
    component:CardComponent
  },
  {
    path:"details/:id",
    component:ProductsDetailsComponent
  },
  {
    path:"**",
  component:CardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
