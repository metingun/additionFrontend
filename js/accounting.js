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
