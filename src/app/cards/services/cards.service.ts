import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http:HttpClient) { }

  getAllCarts(params?:any){
     /* params = new HttpParams()
    params = params.append("startDate" , params?.start).append("endDate" , params?.end) */
    return this.http.get("https://fakestoreapi.com/carts")
  }
  deleteCart(id:number){
    return this.http.delete("https://fakestoreapi.com/carts/"+id)
  }
  
}
