import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'app/master.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private master: MasterService, private route: ActivatedRoute) { }
  locPath = '../../../assets/img/';
  data = {
    id: '',
    price: '',
    title: '',
    description: '',
    image: '',
    categories: {
      name: '',
      id: ''
    }
  };
  id;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadProd();
  }
  loadProd() {
    this.master.getEachProduct(this.id).subscribe(res => {
      if (res.success == true) {
        this.data = res.data
      }
    })
  }
  addCart() {
    let obj = {
      product_id: this.data.id
    }
    this.master.addToCart(obj).subscribe(res => {
      if (res.success == true) {
        window.location.reload();
      } else {
        alert(res.message)
      }
    })
  }
  addWishlist() {
    let obj = {
      product_id: this.data.id
    }
    this.master.addToWishlist(obj).subscribe(res => {
      if (res.success == true) {
        window.location.reload();
      } else {
        alert(res.message)
      }
    })
  }
}