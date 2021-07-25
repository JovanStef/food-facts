import { IAllergen } from "./IAlergen";
import { IIngredient } from "./IIngredient";

export interface IProduct {
  id:string,
  name:string,
  image:{
    sm?:string,
    md?:string,
    lg?:string
  },
  country:string[] | string,
  brand:string,
  ingredients:IIngredient[],
  allergens:IAllergen[]
}