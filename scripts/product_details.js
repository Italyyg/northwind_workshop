

"use strict"

window.onload = () =>{

    console.log("ITS ALIVE!");


    let urlParams = new URLSearchParams(location.search);

    console.log(urlParams.get("productid"));

    if(urlParams.has("productid")){

        //if we have a course id, display its details
        displayCourseDetails(urlParams.get("productid"));
    }else{
        //let them know we didnt have  a valid course id and send them back to courses
        alert("no valid product Id");
        window.location.href ="./index.html";
    }

}

async function displayCourseDetails(productid){

    //get the product details
    let productsDetails = await getProductDetails(productid);

    console.log(productsDetails);

    //get the div where we want to put the details for the course
    let productDetailsDiv = document.querySelector("#productDetails");

    //JSON stringify the output
    productDetailsDiv.innerHTML = `
     <div>Product name : ${productsDetails.productName}</div>
    <div>Unit Price : ${productsDetails.unitPrice}</div>
    <div>Units in Stock : ${productsDetails.unitsInStock}</div>
    <div>Supplier : ${productsDetails.supplier}</div>
    <div>Discontinued? : ${productsDetails.discontinued}</div>`
}

async function getProductDetails(productid){

    try{
    //use fetch to get the details for the specific course
    let response = await fetch("http://localhost:8081/api/products/"+ productid);
    //deal with the response to get the data
    let info = await response.json();

    //returning the data we got back from the link 
    return info;

    } catch(err){
        alert("no valid product Id");
        window.location.href ="./index.html";
    }
}
