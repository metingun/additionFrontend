function htmlTemplate(responseData) {
    return '<li data-esn="TRUE"><a class="btn btn-default tables" ' +
        'href="addition.html?tableName=' + responseData.tableName + '">' + responseData.tableName + '<br/><b>' + responseData.payment.toFixed(2) + ' ₺</b></a>' +
        '<button onclick="menuLoad(' + responseData.menuType + ',' + responseData.id + ')" class="' + tableStatus(responseData) + ' salesButton" ' +
        'data-target="#menuModal" data-toggle="modal"' +
        '>Sipariş Gir' +
        '</button>' +
        '</li>';
}

function salesLoadHtmlTemplate(responseData) {
    return '<li data-esn="TRUE"><a class="btn btn-default tablesx" ' +
        'href="addition.html?tableName=' + responseData.tableName + '">' + splitStringGetIndex(0,responseData) +
        '<p style="color: yellow;">'+splitStringGetIndex(1,responseData)+'</p><br/><b style="font-size: 150%">' + responseData.payment.toFixed(2) + ' ₺</b></a>' +
        '<button onclick="menuLoad(' + responseData.menuType + ',' + responseData.id + ')" class="' + tableStatus(responseData) + ' salesButton" ' +
        'data-target="#menuModal" data-toggle="modal"' +
        '>Sipariş Gir' +
        '</button>' +
        '</li>';
}

function salesLoadHtmlTemplate2() {
    return '<li data-esn="TRUE"><a class="btn btn-default tablesx">SİPARİŞ<br/>EKLE</a>' +
        '<button onclick="menuLoad2(1)" data-target="#menuModal" data-toggle="modal" class="btn btn-primary salesButton">Yeni Sipariş Ekle</button>' +
        '</li>';
}

function salesLoad() {
    document.getElementById("route-button-grid").innerHTML = "";

    document.getElementById("route-button-grid").innerHTML += salesLoadHtmlTemplate2();

    const response = getModel(urlBackend+"tables/getAllByMenuType/menuType=1").data;
    for (let i = 0; i < response.length; i++) {
        document.getElementById("route-button-grid").innerHTML += salesLoadHtmlTemplate(response[i]);
    }
}

function htmlTemplateOutCompany(responseData) {
    return '<button class="'+salesStatus(responseData.id)+' navbar-toggle2 companyButtons" id="'+responseData.id+'" onclick="tablesLoad('+responseData.id+');">' +
        responseData.companyName +
        '</button>';
}

function htmlTemplateOutCompany2() {
    return '<button class="btn btn-primary navbar-toggle2 companyButtons" id="outTables" onclick="salesLoad();">' +
        'Dış Siparişler</button>';
}

function tablesLoadSecond() {
    const response2 = getModel(urlBackend+"company/getAll").data;
    document.getElementById("navHead").innerHTML = "";
    for (let i = 0; i < response2.length; i++) {
        document.getElementById("navHead").innerHTML += htmlTemplateOutCompany(response2[i]);
    }
    document.getElementById("navHead").innerHTML += htmlTemplateOutCompany2();

}

function tablesLoad(companyId) {
    const response = getModel(urlBackend+"tables/getAllDataByCompanyId/companyId="+parseInt(companyId)).data;

    document.getElementById("route-button-grid").innerHTML = "";
    for (let i = 0; i < response.length; i++) {
        document.getElementById("route-button-grid").innerHTML += htmlTemplate(response[i]);
    }
}

function salesStatus(responseData) {
    if (getModel(urlBackend+"company/getCompanySaleStatusByCompanyId/id=" + responseData).data=== 1) {
        return "btn btn-warning";
    }
    else {
        return "btn btn-dark";
    }
}

function tableStatus(responseData) {
    if (getModel(urlBackend+"sales/getSalesByCompleteOrderAndOrderStatusAndCancelSalesAndTableName/completeOrder=1/orderStatus=1/cancelSales=0/tableName=" + responseData.tableName).data.length !== 0) {
        return "btn btn-warning";
    }
    if (responseData.payment === 0) {
        return "btn btn-success";
    } else if (responseData.payment !== 0) {
        return "btn btn-danger";
    }
}

