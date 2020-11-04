function additionHtmlTemplate(responseData) {
    return '<li class="items odd">' +
        '<div class="infoWrap">' +
        '<div class="cartSection" style="width: 65%;">' +
        '<img src="images/gossip1.png" alt="" class="itemImg" />' +
        '<p class="itemNumber">'+responseData.categoryName+'</p>' +
        '<h3>'+responseData.productName+'</h3>' +
        '<p><b> '+responseData.quantity+' x ₺'+responseData.unitPrice+'</b></p></div>' +
        '<div class="prodTotal cartSection">' +
        '<b>₺<p id="xorders'+responseData.id+'" class="totalPrice">'+responseData.totalPrice+'</p></b></div>' +
        '<div class="cartSection removeWrap">' +
        '<a id="orders'+responseData.id+'" class="remove" onclick="displayBlock('+responseData.id+');">x</a>' +
        '</div></div></li>';
}

function additionHtmlTemplatePrint(responseData) {
    return '<li class="items odd">' +
        '<div class="infoWrap">' +
        '<div class="cartSection" style="width: 65%;">' +
        '<img src="images/gossip1.png" alt="" class="itemImg" />' +
        '<p class="itemNumber">'+responseData.categoryName+'</p>' +
        '<h3>'+responseData.productName+'</h3>' +
        '<p><b> '+responseData.quantity+' x ₺'+responseData.unitPrice+'</b></p></div>' +
        '<div class="prodTotal cartSection">' +
        '<b>₺<p id="xorders'+responseData.id+'" class="totalPrice">'+responseData.totalPrice+'</p></b></div>' +
        '</div></li>';
}

function printerHtmlTemplate(responseData) {
    return '<b>'+responseData.productName+'</b>&nbsp;<b>x '+responseData.quantity+'</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>'+responseData.totalPrice.toFixed(2)+'&nbsp;TL</b><br/>';
}
function printerTotalHtmlTemplate(totalPrice) {
    return '<br/><b>&nbsp;Toplam</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        '<b>'+totalPrice.toFixed(2)+'&nbsp;TL&nbsp;&nbsp;&nbsp;</b><br/>--------------------------------------------------';
}
function discountHtmlTemplate(responseData) {
    return '<li class="dissc" id="'+responseData.discountName+'" data-value="'+responseData.discountRate+'">'+responseData.discountName+'</li>';
}

var totalPaymentConstant=0;
function additionLoad() {
    var url=new URL(window.location.href);
    var tableName=url.searchParams.get("tableName");
    document.getElementById("projTitle1").textContent=tableName;
    loadDiscounts();
    var totalPayment=0;
    var requestData={
        "tableName":tableName
    };
    const response=postModel(urlBackend+"addition/getAdditionByTableNameAndActivity",requestData).data;
        for (let i=0; i<response.length; i++){
            document.getElementById("cartWrap1").innerHTML+=additionHtmlTemplate(response[i]);
            document.getElementById("printView").innerHTML+=printerHtmlTemplate(response[i]);
            totalPayment+=response[i].totalPrice;
        }
        totalPaymentConstant=totalPayment;
        document.getElementById("printView").innerHTML+=printerTotalHtmlTemplate(totalPayment);

        document.getElementById("totalPayment").innerHTML=totalPayment.toFixed(2);
}

function additionPrintLoad() {
    var url=new URL(window.location.href);
    var additionId=url.searchParams.get("id");
    var totalPayment=0;
    const response=getModel(urlBackend+"addition/getAdditionDetailById/additionId="+additionId).data;
    document.getElementById("projTitle1").textContent=response[0].tableName;

    for (let i=0; i<response.length; i++){
            document.getElementById("cartWrap1").innerHTML+=additionHtmlTemplatePrint(response[i]);
            document.getElementById("printView").innerHTML+=printerHtmlTemplate(response[i]);
            totalPayment+=response[i].totalPrice;
        }
        document.getElementById("printView").innerHTML+=printerTotalHtmlTemplate(totalPayment);

        document.getElementById("totalPayment").innerHTML=totalPayment.toFixed(2);
}

function loadDiscounts() {
    const response=getModel(urlBackend+"discountType/getAll").data;

    for (let i=0; i<response.length; i++){
        document.getElementById("valueList").innerHTML+=discountHtmlTemplate(response[i]);
    }
}

