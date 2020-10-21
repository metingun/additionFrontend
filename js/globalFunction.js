/*
pageNumber
1 -- Home Page
2 -- Collection
3 -- Referance
4 -- About Us
5 -- Certificate
6 -- Production
7 -- Contact
*/
function findAttributeValueById(id,attributeName) {
    return document.getElementById(id).getAttribute(attributeName);
}
function getModel(url) {
    var responseModel = "";
    $.ajax({
        url:url,
        type: 'GET',
        contentType: 'application/json',
        crossDomain: true,
        dataType: 'json',
        async: false,
        success: function (response) {
            responseModel = response;
        }
    });
    return responseModel;
}

function postModel(url, requestData) {
    var responseModel = "";
    $.ajax({
        url:url,
        type: 'POST',
        contentType: 'application/json',
        crossDomain: true,
        dataType: 'json',
        async: false,
        data: JSON.stringify(requestData),
        success: function (response) {
            responseModel = response;
        }
    });
    return responseModel;
}

function setAttributeForBackgroundImg(id,attributeName,attribute) {
    return document.getElementById(id).setAttribute(attributeName,"background-image: url("+attribute+");")
}

function setValueById(id,value) {
    document.getElementById(id).innerHTML=value;
}

function setAttributeById(id,attributeName,attribute) {
    return document.getElementById(id).setAttribute(attributeName,attribute)
}

function getValueById(id) {
    return document.getElementById(id).value;
}
var power100=["1","2","3","4","5"];
var power101=["1","3","4","5"];
var power102=["2"];

function sessionControl() {
    var power=[];
    var username=getCookie("username");
    var password=getCookie("password");

    var requestData={
        "userName": username,
        "password": password
    };
    var post=postModel(urlBackend+"user/login",requestData).data;
    if (post===null){
        location.href="../index.html";
    }
    else{
        if (post.power===100){
            power=power100;
            if (document.getElementById("managerButton")!==null){
                document.getElementById("managerButton").style.display="";
            }
        }
        else if (post.power===101){
            power=power101;
            if (document.getElementById("managerButton")!==null){
                document.getElementById("managerButton").style.display="none";
            }

        }
        else if (post.power===102){
            power=power102;
            if (document.getElementById("managerButton")!==null){
                document.getElementById("managerButton").style.display="none";
            }
        }
        return [post.session,power];
    }
}

function getCookie(cookie) {
    var name = cookie + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
/*var elem = document.documentElement;
function openFullscreen() {
    document.getElementById("fs").style.display="none";
    document.getElementById("efs").style.display="";
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /!* Firefox *!/
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /!* Chrome, Safari & Opera *!/
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /!* IE/Edge *!/
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    document.getElementById("fs").style.display="";
    document.getElementById("efs").style.display="none";
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}*/

