let carts = document.querySelectorAll('.add-cart');
let products=[
    {
        name: "Megumi",
        tag:"megumi",
        price:150,
        inCart:0
    },
    {
        name: "Gojo",
        tag:"gojo",
        price:160,
        inCart:0
    },
    {
        name: "Itadori",
        tag:"itadori",
        price:170,
        inCart:0
    },
    
    

];
for(let i=0;i< carts.length;i++)
{
    carts[i].addEventListener('click',() =>{
        cartsNumbers(products[i]);
        totalCost(products[i]);
    })
    }
/*----------1Sa ramana numarul din cos si dupa refresh--------------*/
  function onLoadCartNumbers(){
    let productNumbers= localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent= productNumbers;
    }
  }  
  /*-----------1END-------------*/
function cartsNumbers(product){
   
    let productNumbers= localStorage.getItem('cartNumbers');
    
    productNumbers= parseInt(productNumbers);

    if(productNumbers)
    {
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector('.cart span').textContent= productNumbers+1;
    }else
    {
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent= 1;
    }
    setItems(product)
}
function setItems(product){
let cartItems= localStorage.getItem('productsInCart');
cartItems=JSON.parse(cartItems);


if(cartItems!=null)
{
    if(cartItems[product.tag]== undefined)
    {
        cartItems={
            ...cartItems,
            [product.tag]:product
        }
    }
cartItems[product.tag].inCart += 1;
}
else{
    product.inCart = 1;
cartItems={
    [product.tag] : product
}

}
localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}
function totalCost(product){
   // console.log("the product price is",product.price);
   let cartCost =localStorage.getItem('totalCost');
  
   console.log("my cartcost is", cartCost);
   if(cartCost!=null)
   {cartCost=parseInt(cartCost); //cand iese din local store e string si trebuie facut int
localStorage.setItem("totalCost",cartCost+product.price);
   }else{
        localStorage.setItem("totalCost",product.price);
   }
   
}

function displayCart(){
 let cartItems=localStorage.getItem("productsInCart");
 cartItems=JSON.parse(cartItems);
 let productContainer=document.querySelector(".cart-info");
 
 let cartCost =localStorage.getItem('totalCost');
 if(cartItems && productContainer)
 {
     productContainer.innerHTML = '';
     Object.values(cartItems).map(item =>
     {
         productContainer.innerHTML += `
        
            <div class="cart-info">
              <div class="cart-container">

              <div class="cart-box"> <img src="./poze/${item.tag}.jpg"> 
               <h5 >${item.name}</h5> 
              </div>
                
              <div class="cart-box"> 
              <i class="fa-solid fa-circle-minus"></i>
              <span>${item.inCart}</span> 
              <i class="fa-solid fa-circle-plus"></i>
              
              </div>
              <div class="cart-box"> <h4>${item.price} lei<h4> </div> 
              <div class="cart-box"> <h4>${item.inCart*item.price} lei<h4> </div> 
               </div>
       

    </div>
         `;

     });
     productContainer.innerHTML += `
     <div class="basketTotalContainer">
     <h4 class="basketTotalTitle">
     Cost Total : </h4>
     <h4 class="basketTotal">
     ${cartCost} lei
     </h4>
     `;

 }
}

onLoadCartNumbers();
displayCart();