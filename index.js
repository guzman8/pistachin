// Dynamically populate the table with shopping list items.
//Step below can be done via PHP and AJAX, too.


//paypalItem.name = "hello"
/*paypalItems.push(paypalItem);
console.log("name:")
console.log(paypalItems[0].name);*/


const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);

var nestedArray = doShowAll();
var paypalItems2 = clone(nestedArray)
console.log(paypalItems2);

var modelo = [
    {
      "name": "patatas", 
      "description": "a granel", 
      "unit_amount": {
        "currency_code": "EUR",
        "value": "22.4"
      },
      "quantity": "1"
    },{
      "name": "zanahorias", /* Shows within upper-right dropdown during payment approval */
      "description": "de color naranja", /* Item details will also be in the completed paypal.com transaction view */
      "unit_amount": {
        "currency_code": "EUR",
        "value": "22.4"
      },
      "quantity": "1"
    },
  ];

function doShowAll() {
    if (true) {
        var key = "";
        var priceKey = "";
        var paypalItems = [];
        var summ = 0.0;
        var list = "<table><tr><th>Producto</th><th>Cantidad</th><th>Precio unitario</th><th>Precio</td></tr>";
        var i = 0;
        var currentPaypalItem = 0;
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
            }
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
        return paypalItems;
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

console.log("paypalItems:")
console.log(paypalItems2);
console.log("modelo");
console.log(modelo);   
console.log(localStorage.length)
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
        // const element = document.getElementById('paypal-button-container');
        // element.innerHTML = '<h3>Thank you for your payment!</h3>';
        // Or go to another URL:  actions.redirect('thank_you.html');
        // smtp key C5FEA0A5E534075FF88375640DCC0238D526
        // b192c01d-b0bf-45f8-b7f7-0c1033acb11d
        // ecdfd223-f1c1-43ea-85de-f36c9fcf657e
        // new pass 0E1DD7A5AB1C3C0F249E7CA6ADCAFEA58367
        // new token 714d85ba-28e2-422f-8ad2-935ec9e77ff4
        // test card 4005519200000004
        let messageBody = JSON.stringify(paypalItems2)+JSON.stringify(orderData, null, 2);
        console.log(messageBody)
        var nombrepila = orderData.payer.name.given_name;
        var direccionCliente = orderData.payer.email_address;

        Email.send({
            SecureToken : "60b0f47a-3c6d-47a3-b2dc-97e48f6481b4",
            To : direccionCliente,
            From : 'guzmangalofre@gmail.com',
            Subject : "Confirmación de compra en pistachin",
            Body : "Hola" + nombrepila + ", tu compra en Pistachin.shop se ha confirmado, enseguida que hayamos procesado el pago te contactaremos con la información de seguimiento del envío"
        }).then(
          message => alert("Gracias "+ nombrepila +" por tu compra. Pronto le llegará la confirmación del pedido a su mail")
        );
        Email.send({
            SecureToken : "60b0f47a-3c6d-47a3-b2dc-97e48f6481b4",
            To : 'info@psicologiabcn.org',
            From : 'guzmangalofre@gmail.com',
            Subject : "Nueva compra de: "+nombrepila,
            Body : "compra de:" + paypalItems2.filter(name => name[0]!= '$' && name != 'Cloth' || 'Collection' || 'payAmount' || '__paypal_storage__')
        }).then(
          message => alert("Gracias "+ nombrepila +" por tu compra. Pronto le llegará la confirmación del pedido a su mail")
        );
    });
    }
}).render('#paypal-button-container');

function sendMail(){
    Email.send({
        SecureToken : "714d85ba-28e2-422f-8ad2-935ec9e77ff4",
        To : 'info@pistachin.shop',
        From : 'info@pistachin.shop',
        Subject : "Nueva compra",
        Body : "compra de:" + paypalItems2.filter(name => name[0]!= '$' && name != 'Cloth' || 'Collection' || 'payAmount' || '__paypal_storage__')
    }).then(
      message => alert("Gracias por tu compra. Pronto le llegará la confirmación del pedido a su mail")
    );
}
    