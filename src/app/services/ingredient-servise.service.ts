import { Injectable } from '@angular/core';
import { IIngredient } from '../models/IIngredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientServiseService {
 
  constructor() { 

  }

  formatIngredients(ingredients:string[]):IIngredient[]| any{
    if(ingredients && ingredients.length > 0){
      return ingredients.map(ingred => {
        let temp = ingred['id'].split(':');
        return temp[1];
      })
    }else{
      return [];
    }
  }
}
