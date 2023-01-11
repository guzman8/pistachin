// Dynamically populate the table with shopping list items.
//Step below can be done via PHP and AJAX, too.
doShowAll()

function doShowAll() {
    if (true) {
        var key = "";
        var priceKey = "";
        var summ = 0.0;
        var list = "<table><tr><th>Producto</th><th>Cantidad</th><th>Precio unitario</th><th>Precio</td></tr>";
        var i = 0;
        //For a more advanced feature, you can set a cap on max items in the cart.
        for (i = 0; i <= localStorage.length-1; i++) {
            key = localStorage.key(i);
            if(key != 'Cloth' && key != 'Collection' && key != 'payAmount' && key != '__paypal_storage__' && key[0] != "$"){
                priceKey = "$" + key;
                list += "<tr><td>" + key + "</td><td>"
                    + localStorage.getItem(key) + "</td><td>" + localStorage.getItem(priceKey) + "€</td><td>" + Math.round(parseFloat(localStorage.getItem(priceKey))*parseFloat(localStorage.getItem(key))* 100) / 100 + "€</td></tr>";
                summ += parseFloat(localStorage.getItem(priceKey))*parseFloat(localStorage.getItem(key));
            }
        }
        localStorage.setItem("payAmount",summ);
        //If no item exists in the cart.
        if (list == "<table><tr><th>Producto</th><th>Cantidad</th><th>Precio unitario</th><th>Precio</td></tr>") {
            list += "<tr><td><i>empty</i></td><td><i>empty</i></td><td><i>empty</i></td><td><i>empty</i></td></tr>";
        }else{
            list += "<tr><td><i></i></td><td><i></i></td><td><i>Total</i></td><td><i>" + Math.round(summ * 100) / 100 + "€</i></td></tr>"
        }
        list += "</table>";
        //Bind the data to HTML table.
        //You can use jQuery, too.
        document.getElementById('list').innerHTML = list;
    } else {
        alert('Cannot save shopping list as your browser does not support HTML 5');
    }
}

function SaveItem(name, data) {

    localStorage.setItem(name, data);
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

var curentCollection = '01';
var currentCloth = '01';
//var storeCol = sessionStorage.coleccion;
//var storeClo = sessionStorage.cloth;

function setSellImages(coleccion, cloth){
    console.log("vamos a poner las imagenes a punto");
    localStorage.setItem("Collection", coleccion);   
    localStorage.setItem("Cloth", cloth);
    console.log(localStorage.Cloth);
    storeCol = coleccion;
    storeClo = cloth;
    
}



