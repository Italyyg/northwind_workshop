"use strict"

window.onload = ()=>{

    let dropdown = document.querySelector("#productSearchDDL");

    dropdown.addEventListener("change", displayAll);
}
async function displayAll(){
let dropdown = document.querySelector("#productSearchDDL");
let tbody = document.querySelector("#tableBody")
let productsList = await getAllData();

if(dropdown.value === "all"){

productsList.forEach((product) => {

     buildTable(tbody, product)
});


}else{
    console.log("not today haah")
}



}
function buildTable(tbody, data){

//create the row fro the table
let row = tbody.insertRow();

let productNCell= row.insertCell();
productNCell.innerHTML = data.productName;

let priceCell= row.insertCell();
priceCell.innerHTML = data.unitPrice;

let inStockCell= row.insertCell();
inStockCell.innerHTML = data.unitsInStock;

let suppCell= row.insertCell();
suppCell.innerHTML = data.supplier;




}
async function getAllData(){

    try{
let response = await fetch("http://localhost:8081/api/products");
let list = await response.json();

return list;
    }catch(err){
        console.log("This wont work luv")
        throw new Error (err)
    }

}