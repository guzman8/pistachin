
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


document.getElementById('item1').style.backgroundImage = "url('..//"+curentCollection+"/"+currentCloth+"/01.jpeg')";
document.getElementById('copy1').style.backgroundImage = "url('..//"+curentCollection+"/"+currentCloth+"/01.jpeg')";
document.getElementById('copy2').style.backgroundImage = "url('..//"+curentCollection+"/"+currentCloth+"/01.jpeg')";
document.getElementById('copy3').style.backgroundImage = "url('..//"+curentCollection+"/"+currentCloth+"/01.jpeg')";
document.getElementById('copy4').style.backgroundImage = "url('..//"+curentCollection+"/"+currentCloth+"/01.jpeg')";
document.getElementById('copy5').style.backgroundImage = "url('..//"+curentCollection+"/"+currentCloth+"/01.jpeg')";
console.log(curentCollection, currentCloth, document.getElementById('item1').style.backgroundImage);

function setNextPic(){
    console.log("next pic, here we go")
    currentPic ++;
    var currentPicConvertida = ((currentPic)%5)+1;
    var textPic = "0"+currentPicConvertida
    document.getElementById('item1').style.backgroundImage = "url('..//"+curentCollection+"/"+currentCloth+"/"+textPic+".jpeg')";
}