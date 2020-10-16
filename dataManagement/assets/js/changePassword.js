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
            alert("Kullanıcı Adı Veya Şifre Hatalı");
        }
        else{
            alert("Şifre Değişikliği Başarılı");
        }
    }
    else {
        alert("Yeni Şifre ve Tekrarı Uyuşmuyor")
    }

}
