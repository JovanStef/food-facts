import { IIngredient } from "./IIngredient";

export class Ingredient implements IIngredient{
  constructor(name:string , image:object){
    this.name = name;
    this.image = image;
  }
  name: string;
  image: { sm?: string; md?: string; lg?: string; };
}