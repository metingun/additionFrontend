function htmlTemplate(responseData) {
    return '<tr id="discountTypeRow' + responseData.id + '" data-value="' + responseData.id + '">' +
        '<th scope="row">' +
        '<div class="media align-items-center">' +
        '<div class="media-body">' +
        '<span class="name mb-0 text-sm">'+responseData.discountName+'</span>' +
        '</div></div>' +
        '</th>' +
        '<td class="budget">'+responseData.discountRate+'</td>' +
        '<td><button class="btn btn-info btn-lg" onclick="deleteDiscountType(' + responseData.id + ')">' +
        '<i class="far fa-trash-alt"></i></button></td>' +
        '</tr>';
}
function discountTypesLoadAdmin() {
    const response = getModel(urlBackend+"discountType/getAll").data;
    for (let i=0; i<response.length; i++){
        document.getElementById("discountTypeList").innerHTML+=htmlTemplate(response[i]);
    }

}
function deleteDiscountType(id) {
    document.getElementById("discountTypeRow"+id).remove();
    getModel(urlBackend+"discountType/delete/id="+id);
}

function createDiscountType() {
    var discountName=document.getElementById("inputName").value;
    var discountRate=document.getElementById("inputRate").value;

    var requestData={
        "discountName": discountName,
        "discountRate": parseFloat(discountRate)/100
    };

    var post=postModel(urlBackend+"discountType/save",requestData);
    if (post.data!==null){

        document.getElementById("discountTypeList").innerHTML+=htmlTemplate(post.data);

        document.getElementById("inputName").value="";
        document.getElementById("inputRate").value="";

        alert("İndirim başarıyla eklendi...");
    }
    else{
        alert("Aynı isimde indirim mevcut !!! ");
    }
}
