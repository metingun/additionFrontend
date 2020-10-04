function pageLoad(pageNumber) {
    switch (pageNumber) {
        case "1":
            additionLoad();
            break;

        case "2":
            chefLoad("1");
            loadCancelSale();
            break;

        case "3":
            tablesLoadSecond();
            tablesLoad(document.getElementsByClassName("companyButtons").item(0).getAttribute('id'));
            break;

    }
}

(function ($) {
    "use strict";
    $(document).ready(function () {
        var pageNumber = findAttributeValueById("headerx", "data-value");
        if (sessionControl()[0] === getCookie("token") && sessionControl()[1].indexOf(pageNumber)!==-1) {
            pageLoad(pageNumber);
        } else {

            location.href = urlFrontend;
        }

    });

/*    setInterval(myTimer, 10000);
    function myTimer() {
        if (findAttributeValueById("headery", "data-value")==="1"){
            location.reload();
            setAttributeById("headery", "data-value","0");
        }
    }*/

    // STATISTICS HTML
    var speed = 2000;
    var container = $('.display-animation');
    container.each(function () {
        var elements = $(this).children();
        elements.each(function () {
            var elementOffset = $(this).offset();
            var offset = elementOffset.left * 0.8 + elementOffset.top;
            var delay = parseFloat(offset / speed).toFixed(2);
            $(this).
            css("-webkit-animation-delay", delay + 's').
            css("-o-animation-delay", delay + 's').
            css("animation-delay", delay + 's').
            addClass('animated');
        });
    });

    $(".ripple-effect").click(function (e) {
        var rippler = $(this);

        // create .ink element if it doesn't exist
        if (rippler.find(".ink").length == 0) {
            rippler.append("<span class='ink'></span>");
        }

        var ink = rippler.find(".ink");

        // prevent quick double clicks
        ink.removeClass("animate");

        // set .ink diametr
        if (!ink.height() && !ink.width())
        {
            var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
            ink.css({ height: d, width: d });
        }

        // get click coordinates
        var x = e.pageX - rippler.offset().left - ink.width() / 2;
        var y = e.pageY - rippler.offset().top - ink.height() / 2;

        // set .ink position and add class .animate
        ink.css({
            top: y + 'px',
            left: x + 'px' }).
        addClass("animate");
    });
})(jQuery);
