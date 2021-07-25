import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'food-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {
 public id:string
 public product:Product;
 public showSpinner = true;
  constructor(private productService:ProductServiceService , private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct(){
    this.id = this.route.snapshot.params.id;
    this.productService.getProductById(this.id).subscribe(data => {
      this.product = data
      this.showSpinner = false;
      console.log(this.product)
    },
    (error: any)=>{

    })
  }

}
