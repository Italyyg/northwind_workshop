"use strict"

window.onload = () => {

    //getting the dropdown from our html page to work with it
    let dropdown = document.querySelector("#productSearchDDL");

    let catDrop = document.querySelector("#categorySearch");

    

    //calling the funtion where the options were applied to the second dropdown
    applyToDropdown();

    catDrop.addEventListener("change", displayEverythingInSecond);

    hideElement("#categorySearch");

    // catSelect.addEventListener("change", hideShowRadio)
    //if a option is selected from the dropdown it will run this function
    dropdown.addEventListener("change", displayAll);
}

//here i am running a function that will display everything on the list if
//the value matches the "view all" value on the dropdown
async function displayAll() {

    
    let dropdown = document.querySelector("#productSearchDDL");

    //grabbing the table off the html to display the data
    let tbody = document.querySelector("#tableBody");

    tbody.innerHTML = "";

    //we have have a fetch() action to get the data we need and we are then calling it here to work with
    let productsList = await getAllData();

    if (dropdown.value === "all") {

        //running a loop through the data to work with what we have and individually grab what we need
        productsList.forEach((product) => {

            //here we are building a table in where the items we loop through are placed by this function
            buildTable(tbody, product)
        });

    }else if (dropdown.value === "category"){
        showElement("#categorySearch")
        document.querySelector("#tableBody").innerHTML = ""; // Clearing table body

    }else{

        // Reset just the dropdown menu to its default option
      document.querySelector("#productSearchDDL").selectedIndex = 0;
      document.querySelector("#tableBody").innerHTML = ""; // Clearing table body
      hideElement("#categorySearch");

        console.log("naur babe")
    }



}
async function displayEverythingInSecond(){

    let catDrop = document.querySelector("#categorySearch");

    let catToValue= await displaySecondDrop();
    let tbody = document.querySelector("#tableBody");

     tbody.innerHTML = "";
    
    if(catDrop.value === "0"){
       
        tbody.innerHTML = "";
    }

    catToValue.forEach((product) => {

        //here we are building a table in where the items we loop through are placed by this function
        buildTable(tbody, product)
    });


}

async function applyToDropdown(){

    //grabbing the second dropdown from the HTML
    let catDrop = document.querySelector("#categorySearch");

    //using the data we called to use it
    let allCategories = await getCategories();

    

    //creating a default option to the dropwdown
    let defaultOption = document.createElement("option");
    defaultOption.value = "0";
    
    defaultOption.innerText = "----Select Category----";
 
    catDrop.appendChild(defaultOption);

    //here a loop is run to apply the names we need inside the dropdown 
    allCategories.forEach((category) => {

        //create the new option for the category we are on in the loop
        let newOption = document.createElement("option");

        //set the value for the option
        newOption.value = category.categoryId;

        //set what the user sees 
        newOption.textContent = category.name;

        catDrop.appendChild(newOption);


    });


}

//a function that builds the table that will display the data
function buildTable(tbody, data) {

    

    //create the row fro the table
    let row = tbody.insertRow();

    //creating the cells and what data it carries
    let productNCell = row.insertCell();
    productNCell.innerHTML = data.productName;

    let priceCell = row.insertCell();
    priceCell.innerHTML = data.unitPrice;

    let inStockCell = row.insertCell();
    inStockCell.innerHTML = data.unitsInStock;

    let suppCell = row.insertCell();
    suppCell.innerHTML = data.supplier;

    let DetailCell = row.insertCell();
    DetailCell.innerHTML = 
    `<a href ="./product_details.html?productid=${data.productId}"> Show details </a>`




}
//function that is grabbing the data we need from the link provided
async function getAllData() {

    try {
        let response = await fetch("http://localhost:8081/api/products");
        let list = await response.json();

        return list;
    } catch (err) {
        console.log("This wont work luv")
        throw new Error(err)
    }

}

// function to grab the data in the link for the categories
async function getCategories(){
    try {
        let response = await fetch("http://localhost:8081/api/categories");
        let cat = await response.json();

        return cat;
    } catch (err) {
        console.log("This wont work luv")
        throw new Error(err)
    }
}

async function displaySecondDrop(){

    try{
    let catDrop = document.querySelector("#categorySearch");

    let response = await fetch(`http://localhost:8081/api/products/bycategory/${catDrop.value}`);
    let data = await response.json();

    return data
    
    }catch(error){
    console.log("Girl..this doesnt work")
    }

}

//This function will hide an HTML element on the page
//Just pass it the id of the element you want to hide
function hideElement(someSelector) {
    let el = document.querySelector(someSelector);
    el.style.display = "none";
}

//This function will show an HTML element on the page
//Just pass it the id of the element you want to show
function showElement(someSelector) {
    let el = document.querySelector(someSelector);
    el.style.display = "block";
}