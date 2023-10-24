$(function () {
    
    "use strict";
    
    var win = $(window),
        htmlBody = $("html, body"),
        scrollToTop = $(".scroll-top"),
        progressCheck = false,
        factsCheck = false,
        langSelector = $("#lang-selector");
        
    $('.preloader').delay(200).fadeOut(700, function () {
        $(this).remove();
    });
    
    $(".control-bar .menu-toggle").on("click", function () {
        $(this).toggleClass("active");
        $(".slide-menu").toggleClass("active");
    });
    
    $(".slide-menu .menu-list li a").on("click", function (e) {
        e.preventDefault();
        htmlBody.animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 600);
    });
    
    $("section").each(function () {
        if (win.scrollTop() >= $(this).offset().top - 1) {
            $(".slide-menu .menu-list li a[href='#" + $(this).attr("id") + "']").addClass("active").parent().siblings().find("a").removeClass("active");
        }
    });

    win.on("scroll", function () {
        $("section").each(function () {
            if (win.scrollTop() >= $(this).offset().top - 1) {
                $(".slide-menu .menu-list li a[href='#" + $(this).attr("id") + "']").addClass("active").parent().siblings().find("a").removeClass("active");
            }
        });
    });
    
    function skillsPogress() {
        $('.chart').easyPieChart({
            size: 140,
            barColor: '#dca52e',
            trackColor: '#313131',
            scaleColor: false,
            lineWidth: 2,
            scaleLength: 4,
            lineCap: 'circle',
            animate: {
                duration: 2000,
                enabled: true
            }
        });
    }
    
    if (!progressCheck && $(this).scrollTop() >= $(".skills").offset().top - 300) {
        skillsPogress();
        progressCheck = true;
    }
    
    win.on("scroll", function () {
        
        if (!progressCheck && $(this).scrollTop() >= $(".skills").offset().top - 300) {
            skillsPogress();
            progressCheck = true;
        }
        
    });
    
    $("#control li").on('click', function () {
        $(this).addClass('active').siblings("li").removeClass('active');
    });

    /*
    $('#filtr-container').filterizr({
        animationDuration: 0.4
    });
    
    if ($('.portfolio-content .item')[0]) {
        $('.portfolio-content .item').magnificPopup({
            delegate: '.icon-img',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }
    */
    
    if (!factsCheck && $(this).scrollTop() >= $(".facts").offset().top - 400) {
        $(".facts .fact-number").countTo();
        factsCheck = true;
    }
    
    win.on("scroll", function () {
        if (!factsCheck && $(this).scrollTop() >= $(".facts").offset().top - 400) {
            $(".facts .fact-number").countTo();
            factsCheck = true;
        }
    });
    
    $(".testimonials .owl-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 500,
        margin: 10,
        loop: true,
        autoplayHoverPause: true,
        responsiveClass: true
    });
    
    function scrollUp() {
        if (win.scrollTop() >= 1200) {
            scrollToTop.addClass("active");
        } else {
            scrollToTop.removeClass("active");
        }
    }
    
    scrollUp();
    
    win.on("scroll", function () {
        scrollUp();
    });
    
    scrollToTop.on("click", function (e) {
        e.preventDefault();
        htmlBody.animate({
            scrollTop: 0
        }, 800);
    });
    
    $.getJSON( "js/dictionary.json", function( data ) {
        var translator = $('body').translate({lang: "es", t: data});
        
        langSelector.on("click", function(e) {            
            translator.lang(this.value);
            $("#resume-a-link").attr('href',`cv/${this.value}/cv_a/CV_Matias_Micheletto.pdf`);
            $("#resume-n-link").attr('href',`cv/${this.value}/cv_n/CV_Matias_Micheletto.pdf`);
        });
    });
    
    // TODO: translate this
    var container = document.getElementById(timeline.container);
    if(container){
        var items = new vis.DataSet(timeline.data);
        var groups = timeline.groups ? new vis.DataSet(timeline.groups) : null;
        return new vis.Timeline(container, items, groups, {...timeline.options, locale: "es"});
    }

    new WOW().init();
});


