$(function () {

    $('.formularz_kontaktowy').on('click', function () {
        window.scrollTo(0, 0);
        $('.kontakt_background').css('display', 'block');
        $('.kontakt').slideDown();
        $(".kontakt_background, .close").on('click', function () {
            $('.kontakt').slideUp(600, function () {
                $('.kontakt_background').css('display', 'none');
            });
        });
    });

    validateForm = (function () {
        var formularz = document.forms[0];
        var email = formularz['entry.1973629079'].value;
        var telefon = formularz['entry.2066787020'].value;
        var wiadomosc = formularz['entry.1738346558'].value;

        $(formularz['entry.2066787020']).add(formularz['entry.1973629079']).add(formularz['entry.1738346558']).css('border-color', 'rgb(0,0,0)');

        if (!(telefon || email)) {
            $('h5').html('Wymagane przynajmniej jedno pole kontaktowe');
            $(formularz['entry.2066787020']).add(formularz['entry.1973629079']).css('border-color', 'red');
            return false
        }

        if (telefon && (telefon.search(/[a-z]/i) >= 0)) {
            $('h5').html('Dozwolone tylko cyfry');
            $(formularz['entry.2066787020']).css('border-color', 'red');
            return false
        }


        if (telefon && telefon.length < 7) {
            $('h5').html('Nieprawid&#322;owy numer telefonu');
            $(formularz['entry.2066787020']).css('border-color', 'red');
            return false
        }

        if (email.length > 0 && (email.search(/@.*\../) < 0)) {
            $('h5').html('Nieprawid&#322;owy adres e-mail');
            $(formularz['entry.1973629079']).css('border-color', 'red');
            return false
        }

        if (wiadomosc.length === 0) {
            $('h5').html('Wymagana tre&#347;&#263; wiadomo&#347;ci');
            $(formularz['entry.1738346558']).css('border-color', 'red');
            return false
        }

        if (wiadomosc && (email || telefon)) {
            $('.alert').show();
            $('.kontakt').slideUp(600, function () {
                $('.kontakt_background').css('display', 'none');
            });
            setTimeout(function(){$('.alert').hide()},5000);
            return true;
        }

    });

    (function mobilnaNawigacja() {

        $('.menuMobile').on('click', function () {
            $('.top').children('ul').children('li').toggleClass('mobile');

            if ($('.top').children('ul').css('display') == 'none') {
                $('.top').children('ul').css({'display': 'block', 'top': '', 'position': 'absolute'});
            } else {
                $('.top').children('ul').css('display', 'none');
            }
        });

        $('.alternativeIkons').on('click', function () {
            $('.dropdown').toggle();
        });
    })();

    (function wielkoscObrazkow() {
        var contextHeight = $('.context').css('height');
        $('.obrazek').css('height', contextHeight);

        dividableWidth = parseInt($('div.obrazek').css('width')) - (parseInt($('div.obrazek').css('width')) % 40);
        dividableHeight = parseInt($('div.obrazek').css('height')) - (parseInt($('div.obrazek').css('height')) % 40);
        $('div.image').css('width', dividableWidth);
        $('.kafelka').css('background-size', dividableWidth);
        $('div.image').css('height', dividableHeight);
    })();

    function imageEffects() {

        function kafelka(x, y, count) {
            var nowaKafelka = $('<div class="kafelka"></div>');
            $(nowaKafelka).attr('data-id', count);
            $(nowaKafelka).css('left', x);
            $(nowaKafelka).css('top', y);
            $(nowaKafelka).css('opacity', '0');
            $(nowaKafelka).css('background-position', '-' + x + ' -' + y);
            return nowaKafelka;
        }

        var imgWidth = dividableWidth;
        var imgHeight = dividableHeight;


        for (var j = 0, count = 1; j < imgHeight; j += 40) {
            var positionY = j + 'px';
            for (var i = 0; i < imgWidth; i += 40) {
                var positionX = i + 'px';
                $('div.image').append(kafelka(positionX, positionY, count));

                count++;
            }
        }
        ;

        var iloscKafelek = imgWidth / 40;

        for (var i = 1, liczba = ''; i <= iloscKafelek; i++) {
            liczba += i;
            for (var j = 1; j < i; j++) {
                temp = i + ((iloscKafelek - 1) * j);
                liczba += ' ' + temp;
            }
            liczba += ','
        }
        ;

        for (i = 2 * iloscKafelek; i <= iloscKafelek * iloscKafelek; i += iloscKafelek) {
            liczba += i;
            for (var j = iloscKafelek * iloscKafelek, multiply = 1; j > i; j -= iloscKafelek) {
                temp = i + ((iloscKafelek - 1) * multiply);
                liczba += ' ' + temp;
                multiply++;
            }
            liczba += ',';
        }
        ;

        var tablicaPrzekatnych = liczba.split(',');
        tablicaPrzekatnych.pop();

        function makingIDselector(a) {
            return ('[data-id=' + a + ']');
        };

        for (i = 0; i < tablicaPrzekatnych.length; i++) {
            var tempTime = 50 * i;
            var id = tablicaPrzekatnych[i].split(' ');
            id = id.map(makingIDselector);
            id = id.join(',');

            rotateFace = (function (id) {
                return function () {
                    $(id).css('opacity', '1');
                }
            })(id);

            setTimeout(rotateFace, tempTime);
        }
        ;

        function imageCover() {
            $('.image').css({'background-size': imgWidth});
            $('.kafelka').css('position', 'static');
        }

        setTimeout(imageCover, tempTime);

        $('.kafelka').css('background-size', imgWidth);

    }

    if ($('.contextFirma').length === 0){imageEffects()}

    if ($('.startSite').length !== 0) {
        function srartSiteImageTextChange() {

            $('body').toggleClass('tlo1');
            $('body').toggleClass('tlo2');

            var textVisibility = $('.heading, .box2').children();
            $.each(textVisibility, function () {
                if ($(this).css('display') == 'none') {
                    $(this).fadeIn(3000);
                } else {
                    $(this).hide();
                }
            });

            $('.box1').animate({left: '-360px'}, function () {
                $(this).animate({left: 0})
            });
            $('.box2').animate({right: '-360px'}, function () {
                $(this).animate({right: 0})
            });

        };
        setInterval(srartSiteImageTextChange, 8000);
    }

    $('.ftr').hover(function () {
        $(this).stop().animate({'margin-bottom': 0}, 400)
    }, function () {
        $(this).stop().animate({'margin-bottom': '-8.1em'}, 400)
    });

    (function preventSelection() {
        $('.main, .startSite').css({'-webkit-user-select': 'none', '-moz-user-select': 'none','-ms-user-select': 'none','user-select': 'none'})
    })();

    var lastWindowHeight = $(window).height();
    var lastWindowWidth = $(window).width();

    $(window).resize(function() {

        if((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {

        } else if($(window).height()!=lastWindowHeight || $(window).width()!=lastWindowWidth){

            lastWindowHeight = $(window).height();
            lastWindowWidth = $(window).width();

            location.reload();
        };

    });




});

