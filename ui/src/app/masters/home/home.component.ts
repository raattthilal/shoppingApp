import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'app/master.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  constructor(private master:MasterService,private router:Router) { }
  Allproducts=[];
  keyword;
  filter;
  Categories=[];
  locPath='../../../assets/img/';
  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }
  loadProducts(){
    this.master.getAllProducts(this.filter,this.keyword).subscribe(res=>{
      if(res.success==true){
        this.Allproducts=res.data;
      }
    })
  }
  loadCategories(){
    this.master.getAllCategories().subscribe(res=>{
      if(res.success==true){
        this.Categories=res.data;
      }
    })
  }
  loadFilter(){
    console.log(this.filter);
    this.ngOnInit()
  }
  searchFilter(){
    console.log(this.keyword);
    this.ngOnInit()
  }
  addCart(id){
    let data={
      product_id:id
    }
   this.master.addToCart(data).subscribe(res=>{
     if(res.success==true){
      console.log("Added");

     }else{
       alert(res.message)
     }
   })
  }
  opn(id){
    this.router.navigate([`/product/${id}`]);
  }
  addWishlist(id){
    let data={
      product_id:id
    }
   this.master.addToWishlist(data).subscribe(res=>{
     if(res.success==true){
      console.log("Added");
      
     }else{
      alert(res.message)
    }
   })
  }
}
