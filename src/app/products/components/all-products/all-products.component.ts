import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
   productList : any;
   categories :any=[]
   loading:boolean = false
   cardProduct:any[]= []
   base64:any=''
   form!:FormGroup
   isCheck:boolean=true
  constructor(private api : ProductsService , private build : FormBuilder){}

  test(){
    // if(this.isCheck == true){
    //   this.isCheck=false
    // }else{
    //   this.isCheck=true
    // }
  }
  ngOnInit(): void {
    this.form=this.build.group({
      title:['',[Validators.required]],
      price:['',[Validators.required]],
      description:['',[Validators.required]],
      image:['',[Validators.required]],
      category:['',[Validators.required]],
    })
    this.getProducts()
    this.getSpecificCategory()
  }

  getProducts(){
    this.api.getAllProduct().subscribe(res=>{
      this.productList = res;
      console.log(res)
    }, error =>{
      alert("Error")
      this.loading=false
    })
  }

  getSpecificCategory(){
    this.loading=true

    this.api.getCategory().subscribe(res=>{
      this.loading=false
      this.categories = res
      console.log(res)
    }, error =>{
      alert("Error")
    })
  }
  updateProduct(){
    this.isCheck = false
    const model = this.form.value
    this.api.createProduct(model).subscribe(res =>{
      alert("Product Updated Successfully")
    })

  }
  filterCategory(event:any){

    let value = event.target.value
    if(value == 'all'){
     this.getProducts()
    }
    else{
    this.getProductCategory(value)
    }
  }
  getProductCategory(keyWord:string){
    this.loading=true

    this.api.getProductByCategory(keyWord).subscribe(res =>{
      this.loading=false
      this.productList=res
    })
  }
addToCard(event:any){
  if("cart" in localStorage){
    this.cardProduct = JSON.parse(localStorage.getItem("cart")!)
    let exist = this.cardProduct.find(item=> item.item.id == event.item.id)
    if(exist){
      alert("Already exist")
    }else{
      this.cardProduct.push(event)
       localStorage.setItem("cart" , JSON.stringify(this.cardProduct))
    }
  }else{
    this.cardProduct.push(event)
    localStorage.setItem("cart" , JSON.stringify(this.cardProduct))
  }
/*    localStorage.setItem("card" ,JSON.stringify(event)) SEnd data
 */}

 getSelectedCategory(event:any){
  this.form.get('category')?.setValue(event.target.value)
  console.log('hi2')
 }

 getImagePath(event:any){

  const file = event.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () =>{
    this.base64 = reader.result
    this.form.get('image')?.setValue("s")
  }
 }
 addProduct(){
    const model = this.form.value
    this.api.createProduct(model).subscribe(res =>{
      alert("Product Added Successfully")
    })
}
update(item:any){
   this.isCheck = false
   this.form.get('title')?.setValue(item.title)
  this.form.get('description')?.setValue(item.description)
  this.form.get('category')?.setValue(item.category)
  this.form.get('price')?.setValue(item.price)
  this.form.get('image')?.setValue(item.image)
  this.base64=item.image

}

}

