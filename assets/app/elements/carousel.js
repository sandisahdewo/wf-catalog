"use strict";
$(function() {
    var isRtl = $("html").attr("dir") === "rtl";
    var navIcons = {
        prev: "fa fa-angle-".concat(isRtl ? "right" : "left"),
        next: "fa fa-angle-".concat(isRtl ? "left" : "right")
    };
    $("#slick-1").slick({
        rtl: isRtl
    });
    $("#slick-2").slick({
        rtl: isRtl,
        slidesToShow: 3,
        slidesToScroll: 2
    });
    $("#slick-3").slick({
        rtl: isRtl,
        centerMode: true,
        prevArrow: '\n      <button type="button" class="btn btn-flat-primary slick-prev-2">\n        <i class="'.concat(navIcons.prev, '"></i>\n      </button>\n    '),
        nextArrow: '\n      <button type="button" class="btn btn-flat-primary slick-next-2">\n        <i class="'.concat(navIcons.next, '"></i>\n      </button>\n    ')
    });
    $("#slick-4").slick({
        rtl: isRtl,
        prevArrow: '\n      <button type="button" class="btn btn-flat-primary slick-prev-3">\n        <i class="'.concat(navIcons.prev, '"></i>\n      </button>\n    '),
        nextArrow: '\n      <button type="button" class="btn btn-flat-primary slick-next-3">\n        <i class="'.concat(navIcons.next, '"></i>\n      </button>\n    ')
    });
    $("#slick-5").slick({
        rtl: isRtl,
        autoplay: true,
        autoplaySpeed: 1e3,
        slidesToShow: 2
    });
    $("#slick-6").slick({
        rtl: isRtl,
        dots: true
    });
    $("#slick-7-for").slick({
        rtl: isRtl,
        arrows: false,
        asNavFor: "#slick-7-nav"
    });
    $("#slick-7-nav").slick({
        rtl: isRtl,
        centerMode: true,
        slidesToShow: 3,
        asNavFor: "#slick-7-for",
        focusOnSelect: true,
        prevArrow: '\n      <button type="button" class="btn btn-flat-primary slick-prev-2">\n        <i class="'.concat(navIcons.prev, '"></i>\n      </button>\n    '),
        nextArrow: '\n      <button type="button" class="btn btn-flat-primary slick-next-2">\n        <i class="'.concat(navIcons.next, '"></i>\n      </button>\n    ')
    });

    $(document).find('.carousel.carousel-product').slick();
});