var lista =  doShowAll();

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
        return list;
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

function sendMail(){
    console.log("info envio")
    //console.log(paypalItems2.forEach(i => ))
    //var array = [... paypalItems2.filter(name => name[0]!= '$' && name != 'Cloth' || 'Collection' || 'payAmount' || '__paypal_storage__')];
    //var stringy = [... array.forEach(i => JSON.stringify(i))]

    var array = []
    var index;
    for (index = 0; index <= localStorage.length-1; index++) {
        key = localStorage.key(index);
        if(key != 'Cloth' && key != 'Collection' && key != 'payAmount' && key != '__paypal_storage__' && key[0] != "$"){
            array.push(key+"\tUnits:"+localStorage.getItem(key) + "\n");
        }
    }             

    console.log(array)
    var string = array.toString(array);
    console.log(string)

    Email.send({
        SecureToken : "c777db29-0be1-40f7-b6ac-937270378585",
        To : 'info@pistachin.shop',
        From : 'info@pistachin.shop',
        Subject : "Nueva compra",
        Body : "<p>Compra de "+ nombrepila +"</p><br>"+lista//"compra de:" + array + " and " +string
    }).then(
      message => alert("Gracias por tu compra. Pronto le llegará la confirmación del pedido a su mail")
    );
    
}

    