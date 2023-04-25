var lista =  doShowAll();

const Collections = ["empty","Nube", "Pana", "Cerdanya","Bosque","Menorca","Wild","Sunny","Sailor"];
const Prices = [["empty"],["empty","17.5","13.9","20.9","13.9"],["empty","9.9","14.9","14.9"],["empty","14.9","9.9"],["empty","23.9"],["empty","27.9","23.9","27.9","19.9","19.9"],["empty","27.9","27.9","23.9","23.9"],["empty","27.9","27.9","23.9","23.9"],["empty","27.9","27.9","23.9"]];
const Cloths = [["empty"],["empty","Ranita bebe niña","Peto bebe niño","Vestido niña","Polera niño"],["empty","pantalon niño","vestido niña","peto niño"],["empty","vestido niña cuadros","ranita niño cuadros"],["empty","jersei unisex animales"],["empty","vestido bebe niña","ranita bebe niña","vestido niña","pantalon niño","ranita bebe"],["empty","Vestido niña","peto niño","ranita bebe niño","vestido bebe niña"],["empty","peto niño","vestido niña","pelele bebe niño","ranita bebe niña"],["empty","vestido niña","peto niño","pelele bebe"]];


//var storeClo = sessionStorage.cloth;
var currentPic = 50;
var currentCloth = localStorage.Cloth;
var curentCollection = localStorage.Collection;
localStorage.setItem("payAmount", "27");
//console.log("storeCloth is:")
//console.log(storeClo);
console.log("storeCollection is:")
console.log(currentCloth);
console.log("collection es:")
console.log(localStorage.Collection);


document.getElementById('item1').style.backgroundImage = "url('"+curentCollection+"/"+currentCloth+"/02.jpeg')";
//document.getElementById('copy1').style.backgroundImage = "url('"+curentCollection+"/"+currentCloth+"/01.jpeg')";
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



function doShowAll() {
    if (true) {
        var key = "";
        var priceKey = "";
        var paypalItems = [];
        var summ = 0.0;
        var list = "<table><tr><th>Producto</th><th>Cantidad</th><th>Precio unitario</th><th>Precio</td></tr>";
        var i = 0;
        var currentPaypalItem = 0;
        var totalItems = 0;
        //paypalItems.splice(0,paypalItems.length);
        //For a more advanced feature, you can set a cap on max items in the cart.
        for (i = 0; i <= localStorage.length-1; i++) {
            key = localStorage.key(i);
            if(key != 'Cloth' && key != 'Collection' && key != 'payAmount' && key != '__paypal_storage__' && key[0] != "$"){
                          
                priceKey = "$" + key;
                paypalItems.push(Object.create({
                    "name": key, 
                    "description": "ropa de bebes",
                    "unit_amount": {
                      "currency_code": "EUR",
                      "value": localStorage.getItem(priceKey)
                    },
                    "quantity": localStorage.getItem(key)
                }));
                list += "<tr><td>" + key + "</td><td>"
                    + localStorage.getItem(key) + "</td><td>" + localStorage.getItem(priceKey) + "€</td><td>" + Math.round(parseFloat(localStorage.getItem(priceKey))*parseFloat(localStorage.getItem(key))* 100) / 100 + "€</td></tr>";
                summ += parseFloat(localStorage.getItem(priceKey))*parseFloat(localStorage.getItem(key));
                currentPaypalItem++;
                totalItems += parseInt(localStorage.getItem(key));
            }
        }
        document.getElementById('lblCartCount').innerHTML = totalItems;
        if(totalItems==0){
            document.getElementById('lblCartCount').style.display ="none";
        }else{
            document.getElementById('lblCartCount').style.display ="block";
        }
        summ = Math.round(summ * 100) / 100
        localStorage.setItem("payAmount",summ);
        //If no item exists in the cart.
        if (list == "<table><tr><th>Producto</th><th>Cantidad</th><th>Precio unitario</th><th>Precio</td></tr>") {
            list += "<tr><td><i>empty</i></td><td><i>empty</i></td><td><i>empty</i></td><td><i>empty</i></td></tr>";
        }else{
            list += "<tr><td><i></i></td><td><i></i></td><td><i>Total</i></td><td><i>" + localStorage.payAmount + "€</i></td></tr>"
        }
        list += "</table>";
        //Bind the data to HTML table.
        //You can use jQuery, too.
        document.getElementById('list').innerHTML = list;
        //paypalItems2 = [...paypalItems];
        return list;
    } else {
        alert('Cannot save shopping list as your browser does not support HTML 5');
    }
}

function SaveItem() {
    var newData
    
    var itemSizeSelector = document.getElementById("itemSize");
    var itemSize = itemSizeSelector.value;
    var name = Cloths[parseInt(curentCollection)][parseInt(currentCloth)] + " (coleccion: " + Collections[parseInt(curentCollection)] + ")" + " - " +itemSize;
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
    var cashname = "$"+name;
    localStorage.setItem(cashname,Prices[parseInt(curentCollection)][parseInt(currentCloth)]);
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

function setCollection(coleccion){
    localStorage.setItem("Collection", coleccion);
    storeCol = coleccion;
}

document.getElementById('htmlConjunto').innerHTML = Cloths[parseInt(curentCollection)][parseInt(currentCloth)];
document.getElementById('htmlColeccion').innerHTML = "Colección " + Collections[parseInt(curentCollection)]
document.getElementById('htmlPrecio').innerHTML = Prices[parseInt(curentCollection)][parseInt(currentCloth)] + " €";

paypal.Buttons({
    // Sets up the transaction when a payment button is clicked
    createOrder: (data, actions) => {
    return actions.order.create({
        purchase_units: [{
            amount: {
               value: localStorage.payAmount
             }
        }]
    });
    },
    // Finalize the transaction after payer approval
    onApprove: (data, actions) => {
    return actions.order.capture().then(function(orderData) {
        // Successful capture! For dev/demo purposes:
        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
        const transaction = orderData.purchase_units[0].payments.captures[0];
        //alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
        // When ready to go live, remove the alert and show a success message within this page. For example:
        const element = document.getElementById('paypal-button-container');
        element.innerHTML = '<h3>Thank you for your payment!</h3>';
        // Or go to another URL:  actions.redirect('thank_you.html');
        
        var nombrepila = orderData.payer.name.given_name;
        var direccionCliente = orderData.payer.email_address;

        console.log("direccion cliente: "+direccionCliente);
        Email.send({
            SecureToken : "c777db29-0be1-40f7-b6ac-937270378585",
            To : direccionCliente,
            From : 'info@pistachin.shop',
            Subject : "Confirmación de su compra en Pistachin",
            Body : "<p>Compra de "+ nombrepila +"</p><br>"+lista
        }).then(
            message => alert("Gracias "+ nombrepila +" por tu compra. Pronto le llegará la confirmación del pedido a su mail, por favor revise tambien su buzon de correo no deseado, si tiene problemas no dude en contactarnos a traves de la pestaña de contacto en esta página web o por nuestro correo info@pistachin.shop")
        );
        Email.send({
            SecureToken : "c777db29-0be1-40f7-b6ac-937270378585",
            To : 'info@pistachin.shop',
            From : 'info@pistachin.shop',
            Subject : "Nueva compra",
            Body : "<p>Compra de "+ nombrepila +"</p><br>"+lista+"<br><p>" + JSON.stringify(orderData, null, 2) + "</p>" //"compra de:" + array + " and " +string
        }).then(
          console.log("purchase completed")
        );
        ClearAll();
    });
    }
}).render('#paypal-button-container');


// base URL will need to change for production applications



