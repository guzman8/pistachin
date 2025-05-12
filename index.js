/*import  loadScript  from "@paypal/paypal-js";
loadScript({ "client-id": "Ae6_RtNj5FP408yPLC_rU5oS7GDUhDEVeP28akNpOCC_IKhYvtAN4ompZdK-UUx753TGuxyJpXyw9nxs" })
.then((paypal) => {
    // start to use the PayPal JS SDK script
    
})
.catch((err) => {
    console.error("failed to load the PayPal JS SDK script", err);
});*/


const Prices = [["empty"],
                ["empty","10","10","10","10"],
                ["empty","5","10"],
                ["empty","10","10","10","10"],
                ["empty","10","10","10","5"],
                ["empty","10","10","10","10"],
                ["empty","10","10","10","10"],
                ["empty","10","10","10"],
                ["empty","10"],
                ["empty","22.9","24.9"],
                ["empty","24.9","24.9","29.9","19.9"],
                ["empty","22.9","24.9"],
                ["empty","23.9","27.9"],
                ["empty","23.9","27.9","27.9"],
                ["empty","23.9","23.9","27.9","27.9"],
                ["empty","23.9","23.9","27.9","29.9"],
            ];
                
const Cloths = [["empty"],
                ["empty","Ranita bebe","Peto bebe","Vestido","Polera"],//Nube
                ["empty","Pantalón","Vestido"],//Pana
                ["empty","Ranita bebe","Vestido","Camisa","Pelele bebe"],//Cerdanya
                ["empty","Ranita bebe", "Pelele bebe", "Vestido", "Pantalón"],//Menorca
                ["empty","Ranita bebe", "Pelele bebe", "Vestido", "Peto"],//Wild
                ["empty","Ranita bebe", "Pelele bebe", "Vestido", "Peto"],//Sunny
                ["empty","Pelele bebe", "Vestido", "Peto"],//sailor
                ["empty","Jersey animales"],//Bosque
                ["empty","Sudadera solidaria Usher 1B (infantil)","Sudadera solidaria Usher 1B (adulto)"],//colors
                ["empty","Ranita bebe", "Pelele bebe", "Vestido", "Polera"],//Wood
                ["empty","Sudadera (infantil)","Sudadera (adulto)"],//everest
                ["empty","Pelele","Vestido"],//fresh
                ["empty","Pelele bebe", "Vestido", "Peto"],//whales
                ["empty","Ranita bebe", "Pelele bebe", "Vestido", "Peto"],//Jungle
                ["empty","Ranita bebe", "Pelele bebe", "Vestido", "Peto"]];//Formentera


var lista_mail = "";
var list = "";                
var paypalItems = new Array();
var lista =  doShowAll();
var precioEnvio;

try {
    //current_tab();
    console.log("hola")
    var fotos_Coleccion = fotosColeccion();
    document.getElementById('HTMLproductos').innerHTML = fotos_Coleccion;
    localStorage.Cloth = "01";
    
  } catch (error) {
    console.log(error)   
    // Expected output: ReferenceError: nonExistentFunction is not defined
    // (Note: the exact output may be browser-dependent)
}

function current_tab(){
    const nombres_coleccion = document.getElementsByClassName('col_name')
    for (let index = 0; index < nombres_coleccion.length; index++) {
        nombres_coleccion[index].style.color = "rgb(164, 164, 164)"
    }
    console.log(localStorage.Collection)   
    //var fileName = window.location.pathname.split("/").pop();
    if (window.location.pathname.split("/").pop() == "index.html" || window.location.pathname.split("/").pop() == "") {
        //home index.html
    }else if (parseInt(localStorage.Collection)<4 ||parseInt(localStorage.Collection)>7) {    
        if (parseInt(localStorage.Collection)==0) {
            nombres_coleccion[6].style.color = "rgb(0, 0, 0)";
        }else if (parseInt(localStorage.Collection)==-1) {
            nombres_coleccion[7].style.color = "rgb(0, 0, 0)";
        }else if (parseInt(localStorage.Collection)==9) {
            nombres_coleccion[4].style.color = "rgb(0, 0, 0)";
        }else{
            nombres_coleccion[5].style.color = "rgb(0, 0, 0)";
        }
    }else{
        nombres_coleccion[parseInt(localStorage.Collection)-4].style.color = "rgb(0, 0, 0)";
    }
    
}

