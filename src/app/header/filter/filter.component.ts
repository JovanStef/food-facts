import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'food-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  disabledButton = true;
  form: FormGroup;
  currentFormValue:string;
  ingredientsToFilterBy:string[]=[];


  constructor(
    private productService:ProductServiceService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      filter: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(2)]
      })
    })
    this.form.get('filter').valueChanges.subscribe(val => {
      this.currentFormValue = val;
      if (this.form.valid) {
        this.disabledButton = false
      } else {
        this.disabledButton = true

      }
    });
    this.ingredientsToFilterBy = this.productService.ingredients;
  }
  onSubmit(form: FormGroup): void {
    if (this.form.valid) {
      this.ingredientsToFilterBy.push( this.currentFormValue.toLowerCase());
      this.productService.getFilteredProductsByIngredients(this.ingredientsToFilterBy,1).subscribe()
      this.form.reset();

    }
  }

  removeIngredient(i){
    this.ingredientsToFilterBy.splice(i,1);
      this.productService.getFilteredProductsByIngredients(this.ingredientsToFilterBy,1).subscribe()
  }
}
