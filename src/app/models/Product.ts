import { IAllergen } from "./IAlergen";
import { IIngredient } from "./IIngredient";
import { IProduct } from "./Iproduct";

export class Product implements IProduct{
  id: string;
  name: string;
  image: object;
  country: string[] | string | any;
  brand: string;
  ingredients: IIngredient[];
  allergens: IAllergen[];
  ingredImg:object;
  alergImg:object;
  
  constructor(id:string , name:string, image:object , country:string , brand:string , ingredients:IIngredient[] , allergens:IAllergen[] , ingredImg:object , alergImg:object){
      this.id = id;
      this.name = name;
      this.image = image;
      this.country = country
      this.brand = brand;
      this.ingredients = ingredients;
      this.allergens = allergens;
      this.ingredImg = ingredImg;
      this.alergImg = alergImg;
  }
  setDefaultImage(image):object{
    let defaultImage = '../../assets/images/pizza.jpg';
    if(!image.sm && !image.md && !image.lg ){
      return {sm:defaultImage , md:defaultImage , lg:defaultImage}
    }
    else{
      return image
    }
  }
  getImage():object{
    return this.setDefaultImage(this.image)
  }
  getCountries():string[] | string{
    return this.country.split(',');
  }
  getName():object{
    return {
      short:() => { 
        if(this.name.split(' ').length > 5){
          return this.name.split(' ').slice(0,5).join(' ') + " ...";
        }else{
          return this.name
        }
      },
      full:() => {
        return this.name
      }
}
  }
}