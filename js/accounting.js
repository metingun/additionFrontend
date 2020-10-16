function setDailyIncomeValues() {
    var startDate=document.getElementById("startDate").value+" 08:00";
    var finishDate=document.getElementById("finishDate").value+" 08:00";
    const response=getModel(urlBackend+"addition/getAdditionTotalByDate/startDate="+startDate+"/finishDate="+finishDate).data;

    if (response!==null){
        document.getElementById("dailyIncome").innerText=response.dailyIncome;
        document.getElementById("cashIncome").innerText=response.cashIncome;
        document.getElementById("creditCardIncome").innerText=response.creditCardIncome;
        document.getElementById("totalExpense").innerText=response.totalExpense;
        document.getElementById("safeTotal").innerText=response.safeTotal;
        document.getElementById("totalProfit").innerText=response.totalProfit;
    }
    else{
        alert("Hata oluştu. Tarih değerlerini kontrol ediniz.")
    }
}

function setDailyOutcomeValues() {
    var startDate=document.getElementById("startDate").value+" 08:00";
    var finishDate=document.getElementById("finishDate").value+" 08:00";
    const response=getModel(urlBackend+"cashOutflow/getTotalsByOutcomeType/startDate="+startDate+"/finishDate="+finishDate).data;

    if (response!==null){
        document.getElementById("totalOutcome").innerText=response.totalOutcome;
        document.getElementById("totalPersonalOutcome").innerText=response.totalPersonalOutcome;
        var outcomeEntries=Object.entries(response.outcomeTypes);
        document.getElementById("outcomeTotalValues").innerHTML="";
        for (var i=0;i<outcomeEntries.length;i++){
            document.getElementById("outcomeTotalValues").innerHTML+=outcomeValuesHtmlTemplate(outcomeEntries[i])
        }
    }
    else{
        alert("Hata oluştu. Tarih değerlerini kontrol ediniz.")
    }
}

function outcomeValuesHtmlTemplate(responseData) {
    return '<div class="col-md-12 valueIncome">' +
        '<div class="generic_content clearfix">' +
        '<div class="generic_head_price clearfix">' +
        '<div class="generic_head_content clearfix">' +
        '<div class="head_bg"></div>' +
        '<div class="head"><span>'+responseData[0]+'</span>' +
        '</div>' +
        '</div>' +
        '<div class="generic_price_tag clearfix">' +
        '<span class="price">' +
        '<span class="currency">'+responseData[1]+'</span>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function setPersonalValues() {
    var startDate=document.getElementById("startDate").value+" 08:00";
    var finishDate=document.getElementById("finishDate").value+" 08:00";
    const response=getModel(urlBackend+"personel/getPersonalPayInfo/startDate="+startDate+"/finishDate="+finishDate).data;

    if (response!==null){
        document.getElementById("personalValues").innerHTML="";
        for (var i=0;i<response.length;i++){
            document.getElementById("personalValues").innerHTML+=personalValuesHtmlTemplate(response[i])
        }
        setAttributeById("valIncome","ng-click","loadPersonalData()")
    }
    else{
        alert("Hata oluştu. Tarih değerlerini kontrol ediniz.")
    }
}

var userId;
function clickPersonal(responseId) {
    userId=responseId;
    document.getElementById("personalDetailButton").style.display="";
    document.getElementById("personalDetailButton").innerText="Seçilen Kişinin Verilerini Görüntülemek İçin Tıklayın";
    document.getElementById("containerOutcomeTable").style.display="none";

}

function personalValuesHtmlTemplate(responseData) {
    return '<div onclick="clickPersonal('+responseData.personalId+');" class="col-md-12 valueIncome">' +
        '<div class="generic_content clearfix">' +
        '<div class="generic_head_price clearfix">' +
        '<div class="generic_head_content clearfix">' +
        '<div class="head_bg"></div>' +
        '<div class="head"><span>'+responseData.personalName+'</span>' +
        '</div>' +
        '</div>' +
        '<div class="generic_price_tag clearfix">' +
        '<span class="price">Maaş:&nbsp;' +
        '<span class="currency">'+responseData.personalSalary+'</span>' +
        '</span>' +
        '<span class="price">Alacak:&nbsp;' +
        '<span class="currency">'+responseData.remainingMoney+'</span>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}

(function () {
    var sortTable = angular.module('sortTable', []);
    sortTable.controller('mainCtrl', function($scope,$http) {

        $scope.loadCashAddition=function () {
            var startDate=document.getElementById("startDate").value+" 08:00";
            var finishDate=document.getElementById("finishDate").value+" 08:00";
            $http.get(urlBackend+"addition/getAdditionsByDateAndPaymentType/startDate="+startDate+"/finishDate="+finishDate+"/paymentType=1")
                .then(function (response) {$scope.datas = response.data.data;});
            document.getElementById("containerAdditionTable").style.display="";
            document.getElementById("containerOutcomeTable").style.display="none";
        };
        $scope.loadAllAddition=function () {
            var startDate=document.getElementById("startDate").value+" 08:00";
            var finishDate=document.getElementById("finishDate").value+" 08:00";
            $http.get(urlBackend+"addition/getAdditionsByDateAndPaymentType/startDate="+startDate+"/finishDate="+finishDate+"/paymentType=0")
                .then(function (response) {$scope.datas = response.data.data;});
            document.getElementById("containerAdditionTable").style.display="";
            document.getElementById("containerOutcomeTable").style.display="none";
        };
        $scope.loadCreditAddition=function () {
            var startDate=document.getElementById("startDate").value+" 08:00";
            var finishDate=document.getElementById("finishDate").value+" 08:00";
            $http.get(urlBackend+"addition/getAdditionsByDateAndPaymentType/startDate="+startDate+"/finishDate="+finishDate+"/paymentType=2")
                .then(function (response) {$scope.datas = response.data.data;});
            document.getElementById("containerAdditionTable").style.display="";
            document.getElementById("containerOutcomeTable").style.display="none";
        };
        $scope.loadOutcomeAddition=function () {
            var startDate=document.getElementById("startDate").value+" 08:00";
            var finishDate=document.getElementById("finishDate").value+" 08:00";
            $http.get(urlBackend+"cashOutflow/getAllByDate/startDate="+startDate+"/finishDate="+finishDate)
                .then(function (response) {$scope.datas = response.data.data;});
            document.getElementById("containerAdditionTable").style.display="none";
            document.getElementById("containerOutcomeTable").style.display="";
        };
        $scope.loadOutcome=function () {
            var startDate=document.getElementById("startDate").value+" 08:00";
            var finishDate=document.getElementById("finishDate").value+" 08:00";
            $http.get(urlBackend+"cashOutflow/getTotalPersonalByDate/startDate="+startDate+"/finishDate="+finishDate)
                .then(function (response) {$scope.datas = response.data.data;});
            document.getElementById("containerOutcomeTable").style.display="";
        };
        $scope.loadPersonalData=function () {
            var startDate=document.getElementById("startDate").value+" 08:00";
            var finishDate=document.getElementById("finishDate").value+" 08:00";
            $http.get(urlBackend+"cashOutflow/getCashflowByDateAndPersonelId/startDate="+startDate+"/finishDate="+finishDate+"/personelId="+userId)
                .then(function (response) {$scope.datas = response.data.data;});
            document.getElementById("containerOutcomeTable").style.display="";
        }
    });

/*
    datepickerTr();
*/

})();
