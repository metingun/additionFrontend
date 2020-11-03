function htmlTemplate(responseData) {
    return '<tr id="personelRow' + responseData.id + '" data-value="' + responseData.id + '">' +
        '<th scope="row">' +
        '<div class="media align-items-center">' +
        '<div class="media-body">' +
        '<span class="name mb-0 text-sm">'+responseData.name+'</span>' +
        '</div></div>' +
        '</th>' +
        '<td class="budget">'+responseData.job+'</td>' +
        '<td class="budget">'+responseData.salary+'</td>' +
        '<td class="constantProp">'+responseData.phoneNumber+'</td>' +
        '<td><button class="btn btn-info btn-lg" onclick="deletePersonel(' + responseData.id + ')">' +
        '<i class="far fa-trash-alt"></i></button></td>' +
        '</tr>';
}


function personelInfoLoadAdmin() {

    const response = getModel(urlBackend+"personel/getAll").data;
    for (let i=0; i<response.length; i++){
        document.getElementById("personelList").innerHTML+=htmlTemplate(response[i]);
    }
}

function deletePersonel(id) {   document.getElementById("personelRow"+id).remove();
    getModel(urlBackend+"personel/delete/id="+id);
}

function createPersonel() {
    var name=document.getElementById("inputName").value;
    var job=document.getElementById("inputJob").value;
    var salary=document.getElementById("inputSalary").value;
    var phoneNumber=document.getElementById("inputPhoneNumber").value;

    var requestData={
        "name": name,
        "job": job,
        "salary": parseFloat(salary),
        "phoneNumber": phoneNumber
    };

    var post=postModel(urlBackend+"personel/save",requestData);
    if (post.data!==null) {
        document.getElementById("personelList").innerHTML += htmlTemplate(post.data);

        document.getElementById("inputName").value="";
        document.getElementById("inputJob").value="";
        document.getElementById("inputSalary").value="";
        document.getElementById("inputPhoneNumber").value="";
        swal("Başarılı!", "Personel başarıyla eklendi...", "success");

    }else{
        swal("Hata!", "Aynı isimde veya NO'da personel mevcut !!", "warning");

    }
}
