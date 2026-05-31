const products = [
{
name:"Laptop",
price:50000,
image:"https://picsum.photos/300?1"
},
{
name:"Smartphone",
price:25000,
image:"https://picsum.photos/300?2"
},
{
name:"Headphones",
price:3000,
image:"https://picsum.photos/300?3"
},
{
name:"Smart Watch",
price:5000,
image:"https://picsum.photos/300?4"
},
{
name:"Camera",
price:35000,
image:"https://picsum.photos/300?5"
},
{
name:"Tablet",
price:18000,
image:"https://picsum.photos/300?6"
}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

displayProducts();
updateCounts();
renderCart();
renderWishlist();
renderOrders();

function displayProducts(){

const container =
document.getElementById("productsContainer");

container.innerHTML = "";

products.forEach((product,index)=>{

container.innerHTML += `

<div class="product-card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<button onclick="addToCart(${index})">
Add To Cart
</button>

<button onclick="addToWishlist(${index})">
Wishlist
</button>

</div>

`;

});

document.getElementById("productCount").innerText =
products.length;

}

function login(){

let username =
document.getElementById("username").value;

let password =
document.getElementById("password").value;

if(username === "" || password === ""){

document.getElementById("loginMessage").innerText =
"Please enter username and password";

return;

}

document.getElementById("loginMessage").innerText =
"Welcome " + username;

}

function addToCart(index){

cart.push(products[index]);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCounts();
renderCart();

}

function renderCart(){

let total = 0;

let html = "";

cart.forEach((item,i)=>{

html += `

<li>

${item.name} - ₹${item.price}

<button onclick="removeCart(${i})">
Remove
</button>

</li>

`;

total += item.price;

});

document.getElementById("cartList").innerHTML =
html;

document.getElementById("totalPrice").innerText =
total;

}

function removeCart(index){

cart.splice(index,1);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCounts();
renderCart();

}

function addToWishlist(index){

wishlist.push(products[index]);

localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);

updateCounts();
renderWishlist();

}

function renderWishlist(){

let html = "";

wishlist.forEach(item=>{

html += `<li>${item.name}</li>`;

});

document.getElementById("wishlist").innerHTML =
html;

}

function addReview(){

let review =
document.getElementById("reviewInput").value;

let rating =
document.getElementById("rating").value;

if(review==="") return;

document.getElementById("reviewList").innerHTML +=
`<li>${review} ⭐ ${rating}</li>`;

document.getElementById("reviewInput").value = "";

}

function placeOrder(){

if(cart.length===0){

alert("Cart is Empty");

return;

}

let total =
Number(document.getElementById("totalPrice").innerText);

orders.push({
amount:total,
status:"Pending"
});

localStorage.setItem(
"orders",
JSON.stringify(orders)
);

cart=[];

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

renderCart();
renderOrders();
updateCounts();

alert("Order Placed Successfully");

}

function renderOrders(){

let html = "";

let revenue = 0;

orders.forEach(order=>{

html += `
<li>
Order - ₹${order.amount}
(${order.status})
</li>
`;

revenue += order.amount;

});

document.getElementById("ordersList").innerHTML =
html;

document.getElementById("orderCount").innerText =
orders.length;

document.getElementById("revenue").innerText =
"₹" + revenue;

}

function addProduct(){

let name =
document.getElementById("newProductName").value;

let price =
document.getElementById("newProductPrice").value;

if(name==="" || price===""){

alert("Fill all fields");

return;

}

products.push({

name:name,
price:Number(price),
image:"https://picsum.photos/300?random="+Date.now()

});

displayProducts();

document.getElementById("newProductName").value="";
document.getElementById("newProductPrice").value="";

alert("Product Added");

}

function updateCounts(){

document.getElementById("cartCount").innerText =
cart.length;

document.getElementById("wishCount").innerText =
wishlist.length;

}

function searchProducts(){

let value =
document.getElementById("searchInput")
.value
.toLowerCase();

let cards =
document.querySelectorAll(".product-card");

cards.forEach(card=>{

let text =
card.querySelector("h3")
.innerText
.toLowerCase();

if(text.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

}

function showSection(id){

document
.querySelectorAll(".hidden")
.forEach(sec=>{

});

const section =
document.getElementById(id);

section.classList.toggle("hidden");

}

function toggleDarkMode(){

document.body.classList.toggle("dark-mode");

}