function htmlTemplate(responseData) {
    return '<tr id="categoryRow' + responseData.id + '" data-value="' + responseData.id + '">' +
        '<th scope="row">' +
        '<div class="media align-items-center">' +
        '<div class="media-body">' +
        '<span class="name mb-0 text-sm">' + responseData.categoryName + '</span>' +
        '</div></div>' +
        '</th>' +
        '<td><span class="name mb-0 text-sm">'+findCategoryType(responseData.categoryType)+'</span></td>' +
        '<td><button class="btn btn-info btn-lg" onclick="deleteCategory(' + responseData.categoryId + ')">' +
        '<i class="far fa-trash-alt"></i></button></td>' +
        '</tr>';
}

function productCategoriesLoadAdmin() {

    var response=getModel(urlBackend+"categories/getAll").data;
    for (let i=0; i<response.length; i++){
        document.getElementById("categoryList").innerHTML+=htmlTemplate(response[i]);
    }
}

function deleteCategory(id) {
    document.getElementById("categoryRow"+id).remove();
    getModel(urlBackend+"categories/delete/id="+id);
}
var constantCategoryId=1;
function createProductCategory() {
    var categoryName=document.getElementById("inputCategory").value;
    var categoryType=document.getElementById("inputCategoryType").value;

    var requestData={
        "categoryName": categoryName,
        "categoryType": parseInt(categoryType),
        "categoryId":constantCategoryId
    };

    var post=postModel(urlBackend+"categories/save",requestData);
    if (post.data!==null){
        document.getElementById("categoryList").innerHTML+=htmlTemplate(post.data);

        document.getElementById("inputCategory").value="";
        alert("Kategori başarıyla eklendi...");
        constantCategoryId+=1;
    }
    else{
        alert("Aynı isimde kategori mevcut !!! ");
    }

}
function findCategoryType(type) {
    if (type===1){
        return "Mutfak";
    }
    else if (type===2){
        return "Bar";
    }
    return "Nargile";
}
