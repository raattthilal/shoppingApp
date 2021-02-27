import { Routes } from '@angular/router';
import { CartComponent } from 'app/masters/cart/cart.component';
import { HomeComponent } from 'app/masters/home/home.component';
import { ProductComponent } from 'app/masters/product/product.component';
import { WishlistComponent } from 'app/masters/wishlist/wishlist.component';




export const AdminLayoutRoutes: Routes = [
  
     { path: 'home',      component: HomeComponent },   
     { path: 'product/:id',      component: ProductComponent },
     { path: 'cart',      component: CartComponent },
     { path: 'wishlist',      component: WishlistComponent }
     
];
