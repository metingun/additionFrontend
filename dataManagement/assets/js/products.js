function htmlTemplate(responseData) {
    return '<tr id="productsRow' + responseData.id + '" data-value="' + responseData.id + '">' +
        '<th scope="row">' +
        '<div class="media align-items-center">' +
        '<div class="media-body">' +
        '<span class="name mb-0 text-sm">'+responseData.categoryName+'</span>' +
        '</div></div>' +
        '</th>' +
        '<td class="budget">'+responseData.productNo+'</td>' +
        '<td class="budget">'+responseData.productName.substring(0, 35)+'</td>' +
        '<td class="constantProp">'+responseData.unitPriceForIn+'</td>' +
        '<td class="constantProp">'+responseData.unitPriceForOut+'</td>' +
        '<td><button class="btn btn-info btn-lg" data-target="#productEditModal" data-toggle="modal" onclick="loadProductInfo(' + responseData.id + ')">' +
        '<i class="fas fa-edit"></i></button>' +
        '<button class="btn btn-info btn-lg" onclick="deleteProduct(' + responseData.id + ')">' +
        '<i class="far fa-trash-alt"></i></button></td>' +
        '</tr>';
}
var productIdd=0;
function loadProductInfo(id){
    productIdd=id;
    var response=getModel(urlBackend+"product/getOneById/id="+id).data;
    setValueById("categoryName",response.categoryName);
    setValueById("productName",response.productName);
    setValueById("unitPriceForIn",response.unitPriceForIn);
    setValueById("unitPriceForOut",response.unitPriceForOut);
}
function updateProductData(){
    var response1=getModel(urlBackend+"product/getOneById/id="+productIdd).data;

    var productName=(getValueById("productNameEdit")==="")?response1.productName:getValueById("productNameEdit");
    var unitPriceForIn=(getValueById("unitPriceForInEdit")==="")?response1.unitPriceForIn:getValueById("unitPriceForInEdit");
    var unitPriceForOut=(getValueById("unitPriceForOutEdit")==="")?response1.unitPriceForOut:getValueById("unitPriceForOutEdit");

    var postData={
        "id":productIdd,
        "productName":productName,
        "unitPriceForIn":unitPriceForIn,
        "unitPriceForOut":unitPriceForOut
    }

    var response=postModel(urlBackend+"product/update",postData).data;
    if (response==="200") {
        swal("Başarılı!", "Personel başarıyla güncellendi...", "success");
        loadProductsPage();
    }else{
        swal("Hata!", "İşlem başarısız !!", "warning");
    }
}
function htmlTemplateOptions(responseData) {
    return "<option value='"+responseData.categoryName+"'>"+responseData.categoryName+"</option>"
}

function productsPageAdmin() {
    var response2=getModel(urlBackend+"categories/getAll").data;
    for (let i=0; i<response2.length; i++){
        document.getElementById("inputCategoryName").innerHTML+=htmlTemplateOptions(response2[i]);
    }

    loadProductsPage();

}
function loadProductsPage(){
    document.getElementById("productsList").innerHTML="";
    const response = getModel(urlBackend+"product/getAll").data;
    for (let i=0; i<response.length; i++){
        document.getElementById("productsList").innerHTML+=htmlTemplate(response[i]);
    }
}

function deleteProduct(id) {
    document.getElementById("productsRow"+id).remove();
    getModel(urlBackend+"product/deleteData/"+id);
}

function createProduct() {
    var categoryName=document.getElementById("inputCategoryName").value;
    var productNo=document.getElementById("inputProductNo").value;
    var productName=document.getElementById("inputProductName").value;
    var unitPriceForIn=document.getElementById("inputInPrice").value;
    var unitPriceForOut=document.getElementById("inputOutPrice").value;

    var requestData={
        "categoryName": categoryName,
        "productNo": parseInt(productNo),
        "productName": productName,
        "unitPriceForIn": parseFloat(unitPriceForIn),
        "unitPriceForOut": parseFloat(unitPriceForOut)
    };

    var post=postModel(urlBackend+"product/save",requestData);
    if (post.data!==null) {
        document.getElementById("productsList").innerHTML += htmlTemplate(post.data);

        document.getElementById("inputProductNo").value="";
        document.getElementById("inputProductName").value="";
        document.getElementById("inputInPrice").value="";
        document.getElementById("inputOutPrice").value="";
        swal("Başarılı!", "Ürün başarıyla eklendi...", "success");
    }else{
        swal("Hata!", "Aynı isimde veya NO'da ürün mevcut !!!", "warning");
    }
}
