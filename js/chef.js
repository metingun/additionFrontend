function chefLoadHtmlTemplate(responseData) {
    return '<div class="task-box right-bar">' +
        '<div class="description-task">' +
        '<div class="time">Sipariş Tarihi: ' + responseData.salesDate+'</div>' +
        '<div class="task-name">' + responseData.productName + ' x <b class="colorRed">' + responseData.quantity + '</b> ' +
        '<b class="label1">' + responseData.tableName + '</b></div>' +
        '<button class="btn btn-success members" id="orderss' + responseData.id + '" onclick="removeRow(' + responseData.id + ')">Hazır</button>' +
        '</div>' +
        '</div>';
}

function cancelFooterLoadHtmlTemplate(responseData) {
    return '<div class="task-boxx right-barx">' +
        '<div class="description-task">' +
        '<div class="timex">İptal Tarihi: ' + responseData.cancelSalesDate+'</div>' +
        '<div class="task-namex"><b style="float: left;">' + responseData.productName + ' x </b><b style="float: left;" class="colorYellow">' + responseData.quantity + '</b> ' +
        '<button class="btn btn-success membersx" id="orderss' + responseData.id + '" onclick="removeRowForCancelSale(' + responseData.id + ')">Onayla<br/><b class="label2">'
        + responseData.tableName + '</b></button>' +
        '<p style="float: left;width: 60%;color: yellow;">'+responseData.comment+'</p></div>' +
        '</div>' +
        '</div>';
}

function chefLoadCompletedSalesHtmlTemplate(responseData) {
    return '<div class="task-box right-bar">' +
        '<div class="description-task">' +
        '<div class="time">Sipariş Tarihi: ' + responseData.salesDate+'</div>' +
        '<div class="time">Tamamlanma Tarihi: ' + responseData.salesStartDate+'</div>' +
        '<div class="task-name">' + responseData.productName + ' x <b class="colorRed">' + responseData.quantity + '</b> ' +
        '<b class="label1">' + responseData.tableName + '</b></div>' +
        '</div>' +
        '</div>';
}
function chefLoad(selectValue,categoryType) {
    document.getElementById("rightContent").innerHTML = "";
    if (selectValue === "1") {
        const response = getModel(urlBackend+"sales/getSalesByCompleteOrderAndOrderStatusAndCancelSales/completeOrder=0/orderStatus=1/cancelSales=0/categoryType="+categoryType).data;
        for (let i = 0; i < response.length; i++) {
            document.getElementById("rightContent").innerHTML += chefLoadHtmlTemplate(response[i]);
        }
    }
    else {
        const responseForCompleted=getModel(urlBackend+"sales/getSalesByCompleteOrderAndOrderStatusAndCancelSales/completeOrder=1/orderStatus=1/cancelSales=0/categoryType="+categoryType).data;
        for (let i = 0; i < responseForCompleted.length; i++) {
            document.getElementById("rightContent").innerHTML += chefLoadCompletedSalesHtmlTemplate(responseForCompleted[i]);
        }
    }
}

function loadCancelSale() {
    const response = getModel(urlBackend+"sales/getCancelSales").data;
    if (response.length===0){
        document.getElementById("footer").style.display="none";
    }
    for (let i = 0; i < response.length; i++) {
        document.getElementById("footer").innerHTML += cancelFooterLoadHtmlTemplate(response[i]);
    }
}

function removeRow(orderId) {
    getModel(urlBackend+"sales/setSalesStartDateById/id="+orderId).data;
    $("#orderss" + orderId).parent().parent().hide(400);
/*
    setAttributeById("headery","data-value","1");
*/
    location.reload();
}
function removeRowForCancelSale(orderId) {
    getModel(urlBackend+"sales/cancelSaleCheck/salesId="+orderId).data;
    $("#orderss" + orderId).parent().parent().parent().hide(400);
}