function fotosColeccion() {
    var html = " "
    console.log("hola", Cloths[parseInt(localStorage.Collection)])
    var precio = parseInt(localStorage.Collection);
    precio =Prices[precio][1]
    console.log(precio)
    for (let indx = 1; indx < Cloths[parseInt(localStorage.Collection)].length; indx++) {
        html += '<div><a href="sell.html" onclick="setSellImages(' + "'" + localStorage.Collection + "','0" + indx + "'" + ')"><img id="collectionImages" src="'+ localStorage.Collection + '/0' + indx +'/02.jpeg" alt=""></a><br>';
        if (parseInt(localStorage.Collection) < 9){//parseInt(localStorage.Collection) < 4
            let old_price = parseInt(parseFloat(Prices[parseInt(localStorage.Collection)][indx])/(0.5));
            html += '<p id="p_old_price"><s>'+ old_price +' €</s></p>';
            html += '<p id="p_new_price" style="color: #c70d0d">'+ Prices[parseInt(localStorage.Collection)][indx] +' €</p><p id="nombre_prenda">'+ Cloths[parseInt(localStorage.Collection)][indx] +'</p></div>';
            //document.getElementById('p_new_price').style.color ="#c70d0d";
        }else{
            html += '<p id="p_new_price"  style="color: black">'+ Prices[parseInt(localStorage.Collection)][indx] +' €</p><p id="nombre_prenda">'+ Cloths[parseInt(localStorage.Collection)][indx] +'</p></div>';
            //document.getElementById('p_new_price').style.color ="black";
        }
        console.log(html)
    }
    return html;
}



var lista =  doShowAll();

