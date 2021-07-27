import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IAllergen } from '../models/IAlergen';
import { Ingredient } from '../models/Ingredient';
import { Product } from '../models/Product';
import { AlergensServiceService } from './alergens-service.service';
import { CrudServiceService } from './crud-service.service';
import { IngredientServiseService } from './ingredient-servise.service';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private page: number = 1;
  private show: number = 24;
  private skip: number = 3;
  private maxPages: number;
  public products = new BehaviorSubject<Product[]>([])
  public ingredients:string[]=[];
  constructor(
    private crud:CrudServiceService , 
    private ingredientService:IngredientServiseService,
    private alergenService:AlergensServiceService
    ) { }

  getProducts(): Observable<any> {
    if(this.ingredients.length !== 0){
      return this.getFilteredProductsByIngredients(this.ingredients)
    }else{
    return this.crud.getProductsFromDB(this.page, this.show)
    .pipe(
      tap((res)=>this.formatPagination(res)),
      map((res: any) => res.products.map( product => this.formatProductData(product))),
      catchError(error => {
        console.log(error)
        return throwError({ message: 'Something went wrong please try again later' })}),
      tap(products => this.products.next(products))
    )
  }
  }

  getProductById(id:string):Observable<any>{
    return this.crud.getProductByIdFromDB(id)
    .pipe(
      map((res:any) => this.formatProductData(res.product)), 
      catchError(error => {
        console.log(error)
        return throwError({ message: 'Something went wrong please try again later' })})
    )
  }
  getFilteredProductsByIngredients(ingredients, page? ):Observable<any>{
    this.ingredients = ingredients;
    this.page = page || this.page;
    if(this.ingredients.length !== 0){
      let ingreds = this.formatIngredientsForFilter(ingredients)
      return this.crud.getProductByFilterIngredients( ingreds ,this.page, this.show)
      .pipe(
        tap((res)=> this.formatPagination(res)),
        map((res: any) => res.products.map( product => this.formatProductData(product))),
        catchError(error => {
          return throwError({ message: 'Something went wrong please try again later' })
        }),
        tap(products => this.products.next(products))
        )
      }else{
        return this.getProducts()
      }
  }
  formatProductData(product){
    let ingreds:Ingredient[] = this.ingredientService.formatIngredients(product.ingredients);
    let allergens:IAllergen[] = this.alergenService.formatAllergen(product.allergens);
    let productImg = {
      lg:product.image_front_url,
      md:product.image_small_url,
      sm:product.image_thumb_url,
    }

    let ingredImg = {
      lg:product.image_ingredients_url,
      md:product.image_ingredients_small_url,
      sm:product.image_ingredients_thumb_url,
    }

    let alergensImg = {
      lg:'',
      md:'',
      sm:'',
    }

    return new Product(
      product._id , 
      product.product_name , 
      productImg,
      product.countries,
      product.brands,
      ingreds,
      allergens,
      ingredImg,
      alergensImg,
      )
  }
  formatIngredientsForFilter(ingredients){
    // tagtype_1=ingredients&tag_contains_1=contains&tag_1=mozzarella&tagtype_2=ingredients&tag_contains_2=contains&tag_2=parmesan
    let temp = ingredients.map((ingred , index)=>{
      ingred = ingred.trim().toLowerCase().replace(/\s/g, '%20');
      return`tagtype_${index+1}=ingredients&tag_contains_${index+1}=contains&tag_${index+1}=${ingred}`
    })
    return temp.join('&')
  }

  // PAGINATION
  formatPagination(res){
    this.page = res.page;
    this.show = res.page_count;
    this.maxPages = Math.ceil(res.count / res.page_count);
  }

  nextPage(): number {
    if (this.page <= this.maxPages) {
      this.page++
      return this.page
    } else {
      return this.page = this.maxPages
    }
  }
  prevPage(): number {
    if (this.page >= 2) {
      this.page--
      return this.page
    } else {
      return this.page = 1;
    }
  }
  skipForward():number {
    if (this.page + this.skip <= this.maxPages) {
      this.page += this.skip;
      return this.page
    } else {
      return this.page = this.maxPages
    }
  }

  skipBackward():number {
    console.log(this.page - this.skip >= 1)
    if (this.page - this.skip >= 1) {
      this.page -= this.skip;
      return this.page
    } else {
      return this.page = 1;
    }
  }
  getPaginationData():object{
    return {
      maxPages:this.maxPages,
      currPage:this.page,
      
    }
  }
}