function applyDiscount() {
    var a=document.getElementsByClassName('chosen-value')[0].value;
    var discountRate=document.getElementById(a);
    var disc=discountRate.getAttribute('data-value');
    document.getElementById("totalPayment").innerHTML=""+(totalPaymentConstant*(1-parseFloat(disc))).toFixed(2);
}

function payBill(cash,credit) {
    var requestData={
        "discountName":document.getElementsByClassName('chosen-value')[0].value,
        "cashPayment":cash,
        "creditCardPayment":credit,
        "tableName":document.getElementById("projTitle1").innerHTML
    };

    postModel(urlBackend+"addition/payBill",requestData);
    printPrinter();
    swal("Başarılı!", "Ödeme başarıyla gerçekleşti !!", "success")
        .then(()=>{
            location.href=urlFrontend+"tables.html"
        });
}

function checkPay() {
    let cashPrice=document.getElementById("creditInput").value;
    let creditPrice=document.getElementById("cashInput").value;
    let newValue=(parseFloat(cashPrice)+parseFloat(creditPrice));
    let totalPayment=document.getElementById('totalPayment').innerHTML;

    if(typePay===2){
        if (parseFloat(newValue.toFixed(2)) !== parseFloat(totalPayment)){
            swal("Hata!", "Toplam ödeme eşleşmiyor !!", "warning");
            return;
        }
        payBill(parseFloat(cashPrice),parseFloat(creditPrice));
    }
    else if (typePay===1){
        payBill(parseFloat(totalPayment),0);
    }
    else {
        payBill(0,parseFloat(totalPayment));
    }
}

function removeRow() {
    var orderId=document.getElementById('cancelSaleButton').getAttribute('data-value').slice(6);
    document.getElementById('cancelSaleModal').style.display = 'none';
   // $("#orders"+orderId).parent().parent().parent().hide(400);
    document.getElementById("xorders"+orderId).className='xxxyyy';
    //calculateTotalPayment();

    var requestData={
        "saleId":parseInt(orderId),
        "comment":document.getElementById("commentInput").value,
        "userNo":1,
        "quantity":document.getElementById("qtyInput").value
    };
    postModel(urlBackend+"sales/cancelSale",requestData);
    location.reload();
}

function displayBlock(id) {
    document.getElementById("cancelSaleModal").style.display = "block";
    document.getElementById('cancelSaleButton').setAttribute('data-value','orders'+id);
    document.getElementById("chosenValue").value="İndirim seçiniz";
}

/*function calculateTotalPayment() {
    var priceList=document.getElementsByClassName("totalPrice");
    var totalPayment=0;
    for (var i=0;i<priceList.length;i++){
        totalPayment+=parseFloat(priceList[i].innerHTML);
    }
    document.getElementById('totalPayment').innerHTML=totalPayment.toFixed(2);
}*/

function calculateTotalCreditCash() {
    var cashPrice=document.getElementById("creditInput").value;
    var creditPrice=document.getElementById("cashInput").value;
    var newValue=parseFloat(cashPrice)+parseFloat(creditPrice);
    document.getElementById('totalCreditCash').innerHTML="("+newValue+" ₺) ";
}

var typePay=2;
function cashCreditDisplay(type) {
    switch (type) {
        // credit ve cash idleri ters
        case 1:
            document.getElementById("creditInput").style.display="none";
            document.getElementById("cashInput").style.display="none";
            document.getElementById("creditTl").style.display="none";
            document.getElementById("cashTl").style.display="none";
            document.getElementById("totalCreditCash").style.display="none";
            typePay=1;
            break;

        case 3:
            document.getElementById("creditInput").style.display="none";
            document.getElementById("cashInput").style.display="none";
            document.getElementById("creditTl").style.display="none";
            document.getElementById("cashTl").style.display="none";
            document.getElementById("totalCreditCash").style.display="none";
            typePay=3;

            break;

        case 2:
            document.getElementById("creditInput").style.display="";
            document.getElementById("cashInput").style.display="";
            document.getElementById("creditTl").style.display="";
            document.getElementById("cashTl").style.display="";
            document.getElementById("totalCreditCash").style.display="";
            typePay=2;

            break;
    }
}


function printPrinter() {
    var divToPrint=document.getElementById('printView').outerHTML;

    var newWin=window.open('','Print-Window');

    newWin.document.write(divToPrint);
    newWin.focus();
    newWin.print();

    //newWin.document.close();
}

