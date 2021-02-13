function setSaleByRayonValues() {
    var startDate = document.getElementById("startDate").value + " 08:00";
    var finishDate = document.getElementById("finishDate").value + " 08:00";
    const response = getModel(urlBackend + "sales/getSaleByRayon/startDate=" + startDate + "/finishDate=" + finishDate).data;

    if (response !== null) {
        document.getElementById("kitchen").innerText = response.kitchen;
        document.getElementById("bar").innerText = response.bar;
        document.getElementById("nargile").innerText = response.nargile;
        document.getElementById("kitchenQty").innerText = response.kitchenQty;
        document.getElementById("barQty").innerText = response.barQty;
        document.getElementById("nargileQty").innerText = response.nargileQty;
    } else {
        swal("Hata!", "Hata oluştu. Tarih değerlerini kontrol ediniz.", "warning");
    }
}

function setDailyIncomeValues() {
    var startDate = document.getElementById("startDate").value + " 08:00";
    var finishDate = document.getElementById("finishDate").value + " 08:00";
    const response = getModel(urlBackend + "addition/getAdditionTotalByDate/startDate=" + startDate + "/finishDate=" + finishDate).data;

    if (response !== null) {
        document.getElementById("dailyIncome").innerText = response.dailyIncome;
        document.getElementById("cashIncome").innerText = response.cashIncome;
        document.getElementById("creditCardIncome").innerText = response.creditCardIncome;
        document.getElementById("totalExpense").innerText = response.totalExpense;
        document.getElementById("safeTotal").innerText = response.safeTotal;
        document.getElementById("totalProfit").innerText = response.totalProfit;
    } else {
        swal("Hata!", "Hata oluştu. Tarih değerlerini kontrol ediniz !!", "warning");
    }
}

function setDailyOutcomeValues() {
    var startDate = document.getElementById("startDate").value + " 08:00";
    var finishDate = document.getElementById("finishDate").value + " 08:00";
    const response = getModel(urlBackend + "cashOutflow/getTotalsByOutcomeType/startDate=" + startDate + "/finishDate=" + finishDate).data;

    if (response !== null) {
        document.getElementById("totalOutcome").innerText = response.totalOutcome;
        document.getElementById("totalPersonalOutcome").innerText = response.totalPersonalOutcome;
        var outcomeEntries = Object.entries(response.outcomeTypes);
        document.getElementById("outcomeTotalValues").innerHTML = "";
        for (var i = 0; i < outcomeEntries.length; i++) {
            document.getElementById("outcomeTotalValues").innerHTML += outcomeValuesHtmlTemplate(outcomeEntries[i])
        }
    } else {
        swal("Hata!", "Hata oluştu. Tarih değerlerini kontrol ediniz.", "warning");
    }
}

function outcomeValuesHtmlTemplate(responseData) {
    return '<div class="col-md-12 valueIncome">' +
        '<div class="generic_content clearfix">' +
        '<div class="generic_head_price clearfix">' +
        '<div class="generic_head_content clearfix">' +
        '<div class="head_bg"></div>' +
        '<div class="head"><span>' + responseData[0] + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="generic_price_tag clearfix">' +
        '<span class="price">' +
        '<span class="currency">' + responseData[1] + '</span>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function saleCompanyHtmlTemplate(responseData) {
    return '<div onclick="clickCompany(' + responseData.companyId + ')" class="col-md-12 valueIncome">' +
        '<div class="generic_content clearfix">' +
        '<div class="generic_head_price clearfix">' +
        '<div class="generic_head_content clearfix">' +
        '<div class="head_bg"></div>' +
        '<div class="head"><span>' + responseData.companyName + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="generic_price_tag clearfix">' +
        '<span class="price">' +
        '<span class="currency">' + responseData.totalSales + '</span>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function setSalesByCompany() {
    var startDate = document.getElementById("startDate").value + " 08:00";
    var finishDate = document.getElementById("finishDate").value + " 08:00";
    const response = getModel(urlBackend + "sales/getSalesTotalByCompany/startDate=" + startDate + "/finishDate=" + finishDate).data;

    if (response !== null) {
        document.getElementById("companySaleTotalValues").innerHTML = "";
        for (var i = 0; i < response.length; i++) {
            document.getElementById("companySaleTotalValues").innerHTML += saleCompanyHtmlTemplate(response[i])
        }
        setAttributeById("valIncome", "ng-click", "loadSalesCompanyData()")
    } else {
        swal("Hata!", "Hata oluştu. Tarih değerlerini kontrol ediniz.", "warning");
    }
}

