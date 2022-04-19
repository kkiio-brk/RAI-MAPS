var lastScrollTop = 0;
var mapDescContainer = $(".map-description");
//nav bar height
var navHeight = $("#mainNav").outerHeight();
//window height
var windowHeight = $(window).height();
var mapContinerHeight = 100 - ((navHeight / windowHeight) * 100);
//map container class height
var mapContiner = $(".maps-container");
mapContiner.height(windowHeight - navHeight);



var position = mapDescContainer.scrollTop();
var desc_id = 1;
mapDescContainer.scroll(function (e) {
    var target = e.target.closest;
    //console.log(target);
    var height = $(this).scrollTop();
    var mapChilds = $(this).children('div').length;
    var courosel = $(this).parent().children('div')[0];//.children().children();
    courosel = $("#" + courosel.getAttribute("id"));
    //console.log(courosel);

    var direction = "scrollDown";
    if (height > position) {
        direction = "scrollDown";
    }
    else {
        direction = "scrollUp";
    }
    position = height;

    //id 1st element is past screen show second to nth use active class to keep track of scroll

    var activeItem = $(this).children('div .active');
    var itemsArray = $(this).children('div');
    //console.log(Array.from(activeItem));
    var couroselPosition = Array.from(itemsArray).indexOf(Array.from(activeItem)[0]);


    //var desc_item = $("#desc-" + desc_id);
    console.log(couroselPosition + " == " + mapChilds);
    if (couroselPosition != -1 && couroselPosition < mapChilds) {
        var desc_item = itemsArray[couroselPosition];
        if (isOnScreen(desc_item, direction) == "next") {
            if (couroselPosition < mapChilds) {
                var newActive = itemsArray[couroselPosition + 1];
                var oldActive = itemsArray[couroselPosition];
                moveActiveDesc(newActive, oldActive);
                console.log(courosel);
                //desc_id = desc_id + 1;
                courosel.carousel("next");
                //$('.rai-components').carousel("next");
            }
            //console.log(desc_id);
            courosel.carousel("pause");
        }
        if (isOnScreen(desc_item, direction) == "prev") {
            if (couroselPosition > 0) {
                var newActive = itemsArray[couroselPosition - 1];
                var oldActive = itemsArray[couroselPosition];
                moveActiveDesc(newActive, oldActive);
                console.log(courosel);
                //desc_id = desc_id - 1;
                courosel.carousel("prev");
            }
            //console.log(desc_id);
            courosel.carousel("pause");
        }
    }

});

function isOnScreen(element, direction) {
    //console.log($("#" + element.attr("id") + ':visible').visible(false, true) + " id >" + element.attr("id"));
    //return $("#" + element.attr("id") + ':visible').visible(false, true);
    //console.log(element);
    var viewportTop = mapDescContainer.offset().top - 0;
    var viewportBottom = viewportTop + mapDescContainer.outerHeight();
    var elementTop = $(element).offset().top - 10;
    var elementBottom = elementTop + $(element).outerHeight();
    //console.log(viewportTop + "=> VT, " + viewportBottom + "=> VB, " + elementTop + "=>ElT, " + elementBottom + "=>ELB");

    if (direction === "scrollUp") {
        if (elementTop >= viewportTop) {
            return "prev";
        }
    }
    else {
        if (elementBottom <= viewportTop) {
            return "next";
        };
    }
}

function moveActiveDesc(newActive, oldActive) {
    console.log(newActive);
    oldActive.classList.remove('active');
    newActive.classList.add('active');
}