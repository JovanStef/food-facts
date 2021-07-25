import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'food-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showFilterDialog = false;
  filter = false;
  constructor(private route: ActivatedRoute , private productService:ProductServiceService) { }

  ngOnInit(): void {
    if(this.route.snapshot.url[0].path === 'home'){
      this.filter = true
      this.showFilterDialog = this.productService.ingredients.length > 0;
    }
  }
  showFilter():void{
    this.showFilterDialog = !this.showFilterDialog
  }
  
}
