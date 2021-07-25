import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/Product';
import { CrudServiceService } from 'src/app/services/crud-service.service';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'food-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products:Product[];

  spinnerTitle = 'Loading products';
  showSpinner: boolean = true;
  message;
  paggination:object = {};

  constructor(private productService:ProductServiceService) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getProducts()
      .subscribe(data => {
         this.showSpinner=false 
        }, 
        (error: any)=>{ 
          this.showSpinner = false;  
          this.message = 'Something went wrong';

        })

    this.productService.products
    .subscribe(data => {
      if(data){
        this.paggination = this.productService.getPaginationData(); 

        this.products = data;
      }else{
        this.message = 'No Data to show'
      }
    },
    (error: any)=>{
      this.showSpinner = false
      this.message = 'Something went wrong'
    })

   
  }

  nextPage(): void {
    this.productService.nextPage()
        this.loadProducts();

  }
  prevPage(): void {
    this.productService.prevPage()
        this.loadProducts();

  }
  skipBack(): void {
    this.productService.skipBackward()
        this.loadProducts()
  }
  skipFrwd(): void {
    this.productService.skipForward()
        this.loadProducts()
  }

}
