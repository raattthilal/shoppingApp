import { Component, OnInit } from '@angular/core';
import { MasterService } from 'app/master.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  AllCart=[];
  locPath='../../../assets/img/';
  constructor(private master:MasterService) { }
  totalcost;
  ngOnInit() {
    this.loadCart()
  }
  loadCart(){
    this.master.getAllCart().subscribe(res=>{
      if(res.success==true){
        this.AllCart=res.data;
        this.totalcost=res.totalcost
      }
    })
  }
  clear(){
    this.master.clearCart().subscribe(res=>{
      window.location.reload()
    });
  }
  delet(id){
    this.master.deleteCart(id).subscribe(res=>{
      if(res.success==true){
        this.ngOnInit();
      }
    })
  }
  Add1(item){
   let obj={
      quantity:item.quantity+1
    }
    this.master.updateCartQuantity(item.id,obj).subscribe(res=>{
      if(res.success==true){
        this.ngOnInit();
      }
    })
  }
}
