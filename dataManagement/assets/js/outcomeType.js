function htmlTemplate(responseData) {
    return '<tr id="outcomeTypeRow' + responseData.id + '" data-value="' + responseData.id + '">' +
        '<th scope="row">' +
        '<div class="media align-items-center">' +
        '<div class="media-body">' +
        '<span class="name mb-0 text-sm">'+responseData.outcomeType+'</span>' +
        '</div></div>' +
        '</th>' +
        '<td><button class="btn btn-info btn-lg" onclick="deleteOutcomeType(' + responseData.id + ')">' +
        '<i class="far fa-trash-alt"></i></button></td>' +
        '</tr>';
}
function outcomeTypesLoadAdmin() {
    const response = getModel(urlBackend+"outcomeType/getAll").data;
    for (let i=0; i<response.length; i++){
        document.getElementById("outcomeTypeList").innerHTML+=htmlTemplate(response[i]);
    }

}
function deleteOutcomeType(id) {
    document.getElementById("outcomeTypeRow"+id).remove();
    getModel(urlBackend+"outcomeType/delete/id="+id);
}

function createOutcomeType() {
    var outcomeType=document.getElementById("inputOutcomeType").value;

    var requestData={
        "outcomeType": outcomeType
    };

    var post=postModel(urlBackend+"outcomeType/save",requestData);
    if (post.data!==null){

        document.getElementById("outcomeTypeList").innerHTML+=htmlTemplate(post.data);

        document.getElementById("inputOutcomeType").value="";
        swal("Başarılı!", "Gider türü başarıyla eklendi...", "success");

    }
    else{
        swal("Hata!", "Aynı isimde gider türü mevcut !!", "warning");

    }
}
