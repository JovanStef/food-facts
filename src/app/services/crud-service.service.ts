import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  constructor(private httpClient:HttpClient) { }

  getProductsFromDB(page:number = 1 , show:number = 25 , partialQueryParams?:string):Observable<any>{
    return this.httpClient.get(
      `https://world.openfoodfacts.org/cgi/search.pl?action=process&page=${page}&page_size=${show}&tagtype_0=categories&tag_contains_0=contains&tag_0=pizzas&${partialQueryParams}&json=true`
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getProductByIdFromDB(id):Observable<any>{
    return this.httpClient.get(
      `https://world.openfoodfacts.org/api/v0/product/${id}.json`
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getProductByFilterIngredients(partialQueryParams:string,page:number = 1 , show:number = 25):Observable<any>{
    return this.httpClient.get(
      `https://world.openfoodfacts.org/cgi/search.pl?action=process&page=${page}&page_size=${show}&tagtype_0=categories&tag_contains_0=contains&tag_0=pizzas&${partialQueryParams}&json=true`
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }
}
