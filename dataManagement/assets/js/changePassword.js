function changePassword() {
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    var newPassword=document.getElementById("newPassword").value;
    var newPasswordAgain=document.getElementById("newPasswordAgain").value;

    var requestData={
        "userName": username,
        "password": password,
        "newPassword":newPassword,
        "newPasswordAgain":newPasswordAgain
    };

    if (newPassword===newPasswordAgain){
        if (postModel(urlBackend+"user/changePassword",requestData).data===null){
            swal("Hata!", "Kullanıcı Adı Veya Şifre Hatalı!", "warning");
        }
        else{
            swal("Başarılı!", "Şifre Değişikliği Başarılı!", "success");
        }
    }
    else {
        swal("Hata!", "Yeni Şifre ve Tekrarı Uyuşmuyor!", "warning");
    }

}
