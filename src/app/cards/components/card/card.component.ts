import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  constructor( private services : CardsService , private build : FormBuilder , private productService : ProductsService){}

  carts:any[]=[]
  products:any[]=[]
  form!:FormGroup
  total=0
  details:any
ngOnInit():void{
  this.form=this.build.group({
    start:[''],
    end:['']

  })
  this.getAllCarts()
}

  getAllCarts(){
    return this.services.getAllCarts().subscribe((res:any)=>{
      this.carts=res
    })
  }
 /*  filterApply(){
    let date = this.form.value
    return this.services.getAllCarts(date).subscribe((res:any)=>{
      this.carts=res
    })
  } */
  deleteCart(id:number){
    this.services.deleteCart(id).subscribe(res=>{
      this.getAllCarts()
      alert("Deleted Success")
    })
  }

  view(index:number){
    this.products=[]
    this.details = this.carts[index]
    for(let i in this.details.products){
      this.productService.getProductById(this.details.products[i].productId).subscribe(res =>{
        this.products.push({item:res , quantity:this.details.products[i].quantity})
      })
    }
  }
}
