function pageLoad(pageNumber) {
    switch (pageNumber) {
        case "1":
            salesCompanyAdmin();
            break;

        case "2":
            tablesLoadAdmin();
            break;

        case "3":
            productCategoriesLoadAdmin();
            break;

        case "4":
            productsPageAdmin();
            break;

        case "5":
            discountTypesLoadAdmin();
            break;

        case "6":
            personelInfoLoadAdmin();
            break;

        case "7":
            outcomeTypesLoadAdmin();
            break;

    }
}

(function ($) {
    "use strict";

    $(document).ready(function () {
        var pageNumber = findAttributeValueById("header111x", "data-value");
        pageLoad(pageNumber);
        /*        if (sessionControl()===getCookie("token")){
                    var pageNumber=findAttributeValueById("header111x","data-value");
                    pageLoad(pageNumber);
                }
                else{
                    location.href=""+urlAdminFrontend+"/index.html";
                }*/

    });

})(jQuery);
