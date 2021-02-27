import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient, private router: Router) {}
  
  // Products

  getAllProducts(filter,keyword){
   
    if(!filter  && !keyword ){
      return this.http.get<any>(`5004/products/list`)
    }
    if( filter  && !keyword  ){
      return this.http.get<any>(`5004/products/list?category_id=${filter}`)
    }
    if( !filter&& keyword ){
      return this.http.get<any>(`5004/products/list?title=${keyword}`)
    }
    if(filter && keyword ){ 
      return this.http.get<any>(`5004/products/list?category_id=${filter}&title=${keyword}`)
    }
  }
  getEachProduct(id){
    return this.http.get<any>(`5004/products/${id}`)
  }

  //Categories
  getAllCategories(){
    return this.http.get<any>('5005/categories/list')
  }
  
  //Wishlist
  addToWishlist(body){
    return this.http.post<any>('5003/wishlist/create',body)
  }
  getAllWishlist(){
    return this.http.get<any>('5003/wishlist/list')
  }
  getWishlistCount(){
    return this.http.get<any>('5003/wishlist/count')
  }
  deleteWisllist(id){
    return this.http.delete<any>(`5003/wishlist/${id}`)
  }

  //Cart
  addToCart(body){
    return this.http.post<any>('5002/carts/create',body)
  }
  getAllCart(){
    return this.http.get<any>('5002/carts/list')
  }
  clearCart(){
    return this.http.get<any>('5002/carts/clear')
  }
  getCartCount(){
    return this.http.get<any>('5002/carts/count')
  }
  updateCartQuantity(id,data){
    return this.http.put<any>(`5002/carts/${id}`,data)
  }
  deleteCart(id){
    return this.http.delete<any>(`5002/carts/${id}`)
  }

 

}
