import { Injectable } from '@angular/core';
import { IAllergen } from '../models/IAlergen';

@Injectable({
  providedIn: 'root'
})
export class AlergensServiceService {

  constructor() { }

  formatAllergen(allergen:string):IAllergen[]| any{
    if(allergen && allergen != ''){
      let allArray = allergen.split(',');
      return allArray.map(all => {
        return all.split(':')[1];
      })
    }
    else{
      return [];
    }
  }
}
