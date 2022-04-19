var lastScrollTop = 0;
var mapDescContainer = $("#kenya-maps-description");

$(window).scroll(function (e) {
    var mapContiner = $("#kenya");
    var mapDescContainer = $("#kenya-maps-description");
    var descText = $(".description-text");
    var mapDiv = $("#kenya-maps");
    var mapDivHeight = mapDiv.outerHeight();
    var activeMap = 0;
    var mapChilds = mapDiv.children('div').length;
    var divTop = mapDiv.offset().top - 200;
    var divBottom = divTop + mapDiv.outerHeight();
    var height = $(window).scrollTop();
    if (divTop < height && divBottom > height) {
        var navHeight = $("#mainNav").outerHeight();
        var windowHeight = $(window).height();
        var kenyaMapsHeight = 100 - ((navHeight / windowHeight) * 100);
        /*mapContiner.height(kenyaMapsHeight + "% !important");
        mapContiner.css({
            "height": kenyaMapsHeight + "% !important",
        });*/
        mapDescContainer.removeClass('d-none');
        mapDescContainer.css({
            //"margin-top": "-" + 70 + "%",
            'overflow': 'scroll',
            "height": mapDivHeight + "px",
            "background-color": "#6a6a6a80",
            "opacity": 0.9,
        });
        descText.css({
            "height": mapDivHeight + "px",
        });
    }
    else if (divTop > height) {
        mapDescContainer.addClass('d-none');
    }
    else if (divBottom < height) {
        mapDescContainer.addClass('d-none');
    }
    else {
        mapContiner.height("auto");
    }

});


var position = mapDescContainer.scrollTop();
var desc_id = 1;
mapDescContainer.scroll(function (e) {
    var height = $(this).scrollTop();
    var mapChilds = mapDescContainer.children('div').length;
    //console.log(mapChilds);

    var direction = "scrollDown";
    if (height > position) {
        //console.log('scrollDown');
        direction = "scrollDown";
    }
    else {
        //console.log('scrollUp');
        direction = "scrollUp";
    }
    position = height;

    /*mapChilds.each(function () {
        var mapId = ($(this).data("map"));
        if (isOnScreen($(this))) {
            //console.log(mapId);
            //$("#" + mapId).removeClass("d-none");
        }
        else {
            //$("#" + mapId).addClass("d-none");
        }
    });*/

    //id 1st element is past screen show second to nth
    var desc_item = $("#desc-" + desc_id);

    if (isOnScreen(desc_item) == true) {
        if (direction === "scrollUp") {
            if (desc_id > 1) {
                desc_id = desc_id - 1;
                $('.carousel').carousel("prev");
            }
        }
        else {
            if (desc_id < mapChilds) {
                desc_id = desc_id + 1;
                $('.carousel').carousel("next");
            }

        }
        console.log(desc_id);
        $('.carousel').carousel("pause");
    }

});

function isOnScreen(element) {
    console.log($("#" + element.attr("id") + ':visible').visible(false, true) + " id >" + element.attr("id"));
    return $("#" + element.attr("id") + ':visible').visible(false, true);
    //return elementBottom > viewportTop;//&& elementTop < viewportBottom;
}