function setPersonalValues() {
    var startDate = document.getElementById("startDate").value + " 08:00";
    var finishDate = document.getElementById("finishDate").value + " 08:00";
    const response = getModel(urlBackend + "personel/getPersonalPayInfo/startDate=" + startDate + "/finishDate=" + finishDate).data;

    if (response !== null) {
        document.getElementById("personalValues").innerHTML = "";
        for (var i = 0; i < response.length; i++) {
            document.getElementById("personalValues").innerHTML += personalValuesHtmlTemplate(response[i])
        }
        setAttributeById("valIncome", "ng-click", "loadPersonalData()")
    } else {
        swal("Hata!", "Hata oluştu. Tarih değerlerini kontrol ediniz !!", "warning");

    }
}

var userId;

function clickPersonal(responseId) {
    userId = responseId;
    topFunction();

    document.getElementById("personalDetailButton").style.display = "";
    document.getElementById("personalDetailButton").innerText = "Seçilen Kişinin Verilerini Görüntülemek İçin Tıklayın";
    document.getElementById("containerOutcomeTable").style.display = "none";

}

var companyId;

function clickCompany(response) {
    companyId = response;
    topFunction();

    document.getElementById("companySalesDetailButton").style.display = "";
    document.getElementById("companySalesDetailButton").innerText = "Seçilen Müşterinin Verilerini Görüntülemek İçin Tıklayın";
    document.getElementById("containerSaleCompanyTable").style.display = "none";

}

function personalValuesHtmlTemplate(responseData) {
    return '<div onclick="clickPersonal(' + responseData.personalId + ');" class="col-md-12 valueIncome">' +
        '<div class="generic_content clearfix">' +
        '<div class="generic_head_price clearfix">' +
        '<div class="generic_head_content clearfix">' +
        '<div class="head_bg"></div>' +
        '<div class="head"><span>' + responseData.personalName + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="generic_price_tag clearfix">' +
        '<span class="price">Maaş:&nbsp;' +
        '<span class="currency">' + responseData.personalSalary + '</span>' +
        '</span>' +
        '<span class="price">Alacak:&nbsp;' +
        '<span class="currency">' + responseData.remainingMoney + '</span>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function editAdditionComplete(deleteOrEdit) {
    var additionId = 0;
    var requestData;
    var total = parseFloat(document.getElementById('cashEdit').value) + parseFloat(document.getElementById('creditEdit').value);
    if (deleteOrEdit === 0) {//edit
        if (total === parseFloat(document.getElementById('totalPmt').innerText)) {
            additionId = document.getElementById('editAdditionButton').getAttribute('data-value').slice(9);
            requestData = {
                "id": parseInt(additionId),
                "cashPayment": document.getElementById("cashEdit").value,
                "creditCardPayment": document.getElementById("creditEdit").value,
                "activity": 0
            };
            document.getElementById('editAdditionModal').style.display = 'none';
        } else {
            swal("Hata!", "Toplam Ödeme, Eskisiyle Aynı Değil !!", "warning");
        }
    } else {//delete
        additionId = document.getElementById('yesButton').getAttribute('data-value').slice(10);
        requestData = {
            "id": parseInt(additionId),
            "cashPayment": 0,
            "creditCardPayment": 0,
            "activity": -1
        };
        document.getElementById('yesNoModal').style.display = 'none';
    }


    postModel(urlBackend + "addition/update", requestData);
    document.getElementById('vallInc').click();

}
function topFunction() {
    document.body.scrollTop = 300;
    document.documentElement.scrollTop = 300;
}
function editOutcomeComplete(deleteOrEdit) {
    var total = 0;
    var cashflowId;
    if (deleteOrEdit === 0) { //edit
        total = parseFloat(document.getElementById('cashEdit').value);
        cashflowId = document.getElementById('editOutcomeButton').getAttribute('data-value').slice(9);
        document.getElementById('editOutcomeModal').style.display = 'none';
    } else { //delete
        cashflowId = document.getElementById('yesButton').getAttribute('data-value').slice(8);
        document.getElementById('yesNoModal').style.display = 'none';
    }

    var requestData = {
        "id": parseInt(cashflowId),
        "price": total
    };
    postModel(urlBackend + "cashOutflow/update", requestData);
    document.getElementById('vallInc').click();
}