function modalCompleteHtmlTemplate(responseData) {
    return '<li class="items odd">' +
        '<div class="infoWrap">' +
        '<div class="cartSection" style="width: 65%;">' +
        '<img alt="" class="itemImg" src="images/gossip1.png"/>' +
        '<p class="itemNumber">' + responseData.categoryName + '</p>' +
        '<h3>' + responseData.productName + ' x <b class="quantityOrder">' + responseData.quantity + '</b></h3>' +
        '<p class="stockStatus">' + responseData.tableName + '</p>' +
        '</div>' +
        '<div class="cartSection removeWrap">' +
        '<button class="btn btn-success removeWr" ' +
        'id="order' + responseData.id + '" onclick="removeRow(' + responseData.id + ');">Masada</button>' +
        '</div>' +
        '</div>' +
        '</li>';
}

function modalLoad() {
    const response = getModel(urlBackend+"sales/getSalesByCompleteOrderAndOrderStatusAndCancelSales/completeOrder=1/orderStatus=1/cancelSales=0").data;

    document.getElementById("cartWrap").innerHTML = "";
    for (let i = 0; i < response.length; i++) {
        document.getElementById("cartWrap").innerHTML += modalCompleteHtmlTemplate(response[i]);
    }
}
function personelHtmlTemplate(responseData) {
    return '<option value="'+responseData.id+'">'+responseData.name+'</option>';
}

function outputHtmlTemplate1() {
    return '<option value="0">Personel Ödemeleri</option>';
}

function outputHtmlTemplate(responseData) {
    return '<option value="'+responseData.id+'">'+responseData.outcomeType+'</option>';
}

function outputModalLoad() {
    const response = getModel(urlBackend+"personel/getAll").data;
    const response1 = getModel(urlBackend+"outcomeType/getAll").data;
    document.getElementById("outputType").innerHTML = "";
    document.getElementById("personals").innerHTML = "";

    document.getElementById("outputType").innerHTML += outputHtmlTemplate1();
    for (let i = 0; i < response.length; i++) {
        document.getElementById("personals").innerHTML += personelHtmlTemplate(response[i]);
    }
    for (let i = 0; i < response1.length; i++) {
        document.getElementById("outputType").innerHTML += outputHtmlTemplate(response1[i]);
    }
}

function sendMoneyOutput() {
    var outputType=document.getElementById("outputType").value;
    var comment=document.getElementById("commentX").value;
    var price=document.getElementById("priceX").value;
    var personelName=document.getElementById("personals").innerText;
    if (outputType!=="0"){
        personelName="";
    }

    var requestData={
        "typeId": outputType,
        "personelName":personelName,
        "comment":comment,
        "price":parseFloat(price)
    };

    postModel(urlBackend+"cashOutflow/save",requestData);
    alert("Kasa çıkışı yapıldı.");
    location.href=urlFrontend+"tables.html";
}

function menuLoad2(menuType) {
    document.getElementById("salesHeaderOut").style.display="";
    const response = getModel(urlBackend+"categories/getAll").data;
    document.getElementById("myTab").innerHTML = "";
    document.getElementById("myTabContent").innerHTML = "";
    for (let i = 0; i < response.length; i++) {
        document.getElementById("myTab").innerHTML += menuLoadTemplateHtmlFirst(response[i], i);
        document.getElementById("myTabContent").innerHTML += menuLoadTemplateSecond(response[i], i);
    }
    menuLoadSecond(menuType);
}

function menuLoad(menuType, tableId) {
    document.getElementById("salesHeaderOut").style.display="none";
    const tableName = getModel(urlBackend+"tables/getTableNameById/id=" + tableId).data;
    setValueById("completeOrderBtn", tableName);
    const response = getModel(urlBackend+"categories/getAll").data;
    document.getElementById("myTab").innerHTML = "";
    document.getElementById("myTabContent").innerHTML = "";
    for (let i = 0; i < response.length; i++) {
        document.getElementById("myTab").innerHTML += menuLoadTemplateHtmlFirst(response[i], i);
        document.getElementById("myTabContent").innerHTML += menuLoadTemplateSecond(response[i], i);
    }
    menuLoadSecond(menuType);
}

