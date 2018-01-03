$(window).on("load", function() {
    "use strict";
    var windowLoaded = false;
    $(window).on("load", function() {
        windowLoaded = true;
    });


    /*=================== Sticky Header ===================*/
    $(window).on("scroll", function() {
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
            $("header.stick").addClass("sticky");
        } else {
            $("header.stick").removeClass("sticky");
        }
    });


    /*=================== Video Play and Pause Button ===================*/
    $(".play-video").on("click", function() {
        $(this).parent().addClass("active");
        return false;
    });
    $(".pause-video").on("click", function() {
        $(this).parent().removeClass("active");
        return false;
    });


    /* ============ Responsive Menu ================*/
    $(".responsive-menu-btn").on("click", function() {
        $("nav").toggleClass("slidein");
        return false;
    });
    $('html').on("click", function() {
        $("nav").removeClass("slidein");
    });
    $(".responsive-menu-btn").on("click", function(e) {
        e.stopPropagation();
    });
    if ($(window).width() < 980) {
        $(".menu ul ul").parent().addClass("menu-item-has-children");
        $(".menu ul li.menu-item-has-children > a").on("click", function() {
            $(this).next("ul").slideToggle();
            $(this).parent().siblings().find("ul").slideUp();
            return false;
        });
    }



    /*=================== Heaven Popup and Page Functions ===================*/
    $(".open-popup").on("click",function(){
        $(".popup-wrapper").fadeIn();
        return false;
    });
    $(".close").on("click",function(){
        $(".popup-wrapper").fadeOut();
    });



    /* =============== Ajax Contact Form ===================== */
    $('#contactform').submit(function(){
        var action = $(this).attr('action');
        $("#message").slideUp(750,function() {
        $('#message').hide();
            $('#submit')
            .after('<img src="images/ajax-loader.gif" class="loader" />')
            .attr('disabled','disabled');
        $.post(action, {
            name: $('#name').val(),
            email: $('#email').val(),
            comments: $('#comments').val(),
            verify: $('#verify').val()
        },
            function(data){
                document.getElementById('message').innerHTML = data;
                $('#message').slideDown('slow');
                $('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
                $('#submit').removeAttr('disabled');
                if(data.match('success') != null) $('#contactform').slideUp('slow');

            }
        );
        });
        return false;
    });


    /* ============ Heaven Slider ================*/
    var owl = $('.heaven-slider').owlCarousel({
        autoplay: true,
        loop: true,
        smartSpeed: 1000,
        dots: false,
        nav: true,
        margin: 0,
        mouseDrag: true,
        autoHeight: true,
        items: 1,
        singleItem: true,
        animateIn: "fadeIn",
        animateOut: "fadeOut"
    });


    /* ============ Events Carousel ================*/
    $('.events-carousel').owlCarousel({
        autoplay: true,
        loop: true,
        smartSpeed: 1000,
        autoplaySpeed: 4000,
        dots: true,
        nav: false,
        margin: 0,
        mouseDrag: true,
        autoHeight: true,
        items: 1,
        singleItem: true,
        animateIn: "fadeIn",
        animateOut: "fadeOut"
    });


    /* ============ Testimonials Carousel ================*/
    $('.testimonials-carousel').owlCarousel({
        autoplay: true,
        autoplaySpeed: 2000,
        loop: true,
        smartSpeed: 1200,
        dots: true,
        nav: false,
        margin: 0,
        mouseDrag: true,
        autoHeight: true,
        items: 1,
        singleItem: true,
        animateIn: "fadeIn",
        animateOut: "fadeOut"
    });

    


}); /*=== Window.Load Ends Here ===*/