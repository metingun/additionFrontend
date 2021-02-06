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
        '<td>' +
        '<button class="btn btn-info btn-lg" data-target="#personalEditModal" data-toggle="modal" onclick="loadPersonalInfo('+responseData.id+')">' +
        '<i class="fas fa-edit"></i></button>' +
        '<button class="btn btn-info btn-lg" onclick="deletePersonel(' + responseData.id + ')">' +
        '<i class="far fa-trash-alt"></i></button>' +
        '</td>' +
        '</tr>';
}
var personalId=0;
function loadPersonalInfo(id){
    personalId=id;
    var response=getModel(urlBackend+"personel/getOneById/id="+id).data;
    setValueById("personalName",response.name);
    setValueById("personalJob",response.job);
    setValueById("personalSalary",response.salary);
    setValueById("personalPhone",response.phoneNumber);
}
function updatePersonalData(){
    var response1=getModel(urlBackend+"personel/getOneById/id="+personalId).data;

    var personalName=(getValueById("personalNameEdit")==="")?response1.name:getValueById("personalNameEdit");
    var personalJob=(getValueById("personalJobEdit")==="")?response1.job:getValueById("personalJobEdit");
    var personalSalary=(getValueById("personalSalaryEdit")==="")?response1.salary:getValueById("personalSalaryEdit");
    var personalPhone=(getValueById("personalPhoneEdit")==="")?response1.phoneNumber:getValueById("personalPhoneEdit");

    var postData={
        "id":personalId,
        "name":personalName,
        "job":personalJob,
        "salary":personalSalary,
        "phoneNumber":personalPhone
    }
    var response=postModel(urlBackend+"personel/update",postData).data;
    if (response==="200") {
        swal("Başarılı!", "Personel başarıyla güncellendi...", "success");
        personelInfoLoadAdmin();
    }else{
        swal("Hata!", "İşlem başarısız !!", "warning");
    }
}
function personelInfoLoadAdmin() {
    document.getElementById("personelList").innerHTML="";
    const response = getModel(urlBackend+"personel/getAll").data;
    for (let i=0; i<response.length; i++){
        document.getElementById("personelList").innerHTML+=htmlTemplate(response[i]);
    }
}

function deletePersonel(id) {
    document.getElementById("personelRow"+id).remove();
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