function menuLoadSecond(menuType) {
    const response = getModel(urlBackend+"product/getAllByMenuType/menuType=" + menuType).data;

    for (let i = 0; i < response.length; i++) {
        document.getElementById("category" + response[i].categoryId).innerHTML += menuLoadTemplateThird(response[i], menuType);
    }
}

function menuLoadTemplateHtmlFirst(responseData, i) {
    return '<li class="' + activity(i) + '">' +
        '<a data-toggle="tab" href="#category' + responseData.categoryId + '">' + responseData.categoryName + '</a>' +
        '</li>';
}

function menuLoadTemplateSecond(responseData, i) {
    return '<div class="tab-pane fade in ' + activity(i) + '" id="category' + responseData.categoryId + '"></div>';
}

function menuLoadTemplateThird(responseData, menuType) {
    return '<div class="food-range-section">' +
        '<div class="fruits-flavour-section">' +
        '<img class="fruits-img" src="images/gossip1.png"' +
        'style="width: 60px;border-radius: 100%;border: solid;">' +
        '<h1 class="flavour-heading"><b class="foodNum">' + responseData.productNo + '' +
        '</b> ' + responseData.productName + '</h1><br>' +
        '<div class="skin-1"><div class="num-in">' +
        '<span class="minus dis" onclick="down(' + responseData.productNo + ');"></span>' +
        '<input class="in-num" id="myNumber' + responseData.productNo + '" readonly="" type="text" value="0">' +
        '<span class="plus" onclick="up(' + responseData.productNo + ');"></span>' +
        '</div></div>' +
        '<div class="price-bar"><span>₺' + findPriceByMenuType(responseData, menuType) + '</span></div>' +
        '</div></div>';
}


var cartList = [];

function completedSales() {
    var param=0;
    var cart = cartList.filter(onlyUnique);
    var requestDataList = [];
    var tableName = document.getElementById("completeOrderBtn").textContent;

    if (tableName===""){
        param=1;
        tableName=document.getElementById("address").value+"||"+document.getElementById("addressDetail").value;
    }

    for (var i = 0; i < cart.length; i++) {
        var quantity = parseInt(document.getElementById("myNumber" + cart[i]).value);
        if (quantity !== 0) {
            var request = {
                "productNo": cart[i],
                "quantity": quantity,
                "tableName": tableName,
                "userNo": 1
            };
            requestDataList.push(request);
        }
    }
    if (param===1){
        var requestData={
            "tableName": tableName
        };
        postModel(urlBackend+"tables/save/companyId=-1",requestData);
    }
    postModel(urlBackend+"sales/save", requestDataList);
    cartList = [];
    location.reload();
}

function findPriceByMenuType(responseData, menuType) {
    if (menuType === 0) {
        return responseData.unitPriceForIn;
    }
    return responseData.unitPriceForOut;
}

function activity(i) {
    if (i === 0) {
        return "active";
    }
    return "";
}

function removeRow(orderId) {
    getModel(urlBackend+"sales/setSalesFinishDateById/id=" + orderId).data;

    $("#order" + orderId).parent().parent().parent().hide(400);
}


function up(productNo) {
    cartList.push(productNo);
    var id = "myNumber" + productNo;
    document.getElementById(id).value = parseInt(document.getElementById(id).value) + 1;

}

function down(productNo) {
    var id = "myNumber" + productNo;
    document.getElementById(id).value = parseInt(document.getElementById(id).value) - 1;
    if (document.getElementById(id).value <= 0) {
        document.getElementById(id).value = 0;
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function splitStringGetIndex(index,str) {
    return str.tableName.split('||')[index];
}

function logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.href=urlFrontend;
}