function checkDisplayTable(id, display) {
    var a = document.getElementById(id);
    if (a !== null) {
        a.style.display = display;
    }
}

(function () {

    var sortTable = angular.module('sortTable', []);
    sortTable.controller('mainCtrl', function ($scope, $http) {

        $scope.datepicker = function () {
            $('.dateselect').datepicker({
                format: 'dd.mm.yyyy',
                weekStart:1,
                language: 'tr'
            });
        };
        $scope.datepickerTr = function () {
            $.fn.datepicker.dates['tr'] = {
                days: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
                daysShort: ["Pz", "Pzt", "Sal", "Çrş", "Prş", "Cu", "Cts", "Pz"],
                daysMin: ["Pz", "Pzt", "Sa", "Çr", "Pr", "Cu", "Ct", "Pz"],
                months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
                monthsShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"]
            };
        };
        $scope.datepickerTr();
        $scope.datepicker();
        $scope.loadCashAddition = function () {
            topFunction();
            checkDisplayTable("preloader","");

            var startDate = document.getElementById("startDate").value + " 08:00";
            var finishDate = document.getElementById("finishDate").value + " 08:00";
            $http.get(urlBackend + "addition/getAdditionsByDateAndPaymentType/startDate=" + startDate + "/finishDate=" + finishDate + "/paymentType=1")
                .then(function (response) {
                    $scope.datas = response.data.data;
                    checkDisplayTable("preloader","none");
                });

            checkDisplayTable("containerAdditionTable", "none");
            checkDisplayTable("containerCashTable", "");
            checkDisplayTable("containerCreditTable", "none");
            checkDisplayTable("containerOutcomeTable", "none");
        };
        $scope.loadAllAddition = function () {
            topFunction();
            checkDisplayTable("preloader","");

            var startDate = document.getElementById("startDate").value + " 08:00";
            var finishDate = document.getElementById("finishDate").value + " 08:00";
            $http.get(urlBackend + "addition/getAdditionsByDateAndPaymentType/startDate=" + startDate + "/finishDate=" + finishDate + "/paymentType=0")
                .then(function (response) {
                    $scope.datas = response.data.data;
                    checkDisplayTable("preloader","none");
                });

            checkDisplayTable("containerAdditionTable", "");
            checkDisplayTable("containerCashTable", "none");
            checkDisplayTable("containerCreditTable", "none");
            checkDisplayTable("containerOutcomeTable", "none");
        };
        $scope.loadCreditAddition = function () {
            topFunction();
            checkDisplayTable("preloader","");

            var startDate = document.getElementById("startDate").value + " 08:00";
            var finishDate = document.getElementById("finishDate").value + " 08:00";
            $http.get(urlBackend + "addition/getAdditionsByDateAndPaymentType/startDate=" + startDate + "/finishDate=" + finishDate + "/paymentType=2")
                .then(function (response) {
                    $scope.datas = response.data.data;
                    checkDisplayTable("preloader","none");
                });

            checkDisplayTable("containerAdditionTable", "none");
            checkDisplayTable("containerCashTable", "none");
            checkDisplayTable("containerCreditTable", "");
            checkDisplayTable("containerOutcomeTable", "none");
        };
        $scope.loadOutcomeAddition = function () {
            topFunction();
            checkDisplayTable("preloader","");

            var startDate = document.getElementById("startDate").value + " 08:00";
            var finishDate = document.getElementById("finishDate").value + " 08:00";
            $http.get(urlBackend + "cashOutflow/getAllByDate/startDate=" + startDate + "/finishDate=" + finishDate)
                .then(function (response) {
                    $scope.datas = response.data.data;
                    checkDisplayTable("preloader","none");
                });

            checkDisplayTable("containerAdditionTable", "none");
            checkDisplayTable("containerCashTable", "none");
            checkDisplayTable("containerCreditTable", "none");
            checkDisplayTable("containerOutcomeTable", "");
        };
        $scope.loadOutcome = function () {
            topFunction();
            checkDisplayTable("preloader","");

            var startDate = document.getElementById("startDate").value + " 08:00";
            var finishDate = document.getElementById("finishDate").value + " 08:00";
            $http.get(urlBackend + "cashOutflow/getTotalPersonalByDate/startDate=" + startDate + "/finishDate=" + finishDate)
                .then(function (response) {
                    $scope.datas = response.data.data;
                    checkDisplayTable("preloader","none");
                });

            checkDisplayTable("containerOutcomeTable","");
        };
        $scope.loadPersonalData = function () {
            topFunction();
            checkDisplayTable("preloader","");

            var startDate = document.getElementById("startDate").value + " 08:00";
            var finishDate = document.getElementById("finishDate").value + " 08:00";
            $http.get(urlBackend + "cashOutflow/getCashflowByDateAndPersonelId/startDate=" + startDate + "/finishDate=" + finishDate + "/personelId=" + userId)
                .then(function (response) {
                    $scope.datas = response.data.data;
                    checkDisplayTable("preloader","none");
                });

            checkDisplayTable("containerOutcomeTable","");
        };
        $scope.loadSaleListByRayon = function (categoryType) {
            topFunction();
            checkDisplayTable("preloader","");
            var startDate = document.getElementById("startDate").value + " 08:00";
            var finishDate = document.getElementById("finishDate").value + " 08:00";
            $http.get(urlBackend + "sales/getSaleListByRayon/startDate=" + startDate + "/finishDate=" + finishDate + "/categoryType=" + categoryType)
                .then(function (response) {
                    $scope.datas = response.data.data;
                    checkDisplayTable("preloader","none");
                });
            checkDisplayTable("containerAdditionTable","");
        };
        $scope.loadFavouriteProductList = function (sortType) {
            topFunction();
            checkDisplayTable("preloader","");
            var startDate = document.getElementById("startDate").value + " 08:00";
            var finishDate = document.getElementById("finishDate").value + " 08:00";
            $http.get(urlBackend + "sales/favouriteProductsListByDate/sortType=" + sortType+"/startDate="+startDate+"/finishDate="+finishDate)
                .then(function (response) {
                    $scope.datas = response.data.data;
                    checkDisplayTable("preloader","none");
                });

            checkDisplayTable("containerAdditionTable","");
        };
        $scope.loadEditAdditionModal = function (id) {

            $http.get(urlBackend + "addition/getAdditionById/id=" + id)
                .then(function (response) {
                    var resp = response.data.data;
                    setValueById("pmtDate", resp.additionFinishDate);
                    setValueById("tableNameEdit", resp.tableName);
                    setValueById("cashPmt", resp.cashPayment);
                    setValueById("creditPmt", resp.creditCardPayment);
                    setValueById("totalPmt", resp.discountedPayment);
                });

            document.getElementById("editAdditionModal").style.display = "block";
            document.getElementById('editAdditionButton').setAttribute('data-value', 'additionx' + id);

        };
        $scope.loadEditOutcomeModal = function (id) {

            $http.get(urlBackend + "cashOutflow/getCashOutflowById/id=" + id)
                .then(function (response) {
                    var resp = response.data.data;
                    setValueById("pmtDate", resp.date);
                    setValueById("personelEdit", resp.personelName);
                    setValueById("cashType", resp.type);
                    setValueById("totalPmt", resp.price);
                });

            document.getElementById("editOutcomeModal").style.display = "block";
            document.getElementById('editOutcomeButton').setAttribute('data-value', 'outcomeex' + id);

        };

        $scope.loadDeleteOutcomeModal = function (id) {
            document.getElementById("yesNoModal").style.display = "block";
            document.getElementById('yesButton').setAttribute('data-value', 'outcomex' + id);
        };

        $scope.loadDeleteAdditionModal = function (id) {
            document.getElementById("yesNoModal").style.display = "block";
            document.getElementById('yesButton').setAttribute('data-value', 'additionxx' + id);
        };
        $scope.loadSalesCompanyData = function () {
            topFunction();
            checkDisplayTable("preloader","");

            var startDate = document.getElementById("startDate").value + " 08:00";
            var finishDate = document.getElementById("finishDate").value + " 08:00";
            $http.get(urlBackend + "sales/getSalesDetailByCompany/startDate=" + startDate + "/finishDate=" + finishDate + "/companyId=" + companyId)
                .then(function (response) {
                    $scope.datas = response.data.data;
                    checkDisplayTable("preloader","none");

                });

            checkDisplayTable("containerSaleCompanyTable","");

        };
    });

})();
