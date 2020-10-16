function htmlTemplate(responseData) {
    return '<tr id="tablesRow' + responseData.id + '" data-value="' + responseData.id + '">' +
        '<th scope="row">' +
        '<div class="media align-items-center">' +
        '<div class="media-body">' +
        '<span class="name mb-0 text-sm">' + responseData.tableName + '</span>' +
        '</div></div>' +
        '</th>' +
        '<td class="budget">' + responseData.tableType + '</td>' +
        '<td><button class="btn btn-info btn-lg" onclick="deleteCollection(' + responseData.id + ')">' +
        '<i class="far fa-trash-alt"></i></button></td>' +
        '</tr>';
}

function htmlTemplateOptions(responseData) {
    return "<option value='"+responseData.id+"'>"+responseData.companyName+"</option>"
}
function tablesLoadAdmin() {
    var response2=getModel(urlBackend+"company/getAll").data;
    for (let i=0; i<response2.length; i++){
        document.getElementById("inputCompany").innerHTML+=htmlTemplateOptions(response2[i]);
    }

    const response = getModel(urlBackend+"tables/getAll").data;
    for (let i=0; i<response.length; i++){
        document.getElementById("tablesList").innerHTML+=htmlTemplate(response[i]);
    }
}

function deleteCollection(id) {
    document.getElementById("tablesRow"+id).remove();
    getModel(urlBackend+"tables/delete/id="+id);
}

function createCollection() {
    var inputTable=document.getElementById("inputTable").value;
    var inputCompany=document.getElementById("inputCompany").value;

    var requestData={
        "tableName": inputTable
    };

    var post=postModel(urlBackend+"tables/save/companyId="+parseInt(inputCompany),requestData);
    if (post.code===200){
        document.getElementById("tablesList").innerHTML+=htmlTemplate(post.data);

        document.getElementById("inputTable").value="";
        alert("Birim başarıyla eklendi...");
    }
    else{
        alert("Aynı isimde birim mevcut !!! ");
    }

}
