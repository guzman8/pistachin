const Collections = ["empty","Nube", "Bosque", "Cerdanya","Pana"];
const Cloths = [["empty"],["empty","Ranita bebe niña","Peto bebe niño","Vestido niña","Polera niño"]]

//var storeClo = sessionStorage.cloth;
var currentPic = 50;
var currentCloth = localStorage.Cloth;
var curentCollection = localStorage.Collection;
//console.log("storeCloth is:")
//console.log(storeClo);
console.log("storeCollection is:")
console.log(currentCloth);
console.log("collection es:")
console.log(localStorage.Collection);


document.getElementById('item1').style.backgroundImage = "url('"+curentCollection+"/"+currentCloth+"/01.jpeg')";
document.getElementById('copy1').style.backgroundImage = "url('"+curentCollection+"/"+currentCloth+"/01.jpeg')";
document.getElementById('copy2').style.backgroundImage = "url('"+curentCollection+"/"+currentCloth+"/02.jpeg')";
document.getElementById('copy3').style.backgroundImage = "url('"+curentCollection+"/"+currentCloth+"/03.jpeg')";
document.getElementById('copy4').style.backgroundImage = "url('"+curentCollection+"/"+currentCloth+"/04.jpeg')";
document.getElementById('copy5').style.backgroundImage = "url('"+curentCollection+"/"+currentCloth+"/05.jpeg')";
console.log(curentCollection, currentCloth, document.getElementById('item1').style.backgroundImage);

function calcNumeroColeccionCloth(tipo){
    var numero =0;
    if(tipo == 1){
        numero = numero + (curentCollection[0]*10) + currenCollection[1];
    }
}

function setNextPic(){
    console.log("next pic, here we go")
    currentPic ++;
    var currentPicConvertida = ((currentPic)%5)+1;
    var textPic = "0"+currentPicConvertida
    document.getElementById('item1').style.backgroundImage = "url('/"+curentCollection+"/"+currentCloth+"/"+textPic+".jpeg')";
}

function setPic(pic){
    document.getElementById('item1').style.backgroundImage = "url('/"+curentCollection+"/"+currentCloth+"/"+pic+".jpeg')";
}

const primaryNav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.mobile-nav-toggle');

navToggle.addEventListener('click', () => {
    const visibility = primaryNav.getAttribute("data-visible");
    console.log(visibility);
    if (visibility === "false"){
        primaryNav.setAttribute("data-visible",true);
        navToggle.setAttribute("aria-expanded", true);
    }else{
        primaryNav.setAttribute("data-visible",false);
        navToggle.setAttribute("aria-expanded",false);
    }
    const visibility2 = primaryNav.getAttribute("data-visible");
    console.log(visibility2)
});

doShowAll()

function doShowAll() {
    if (true) {
        var key = "";
        var list = "<table><tr><th>Item</th><th>Ammount</th><th>Value</th></tr>";
        var i = 0;
        //For a more advanced feature, you can set a cap on max items in the cart.
        for (i = 0; i <= localStorage.length-1; i++) {
            key = localStorage.key(i);
            if(key != 'Cloth' && key != 'Collection'){
                list += "<tr><td>" + key + "</td><td>"
                    + localStorage.getItem(key) + "</td><td>20€</td></tr>";
            }
        }
        //If no item exists in the cart.
        if (list == "<table><tr><th>Item</th><th>Ammount</th><th>Value</th></tr>") {
            list += "<tr><td><i>empty</i></td><td><i>empty</i></td><td><i>empty</i></td></tr>";
        }
        list += "</table>";
        //Bind the data to HTML table.
        //You can use jQuery, too.
        document.getElementById('list').innerHTML = list;
    } else {
        alert('Cannot save shopping list as your browser does not support HTML 5');
    }
}

function SaveItem() {
    var newData
    
    var itemSizeSelector = document.getElementById("itemSize");
    var itemSize = itemSizeSelector.value;
    var name = Cloths[parseInt(curentCollection)][parseInt(currentCloth)] + "(" + Collections[parseInt(curentCollection)] + ")" + " - " +itemSize;
    console.log(name)
    var itemAmountSelector = document.getElementById("itemAmount")
    var amount = itemAmountSelector.value
    if (amount == ''){
        console.log("no han seleccionado nada");
        amount = 1;
    }
    console.log(amount)
    if(parseInt(localStorage.getItem(name)) > 0 && parseInt(localStorage.getItem(name)) < 99){
        amount = parseInt(amount) + parseInt(localStorage.getItem(name))
    }

    localStorage.setItem(name, amount);
    doShowAll();

}

//Change an existing key-value in HTML5 storage.
function ModifyItem() {
    var name1 = document.forms.ShoppingList.name.value;
    var data1 = document.forms.ShoppingList.data.value;
    //check if name1 is already exists

//Check if key exists.
            if (localStorage.getItem(name1) !=null)
            {
              //update
              localStorage.setItem(name1,data1);
              document.forms.ShoppingList.data.value = localStorage.getItem(name1);
            }

    doShowAll();
}

function RemoveItem(){
    var name=document.forms.ShoppingList.name.value;
    document.forms.ShoppingList.data.value=localStorage.removeItem(name);
    doShowAll();
}

function ClearAll() {
    localStorage.clear();
    doShowAll();
}

function setSellImages(coleccion, cloth){
    console.log("vamos a poner las imagenes a punto");
    localStorage.setItem("Collection", coleccion);   
    localStorage.setItem("Cloth", cloth);
    console.log(localStorage.Cloth);
    storeCol = coleccion;
    storeClo = cloth;
    
}

