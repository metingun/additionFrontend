function login() {
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;

    var requestData={
        "userName": username,
        "password": password
    };
    var post=postModel(urlBackend+"user/login",requestData).data;
    if (post===null){
        swal("Hata!", "Kullanıcı Adı Veya Şifre Hatalı !!", "warning");

    }
    else{
        document.cookie = "username="+post.userName+"; path=/; max-age="+60*60*60*2+";";
        document.cookie = "password="+post.password+"; path=/; max-age="+60*60*60*2+";";
        switch (post.power) {
            case 100:
                location.href = urlFrontend+"statistics.html";
                break;

            case 101:
                location.href = urlFrontend+"tables.html";
                break;

            case 102:
                location.href = urlFrontend+"chef.html";
                break;

            default:
                location.href = urlFrontend+"index.html";
                break;
        }

        document.cookie = "token="+post.session+"; path=/; max-age="+60*60*60*2+";";
    }
}