var modelo = [
    {
      "name": "patatas", 
      "description": "a granel", 
      "unit_amount": {
        "currency_code": "EUR",
        "value": "1.0"
      },
      "quantity": "1"
    },{
      "name": "zanahorias", /* Shows within upper-right dropdown during payment approval */
      "description": "de color naranja", /* Item details will also be in the completed paypal.com transaction view */
      "unit_amount": {
        "currency_code": "EUR",
        "value": "1.0"
      },
      "quantity": "1"
    },
  ];

  function doShowAll() {
    if (true) {
        var envio = false;
        var key = "";
        var priceKey = "";
        if (typeof paypalItems !== 'undefined' && paypalItems.length > 0) {
            while(paypalItems.length > 0) {
                paypalItems.pop();
            }
        }
        //paypalItems.splice(0,paypalItems.length)
        var summ = 0.0;
        list = "<table><tr><th>Producto</th><th>Cantidad</th><th>Precio unitario</th><th>Precio</td></tr>";
        var i = 0;
        var currentPaypalItem = 0;
        var totalItems = 0;
        //paypalItems.splice(0,paypalItems.length);
        //For a more advanced feature, you can set a cap on max items in the cart.
        for (i = 0; i <= localStorage.length-1; i++) {
            key = localStorage.key(i);
            if(key != 'Cloth' && key != 'Collection' && key != 'payAmount' && key != '__paypal_storage__' && key[0] != "$"){
                          
                priceKey = "$" + key;
                paypalItems.push(new Object({
                    "name": key, 
                    "description": priceKey,
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
                envio = true;
            }
        }
        if (summ>79.9){
            precioEnvio=0;
        }else{
            precioEnvio=4.9;
        }
        if (envio) {
            envio = false;
            /*paypalItems.push(new Object({
                "name": "envio", 
                "description": "envio dentro de la peninsula iberica",
                "unit_amount": {
                  "currency_code": "EUR",
                  "value": "4.9"
                },
                "quantity": "1"
            }));*/
            list += "<tr><td>" + "envio" + "</td><td>" + "1" + "</td><td>" + precioEnvio + "€</td><td>" + precioEnvio + "€</td></tr>";
            //summ += 4.9;
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
            list += "<tr><td><i>vacio</i></td><td><i>0</i></td><td><i>0</i></td><td><i>0</i></td></tr>";
        }else{
            list += "<tr><td><i></i></td><td><i></i></td><td><i>Total</i></td><td><i>" + Math.round((parseFloat(localStorage.payAmount) + precioEnvio) * 100) / 100 + "€</i></td></tr>"
        }
        list += "</table>";
        //Bind the data to HTML table.
        //You can use jQuery, too.
        document.getElementById('list').innerHTML = list;
        //paypalItems2 = [...paypalItems];
        //return paypalItems;
        lista_mail = list;
        return paypalItems
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
    if (visibility === "false"){
        primaryNav.setAttribute("data-visible",true);
        navToggle.setAttribute("aria-expanded", true);
    }else{
        primaryNav.setAttribute("data-visible",false);
        navToggle.setAttribute("aria-expanded",false);
    }
    const visibility2 = primaryNav.getAttribute("data-visible");
});

function setSellImages(coleccion, cloth){
    localStorage.setItem("Collection", coleccion);   
    localStorage.setItem("Cloth", cloth);
    storeCol = coleccion;
    storeClo = cloth;
}

function setCollection(coleccion){
    localStorage.setItem("Collection", coleccion);
    storeCol = coleccion;
}


paypal.Buttons({
    // Sets up the transaction when a payment button is clicked
        
    createOrder: (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                "amount": {
                    "currency_code": "EUR",
                    "value": Math.round((parseFloat(localStorage.payAmount) + precioEnvio) * 100) / 100,
                    "breakdown": {
                        "item_total": {  
                            "currency_code": "EUR",
                            "value": localStorage.payAmount
                        },
                        "shipping": {
                            "currency_code": "EUR",
                            "value": precioEnvio
                        },
                    }
                },
                "items":  lista
            }]
        });
    },
    // Finalize the transaction after payer approval
    onApprove: (data, actions) => {
    return actions.order.capture().then(function(orderData) {
        // Successful capture! For dev/demo purposes:
        const transaction = orderData.purchase_units[0].payments.captures[0];
        //alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
        // When ready to go live, remove the alert and show a success message within this page. For example:
        const element = document.getElementById('paypal-button-container');
        element.innerHTML = '<h3>Thank you for your payment!</h3>';
        // Or go to another URL:  actions.redirect('thank_you.html');
        
        var nombrepila = orderData.payer.name.given_name;
        var direccionCliente = orderData.payer.email_address;

        Email.send({
            SecureToken : "c777db29-0be1-40f7-b6ac-937270378585",
            To : direccionCliente,
            From : 'info@pistachin.shop',
            Subject : "Confirmación de su compra en Pistachin",
            Body : "<p>Hola "+ nombrepila +", aqui tiene los detalles de su compra en Pistachin kids </p><br>" + lista_mail
        }).then(
            message => alert("Gracias "+ nombrepila +" por tu compra. Enseguida gestinonaremos su pedido y le llegará la confirmación del pedido con el numero de seguimiento a su mail una vez procesado (podría demorarse de 1-2 días), por otro lado, cuando le contactemos por mail es posible que el mensaje le llegue a su buzón de correo no deseado, asegurese de comprobar también dicho buzón, si tiene problemas no dude en contactarnos a traves de la pestaña de contacto de esta página web o a través de nuestro correo info@pistachin.shop")
        );
        Email.send({
            SecureToken : "c777db29-0be1-40f7-b6ac-937270378585",
            To : 'info@pistachin.shop',
            From : 'info@pistachin.shop',
            Subject : "Nueva compra",
            Body : "<p>Compra de "+ nombrepila +"</p><br>"+ lista_mail +"<br><br><p>" + JSON.stringify(orderData, null, 2) + "</p>" //"compra de:" + array + " and " +string
        }).then(
            ClearAll()     
        );
    });
    }
}).render('#paypal-button-container');
