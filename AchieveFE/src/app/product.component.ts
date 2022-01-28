import { Component, OnInit } from '@angular/core';

 
import { ProductService } from './product.service';
/** product class is the model for a Product */
import { Product } from './Product';
 
@Component({
  templateUrl: './product.component.html',
})
 
export class ProductComponent
{
 
    products: Product[] = [];
    product: Product = new Product(0,"",0) ;
    showdetails:boolean = false ;
    
  
   constructor(private productService:ProductService){
 
}
 title="My Products" ;
   ngOnInit() {
     this.products=this.productService.getProducts();
   }

   /* get details for a product */

   getProduct(id)  {
    /* note: Non nullable assertion */ 
    this.product = this.productService.getProduct(id) !;
    this.showdetails= true ;
   }

  
} 
