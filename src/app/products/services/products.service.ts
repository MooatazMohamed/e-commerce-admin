import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getAllProduct(){
    return this.http.get('https://fakestoreapi.com/products')
  }
  getCategory(){
    return this.http.get('https://fakestoreapi.com/products/categories')
  }
  getProductByCategory(keyWord:string){
    return this.http.get('https://fakestoreapi.com/products/category/'+keyWord)
  }
  getProductById(id:any){
    return this.http.get('https://fakestoreapi.com/products/'+id) 
  }
  createProduct(model:any){
    return this.http.post("https://fakestoreapi.com/products",model)
  }
}
