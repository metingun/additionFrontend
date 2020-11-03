function htmlTemplate(responseData) {
    return '<tr id="salesCompanyRow' + responseData.id + '" data-value="' + responseData.id + '">' +
        '<th scope="row">' +
        '<div class="media align-items-center">' +
        '<div class="media-body">' +
        '<span class="name mb-0 text-sm">' + responseData.companyName + '</span>' +
        '</div></div>' +
        '</th>' +
        '<td class="budget">' + findMenuType(responseData.menuType) + '</td>' +
        '<td><button class="btn btn-info btn-lg" onclick="deleteSalesCompany(' + responseData.id + ')">' +
        '<i class="far fa-trash-alt"></i></button></td>' +
        '</tr>';
}

function salesCompanyAdmin() {

    var response=getModel(urlBackend+"company/getAll").data;
    for (let i=0; i<response.length; i++){
        document.getElementById("salesCompanyList").innerHTML+=htmlTemplate(response[i]);
    }
}

function deleteSalesCompany(id) {
    document.getElementById("salesCompanyRow"+id).remove();
    getModel(urlBackend+"company/delete/id="+id);
}

function createSalesCompany() {
    var companyName=document.getElementById("companyName").value;
    var menuType=document.getElementById("menuType").value;

    var requestData={
        "companyName": companyName,
        "menuType": menuType
    };

    var post=postModel(urlBackend+"company/save",requestData);
    if (post.data!==null){
        document.getElementById("salesCompanyList").innerHTML+=htmlTemplate(post.data);

        document.getElementById("companyName").value="";
        swal("Başarılı!", "Firma başarıyla eklendi...", "success");

    }
    else{
        swal("Hata!", "Aynı isimde firma mevcut !!", "warning");
    }

}

function findMenuType(type) {
    if (type===0){
        return "İç";
    }
    return "Dış";
}
