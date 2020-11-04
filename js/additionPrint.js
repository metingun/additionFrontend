
function checkDisplayTable(id, display) {
    var a = document.getElementById(id);
    if (a !== null) {
        a.style.display = display;
    }
}

(function () {
    /*
        datepickerTr();
    */

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
        $scope.loadAllAddition = function () {
            checkDisplayTable("preloader","");

            var startDate = document.getElementById("startDate").value + " 08:00";
            var finishDate = " 08:00";
            $http.get(urlBackend + "addition/getAdditionsByDateAndPaymentType/startDate=" + startDate + "/finishDate=" + finishDate + "/paymentType=0")
                .then(function (response) {
                    $scope.datas = response.data.data;
                    checkDisplayTable("preloader","none");

                });
            checkDisplayTable("containerAdditionTable", "");
        };
        $scope.loadAdditionPageByTableName = function (id) {
            location.href=urlFrontend+"additionPrint.html?id="+id;
        };

    });

})();
