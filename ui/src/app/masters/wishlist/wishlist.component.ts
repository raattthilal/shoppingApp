import { Component, OnInit } from '@angular/core';
import { MasterService } from 'app/master.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  AllWishlist=[];
  locPath='../../../assets/img/';
  constructor(private master:MasterService) { }

  ngOnInit() {
    this.loadWishlist()
  }
  loadWishlist(){
    this.master.getAllWishlist().subscribe(res=>{
      if(res.success==true){
        this.AllWishlist=res.data;
       
      }
    })
  }
  delet(id){
    this.master.deleteWisllist(id).subscribe(res=>{
      if(res.success==true){
        this.ngOnInit();
      }
    })
  }
  Add1(item){
   let obj={
      product_id:item.products.id,
      wishlist_id:item.id
    }
    this.master.addToCart(obj).subscribe(res=>{
      if(res.success==true){
        this.ngOnInit();
      }else{
        alert(res.message)
        window.location.reload();
      }
    })
  }
}