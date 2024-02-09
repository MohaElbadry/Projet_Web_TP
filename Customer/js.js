/*global jQuery */
(function($) {
    "use strict";

    /*===============================
        ----- JS Index -----

    01. Background Image JS
    02. Countdown JS
    03. Responsive Menu
    04. Magnific Popup JS
    05. Scroll top Button JS
    06. Ajax Contact Form JS
    07. Contact Map JS
    08. Shop Layout Change
    09. Product Quantity
    10. Checkout Page Checkbox Accordion

    ==================================*/

    jQuery(document).ready(function($) {

        /*--------------------------
            01. Background Image JS
        ---------------------------*/
        var bgSelector = $("[data-bg]");
        bgSelector.each(function(index, elem) {
            var element = $(elem),
                bgSource = element.data('bg');
            element.css('background-image', 'url(' + bgSource + ')');
        });

        /*-------------------------
          02. Countdown JS
        -----------------------------*/
        $(".ht-countdown").each(function(index, element) {
            var $element = $(element),
                $date = $element.data('date');

            $element.countdown($date, function(event) {
                var $this = $(this).html(event.strftime(''

                    +
                    '<div class="countdown-item"><span class="countdown-item__time">%D</span><span class="countdown-item__label">Days</span></div>' +
                    '<div class="countdown-item"><span class="countdown-item__time">%H</span><span class="countdown-item__label">Hours</span></div>' +
                    '<div class="countdown-item"><span class="countdown-item__time">%M</span><span class="countdown-item__label">Minutes</span></div>' +
                    '<div class="countdown-item"><span class="countdown-item__time">%S</span><span class="countdown-item__label">Seconds</span></div>'));
            });
        });

        /*------------------------------
          03. Responsive Menu JS
        --------------------------------*/
        $('.main-menu.nav').slicknav({
            appendTo: '.res-mobile-menu',
            closeOnClick: true,
            removeClasses: true,
            closedSymbol: '<i class="ion-plus"></i>',
            openedSymbol: '<i class="ion-minus"></i>'
        });

        var resCanvasWrapper = $(".off-canvas-menu");
        $(".btn-menu").on('click', function() {
            resCanvasWrapper.addClass('active');
            $("body").addClass('fix');
        });

        $(".off-canvas-overlay, .btn-close").on('click', function() {
            $(".off-canvas-wrapper").removeClass('active');
            $("body").removeClass('fix');
        });


        /*---------------------------
           04. Magnific Popup JS
        ------------------------------*/
        // For Video Popup
        var videopopup = $(".btn-video-popup");
        videopopup.magnificPopup({
            type: 'iframe',
            mainClass: 'ht-mfp zoom-animate',
            removalDelay: 800,
            closeBtnInside: false
        });

        // For Image Gallery Popup
        var imgGallery = $(".image-gallery");
        imgGallery.magnificPopup({
            delegate: '[data-mfp-src]',
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'ht-mfp mfp-with-zoom mfp-img-mobile',
            image: {
                verticalFit: true
            },
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 400,
                opener: function(element) {
                    return element.find('img');
                }
            }
        });

        // Custom Gallery on Button Click
        var galleryBtnPopup = $(".btn-gallery-popup");
        galleryBtnPopup.on('click', function(event) {
            event.preventDefault();

            var gallery = $(this).attr('href');

            $(gallery).magnificPopup({
                delegate: '[data-mfp-src]',
                type: 'image',
                closeOnContentClick: false,
                closeBtnInside: false,
                mainClass: 'ht-mfp zoom-animate mfp-img-mobile',
                removalDelay: 800,
                image: {
                    verticalFit: true
                },
                gallery: {
                    enabled: true
                }
            }).magnificPopup('open');
        });


        /*---------------------------
           05. Scroll top Button JS
        ------------------------------*/

        $(".btn-scroll-top").on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 1500);
        });


        /*--------------------------
          06. Ajax Contact Form JS
         ---------------------------*/
        const form = $('#contact-form'),
            formMessages = $('.form-message');

        $(form).submit(function(e) {
            e.preventDefault();
            var formData = form.serialize();
            $.ajax({
                type: 'POST',
                url: form.attr('action'),
                data: formData
            }).done(function(response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('alert alert-danger');
                $(formMessages).addClass('alert alert-success fade show');

                // Set the message text.
                formMessages.html("<button type='button' class='close' data-dismiss='alert'>&times;</button>");
                formMessages.append(response);

                // Clear the form.
                $('#contact-form input,#contact-form textarea').val('');
            }).fail(function(data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('alert alert-success');
                $(formMessages).addClass('alert alert-danger fade show');

                // Set the message text.
                if (data.responseText !== '') {
                    formMessages.html("<button type='button' class='close' data-dismiss='alert'>&times;</button>");
                    formMessages.append(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occurred and your message could not be sent.');
                }
            });
        });

        /*-------------------------
          07. Contact Map JS
        -----------------------------*/
        var map_id = $('#map_content');
        if (map_id.length > 0) {
            var $lat = map_id.data('lat'),
                $lng = map_id.data('lng'),
                $zoom = map_id.data('zoom'),
                $maptitle = map_id.data('maptitle'),
                $mapaddress = map_id.data('mapaddress'),
                mymap = L.map('map_content').setView([$lat, $lng], $zoom);

            L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map',
                maxZoom: 14,
                minZoom: 2,
                id: 'mapbox.streets',
                scrollWheelZoom: false,
                accessToken: 'sk.eyJ1IjoicmFqdWh0IiwiYSI6ImNqdHk5dGdpYzJqM3A0NGxsYmI3NmhnN3EifQ.kNdHkgfVGmSz6XPmmfG02A'
            }).addTo(mymap);

            var marker = L.marker([$lat, $lng]).addTo(mymap);
            mymap.zoomControl.setPosition('bottomright');
            mymap.scrollWheelZoom.disable();
        }

        $("select").niceSelect();

        /*--------------------------
            08. Shop Layout Change
        -----------------------------*/
        var layoutSelector = $(".layout-switcher li"),
            areaWrap = $(".product-layout");

        layoutSelector.on('click', function() {
            var viewMode = $(this).data("layout");

            layoutSelector.removeClass('active');
            $(this).addClass('active');

            areaWrap.removeClass('layout-grid layout-list').addClass('layout-' + viewMode);
        });

        /*-----------------------------------
           09. Product Quantity
        -----------------------------------*/
        var proQty = $(".pro-qty");
        proQty.append('<a href="#" class="inc qty-btn">+</a>');
        proQty.append('<a href="#" class= "dec qty-btn">-</a>');
        $('.qty-btn').on('click', function(e) {
            e.preventDefault();
            var $button = $(this);
            var oldValue = $button.parent().find('input').val();
            if ($button.hasClass('inc')) {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                // Don't allow decrementing below zero
                if (oldValue > 0) {
                    var newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 0;
                }
            }
            $button.parent().find('input').val(newVal);
        });

        /*--------------------------------------
          10. Checkout Page Checkbox Accordion
        ----------------------------------------*/
        $("#create_pwd").on("change", function() {
            $(".account-create").slideToggle("100");
        });

        $("#ship_to_different").on("change", function() {
            $(".ship-to-different").slideToggle("100");
        });


        /*--------------------------
            All Slider Activation
        ---------------------------*/

        // Hero Slider Js
        $(".slider-content-active").slick({
            slidesToShow: 1,
            dots: true,
            adaptiveHeight: true,
            nextArrow: '<button class="slick-next"><i class="ion-chevron-right"></i></button>',
            prevArrow: '<button class="slick-prev"><i class="ion-chevron-left"></i></button>',
            responsive: [{
                breakpoint: 992,
                settings: {
                    arrows: false
                }
            }, ]
        });

        // Best Product Slider Js
        $(".product-carousel").slick({
            slidesToShow: 5,
            slidesToScroll: 2,
            arrows: false,
            responsive: [{
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        // Brand Logo Slider Js
        $(".brand-logo-content").slick({
            slidesToShow: 5,
            slidesToScroll: 2,
            arrows: false,
            infinite: true,
            responsive: [{
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 950,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        // Product Details Thumbnail
        $(".product-thumbnail-slider").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            draggable: false,
            infinite: false,
            asNavFor: ".product-details-thumbnail-nav"
        });

        // Product Details Thumbnail
        $(".product-details-thumbnail-nav").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            infinite: false,
            asNavFor: ".product-thumbnail-slider",
            focusOnSelect: true,
            responsive: [{
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }]
        });

    }); //End Ready Function

    jQuery(window).on('scroll', function() {
        //Scroll top Hide Show
        if ($(window).scrollTop() >= 400) {
            $('.btn-scroll-top').addClass('show');
        } else {
            $('.btn-scroll-top').removeClass('show');
        }
    }); // End Scroll Function
}(jQuery));








/*!
 * Bootstrap v4.3.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = t || self).bootstrap = {}, t.jQuery, t.Popper)
}(this, function(t, g, u) {
    "use strict";

    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function s(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }

    function l(o) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {},
                e = Object.keys(r);
            "function" == typeof Object.getOwnPropertySymbols && (e = e.concat(Object.getOwnPropertySymbols(r).filter(function(t) {
                return Object.getOwnPropertyDescriptor(r, t).enumerable
            }))), e.forEach(function(t) {
                var e, n, i;
                e = o, i = r[n = t], n in e ? Object.defineProperty(e, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[n] = i
            })
        }
        return o
    }
    g = g && g.hasOwnProperty("default") ? g.default : g, u = u && u.hasOwnProperty("default") ? u.default : u;
    var e = "transitionend";

    function n(t) {
        var e = this,
            n = !1;
        return g(this).one(_.TRANSITION_END, function() {
            n = !0
        }), setTimeout(function() {
            n || _.triggerTransitionEnd(e)
        }, t), this
    }
    var _ = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function(t) {
            for (; t += ~~(1e6 * Math.random()), document.getElementById(t););
            return t
        },
        getSelectorFromElement: function(t) {
            var e = t.getAttribute("data-target");
            if (!e || "#" === e) {
                var n = t.getAttribute("href");
                e = n && "#" !== n ? n.trim() : ""
            }
            try {
                return document.querySelector(e) ? e : null
            } catch (t) {
                return null
            }
        },
        getTransitionDurationFromElement: function(t) {
            if (!t) return 0;
            var e = g(t).css("transition-duration"),
                n = g(t).css("transition-delay"),
                i = parseFloat(e),
                o = parseFloat(n);
            return i || o ? (e = e.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(e) + parseFloat(n))) : 0
        },
        reflow: function(t) {
            return t.offsetHeight
        },
        triggerTransitionEnd: function(t) {
            g(t).trigger(e)
        },
        supportsTransitionEnd: function() {
            return Boolean(e)
        },
        isElement: function(t) {
            return (t[0] || t).nodeType
        },
        typeCheckConfig: function(t, e, n) {
            for (var i in n)
                if (Object.prototype.hasOwnProperty.call(n, i)) {
                    var o = n[i],
                        r = e[i],
                        s = r && _.isElement(r) ? "element" : (a = r, {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());
                    if (!new RegExp(o).test(s)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + o + '".')
                } var a
        },
        findShadowRoot: function(t) {
            if (!document.documentElement.attachShadow) return null;
            if ("function" != typeof t.getRootNode) return t instanceof ShadowRoot ? t : t.parentNode ? _.findShadowRoot(t.parentNode) : null;
            var e = t.getRootNode();
            return e instanceof ShadowRoot ? e : null
        }
    };
    g.fn.emulateTransitionEnd = n, g.event.special[_.TRANSITION_END] = {
        bindType: e,
        delegateType: e,
        handle: function(t) {
            if (g(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
        }
    };
    var o = "alert",
        r = "bs.alert",
        a = "." + r,
        c = g.fn[o],
        h = {
            CLOSE: "close" + a,
            CLOSED: "closed" + a,
            CLICK_DATA_API: "click" + a + ".data-api"
        },
        f = "alert",
        d = "fade",
        m = "show",
        p = function() {
            function i(t) {
                this._element = t
            }
            var t = i.prototype;
            return t.close = function(t) {
                var e = this._element;
                t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, t.dispose = function() {
                g.removeData(this._element, r), this._element = null
            }, t._getRootElement = function(t) {
                var e = _.getSelectorFromElement(t),
                    n = !1;
                return e && (n = document.querySelector(e)), n || (n = g(t).closest("." + f)[0]), n
            }, t._triggerCloseEvent = function(t) {
                var e = g.Event(h.CLOSE);
                return g(t).trigger(e), e
            }, t._removeElement = function(e) {
                var n = this;
                if (g(e).removeClass(m), g(e).hasClass(d)) {
                    var t = _.getTransitionDurationFromElement(e);
                    g(e).one(_.TRANSITION_END, function(t) {
                        return n._destroyElement(e, t)
                    }).emulateTransitionEnd(t)
                } else this._destroyElement(e)
            }, t._destroyElement = function(t) {
                g(t).detach().trigger(h.CLOSED).remove()
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this),
                        e = t.data(r);
                    e || (e = new i(this), t.data(r, e)), "close" === n && e[n](this)
                })
            }, i._handleDismiss = function(e) {
                return function(t) {
                    t && t.preventDefault(), e.close(this)
                }
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }]), i
        }();
    g(document).on(h.CLICK_DATA_API, '[data-dismiss="alert"]', p._handleDismiss(new p)), g.fn[o] = p._jQueryInterface, g.fn[o].Constructor = p, g.fn[o].noConflict = function() {
        return g.fn[o] = c, p._jQueryInterface
    };
    var v = "button",
        y = "bs.button",
        E = "." + y,
        C = ".data-api",
        T = g.fn[v],
        S = "active",
        b = "btn",
        I = "focus",
        D = '[data-toggle^="button"]',
        w = '[data-toggle="buttons"]',
        A = 'input:not([type="hidden"])',
        N = ".active",
        O = ".btn",
        k = {
            CLICK_DATA_API: "click" + E + C,
            FOCUS_BLUR_DATA_API: "focus" + E + C + " blur" + E + C
        },
        P = function() {
            function n(t) {
                this._element = t
            }
            var t = n.prototype;
            return t.toggle = function() {
                var t = !0,
                    e = !0,
                    n = g(this._element).closest(w)[0];
                if (n) {
                    var i = this._element.querySelector(A);
                    if (i) {
                        if ("radio" === i.type)
                            if (i.checked && this._element.classList.contains(S)) t = !1;
                            else {
                                var o = n.querySelector(N);
                                o && g(o).removeClass(S)
                            } if (t) {
                            if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
                            i.checked = !this._element.classList.contains(S), g(i).trigger("change")
                        }
                        i.focus(), e = !1
                    }
                }
                e && this._element.setAttribute("aria-pressed", !this._element.classList.contains(S)), t && g(this._element).toggleClass(S)
            }, t.dispose = function() {
                g.removeData(this._element, y), this._element = null
            }, n._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = g(this).data(y);
                    t || (t = new n(this), g(this).data(y, t)), "toggle" === e && t[e]()
                })
            }, s(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }]), n
        }();
    g(document).on(k.CLICK_DATA_API, D, function(t) {
        t.preventDefault();
        var e = t.target;
        g(e).hasClass(b) || (e = g(e).closest(O)), P._jQueryInterface.call(g(e), "toggle")
    }).on(k.FOCUS_BLUR_DATA_API, D, function(t) {
        var e = g(t.target).closest(O)[0];
        g(e).toggleClass(I, /^focus(in)?$/.test(t.type))
    }), g.fn[v] = P._jQueryInterface, g.fn[v].Constructor = P, g.fn[v].noConflict = function() {
        return g.fn[v] = T, P._jQueryInterface
    };
    var L = "carousel",
        j = "bs.carousel",
        H = "." + j,
        R = ".data-api",
        x = g.fn[L],
        F = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        U = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        W = "next",
        q = "prev",
        M = "left",
        K = "right",
        Q = {
            SLIDE: "slide" + H,
            SLID: "slid" + H,
            KEYDOWN: "keydown" + H,
            MOUSEENTER: "mouseenter" + H,
            MOUSELEAVE: "mouseleave" + H,
            TOUCHSTART: "touchstart" + H,
            TOUCHMOVE: "touchmove" + H,
            TOUCHEND: "touchend" + H,
            POINTERDOWN: "pointerdown" + H,
            POINTERUP: "pointerup" + H,
            DRAG_START: "dragstart" + H,
            LOAD_DATA_API: "load" + H + R,
            CLICK_DATA_API: "click" + H + R
        },
        B = "carousel",
        V = "active",
        Y = "slide",
        z = "carousel-item-right",
        X = "carousel-item-left",
        $ = "carousel-item-next",
        G = "carousel-item-prev",
        J = "pointer-event",
        Z = ".active",
        tt = ".active.carousel-item",
        et = ".carousel-item",
        nt = ".carousel-item img",
        it = ".carousel-item-next, .carousel-item-prev",
        ot = ".carousel-indicators",
        rt = "[data-slide], [data-slide-to]",
        st = '[data-ride="carousel"]',
        at = {
            TOUCH: "touch",
            PEN: "pen"
        },
        lt = function() {
            function r(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(ot), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
            }
            var t = r.prototype;
            return t.next = function() {
                this._isSliding || this._slide(W)
            }, t.nextWhenVisible = function() {
                !document.hidden && g(this._element).is(":visible") && "hidden" !== g(this._element).css("visibility") && this.next()
            }, t.prev = function() {
                this._isSliding || this._slide(q)
            }, t.pause = function(t) {
                t || (this._isPaused = !0), this._element.querySelector(it) && (_.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, t.cycle = function(t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, t.to = function(t) {
                var e = this;
                this._activeElement = this._element.querySelector(tt);
                var n = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0))
                    if (this._isSliding) g(this._element).one(Q.SLID, function() {
                        return e.to(t)
                    });
                    else {
                        if (n === t) return this.pause(), void this.cycle();
                        var i = n < t ? W : q;
                        this._slide(i, this._items[t])
                    }
            }, t.dispose = function() {
                g(this._element).off(H), g.removeData(this._element, j), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, t._getConfig = function(t) {
                return t = l({}, F, t), _.typeCheckConfig(L, t, U), t
            }, t._handleSwipe = function() {
                var t = Math.abs(this.touchDeltaX);
                if (!(t <= 40)) {
                    var e = t / this.touchDeltaX;
                    0 < e && this.prev(), e < 0 && this.next()
                }
            }, t._addEventListeners = function() {
                var e = this;
                this._config.keyboard && g(this._element).on(Q.KEYDOWN, function(t) {
                    return e._keydown(t)
                }), "hover" === this._config.pause && g(this._element).on(Q.MOUSEENTER, function(t) {
                    return e.pause(t)
                }).on(Q.MOUSELEAVE, function(t) {
                    return e.cycle(t)
                }), this._config.touch && this._addTouchEventListeners()
            }, t._addTouchEventListeners = function() {
                var n = this;
                if (this._touchSupported) {
                    var e = function(t) {
                            n._pointerEvent && at[t.originalEvent.pointerType.toUpperCase()] ? n.touchStartX = t.originalEvent.clientX : n._pointerEvent || (n.touchStartX = t.originalEvent.touches[0].clientX)
                        },
                        i = function(t) {
                            n._pointerEvent && at[t.originalEvent.pointerType.toUpperCase()] && (n.touchDeltaX = t.originalEvent.clientX - n.touchStartX), n._handleSwipe(), "hover" === n._config.pause && (n.pause(), n.touchTimeout && clearTimeout(n.touchTimeout), n.touchTimeout = setTimeout(function(t) {
                                return n.cycle(t)
                            }, 500 + n._config.interval))
                        };
                    g(this._element.querySelectorAll(nt)).on(Q.DRAG_START, function(t) {
                        return t.preventDefault()
                    }), this._pointerEvent ? (g(this._element).on(Q.POINTERDOWN, function(t) {
                        return e(t)
                    }), g(this._element).on(Q.POINTERUP, function(t) {
                        return i(t)
                    }), this._element.classList.add(J)) : (g(this._element).on(Q.TOUCHSTART, function(t) {
                        return e(t)
                    }), g(this._element).on(Q.TOUCHMOVE, function(t) {
                        var e;
                        (e = t).originalEvent.touches && 1 < e.originalEvent.touches.length ? n.touchDeltaX = 0 : n.touchDeltaX = e.originalEvent.touches[0].clientX - n.touchStartX
                    }), g(this._element).on(Q.TOUCHEND, function(t) {
                        return i(t)
                    }))
                }
            }, t._keydown = function(t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                    case 37:
                        t.preventDefault(), this.prev();
                        break;
                    case 39:
                        t.preventDefault(), this.next()
                }
            }, t._getItemIndex = function(t) {
                return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(et)) : [], this._items.indexOf(t)
            }, t._getItemByDirection = function(t, e) {
                var n = t === W,
                    i = t === q,
                    o = this._getItemIndex(e),
                    r = this._items.length - 1;
                if ((i && 0 === o || n && o === r) && !this._config.wrap) return e;
                var s = (o + (t === q ? -1 : 1)) % this._items.length;
                return -1 === s ? this._items[this._items.length - 1] : this._items[s]
            }, t._triggerSlideEvent = function(t, e) {
                var n = this._getItemIndex(t),
                    i = this._getItemIndex(this._element.querySelector(tt)),
                    o = g.Event(Q.SLIDE, {
                        relatedTarget: t,
                        direction: e,
                        from: i,
                        to: n
                    });
                return g(this._element).trigger(o), o
            }, t._setActiveIndicatorElement = function(t) {
                if (this._indicatorsElement) {
                    var e = [].slice.call(this._indicatorsElement.querySelectorAll(Z));
                    g(e).removeClass(V);
                    var n = this._indicatorsElement.children[this._getItemIndex(t)];
                    n && g(n).addClass(V)
                }
            }, t._slide = function(t, e) {
                var n, i, o, r = this,
                    s = this._element.querySelector(tt),
                    a = this._getItemIndex(s),
                    l = e || s && this._getItemByDirection(t, s),
                    c = this._getItemIndex(l),
                    h = Boolean(this._interval);
                if (o = t === W ? (n = X, i = $, M) : (n = z, i = G, K), l && g(l).hasClass(V)) this._isSliding = !1;
                else if (!this._triggerSlideEvent(l, o).isDefaultPrevented() && s && l) {
                    this._isSliding = !0, h && this.pause(), this._setActiveIndicatorElement(l);
                    var u = g.Event(Q.SLID, {
                        relatedTarget: l,
                        direction: o,
                        from: a,
                        to: c
                    });
                    if (g(this._element).hasClass(Y)) {
                        g(l).addClass(i), _.reflow(l), g(s).addClass(n), g(l).addClass(n);
                        var f = parseInt(l.getAttribute("data-interval"), 10);
                        this._config.interval = f ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, f) : this._config.defaultInterval || this._config.interval;
                        var d = _.getTransitionDurationFromElement(s);
                        g(s).one(_.TRANSITION_END, function() {
                            g(l).removeClass(n + " " + i).addClass(V), g(s).removeClass(V + " " + i + " " + n), r._isSliding = !1, setTimeout(function() {
                                return g(r._element).trigger(u)
                            }, 0)
                        }).emulateTransitionEnd(d)
                    } else g(s).removeClass(V), g(l).addClass(V), this._isSliding = !1, g(this._element).trigger(u);
                    h && this.cycle()
                }
            }, r._jQueryInterface = function(i) {
                return this.each(function() {
                    var t = g(this).data(j),
                        e = l({}, F, g(this).data());
                    "object" == typeof i && (e = l({}, e, i));
                    var n = "string" == typeof i ? i : e.slide;
                    if (t || (t = new r(this, e), g(this).data(j, t)), "number" == typeof i) t.to(i);
                    else if ("string" == typeof n) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    } else e.interval && e.ride && (t.pause(), t.cycle())
                })
            }, r._dataApiClickHandler = function(t) {
                var e = _.getSelectorFromElement(this);
                if (e) {
                    var n = g(e)[0];
                    if (n && g(n).hasClass(B)) {
                        var i = l({}, g(n).data(), g(this).data()),
                            o = this.getAttribute("data-slide-to");
                        o && (i.interval = !1), r._jQueryInterface.call(g(n), i), o && g(n).data(j).to(o), t.preventDefault()
                    }
                }
            }, s(r, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return F
                }
            }]), r
        }();
    g(document).on(Q.CLICK_DATA_API, rt, lt._dataApiClickHandler), g(window).on(Q.LOAD_DATA_API, function() {
        for (var t = [].slice.call(document.querySelectorAll(st)), e = 0, n = t.length; e < n; e++) {
            var i = g(t[e]);
            lt._jQueryInterface.call(i, i.data())
        }
    }), g.fn[L] = lt._jQueryInterface, g.fn[L].Constructor = lt, g.fn[L].noConflict = function() {
        return g.fn[L] = x, lt._jQueryInterface
    };
    var ct = "collapse",
        ht = "bs.collapse",
        ut = "." + ht,
        ft = g.fn[ct],
        dt = {
            toggle: !0,
            parent: ""
        },
        gt = {
            toggle: "boolean",
            parent: "(string|element)"
        },
        _t = {
            SHOW: "show" + ut,
            SHOWN: "shown" + ut,
            HIDE: "hide" + ut,
            HIDDEN: "hidden" + ut,
            CLICK_DATA_API: "click" + ut + ".data-api"
        },
        mt = "show",
        pt = "collapse",
        vt = "collapsing",
        yt = "collapsed",
        Et = "width",
        Ct = "height",
        Tt = ".show, .collapsing",
        St = '[data-toggle="collapse"]',
        bt = function() {
            function a(e, t) {
                this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(St)), i = 0, o = n.length; i < o; i++) {
                    var r = n[i],
                        s = _.getSelectorFromElement(r),
                        a = [].slice.call(document.querySelectorAll(s)).filter(function(t) {
                            return t === e
                        });
                    null !== s && 0 < a.length && (this._selector = s, this._triggerArray.push(r))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }
            var t = a.prototype;
            return t.toggle = function() {
                g(this._element).hasClass(mt) ? this.hide() : this.show()
            }, t.show = function() {
                var t, e, n = this;
                if (!this._isTransitioning && !g(this._element).hasClass(mt) && (this._parent && 0 === (t = [].slice.call(this._parent.querySelectorAll(Tt)).filter(function(t) {
                        return "string" == typeof n._config.parent ? t.getAttribute("data-parent") === n._config.parent : t.classList.contains(pt)
                    })).length && (t = null), !(t && (e = g(t).not(this._selector).data(ht)) && e._isTransitioning))) {
                    var i = g.Event(_t.SHOW);
                    if (g(this._element).trigger(i), !i.isDefaultPrevented()) {
                        t && (a._jQueryInterface.call(g(t).not(this._selector), "hide"), e || g(t).data(ht, null));
                        var o = this._getDimension();
                        g(this._element).removeClass(pt).addClass(vt), this._element.style[o] = 0, this._triggerArray.length && g(this._triggerArray).removeClass(yt).attr("aria-expanded", !0), this.setTransitioning(!0);
                        var r = "scroll" + (o[0].toUpperCase() + o.slice(1)),
                            s = _.getTransitionDurationFromElement(this._element);
                        g(this._element).one(_.TRANSITION_END, function() {
                            g(n._element).removeClass(vt).addClass(pt).addClass(mt), n._element.style[o] = "", n.setTransitioning(!1), g(n._element).trigger(_t.SHOWN)
                        }).emulateTransitionEnd(s), this._element.style[o] = this._element[r] + "px"
                    }
                }
            }, t.hide = function() {
                var t = this;
                if (!this._isTransitioning && g(this._element).hasClass(mt)) {
                    var e = g.Event(_t.HIDE);
                    if (g(this._element).trigger(e), !e.isDefaultPrevented()) {
                        var n = this._getDimension();
                        this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", _.reflow(this._element), g(this._element).addClass(vt).removeClass(pt).removeClass(mt);
                        var i = this._triggerArray.length;
                        if (0 < i)
                            for (var o = 0; o < i; o++) {
                                var r = this._triggerArray[o],
                                    s = _.getSelectorFromElement(r);
                                if (null !== s) g([].slice.call(document.querySelectorAll(s))).hasClass(mt) || g(r).addClass(yt).attr("aria-expanded", !1)
                            }
                        this.setTransitioning(!0);
                        this._element.style[n] = "";
                        var a = _.getTransitionDurationFromElement(this._element);
                        g(this._element).one(_.TRANSITION_END, function() {
                            t.setTransitioning(!1), g(t._element).removeClass(vt).addClass(pt).trigger(_t.HIDDEN)
                        }).emulateTransitionEnd(a)
                    }
                }
            }, t.setTransitioning = function(t) {
                this._isTransitioning = t
            }, t.dispose = function() {
                g.removeData(this._element, ht), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, t._getConfig = function(t) {
                return (t = l({}, dt, t)).toggle = Boolean(t.toggle), _.typeCheckConfig(ct, t, gt), t
            }, t._getDimension = function() {
                return g(this._element).hasClass(Et) ? Et : Ct
            }, t._getParent = function() {
                var t, n = this;
                _.isElement(this._config.parent) ? (t = this._config.parent, "undefined" != typeof this._config.parent.jquery && (t = this._config.parent[0])) : t = document.querySelector(this._config.parent);
                var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    i = [].slice.call(t.querySelectorAll(e));
                return g(i).each(function(t, e) {
                    n._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e])
                }), t
            }, t._addAriaAndCollapsedClass = function(t, e) {
                var n = g(t).hasClass(mt);
                e.length && g(e).toggleClass(yt, !n).attr("aria-expanded", n)
            }, a._getTargetFromElement = function(t) {
                var e = _.getSelectorFromElement(t);
                return e ? document.querySelector(e) : null
            }, a._jQueryInterface = function(i) {
                return this.each(function() {
                    var t = g(this),
                        e = t.data(ht),
                        n = l({}, dt, t.data(), "object" == typeof i && i ? i : {});
                    if (!e && n.toggle && /show|hide/.test(i) && (n.toggle = !1), e || (e = new a(this, n), t.data(ht, e)), "string" == typeof i) {
                        if ("undefined" == typeof e[i]) throw new TypeError('No method named "' + i + '"');
                        e[i]()
                    }
                })
            }, s(a, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return dt
                }
            }]), a
        }();
    g(document).on(_t.CLICK_DATA_API, St, function(t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = g(this),
            e = _.getSelectorFromElement(this),
            i = [].slice.call(document.querySelectorAll(e));
        g(i).each(function() {
            var t = g(this),
                e = t.data(ht) ? "toggle" : n.data();
            bt._jQueryInterface.call(t, e)
        })
    }), g.fn[ct] = bt._jQueryInterface, g.fn[ct].Constructor = bt, g.fn[ct].noConflict = function() {
        return g.fn[ct] = ft, bt._jQueryInterface
    };
    var It = "dropdown",
        Dt = "bs.dropdown",
        wt = "." + Dt,
        At = ".data-api",
        Nt = g.fn[It],
        Ot = new RegExp("38|40|27"),
        kt = {
            HIDE: "hide" + wt,
            HIDDEN: "hidden" + wt,
            SHOW: "show" + wt,
            SHOWN: "shown" + wt,
            CLICK: "click" + wt,
            CLICK_DATA_API: "click" + wt + At,
            KEYDOWN_DATA_API: "keydown" + wt + At,
            KEYUP_DATA_API: "keyup" + wt + At
        },
        Pt = "disabled",
        Lt = "show",
        jt = "dropup",
        Ht = "dropright",
        Rt = "dropleft",
        xt = "dropdown-menu-right",
        Ft = "position-static",
        Ut = '[data-toggle="dropdown"]',
        Wt = ".dropdown form",
        qt = ".dropdown-menu",
        Mt = ".navbar-nav",
        Kt = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
        Qt = "top-start",
        Bt = "top-end",
        Vt = "bottom-start",
        Yt = "bottom-end",
        zt = "right-start",
        Xt = "left-start",
        $t = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic"
        },
        Gt = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        },
        Jt = function() {
            function c(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }
            var t = c.prototype;
            return t.toggle = function() {
                if (!this._element.disabled && !g(this._element).hasClass(Pt)) {
                    var t = c._getParentFromElement(this._element),
                        e = g(this._menu).hasClass(Lt);
                    if (c._clearMenus(), !e) {
                        var n = {
                                relatedTarget: this._element
                            },
                            i = g.Event(kt.SHOW, n);
                        if (g(t).trigger(i), !i.isDefaultPrevented()) {
                            if (!this._inNavbar) {
                                if ("undefined" == typeof u) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                                var o = this._element;
                                "parent" === this._config.reference ? o = t : _.isElement(this._config.reference) && (o = this._config.reference, "undefined" != typeof this._config.reference.jquery && (o = this._config.reference[0])), "scrollParent" !== this._config.boundary && g(t).addClass(Ft), this._popper = new u(o, this._menu, this._getPopperConfig())
                            }
                            "ontouchstart" in document.documentElement && 0 === g(t).closest(Mt).length && g(document.body).children().on("mouseover", null, g.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), g(this._menu).toggleClass(Lt), g(t).toggleClass(Lt).trigger(g.Event(kt.SHOWN, n))
                        }
                    }
                }
            }, t.show = function() {
                if (!(this._element.disabled || g(this._element).hasClass(Pt) || g(this._menu).hasClass(Lt))) {
                    var t = {
                            relatedTarget: this._element
                        },
                        e = g.Event(kt.SHOW, t),
                        n = c._getParentFromElement(this._element);
                    g(n).trigger(e), e.isDefaultPrevented() || (g(this._menu).toggleClass(Lt), g(n).toggleClass(Lt).trigger(g.Event(kt.SHOWN, t)))
                }
            }, t.hide = function() {
                if (!this._element.disabled && !g(this._element).hasClass(Pt) && g(this._menu).hasClass(Lt)) {
                    var t = {
                            relatedTarget: this._element
                        },
                        e = g.Event(kt.HIDE, t),
                        n = c._getParentFromElement(this._element);
                    g(n).trigger(e), e.isDefaultPrevented() || (g(this._menu).toggleClass(Lt), g(n).toggleClass(Lt).trigger(g.Event(kt.HIDDEN, t)))
                }
            }, t.dispose = function() {
                g.removeData(this._element, Dt), g(this._element).off(wt), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
            }, t.update = function() {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, t._addEventListeners = function() {
                var e = this;
                g(this._element).on(kt.CLICK, function(t) {
                    t.preventDefault(), t.stopPropagation(), e.toggle()
                })
            }, t._getConfig = function(t) {
                return t = l({}, this.constructor.Default, g(this._element).data(), t), _.typeCheckConfig(It, t, this.constructor.DefaultType), t
            }, t._getMenuElement = function() {
                if (!this._menu) {
                    var t = c._getParentFromElement(this._element);
                    t && (this._menu = t.querySelector(qt))
                }
                return this._menu
            }, t._getPlacement = function() {
                var t = g(this._element.parentNode),
                    e = Vt;
                return t.hasClass(jt) ? (e = Qt, g(this._menu).hasClass(xt) && (e = Bt)) : t.hasClass(Ht) ? e = zt : t.hasClass(Rt) ? e = Xt : g(this._menu).hasClass(xt) && (e = Yt), e
            }, t._detectNavbar = function() {
                return 0 < g(this._element).closest(".navbar").length
            }, t._getOffset = function() {
                var e = this,
                    t = {};
                return "function" == typeof this._config.offset ? t.fn = function(t) {
                    return t.offsets = l({}, t.offsets, e._config.offset(t.offsets, e._element) || {}), t
                } : t.offset = this._config.offset, t
            }, t._getPopperConfig = function() {
                var t = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (t.modifiers.applyStyle = {
                    enabled: !1
                }), t
            }, c._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = g(this).data(Dt);
                    if (t || (t = new c(this, "object" == typeof e ? e : null), g(this).data(Dt, t)), "string" == typeof e) {
                        if ("undefined" == typeof t[e]) throw new TypeError('No method named "' + e + '"');
                        t[e]()
                    }
                })
            }, c._clearMenus = function(t) {
                if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which))
                    for (var e = [].slice.call(document.querySelectorAll(Ut)), n = 0, i = e.length; n < i; n++) {
                        var o = c._getParentFromElement(e[n]),
                            r = g(e[n]).data(Dt),
                            s = {
                                relatedTarget: e[n]
                            };
                        if (t && "click" === t.type && (s.clickEvent = t), r) {
                            var a = r._menu;
                            if (g(o).hasClass(Lt) && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && g.contains(o, t.target))) {
                                var l = g.Event(kt.HIDE, s);
                                g(o).trigger(l), l.isDefaultPrevented() || ("ontouchstart" in document.documentElement && g(document.body).children().off("mouseover", null, g.noop), e[n].setAttribute("aria-expanded", "false"), g(a).removeClass(Lt), g(o).removeClass(Lt).trigger(g.Event(kt.HIDDEN, s)))
                            }
                        }
                    }
            }, c._getParentFromElement = function(t) {
                var e, n = _.getSelectorFromElement(t);
                return n && (e = document.querySelector(n)), e || t.parentNode
            }, c._dataApiKeydownHandler = function(t) {
                if ((/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || g(t.target).closest(qt).length)) : Ot.test(t.which)) && (t.preventDefault(), t.stopPropagation(), !this.disabled && !g(this).hasClass(Pt))) {
                    var e = c._getParentFromElement(this),
                        n = g(e).hasClass(Lt);
                    if (n && (!n || 27 !== t.which && 32 !== t.which)) {
                        var i = [].slice.call(e.querySelectorAll(Kt));
                        if (0 !== i.length) {
                            var o = i.indexOf(t.target);
                            38 === t.which && 0 < o && o--, 40 === t.which && o < i.length - 1 && o++, o < 0 && (o = 0), i[o].focus()
                        }
                    } else {
                        if (27 === t.which) {
                            var r = e.querySelector(Ut);
                            g(r).trigger("focus")
                        }
                        g(this).trigger("click")
                    }
                }
            }, s(c, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return $t
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Gt
                }
            }]), c
        }();
    g(document).on(kt.KEYDOWN_DATA_API, Ut, Jt._dataApiKeydownHandler).on(kt.KEYDOWN_DATA_API, qt, Jt._dataApiKeydownHandler).on(kt.CLICK_DATA_API + " " + kt.KEYUP_DATA_API, Jt._clearMenus).on(kt.CLICK_DATA_API, Ut, function(t) {
        t.preventDefault(), t.stopPropagation(), Jt._jQueryInterface.call(g(this), "toggle")
    }).on(kt.CLICK_DATA_API, Wt, function(t) {
        t.stopPropagation()
    }), g.fn[It] = Jt._jQueryInterface, g.fn[It].Constructor = Jt, g.fn[It].noConflict = function() {
        return g.fn[It] = Nt, Jt._jQueryInterface
    };
    var Zt = "modal",
        te = "bs.modal",
        ee = "." + te,
        ne = g.fn[Zt],
        ie = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        oe = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        re = {
            HIDE: "hide" + ee,
            HIDDEN: "hidden" + ee,
            SHOW: "show" + ee,
            SHOWN: "shown" + ee,
            FOCUSIN: "focusin" + ee,
            RESIZE: "resize" + ee,
            CLICK_DISMISS: "click.dismiss" + ee,
            KEYDOWN_DISMISS: "keydown.dismiss" + ee,
            MOUSEUP_DISMISS: "mouseup.dismiss" + ee,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + ee,
            CLICK_DATA_API: "click" + ee + ".data-api"
        },
        se = "modal-dialog-scrollable",
        ae = "modal-scrollbar-measure",
        le = "modal-backdrop",
        ce = "modal-open",
        he = "fade",
        ue = "show",
        fe = ".modal-dialog",
        de = ".modal-body",
        ge = '[data-toggle="modal"]',
        _e = '[data-dismiss="modal"]',
        me = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        pe = ".sticky-top",
        ve = function() {
            function o(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(fe), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
            }
            var t = o.prototype;
            return t.toggle = function(t) {
                return this._isShown ? this.hide() : this.show(t)
            }, t.show = function(t) {
                var e = this;
                if (!this._isShown && !this._isTransitioning) {
                    g(this._element).hasClass(he) && (this._isTransitioning = !0);
                    var n = g.Event(re.SHOW, {
                        relatedTarget: t
                    });
                    g(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), g(this._element).on(re.CLICK_DISMISS, _e, function(t) {
                        return e.hide(t)
                    }), g(this._dialog).on(re.MOUSEDOWN_DISMISS, function() {
                        g(e._element).one(re.MOUSEUP_DISMISS, function(t) {
                            g(t.target).is(e._element) && (e._ignoreBackdropClick = !0)
                        })
                    }), this._showBackdrop(function() {
                        return e._showElement(t)
                    }))
                }
            }, t.hide = function(t) {
                var e = this;
                if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
                    var n = g.Event(re.HIDE);
                    if (g(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
                        this._isShown = !1;
                        var i = g(this._element).hasClass(he);
                        if (i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), g(document).off(re.FOCUSIN), g(this._element).removeClass(ue), g(this._element).off(re.CLICK_DISMISS), g(this._dialog).off(re.MOUSEDOWN_DISMISS), i) {
                            var o = _.getTransitionDurationFromElement(this._element);
                            g(this._element).one(_.TRANSITION_END, function(t) {
                                return e._hideModal(t)
                            }).emulateTransitionEnd(o)
                        } else this._hideModal()
                    }
                }
            }, t.dispose = function() {
                [window, this._element, this._dialog].forEach(function(t) {
                    return g(t).off(ee)
                }), g(document).off(re.FOCUSIN), g.removeData(this._element, te), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
            }, t.handleUpdate = function() {
                this._adjustDialog()
            }, t._getConfig = function(t) {
                return t = l({}, ie, t), _.typeCheckConfig(Zt, t, oe), t
            }, t._showElement = function(t) {
                var e = this,
                    n = g(this._element).hasClass(he);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), g(this._dialog).hasClass(se) ? this._dialog.querySelector(de).scrollTop = 0 : this._element.scrollTop = 0, n && _.reflow(this._element), g(this._element).addClass(ue), this._config.focus && this._enforceFocus();
                var i = g.Event(re.SHOWN, {
                        relatedTarget: t
                    }),
                    o = function() {
                        e._config.focus && e._element.focus(), e._isTransitioning = !1, g(e._element).trigger(i)
                    };
                if (n) {
                    var r = _.getTransitionDurationFromElement(this._dialog);
                    g(this._dialog).one(_.TRANSITION_END, o).emulateTransitionEnd(r)
                } else o()
            }, t._enforceFocus = function() {
                var e = this;
                g(document).off(re.FOCUSIN).on(re.FOCUSIN, function(t) {
                    document !== t.target && e._element !== t.target && 0 === g(e._element).has(t.target).length && e._element.focus()
                })
            }, t._setEscapeEvent = function() {
                var e = this;
                this._isShown && this._config.keyboard ? g(this._element).on(re.KEYDOWN_DISMISS, function(t) {
                    27 === t.which && (t.preventDefault(), e.hide())
                }) : this._isShown || g(this._element).off(re.KEYDOWN_DISMISS)
            }, t._setResizeEvent = function() {
                var e = this;
                this._isShown ? g(window).on(re.RESIZE, function(t) {
                    return e.handleUpdate(t)
                }) : g(window).off(re.RESIZE)
            }, t._hideModal = function() {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function() {
                    g(document.body).removeClass(ce), t._resetAdjustments(), t._resetScrollbar(), g(t._element).trigger(re.HIDDEN)
                })
            }, t._removeBackdrop = function() {
                this._backdrop && (g(this._backdrop).remove(), this._backdrop = null)
            }, t._showBackdrop = function(t) {
                var e = this,
                    n = g(this._element).hasClass(he) ? he : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = le, n && this._backdrop.classList.add(n), g(this._backdrop).appendTo(document.body), g(this._element).on(re.CLICK_DISMISS, function(t) {
                            e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide())
                        }), n && _.reflow(this._backdrop), g(this._backdrop).addClass(ue), !t) return;
                    if (!n) return void t();
                    var i = _.getTransitionDurationFromElement(this._backdrop);
                    g(this._backdrop).one(_.TRANSITION_END, t).emulateTransitionEnd(i)
                } else if (!this._isShown && this._backdrop) {
                    g(this._backdrop).removeClass(ue);
                    var o = function() {
                        e._removeBackdrop(), t && t()
                    };
                    if (g(this._element).hasClass(he)) {
                        var r = _.getTransitionDurationFromElement(this._backdrop);
                        g(this._backdrop).one(_.TRANSITION_END, o).emulateTransitionEnd(r)
                    } else o()
                } else t && t()
            }, t._adjustDialog = function() {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, t._resetAdjustments = function() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, t._checkScrollbar = function() {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, t._setScrollbar = function() {
                var o = this;
                if (this._isBodyOverflowing) {
                    var t = [].slice.call(document.querySelectorAll(me)),
                        e = [].slice.call(document.querySelectorAll(pe));
                    g(t).each(function(t, e) {
                        var n = e.style.paddingRight,
                            i = g(e).css("padding-right");
                        g(e).data("padding-right", n).css("padding-right", parseFloat(i) + o._scrollbarWidth + "px")
                    }), g(e).each(function(t, e) {
                        var n = e.style.marginRight,
                            i = g(e).css("margin-right");
                        g(e).data("margin-right", n).css("margin-right", parseFloat(i) - o._scrollbarWidth + "px")
                    });
                    var n = document.body.style.paddingRight,
                        i = g(document.body).css("padding-right");
                    g(document.body).data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
                }
                g(document.body).addClass(ce)
            }, t._resetScrollbar = function() {
                var t = [].slice.call(document.querySelectorAll(me));
                g(t).each(function(t, e) {
                    var n = g(e).data("padding-right");
                    g(e).removeData("padding-right"), e.style.paddingRight = n || ""
                });
                var e = [].slice.call(document.querySelectorAll("" + pe));
                g(e).each(function(t, e) {
                    var n = g(e).data("margin-right");
                    "undefined" != typeof n && g(e).css("margin-right", n).removeData("margin-right")
                });
                var n = g(document.body).data("padding-right");
                g(document.body).removeData("padding-right"), document.body.style.paddingRight = n || ""
            }, t._getScrollbarWidth = function() {
                var t = document.createElement("div");
                t.className = ae, document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, o._jQueryInterface = function(n, i) {
                return this.each(function() {
                    var t = g(this).data(te),
                        e = l({}, ie, g(this).data(), "object" == typeof n && n ? n : {});
                    if (t || (t = new o(this, e), g(this).data(te, t)), "string" == typeof n) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n](i)
                    } else e.show && t.show(i)
                })
            }, s(o, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return ie
                }
            }]), o
        }();
    g(document).on(re.CLICK_DATA_API, ge, function(t) {
        var e, n = this,
            i = _.getSelectorFromElement(this);
        i && (e = document.querySelector(i));
        var o = g(e).data(te) ? "toggle" : l({}, g(e).data(), g(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
        var r = g(e).one(re.SHOW, function(t) {
            t.isDefaultPrevented() || r.one(re.HIDDEN, function() {
                g(n).is(":visible") && n.focus()
            })
        });
        ve._jQueryInterface.call(g(e), o, this)
    }), g.fn[Zt] = ve._jQueryInterface, g.fn[Zt].Constructor = ve, g.fn[Zt].noConflict = function() {
        return g.fn[Zt] = ne, ve._jQueryInterface
    };
    var ye = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        Ee = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        },
        Ce = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        Te = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

    function Se(t, s, e) {
        if (0 === t.length) return t;
        if (e && "function" == typeof e) return e(t);
        for (var n = (new window.DOMParser).parseFromString(t, "text/html"), a = Object.keys(s), l = [].slice.call(n.body.querySelectorAll("*")), i = function(t, e) {
                var n = l[t],
                    i = n.nodeName.toLowerCase();
                if (-1 === a.indexOf(n.nodeName.toLowerCase())) return n.parentNode.removeChild(n), "continue";
                var o = [].slice.call(n.attributes),
                    r = [].concat(s["*"] || [], s[i] || []);
                o.forEach(function(t) {
                    (function(t, e) {
                        var n = t.nodeName.toLowerCase();
                        if (-1 !== e.indexOf(n)) return -1 === ye.indexOf(n) || Boolean(t.nodeValue.match(Ce) || t.nodeValue.match(Te));
                        for (var i = e.filter(function(t) {
                                return t instanceof RegExp
                            }), o = 0, r = i.length; o < r; o++)
                            if (n.match(i[o])) return !0;
                        return !1
                    })(t, r) || n.removeAttribute(t.nodeName)
                })
            }, o = 0, r = l.length; o < r; o++) i(o);
        return n.body.innerHTML
    }
    var be = "tooltip",
        Ie = "bs.tooltip",
        De = "." + Ie,
        we = g.fn[be],
        Ae = "bs-tooltip",
        Ne = new RegExp("(^|\\s)" + Ae + "\\S+", "g"),
        Oe = ["sanitize", "whiteList", "sanitizeFn"],
        ke = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object"
        },
        Pe = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        Le = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: Ee
        },
        je = "show",
        He = "out",
        Re = {
            HIDE: "hide" + De,
            HIDDEN: "hidden" + De,
            SHOW: "show" + De,
            SHOWN: "shown" + De,
            INSERTED: "inserted" + De,
            CLICK: "click" + De,
            FOCUSIN: "focusin" + De,
            FOCUSOUT: "focusout" + De,
            MOUSEENTER: "mouseenter" + De,
            MOUSELEAVE: "mouseleave" + De
        },
        xe = "fade",
        Fe = "show",
        Ue = ".tooltip-inner",
        We = ".arrow",
        qe = "hover",
        Me = "focus",
        Ke = "click",
        Qe = "manual",
        Be = function() {
            function i(t, e) {
                if ("undefined" == typeof u) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
            }
            var t = i.prototype;
            return t.enable = function() {
                this._isEnabled = !0
            }, t.disable = function() {
                this._isEnabled = !1
            }, t.toggleEnabled = function() {
                this._isEnabled = !this._isEnabled
            }, t.toggle = function(t) {
                if (this._isEnabled)
                    if (t) {
                        var e = this.constructor.DATA_KEY,
                            n = g(t.currentTarget).data(e);
                        n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                    } else {
                        if (g(this.getTipElement()).hasClass(Fe)) return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, t.dispose = function() {
                clearTimeout(this._timeout), g.removeData(this.element, this.constructor.DATA_KEY), g(this.element).off(this.constructor.EVENT_KEY), g(this.element).closest(".modal").off("hide.bs.modal"), this.tip && g(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, t.show = function() {
                var e = this;
                if ("none" === g(this.element).css("display")) throw new Error("Please use show on visible elements");
                var t = g.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    g(this.element).trigger(t);
                    var n = _.findShadowRoot(this.element),
                        i = g.contains(null !== n ? n : this.element.ownerDocument.documentElement, this.element);
                    if (t.isDefaultPrevented() || !i) return;
                    var o = this.getTipElement(),
                        r = _.getUID(this.constructor.NAME);
                    o.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && g(o).addClass(xe);
                    var s = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
                        a = this._getAttachment(s);
                    this.addAttachmentClass(a);
                    var l = this._getContainer();
                    g(o).data(this.constructor.DATA_KEY, this), g.contains(this.element.ownerDocument.documentElement, this.tip) || g(o).appendTo(l), g(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new u(this.element, o, {
                        placement: a,
                        modifiers: {
                            offset: this._getOffset(),
                            flip: {
                                behavior: this.config.fallbackPlacement
                            },
                            arrow: {
                                element: We
                            },
                            preventOverflow: {
                                boundariesElement: this.config.boundary
                            }
                        },
                        onCreate: function(t) {
                            t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                        },
                        onUpdate: function(t) {
                            return e._handlePopperPlacementChange(t)
                        }
                    }), g(o).addClass(Fe), "ontouchstart" in document.documentElement && g(document.body).children().on("mouseover", null, g.noop);
                    var c = function() {
                        e.config.animation && e._fixTransition();
                        var t = e._hoverState;
                        e._hoverState = null, g(e.element).trigger(e.constructor.Event.SHOWN), t === He && e._leave(null, e)
                    };
                    if (g(this.tip).hasClass(xe)) {
                        var h = _.getTransitionDurationFromElement(this.tip);
                        g(this.tip).one(_.TRANSITION_END, c).emulateTransitionEnd(h)
                    } else c()
                }
            }, t.hide = function(t) {
                var e = this,
                    n = this.getTipElement(),
                    i = g.Event(this.constructor.Event.HIDE),
                    o = function() {
                        e._hoverState !== je && n.parentNode && n.parentNode.removeChild(n), e._cleanTipClass(), e.element.removeAttribute("aria-describedby"), g(e.element).trigger(e.constructor.Event.HIDDEN), null !== e._popper && e._popper.destroy(), t && t()
                    };
                if (g(this.element).trigger(i), !i.isDefaultPrevented()) {
                    if (g(n).removeClass(Fe), "ontouchstart" in document.documentElement && g(document.body).children().off("mouseover", null, g.noop), this._activeTrigger[Ke] = !1, this._activeTrigger[Me] = !1, this._activeTrigger[qe] = !1, g(this.tip).hasClass(xe)) {
                        var r = _.getTransitionDurationFromElement(n);
                        g(n).one(_.TRANSITION_END, o).emulateTransitionEnd(r)
                    } else o();
                    this._hoverState = ""
                }
            }, t.update = function() {
                null !== this._popper && this._popper.scheduleUpdate()
            }, t.isWithContent = function() {
                return Boolean(this.getTitle())
            }, t.addAttachmentClass = function(t) {
                g(this.getTipElement()).addClass(Ae + "-" + t)
            }, t.getTipElement = function() {
                return this.tip = this.tip || g(this.config.template)[0], this.tip
            }, t.setContent = function() {
                var t = this.getTipElement();
                this.setElementContent(g(t.querySelectorAll(Ue)), this.getTitle()), g(t).removeClass(xe + " " + Fe)
            }, t.setElementContent = function(t, e) {
                "object" != typeof e || !e.nodeType && !e.jquery ? this.config.html ? (this.config.sanitize && (e = Se(e, this.config.whiteList, this.config.sanitizeFn)), t.html(e)) : t.text(e) : this.config.html ? g(e).parent().is(t) || t.empty().append(e) : t.text(g(e).text())
            }, t.getTitle = function() {
                var t = this.element.getAttribute("data-original-title");
                return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
            }, t._getOffset = function() {
                var e = this,
                    t = {};
                return "function" == typeof this.config.offset ? t.fn = function(t) {
                    return t.offsets = l({}, t.offsets, e.config.offset(t.offsets, e.element) || {}), t
                } : t.offset = this.config.offset, t
            }, t._getContainer = function() {
                return !1 === this.config.container ? document.body : _.isElement(this.config.container) ? g(this.config.container) : g(document).find(this.config.container)
            }, t._getAttachment = function(t) {
                return Pe[t.toUpperCase()]
            }, t._setListeners = function() {
                var i = this;
                this.config.trigger.split(" ").forEach(function(t) {
                    if ("click" === t) g(i.element).on(i.constructor.Event.CLICK, i.config.selector, function(t) {
                        return i.toggle(t)
                    });
                    else if (t !== Qe) {
                        var e = t === qe ? i.constructor.Event.MOUSEENTER : i.constructor.Event.FOCUSIN,
                            n = t === qe ? i.constructor.Event.MOUSELEAVE : i.constructor.Event.FOCUSOUT;
                        g(i.element).on(e, i.config.selector, function(t) {
                            return i._enter(t)
                        }).on(n, i.config.selector, function(t) {
                            return i._leave(t)
                        })
                    }
                }), g(this.element).closest(".modal").on("hide.bs.modal", function() {
                    i.element && i.hide()
                }), this.config.selector ? this.config = l({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, t._fixTitle = function() {
                var t = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, t._enter = function(t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || g(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusin" === t.type ? Me : qe] = !0), g(e.getTipElement()).hasClass(Fe) || e._hoverState === je ? e._hoverState = je : (clearTimeout(e._timeout), e._hoverState = je, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function() {
                    e._hoverState === je && e.show()
                }, e.config.delay.show) : e.show())
            }, t._leave = function(t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || g(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusout" === t.type ? Me : qe] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = He, e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function() {
                    e._hoverState === He && e.hide()
                }, e.config.delay.hide) : e.hide())
            }, t._isWithActiveTrigger = function() {
                for (var t in this._activeTrigger)
                    if (this._activeTrigger[t]) return !0;
                return !1
            }, t._getConfig = function(t) {
                var e = g(this.element).data();
                return Object.keys(e).forEach(function(t) {
                    -1 !== Oe.indexOf(t) && delete e[t]
                }), "number" == typeof(t = l({}, this.constructor.Default, e, "object" == typeof t && t ? t : {})).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), _.typeCheckConfig(be, t, this.constructor.DefaultType), t.sanitize && (t.template = Se(t.template, t.whiteList, t.sanitizeFn)), t
            }, t._getDelegateConfig = function() {
                var t = {};
                if (this.config)
                    for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t
            }, t._cleanTipClass = function() {
                var t = g(this.getTipElement()),
                    e = t.attr("class").match(Ne);
                null !== e && e.length && t.removeClass(e.join(""))
            }, t._handlePopperPlacementChange = function(t) {
                var e = t.instance;
                this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
            }, t._fixTransition = function() {
                var t = this.getTipElement(),
                    e = this.config.animation;
                null === t.getAttribute("x-placement") && (g(t).removeClass(xe), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e)
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this).data(Ie),
                        e = "object" == typeof n && n;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), g(this).data(Ie, t)), "string" == typeof n)) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return Le
                }
            }, {
                key: "NAME",
                get: function() {
                    return be
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return Ie
                }
            }, {
                key: "Event",
                get: function() {
                    return Re
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return De
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return ke
                }
            }]), i
        }();
    g.fn[be] = Be._jQueryInterface, g.fn[be].Constructor = Be, g.fn[be].noConflict = function() {
        return g.fn[be] = we, Be._jQueryInterface
    };
    var Ve = "popover",
        Ye = "bs.popover",
        ze = "." + Ye,
        Xe = g.fn[Ve],
        $e = "bs-popover",
        Ge = new RegExp("(^|\\s)" + $e + "\\S+", "g"),
        Je = l({}, Be.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        Ze = l({}, Be.DefaultType, {
            content: "(string|element|function)"
        }),
        tn = "fade",
        en = "show",
        nn = ".popover-header",
        on = ".popover-body",
        rn = {
            HIDE: "hide" + ze,
            HIDDEN: "hidden" + ze,
            SHOW: "show" + ze,
            SHOWN: "shown" + ze,
            INSERTED: "inserted" + ze,
            CLICK: "click" + ze,
            FOCUSIN: "focusin" + ze,
            FOCUSOUT: "focusout" + ze,
            MOUSEENTER: "mouseenter" + ze,
            MOUSELEAVE: "mouseleave" + ze
        },
        sn = function(t) {
            var e, n;

            function i() {
                return t.apply(this, arguments) || this
            }
            n = t, (e = i).prototype = Object.create(n.prototype), (e.prototype.constructor = e).__proto__ = n;
            var o = i.prototype;
            return o.isWithContent = function() {
                return this.getTitle() || this._getContent()
            }, o.addAttachmentClass = function(t) {
                g(this.getTipElement()).addClass($e + "-" + t)
            }, o.getTipElement = function() {
                return this.tip = this.tip || g(this.config.template)[0], this.tip
            }, o.setContent = function() {
                var t = g(this.getTipElement());
                this.setElementContent(t.find(nn), this.getTitle());
                var e = this._getContent();
                "function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(on), e), t.removeClass(tn + " " + en)
            }, o._getContent = function() {
                return this.element.getAttribute("data-content") || this.config.content
            }, o._cleanTipClass = function() {
                var t = g(this.getTipElement()),
                    e = t.attr("class").match(Ge);
                null !== e && 0 < e.length && t.removeClass(e.join(""))
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this).data(Ye),
                        e = "object" == typeof n ? n : null;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), g(this).data(Ye, t)), "string" == typeof n)) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return Je
                }
            }, {
                key: "NAME",
                get: function() {
                    return Ve
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return Ye
                }
            }, {
                key: "Event",
                get: function() {
                    return rn
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return ze
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Ze
                }
            }]), i
        }(Be);
    g.fn[Ve] = sn._jQueryInterface, g.fn[Ve].Constructor = sn, g.fn[Ve].noConflict = function() {
        return g.fn[Ve] = Xe, sn._jQueryInterface
    };
    var an = "scrollspy",
        ln = "bs.scrollspy",
        cn = "." + ln,
        hn = g.fn[an],
        un = {
            offset: 10,
            method: "auto",
            target: ""
        },
        fn = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        dn = {
            ACTIVATE: "activate" + cn,
            SCROLL: "scroll" + cn,
            LOAD_DATA_API: "load" + cn + ".data-api"
        },
        gn = "dropdown-item",
        _n = "active",
        mn = '[data-spy="scroll"]',
        pn = ".nav, .list-group",
        vn = ".nav-link",
        yn = ".nav-item",
        En = ".list-group-item",
        Cn = ".dropdown",
        Tn = ".dropdown-item",
        Sn = ".dropdown-toggle",
        bn = "offset",
        In = "position",
        Dn = function() {
            function n(t, e) {
                var n = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + vn + "," + this._config.target + " " + En + "," + this._config.target + " " + Tn, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, g(this._scrollElement).on(dn.SCROLL, function(t) {
                    return n._process(t)
                }), this.refresh(), this._process()
            }
            var t = n.prototype;
            return t.refresh = function() {
                var e = this,
                    t = this._scrollElement === this._scrollElement.window ? bn : In,
                    o = "auto" === this._config.method ? t : this._config.method,
                    r = o === In ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function(t) {
                    var e, n = _.getSelectorFromElement(t);
                    if (n && (e = document.querySelector(n)), e) {
                        var i = e.getBoundingClientRect();
                        if (i.width || i.height) return [g(e)[o]().top + r, n]
                    }
                    return null
                }).filter(function(t) {
                    return t
                }).sort(function(t, e) {
                    return t[0] - e[0]
                }).forEach(function(t) {
                    e._offsets.push(t[0]), e._targets.push(t[1])
                })
            }, t.dispose = function() {
                g.removeData(this._element, ln), g(this._scrollElement).off(cn), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, t._getConfig = function(t) {
                if ("string" != typeof(t = l({}, un, "object" == typeof t && t ? t : {})).target) {
                    var e = g(t.target).attr("id");
                    e || (e = _.getUID(an), g(t.target).attr("id", e)), t.target = "#" + e
                }
                return _.typeCheckConfig(an, t, fn), t
            }, t._getScrollTop = function() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, t._getScrollHeight = function() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, t._getOffsetHeight = function() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, t._process = function() {
                var t = this._getScrollTop() + this._config.offset,
                    e = this._getScrollHeight(),
                    n = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), n <= t) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                    for (var o = this._offsets.length; o--;) {
                        this._activeTarget !== this._targets[o] && t >= this._offsets[o] && ("undefined" == typeof this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
                    }
                }
            }, t._activate = function(e) {
                this._activeTarget = e, this._clear();
                var t = this._selector.split(",").map(function(t) {
                        return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                    }),
                    n = g([].slice.call(document.querySelectorAll(t.join(","))));
                n.hasClass(gn) ? (n.closest(Cn).find(Sn).addClass(_n), n.addClass(_n)) : (n.addClass(_n), n.parents(pn).prev(vn + ", " + En).addClass(_n), n.parents(pn).prev(yn).children(vn).addClass(_n)), g(this._scrollElement).trigger(dn.ACTIVATE, {
                    relatedTarget: e
                })
            }, t._clear = function() {
                [].slice.call(document.querySelectorAll(this._selector)).filter(function(t) {
                    return t.classList.contains(_n)
                }).forEach(function(t) {
                    return t.classList.remove(_n)
                })
            }, n._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = g(this).data(ln);
                    if (t || (t = new n(this, "object" == typeof e && e), g(this).data(ln, t)), "string" == typeof e) {
                        if ("undefined" == typeof t[e]) throw new TypeError('No method named "' + e + '"');
                        t[e]()
                    }
                })
            }, s(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return un
                }
            }]), n
        }();
    g(window).on(dn.LOAD_DATA_API, function() {
        for (var t = [].slice.call(document.querySelectorAll(mn)), e = t.length; e--;) {
            var n = g(t[e]);
            Dn._jQueryInterface.call(n, n.data())
        }
    }), g.fn[an] = Dn._jQueryInterface, g.fn[an].Constructor = Dn, g.fn[an].noConflict = function() {
        return g.fn[an] = hn, Dn._jQueryInterface
    };
    var wn = "bs.tab",
        An = "." + wn,
        Nn = g.fn.tab,
        On = {
            HIDE: "hide" + An,
            HIDDEN: "hidden" + An,
            SHOW: "show" + An,
            SHOWN: "shown" + An,
            CLICK_DATA_API: "click" + An + ".data-api"
        },
        kn = "dropdown-menu",
        Pn = "active",
        Ln = "disabled",
        jn = "fade",
        Hn = "show",
        Rn = ".dropdown",
        xn = ".nav, .list-group",
        Fn = ".active",
        Un = "> li > .active",
        Wn = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        qn = ".dropdown-toggle",
        Mn = "> .dropdown-menu .active",
        Kn = function() {
            function i(t) {
                this._element = t
            }
            var t = i.prototype;
            return t.show = function() {
                var n = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && g(this._element).hasClass(Pn) || g(this._element).hasClass(Ln))) {
                    var t, i, e = g(this._element).closest(xn)[0],
                        o = _.getSelectorFromElement(this._element);
                    if (e) {
                        var r = "UL" === e.nodeName || "OL" === e.nodeName ? Un : Fn;
                        i = (i = g.makeArray(g(e).find(r)))[i.length - 1]
                    }
                    var s = g.Event(On.HIDE, {
                            relatedTarget: this._element
                        }),
                        a = g.Event(On.SHOW, {
                            relatedTarget: i
                        });
                    if (i && g(i).trigger(s), g(this._element).trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                        o && (t = document.querySelector(o)), this._activate(this._element, e);
                        var l = function() {
                            var t = g.Event(On.HIDDEN, {
                                    relatedTarget: n._element
                                }),
                                e = g.Event(On.SHOWN, {
                                    relatedTarget: i
                                });
                            g(i).trigger(t), g(n._element).trigger(e)
                        };
                        t ? this._activate(t, t.parentNode, l) : l()
                    }
                }
            }, t.dispose = function() {
                g.removeData(this._element, wn), this._element = null
            }, t._activate = function(t, e, n) {
                var i = this,
                    o = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? g(e).children(Fn) : g(e).find(Un))[0],
                    r = n && o && g(o).hasClass(jn),
                    s = function() {
                        return i._transitionComplete(t, o, n)
                    };
                if (o && r) {
                    var a = _.getTransitionDurationFromElement(o);
                    g(o).removeClass(Hn).one(_.TRANSITION_END, s).emulateTransitionEnd(a)
                } else s()
            }, t._transitionComplete = function(t, e, n) {
                if (e) {
                    g(e).removeClass(Pn);
                    var i = g(e.parentNode).find(Mn)[0];
                    i && g(i).removeClass(Pn), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
                }
                if (g(t).addClass(Pn), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), _.reflow(t), t.classList.contains(jn) && t.classList.add(Hn), t.parentNode && g(t.parentNode).hasClass(kn)) {
                    var o = g(t).closest(Rn)[0];
                    if (o) {
                        var r = [].slice.call(o.querySelectorAll(qn));
                        g(r).addClass(Pn)
                    }
                    t.setAttribute("aria-expanded", !0)
                }
                n && n()
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this),
                        e = t.data(wn);
                    if (e || (e = new i(this), t.data(wn, e)), "string" == typeof n) {
                        if ("undefined" == typeof e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }]), i
        }();
    g(document).on(On.CLICK_DATA_API, Wn, function(t) {
        t.preventDefault(), Kn._jQueryInterface.call(g(this), "show")
    }), g.fn.tab = Kn._jQueryInterface, g.fn.tab.Constructor = Kn, g.fn.tab.noConflict = function() {
        return g.fn.tab = Nn, Kn._jQueryInterface
    };
    var Qn = "toast",
        Bn = "bs.toast",
        Vn = "." + Bn,
        Yn = g.fn[Qn],
        zn = {
            CLICK_DISMISS: "click.dismiss" + Vn,
            HIDE: "hide" + Vn,
            HIDDEN: "hidden" + Vn,
            SHOW: "show" + Vn,
            SHOWN: "shown" + Vn
        },
        Xn = "fade",
        $n = "hide",
        Gn = "show",
        Jn = "showing",
        Zn = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        ti = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        ei = '[data-dismiss="toast"]',
        ni = function() {
            function i(t, e) {
                this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
            }
            var t = i.prototype;
            return t.show = function() {
                var t = this;
                g(this._element).trigger(zn.SHOW), this._config.animation && this._element.classList.add(Xn);
                var e = function() {
                    t._element.classList.remove(Jn), t._element.classList.add(Gn), g(t._element).trigger(zn.SHOWN), t._config.autohide && t.hide()
                };
                if (this._element.classList.remove($n), this._element.classList.add(Jn), this._config.animation) {
                    var n = _.getTransitionDurationFromElement(this._element);
                    g(this._element).one(_.TRANSITION_END, e).emulateTransitionEnd(n)
                } else e()
            }, t.hide = function(t) {
                var e = this;
                this._element.classList.contains(Gn) && (g(this._element).trigger(zn.HIDE), t ? this._close() : this._timeout = setTimeout(function() {
                    e._close()
                }, this._config.delay))
            }, t.dispose = function() {
                clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(Gn) && this._element.classList.remove(Gn), g(this._element).off(zn.CLICK_DISMISS), g.removeData(this._element, Bn), this._element = null, this._config = null
            }, t._getConfig = function(t) {
                return t = l({}, ti, g(this._element).data(), "object" == typeof t && t ? t : {}), _.typeCheckConfig(Qn, t, this.constructor.DefaultType), t
            }, t._setListeners = function() {
                var t = this;
                g(this._element).on(zn.CLICK_DISMISS, ei, function() {
                    return t.hide(!0)
                })
            }, t._close = function() {
                var t = this,
                    e = function() {
                        t._element.classList.add($n), g(t._element).trigger(zn.HIDDEN)
                    };
                if (this._element.classList.remove(Gn), this._config.animation) {
                    var n = _.getTransitionDurationFromElement(this._element);
                    g(this._element).one(_.TRANSITION_END, e).emulateTransitionEnd(n)
                } else e()
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this),
                        e = t.data(Bn);
                    if (e || (e = new i(this, "object" == typeof n && n), t.data(Bn, e)), "string" == typeof n) {
                        if ("undefined" == typeof e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n](this)
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Zn
                }
            }, {
                key: "Default",
                get: function() {
                    return ti
                }
            }]), i
        }();
    g.fn[Qn] = ni._jQueryInterface, g.fn[Qn].Constructor = ni, g.fn[Qn].noConflict = function() {
            return g.fn[Qn] = Yn, ni._jQueryInterface
        },
        function() {
            if ("undefined" == typeof g) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var t = g.fn.jquery.split(" ")[0].split(".");
            if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || 4 <= t[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
        }(), t.Util = _, t.Alert = p, t.Button = P, t.Carousel = lt, t.Collapse = bt, t.Dropdown = Jt, t.Modal = ve, t.Popover = sn, t.Scrollspy = Dn, t.Tab = Kn, t.Toast = ni, t.Tooltip = Be, Object.defineProperty(t, "__esModule", {
            value: !0
        })
});
//# sourceMappingURL=bootstrap.min.js.map











/*!
 * The Final Countdown for jQuery v2.2.0
 * http://hilios.github.io/jQuery.countdown/
 * Copyright (c) 2016 Edson Hilios
 */
! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    "use strict";

    function b(a) {
        if (a instanceof Date) return a;
        if (String(a).match(g)) return String(a).match(/^[0-9]*$/) && (a = Number(a)), String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")), new Date(a);
        throw new Error("Couldn't cast `" + a + "` to a date object.")
    }

    function c(a) {
        var b = a.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(b)
    }

    function d(a) {
        return function(b) {
            var d = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (d)
                for (var f = 0, g = d.length; f < g; ++f) {
                    var h = d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                        j = c(h[0]),
                        k = h[1] || "",
                        l = h[3] || "",
                        m = null;
                    h = h[2], i.hasOwnProperty(h) && (m = i[h], m = Number(a[m])), null !== m && ("!" === k && (m = e(l, m)), "" === k && m < 10 && (m = "0" + m.toString()), b = b.replace(j, m.toString()))
                }
            return b = b.replace(/%%/, "%")
        }
    }

    function e(a, b) {
        var c = "s",
            d = "";
        return a && (a = a.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === a.length ? c = a[0] : (d = a[0], c = a[1])), Math.abs(b) > 1 ? c : d
    }
    var f = [],
        g = [],
        h = {
            precision: 100,
            elapse: !1,
            defer: !1
        };
    g.push(/^[0-9]*$/.source), g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g = new RegExp(g.join("|"));
    var i = {
            Y: "years",
            m: "months",
            n: "daysToMonth",
            d: "daysToWeek",
            w: "weeks",
            W: "weeksToMonth",
            H: "hours",
            M: "minutes",
            S: "seconds",
            D: "totalDays",
            I: "totalHours",
            N: "totalMinutes",
            T: "totalSeconds"
        },
        j = function(b, c, d) {
            this.el = b, this.$el = a(b), this.interval = null, this.offset = {}, this.options = a.extend({}, h), this.firstTick = !0, this.instanceNumber = f.length, f.push(this), this.$el.data("countdown-instance", this.instanceNumber), d && ("function" == typeof d ? (this.$el.on("update.countdown", d), this.$el.on("stoped.countdown", d), this.$el.on("finish.countdown", d)) : this.options = a.extend({}, h, d)), this.setFinalDate(c), this.options.defer === !1 && this.start()
        };
    a.extend(j.prototype, {
        start: function() {
            null !== this.interval && clearInterval(this.interval);
            var a = this;
            this.update(), this.interval = setInterval(function() {
                a.update.call(a)
            }, this.options.precision)
        },
        stop: function() {
            clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
        },
        toggle: function() {
            this.interval ? this.stop() : this.start()
        },
        pause: function() {
            this.stop()
        },
        resume: function() {
            this.start()
        },
        remove: function() {
            this.stop.call(this), f[this.instanceNumber] = null, delete this.$el.data().countdownInstance
        },
        setFinalDate: function(a) {
            this.finalDate = b(a)
        },
        update: function() {
            if (0 === this.$el.closest("html").length) return void this.remove();
            var a, b = new Date;
            return a = this.finalDate.getTime() - b.getTime(), a = Math.ceil(a / 1e3), a = !this.options.elapse && a < 0 ? 0 : Math.abs(a), this.totalSecsLeft === a || this.firstTick ? void(this.firstTick = !1) : (this.totalSecsLeft = a, this.elapsed = b >= this.finalDate, this.offset = {
                seconds: this.totalSecsLeft % 60,
                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                years: Math.abs(this.finalDate.getFullYear() - b.getFullYear()),
                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                totalMinutes: Math.floor(this.totalSecsLeft / 60),
                totalSeconds: this.totalSecsLeft
            }, void(this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish"))))
        },
        dispatchEvent: function(b) {
            var c = a.Event(b + ".countdown");
            c.finalDate = this.finalDate, c.elapsed = this.elapsed, c.offset = a.extend({}, this.offset), c.strftime = d(this.offset), this.$el.trigger(c)
        }
    }), a.fn.countdown = function() {
        var b = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            var c = a(this).data("countdown-instance");
            if (void 0 !== c) {
                var d = f[c],
                    e = b[0];
                j.prototype.hasOwnProperty(e) ? d[e].apply(d, b.slice(1)) : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (d.setFinalDate.call(d, e), d.start()) : a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, e))
            } else new j(this, b[0], b[1])
        })
    }
});


















/*! jQuery v3.3.1 | (c) JS Foundation and other contributors | jquery.org/license */ ! function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";
    var n = [],
        r = e.document,
        i = Object.getPrototypeOf,
        o = n.slice,
        a = n.concat,
        s = n.push,
        u = n.indexOf,
        l = {},
        c = l.toString,
        f = l.hasOwnProperty,
        p = f.toString,
        d = p.call(Object),
        h = {},
        g = function e(t) {
            return "function" == typeof t && "number" != typeof t.nodeType
        },
        y = function e(t) {
            return null != t && t === t.window
        },
        v = {
            type: !0,
            src: !0,
            noModule: !0
        };

    function m(e, t, n) {
        var i, o = (t = t || r).createElement("script");
        if (o.text = e, n)
            for (i in v) n[i] && (o[i] = n[i]);
        t.head.appendChild(o).parentNode.removeChild(o)
    }

    function x(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[c.call(e)] || "object" : typeof e
    }
    var b = "3.3.1",
        w = function(e, t) {
            return new w.fn.init(e, t)
        },
        T = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    w.fn = w.prototype = {
        jquery: "3.3.1",
        constructor: w,
        length: 0,
        toArray: function() {
            return o.call(this)
        },
        get: function(e) {
            return null == e ? o.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = w.merge(this.constructor(), e);
            return t.prevObject = this, t
        },
        each: function(e) {
            return w.each(this, e)
        },
        map: function(e) {
            return this.pushStack(w.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(o.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: s,
        sort: n.sort,
        splice: n.splice
    }, w.extend = w.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {},
            s = 1,
            u = arguments.length,
            l = !1;
        for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || g(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
            if (null != (e = arguments[s]))
                for (t in e) n = a[t], a !== (r = e[t]) && (l && r && (w.isPlainObject(r) || (i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n) ? n : []) : o = n && w.isPlainObject(n) ? n : {}, a[t] = w.extend(l, o, r)) : void 0 !== r && (a[t] = r));
        return a
    }, w.extend({
        expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== c.call(e)) && (!(t = i(e)) || "function" == typeof(n = f.call(t, "constructor") && t.constructor) && p.call(n) === d)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        globalEval: function(e) {
            m(e)
        },
        each: function(e, t) {
            var n, r = 0;
            if (C(e)) {
                for (n = e.length; r < n; r++)
                    if (!1 === t.call(e[r], r, e[r])) break
            } else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r])) break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(T, "")
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (C(Object(e)) ? w.merge(n, "string" == typeof e ? [e] : e) : s.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : u.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            for (var r, i = [], o = 0, a = e.length, s = !n; o < a; o++)(r = !t(e[o], o)) !== s && i.push(e[o]);
            return i
        },
        map: function(e, t, n) {
            var r, i, o = 0,
                s = [];
            if (C(e))
                for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && s.push(i);
            else
                for (o in e) null != (i = t(e[o], o, n)) && s.push(i);
            return a.apply([], s)
        },
        guid: 1,
        support: h
    }), "function" == typeof Symbol && (w.fn[Symbol.iterator] = n[Symbol.iterator]), w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        l["[object " + t + "]"] = t.toLowerCase()
    });

    function C(e) {
        var t = !!e && "length" in e && e.length,
            n = x(e);
        return !g(e) && !y(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }
    var E = function(e) {
        var t, n, r, i, o, a, s, u, l, c, f, p, d, h, g, y, v, m, x, b = "sizzle" + 1 * new Date,
            w = e.document,
            T = 0,
            C = 0,
            E = ae(),
            k = ae(),
            S = ae(),
            D = function(e, t) {
                return e === t && (f = !0), 0
            },
            N = {}.hasOwnProperty,
            A = [],
            j = A.pop,
            q = A.push,
            L = A.push,
            H = A.slice,
            O = function(e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                    if (e[n] === t) return n;
                return -1
            },
            P = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            M = "[\\x20\\t\\r\\n\\f]",
            R = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            I = "\\[" + M + "*(" + R + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + M + "*\\]",
            W = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + I + ")*)|.*)\\)|)",
            $ = new RegExp(M + "+", "g"),
            B = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
            F = new RegExp("^" + M + "*," + M + "*"),
            _ = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
            z = new RegExp("=" + M + "*([^\\]'\"]*?)" + M + "*\\]", "g"),
            X = new RegExp(W),
            U = new RegExp("^" + R + "$"),
            V = {
                ID: new RegExp("^#(" + R + ")"),
                CLASS: new RegExp("^\\.(" + R + ")"),
                TAG: new RegExp("^(" + R + "|[*])"),
                ATTR: new RegExp("^" + I),
                PSEUDO: new RegExp("^" + W),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + P + ")$", "i"),
                needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
            },
            G = /^(?:input|select|textarea|button)$/i,
            Y = /^h\d$/i,
            Q = /^[^{]+\{\s*\[native \w/,
            J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            K = /[+~]/,
            Z = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
            ee = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            },
            te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            ne = function(e, t) {
                return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            },
            re = function() {
                p()
            },
            ie = me(function(e) {
                return !0 === e.disabled && ("form" in e || "label" in e)
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            L.apply(A = H.call(w.childNodes), w.childNodes), A[w.childNodes.length].nodeType
        } catch (e) {
            L = {
                apply: A.length ? function(e, t) {
                    q.apply(e, H.call(t))
                } : function(e, t) {
                    var n = e.length,
                        r = 0;
                    while (e[n++] = t[r++]);
                    e.length = n - 1
                }
            }
        }

        function oe(e, t, r, i) {
            var o, s, l, c, f, h, v, m = t && t.ownerDocument,
                T = t ? t.nodeType : 9;
            if (r = r || [], "string" != typeof e || !e || 1 !== T && 9 !== T && 11 !== T) return r;
            if (!i && ((t ? t.ownerDocument || t : w) !== d && p(t), t = t || d, g)) {
                if (11 !== T && (f = J.exec(e)))
                    if (o = f[1]) {
                        if (9 === T) {
                            if (!(l = t.getElementById(o))) return r;
                            if (l.id === o) return r.push(l), r
                        } else if (m && (l = m.getElementById(o)) && x(t, l) && l.id === o) return r.push(l), r
                    } else {
                        if (f[2]) return L.apply(r, t.getElementsByTagName(e)), r;
                        if ((o = f[3]) && n.getElementsByClassName && t.getElementsByClassName) return L.apply(r, t.getElementsByClassName(o)), r
                    } if (n.qsa && !S[e + " "] && (!y || !y.test(e))) {
                    if (1 !== T) m = t, v = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        (c = t.getAttribute("id")) ? c = c.replace(te, ne): t.setAttribute("id", c = b), s = (h = a(e)).length;
                        while (s--) h[s] = "#" + c + " " + ve(h[s]);
                        v = h.join(","), m = K.test(e) && ge(t.parentNode) || t
                    }
                    if (v) try {
                        return L.apply(r, m.querySelectorAll(v)), r
                    } catch (e) {} finally {
                        c === b && t.removeAttribute("id")
                    }
                }
            }
            return u(e.replace(B, "$1"), t, r, i)
        }

        function ae() {
            var e = [];

            function t(n, i) {
                return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
            }
            return t
        }

        function se(e) {
            return e[b] = !0, e
        }

        function ue(e) {
            var t = d.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function le(e, t) {
            var n = e.split("|"),
                i = n.length;
            while (i--) r.attrHandle[n[i]] = t
        }

        function ce(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r) return r;
            if (n)
                while (n = n.nextSibling)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function fe(e) {
            return function(t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }

        function pe(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function de(e) {
            return function(t) {
                return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ie(t) === e : t.disabled === e : "label" in t && t.disabled === e
            }
        }

        function he(e) {
            return se(function(t) {
                return t = +t, se(function(n, r) {
                    var i, o = e([], n.length, t),
                        a = o.length;
                    while (a--) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function ge(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }
        n = oe.support = {}, o = oe.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, p = oe.setDocument = function(e) {
            var t, i, a = e ? e.ownerDocument || e : w;
            return a !== d && 9 === a.nodeType && a.documentElement ? (d = a, h = d.documentElement, g = !o(d), w !== d && (i = d.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", re, !1) : i.attachEvent && i.attachEvent("onunload", re)), n.attributes = ue(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), n.getElementsByTagName = ue(function(e) {
                return e.appendChild(d.createComment("")), !e.getElementsByTagName("*").length
            }), n.getElementsByClassName = Q.test(d.getElementsByClassName), n.getById = ue(function(e) {
                return h.appendChild(e).id = b, !d.getElementsByName || !d.getElementsByName(b).length
            }), n.getById ? (r.filter.ID = function(e) {
                var t = e.replace(Z, ee);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }, r.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && g) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }) : (r.filter.ID = function(e) {
                var t = e.replace(Z, ee);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }, r.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && g) {
                    var n, r, i, o = t.getElementById(e);
                    if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                        i = t.getElementsByName(e), r = 0;
                        while (o = i[r++])
                            if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
                    }
                    return []
                }
            }), r.find.TAG = n.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var n, r = [],
                    i = 0,
                    o = t.getElementsByTagName(e);
                if ("*" === e) {
                    while (n = o[i++]) 1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }, r.find.CLASS = n.getElementsByClassName && function(e, t) {
                if ("undefined" != typeof t.getElementsByClassName && g) return t.getElementsByClassName(e)
            }, v = [], y = [], (n.qsa = Q.test(d.querySelectorAll)) && (ue(function(e) {
                h.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && y.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || y.push("\\[" + M + "*(?:value|" + P + ")"), e.querySelectorAll("[id~=" + b + "-]").length || y.push("~="), e.querySelectorAll(":checked").length || y.push(":checked"), e.querySelectorAll("a#" + b + "+*").length || y.push(".#.+[+~]")
            }), ue(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = d.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && y.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && y.push(":enabled", ":disabled"), h.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && y.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), y.push(",.*:")
            })), (n.matchesSelector = Q.test(m = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ue(function(e) {
                n.disconnectedMatch = m.call(e, "*"), m.call(e, "[s!='']:x"), v.push("!=", W)
            }), y = y.length && new RegExp(y.join("|")), v = v.length && new RegExp(v.join("|")), t = Q.test(h.compareDocumentPosition), x = t || Q.test(h.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function(e, t) {
                if (t)
                    while (t = t.parentNode)
                        if (t === e) return !0;
                return !1
            }, D = t ? function(e, t) {
                if (e === t) return f = !0, 0;
                var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return r || (1 & (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === d || e.ownerDocument === w && x(w, e) ? -1 : t === d || t.ownerDocument === w && x(w, t) ? 1 : c ? O(c, e) - O(c, t) : 0 : 4 & r ? -1 : 1)
            } : function(e, t) {
                if (e === t) return f = !0, 0;
                var n, r = 0,
                    i = e.parentNode,
                    o = t.parentNode,
                    a = [e],
                    s = [t];
                if (!i || !o) return e === d ? -1 : t === d ? 1 : i ? -1 : o ? 1 : c ? O(c, e) - O(c, t) : 0;
                if (i === o) return ce(e, t);
                n = e;
                while (n = n.parentNode) a.unshift(n);
                n = t;
                while (n = n.parentNode) s.unshift(n);
                while (a[r] === s[r]) r++;
                return r ? ce(a[r], s[r]) : a[r] === w ? -1 : s[r] === w ? 1 : 0
            }, d) : d
        }, oe.matches = function(e, t) {
            return oe(e, null, null, t)
        }, oe.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== d && p(e), t = t.replace(z, "='$1']"), n.matchesSelector && g && !S[t + " "] && (!v || !v.test(t)) && (!y || !y.test(t))) try {
                var r = m.call(e, t);
                if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch (e) {}
            return oe(t, d, null, [e]).length > 0
        }, oe.contains = function(e, t) {
            return (e.ownerDocument || e) !== d && p(e), x(e, t)
        }, oe.attr = function(e, t) {
            (e.ownerDocument || e) !== d && p(e);
            var i = r.attrHandle[t.toLowerCase()],
                o = i && N.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !g) : void 0;
            return void 0 !== o ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
        }, oe.escape = function(e) {
            return (e + "").replace(te, ne)
        }, oe.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, oe.uniqueSort = function(e) {
            var t, r = [],
                i = 0,
                o = 0;
            if (f = !n.detectDuplicates, c = !n.sortStable && e.slice(0), e.sort(D), f) {
                while (t = e[o++]) t === e[o] && (i = r.push(o));
                while (i--) e.splice(r[i], 1)
            }
            return c = null, e
        }, i = oe.getText = function(e) {
            var t, n = "",
                r = 0,
                o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
                } else if (3 === o || 4 === o) return e.nodeValue
            } else
                while (t = e[r++]) n += i(t);
            return n
        }, (r = oe.selectors = {
            cacheLength: 50,
            createPseudo: se,
            match: V,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(Z, ee), e[3] = (e[3] || e[4] || e[5] || "").replace(Z, ee), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || oe.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && oe.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return V.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(Z, ee).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = E[e + " "];
                    return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && E(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, t, n) {
                    return function(r) {
                        var i = oe.attr(r, e);
                        return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace($, " ") + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"))
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3),
                        a = "last" !== e.slice(-4),
                        s = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, u) {
                        var l, c, f, p, d, h, g = o !== a ? "nextSibling" : "previousSibling",
                            y = t.parentNode,
                            v = s && t.nodeName.toLowerCase(),
                            m = !u && !s,
                            x = !1;
                        if (y) {
                            if (o) {
                                while (g) {
                                    p = t;
                                    while (p = p[g])
                                        if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1;
                                    h = g = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? y.firstChild : y.lastChild], a && m) {
                                x = (d = (l = (c = (f = (p = y)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]) && l[2], p = d && y.childNodes[d];
                                while (p = ++d && p && p[g] || (x = d = 0) || h.pop())
                                    if (1 === p.nodeType && ++x && p === t) {
                                        c[e] = [T, d, x];
                                        break
                                    }
                            } else if (m && (x = d = (l = (c = (f = (p = t)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]), !1 === x)
                                while (p = ++d && p && p[g] || (x = d = 0) || h.pop())
                                    if ((s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) && ++x && (m && ((c = (f = p[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] = [T, x]), p === t)) break;
                            return (x -= i) === r || x % r == 0 && x / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e);
                    return i[b] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? se(function(e, n) {
                        var r, o = i(e, t),
                            a = o.length;
                        while (a--) e[r = O(e, o[a])] = !(n[r] = o[a])
                    }) : function(e) {
                        return i(e, 0, n)
                    }) : i
                }
            },
            pseudos: {
                not: se(function(e) {
                    var t = [],
                        n = [],
                        r = s(e.replace(B, "$1"));
                    return r[b] ? se(function(e, t, n, i) {
                        var o, a = r(e, null, i, []),
                            s = e.length;
                        while (s--)(o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function(e, i, o) {
                        return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                    }
                }),
                has: se(function(e) {
                    return function(t) {
                        return oe(e, t).length > 0
                    }
                }),
                contains: se(function(e) {
                    return e = e.replace(Z, ee),
                        function(t) {
                            return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                        }
                }),
                lang: se(function(e) {
                    return U.test(e || "") || oe.error("unsupported lang: " + e), e = e.replace(Z, ee).toLowerCase(),
                        function(t) {
                            var n;
                            do {
                                if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                            } while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === h
                },
                focus: function(e) {
                    return e === d.activeElement && (!d.hasFocus || d.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: de(!1),
                disabled: de(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !r.pseudos.empty(e)
                },
                header: function(e) {
                    return Y.test(e.nodeName)
                },
                input: function(e) {
                    return G.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: he(function() {
                    return [0]
                }),
                last: he(function(e, t) {
                    return [t - 1]
                }),
                eq: he(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: he(function(e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e
                }),
                odd: he(function(e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e
                }),
                lt: he(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: he(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                    return e
                })
            }
        }).pseudos.nth = r.pseudos.eq;
        for (t in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) r.pseudos[t] = fe(t);
        for (t in {
                submit: !0,
                reset: !0
            }) r.pseudos[t] = pe(t);

        function ye() {}
        ye.prototype = r.filters = r.pseudos, r.setFilters = new ye, a = oe.tokenize = function(e, t) {
            var n, i, o, a, s, u, l, c = k[e + " "];
            if (c) return t ? 0 : c.slice(0);
            s = e, u = [], l = r.preFilter;
            while (s) {
                n && !(i = F.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), n = !1, (i = _.exec(s)) && (n = i.shift(), o.push({
                    value: n,
                    type: i[0].replace(B, " ")
                }), s = s.slice(n.length));
                for (a in r.filter) !(i = V[a].exec(s)) || l[a] && !(i = l[a](i)) || (n = i.shift(), o.push({
                    value: n,
                    type: a,
                    matches: i
                }), s = s.slice(n.length));
                if (!n) break
            }
            return t ? s.length : s ? oe.error(e) : k(e, u).slice(0)
        };

        function ve(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
            return r
        }

        function me(e, t, n) {
            var r = t.dir,
                i = t.next,
                o = i || r,
                a = n && "parentNode" === o,
                s = C++;
            return t.first ? function(t, n, i) {
                while (t = t[r])
                    if (1 === t.nodeType || a) return e(t, n, i);
                return !1
            } : function(t, n, u) {
                var l, c, f, p = [T, s];
                if (u) {
                    while (t = t[r])
                        if ((1 === t.nodeType || a) && e(t, n, u)) return !0
                } else
                    while (t = t[r])
                        if (1 === t.nodeType || a)
                            if (f = t[b] || (t[b] = {}), c = f[t.uniqueID] || (f[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[r] || t;
                            else {
                                if ((l = c[o]) && l[0] === T && l[1] === s) return p[2] = l[2];
                                if (c[o] = p, p[2] = e(t, n, u)) return !0
                            } return !1
            }
        }

        function xe(e) {
            return e.length > 1 ? function(t, n, r) {
                var i = e.length;
                while (i--)
                    if (!e[i](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function be(e, t, n) {
            for (var r = 0, i = t.length; r < i; r++) oe(e, t[r], n);
            return n
        }

        function we(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
            return a
        }

        function Te(e, t, n, r, i, o) {
            return r && !r[b] && (r = Te(r)), i && !i[b] && (i = Te(i, o)), se(function(o, a, s, u) {
                var l, c, f, p = [],
                    d = [],
                    h = a.length,
                    g = o || be(t || "*", s.nodeType ? [s] : s, []),
                    y = !e || !o && t ? g : we(g, p, e, s, u),
                    v = n ? i || (o ? e : h || r) ? [] : a : y;
                if (n && n(y, v, s, u), r) {
                    l = we(v, d), r(l, [], s, u), c = l.length;
                    while (c--)(f = l[c]) && (v[d[c]] = !(y[d[c]] = f))
                }
                if (o) {
                    if (i || e) {
                        if (i) {
                            l = [], c = v.length;
                            while (c--)(f = v[c]) && l.push(y[c] = f);
                            i(null, v = [], l, u)
                        }
                        c = v.length;
                        while (c--)(f = v[c]) && (l = i ? O(o, f) : p[c]) > -1 && (o[l] = !(a[l] = f))
                    }
                } else v = we(v === a ? v.splice(h, v.length) : v), i ? i(null, a, v, u) : L.apply(a, v)
            })
        }

        function Ce(e) {
            for (var t, n, i, o = e.length, a = r.relative[e[0].type], s = a || r.relative[" "], u = a ? 1 : 0, c = me(function(e) {
                    return e === t
                }, s, !0), f = me(function(e) {
                    return O(t, e) > -1
                }, s, !0), p = [function(e, n, r) {
                    var i = !a && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : f(e, n, r));
                    return t = null, i
                }]; u < o; u++)
                if (n = r.relative[e[u].type]) p = [me(xe(p), n)];
                else {
                    if ((n = r.filter[e[u].type].apply(null, e[u].matches))[b]) {
                        for (i = ++u; i < o; i++)
                            if (r.relative[e[i].type]) break;
                        return Te(u > 1 && xe(p), u > 1 && ve(e.slice(0, u - 1).concat({
                            value: " " === e[u - 2].type ? "*" : ""
                        })).replace(B, "$1"), n, u < i && Ce(e.slice(u, i)), i < o && Ce(e = e.slice(i)), i < o && ve(e))
                    }
                    p.push(n)
                } return xe(p)
        }

        function Ee(e, t) {
            var n = t.length > 0,
                i = e.length > 0,
                o = function(o, a, s, u, c) {
                    var f, h, y, v = 0,
                        m = "0",
                        x = o && [],
                        b = [],
                        w = l,
                        C = o || i && r.find.TAG("*", c),
                        E = T += null == w ? 1 : Math.random() || .1,
                        k = C.length;
                    for (c && (l = a === d || a || c); m !== k && null != (f = C[m]); m++) {
                        if (i && f) {
                            h = 0, a || f.ownerDocument === d || (p(f), s = !g);
                            while (y = e[h++])
                                if (y(f, a || d, s)) {
                                    u.push(f);
                                    break
                                } c && (T = E)
                        }
                        n && ((f = !y && f) && v--, o && x.push(f))
                    }
                    if (v += m, n && m !== v) {
                        h = 0;
                        while (y = t[h++]) y(x, b, a, s);
                        if (o) {
                            if (v > 0)
                                while (m--) x[m] || b[m] || (b[m] = j.call(u));
                            b = we(b)
                        }
                        L.apply(u, b), c && !o && b.length > 0 && v + t.length > 1 && oe.uniqueSort(u)
                    }
                    return c && (T = E, l = w), x
                };
            return n ? se(o) : o
        }
        return s = oe.compile = function(e, t) {
            var n, r = [],
                i = [],
                o = S[e + " "];
            if (!o) {
                t || (t = a(e)), n = t.length;
                while (n--)(o = Ce(t[n]))[b] ? r.push(o) : i.push(o);
                (o = S(e, Ee(i, r))).selector = e
            }
            return o
        }, u = oe.select = function(e, t, n, i) {
            var o, u, l, c, f, p = "function" == typeof e && e,
                d = !i && a(e = p.selector || e);
            if (n = n || [], 1 === d.length) {
                if ((u = d[0] = d[0].slice(0)).length > 2 && "ID" === (l = u[0]).type && 9 === t.nodeType && g && r.relative[u[1].type]) {
                    if (!(t = (r.find.ID(l.matches[0].replace(Z, ee), t) || [])[0])) return n;
                    p && (t = t.parentNode), e = e.slice(u.shift().value.length)
                }
                o = V.needsContext.test(e) ? 0 : u.length;
                while (o--) {
                    if (l = u[o], r.relative[c = l.type]) break;
                    if ((f = r.find[c]) && (i = f(l.matches[0].replace(Z, ee), K.test(u[0].type) && ge(t.parentNode) || t))) {
                        if (u.splice(o, 1), !(e = i.length && ve(u))) return L.apply(n, i), n;
                        break
                    }
                }
            }
            return (p || s(e, d))(i, t, !g, n, !t || K.test(e) && ge(t.parentNode) || t), n
        }, n.sortStable = b.split("").sort(D).join("") === b, n.detectDuplicates = !!f, p(), n.sortDetached = ue(function(e) {
            return 1 & e.compareDocumentPosition(d.createElement("fieldset"))
        }), ue(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || le("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), n.attributes && ue(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || le("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), ue(function(e) {
            return null == e.getAttribute("disabled")
        }) || le(P, function(e, t, n) {
            var r;
            if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), oe
    }(e);
    w.find = E, w.expr = E.selectors, w.expr[":"] = w.expr.pseudos, w.uniqueSort = w.unique = E.uniqueSort, w.text = E.getText, w.isXMLDoc = E.isXML, w.contains = E.contains, w.escapeSelector = E.escape;
    var k = function(e, t, n) {
            var r = [],
                i = void 0 !== n;
            while ((e = e[t]) && 9 !== e.nodeType)
                if (1 === e.nodeType) {
                    if (i && w(e).is(n)) break;
                    r.push(e)
                } return r
        },
        S = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        D = w.expr.match.needsContext;

    function N(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

    function j(e, t, n) {
        return g(t) ? w.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        }) : t.nodeType ? w.grep(e, function(e) {
            return e === t !== n
        }) : "string" != typeof t ? w.grep(e, function(e) {
            return u.call(t, e) > -1 !== n
        }) : w.filter(t, e, n)
    }
    w.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? w.find.matchesSelector(r, e) ? [r] : [] : w.find.matches(e, w.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, w.fn.extend({
        find: function(e) {
            var t, n, r = this.length,
                i = this;
            if ("string" != typeof e) return this.pushStack(w(e).filter(function() {
                for (t = 0; t < r; t++)
                    if (w.contains(i[t], this)) return !0
            }));
            for (n = this.pushStack([]), t = 0; t < r; t++) w.find(e, i[t], n);
            return r > 1 ? w.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(j(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(j(this, e || [], !0))
        },
        is: function(e) {
            return !!j(this, "string" == typeof e && D.test(e) ? w(e) : e || [], !1).length
        }
    });
    var q, L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (w.fn.init = function(e, t, n) {
        var i, o;
        if (!e) return this;
        if (n = n || q, "string" == typeof e) {
            if (!(i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : L.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (i[1]) {
                if (t = t instanceof w ? t[0] : t, w.merge(this, w.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : r, !0)), A.test(i[1]) && w.isPlainObject(t))
                    for (i in t) g(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                return this
            }
            return (o = r.getElementById(i[2])) && (this[0] = o, this.length = 1), this
        }
        return e.nodeType ? (this[0] = e, this.length = 1, this) : g(e) ? void 0 !== n.ready ? n.ready(e) : e(w) : w.makeArray(e, this)
    }).prototype = w.fn, q = w(r);
    var H = /^(?:parents|prev(?:Until|All))/,
        O = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    w.fn.extend({
        has: function(e) {
            var t = w(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (w.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0,
                i = this.length,
                o = [],
                a = "string" != typeof e && w(e);
            if (!D.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && w.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        } return this.pushStack(o.length > 1 ? w.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? u.call(w(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(w.uniqueSort(w.merge(this.get(), w(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    });

    function P(e, t) {
        while ((e = e[t]) && 1 !== e.nodeType);
        return e
    }
    w.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return k(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return k(e, "parentNode", n)
        },
        next: function(e) {
            return P(e, "nextSibling")
        },
        prev: function(e) {
            return P(e, "previousSibling")
        },
        nextAll: function(e) {
            return k(e, "nextSibling")
        },
        prevAll: function(e) {
            return k(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return k(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return k(e, "previousSibling", n)
        },
        siblings: function(e) {
            return S((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return S(e.firstChild)
        },
        contents: function(e) {
            return N(e, "iframe") ? e.contentDocument : (N(e, "template") && (e = e.content || e), w.merge([], e.childNodes))
        }
    }, function(e, t) {
        w.fn[e] = function(n, r) {
            var i = w.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = w.filter(r, i)), this.length > 1 && (O[e] || w.uniqueSort(i), H.test(e) && i.reverse()), this.pushStack(i)
        }
    });
    var M = /[^\x20\t\r\n\f]+/g;

    function R(e) {
        var t = {};
        return w.each(e.match(M) || [], function(e, n) {
            t[n] = !0
        }), t
    }
    w.Callbacks = function(e) {
        e = "string" == typeof e ? R(e) : w.extend({}, e);
        var t, n, r, i, o = [],
            a = [],
            s = -1,
            u = function() {
                for (i = i || e.once, r = t = !0; a.length; s = -1) {
                    n = a.shift();
                    while (++s < o.length) !1 === o[s].apply(n[0], n[1]) && e.stopOnFalse && (s = o.length, n = !1)
                }
                e.memory || (n = !1), t = !1, i && (o = n ? [] : "")
            },
            l = {
                add: function() {
                    return o && (n && !t && (s = o.length - 1, a.push(n)), function t(n) {
                        w.each(n, function(n, r) {
                            g(r) ? e.unique && l.has(r) || o.push(r) : r && r.length && "string" !== x(r) && t(r)
                        })
                    }(arguments), n && !t && u()), this
                },
                remove: function() {
                    return w.each(arguments, function(e, t) {
                        var n;
                        while ((n = w.inArray(t, o, n)) > -1) o.splice(n, 1), n <= s && s--
                    }), this
                },
                has: function(e) {
                    return e ? w.inArray(e, o) > -1 : o.length > 0
                },
                empty: function() {
                    return o && (o = []), this
                },
                disable: function() {
                    return i = a = [], o = n = "", this
                },
                disabled: function() {
                    return !o
                },
                lock: function() {
                    return i = a = [], n || t || (o = n = ""), this
                },
                locked: function() {
                    return !!i
                },
                fireWith: function(e, n) {
                    return i || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || u()), this
                },
                fire: function() {
                    return l.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!r
                }
            };
        return l
    };

    function I(e) {
        return e
    }

    function W(e) {
        throw e
    }

    function $(e, t, n, r) {
        var i;
        try {
            e && g(i = e.promise) ? i.call(e).done(t).fail(n) : e && g(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }
    w.extend({
        Deferred: function(t) {
            var n = [
                    ["notify", "progress", w.Callbacks("memory"), w.Callbacks("memory"), 2],
                    ["resolve", "done", w.Callbacks("once memory"), w.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", w.Callbacks("once memory"), w.Callbacks("once memory"), 1, "rejected"]
                ],
                r = "pending",
                i = {
                    state: function() {
                        return r
                    },
                    always: function() {
                        return o.done(arguments).fail(arguments), this
                    },
                    "catch": function(e) {
                        return i.then(null, e)
                    },
                    pipe: function() {
                        var e = arguments;
                        return w.Deferred(function(t) {
                            w.each(n, function(n, r) {
                                var i = g(e[r[4]]) && e[r[4]];
                                o[r[1]](function() {
                                    var e = i && i.apply(this, arguments);
                                    e && g(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, i ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    then: function(t, r, i) {
                        var o = 0;

                        function a(t, n, r, i) {
                            return function() {
                                var s = this,
                                    u = arguments,
                                    l = function() {
                                        var e, l;
                                        if (!(t < o)) {
                                            if ((e = r.apply(s, u)) === n.promise()) throw new TypeError("Thenable self-resolution");
                                            l = e && ("object" == typeof e || "function" == typeof e) && e.then, g(l) ? i ? l.call(e, a(o, n, I, i), a(o, n, W, i)) : (o++, l.call(e, a(o, n, I, i), a(o, n, W, i), a(o, n, I, n.notifyWith))) : (r !== I && (s = void 0, u = [e]), (i || n.resolveWith)(s, u))
                                        }
                                    },
                                    c = i ? l : function() {
                                        try {
                                            l()
                                        } catch (e) {
                                            w.Deferred.exceptionHook && w.Deferred.exceptionHook(e, c.stackTrace), t + 1 >= o && (r !== W && (s = void 0, u = [e]), n.rejectWith(s, u))
                                        }
                                    };
                                t ? c() : (w.Deferred.getStackHook && (c.stackTrace = w.Deferred.getStackHook()), e.setTimeout(c))
                            }
                        }
                        return w.Deferred(function(e) {
                            n[0][3].add(a(0, e, g(i) ? i : I, e.notifyWith)), n[1][3].add(a(0, e, g(t) ? t : I)), n[2][3].add(a(0, e, g(r) ? r : W))
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? w.extend(e, i) : i
                    }
                },
                o = {};
            return w.each(n, function(e, t) {
                var a = t[2],
                    s = t[5];
                i[t[1]] = a.add, s && a.add(function() {
                    r = s
                }, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), a.add(t[3].fire), o[t[0]] = function() {
                    return o[t[0] + "With"](this === o ? void 0 : this, arguments), this
                }, o[t[0] + "With"] = a.fireWith
            }), i.promise(o), t && t.call(o, o), o
        },
        when: function(e) {
            var t = arguments.length,
                n = t,
                r = Array(n),
                i = o.call(arguments),
                a = w.Deferred(),
                s = function(e) {
                    return function(n) {
                        r[e] = this, i[e] = arguments.length > 1 ? o.call(arguments) : n, --t || a.resolveWith(r, i)
                    }
                };
            if (t <= 1 && ($(e, a.done(s(n)).resolve, a.reject, !t), "pending" === a.state() || g(i[n] && i[n].then))) return a.then();
            while (n--) $(i[n], s(n), a.reject);
            return a.promise()
        }
    });
    var B = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    w.Deferred.exceptionHook = function(t, n) {
        e.console && e.console.warn && t && B.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
    }, w.readyException = function(t) {
        e.setTimeout(function() {
            throw t
        })
    };
    var F = w.Deferred();
    w.fn.ready = function(e) {
        return F.then(e)["catch"](function(e) {
            w.readyException(e)
        }), this
    }, w.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --w.readyWait : w.isReady) || (w.isReady = !0, !0 !== e && --w.readyWait > 0 || F.resolveWith(r, [w]))
        }
    }), w.ready.then = F.then;

    function _() {
        r.removeEventListener("DOMContentLoaded", _), e.removeEventListener("load", _), w.ready()
    }
    "complete" === r.readyState || "loading" !== r.readyState && !r.documentElement.doScroll ? e.setTimeout(w.ready) : (r.addEventListener("DOMContentLoaded", _), e.addEventListener("load", _));
    var z = function(e, t, n, r, i, o, a) {
            var s = 0,
                u = e.length,
                l = null == n;
            if ("object" === x(n)) {
                i = !0;
                for (s in n) z(e, t, s, n[s], !0, o, a)
            } else if (void 0 !== r && (i = !0, g(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
                    return l.call(w(e), n)
                })), t))
                for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        },
        X = /^-ms-/,
        U = /-([a-z])/g;

    function V(e, t) {
        return t.toUpperCase()
    }

    function G(e) {
        return e.replace(X, "ms-").replace(U, V)
    }
    var Y = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };

    function Q() {
        this.expando = w.expando + Q.uid++
    }
    Q.uid = 1, Q.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {}, Y(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t) i[G(t)] = n;
            else
                for (r in t) i[G(r)] = t[r];
            return i
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][G(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(G) : (t = G(t)) in r ? [t] : t.match(M) || []).length;
                    while (n--) delete r[t[n]]
                }(void 0 === t || w.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !w.isEmptyObject(t)
        }
    };
    var J = new Q,
        K = new Q,
        Z = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        ee = /[A-Z]/g;

    function te(e) {
        return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Z.test(e) ? JSON.parse(e) : e)
    }

    function ne(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(ee, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(r))) {
                try {
                    n = te(n)
                } catch (e) {}
                K.set(e, t, n)
            } else n = void 0;
        return n
    }
    w.extend({
        hasData: function(e) {
            return K.hasData(e) || J.hasData(e)
        },
        data: function(e, t, n) {
            return K.access(e, t, n)
        },
        removeData: function(e, t) {
            K.remove(e, t)
        },
        _data: function(e, t, n) {
            return J.access(e, t, n)
        },
        _removeData: function(e, t) {
            J.remove(e, t)
        }
    }), w.fn.extend({
        data: function(e, t) {
            var n, r, i, o = this[0],
                a = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (i = K.get(o), 1 === o.nodeType && !J.get(o, "hasDataAttrs"))) {
                    n = a.length;
                    while (n--) a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = G(r.slice(5)), ne(o, r, i[r]));
                    J.set(o, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function() {
                K.set(this, e)
            }) : z(this, function(t) {
                var n;
                if (o && void 0 === t) {
                    if (void 0 !== (n = K.get(o, e))) return n;
                    if (void 0 !== (n = ne(o, e))) return n
                } else this.each(function() {
                    K.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                K.remove(this, e)
            })
        }
    }), w.extend({
        queue: function(e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = J.get(e, t), n && (!r || Array.isArray(n) ? r = J.access(e, t, w.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = w.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = w._queueHooks(e, t),
                a = function() {
                    w.dequeue(e, t)
                };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return J.get(e, n) || J.access(e, n, {
                empty: w.Callbacks("once memory").add(function() {
                    J.remove(e, [t + "queue", n])
                })
            })
        }
    }), w.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? w.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = w.queue(this, e, t);
                w._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && w.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                w.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = w.Deferred(),
                o = this,
                a = this.length,
                s = function() {
                    --r || i.resolveWith(o, [o])
                };
            "string" != typeof e && (t = e, e = void 0), e = e || "fx";
            while (a--)(n = J.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var re = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        ie = new RegExp("^(?:([+-])=|)(" + re + ")([a-z%]*)$", "i"),
        oe = ["Top", "Right", "Bottom", "Left"],
        ae = function(e, t) {
            return "none" === (e = t || e).style.display || "" === e.style.display && w.contains(e.ownerDocument, e) && "none" === w.css(e, "display")
        },
        se = function(e, t, n, r) {
            var i, o, a = {};
            for (o in t) a[o] = e.style[o], e.style[o] = t[o];
            i = n.apply(e, r || []);
            for (o in t) e.style[o] = a[o];
            return i
        };

    function ue(e, t, n, r) {
        var i, o, a = 20,
            s = r ? function() {
                return r.cur()
            } : function() {
                return w.css(e, t, "")
            },
            u = s(),
            l = n && n[3] || (w.cssNumber[t] ? "" : "px"),
            c = (w.cssNumber[t] || "px" !== l && +u) && ie.exec(w.css(e, t));
        if (c && c[3] !== l) {
            u /= 2, l = l || c[3], c = +u || 1;
            while (a--) w.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
            c *= 2, w.style(e, t, c + l), n = n || []
        }
        return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
    }
    var le = {};

    function ce(e) {
        var t, n = e.ownerDocument,
            r = e.nodeName,
            i = le[r];
        return i || (t = n.body.appendChild(n.createElement(r)), i = w.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), le[r] = i, i)
    }

    function fe(e, t) {
        for (var n, r, i = [], o = 0, a = e.length; o < a; o++)(r = e[o]).style && (n = r.style.display, t ? ("none" === n && (i[o] = J.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && ae(r) && (i[o] = ce(r))) : "none" !== n && (i[o] = "none", J.set(r, "display", n)));
        for (o = 0; o < a; o++) null != i[o] && (e[o].style.display = i[o]);
        return e
    }
    w.fn.extend({
        show: function() {
            return fe(this, !0)
        },
        hide: function() {
            return fe(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                ae(this) ? w(this).show() : w(this).hide()
            })
        }
    });
    var pe = /^(?:checkbox|radio)$/i,
        de = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        he = /^$|^module$|\/(?:java|ecma)script/i,
        ge = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    ge.optgroup = ge.option, ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td;

    function ye(e, t) {
        var n;
        return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && N(e, t) ? w.merge([e], n) : n
    }

    function ve(e, t) {
        for (var n = 0, r = e.length; n < r; n++) J.set(e[n], "globalEval", !t || J.get(t[n], "globalEval"))
    }
    var me = /<|&#?\w+;/;

    function xe(e, t, n, r, i) {
        for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)
            if ((o = e[d]) || 0 === o)
                if ("object" === x(o)) w.merge(p, o.nodeType ? [o] : o);
                else if (me.test(o)) {
            a = a || f.appendChild(t.createElement("div")), s = (de.exec(o) || ["", ""])[1].toLowerCase(), u = ge[s] || ge._default, a.innerHTML = u[1] + w.htmlPrefilter(o) + u[2], c = u[0];
            while (c--) a = a.lastChild;
            w.merge(p, a.childNodes), (a = f.firstChild).textContent = ""
        } else p.push(t.createTextNode(o));
        f.textContent = "", d = 0;
        while (o = p[d++])
            if (r && w.inArray(o, r) > -1) i && i.push(o);
            else if (l = w.contains(o.ownerDocument, o), a = ye(f.appendChild(o), "script"), l && ve(a), n) {
            c = 0;
            while (o = a[c++]) he.test(o.type || "") && n.push(o)
        }
        return f
    }! function() {
        var e = r.createDocumentFragment().appendChild(r.createElement("div")),
            t = r.createElement("input");
        t.setAttribute("type", "radio"), t.setAttribute("checked", "checked"), t.setAttribute("name", "t"), e.appendChild(t), h.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", h.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
    }();
    var be = r.documentElement,
        we = /^key/,
        Te = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Ce = /^([^.]*)(?:\.(.+)|)/;

    function Ee() {
        return !0
    }

    function ke() {
        return !1
    }

    function Se() {
        try {
            return r.activeElement
        } catch (e) {}
    }

    function De(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            "string" != typeof n && (r = r || n, n = void 0);
            for (s in t) De(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = ke;
        else if (!i) return e;
        return 1 === o && (a = i, (i = function(e) {
            return w().off(e), a.apply(this, arguments)
        }).guid = a.guid || (a.guid = w.guid++)), e.each(function() {
            w.event.add(this, t, i, r, n)
        })
    }
    w.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, y = J.get(e);
            if (y) {
                n.handler && (n = (o = n).handler, i = o.selector), i && w.find.matchesSelector(be, i), n.guid || (n.guid = w.guid++), (u = y.events) || (u = y.events = {}), (a = y.handle) || (a = y.handle = function(t) {
                    return "undefined" != typeof w && w.event.triggered !== t.type ? w.event.dispatch.apply(e, arguments) : void 0
                }), l = (t = (t || "").match(M) || [""]).length;
                while (l--) d = g = (s = Ce.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = w.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = w.event.special[d] || {}, c = w.extend({
                    type: d,
                    origType: g,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && w.expr.match.needsContext.test(i),
                    namespace: h.join(".")
                }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, r, h, a) || e.addEventListener && e.addEventListener(d, a)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), w.event.global[d] = !0)
            }
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, y = J.hasData(e) && J.get(e);
            if (y && (u = y.events)) {
                l = (t = (t || "").match(M) || [""]).length;
                while (l--)
                    if (s = Ce.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
                        f = w.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length;
                        while (o--) c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                        a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, y.handle) || w.removeEvent(e, d, y.handle), delete u[d])
                    } else
                        for (d in u) w.event.remove(e, d + t[l], n, r, !0);
                w.isEmptyObject(u) && J.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t = w.event.fix(e),
                n, r, i, o, a, s, u = new Array(arguments.length),
                l = (J.get(this, "events") || {})[t.type] || [],
                c = w.event.special[t.type] || {};
            for (u[0] = t, n = 1; n < arguments.length; n++) u[n] = arguments[n];
            if (t.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, t)) {
                s = w.event.handlers.call(this, t, l), n = 0;
                while ((o = s[n++]) && !t.isPropagationStopped()) {
                    t.currentTarget = o.elem, r = 0;
                    while ((a = o.handlers[r++]) && !t.isImmediatePropagationStopped()) t.rnamespace && !t.rnamespace.test(a.namespace) || (t.handleObj = a, t.data = a.data, void 0 !== (i = ((w.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, u)) && !1 === (t.result = i) && (t.preventDefault(), t.stopPropagation()))
                }
                return c.postDispatch && c.postDispatch.call(this, t), t.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a, s = [],
                u = t.delegateCount,
                l = e.target;
            if (u && l.nodeType && !("click" === e.type && e.button >= 1))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                        for (o = [], a = {}, n = 0; n < u; n++) void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? w(i, this).index(l) > -1 : w.find(i, this, null, [l]).length), a[i] && o.push(r);
                        o.length && s.push({
                            elem: l,
                            handlers: o
                        })
                    } return l = this, u < t.length && s.push({
                elem: l,
                handlers: t.slice(u)
            }), s
        },
        addProp: function(e, t) {
            Object.defineProperty(w.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: g(t) ? function() {
                    if (this.originalEvent) return t(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[e]
                },
                set: function(t) {
                    Object.defineProperty(this, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            })
        },
        fix: function(e) {
            return e[w.expando] ? e : new w.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== Se() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === Se() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && N(this, "input")) return this.click(), !1
                },
                _default: function(e) {
                    return N(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, w.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, w.Event = function(e, t) {
        if (!(this instanceof w.Event)) return new w.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ee : ke, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && w.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[w.expando] = !0
    }, w.Event.prototype = {
        constructor: w.Event,
        isDefaultPrevented: ke,
        isPropagationStopped: ke,
        isImmediatePropagationStopped: ke,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = Ee, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = Ee, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = Ee, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, w.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && we.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Te.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, w.event.addProp), w.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        w.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    o = e.handleObj;
                return i && (i === r || w.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), w.fn.extend({
        on: function(e, t, n, r) {
            return De(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return De(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, w(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = ke), this.each(function() {
                w.event.remove(this, e, n, t)
            })
        }
    });
    var Ne = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        Ae = /<script|<style|<link/i,
        je = /checked\s*(?:[^=]|=\s*.checked.)/i,
        qe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function Le(e, t) {
        return N(e, "table") && N(11 !== t.nodeType ? t : t.firstChild, "tr") ? w(e).children("tbody")[0] || e : e
    }

    function He(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function Oe(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
    }

    function Pe(e, t) {
        var n, r, i, o, a, s, u, l;
        if (1 === t.nodeType) {
            if (J.hasData(e) && (o = J.access(e), a = J.set(t, o), l = o.events)) {
                delete a.handle, a.events = {};
                for (i in l)
                    for (n = 0, r = l[i].length; n < r; n++) w.event.add(t, i, l[i][n])
            }
            K.hasData(e) && (s = K.access(e), u = w.extend({}, s), K.set(t, u))
        }
    }

    function Me(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && pe.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }

    function Re(e, t, n, r) {
        t = a.apply([], t);
        var i, o, s, u, l, c, f = 0,
            p = e.length,
            d = p - 1,
            y = t[0],
            v = g(y);
        if (v || p > 1 && "string" == typeof y && !h.checkClone && je.test(y)) return e.each(function(i) {
            var o = e.eq(i);
            v && (t[0] = y.call(this, i, o.html())), Re(o, t, n, r)
        });
        if (p && (i = xe(t, e[0].ownerDocument, !1, e, r), o = i.firstChild, 1 === i.childNodes.length && (i = o), o || r)) {
            for (u = (s = w.map(ye(i, "script"), He)).length; f < p; f++) l = i, f !== d && (l = w.clone(l, !0, !0), u && w.merge(s, ye(l, "script"))), n.call(e[f], l, f);
            if (u)
                for (c = s[s.length - 1].ownerDocument, w.map(s, Oe), f = 0; f < u; f++) l = s[f], he.test(l.type || "") && !J.access(l, "globalEval") && w.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? w._evalUrl && w._evalUrl(l.src) : m(l.textContent.replace(qe, ""), c, l))
        }
        return e
    }

    function Ie(e, t, n) {
        for (var r, i = t ? w.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || w.cleanData(ye(r)), r.parentNode && (n && w.contains(r.ownerDocument, r) && ve(ye(r, "script")), r.parentNode.removeChild(r));
        return e
    }
    w.extend({
        htmlPrefilter: function(e) {
            return e.replace(Ne, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var r, i, o, a, s = e.cloneNode(!0),
                u = w.contains(e.ownerDocument, e);
            if (!(h.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || w.isXMLDoc(e)))
                for (a = ye(s), r = 0, i = (o = ye(e)).length; r < i; r++) Me(o[r], a[r]);
            if (t)
                if (n)
                    for (o = o || ye(e), a = a || ye(s), r = 0, i = o.length; r < i; r++) Pe(o[r], a[r]);
                else Pe(e, s);
            return (a = ye(s, "script")).length > 0 && ve(a, !u && ye(e, "script")), s
        },
        cleanData: function(e) {
            for (var t, n, r, i = w.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (Y(n)) {
                    if (t = n[J.expando]) {
                        if (t.events)
                            for (r in t.events) i[r] ? w.event.remove(n, r) : w.removeEvent(n, r, t.handle);
                        n[J.expando] = void 0
                    }
                    n[K.expando] && (n[K.expando] = void 0)
                }
        }
    }), w.fn.extend({
        detach: function(e) {
            return Ie(this, e, !0)
        },
        remove: function(e) {
            return Ie(this, e)
        },
        text: function(e) {
            return z(this, function(e) {
                return void 0 === e ? w.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return Re(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Le(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return Re(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Le(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return Re(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return Re(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (w.cleanData(ye(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return w.clone(this, e, t)
            })
        },
        html: function(e) {
            return z(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !Ae.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = w.htmlPrefilter(e);
                    try {
                        for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (w.cleanData(ye(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return Re(this, arguments, function(t) {
                var n = this.parentNode;
                w.inArray(this, e) < 0 && (w.cleanData(ye(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), w.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        w.fn[e] = function(e) {
            for (var n, r = [], i = w(e), o = i.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(!0), w(i[a])[t](n), s.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var We = new RegExp("^(" + re + ")(?!px)[a-z%]+$", "i"),
        $e = function(t) {
            var n = t.ownerDocument.defaultView;
            return n && n.opener || (n = e), n.getComputedStyle(t)
        },
        Be = new RegExp(oe.join("|"), "i");
    ! function() {
        function t() {
            if (c) {
                l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", be.appendChild(l).appendChild(c);
                var t = e.getComputedStyle(c);
                i = "1%" !== t.top, u = 12 === n(t.marginLeft), c.style.right = "60%", s = 36 === n(t.right), o = 36 === n(t.width), c.style.position = "absolute", a = 36 === c.offsetWidth || "absolute", be.removeChild(l), c = null
            }
        }

        function n(e) {
            return Math.round(parseFloat(e))
        }
        var i, o, a, s, u, l = r.createElement("div"),
            c = r.createElement("div");
        c.style && (c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", h.clearCloneStyle = "content-box" === c.style.backgroundClip, w.extend(h, {
            boxSizingReliable: function() {
                return t(), o
            },
            pixelBoxStyles: function() {
                return t(), s
            },
            pixelPosition: function() {
                return t(), i
            },
            reliableMarginLeft: function() {
                return t(), u
            },
            scrollboxSize: function() {
                return t(), a
            }
        }))
    }();

    function Fe(e, t, n) {
        var r, i, o, a, s = e.style;
        return (n = n || $e(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || w.contains(e.ownerDocument, e) || (a = w.style(e, t)), !h.pixelBoxStyles() && We.test(a) && Be.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
    }

    function _e(e, t) {
        return {
            get: function() {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }
    var ze = /^(none|table(?!-c[ea]).+)/,
        Xe = /^--/,
        Ue = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Ve = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Ge = ["Webkit", "Moz", "ms"],
        Ye = r.createElement("div").style;

    function Qe(e) {
        if (e in Ye) return e;
        var t = e[0].toUpperCase() + e.slice(1),
            n = Ge.length;
        while (n--)
            if ((e = Ge[n] + t) in Ye) return e
    }

    function Je(e) {
        var t = w.cssProps[e];
        return t || (t = w.cssProps[e] = Qe(e) || e), t
    }

    function Ke(e, t, n) {
        var r = ie.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }

    function Ze(e, t, n, r, i, o) {
        var a = "width" === t ? 1 : 0,
            s = 0,
            u = 0;
        if (n === (r ? "border" : "content")) return 0;
        for (; a < 4; a += 2) "margin" === n && (u += w.css(e, n + oe[a], !0, i)), r ? ("content" === n && (u -= w.css(e, "padding" + oe[a], !0, i)), "margin" !== n && (u -= w.css(e, "border" + oe[a] + "Width", !0, i))) : (u += w.css(e, "padding" + oe[a], !0, i), "padding" !== n ? u += w.css(e, "border" + oe[a] + "Width", !0, i) : s += w.css(e, "border" + oe[a] + "Width", !0, i));
        return !r && o >= 0 && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5))), u
    }

    function et(e, t, n) {
        var r = $e(e),
            i = Fe(e, t, r),
            o = "border-box" === w.css(e, "boxSizing", !1, r),
            a = o;
        if (We.test(i)) {
            if (!n) return i;
            i = "auto"
        }
        return a = a && (h.boxSizingReliable() || i === e.style[t]), ("auto" === i || !parseFloat(i) && "inline" === w.css(e, "display", !1, r)) && (i = e["offset" + t[0].toUpperCase() + t.slice(1)], a = !0), (i = parseFloat(i) || 0) + Ze(e, t, n || (o ? "border" : "content"), a, r, i) + "px"
    }
    w.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Fe(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = G(t),
                    u = Xe.test(t),
                    l = e.style;
                if (u || (t = Je(s)), a = w.cssHooks[t] || w.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                "string" == (o = typeof n) && (i = ie.exec(n)) && i[1] && (n = ue(e, t, i), o = "number"), null != n && n === n && ("number" === o && (n += i && i[3] || (w.cssNumber[s] ? "" : "px")), h.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n))
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = G(t);
            return Xe.test(t) || (t = Je(s)), (a = w.cssHooks[t] || w.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = Fe(e, t, r)), "normal" === i && t in Ve && (i = Ve[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
        }
    }), w.each(["height", "width"], function(e, t) {
        w.cssHooks[t] = {
            get: function(e, n, r) {
                if (n) return !ze.test(w.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? et(e, t, r) : se(e, Ue, function() {
                    return et(e, t, r)
                })
            },
            set: function(e, n, r) {
                var i, o = $e(e),
                    a = "border-box" === w.css(e, "boxSizing", !1, o),
                    s = r && Ze(e, t, r, a, o);
                return a && h.scrollboxSize() === o.position && (s -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - Ze(e, t, "border", !1, o) - .5)), s && (i = ie.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = w.css(e, t)), Ke(e, n, s)
            }
        }
    }), w.cssHooks.marginLeft = _e(h.reliableMarginLeft, function(e, t) {
        if (t) return (parseFloat(Fe(e, "marginLeft")) || e.getBoundingClientRect().left - se(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px"
    }), w.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        w.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[e + oe[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, "margin" !== e && (w.cssHooks[e + t].set = Ke)
    }), w.fn.extend({
        css: function(e, t) {
            return z(this, function(e, t, n) {
                var r, i, o = {},
                    a = 0;
                if (Array.isArray(t)) {
                    for (r = $e(e), i = t.length; a < i; a++) o[t[a]] = w.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? w.style(e, t, n) : w.css(e, t)
            }, e, t, arguments.length > 1)
        }
    });

    function tt(e, t, n, r, i) {
        return new tt.prototype.init(e, t, n, r, i)
    }
    w.Tween = tt, tt.prototype = {
        constructor: tt,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || w.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (w.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = tt.propHooks[this.prop];
            return e && e.get ? e.get(this) : tt.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = tt.propHooks[this.prop];
            return this.options.duration ? this.pos = t = w.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : tt.propHooks._default.set(this), this
        }
    }, tt.prototype.init.prototype = tt.prototype, tt.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = w.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                w.fx.step[e.prop] ? w.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[w.cssProps[e.prop]] && !w.cssHooks[e.prop] ? e.elem[e.prop] = e.now : w.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, tt.propHooks.scrollTop = tt.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, w.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, w.fx = tt.prototype.init, w.fx.step = {};
    var nt, rt, it = /^(?:toggle|show|hide)$/,
        ot = /queueHooks$/;

    function at() {
        rt && (!1 === r.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(at) : e.setTimeout(at, w.fx.interval), w.fx.tick())
    }

    function st() {
        return e.setTimeout(function() {
            nt = void 0
        }), nt = Date.now()
    }

    function ut(e, t) {
        var n, r = 0,
            i = {
                height: e
            };
        for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = oe[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function lt(e, t, n) {
        for (var r, i = (pt.tweeners[t] || []).concat(pt.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e)) return r
    }

    function ct(e, t, n) {
        var r, i, o, a, s, u, l, c, f = "width" in t || "height" in t,
            p = this,
            d = {},
            h = e.style,
            g = e.nodeType && ae(e),
            y = J.get(e, "fxshow");
        n.queue || (null == (a = w._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
            a.unqueued || s()
        }), a.unqueued++, p.always(function() {
            p.always(function() {
                a.unqueued--, w.queue(e, "fx").length || a.empty.fire()
            })
        }));
        for (r in t)
            if (i = t[r], it.test(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
                    if ("show" !== i || !y || void 0 === y[r]) continue;
                    g = !0
                }
                d[r] = y && y[r] || w.style(e, r)
            } if ((u = !w.isEmptyObject(t)) || !w.isEmptyObject(d)) {
            f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = y && y.display) && (l = J.get(e, "display")), "none" === (c = w.css(e, "display")) && (l ? c = l : (fe([e], !0), l = e.style.display || l, c = w.css(e, "display"), fe([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === w.css(e, "float") && (u || (p.done(function() {
                h.display = l
            }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function() {
                h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
            })), u = !1;
            for (r in d) u || (y ? "hidden" in y && (g = y.hidden) : y = J.access(e, "fxshow", {
                display: l
            }), o && (y.hidden = !g), g && fe([e], !0), p.done(function() {
                g || fe([e]), J.remove(e, "fxshow");
                for (r in d) w.style(e, r, d[r])
            })), u = lt(g ? y[r] : 0, r, p), r in y || (y[r] = u.start, g && (u.end = u.start, u.start = 0))
        }
    }

    function ft(e, t) {
        var n, r, i, o, a;
        for (n in e)
            if (r = G(n), i = t[r], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = w.cssHooks[r]) && "expand" in a) {
                o = a.expand(o), delete e[r];
                for (n in o) n in e || (e[n] = o[n], t[n] = i)
            } else t[r] = i
    }

    function pt(e, t, n) {
        var r, i, o = 0,
            a = pt.prefilters.length,
            s = w.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (i) return !1;
                for (var t = nt || st(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), o = 0, a = l.tweens.length; o < a; o++) l.tweens[o].run(r);
                return s.notifyWith(e, [l, r, n]), r < 1 && a ? n : (a || s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l]), !1)
            },
            l = s.promise({
                elem: e,
                props: w.extend({}, t),
                opts: w.extend(!0, {
                    specialEasing: {},
                    easing: w.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: nt || st(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = w.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                    return l.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? l.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; n < r; n++) l.tweens[n].run(1);
                    return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this
                }
            }),
            c = l.props;
        for (ft(c, l.opts.specialEasing); o < a; o++)
            if (r = pt.prefilters[o].call(l, e, c, l.opts)) return g(r.stop) && (w._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)), r;
        return w.map(c, lt, l), g(l.opts.start) && l.opts.start.call(e, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), w.fx.timer(w.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l
    }
    w.Animation = w.extend(pt, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return ue(n.elem, e, ie.exec(t), n), n
                }]
            },
            tweener: function(e, t) {
                g(e) ? (t = e, e = ["*"]) : e = e.match(M);
                for (var n, r = 0, i = e.length; r < i; r++) n = e[r], pt.tweeners[n] = pt.tweeners[n] || [], pt.tweeners[n].unshift(t)
            },
            prefilters: [ct],
            prefilter: function(e, t) {
                t ? pt.prefilters.unshift(e) : pt.prefilters.push(e)
            }
        }), w.speed = function(e, t, n) {
            var r = e && "object" == typeof e ? w.extend({}, e) : {
                complete: n || !n && t || g(e) && e,
                duration: e,
                easing: n && t || t && !g(t) && t
            };
            return w.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in w.fx.speeds ? r.duration = w.fx.speeds[r.duration] : r.duration = w.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                g(r.old) && r.old.call(this), r.queue && w.dequeue(this, r.queue)
            }, r
        }, w.fn.extend({
            fadeTo: function(e, t, n, r) {
                return this.filter(ae).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function(e, t, n, r) {
                var i = w.isEmptyObject(e),
                    o = w.speed(t, n, r),
                    a = function() {
                        var t = pt(this, w.extend({}, e), o);
                        (i || J.get(this, "finish")) && t.stop(!0)
                    };
                return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function(e, t, n) {
                var r = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        i = null != e && e + "queueHooks",
                        o = w.timers,
                        a = J.get(this);
                    if (i) a[i] && a[i].stop && r(a[i]);
                    else
                        for (i in a) a[i] && a[i].stop && ot.test(i) && r(a[i]);
                    for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                    !t && n || w.dequeue(this, e)
                })
            },
            finish: function(e) {
                return !1 !== e && (e = e || "fx"), this.each(function() {
                    var t, n = J.get(this),
                        r = n[e + "queue"],
                        i = n[e + "queueHooks"],
                        o = w.timers,
                        a = r ? r.length : 0;
                    for (n.finish = !0, w.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        }), w.each(["toggle", "show", "hide"], function(e, t) {
            var n = w.fn[t];
            w.fn[t] = function(e, r, i) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ut(t, !0), e, r, i)
            }
        }), w.each({
            slideDown: ut("show"),
            slideUp: ut("hide"),
            slideToggle: ut("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            w.fn[e] = function(e, n, r) {
                return this.animate(t, e, n, r)
            }
        }), w.timers = [], w.fx.tick = function() {
            var e, t = 0,
                n = w.timers;
            for (nt = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
            n.length || w.fx.stop(), nt = void 0
        }, w.fx.timer = function(e) {
            w.timers.push(e), w.fx.start()
        }, w.fx.interval = 13, w.fx.start = function() {
            rt || (rt = !0, at())
        }, w.fx.stop = function() {
            rt = null
        }, w.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, w.fn.delay = function(t, n) {
            return t = w.fx ? w.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, r) {
                var i = e.setTimeout(n, t);
                r.stop = function() {
                    e.clearTimeout(i)
                }
            })
        },
        function() {
            var e = r.createElement("input"),
                t = r.createElement("select").appendChild(r.createElement("option"));
            e.type = "checkbox", h.checkOn = "" !== e.value, h.optSelected = t.selected, (e = r.createElement("input")).value = "t", e.type = "radio", h.radioValue = "t" === e.value
        }();
    var dt, ht = w.expr.attrHandle;
    w.fn.extend({
        attr: function(e, t) {
            return z(this, w.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                w.removeAttr(this, e)
            })
        }
    }), w.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? w.prop(e, t, n) : (1 === o && w.isXMLDoc(e) || (i = w.attrHooks[t.toLowerCase()] || (w.expr.match.bool.test(t) ? dt : void 0)), void 0 !== n ? null === n ? void w.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = w.find.attr(e, t)) ? void 0 : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!h.radioValue && "radio" === t && N(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r = 0,
                i = t && t.match(M);
            if (i && 1 === e.nodeType)
                while (n = i[r++]) e.removeAttribute(n)
        }
    }), dt = {
        set: function(e, t, n) {
            return !1 === t ? w.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, w.each(w.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = ht[t] || w.find.attr;
        ht[t] = function(e, t, r) {
            var i, o, a = t.toLowerCase();
            return r || (o = ht[a], ht[a] = i, i = null != n(e, t, r) ? a : null, ht[a] = o), i
        }
    });
    var gt = /^(?:input|select|textarea|button)$/i,
        yt = /^(?:a|area)$/i;
    w.fn.extend({
        prop: function(e, t) {
            return z(this, w.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[w.propFix[e] || e]
            })
        }
    }), w.extend({
        prop: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && w.isXMLDoc(e) || (t = w.propFix[t] || t, i = w.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = w.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : gt.test(e.nodeName) || yt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), h.optSelected || (w.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), w.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        w.propFix[this.toLowerCase()] = this
    });

    function vt(e) {
        return (e.match(M) || []).join(" ")
    }

    function mt(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function xt(e) {
        return Array.isArray(e) ? e : "string" == typeof e ? e.match(M) || [] : []
    }
    w.fn.extend({
        addClass: function(e) {
            var t, n, r, i, o, a, s, u = 0;
            if (g(e)) return this.each(function(t) {
                w(this).addClass(e.call(this, t, mt(this)))
            });
            if ((t = xt(e)).length)
                while (n = this[u++])
                    if (i = mt(n), r = 1 === n.nodeType && " " + vt(i) + " ") {
                        a = 0;
                        while (o = t[a++]) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        i !== (s = vt(r)) && n.setAttribute("class", s)
                    } return this
        },
        removeClass: function(e) {
            var t, n, r, i, o, a, s, u = 0;
            if (g(e)) return this.each(function(t) {
                w(this).removeClass(e.call(this, t, mt(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ((t = xt(e)).length)
                while (n = this[u++])
                    if (i = mt(n), r = 1 === n.nodeType && " " + vt(i) + " ") {
                        a = 0;
                        while (o = t[a++])
                            while (r.indexOf(" " + o + " ") > -1) r = r.replace(" " + o + " ", " ");
                        i !== (s = vt(r)) && n.setAttribute("class", s)
                    } return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
                r = "string" === n || Array.isArray(e);
            return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : g(e) ? this.each(function(n) {
                w(this).toggleClass(e.call(this, n, mt(this), t), t)
            }) : this.each(function() {
                var t, i, o, a;
                if (r) {
                    i = 0, o = w(this), a = xt(e);
                    while (t = a[i++]) o.hasClass(t) ? o.removeClass(t) : o.addClass(t)
                } else void 0 !== e && "boolean" !== n || ((t = mt(this)) && J.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : J.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, r = 0;
            t = " " + e + " ";
            while (n = this[r++])
                if (1 === n.nodeType && (" " + vt(mt(n)) + " ").indexOf(t) > -1) return !0;
            return !1
        }
    });
    var bt = /\r/g;
    w.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0]; {
                if (arguments.length) return r = g(e), this.each(function(n) {
                    var i;
                    1 === this.nodeType && (null == (i = r ? e.call(this, n, w(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = w.map(i, function(e) {
                        return null == e ? "" : e + ""
                    })), (t = w.valHooks[this.type] || w.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                });
                if (i) return (t = w.valHooks[i.type] || w.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof(n = i.value) ? n.replace(bt, "") : null == n ? "" : n
            }
        }
    }), w.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = w.find.attr(e, "value");
                    return null != t ? t : vt(w.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, i = e.options,
                        o = e.selectedIndex,
                        a = "select-one" === e.type,
                        s = a ? null : [],
                        u = a ? o + 1 : i.length;
                    for (r = o < 0 ? u : a ? o : 0; r < u; r++)
                        if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !N(n.parentNode, "optgroup"))) {
                            if (t = w(n).val(), a) return t;
                            s.push(t)
                        } return s
                },
                set: function(e, t) {
                    var n, r, i = e.options,
                        o = w.makeArray(t),
                        a = i.length;
                    while (a--)((r = i[a]).selected = w.inArray(w.valHooks.option.get(r), o) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), w.each(["radio", "checkbox"], function() {
        w.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t)) return e.checked = w.inArray(w(e).val(), t) > -1
            }
        }, h.checkOn || (w.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    }), h.focusin = "onfocusin" in e;
    var wt = /^(?:focusinfocus|focusoutblur)$/,
        Tt = function(e) {
            e.stopPropagation()
        };
    w.extend(w.event, {
        trigger: function(t, n, i, o) {
            var a, s, u, l, c, p, d, h, v = [i || r],
                m = f.call(t, "type") ? t.type : t,
                x = f.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = h = u = i = i || r, 3 !== i.nodeType && 8 !== i.nodeType && !wt.test(m + w.event.triggered) && (m.indexOf(".") > -1 && (m = (x = m.split(".")).shift(), x.sort()), c = m.indexOf(":") < 0 && "on" + m, t = t[w.expando] ? t : new w.Event(m, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = x.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + x.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : w.makeArray(n, [t]), d = w.event.special[m] || {}, o || !d.trigger || !1 !== d.trigger.apply(i, n))) {
                if (!o && !d.noBubble && !y(i)) {
                    for (l = d.delegateType || m, wt.test(l + m) || (s = s.parentNode); s; s = s.parentNode) v.push(s), u = s;
                    u === (i.ownerDocument || r) && v.push(u.defaultView || u.parentWindow || e)
                }
                a = 0;
                while ((s = v[a++]) && !t.isPropagationStopped()) h = s, t.type = a > 1 ? l : d.bindType || m, (p = (J.get(s, "events") || {})[t.type] && J.get(s, "handle")) && p.apply(s, n), (p = c && s[c]) && p.apply && Y(s) && (t.result = p.apply(s, n), !1 === t.result && t.preventDefault());
                return t.type = m, o || t.isDefaultPrevented() || d._default && !1 !== d._default.apply(v.pop(), n) || !Y(i) || c && g(i[m]) && !y(i) && ((u = i[c]) && (i[c] = null), w.event.triggered = m, t.isPropagationStopped() && h.addEventListener(m, Tt), i[m](), t.isPropagationStopped() && h.removeEventListener(m, Tt), w.event.triggered = void 0, u && (i[c] = u)), t.result
            }
        },
        simulate: function(e, t, n) {
            var r = w.extend(new w.Event, n, {
                type: e,
                isSimulated: !0
            });
            w.event.trigger(r, null, t)
        }
    }), w.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                w.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return w.event.trigger(e, t, n, !0)
        }
    }), h.focusin || w.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            w.event.simulate(t, e.target, w.event.fix(e))
        };
        w.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this,
                    i = J.access(r, t);
                i || r.addEventListener(e, n, !0), J.access(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                    i = J.access(r, t) - 1;
                i ? J.access(r, t, i) : (r.removeEventListener(e, n, !0), J.remove(r, t))
            }
        }
    });
    var Ct = e.location,
        Et = Date.now(),
        kt = /\?/;
    w.parseXML = function(t) {
        var n;
        if (!t || "string" != typeof t) return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (e) {
            n = void 0
        }
        return n && !n.getElementsByTagName("parsererror").length || w.error("Invalid XML: " + t), n
    };
    var St = /\[\]$/,
        Dt = /\r?\n/g,
        Nt = /^(?:submit|button|image|reset|file)$/i,
        At = /^(?:input|select|textarea|keygen)/i;

    function jt(e, t, n, r) {
        var i;
        if (Array.isArray(t)) w.each(t, function(t, i) {
            n || St.test(e) ? r(e, i) : jt(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
        });
        else if (n || "object" !== x(t)) r(e, t);
        else
            for (i in t) jt(e + "[" + i + "]", t[i], n, r)
    }
    w.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                var n = g(t) ? t() : t;
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (Array.isArray(e) || e.jquery && !w.isPlainObject(e)) w.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) jt(n, e[n], t, i);
        return r.join("&")
    }, w.fn.extend({
        serialize: function() {
            return w.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = w.prop(this, "elements");
                return e ? w.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !w(this).is(":disabled") && At.test(this.nodeName) && !Nt.test(e) && (this.checked || !pe.test(e))
            }).map(function(e, t) {
                var n = w(this).val();
                return null == n ? null : Array.isArray(n) ? w.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Dt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Dt, "\r\n")
                }
            }).get()
        }
    });
    var qt = /%20/g,
        Lt = /#.*$/,
        Ht = /([?&])_=[^&]*/,
        Ot = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Pt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Mt = /^(?:GET|HEAD)$/,
        Rt = /^\/\//,
        It = {},
        Wt = {},
        $t = "*/".concat("*"),
        Bt = r.createElement("a");
    Bt.href = Ct.href;

    function Ft(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
                o = t.toLowerCase().match(M) || [];
            if (g(n))
                while (r = o[i++]) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function _t(e, t, n, r) {
        var i = {},
            o = e === Wt;

        function a(s) {
            var u;
            return i[s] = !0, w.each(e[s] || [], function(e, s) {
                var l = s(t, n, r);
                return "string" != typeof l || o || i[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l), a(l), !1)
            }), u
        }
        return a(t.dataTypes[0]) || !i["*"] && a("*")
    }

    function zt(e, t) {
        var n, r, i = w.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && w.extend(!0, e, r), e
    }

    function Xt(e, t, n) {
        var r, i, o, a, s = e.contents,
            u = e.dataTypes;
        while ("*" === u[0]) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)
            for (i in s)
                if (s[i] && s[i].test(r)) {
                    u.unshift(i);
                    break
                } if (u[0] in n) o = u[0];
        else {
            for (i in n) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    o = i;
                    break
                }
                a || (a = i)
            }
            o = o || a
        }
        if (o) return o !== u[0] && u.unshift(o), n[o]
    }

    function Ut(e, t, n, r) {
        var i, o, a, s, u, l = {},
            c = e.dataTypes.slice();
        if (c[1])
            for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
        o = c.shift();
        while (o)
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                if ("*" === o) o = u;
                else if ("*" !== u && u !== o) {
            if (!(a = l[u + " " + o] || l["* " + o]))
                for (i in l)
                    if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                        !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                        break
                    } if (!0 !== a)
                if (a && e["throws"]) t = a(t);
                else try {
                    t = a(t)
                } catch (e) {
                    return {
                        state: "parsererror",
                        error: a ? e : "No conversion from " + u + " to " + o
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }
    w.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ct.href,
            type: "GET",
            isLocal: Pt.test(Ct.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": $t,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": w.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? zt(zt(e, w.ajaxSettings), t) : zt(w.ajaxSettings, e)
        },
        ajaxPrefilter: Ft(It),
        ajaxTransport: Ft(Wt),
        ajax: function(t, n) {
            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var i, o, a, s, u, l, c, f, p, d, h = w.ajaxSetup({}, n),
                g = h.context || h,
                y = h.context && (g.nodeType || g.jquery) ? w(g) : w.event,
                v = w.Deferred(),
                m = w.Callbacks("once memory"),
                x = h.statusCode || {},
                b = {},
                T = {},
                C = "canceled",
                E = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (c) {
                            if (!s) {
                                s = {};
                                while (t = Ot.exec(a)) s[t[1].toLowerCase()] = t[2]
                            }
                            t = s[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return c ? a : null
                    },
                    setRequestHeader: function(e, t) {
                        return null == c && (e = T[e.toLowerCase()] = T[e.toLowerCase()] || e, b[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return null == c && (h.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (c) E.always(e[E.status]);
                            else
                                for (t in e) x[t] = [x[t], e[t]];
                        return this
                    },
                    abort: function(e) {
                        var t = e || C;
                        return i && i.abort(t), k(0, t), this
                    }
                };
            if (v.promise(E), h.url = ((t || h.url || Ct.href) + "").replace(Rt, Ct.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(M) || [""], null == h.crossDomain) {
                l = r.createElement("a");
                try {
                    l.href = h.url, l.href = l.href, h.crossDomain = Bt.protocol + "//" + Bt.host != l.protocol + "//" + l.host
                } catch (e) {
                    h.crossDomain = !0
                }
            }
            if (h.data && h.processData && "string" != typeof h.data && (h.data = w.param(h.data, h.traditional)), _t(It, h, n, E), c) return E;
            (f = w.event && h.global) && 0 == w.active++ && w.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Mt.test(h.type), o = h.url.replace(Lt, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(qt, "+")) : (d = h.url.slice(o.length), h.data && (h.processData || "string" == typeof h.data) && (o += (kt.test(o) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (o = o.replace(Ht, "$1"), d = (kt.test(o) ? "&" : "?") + "_=" + Et++ + d), h.url = o + d), h.ifModified && (w.lastModified[o] && E.setRequestHeader("If-Modified-Since", w.lastModified[o]), w.etag[o] && E.setRequestHeader("If-None-Match", w.etag[o])), (h.data && h.hasContent && !1 !== h.contentType || n.contentType) && E.setRequestHeader("Content-Type", h.contentType), E.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + $t + "; q=0.01" : "") : h.accepts["*"]);
            for (p in h.headers) E.setRequestHeader(p, h.headers[p]);
            if (h.beforeSend && (!1 === h.beforeSend.call(g, E, h) || c)) return E.abort();
            if (C = "abort", m.add(h.complete), E.done(h.success), E.fail(h.error), i = _t(Wt, h, n, E)) {
                if (E.readyState = 1, f && y.trigger("ajaxSend", [E, h]), c) return E;
                h.async && h.timeout > 0 && (u = e.setTimeout(function() {
                    E.abort("timeout")
                }, h.timeout));
                try {
                    c = !1, i.send(b, k)
                } catch (e) {
                    if (c) throw e;
                    k(-1, e)
                }
            } else k(-1, "No Transport");

            function k(t, n, r, s) {
                var l, p, d, b, T, C = n;
                c || (c = !0, u && e.clearTimeout(u), i = void 0, a = s || "", E.readyState = t > 0 ? 4 : 0, l = t >= 200 && t < 300 || 304 === t, r && (b = Xt(h, E, r)), b = Ut(h, b, E, l), l ? (h.ifModified && ((T = E.getResponseHeader("Last-Modified")) && (w.lastModified[o] = T), (T = E.getResponseHeader("etag")) && (w.etag[o] = T)), 204 === t || "HEAD" === h.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = b.state, p = b.data, l = !(d = b.error))) : (d = C, !t && C || (C = "error", t < 0 && (t = 0))), E.status = t, E.statusText = (n || C) + "", l ? v.resolveWith(g, [p, C, E]) : v.rejectWith(g, [E, C, d]), E.statusCode(x), x = void 0, f && y.trigger(l ? "ajaxSuccess" : "ajaxError", [E, h, l ? p : d]), m.fireWith(g, [E, C]), f && (y.trigger("ajaxComplete", [E, h]), --w.active || w.event.trigger("ajaxStop")))
            }
            return E
        },
        getJSON: function(e, t, n) {
            return w.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return w.get(e, void 0, t, "script")
        }
    }), w.each(["get", "post"], function(e, t) {
        w[t] = function(e, n, r, i) {
            return g(n) && (i = i || r, r = n, n = void 0), w.ajax(w.extend({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            }, w.isPlainObject(e) && e))
        }
    }), w._evalUrl = function(e) {
        return w.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    }, w.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (g(e) && (e = e.call(this[0])), t = w(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                var e = this;
                while (e.firstElementChild) e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function(e) {
            return g(e) ? this.each(function(t) {
                w(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = w(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = g(e);
            return this.each(function(n) {
                w(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                w(this).replaceWith(this.childNodes)
            }), this
        }
    }), w.expr.pseudos.hidden = function(e) {
        return !w.expr.pseudos.visible(e)
    }, w.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, w.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    };
    var Vt = {
            0: 200,
            1223: 204
        },
        Gt = w.ajaxSettings.xhr();
    h.cors = !!Gt && "withCredentials" in Gt, h.ajax = Gt = !!Gt, w.ajaxTransport(function(t) {
        var n, r;
        if (h.cors || Gt && !t.crossDomain) return {
            send: function(i, o) {
                var a, s = t.xhr();
                if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (a in t.xhrFields) s[a] = t.xhrFields[a];
                t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                for (a in i) s.setRequestHeader(a, i[a]);
                n = function(e) {
                    return function() {
                        n && (n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Vt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                            binary: s.response
                        } : {
                            text: s.responseText
                        }, s.getAllResponseHeaders()))
                    }
                }, s.onload = n(), r = s.onerror = s.ontimeout = n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                    4 === s.readyState && e.setTimeout(function() {
                        n && r()
                    })
                }, n = n("abort");
                try {
                    s.send(t.hasContent && t.data || null)
                } catch (e) {
                    if (n) throw e
                }
            },
            abort: function() {
                n && n()
            }
        }
    }), w.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }), w.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return w.globalEval(e), e
            }
        }
    }), w.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), w.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(i, o) {
                    t = w("<script>").prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type)
                    }), r.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var Yt = [],
        Qt = /(=)\?(?=&|$)|\?\?/;
    w.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Yt.pop() || w.expando + "_" + Et++;
            return this[e] = !0, e
        }
    }), w.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, o, a, s = !1 !== t.jsonp && (Qt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Qt.test(t.data) && "data");
        if (s || "jsonp" === t.dataTypes[0]) return i = t.jsonpCallback = g(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Qt, "$1" + i) : !1 !== t.jsonp && (t.url += (kt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
            return a || w.error(i + " was not called"), a[0]
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function() {
            a = arguments
        }, r.always(function() {
            void 0 === o ? w(e).removeProp(i) : e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, Yt.push(i)), a && g(o) && o(a[0]), a = o = void 0
        }), "script"
    }), h.createHTMLDocument = function() {
        var e = r.implementation.createHTMLDocument("").body;
        return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
    }(), w.parseHTML = function(e, t, n) {
        if ("string" != typeof e) return [];
        "boolean" == typeof t && (n = t, t = !1);
        var i, o, a;
        return t || (h.createHTMLDocument ? ((i = (t = r.implementation.createHTMLDocument("")).createElement("base")).href = r.location.href, t.head.appendChild(i)) : t = r), o = A.exec(e), a = !n && [], o ? [t.createElement(o[1])] : (o = xe([e], t, a), a && a.length && w(a).remove(), w.merge([], o.childNodes))
    }, w.fn.load = function(e, t, n) {
        var r, i, o, a = this,
            s = e.indexOf(" ");
        return s > -1 && (r = vt(e.slice(s)), e = e.slice(0, s)), g(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && w.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, a.html(r ? w("<div>").append(w.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }), this
    }, w.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        w.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), w.expr.pseudos.animated = function(e) {
        return w.grep(w.timers, function(t) {
            return e === t.elem
        }).length
    }, w.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, u, l, c = w.css(e, "position"),
                f = w(e),
                p = {};
            "static" === c && (e.style.position = "relative"), s = f.offset(), o = w.css(e, "top"), u = w.css(e, "left"), (l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1) ? (a = (r = f.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), g(t) && (t = t.call(e, n, w.extend({}, s))), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + i), "using" in t ? t.using.call(e, p) : f.css(p)
        }
    }, w.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                w.offset.setOffset(this, e, t)
            });
            var t, n, r = this[0];
            if (r) return r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                top: t.top + n.pageYOffset,
                left: t.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            }
        },
        position: function() {
            if (this[0]) {
                var e, t, n, r = this[0],
                    i = {
                        top: 0,
                        left: 0
                    };
                if ("fixed" === w.css(r, "position")) t = r.getBoundingClientRect();
                else {
                    t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement;
                    while (e && (e === n.body || e === n.documentElement) && "static" === w.css(e, "position")) e = e.parentNode;
                    e && e !== r && 1 === e.nodeType && ((i = w(e).offset()).top += w.css(e, "borderTopWidth", !0), i.left += w.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - i.top - w.css(r, "marginTop", !0),
                    left: t.left - i.left - w.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent;
                while (e && "static" === w.css(e, "position")) e = e.offsetParent;
                return e || be
            })
        }
    }), w.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        w.fn[e] = function(r) {
            return z(this, function(e, r, i) {
                var o;
                if (y(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === i) return o ? o[t] : e[r];
                o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i
            }, e, r, arguments.length)
        }
    }), w.each(["top", "left"], function(e, t) {
        w.cssHooks[t] = _e(h.pixelPosition, function(e, n) {
            if (n) return n = Fe(e, t), We.test(n) ? w(e).position()[t] + "px" : n
        })
    }), w.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        w.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            w.fn[r] = function(i, o) {
                var a = arguments.length && (n || "boolean" != typeof i),
                    s = n || (!0 === i || !0 === o ? "margin" : "border");
                return z(this, function(t, n, i) {
                    var o;
                    return y(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? w.css(t, n, s) : w.style(t, n, i, s)
                }, t, a ? i : void 0, a)
            }
        })
    }), w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
        w.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), w.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), w.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }), w.proxy = function(e, t) {
        var n, r, i;
        if ("string" == typeof t && (n = e[t], t = e, e = n), g(e)) return r = o.call(arguments, 2), i = function() {
            return e.apply(t || this, r.concat(o.call(arguments)))
        }, i.guid = e.guid = e.guid || w.guid++, i
    }, w.holdReady = function(e) {
        e ? w.readyWait++ : w.ready(!0)
    }, w.isArray = Array.isArray, w.parseJSON = JSON.parse, w.nodeName = N, w.isFunction = g, w.isWindow = y, w.camelCase = G, w.type = x, w.now = Date.now, w.isNumeric = function(e) {
        var t = w.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }, "function" == typeof define && define.amd && define("jquery", [], function() {
        return w
    });
    var Jt = e.jQuery,
        Kt = e.$;
    return w.noConflict = function(t) {
        return e.$ === w && (e.$ = Kt), t && e.jQuery === w && (e.jQuery = Jt), w
    }, t || (e.jQuery = e.$ = w), w
});















/*! jQuery Migrate v1.2.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
jQuery.migrateMute === void 0 && (jQuery.migrateMute = !0),
    function(e, t, n) {
        function r(n) {
            var r = t.console;
            i[n] || (i[n] = !0, e.migrateWarnings.push(n), r && r.warn && !e.migrateMute && (r.warn("JQMIGRATE: " + n), e.migrateTrace && r.trace && r.trace()))
        }

        function a(t, a, i, o) {
            if (Object.defineProperty) try {
                return Object.defineProperty(t, a, {
                    configurable: !0,
                    enumerable: !0,
                    get: function() {
                        return r(o), i
                    },
                    set: function(e) {
                        r(o), i = e
                    }
                }), n
            } catch (s) {}
            e._definePropertyBroken = !0, t[a] = i
        }
        var i = {};
        e.migrateWarnings = [], !e.migrateMute && t.console && t.console.log && t.console.log("JQMIGRATE: Logging is active"), e.migrateTrace === n && (e.migrateTrace = !0), e.migrateReset = function() {
            i = {}, e.migrateWarnings.length = 0
        }, "BackCompat" === document.compatMode && r("jQuery is not compatible with Quirks Mode");
        var o = e("<input/>", {
                size: 1
            }).attr("size") && e.attrFn,
            s = e.attr,
            u = e.attrHooks.value && e.attrHooks.value.get || function() {
                return null
            },
            c = e.attrHooks.value && e.attrHooks.value.set || function() {
                return n
            },
            l = /^(?:input|button)$/i,
            d = /^[238]$/,
            p = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
            f = /^(?:checked|selected)$/i;
        a(e, "attrFn", o || {}, "jQuery.attrFn is deprecated"), e.attr = function(t, a, i, u) {
            var c = a.toLowerCase(),
                g = t && t.nodeType;
            return u && (4 > s.length && r("jQuery.fn.attr( props, pass ) is deprecated"), t && !d.test(g) && (o ? a in o : e.isFunction(e.fn[a]))) ? e(t)[a](i) : ("type" === a && i !== n && l.test(t.nodeName) && t.parentNode && r("Can't change the 'type' of an input or button in IE 6/7/8"), !e.attrHooks[c] && p.test(c) && (e.attrHooks[c] = {
                get: function(t, r) {
                    var a, i = e.prop(t, r);
                    return i === !0 || "boolean" != typeof i && (a = t.getAttributeNode(r)) && a.nodeValue !== !1 ? r.toLowerCase() : n
                },
                set: function(t, n, r) {
                    var a;
                    return n === !1 ? e.removeAttr(t, r) : (a = e.propFix[r] || r, a in t && (t[a] = !0), t.setAttribute(r, r.toLowerCase())), r
                }
            }, f.test(c) && r("jQuery.fn.attr('" + c + "') may use property instead of attribute")), s.call(e, t, a, i))
        }, e.attrHooks.value = {
            get: function(e, t) {
                var n = (e.nodeName || "").toLowerCase();
                return "button" === n ? u.apply(this, arguments) : ("input" !== n && "option" !== n && r("jQuery.fn.attr('value') no longer gets properties"), t in e ? e.value : null)
            },
            set: function(e, t) {
                var a = (e.nodeName || "").toLowerCase();
                return "button" === a ? c.apply(this, arguments) : ("input" !== a && "option" !== a && r("jQuery.fn.attr('value', val) no longer sets properties"), e.value = t, n)
            }
        };
        var g, h, v = e.fn.init,
            m = e.parseJSON,
            y = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
        e.fn.init = function(t, n, a) {
            var i;
            return t && "string" == typeof t && !e.isPlainObject(n) && (i = y.exec(e.trim(t))) && i[0] && ("<" !== t.charAt(0) && r("$(html) HTML strings must start with '<' character"), i[3] && r("$(html) HTML text after last tag is ignored"), "#" === i[0].charAt(0) && (r("HTML string cannot start with a '#' character"), e.error("JQMIGRATE: Invalid selector string (XSS)")), n && n.context && (n = n.context), e.parseHTML) ? v.call(this, e.parseHTML(i[2], n, !0), n, a) : v.apply(this, arguments)
        }, e.fn.init.prototype = e.fn, e.parseJSON = function(e) {
            return e || null === e ? m.apply(this, arguments) : (r("jQuery.parseJSON requires a valid JSON string"), null)
        }, e.uaMatch = function(e) {
            e = e.toLowerCase();
            var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || 0 > e.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
            return {
                browser: t[1] || "",
                version: t[2] || "0"
            }
        }, e.browser || (g = e.uaMatch(navigator.userAgent), h = {}, g.browser && (h[g.browser] = !0, h.version = g.version), h.chrome ? h.webkit = !0 : h.webkit && (h.safari = !0), e.browser = h), a(e, "browser", e.browser, "jQuery.browser is deprecated"), e.sub = function() {
            function t(e, n) {
                return new t.fn.init(e, n)
            }
            e.extend(!0, t, this), t.superclass = this, t.fn = t.prototype = this(), t.fn.constructor = t, t.sub = this.sub, t.fn.init = function(r, a) {
                return a && a instanceof e && !(a instanceof t) && (a = t(a)), e.fn.init.call(this, r, a, n)
            }, t.fn.init.prototype = t.fn;
            var n = t(document);
            return r("jQuery.sub() is deprecated"), t
        }, e.ajaxSetup({
            converters: {
                "text json": e.parseJSON
            }
        });
        var b = e.fn.data;
        e.fn.data = function(t) {
            var a, i, o = this[0];
            return !o || "events" !== t || 1 !== arguments.length || (a = e.data(o, t), i = e._data(o, t), a !== n && a !== i || i === n) ? b.apply(this, arguments) : (r("Use of jQuery.fn.data('events') is deprecated"), i)
        };
        var j = /\/(java|ecma)script/i,
            w = e.fn.andSelf || e.fn.addBack;
        e.fn.andSelf = function() {
            return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), w.apply(this, arguments)
        }, e.clean || (e.clean = function(t, a, i, o) {
            a = a || document, a = !a.nodeType && a[0] || a, a = a.ownerDocument || a, r("jQuery.clean() is deprecated");
            var s, u, c, l, d = [];
            if (e.merge(d, e.buildFragment(t, a).childNodes), i)
                for (c = function(e) {
                        return !e.type || j.test(e.type) ? o ? o.push(e.parentNode ? e.parentNode.removeChild(e) : e) : i.appendChild(e) : n
                    }, s = 0; null != (u = d[s]); s++) e.nodeName(u, "script") && c(u) || (i.appendChild(u), u.getElementsByTagName !== n && (l = e.grep(e.merge([], u.getElementsByTagName("script")), c), d.splice.apply(d, [s + 1, 0].concat(l)), s += l.length));
            return d
        });
        var Q = e.event.add,
            x = e.event.remove,
            k = e.event.trigger,
            N = e.fn.toggle,
            T = e.fn.live,
            M = e.fn.die,
            S = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
            C = RegExp("\\b(?:" + S + ")\\b"),
            H = /(?:^|\s)hover(\.\S+|)\b/,
            A = function(t) {
                return "string" != typeof t || e.event.special.hover ? t : (H.test(t) && r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), t && t.replace(H, "mouseenter$1 mouseleave$1"))
            };
        e.event.props && "attrChange" !== e.event.props[0] && e.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), e.event.dispatch && a(e.event, "handle", e.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), e.event.add = function(e, t, n, a, i) {
            e !== document && C.test(t) && r("AJAX events should be attached to document: " + t), Q.call(this, e, A(t || ""), n, a, i)
        }, e.event.remove = function(e, t, n, r, a) {
            x.call(this, e, A(t) || "", n, r, a)
        }, e.fn.error = function() {
            var e = Array.prototype.slice.call(arguments, 0);
            return r("jQuery.fn.error() is deprecated"), e.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, e) : (this.triggerHandler.apply(this, e), this)
        }, e.fn.toggle = function(t, n) {
            if (!e.isFunction(t) || !e.isFunction(n)) return N.apply(this, arguments);
            r("jQuery.fn.toggle(handler, handler...) is deprecated");
            var a = arguments,
                i = t.guid || e.guid++,
                o = 0,
                s = function(n) {
                    var r = (e._data(this, "lastToggle" + t.guid) || 0) % o;
                    return e._data(this, "lastToggle" + t.guid, r + 1), n.preventDefault(), a[r].apply(this, arguments) || !1
                };
            for (s.guid = i; a.length > o;) a[o++].guid = i;
            return this.click(s)
        }, e.fn.live = function(t, n, a) {
            return r("jQuery.fn.live() is deprecated"), T ? T.apply(this, arguments) : (e(this.context).on(t, this.selector, n, a), this)
        }, e.fn.die = function(t, n) {
            return r("jQuery.fn.die() is deprecated"), M ? M.apply(this, arguments) : (e(this.context).off(t, this.selector || "**", n), this)
        }, e.event.trigger = function(e, t, n, a) {
            return n || C.test(e) || r("Global events are undocumented and deprecated"), k.call(this, e, t, n || document, a)
        }, e.each(S.split("|"), function(t, n) {
            e.event.special[n] = {
                setup: function() {
                    var t = this;
                    return t !== document && (e.event.add(document, n + "." + e.guid, function() {
                        e.event.trigger(n, null, t, !0)
                    }), e._data(this, n, e.guid++)), !1
                },
                teardown: function() {
                    return this !== document && e.event.remove(document, n + "." + e._data(this, n)), !1
                }
            }
        })
    }(jQuery, window);











    /*  jQuery Nice Select - v1.0
    https://github.com/hernansartorio/jquery-nice-select
    Made by Hernán Sartorio  */
! function(e) {
    e.fn.niceSelect = function(t) {
        function s(t) {
            t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>'));
            var s = t.next(),
                n = t.find("option"),
                i = t.find("option:selected");
            s.find(".current").html(i.data("display") || i.text()), n.each(function(t) {
                var n = e(this),
                    i = n.data("display");
                s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text()))
            })
        }
        if ("string" == typeof t) return "update" == t ? this.each(function() {
            var t = e(this),
                n = e(this).next(".nice-select"),
                i = n.hasClass("open");
            n.length && (n.remove(), s(t), i && t.next().trigger("click"))
        }) : "destroy" == t ? (this.each(function() {
            var t = e(this),
                s = e(this).next(".nice-select");
            s.length && (s.remove(), t.css("display", ""))
        }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this;
        this.hide(), this.each(function() {
            var t = e(this);
            t.next().hasClass("nice-select") || s(t)
        }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function(t) {
            var s = e(this);
            e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus()
        }), e(document).on("click.nice_select", function(t) {
            0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option")
        }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function(t) {
            var s = e(this),
                n = s.closest(".nice-select");
            n.find(".selected").removeClass("selected"), s.addClass("selected");
            var i = s.data("display") || s.text();
            n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change")
        }), e(document).on("keydown.nice_select", ".nice-select", function(t) {
            var s = e(this),
                n = e(s.find(".focus") || s.find(".list .option.selected"));
            if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1;
            if (40 == t.keyCode) {
                if (s.hasClass("open")) {
                    var i = n.nextAll(".option:not(.disabled)").first();
                    i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus"))
                } else s.trigger("click");
                return !1
            }
            if (38 == t.keyCode) {
                if (s.hasClass("open")) {
                    var l = n.prevAll(".option:not(.disabled)").first();
                    l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus"))
                } else s.trigger("click");
                return !1
            }
            if (27 == t.keyCode) s.hasClass("open") && s.trigger("click");
            else if (9 == t.keyCode && s.hasClass("open")) return !1
        });
        var n = document.createElement("a").style;
        return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this
    }
}(jQuery);
















/*!
 * SlickNav Responsive Mobile Menu v1.0.10
 * (c) 2016 Josh Cope
 * licensed under MIT
 */
! function(e, t, n) {
    function a(t, n) {
        this.element = t, this.settings = e.extend({}, i, n), this.settings.duplicate || n.hasOwnProperty("removeIds") || (this.settings.removeIds = !1), this._defaults = i, this._name = s, this.init()
    }
    var i = {
            label: "MENU",
            duplicate: !0,
            duration: 200,
            easingOpen: "swing",
            easingClose: "swing",
            closedSymbol: "&#9658;",
            openedSymbol: "&#9660;",
            prependTo: "body",
            appendTo: "",
            parentTag: "a",
            closeOnClick: !1,
            allowParentLinks: !1,
            nestedParentLinks: !0,
            showChildren: !1,
            removeIds: !0,
            removeClasses: !1,
            removeStyles: !1,
            brand: "",
            animations: "jquery",
            init: function() {},
            beforeOpen: function() {},
            beforeClose: function() {},
            afterOpen: function() {},
            afterClose: function() {}
        },
        s = "slicknav",
        o = "slicknav",
        l = {
            DOWN: 40,
            ENTER: 13,
            ESCAPE: 27,
            LEFT: 37,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        };
    a.prototype.init = function() {
        var n, a, i = this,
            s = e(this.element),
            r = this.settings;
        if (r.duplicate ? i.mobileNav = s.clone() : i.mobileNav = s, r.removeIds && (i.mobileNav.removeAttr("id"), i.mobileNav.find("*").each(function(t, n) {
                e(n).removeAttr("id")
            })), r.removeClasses && (i.mobileNav.removeAttr("class"), i.mobileNav.find("*").each(function(t, n) {
                e(n).removeAttr("class")
            })), r.removeStyles && (i.mobileNav.removeAttr("style"), i.mobileNav.find("*").each(function(t, n) {
                e(n).removeAttr("style")
            })), n = o + "_icon", "" === r.label && (n += " " + o + "_no-text"), "a" == r.parentTag && (r.parentTag = 'a href="#"'), i.mobileNav.attr("class", o + "_nav"), a = e('<div class="' + o + '_menu"></div>'), "" !== r.brand) {
            var c = e('<div class="' + o + '_brand">' + r.brand + "</div>");
            e(a).append(c)
        }
        i.btn = e(["<" + r.parentTag + ' aria-haspopup="true" role="button" tabindex="0" class="' + o + "_btn " + o + '_collapsed">', '<span class="' + o + '_menutxt">' + r.label + "</span>", '<span class="' + n + '">', '<span class="' + o + '_icon-bar"></span>', '<span class="' + o + '_icon-bar"></span>', '<span class="' + o + '_icon-bar"></span>', "</span>", "</" + r.parentTag + ">"].join("")), e(a).append(i.btn), "" !== r.appendTo ? e(r.appendTo).append(a) : e(r.prependTo).prepend(a), a.append(i.mobileNav);
        var p = i.mobileNav.find("li");
        e(p).each(function() {
            var t = e(this),
                n = {};
            if (n.children = t.children("ul").attr("role", "menu"), t.data("menu", n), n.children.length > 0) {
                var a = t.contents(),
                    s = !1,
                    l = [];
                e(a).each(function() {
                    return e(this).is("ul") ? !1 : (l.push(this), void(e(this).is("a") && (s = !0)))
                });
                var c = e("<" + r.parentTag + ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' + o + '_item"/>');
                if (r.allowParentLinks && !r.nestedParentLinks && s) e(l).wrapAll('<span class="' + o + "_parent-link " + o + '_row"/>').parent();
                else {
                    var p = e(l).wrapAll(c).parent();
                    p.addClass(o + "_row")
                }
                r.showChildren ? t.addClass(o + "_open") : t.addClass(o + "_collapsed"), t.addClass(o + "_parent");
                var d = e('<span class="' + o + '_arrow">' + (r.showChildren ? r.openedSymbol : r.closedSymbol) + "</span>");
                r.allowParentLinks && !r.nestedParentLinks && s && (d = d.wrap(c).parent()), e(l).last().after(d)
            } else 0 === t.children().length && t.addClass(o + "_txtnode");
            t.children("a").attr("role", "menuitem").click(function(t) {
                r.closeOnClick && !e(t.target).parent().closest("li").hasClass(o + "_parent") && e(i.btn).click()
            }), r.closeOnClick && r.allowParentLinks && (t.children("a").children("a").click(function(t) {
                e(i.btn).click()
            }), t.find("." + o + "_parent-link a:not(." + o + "_item)").click(function(t) {
                e(i.btn).click()
            }))
        }), e(p).each(function() {
            var t = e(this).data("menu");
            r.showChildren || i._visibilityToggle(t.children, null, !1, null, !0)
        }), i._visibilityToggle(i.mobileNav, null, !1, "init", !0), i.mobileNav.attr("role", "menu"), e(t).mousedown(function() {
            i._outlines(!1)
        }), e(t).keyup(function() {
            i._outlines(!0)
        }), e(i.btn).click(function(e) {
            e.preventDefault(), i._menuToggle()
        }), i.mobileNav.on("click", "." + o + "_item", function(t) {
            t.preventDefault(), i._itemClick(e(this))
        }), e(i.btn).keydown(function(t) {
            var n = t || event;
            switch (n.keyCode) {
                case l.ENTER:
                case l.SPACE:
                case l.DOWN:
                    t.preventDefault(), n.keyCode === l.DOWN && e(i.btn).hasClass(o + "_open") || i._menuToggle(), e(i.btn).next().find('[role="menuitem"]').first().focus()
            }
        }), i.mobileNav.on("keydown", "." + o + "_item", function(t) {
            var n = t || event;
            switch (n.keyCode) {
                case l.ENTER:
                    t.preventDefault(), i._itemClick(e(t.target));
                    break;
                case l.RIGHT:
                    t.preventDefault(), e(t.target).parent().hasClass(o + "_collapsed") && i._itemClick(e(t.target)), e(t.target).next().find('[role="menuitem"]').first().focus()
            }
        }), i.mobileNav.on("keydown", '[role="menuitem"]', function(t) {
            var n = t || event;
            switch (n.keyCode) {
                case l.DOWN:
                    t.preventDefault();
                    var a = e(t.target).parent().parent().children().children('[role="menuitem"]:visible'),
                        s = a.index(t.target),
                        r = s + 1;
                    a.length <= r && (r = 0);
                    var c = a.eq(r);
                    c.focus();
                    break;
                case l.UP:
                    t.preventDefault();
                    var a = e(t.target).parent().parent().children().children('[role="menuitem"]:visible'),
                        s = a.index(t.target),
                        c = a.eq(s - 1);
                    c.focus();
                    break;
                case l.LEFT:
                    if (t.preventDefault(), e(t.target).parent().parent().parent().hasClass(o + "_open")) {
                        var p = e(t.target).parent().parent().prev();
                        p.focus(), i._itemClick(p)
                    } else e(t.target).parent().parent().hasClass(o + "_nav") && (i._menuToggle(), e(i.btn).focus());
                    break;
                case l.ESCAPE:
                    t.preventDefault(), i._menuToggle(), e(i.btn).focus()
            }
        }), r.allowParentLinks && r.nestedParentLinks && e("." + o + "_item a").click(function(e) {
            e.stopImmediatePropagation()
        })
    }, a.prototype._menuToggle = function(e) {
        var t = this,
            n = t.btn,
            a = t.mobileNav;
        n.hasClass(o + "_collapsed") ? (n.removeClass(o + "_collapsed"), n.addClass(o + "_open")) : (n.removeClass(o + "_open"), n.addClass(o + "_collapsed")), n.addClass(o + "_animating"), t._visibilityToggle(a, n.parent(), !0, n)
    }, a.prototype._itemClick = function(e) {
        var t = this,
            n = t.settings,
            a = e.data("menu");
        a || (a = {}, a.arrow = e.children("." + o + "_arrow"), a.ul = e.next("ul"), a.parent = e.parent(), a.parent.hasClass(o + "_parent-link") && (a.parent = e.parent().parent(), a.ul = e.parent().next("ul")), e.data("menu", a)), a.parent.hasClass(o + "_collapsed") ? (a.arrow.html(n.openedSymbol), a.parent.removeClass(o + "_collapsed"), a.parent.addClass(o + "_open"), a.parent.addClass(o + "_animating"), t._visibilityToggle(a.ul, a.parent, !0, e)) : (a.arrow.html(n.closedSymbol), a.parent.addClass(o + "_collapsed"), a.parent.removeClass(o + "_open"), a.parent.addClass(o + "_animating"), t._visibilityToggle(a.ul, a.parent, !0, e))
    }, a.prototype._visibilityToggle = function(t, n, a, i, s) {
        function l(t, n) {
            e(t).removeClass(o + "_animating"), e(n).removeClass(o + "_animating"), s || p.afterOpen(t)
        }

        function r(n, a) {
            t.attr("aria-hidden", "true"), d.attr("tabindex", "-1"), c._setVisAttr(t, !0), t.hide(), e(n).removeClass(o + "_animating"), e(a).removeClass(o + "_animating"), s ? "init" == n && p.init() : p.afterClose(n)
        }
        var c = this,
            p = c.settings,
            d = c._getActionItems(t),
            u = 0;
        a && (u = p.duration), t.hasClass(o + "_hidden") ? (t.removeClass(o + "_hidden"), s || p.beforeOpen(i), "jquery" === p.animations ? t.stop(!0, !0).slideDown(u, p.easingOpen, function() {
            l(i, n)
        }) : "velocity" === p.animations && t.velocity("finish").velocity("slideDown", {
            duration: u,
            easing: p.easingOpen,
            complete: function() {
                l(i, n)
            }
        }), t.attr("aria-hidden", "false"), d.attr("tabindex", "0"), c._setVisAttr(t, !1)) : (t.addClass(o + "_hidden"), s || p.beforeClose(i), "jquery" === p.animations ? t.stop(!0, !0).slideUp(u, this.settings.easingClose, function() {
            r(i, n)
        }) : "velocity" === p.animations && t.velocity("finish").velocity("slideUp", {
            duration: u,
            easing: p.easingClose,
            complete: function() {
                r(i, n)
            }
        }))
    }, a.prototype._setVisAttr = function(t, n) {
        var a = this,
            i = t.children("li").children("ul").not("." + o + "_hidden");
        n ? i.each(function() {
            var t = e(this);
            t.attr("aria-hidden", "true");
            var i = a._getActionItems(t);
            i.attr("tabindex", "-1"), a._setVisAttr(t, n)
        }) : i.each(function() {
            var t = e(this);
            t.attr("aria-hidden", "false");
            var i = a._getActionItems(t);
            i.attr("tabindex", "0"), a._setVisAttr(t, n)
        })
    }, a.prototype._getActionItems = function(e) {
        var t = e.data("menu");
        if (!t) {
            t = {};
            var n = e.children("li"),
                a = n.find("a");
            t.links = a.add(n.find("." + o + "_item")), e.data("menu", t)
        }
        return t.links
    }, a.prototype._outlines = function(t) {
        t ? e("." + o + "_item, ." + o + "_btn").css("outline", "") : e("." + o + "_item, ." + o + "_btn").css("outline", "none")
    }, a.prototype.toggle = function() {
        var e = this;
        e._menuToggle()
    }, a.prototype.open = function() {
        var e = this;
        e.btn.hasClass(o + "_collapsed") && e._menuToggle()
    }, a.prototype.close = function() {
        var e = this;
        e.btn.hasClass(o + "_open") && e._menuToggle()
    }, e.fn[s] = function(t) {
        var n = arguments;
        if (void 0 === t || "object" == typeof t) return this.each(function() {
            e.data(this, "plugin_" + s) || e.data(this, "plugin_" + s, new a(this, t))
        });
        if ("string" == typeof t && "_" !== t[0] && "init" !== t) {
            var i;
            return this.each(function() {
                var o = e.data(this, "plugin_" + s);
                o instanceof a && "function" == typeof o[t] && (i = o[t].apply(o, Array.prototype.slice.call(n, 1)))
            }), void 0 !== i ? i : this
        }
    }
}(jQuery, document, window);



















! function(t, i) {
    "object" == typeof exports && "undefined" != typeof module ? i(exports) : "function" == typeof define && define.amd ? define(["exports"], i) : i(t.L = {})
}(this, function(t) {
    "use strict";

    function i(t) {
        var i, e, n, o;
        for (e = 1, n = arguments.length; e < n; e++)
            for (i in o = arguments[e]) t[i] = o[i];
        return t
    }

    function e(t, i) {
        var e = Array.prototype.slice;
        if (t.bind) return t.bind.apply(t, e.call(arguments, 1));
        var n = e.call(arguments, 2);
        return function() {
            return t.apply(i, n.length ? n.concat(e.call(arguments)) : arguments)
        }
    }

    function n(t) {
        return t._leaflet_id = t._leaflet_id || ++Gt, t._leaflet_id
    }

    function o(t, i, e) {
        var n, o, s, r;
        return r = function() {
            n = !1, o && (s.apply(e, o), o = !1)
        }, s = function() {
            n ? o = arguments : (t.apply(e, arguments), setTimeout(r, i), n = !0)
        }
    }

    function s(t, i, e) {
        var n = i[1],
            o = i[0],
            s = n - o;
        return t === n && e ? t : ((t - o) % s + s) % s + o
    }

    function r() {
        return !1
    }

    function a(t, i) {
        var e = Math.pow(10, void 0 === i ? 6 : i);
        return Math.round(t * e) / e
    }

    function h(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
    }

    function u(t) {
        return h(t).split(/\s+/)
    }

    function l(t, i) {
        for (var e in t.hasOwnProperty("options") || (t.options = t.options ? Vt(t.options) : {}), i) t.options[e] = i[e];
        return t.options
    }

    function c(t, i, e) {
        var n = [];
        for (var o in t) n.push(encodeURIComponent(e ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
        return (i && -1 !== i.indexOf("?") ? "&" : "?") + n.join("&")
    }

    function _(t, i) {
        return t.replace(Kt, function(t, e) {
            var n = i[e];
            if (void 0 === n) throw new Error("No value provided for variable " + t);
            return "function" == typeof n && (n = n(i)), n
        })
    }

    function d(t, i) {
        for (var e = 0; e < t.length; e++)
            if (t[e] === i) return e;
        return -1
    }

    function p(t) {
        return window["webkit" + t] || window["moz" + t] || window["ms" + t]
    }

    function m(t) {
        var i = +new Date,
            e = Math.max(0, 16 - (i - Jt));
        return Jt = i + e, window.setTimeout(t, e)
    }

    function f(t, i, n) {
        if (!n || $t !== m) return $t.call(window, e(t, i));
        t.call(i)
    }

    function g(t) {
        t && Qt.call(window, t)
    }

    function v() {}

    function y(t, i, e) {
        this.x = e ? Math.round(t) : t, this.y = e ? Math.round(i) : i
    }

    function x(t, i, e) {
        return t instanceof y ? t : Yt(t) ? new y(t[0], t[1]) : null == t ? t : "object" == typeof t && "x" in t && "y" in t ? new y(t.x, t.y) : new y(t, i, e)
    }

    function w(t, i) {
        if (t)
            for (var e = i ? [t, i] : t, n = 0, o = e.length; n < o; n++) this.extend(e[n])
    }

    function P(t, i) {
        return !t || t instanceof w ? t : new w(t, i)
    }

    function b(t, i) {
        if (t)
            for (var e = i ? [t, i] : t, n = 0, o = e.length; n < o; n++) this.extend(e[n])
    }

    function T(t, i) {
        return t instanceof b ? t : new b(t, i)
    }

    function z(t, i, e) {
        if (isNaN(t) || isNaN(i)) throw new Error("Invalid LatLng object: (" + t + ", " + i + ")");
        this.lat = +t, this.lng = +i, void 0 !== e && (this.alt = +e)
    }

    function M(t, i, e) {
        return t instanceof z ? t : Yt(t) && "object" != typeof t[0] ? 3 === t.length ? new z(t[0], t[1], t[2]) : 2 === t.length ? new z(t[0], t[1]) : null : null == t ? t : "object" == typeof t && "lat" in t ? new z(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : void 0 === i ? null : new z(t, i, e)
    }

    function C(t, i, e, n) {
        if (Yt(t)) return this._a = t[0], this._b = t[1], this._c = t[2], void(this._d = t[3]);
        this._a = t, this._b = i, this._c = e, this._d = n
    }

    function S(t, i, e, n) {
        return new C(t, i, e, n)
    }

    function Z(t) {
        return document.createElementNS("http://www.w3.org/2000/svg", t)
    }

    function E(t, i) {
        var e, n, o, s, r, a, h = "";
        for (e = 0, o = t.length; e < o; e++) {
            for (n = 0, s = (r = t[e]).length; n < s; n++) h += (n ? "L" : "M") + (a = r[n]).x + " " + a.y;
            h += i ? Hi ? "z" : "x" : ""
        }
        return h || "M0 0"
    }

    function k(t) {
        return navigator.userAgent.toLowerCase().indexOf(t) >= 0
    }

    function A(t, i, e, n) {
        return "touchstart" === i ? B(t, e, n) : "touchmove" === i ? function(t, i, e) {
            var n = function(t) {
                (t.pointerType !== t.MSPOINTER_TYPE_MOUSE && "mouse" !== t.pointerType || 0 !== t.buttons) && D(t, i)
            };
            t["_leaflet_touchmove" + e] = n, t.addEventListener(Vi, n, !1)
        }(t, e, n) : "touchend" === i && function(t, i, e) {
            var n = function(t) {
                D(t, i)
            };
            t["_leaflet_touchend" + e] = n, t.addEventListener(Gi, n, !1), t.addEventListener(Ki, n, !1)
        }(t, e, n), this
    }

    function B(t, i, n) {
        var o = e(function(t) {
            if ("mouse" !== t.pointerType && t.MSPOINTER_TYPE_MOUSE && t.pointerType !== t.MSPOINTER_TYPE_MOUSE) {
                if (!(Yi.indexOf(t.target.tagName) < 0)) return;
                gt(t)
            }
            D(t, i)
        });
        t["_leaflet_touchstart" + n] = o, t.addEventListener(Ui, o, !1), Ji || (document.documentElement.addEventListener(Ui, I, !0), document.documentElement.addEventListener(Vi, O, !0), document.documentElement.addEventListener(Gi, R, !0), document.documentElement.addEventListener(Ki, R, !0), Ji = !0)
    }

    function I(t) {
        Xi[t.pointerId] = t, $i++
    }

    function O(t) {
        Xi[t.pointerId] && (Xi[t.pointerId] = t)
    }

    function R(t) {
        delete Xi[t.pointerId], $i--
    }

    function D(t, i) {
        for (var e in t.touches = [], Xi) t.touches.push(Xi[e]);
        t.changedTouches = [t], i(t)
    }

    function N(t, i, e) {
        function n(t) {
            var i;
            if (Oi) {
                if (!mi || "mouse" === t.pointerType) return;
                i = $i
            } else i = t.touches.length;
            if (!(i > 1)) {
                var e = Date.now(),
                    n = e - (s || e);
                r = t.touches ? t.touches[0] : t, a = n > 0 && n <= h, s = e
            }
        }

        function o(t) {
            if (a && !r.cancelBubble) {
                if (Oi) {
                    if (!mi || "mouse" === t.pointerType) return;
                    var e, n, o = {};
                    for (n in r) e = r[n], o[n] = e && e.bind ? e.bind(r) : e;
                    r = o
                }
                r.type = "dblclick", i(r), s = null
            }
        }
        var s, r, a = !1,
            h = 250;
        return t[ie + Qi + e] = n, t[ie + te + e] = o, t[ie + "dblclick" + e] = i, t.addEventListener(Qi, n, !1), t.addEventListener(te, o, !1), t.addEventListener("dblclick", i, !1), this
    }

    function j(t, i) {
        var e = t[ie + Qi + i],
            n = t[ie + te + i],
            o = t[ie + "dblclick" + i];
        return t.removeEventListener(Qi, e, !1), t.removeEventListener(te, n, !1), mi || t.removeEventListener("dblclick", o, !1), this
    }

    function W(t) {
        return "string" == typeof t ? document.getElementById(t) : t
    }

    function H(t, i) {
        var e = t.style[i] || t.currentStyle && t.currentStyle[i];
        if ((!e || "auto" === e) && document.defaultView) {
            var n = document.defaultView.getComputedStyle(t, null);
            e = n ? n[i] : null
        }
        return "auto" === e ? null : e
    }

    function F(t, i, e) {
        var n = document.createElement(t);
        return n.className = i || "", e && e.appendChild(n), n
    }

    function q(t) {
        var i = t.parentNode;
        i && i.removeChild(t)
    }

    function U(t) {
        for (; t.firstChild;) t.removeChild(t.firstChild)
    }

    function V(t) {
        var i = t.parentNode;
        i.lastChild !== t && i.appendChild(t)
    }

    function G(t) {
        var i = t.parentNode;
        i.firstChild !== t && i.insertBefore(t, i.firstChild)
    }

    function K(t, i) {
        if (void 0 !== t.classList) return t.classList.contains(i);
        var e = $(t);
        return e.length > 0 && new RegExp("(^|\\s)" + i + "(\\s|$)").test(e)
    }

    function Y(t, i) {
        if (void 0 !== t.classList)
            for (var e = u(i), n = 0, o = e.length; n < o; n++) t.classList.add(e[n]);
        else if (!K(t, i)) {
            var s = $(t);
            J(t, (s ? s + " " : "") + i)
        }
    }

    function X(t, i) {
        void 0 !== t.classList ? t.classList.remove(i) : J(t, h((" " + $(t) + " ").replace(" " + i + " ", " ")))
    }

    function J(t, i) {
        void 0 === t.className.baseVal ? t.className = i : t.className.baseVal = i
    }

    function $(t) {
        return void 0 === t.className.baseVal ? t.className : t.className.baseVal
    }

    function Q(t, i) {
        "opacity" in t.style ? t.style.opacity = i : "filter" in t.style && function(t, i) {
            var e = !1,
                n = "DXImageTransform.Microsoft.Alpha";
            try {
                e = t.filters.item(n)
            } catch (t) {
                if (1 === i) return
            }
            i = Math.round(100 * i), e ? (e.Enabled = 100 !== i, e.Opacity = i) : t.style.filter += " progid:" + n + "(opacity=" + i + ")"
        }(t, i)
    }

    function tt(t) {
        for (var i = document.documentElement.style, e = 0; e < t.length; e++)
            if (t[e] in i) return t[e];
        return !1
    }

    function it(t, i, e) {
        var n = i || new y(0, 0);
        t.style[ee] = (Ci ? "translate(" + n.x + "px," + n.y + "px)" : "translate3d(" + n.x + "px," + n.y + "px,0)") + (e ? " scale(" + e + ")" : "")
    }

    function et(t, i) {
        t._leaflet_pos = i, Ei ? it(t, i) : (t.style.left = i.x + "px", t.style.top = i.y + "px")
    }

    function nt(t) {
        return t._leaflet_pos || new y(0, 0)
    }

    function ot() {
        lt(window, "dragstart", gt)
    }

    function st() {
        ct(window, "dragstart", gt)
    }

    function rt(t) {
        for (; - 1 === t.tabIndex;) t = t.parentNode;
        t.style && (at(), re = t, ae = t.style.outline, t.style.outline = "none", lt(window, "keydown", at))
    }

    function at() {
        re && (re.style.outline = ae, re = void 0, ae = void 0, ct(window, "keydown", at))
    }

    function ht(t) {
        do {
            t = t.parentNode
        } while (!(t.offsetWidth && t.offsetHeight || t === document.body));
        return t
    }

    function ut(t) {
        var i = t.getBoundingClientRect();
        return {
            x: i.width / t.offsetWidth || 1,
            y: i.height / t.offsetHeight || 1,
            boundingClientRect: i
        }
    }

    function lt(t, i, e, n) {
        if ("object" == typeof i)
            for (var o in i) _t(t, o, i[o], e);
        else
            for (var s = 0, r = (i = u(i)).length; s < r; s++) _t(t, i[s], e, n);
        return this
    }

    function ct(t, i, e, n) {
        if ("object" == typeof i)
            for (var o in i) dt(t, o, i[o], e);
        else if (i)
            for (var s = 0, r = (i = u(i)).length; s < r; s++) dt(t, i[s], e, n);
        else {
            for (var a in t[le]) dt(t, a, t[le][a]);
            delete t[le]
        }
        return this
    }

    function _t(t, i, e, o) {
        var s = i + n(e) + (o ? "_" + n(o) : "");
        if (t[le] && t[le][s]) return this;
        var r = function(i) {
                return e.call(o || t, i || window.event)
            },
            a = r;
        Oi && 0 === i.indexOf("touch") ? A(t, i, r, s) : !Ri || "dblclick" !== i || !N || Oi && Li ? "addEventListener" in t ? "mousewheel" === i ? t.addEventListener("onwheel" in t ? "wheel" : "mousewheel", r, !1) : "mouseenter" === i || "mouseleave" === i ? (r = function(i) {
            i = i || window.event, Pt(t, i) && a(i)
        }, t.addEventListener("mouseenter" === i ? "mouseover" : "mouseout", r, !1)) : ("click" === i && gi && (r = function(t) {
            ! function(t, i) {
                var e = t.timeStamp || t.originalEvent && t.originalEvent.timeStamp,
                    n = he && e - he;
                n && n > 100 && n < 500 || t.target._simulatedClick && !t._simulated ? vt(t) : (he = e, i(t))
            }(t, a)
        }), t.addEventListener(i, r, !1)) : "attachEvent" in t && t.attachEvent("on" + i, r) : N(t, r, s), t[le] = t[le] || {}, t[le][s] = r
    }

    function dt(t, i, e, o) {
        var s = i + n(e) + (o ? "_" + n(o) : ""),
            r = t[le] && t[le][s];
        if (!r) return this;
        Oi && 0 === i.indexOf("touch") ? function(t, i, e) {
            var n = t["_leaflet_" + i + e];
            "touchstart" === i ? t.removeEventListener(Ui, n, !1) : "touchmove" === i ? t.removeEventListener(Vi, n, !1) : "touchend" === i && (t.removeEventListener(Gi, n, !1), t.removeEventListener(Ki, n, !1))
        }(t, i, s) : !Ri || "dblclick" !== i || !j || Oi && Li ? "removeEventListener" in t ? "mousewheel" === i ? t.removeEventListener("onwheel" in t ? "wheel" : "mousewheel", r, !1) : t.removeEventListener("mouseenter" === i ? "mouseover" : "mouseleave" === i ? "mouseout" : i, r, !1) : "detachEvent" in t && t.detachEvent("on" + i, r) : j(t, s), t[le][s] = null
    }

    function pt(t) {
        return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, Lt(t), this
    }

    function mt(t) {
        return _t(t, "mousewheel", pt), this
    }

    function ft(t) {
        return lt(t, "mousedown touchstart dblclick", pt), _t(t, "click", wt), this
    }

    function gt(t) {
        return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this
    }

    function vt(t) {
        return gt(t), pt(t), this
    }

    function yt(t, i) {
        if (!i) return new y(t.clientX, t.clientY);
        var e = ut(i),
            n = e.boundingClientRect;
        return new y((t.clientX - n.left) / e.x - i.clientLeft, (t.clientY - n.top) / e.y - i.clientTop)
    }

    function xt(t) {
        return mi ? t.wheelDeltaY / 2 : t.deltaY && 0 === t.deltaMode ? -t.deltaY / ce : t.deltaY && 1 === t.deltaMode ? 20 * -t.deltaY : t.deltaY && 2 === t.deltaMode ? 60 * -t.deltaY : t.deltaX || t.deltaZ ? 0 : t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : t.detail && Math.abs(t.detail) < 32765 ? 20 * -t.detail : t.detail ? t.detail / -32765 * 60 : 0
    }

    function wt(t) {
        _e[t.type] = !0
    }

    function Lt(t) {
        var i = _e[t.type];
        return _e[t.type] = !1, i
    }

    function Pt(t, i) {
        var e = i.relatedTarget;
        if (!e) return !0;
        try {
            for (; e && e !== t;) e = e.parentNode
        } catch (t) {
            return !1
        }
        return e !== t
    }

    function bt(t, i) {
        if (!i || !t.length) return t.slice();
        var e = i * i;
        return function(t, i) {
            var e = t.length,
                n = new(typeof Uint8Array != void 0 + "" ? Uint8Array : Array)(e);
            n[0] = n[e - 1] = 1,
                function t(i, e, n, o, s) {
                    var r, a, h, u = 0;
                    for (a = o + 1; a <= s - 1; a++)(h = Zt(i[a], i[o], i[s], !0)) > u && (r = a, u = h);
                    u > n && (e[r] = 1, t(i, e, n, o, r), t(i, e, n, r, s))
                }(t, n, i, 0, e - 1);
            var o, s = [];
            for (o = 0; o < e; o++) n[o] && s.push(t[o]);
            return s
        }(t = function(t, i) {
            for (var e = [t[0]], n = 1, o = 0, s = t.length; n < s; n++) St(t[n], t[o]) > i && (e.push(t[n]), o = n);
            return o < s - 1 && e.push(t[s - 1]), e
        }(t, e), e)
    }

    function Tt(t, i, e) {
        return Math.sqrt(Zt(t, i, e, !0))
    }

    function zt(t, i, e, n, o) {
        var s, r, a, h = n ? Pe : Ct(t, e),
            u = Ct(i, e);
        for (Pe = u;;) {
            if (!(h | u)) return [t, i];
            if (h & u) return !1;
            a = Ct(r = Mt(t, i, s = h || u, e, o), e), s === h ? (t = r, h = a) : (i = r, u = a)
        }
    }

    function Mt(t, i, e, n, o) {
        var s, r, a = i.x - t.x,
            h = i.y - t.y,
            u = n.min,
            l = n.max;
        return 8 & e ? (s = t.x + a * (l.y - t.y) / h, r = l.y) : 4 & e ? (s = t.x + a * (u.y - t.y) / h, r = u.y) : 2 & e ? (s = l.x, r = t.y + h * (l.x - t.x) / a) : 1 & e && (s = u.x, r = t.y + h * (u.x - t.x) / a), new y(s, r, o)
    }

    function Ct(t, i) {
        var e = 0;
        return t.x < i.min.x ? e |= 1 : t.x > i.max.x && (e |= 2), t.y < i.min.y ? e |= 4 : t.y > i.max.y && (e |= 8), e
    }

    function St(t, i) {
        var e = i.x - t.x,
            n = i.y - t.y;
        return e * e + n * n
    }

    function Zt(t, i, e, n) {
        var o, s = i.x,
            r = i.y,
            a = e.x - s,
            h = e.y - r,
            u = a * a + h * h;
        return u > 0 && ((o = ((t.x - s) * a + (t.y - r) * h) / u) > 1 ? (s = e.x, r = e.y) : o > 0 && (s += a * o, r += h * o)), a = t.x - s, h = t.y - r, n ? a * a + h * h : new y(s, r)
    }

    function Et(t) {
        return !Yt(t[0]) || "object" != typeof t[0][0] && void 0 !== t[0][0]
    }

    function kt(t) {
        return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), Et(t)
    }

    function At(t, i, e) {
        var n, o, s, r, a, h, u, l, c, _ = [1, 4, 2, 8];
        for (o = 0, u = t.length; o < u; o++) t[o]._code = Ct(t[o], i);
        for (r = 0; r < 4; r++) {
            for (l = _[r], n = [], o = 0, s = (u = t.length) - 1; o < u; s = o++) a = t[o], h = t[s], a._code & l ? h._code & l || ((c = Mt(h, a, l, i, e))._code = Ct(c, i), n.push(c)) : (h._code & l && ((c = Mt(h, a, l, i, e))._code = Ct(c, i), n.push(c)), n.push(a));
            t = n
        }
        return t
    }

    function Bt(t, i) {
        var e, n, o, s, r = "Feature" === t.type ? t.geometry : t,
            a = r ? r.coordinates : null,
            h = [],
            u = i && i.pointToLayer,
            l = i && i.coordsToLatLng || It;
        if (!a && !r) return null;
        switch (r.type) {
            case "Point":
                return e = l(a), u ? u(t, e) : new Fe(e);
            case "MultiPoint":
                for (o = 0, s = a.length; o < s; o++) e = l(a[o]), h.push(u ? u(t, e) : new Fe(e));
                return new Ne(h);
            case "LineString":
            case "MultiLineString":
                return n = Ot(a, "LineString" === r.type ? 0 : 1, l), new Ge(n, i);
            case "Polygon":
            case "MultiPolygon":
                return n = Ot(a, "Polygon" === r.type ? 1 : 2, l), new Ke(n, i);
            case "GeometryCollection":
                for (o = 0, s = r.geometries.length; o < s; o++) {
                    var c = Bt({
                        geometry: r.geometries[o],
                        type: "Feature",
                        properties: t.properties
                    }, i);
                    c && h.push(c)
                }
                return new Ne(h);
            default:
                throw new Error("Invalid GeoJSON object.")
        }
    }

    function It(t) {
        return new z(t[1], t[0], t[2])
    }

    function Ot(t, i, e) {
        for (var n, o = [], s = 0, r = t.length; s < r; s++) n = i ? Ot(t[s], i - 1, e) : (e || It)(t[s]), o.push(n);
        return o
    }

    function Rt(t, i) {
        return i = "number" == typeof i ? i : 6, void 0 !== t.alt ? [a(t.lng, i), a(t.lat, i), a(t.alt, i)] : [a(t.lng, i), a(t.lat, i)]
    }

    function Dt(t, i, e, n) {
        for (var o = [], s = 0, r = t.length; s < r; s++) o.push(i ? Dt(t[s], i - 1, e, n) : Rt(t[s], n));
        return !i && e && o.push(o[0]), o
    }

    function Nt(t, e) {
        return t.feature ? i({}, t.feature, {
            geometry: e
        }) : jt(e)
    }

    function jt(t) {
        return "Feature" === t.type || "FeatureCollection" === t.type ? t : {
            type: "Feature",
            properties: {},
            geometry: t
        }
    }

    function Wt(t, i) {
        return new Ye(t, i)
    }

    function Ht(t, i) {
        return new rn(t, i)
    }

    function Ft(t) {
        return Wi ? new un(t) : null
    }

    function qt(t) {
        return Hi || Fi ? new dn(t) : null
    }
    var Ut = Object.freeze;
    Object.freeze = function(t) {
        return t
    };
    var Vt = Object.create || function() {
            function t() {}
            return function(i) {
                return t.prototype = i, new t
            }
        }(),
        Gt = 0,
        Kt = /\{ *([\w_-]+) *\}/g,
        Yt = Array.isArray || function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        },
        Xt = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
        Jt = 0,
        $t = window.requestAnimationFrame || p("RequestAnimationFrame") || m,
        Qt = window.cancelAnimationFrame || p("CancelAnimationFrame") || p("CancelRequestAnimationFrame") || function(t) {
            window.clearTimeout(t)
        },
        ti = (Object.freeze || Object)({
            freeze: Ut,
            extend: i,
            create: Vt,
            bind: e,
            lastId: Gt,
            stamp: n,
            throttle: o,
            wrapNum: s,
            falseFn: r,
            formatNum: a,
            trim: h,
            splitWords: u,
            setOptions: l,
            getParamString: c,
            template: _,
            isArray: Yt,
            indexOf: d,
            emptyImageUrl: Xt,
            requestFn: $t,
            cancelFn: Qt,
            requestAnimFrame: f,
            cancelAnimFrame: g
        });
    v.extend = function(t) {
        var e = function() {
                this.initialize && this.initialize.apply(this, arguments), this.callInitHooks()
            },
            n = e.__super__ = this.prototype,
            o = Vt(n);
        for (var s in o.constructor = e, e.prototype = o, this) this.hasOwnProperty(s) && "prototype" !== s && "__super__" !== s && (e[s] = this[s]);
        return t.statics && (i(e, t.statics), delete t.statics), t.includes && (function(t) {
            if ("undefined" != typeof L && L && L.Mixin) {
                t = Yt(t) ? t : [t];
                for (var i = 0; i < t.length; i++) t[i] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", (new Error).stack)
            }
        }(t.includes), i.apply(null, [o].concat(t.includes)), delete t.includes), o.options && (t.options = i(Vt(o.options), t.options)), i(o, t), o._initHooks = [], o.callInitHooks = function() {
            if (!this._initHooksCalled) {
                n.callInitHooks && n.callInitHooks.call(this), this._initHooksCalled = !0;
                for (var t = 0, i = o._initHooks.length; t < i; t++) o._initHooks[t].call(this)
            }
        }, e
    }, v.include = function(t) {
        return i(this.prototype, t), this
    }, v.mergeOptions = function(t) {
        return i(this.prototype.options, t), this
    }, v.addInitHook = function(t) {
        var i = Array.prototype.slice.call(arguments, 1),
            e = "function" == typeof t ? t : function() {
                this[t].apply(this, i)
            };
        return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(e), this
    };
    var ii = {
        on: function(t, i, e) {
            if ("object" == typeof t)
                for (var n in t) this._on(n, t[n], i);
            else
                for (var o = 0, s = (t = u(t)).length; o < s; o++) this._on(t[o], i, e);
            return this
        },
        off: function(t, i, e) {
            if (t)
                if ("object" == typeof t)
                    for (var n in t) this._off(n, t[n], i);
                else
                    for (var o = 0, s = (t = u(t)).length; o < s; o++) this._off(t[o], i, e);
            else delete this._events;
            return this
        },
        _on: function(t, i, e) {
            this._events = this._events || {};
            var n = this._events[t];
            n || (n = [], this._events[t] = n), e === this && (e = void 0);
            for (var o = {
                    fn: i,
                    ctx: e
                }, s = n, r = 0, a = s.length; r < a; r++)
                if (s[r].fn === i && s[r].ctx === e) return;
            s.push(o)
        },
        _off: function(t, i, e) {
            var n, o, s;
            if (this._events && (n = this._events[t]))
                if (i) {
                    if (e === this && (e = void 0), n)
                        for (o = 0, s = n.length; o < s; o++) {
                            var a = n[o];
                            if (a.ctx === e && a.fn === i) return a.fn = r, this._firingCount && (this._events[t] = n = n.slice()), void n.splice(o, 1)
                        }
                } else {
                    for (o = 0, s = n.length; o < s; o++) n[o].fn = r;
                    delete this._events[t]
                }
        },
        fire: function(t, e, n) {
            if (!this.listens(t, n)) return this;
            var o = i({}, e, {
                type: t,
                target: this,
                sourceTarget: e && e.sourceTarget || this
            });
            if (this._events) {
                var s = this._events[t];
                if (s) {
                    this._firingCount = this._firingCount + 1 || 1;
                    for (var r = 0, a = s.length; r < a; r++) {
                        var h = s[r];
                        h.fn.call(h.ctx || this, o)
                    }
                    this._firingCount--
                }
            }
            return n && this._propagateEvent(o), this
        },
        listens: function(t, i) {
            var e = this._events && this._events[t];
            if (e && e.length) return !0;
            if (i)
                for (var n in this._eventParents)
                    if (this._eventParents[n].listens(t, i)) return !0;
            return !1
        },
        once: function(t, i, n) {
            if ("object" == typeof t) {
                for (var o in t) this.once(o, t[o], i);
                return this
            }
            var s = e(function() {
                this.off(t, i, n).off(t, s, n)
            }, this);
            return this.on(t, i, n).on(t, s, n)
        },
        addEventParent: function(t) {
            return this._eventParents = this._eventParents || {}, this._eventParents[n(t)] = t, this
        },
        removeEventParent: function(t) {
            return this._eventParents && delete this._eventParents[n(t)], this
        },
        _propagateEvent: function(t) {
            for (var e in this._eventParents) this._eventParents[e].fire(t.type, i({
                layer: t.target,
                propagatedFrom: t.target
            }, t), !0)
        }
    };
    ii.addEventListener = ii.on, ii.removeEventListener = ii.clearAllEventListeners = ii.off, ii.addOneTimeEventListener = ii.once, ii.fireEvent = ii.fire, ii.hasEventListeners = ii.listens;
    var ei = v.extend(ii),
        ni = Math.trunc || function(t) {
            return t > 0 ? Math.floor(t) : Math.ceil(t)
        };
    y.prototype = {
        clone: function() {
            return new y(this.x, this.y)
        },
        add: function(t) {
            return this.clone()._add(x(t))
        },
        _add: function(t) {
            return this.x += t.x, this.y += t.y, this
        },
        subtract: function(t) {
            return this.clone()._subtract(x(t))
        },
        _subtract: function(t) {
            return this.x -= t.x, this.y -= t.y, this
        },
        divideBy: function(t) {
            return this.clone()._divideBy(t)
        },
        _divideBy: function(t) {
            return this.x /= t, this.y /= t, this
        },
        multiplyBy: function(t) {
            return this.clone()._multiplyBy(t)
        },
        _multiplyBy: function(t) {
            return this.x *= t, this.y *= t, this
        },
        scaleBy: function(t) {
            return new y(this.x * t.x, this.y * t.y)
        },
        unscaleBy: function(t) {
            return new y(this.x / t.x, this.y / t.y)
        },
        round: function() {
            return this.clone()._round()
        },
        _round: function() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this
        },
        floor: function() {
            return this.clone()._floor()
        },
        _floor: function() {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
        },
        ceil: function() {
            return this.clone()._ceil()
        },
        _ceil: function() {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
        },
        trunc: function() {
            return this.clone()._trunc()
        },
        _trunc: function() {
            return this.x = ni(this.x), this.y = ni(this.y), this
        },
        distanceTo: function(t) {
            var i = (t = x(t)).x - this.x,
                e = t.y - this.y;
            return Math.sqrt(i * i + e * e)
        },
        equals: function(t) {
            return (t = x(t)).x === this.x && t.y === this.y
        },
        contains: function(t) {
            return t = x(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
        },
        toString: function() {
            return "Point(" + a(this.x) + ", " + a(this.y) + ")"
        }
    }, w.prototype = {
        extend: function(t) {
            return t = x(t), this.min || this.max ? (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(t.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(t.y, this.max.y)) : (this.min = t.clone(), this.max = t.clone()), this
        },
        getCenter: function(t) {
            return new y((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t)
        },
        getBottomLeft: function() {
            return new y(this.min.x, this.max.y)
        },
        getTopRight: function() {
            return new y(this.max.x, this.min.y)
        },
        getTopLeft: function() {
            return this.min
        },
        getBottomRight: function() {
            return this.max
        },
        getSize: function() {
            return this.max.subtract(this.min)
        },
        contains: function(t) {
            var i, e;
            return (t = "number" == typeof t[0] || t instanceof y ? x(t) : P(t)) instanceof w ? (i = t.min, e = t.max) : i = e = t, i.x >= this.min.x && e.x <= this.max.x && i.y >= this.min.y && e.y <= this.max.y
        },
        intersects: function(t) {
            t = P(t);
            var i = this.min,
                e = this.max,
                n = t.min,
                o = t.max,
                s = o.x >= i.x && n.x <= e.x,
                r = o.y >= i.y && n.y <= e.y;
            return s && r
        },
        overlaps: function(t) {
            t = P(t);
            var i = this.min,
                e = this.max,
                n = t.min,
                o = t.max,
                s = o.x > i.x && n.x < e.x,
                r = o.y > i.y && n.y < e.y;
            return s && r
        },
        isValid: function() {
            return !(!this.min || !this.max)
        }
    }, b.prototype = {
        extend: function(t) {
            var i, e, n = this._southWest,
                o = this._northEast;
            if (t instanceof z) i = t, e = t;
            else {
                if (!(t instanceof b)) return t ? this.extend(M(t) || T(t)) : this;
                if (i = t._southWest, e = t._northEast, !i || !e) return this
            }
            return n || o ? (n.lat = Math.min(i.lat, n.lat), n.lng = Math.min(i.lng, n.lng), o.lat = Math.max(e.lat, o.lat), o.lng = Math.max(e.lng, o.lng)) : (this._southWest = new z(i.lat, i.lng), this._northEast = new z(e.lat, e.lng)), this
        },
        pad: function(t) {
            var i = this._southWest,
                e = this._northEast,
                n = Math.abs(i.lat - e.lat) * t,
                o = Math.abs(i.lng - e.lng) * t;
            return new b(new z(i.lat - n, i.lng - o), new z(e.lat + n, e.lng + o))
        },
        getCenter: function() {
            return new z((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
        },
        getSouthWest: function() {
            return this._southWest
        },
        getNorthEast: function() {
            return this._northEast
        },
        getNorthWest: function() {
            return new z(this.getNorth(), this.getWest())
        },
        getSouthEast: function() {
            return new z(this.getSouth(), this.getEast())
        },
        getWest: function() {
            return this._southWest.lng
        },
        getSouth: function() {
            return this._southWest.lat
        },
        getEast: function() {
            return this._northEast.lng
        },
        getNorth: function() {
            return this._northEast.lat
        },
        contains: function(t) {
            t = "number" == typeof t[0] || t instanceof z || "lat" in t ? M(t) : T(t);
            var i, e, n = this._southWest,
                o = this._northEast;
            return t instanceof b ? (i = t.getSouthWest(), e = t.getNorthEast()) : i = e = t, i.lat >= n.lat && e.lat <= o.lat && i.lng >= n.lng && e.lng <= o.lng
        },
        intersects: function(t) {
            t = T(t);
            var i = this._southWest,
                e = this._northEast,
                n = t.getSouthWest(),
                o = t.getNorthEast(),
                s = o.lat >= i.lat && n.lat <= e.lat,
                r = o.lng >= i.lng && n.lng <= e.lng;
            return s && r
        },
        overlaps: function(t) {
            t = T(t);
            var i = this._southWest,
                e = this._northEast,
                n = t.getSouthWest(),
                o = t.getNorthEast(),
                s = o.lat > i.lat && n.lat < e.lat,
                r = o.lng > i.lng && n.lng < e.lng;
            return s && r
        },
        toBBoxString: function() {
            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
        },
        equals: function(t, i) {
            return !!t && (t = T(t), this._southWest.equals(t.getSouthWest(), i) && this._northEast.equals(t.getNorthEast(), i))
        },
        isValid: function() {
            return !(!this._southWest || !this._northEast)
        }
    }, z.prototype = {
        equals: function(t, i) {
            return !!t && (t = M(t), Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng)) <= (void 0 === i ? 1e-9 : i))
        },
        toString: function(t) {
            return "LatLng(" + a(this.lat, t) + ", " + a(this.lng, t) + ")"
        },
        distanceTo: function(t) {
            return si.distance(this, M(t))
        },
        wrap: function() {
            return si.wrapLatLng(this)
        },
        toBounds: function(t) {
            var i = 180 * t / 40075017,
                e = i / Math.cos(Math.PI / 180 * this.lat);
            return T([this.lat - i, this.lng - e], [this.lat + i, this.lng + e])
        },
        clone: function() {
            return new z(this.lat, this.lng, this.alt)
        }
    };
    var oi = {
            latLngToPoint: function(t, i) {
                var e = this.projection.project(t),
                    n = this.scale(i);
                return this.transformation._transform(e, n)
            },
            pointToLatLng: function(t, i) {
                var e = this.scale(i),
                    n = this.transformation.untransform(t, e);
                return this.projection.unproject(n)
            },
            project: function(t) {
                return this.projection.project(t)
            },
            unproject: function(t) {
                return this.projection.unproject(t)
            },
            scale: function(t) {
                return 256 * Math.pow(2, t)
            },
            zoom: function(t) {
                return Math.log(t / 256) / Math.LN2
            },
            getProjectedBounds: function(t) {
                if (this.infinite) return null;
                var i = this.projection.bounds,
                    e = this.scale(t);
                return new w(this.transformation.transform(i.min, e), this.transformation.transform(i.max, e))
            },
            infinite: !1,
            wrapLatLng: function(t) {
                var i = this.wrapLng ? s(t.lng, this.wrapLng, !0) : t.lng;
                return new z(this.wrapLat ? s(t.lat, this.wrapLat, !0) : t.lat, i, t.alt)
            },
            wrapLatLngBounds: function(t) {
                var i = t.getCenter(),
                    e = this.wrapLatLng(i),
                    n = i.lat - e.lat,
                    o = i.lng - e.lng;
                if (0 === n && 0 === o) return t;
                var s = t.getSouthWest(),
                    r = t.getNorthEast();
                return new b(new z(s.lat - n, s.lng - o), new z(r.lat - n, r.lng - o))
            }
        },
        si = i({}, oi, {
            wrapLng: [-180, 180],
            R: 6371e3,
            distance: function(t, i) {
                var e = Math.PI / 180,
                    n = t.lat * e,
                    o = i.lat * e,
                    s = Math.sin((i.lat - t.lat) * e / 2),
                    r = Math.sin((i.lng - t.lng) * e / 2),
                    a = s * s + Math.cos(n) * Math.cos(o) * r * r,
                    h = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                return this.R * h
            }
        }),
        ri = {
            R: 6378137,
            MAX_LATITUDE: 85.0511287798,
            project: function(t) {
                var i = Math.PI / 180,
                    e = this.MAX_LATITUDE,
                    n = Math.max(Math.min(e, t.lat), -e),
                    o = Math.sin(n * i);
                return new y(this.R * t.lng * i, this.R * Math.log((1 + o) / (1 - o)) / 2)
            },
            unproject: function(t) {
                var i = 180 / Math.PI;
                return new z((2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * i, t.x * i / this.R)
            },
            bounds: function() {
                var t = 6378137 * Math.PI;
                return new w([-t, -t], [t, t])
            }()
        };
    C.prototype = {
        transform: function(t, i) {
            return this._transform(t.clone(), i)
        },
        _transform: function(t, i) {
            return i = i || 1, t.x = i * (this._a * t.x + this._b), t.y = i * (this._c * t.y + this._d), t
        },
        untransform: function(t, i) {
            return i = i || 1, new y((t.x / i - this._b) / this._a, (t.y / i - this._d) / this._c)
        }
    };
    var ai, hi, ui, li = i({}, si, {
            code: "EPSG:3857",
            projection: ri,
            transformation: function() {
                var t = .5 / (Math.PI * ri.R);
                return S(t, .5, -t, .5)
            }()
        }),
        ci = i({}, li, {
            code: "EPSG:900913"
        }),
        _i = document.documentElement.style,
        di = "ActiveXObject" in window,
        pi = di && !document.addEventListener,
        mi = "msLaunchUri" in navigator && !("documentMode" in document),
        fi = k("webkit"),
        gi = k("android"),
        vi = k("android 2") || k("android 3"),
        yi = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10),
        xi = gi && k("Google") && yi < 537 && !("AudioNode" in window),
        wi = !!window.opera,
        Li = k("chrome"),
        Pi = k("gecko") && !fi && !wi && !di,
        bi = !Li && k("safari"),
        Ti = k("phantom"),
        zi = "OTransition" in _i,
        Mi = 0 === navigator.platform.indexOf("Win"),
        Ci = di && "transition" in _i,
        Si = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix && !vi,
        Zi = "MozPerspective" in _i,
        Ei = !window.L_DISABLE_3D && (Ci || Si || Zi) && !zi && !Ti,
        ki = "undefined" != typeof orientation || k("mobile"),
        Ai = ki && fi,
        Bi = ki && Si,
        Ii = !window.PointerEvent && window.MSPointerEvent,
        Oi = !(!window.PointerEvent && !Ii),
        Ri = !window.L_NO_TOUCH && (Oi || "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
        Di = ki && wi,
        Ni = ki && Pi,
        ji = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1,
        Wi = !!document.createElement("canvas").getContext,
        Hi = !(!document.createElementNS || !Z("svg").createSVGRect),
        Fi = !Hi && function() {
            try {
                var t = document.createElement("div");
                t.innerHTML = '<v:shape adj="1"/>';
                var i = t.firstChild;
                return i.style.behavior = "url(#default#VML)", i && "object" == typeof i.adj
            } catch (t) {
                return !1
            }
        }(),
        qi = (Object.freeze || Object)({
            ie: di,
            ielt9: pi,
            edge: mi,
            webkit: fi,
            android: gi,
            android23: vi,
            androidStock: xi,
            opera: wi,
            chrome: Li,
            gecko: Pi,
            safari: bi,
            phantom: Ti,
            opera12: zi,
            win: Mi,
            ie3d: Ci,
            webkit3d: Si,
            gecko3d: Zi,
            any3d: Ei,
            mobile: ki,
            mobileWebkit: Ai,
            mobileWebkit3d: Bi,
            msPointer: Ii,
            pointer: Oi,
            touch: Ri,
            mobileOpera: Di,
            mobileGecko: Ni,
            retina: ji,
            canvas: Wi,
            svg: Hi,
            vml: Fi
        }),
        Ui = Ii ? "MSPointerDown" : "pointerdown",
        Vi = Ii ? "MSPointerMove" : "pointermove",
        Gi = Ii ? "MSPointerUp" : "pointerup",
        Ki = Ii ? "MSPointerCancel" : "pointercancel",
        Yi = ["INPUT", "SELECT", "OPTION"],
        Xi = {},
        Ji = !1,
        $i = 0,
        Qi = Ii ? "MSPointerDown" : Oi ? "pointerdown" : "touchstart",
        te = Ii ? "MSPointerUp" : Oi ? "pointerup" : "touchend",
        ie = "_leaflet_",
        ee = tt(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]),
        ne = tt(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]),
        oe = "webkitTransition" === ne || "OTransition" === ne ? ne + "End" : "transitionend";
    if ("onselectstart" in document) ai = function() {
        lt(window, "selectstart", gt)
    }, hi = function() {
        ct(window, "selectstart", gt)
    };
    else {
        var se = tt(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
        ai = function() {
            if (se) {
                var t = document.documentElement.style;
                ui = t[se], t[se] = "none"
            }
        }, hi = function() {
            se && (document.documentElement.style[se] = ui, ui = void 0)
        }
    }
    var re, ae, he, ue = (Object.freeze || Object)({
            TRANSFORM: ee,
            TRANSITION: ne,
            TRANSITION_END: oe,
            get: W,
            getStyle: H,
            create: F,
            remove: q,
            empty: U,
            toFront: V,
            toBack: G,
            hasClass: K,
            addClass: Y,
            removeClass: X,
            setClass: J,
            getClass: $,
            setOpacity: Q,
            testProp: tt,
            setTransform: it,
            setPosition: et,
            getPosition: nt,
            disableTextSelection: ai,
            enableTextSelection: hi,
            disableImageDrag: ot,
            enableImageDrag: st,
            preventOutline: rt,
            restoreOutline: at,
            getSizedParentNode: ht,
            getScale: ut
        }),
        le = "_leaflet_events",
        ce = Mi && Li ? 2 * window.devicePixelRatio : Pi ? window.devicePixelRatio : 1,
        _e = {},
        de = (Object.freeze || Object)({
            on: lt,
            off: ct,
            stopPropagation: pt,
            disableScrollPropagation: mt,
            disableClickPropagation: ft,
            preventDefault: gt,
            stop: vt,
            getMousePosition: yt,
            getWheelDelta: xt,
            fakeStop: wt,
            skipped: Lt,
            isExternalTarget: Pt,
            addListener: lt,
            removeListener: ct
        }),
        pe = ei.extend({
            run: function(t, i, e, n) {
                this.stop(), this._el = t, this._inProgress = !0, this._duration = e || .25, this._easeOutPower = 1 / Math.max(n || .5, .2), this._startPos = nt(t), this._offset = i.subtract(this._startPos), this._startTime = +new Date, this.fire("start"), this._animate()
            },
            stop: function() {
                this._inProgress && (this._step(!0), this._complete())
            },
            _animate: function() {
                this._animId = f(this._animate, this), this._step()
            },
            _step: function(t) {
                var i = +new Date - this._startTime,
                    e = 1e3 * this._duration;
                i < e ? this._runFrame(this._easeOut(i / e), t) : (this._runFrame(1), this._complete())
            },
            _runFrame: function(t, i) {
                var e = this._startPos.add(this._offset.multiplyBy(t));
                i && e._round(), et(this._el, e), this.fire("step")
            },
            _complete: function() {
                g(this._animId), this._inProgress = !1, this.fire("end")
            },
            _easeOut: function(t) {
                return 1 - Math.pow(1 - t, this._easeOutPower)
            }
        }),
        me = ei.extend({
            options: {
                crs: li,
                center: void 0,
                zoom: void 0,
                minZoom: void 0,
                maxZoom: void 0,
                layers: [],
                maxBounds: void 0,
                renderer: void 0,
                zoomAnimation: !0,
                zoomAnimationThreshold: 4,
                fadeAnimation: !0,
                markerZoomAnimation: !0,
                transform3DLimit: 8388608,
                zoomSnap: 1,
                zoomDelta: 1,
                trackResize: !0
            },
            initialize: function(t, i) {
                i = l(this, i), this._initContainer(t), this._initLayout(), this._onResize = e(this._onResize, this), this._initEvents(), i.maxBounds && this.setMaxBounds(i.maxBounds), void 0 !== i.zoom && (this._zoom = this._limitZoom(i.zoom)), i.center && void 0 !== i.zoom && this.setView(M(i.center), i.zoom, {
                    reset: !0
                }), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this.callInitHooks(), this._zoomAnimated = ne && Ei && !Di && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), lt(this._proxy, oe, this._catchTransitionEnd, this)), this._addLayers(this.options.layers)
            },
            setView: function(t, e, n) {
                return e = void 0 === e ? this._zoom : this._limitZoom(e), t = this._limitCenter(M(t), e, this.options.maxBounds), n = n || {}, this._stop(), this._loaded && !n.reset && !0 !== n && (void 0 !== n.animate && (n.zoom = i({
                    animate: n.animate
                }, n.zoom), n.pan = i({
                    animate: n.animate,
                    duration: n.duration
                }, n.pan)), this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, n.zoom) : this._tryAnimatedPan(t, n.pan)) ? (clearTimeout(this._sizeTimer), this) : (this._resetView(t, e), this)
            },
            setZoom: function(t, i) {
                return this._loaded ? this.setView(this.getCenter(), t, {
                    zoom: i
                }) : (this._zoom = t, this)
            },
            zoomIn: function(t, i) {
                return t = t || (Ei ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, i)
            },
            zoomOut: function(t, i) {
                return t = t || (Ei ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, i)
            },
            setZoomAround: function(t, i, e) {
                var n = this.getZoomScale(i),
                    o = this.getSize().divideBy(2),
                    s = (t instanceof y ? t : this.latLngToContainerPoint(t)).subtract(o).multiplyBy(1 - 1 / n),
                    r = this.containerPointToLatLng(o.add(s));
                return this.setView(r, i, {
                    zoom: e
                })
            },
            _getBoundsCenterZoom: function(t, i) {
                i = i || {}, t = t.getBounds ? t.getBounds() : T(t);
                var e = x(i.paddingTopLeft || i.padding || [0, 0]),
                    n = x(i.paddingBottomRight || i.padding || [0, 0]),
                    o = this.getBoundsZoom(t, !1, e.add(n));
                if ((o = "number" == typeof i.maxZoom ? Math.min(i.maxZoom, o) : o) === 1 / 0) return {
                    center: t.getCenter(),
                    zoom: o
                };
                var s = n.subtract(e).divideBy(2),
                    r = this.project(t.getSouthWest(), o),
                    a = this.project(t.getNorthEast(), o);
                return {
                    center: this.unproject(r.add(a).divideBy(2).add(s), o),
                    zoom: o
                }
            },
            fitBounds: function(t, i) {
                if (!(t = T(t)).isValid()) throw new Error("Bounds are not valid.");
                var e = this._getBoundsCenterZoom(t, i);
                return this.setView(e.center, e.zoom, i)
            },
            fitWorld: function(t) {
                return this.fitBounds([
                    [-90, -180],
                    [90, 180]
                ], t)
            },
            panTo: function(t, i) {
                return this.setView(t, this._zoom, {
                    pan: i
                })
            },
            panBy: function(t, i) {
                if (i = i || {}, !(t = x(t).round()).x && !t.y) return this.fire("moveend");
                if (!0 !== i.animate && !this.getSize().contains(t)) return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
                if (this._panAnim || (this._panAnim = new pe, this._panAnim.on({
                        step: this._onPanTransitionStep,
                        end: this._onPanTransitionEnd
                    }, this)), i.noMoveStart || this.fire("movestart"), !1 !== i.animate) {
                    Y(this._mapPane, "leaflet-pan-anim");
                    var e = this._getMapPanePos().subtract(t).round();
                    this._panAnim.run(this._mapPane, e, i.duration || .25, i.easeLinearity)
                } else this._rawPanBy(t), this.fire("move").fire("moveend");
                return this
            },
            flyTo: function(t, i, e) {
                function n(t) {
                    var i = (_ * _ - c * c + (t ? -1 : 1) * m * m * d * d) / (2 * (t ? _ : c) * m * d),
                        e = Math.sqrt(i * i + 1) - i;
                    return e < 1e-9 ? -18 : Math.log(e)
                }

                function o(t) {
                    return (Math.exp(t) - Math.exp(-t)) / 2
                }

                function s(t) {
                    return (Math.exp(t) + Math.exp(-t)) / 2
                }

                function r(t) {
                    return c * (s(g) * function(t) {
                        return o(t) / s(t)
                    }(g + p * t) - o(g)) / m
                }
                if (!1 === (e = e || {}).animate || !Ei) return this.setView(t, i, e);
                this._stop();
                var a = this.project(this.getCenter()),
                    h = this.project(t),
                    u = this.getSize(),
                    l = this._zoom;
                t = M(t), i = void 0 === i ? l : i;
                var c = Math.max(u.x, u.y),
                    _ = c * this.getZoomScale(l, i),
                    d = h.distanceTo(a) || 1,
                    p = 1.42,
                    m = p * p,
                    g = n(0),
                    v = Date.now(),
                    y = (n(1) - g) / p,
                    x = e.duration ? 1e3 * e.duration : 1e3 * y * .8;
                return this._moveStart(!0, e.noMoveStart),
                    function e() {
                        var n = (Date.now() - v) / x,
                            o = function(t) {
                                return 1 - Math.pow(1 - t, 1.5)
                            }(n) * y;
                        n <= 1 ? (this._flyToFrame = f(e, this), this._move(this.unproject(a.add(h.subtract(a).multiplyBy(r(o) / d)), l), this.getScaleZoom(c / function(t) {
                            return c * (s(g) / s(g + p * t))
                        }(o), l), {
                            flyTo: !0
                        })) : this._move(t, i)._moveEnd(!0)
                    }.call(this), this
            },
            flyToBounds: function(t, i) {
                var e = this._getBoundsCenterZoom(t, i);
                return this.flyTo(e.center, e.zoom, i)
            },
            setMaxBounds: function(t) {
                return (t = T(t)).isValid() ? (this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this.off("moveend", this._panInsideMaxBounds))
            },
            setMinZoom: function(t) {
                var i = this.options.minZoom;
                return this.options.minZoom = t, this._loaded && i !== t && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(t) : this
            },
            setMaxZoom: function(t) {
                var i = this.options.maxZoom;
                return this.options.maxZoom = t, this._loaded && i !== t && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(t) : this
            },
            panInsideBounds: function(t, i) {
                this._enforcingBounds = !0;
                var e = this.getCenter(),
                    n = this._limitCenter(e, this._zoom, T(t));
                return e.equals(n) || this.panTo(n, i), this._enforcingBounds = !1, this
            },
            invalidateSize: function(t) {
                if (!this._loaded) return this;
                t = i({
                    animate: !1,
                    pan: !0
                }, !0 === t ? {
                    animate: !0
                } : t);
                var n = this.getSize();
                this._sizeChanged = !0, this._lastCenter = null;
                var o = this.getSize(),
                    s = n.divideBy(2).round(),
                    r = o.divideBy(2).round(),
                    a = s.subtract(r);
                return a.x || a.y ? (t.animate && t.pan ? this.panBy(a) : (t.pan && this._rawPanBy(a), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(e(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
                    oldSize: n,
                    newSize: o
                })) : this
            },
            stop: function() {
                return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop()
            },
            locate: function(t) {
                if (t = this._locateOptions = i({
                        timeout: 1e4,
                        watch: !1
                    }, t), !("geolocation" in navigator)) return this._handleGeolocationError({
                    code: 0,
                    message: "Geolocation not supported."
                }), this;
                var n = e(this._handleGeolocationResponse, this),
                    o = e(this._handleGeolocationError, this);
                return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(n, o, t) : navigator.geolocation.getCurrentPosition(n, o, t), this
            },
            stopLocate: function() {
                return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this
            },
            _handleGeolocationError: function(t) {
                var i = t.code,
                    e = t.message || (1 === i ? "permission denied" : 2 === i ? "position unavailable" : "timeout");
                this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
                    code: i,
                    message: "Geolocation error: " + e + "."
                })
            },
            _handleGeolocationResponse: function(t) {
                var i = new z(t.coords.latitude, t.coords.longitude),
                    e = i.toBounds(2 * t.coords.accuracy),
                    n = this._locateOptions;
                if (n.setView) {
                    var o = this.getBoundsZoom(e);
                    this.setView(i, n.maxZoom ? Math.min(o, n.maxZoom) : o)
                }
                var s = {
                    latlng: i,
                    bounds: e,
                    timestamp: t.timestamp
                };
                for (var r in t.coords) "number" == typeof t.coords[r] && (s[r] = t.coords[r]);
                this.fire("locationfound", s)
            },
            addHandler: function(t, i) {
                if (!i) return this;
                var e = this[t] = new i(this);
                return this._handlers.push(e), this.options[t] && e.enable(), this
            },
            remove: function() {
                if (this._initEvents(!0), this._containerId !== this._container._leaflet_id) throw new Error("Map container is being reused by another instance");
                try {
                    delete this._container._leaflet_id, delete this._containerId
                } catch (t) {
                    this._container._leaflet_id = void 0, this._containerId = void 0
                }
                var t;
                for (t in void 0 !== this._locationWatchId && this.stopLocate(), this._stop(), q(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (g(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload"), this._layers) this._layers[t].remove();
                for (t in this._panes) q(this._panes[t]);
                return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this
            },
            createPane: function(t, i) {
                var e = F("div", "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), i || this._mapPane);
                return t && (this._panes[t] = e), e
            },
            getCenter: function() {
                return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
            },
            getZoom: function() {
                return this._zoom
            },
            getBounds: function() {
                var t = this.getPixelBounds();
                return new b(this.unproject(t.getBottomLeft()), this.unproject(t.getTopRight()))
            },
            getMinZoom: function() {
                return void 0 === this.options.minZoom ? this._layersMinZoom || 0 : this.options.minZoom
            },
            getMaxZoom: function() {
                return void 0 === this.options.maxZoom ? void 0 === this._layersMaxZoom ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
            },
            getBoundsZoom: function(t, i, e) {
                t = T(t), e = x(e || [0, 0]);
                var n = this.getZoom() || 0,
                    o = this.getMinZoom(),
                    s = this.getMaxZoom(),
                    r = t.getNorthWest(),
                    a = t.getSouthEast(),
                    h = this.getSize().subtract(e),
                    u = P(this.project(a, n), this.project(r, n)).getSize(),
                    l = Ei ? this.options.zoomSnap : 1,
                    c = h.x / u.x,
                    _ = h.y / u.y,
                    d = i ? Math.max(c, _) : Math.min(c, _);
                return n = this.getScaleZoom(d, n), l && (n = Math.round(n / (l / 100)) * (l / 100), n = i ? Math.ceil(n / l) * l : Math.floor(n / l) * l), Math.max(o, Math.min(s, n))
            },
            getSize: function() {
                return this._size && !this._sizeChanged || (this._size = new y(this._container.clientWidth || 0, this._container.clientHeight || 0), this._sizeChanged = !1), this._size.clone()
            },
            getPixelBounds: function(t, i) {
                var e = this._getTopLeftPoint(t, i);
                return new w(e, e.add(this.getSize()))
            },
            getPixelOrigin: function() {
                return this._checkIfLoaded(), this._pixelOrigin
            },
            getPixelWorldBounds: function(t) {
                return this.options.crs.getProjectedBounds(void 0 === t ? this.getZoom() : t)
            },
            getPane: function(t) {
                return "string" == typeof t ? this._panes[t] : t
            },
            getPanes: function() {
                return this._panes
            },
            getContainer: function() {
                return this._container
            },
            getZoomScale: function(t, i) {
                var e = this.options.crs;
                return i = void 0 === i ? this._zoom : i, e.scale(t) / e.scale(i)
            },
            getScaleZoom: function(t, i) {
                var e = this.options.crs;
                i = void 0 === i ? this._zoom : i;
                var n = e.zoom(t * e.scale(i));
                return isNaN(n) ? 1 / 0 : n
            },
            project: function(t, i) {
                return i = void 0 === i ? this._zoom : i, this.options.crs.latLngToPoint(M(t), i)
            },
            unproject: function(t, i) {
                return i = void 0 === i ? this._zoom : i, this.options.crs.pointToLatLng(x(t), i)
            },
            layerPointToLatLng: function(t) {
                var i = x(t).add(this.getPixelOrigin());
                return this.unproject(i)
            },
            latLngToLayerPoint: function(t) {
                return this.project(M(t))._round()._subtract(this.getPixelOrigin())
            },
            wrapLatLng: function(t) {
                return this.options.crs.wrapLatLng(M(t))
            },
            wrapLatLngBounds: function(t) {
                return this.options.crs.wrapLatLngBounds(T(t))
            },
            distance: function(t, i) {
                return this.options.crs.distance(M(t), M(i))
            },
            containerPointToLayerPoint: function(t) {
                return x(t).subtract(this._getMapPanePos())
            },
            layerPointToContainerPoint: function(t) {
                return x(t).add(this._getMapPanePos())
            },
            containerPointToLatLng: function(t) {
                var i = this.containerPointToLayerPoint(x(t));
                return this.layerPointToLatLng(i)
            },
            latLngToContainerPoint: function(t) {
                return this.layerPointToContainerPoint(this.latLngToLayerPoint(M(t)))
            },
            mouseEventToContainerPoint: function(t) {
                return yt(t, this._container)
            },
            mouseEventToLayerPoint: function(t) {
                return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
            },
            mouseEventToLatLng: function(t) {
                return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))
            },
            _initContainer: function(t) {
                var i = this._container = W(t);
                if (!i) throw new Error("Map container not found.");
                if (i._leaflet_id) throw new Error("Map container is already initialized.");
                lt(i, "scroll", this._onScroll, this), this._containerId = n(i)
            },
            _initLayout: function() {
                var t = this._container;
                this._fadeAnimated = this.options.fadeAnimation && Ei, Y(t, "leaflet-container" + (Ri ? " leaflet-touch" : "") + (ji ? " leaflet-retina" : "") + (pi ? " leaflet-oldie" : "") + (bi ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
                var i = H(t, "position");
                "absolute" !== i && "relative" !== i && "fixed" !== i && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos()
            },
            _initPanes: function() {
                var t = this._panes = {};
                this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), et(this._mapPane, new y(0, 0)), this.createPane("tilePane"), this.createPane("shadowPane"), this.createPane("overlayPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (Y(t.markerPane, "leaflet-zoom-hide"), Y(t.shadowPane, "leaflet-zoom-hide"))
            },
            _resetView: function(t, i) {
                et(this._mapPane, new y(0, 0));
                var e = !this._loaded;
                this._loaded = !0, i = this._limitZoom(i), this.fire("viewprereset");
                var n = this._zoom !== i;
                this._moveStart(n, !1)._move(t, i)._moveEnd(n), this.fire("viewreset"), e && this.fire("load")
            },
            _moveStart: function(t, i) {
                return t && this.fire("zoomstart"), i || this.fire("movestart"), this
            },
            _move: function(t, i, e) {
                void 0 === i && (i = this._zoom);
                var n = this._zoom !== i;
                return this._zoom = i, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), (n || e && e.pinch) && this.fire("zoom", e), this.fire("move", e)
            },
            _moveEnd: function(t) {
                return t && this.fire("zoomend"), this.fire("moveend")
            },
            _stop: function() {
                return g(this._flyToFrame), this._panAnim && this._panAnim.stop(), this
            },
            _rawPanBy: function(t) {
                et(this._mapPane, this._getMapPanePos().subtract(t))
            },
            _getZoomSpan: function() {
                return this.getMaxZoom() - this.getMinZoom()
            },
            _panInsideMaxBounds: function() {
                this._enforcingBounds || this.panInsideBounds(this.options.maxBounds)
            },
            _checkIfLoaded: function() {
                if (!this._loaded) throw new Error("Set map center and zoom first.")
            },
            _initEvents: function(t) {
                this._targets = {}, this._targets[n(this._container)] = this;
                var i = t ? ct : lt;
                i(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress", this._handleDOMEvent, this), this.options.trackResize && i(window, "resize", this._onResize, this), Ei && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd)
            },
            _onResize: function() {
                g(this._resizeRequest), this._resizeRequest = f(function() {
                    this.invalidateSize({
                        debounceMoveend: !0
                    })
                }, this)
            },
            _onScroll: function() {
                this._container.scrollTop = 0, this._container.scrollLeft = 0
            },
            _onMoveEnd: function() {
                var t = this._getMapPanePos();
                Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom())
            },
            _findEventTargets: function(t, i) {
                for (var e, o = [], s = "mouseout" === i || "mouseover" === i, r = t.target || t.srcElement, a = !1; r;) {
                    if ((e = this._targets[n(r)]) && ("click" === i || "preclick" === i) && !t._simulated && this._draggableMoved(e)) {
                        a = !0;
                        break
                    }
                    if (e && e.listens(i, !0)) {
                        if (s && !Pt(r, t)) break;
                        if (o.push(e), s) break
                    }
                    if (r === this._container) break;
                    r = r.parentNode
                }
                return o.length || a || s || !Pt(r, t) || (o = [this]), o
            },
            _handleDOMEvent: function(t) {
                if (this._loaded && !Lt(t)) {
                    var i = t.type;
                    "mousedown" !== i && "keypress" !== i || rt(t.target || t.srcElement), this._fireDOMEvent(t, i)
                }
            },
            _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
            _fireDOMEvent: function(t, e, n) {
                if ("click" === t.type) {
                    var o = i({}, t);
                    o.type = "preclick", this._fireDOMEvent(o, o.type, n)
                }
                if (!t._stopped && (n = (n || []).concat(this._findEventTargets(t, e))).length) {
                    var s = n[0];
                    "contextmenu" === e && s.listens(e, !0) && gt(t);
                    var r = {
                        originalEvent: t
                    };
                    if ("keypress" !== t.type) {
                        var a = s.getLatLng && (!s._radius || s._radius <= 10);
                        r.containerPoint = a ? this.latLngToContainerPoint(s.getLatLng()) : this.mouseEventToContainerPoint(t), r.layerPoint = this.containerPointToLayerPoint(r.containerPoint), r.latlng = a ? s.getLatLng() : this.layerPointToLatLng(r.layerPoint)
                    }
                    for (var h = 0; h < n.length; h++)
                        if (n[h].fire(e, r, !0), r.originalEvent._stopped || !1 === n[h].options.bubblingMouseEvents && -1 !== d(this._mouseEvents, e)) return
                }
            },
            _draggableMoved: function(t) {
                return (t = t.dragging && t.dragging.enabled() ? t : this).dragging && t.dragging.moved() || this.boxZoom && this.boxZoom.moved()
            },
            _clearHandlers: function() {
                for (var t = 0, i = this._handlers.length; t < i; t++) this._handlers[t].disable()
            },
            whenReady: function(t, i) {
                return this._loaded ? t.call(i || this, {
                    target: this
                }) : this.on("load", t, i), this
            },
            _getMapPanePos: function() {
                return nt(this._mapPane) || new y(0, 0)
            },
            _moved: function() {
                var t = this._getMapPanePos();
                return t && !t.equals([0, 0])
            },
            _getTopLeftPoint: function(t, i) {
                return (t && void 0 !== i ? this._getNewPixelOrigin(t, i) : this.getPixelOrigin()).subtract(this._getMapPanePos())
            },
            _getNewPixelOrigin: function(t, i) {
                var e = this.getSize()._divideBy(2);
                return this.project(t, i)._subtract(e)._add(this._getMapPanePos())._round()
            },
            _latLngToNewLayerPoint: function(t, i, e) {
                var n = this._getNewPixelOrigin(e, i);
                return this.project(t, i)._subtract(n)
            },
            _latLngBoundsToNewLayerBounds: function(t, i, e) {
                var n = this._getNewPixelOrigin(e, i);
                return P([this.project(t.getSouthWest(), i)._subtract(n), this.project(t.getNorthWest(), i)._subtract(n), this.project(t.getSouthEast(), i)._subtract(n), this.project(t.getNorthEast(), i)._subtract(n)])
            },
            _getCenterLayerPoint: function() {
                return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
            },
            _getCenterOffset: function(t) {
                return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
            },
            _limitCenter: function(t, i, e) {
                if (!e) return t;
                var n = this.project(t, i),
                    o = this.getSize().divideBy(2),
                    s = new w(n.subtract(o), n.add(o)),
                    r = this._getBoundsOffset(s, e, i);
                return r.round().equals([0, 0]) ? t : this.unproject(n.add(r), i)
            },
            _limitOffset: function(t, i) {
                if (!i) return t;
                var e = this.getPixelBounds(),
                    n = new w(e.min.add(t), e.max.add(t));
                return t.add(this._getBoundsOffset(n, i))
            },
            _getBoundsOffset: function(t, i, e) {
                var n = P(this.project(i.getNorthEast(), e), this.project(i.getSouthWest(), e)),
                    o = n.min.subtract(t.min),
                    s = n.max.subtract(t.max);
                return new y(this._rebound(o.x, -s.x), this._rebound(o.y, -s.y))
            },
            _rebound: function(t, i) {
                return t + i > 0 ? Math.round(t - i) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(i))
            },
            _limitZoom: function(t) {
                var i = this.getMinZoom(),
                    e = this.getMaxZoom(),
                    n = Ei ? this.options.zoomSnap : 1;
                return n && (t = Math.round(t / n) * n), Math.max(i, Math.min(e, t))
            },
            _onPanTransitionStep: function() {
                this.fire("move")
            },
            _onPanTransitionEnd: function() {
                X(this._mapPane, "leaflet-pan-anim"), this.fire("moveend")
            },
            _tryAnimatedPan: function(t, i) {
                var e = this._getCenterOffset(t)._trunc();
                return !(!0 !== (i && i.animate) && !this.getSize().contains(e) || (this.panBy(e, i), 0))
            },
            _createAnimProxy: function() {
                var t = this._proxy = F("div", "leaflet-proxy leaflet-zoom-animated");
                this._panes.mapPane.appendChild(t), this.on("zoomanim", function(t) {
                    var i = ee,
                        e = this._proxy.style[i];
                    it(this._proxy, this.project(t.center, t.zoom), this.getZoomScale(t.zoom, 1)), e === this._proxy.style[i] && this._animatingZoom && this._onZoomTransitionEnd()
                }, this), this.on("load moveend", function() {
                    var t = this.getCenter(),
                        i = this.getZoom();
                    it(this._proxy, this.project(t, i), this.getZoomScale(i, 1))
                }, this), this._on("unload", this._destroyAnimProxy, this)
            },
            _destroyAnimProxy: function() {
                q(this._proxy), delete this._proxy
            },
            _catchTransitionEnd: function(t) {
                this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
            },
            _nothingToAnimate: function() {
                return !this._container.getElementsByClassName("leaflet-zoom-animated").length
            },
            _tryAnimatedZoom: function(t, i, e) {
                if (this._animatingZoom) return !0;
                if (e = e || {}, !this._zoomAnimated || !1 === e.animate || this._nothingToAnimate() || Math.abs(i - this._zoom) > this.options.zoomAnimationThreshold) return !1;
                var n = this.getZoomScale(i),
                    o = this._getCenterOffset(t)._divideBy(1 - 1 / n);
                return !(!0 !== e.animate && !this.getSize().contains(o) || (f(function() {
                    this._moveStart(!0, !1)._animateZoom(t, i, !0)
                }, this), 0))
            },
            _animateZoom: function(t, i, n, o) {
                this._mapPane && (n && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = i, Y(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
                    center: t,
                    zoom: i,
                    noUpdate: o
                }), setTimeout(e(this._onZoomTransitionEnd, this), 250))
            },
            _onZoomTransitionEnd: function() {
                this._animatingZoom && (this._mapPane && X(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom), f(function() {
                    this._moveEnd(!0)
                }, this))
            }
        }),
        fe = v.extend({
            options: {
                position: "topright"
            },
            initialize: function(t) {
                l(this, t)
            },
            getPosition: function() {
                return this.options.position
            },
            setPosition: function(t) {
                var i = this._map;
                return i && i.removeControl(this), this.options.position = t, i && i.addControl(this), this
            },
            getContainer: function() {
                return this._container
            },
            addTo: function(t) {
                this.remove(), this._map = t;
                var i = this._container = this.onAdd(t),
                    e = this.getPosition(),
                    n = t._controlCorners[e];
                return Y(i, "leaflet-control"), -1 !== e.indexOf("bottom") ? n.insertBefore(i, n.firstChild) : n.appendChild(i), this
            },
            remove: function() {
                return this._map ? (q(this._container), this.onRemove && this.onRemove(this._map), this._map = null, this) : this
            },
            _refocusOnMap: function(t) {
                this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus()
            }
        }),
        ge = function(t) {
            return new fe(t)
        };
    me.include({
        addControl: function(t) {
            return t.addTo(this), this
        },
        removeControl: function(t) {
            return t.remove(), this
        },
        _initControlPos: function() {
            function t(t, o) {
                var s = e + t + " " + e + o;
                i[t + o] = F("div", s, n)
            }
            var i = this._controlCorners = {},
                e = "leaflet-",
                n = this._controlContainer = F("div", e + "control-container", this._container);
            t("top", "left"), t("top", "right"), t("bottom", "left"), t("bottom", "right")
        },
        _clearControlPos: function() {
            for (var t in this._controlCorners) q(this._controlCorners[t]);
            q(this._controlContainer), delete this._controlCorners, delete this._controlContainer
        }
    });
    var ve = fe.extend({
            options: {
                collapsed: !0,
                position: "topright",
                autoZIndex: !0,
                hideSingleBase: !1,
                sortLayers: !1,
                sortFunction: function(t, i, e, n) {
                    return e < n ? -1 : n < e ? 1 : 0
                }
            },
            initialize: function(t, i, e) {
                for (var n in l(this, e), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, t) this._addLayer(t[n], n);
                for (n in i) this._addLayer(i[n], n, !0)
            },
            onAdd: function(t) {
                this._initLayout(), this._update(), this._map = t, t.on("zoomend", this._checkDisabledLayers, this);
                for (var i = 0; i < this._layers.length; i++) this._layers[i].layer.on("add remove", this._onLayerChange, this);
                return this._container
            },
            addTo: function(t) {
                return fe.prototype.addTo.call(this, t), this._expandIfNotCollapsed()
            },
            onRemove: function() {
                this._map.off("zoomend", this._checkDisabledLayers, this);
                for (var t = 0; t < this._layers.length; t++) this._layers[t].layer.off("add remove", this._onLayerChange, this)
            },
            addBaseLayer: function(t, i) {
                return this._addLayer(t, i), this._map ? this._update() : this
            },
            addOverlay: function(t, i) {
                return this._addLayer(t, i, !0), this._map ? this._update() : this
            },
            removeLayer: function(t) {
                t.off("add remove", this._onLayerChange, this);
                var i = this._getLayer(n(t));
                return i && this._layers.splice(this._layers.indexOf(i), 1), this._map ? this._update() : this
            },
            expand: function() {
                Y(this._container, "leaflet-control-layers-expanded"), this._form.style.height = null;
                var t = this._map.getSize().y - (this._container.offsetTop + 50);
                return t < this._form.clientHeight ? (Y(this._form, "leaflet-control-layers-scrollbar"), this._form.style.height = t + "px") : X(this._form, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this
            },
            collapse: function() {
                return X(this._container, "leaflet-control-layers-expanded"), this
            },
            _initLayout: function() {
                var t = "leaflet-control-layers",
                    i = this._container = F("div", t),
                    e = this.options.collapsed;
                i.setAttribute("aria-haspopup", !0), ft(i), mt(i);
                var n = this._form = F("form", t + "-list");
                e && (this._map.on("click", this.collapse, this), gi || lt(i, {
                    mouseenter: this.expand,
                    mouseleave: this.collapse
                }, this));
                var o = this._layersLink = F("a", t + "-toggle", i);
                o.href = "#", o.title = "Layers", Ri ? (lt(o, "click", vt), lt(o, "click", this.expand, this)) : lt(o, "focus", this.expand, this), e || this.expand(), this._baseLayersList = F("div", t + "-base", n), this._separator = F("div", t + "-separator", n), this._overlaysList = F("div", t + "-overlays", n), i.appendChild(n)
            },
            _getLayer: function(t) {
                for (var i = 0; i < this._layers.length; i++)
                    if (this._layers[i] && n(this._layers[i].layer) === t) return this._layers[i]
            },
            _addLayer: function(t, i, n) {
                this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
                    layer: t,
                    name: i,
                    overlay: n
                }), this.options.sortLayers && this._layers.sort(e(function(t, i) {
                    return this.options.sortFunction(t.layer, i.layer, t.name, i.name)
                }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed()
            },
            _update: function() {
                if (!this._container) return this;
                U(this._baseLayersList), U(this._overlaysList), this._layerControlInputs = [];
                var t, i, e, n, o = 0;
                for (e = 0; e < this._layers.length; e++) n = this._layers[e], this._addItem(n), i = i || n.overlay, t = t || !n.overlay, o += n.overlay ? 0 : 1;
                return this.options.hideSingleBase && (t = t && o > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = i && t ? "" : "none", this
            },
            _onLayerChange: function(t) {
                this._handlingClick || this._update();
                var i = this._getLayer(n(t.target)),
                    e = i.overlay ? "add" === t.type ? "overlayadd" : "overlayremove" : "add" === t.type ? "baselayerchange" : null;
                e && this._map.fire(e, i)
            },
            _createRadioElement: function(t, i) {
                var e = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (i ? ' checked="checked"' : "") + "/>",
                    n = document.createElement("div");
                return n.innerHTML = e, n.firstChild
            },
            _addItem: function(t) {
                var i, e = document.createElement("label"),
                    o = this._map.hasLayer(t.layer);
                t.overlay ? ((i = document.createElement("input")).type = "checkbox", i.className = "leaflet-control-layers-selector", i.defaultChecked = o) : i = this._createRadioElement("leaflet-base-layers", o), this._layerControlInputs.push(i), i.layerId = n(t.layer), lt(i, "click", this._onInputClick, this);
                var s = document.createElement("span");
                s.innerHTML = " " + t.name;
                var r = document.createElement("div");
                return e.appendChild(r), r.appendChild(i), r.appendChild(s), (t.overlay ? this._overlaysList : this._baseLayersList).appendChild(e), this._checkDisabledLayers(), e
            },
            _onInputClick: function() {
                var t, i, e = this._layerControlInputs,
                    n = [],
                    o = [];
                this._handlingClick = !0;
                for (var s = e.length - 1; s >= 0; s--) t = e[s], i = this._getLayer(t.layerId).layer, t.checked ? n.push(i) : t.checked || o.push(i);
                for (s = 0; s < o.length; s++) this._map.hasLayer(o[s]) && this._map.removeLayer(o[s]);
                for (s = 0; s < n.length; s++) this._map.hasLayer(n[s]) || this._map.addLayer(n[s]);
                this._handlingClick = !1, this._refocusOnMap()
            },
            _checkDisabledLayers: function() {
                for (var t, i, e = this._layerControlInputs, n = this._map.getZoom(), o = e.length - 1; o >= 0; o--) t = e[o], i = this._getLayer(t.layerId).layer, t.disabled = void 0 !== i.options.minZoom && n < i.options.minZoom || void 0 !== i.options.maxZoom && n > i.options.maxZoom
            },
            _expandIfNotCollapsed: function() {
                return this._map && !this.options.collapsed && this.expand(), this
            },
            _expand: function() {
                return this.expand()
            },
            _collapse: function() {
                return this.collapse()
            }
        }),
        ye = fe.extend({
            options: {
                position: "topleft",
                zoomInText: "+",
                zoomInTitle: "Zoom in",
                zoomOutText: "&#x2212;",
                zoomOutTitle: "Zoom out"
            },
            onAdd: function(t) {
                var i = "leaflet-control-zoom",
                    e = F("div", i + " leaflet-bar"),
                    n = this.options;
                return this._zoomInButton = this._createButton(n.zoomInText, n.zoomInTitle, i + "-in", e, this._zoomIn), this._zoomOutButton = this._createButton(n.zoomOutText, n.zoomOutTitle, i + "-out", e, this._zoomOut), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), e
            },
            onRemove: function(t) {
                t.off("zoomend zoomlevelschange", this._updateDisabled, this)
            },
            disable: function() {
                return this._disabled = !0, this._updateDisabled(), this
            },
            enable: function() {
                return this._disabled = !1, this._updateDisabled(), this
            },
            _zoomIn: function(t) {
                !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1))
            },
            _zoomOut: function(t) {
                !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1))
            },
            _createButton: function(t, i, e, n, o) {
                var s = F("a", e, n);
                return s.innerHTML = t, s.href = "#", s.title = i, s.setAttribute("role", "button"), s.setAttribute("aria-label", i), ft(s), lt(s, "click", vt), lt(s, "click", o, this), lt(s, "click", this._refocusOnMap, this), s
            },
            _updateDisabled: function() {
                var t = this._map,
                    i = "leaflet-disabled";
                X(this._zoomInButton, i), X(this._zoomOutButton, i), (this._disabled || t._zoom === t.getMinZoom()) && Y(this._zoomOutButton, i), (this._disabled || t._zoom === t.getMaxZoom()) && Y(this._zoomInButton, i)
            }
        });
    me.mergeOptions({
        zoomControl: !0
    }), me.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new ye, this.addControl(this.zoomControl))
    });
    var xe = fe.extend({
            options: {
                position: "bottomleft",
                maxWidth: 100,
                metric: !0,
                imperial: !0
            },
            onAdd: function(t) {
                var i = F("div", "leaflet-control-scale"),
                    e = this.options;
                return this._addScales(e, "leaflet-control-scale-line", i), t.on(e.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), i
            },
            onRemove: function(t) {
                t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
            },
            _addScales: function(t, i, e) {
                t.metric && (this._mScale = F("div", i, e)), t.imperial && (this._iScale = F("div", i, e))
            },
            _update: function() {
                var t = this._map,
                    i = t.getSize().y / 2,
                    e = t.distance(t.containerPointToLatLng([0, i]), t.containerPointToLatLng([this.options.maxWidth, i]));
                this._updateScales(e)
            },
            _updateScales: function(t) {
                this.options.metric && t && this._updateMetric(t), this.options.imperial && t && this._updateImperial(t)
            },
            _updateMetric: function(t) {
                var i = this._getRoundNum(t),
                    e = i < 1e3 ? i + " m" : i / 1e3 + " km";
                this._updateScale(this._mScale, e, i / t)
            },
            _updateImperial: function(t) {
                var i, e, n, o = 3.2808399 * t;
                o > 5280 ? (i = o / 5280, e = this._getRoundNum(i), this._updateScale(this._iScale, e + " mi", e / i)) : (n = this._getRoundNum(o), this._updateScale(this._iScale, n + " ft", n / o))
            },
            _updateScale: function(t, i, e) {
                t.style.width = Math.round(this.options.maxWidth * e) + "px", t.innerHTML = i
            },
            _getRoundNum: function(t) {
                var i = Math.pow(10, (Math.floor(t) + "").length - 1),
                    e = t / i;
                return i * (e = e >= 10 ? 10 : e >= 5 ? 5 : e >= 3 ? 3 : e >= 2 ? 2 : 1)
            }
        }),
        we = fe.extend({
            options: {
                position: "bottomright",
                prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
            },
            initialize: function(t) {
                l(this, t), this._attributions = {}
            },
            onAdd: function(t) {
                for (var i in t.attributionControl = this, this._container = F("div", "leaflet-control-attribution"), ft(this._container), t._layers) t._layers[i].getAttribution && this.addAttribution(t._layers[i].getAttribution());
                return this._update(), this._container
            },
            setPrefix: function(t) {
                return this.options.prefix = t, this._update(), this
            },
            addAttribution: function(t) {
                return t ? (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this) : this
            },
            removeAttribution: function(t) {
                return t ? (this._attributions[t] && (this._attributions[t]--, this._update()), this) : this
            },
            _update: function() {
                if (this._map) {
                    var t = [];
                    for (var i in this._attributions) this._attributions[i] && t.push(i);
                    var e = [];
                    this.options.prefix && e.push(this.options.prefix), t.length && e.push(t.join(", ")), this._container.innerHTML = e.join(" | ")
                }
            }
        });
    me.mergeOptions({
        attributionControl: !0
    }), me.addInitHook(function() {
        this.options.attributionControl && (new we).addTo(this)
    }), fe.Layers = ve, fe.Zoom = ye, fe.Scale = xe, fe.Attribution = we, ge.layers = function(t, i, e) {
        return new ve(t, i, e)
    }, ge.zoom = function(t) {
        return new ye(t)
    }, ge.scale = function(t) {
        return new xe(t)
    }, ge.attribution = function(t) {
        return new we(t)
    };
    var Le = v.extend({
        initialize: function(t) {
            this._map = t
        },
        enable: function() {
            return this._enabled ? this : (this._enabled = !0, this.addHooks(), this)
        },
        disable: function() {
            return this._enabled ? (this._enabled = !1, this.removeHooks(), this) : this
        },
        enabled: function() {
            return !!this._enabled
        }
    });
    Le.addTo = function(t, i) {
        return t.addHandler(i, this), this
    };
    var Pe, be = {
            Events: ii
        },
        Te = Ri ? "touchstart mousedown" : "mousedown",
        ze = {
            mousedown: "mouseup",
            touchstart: "touchend",
            pointerdown: "touchend",
            MSPointerDown: "touchend"
        },
        Me = {
            mousedown: "mousemove",
            touchstart: "touchmove",
            pointerdown: "touchmove",
            MSPointerDown: "touchmove"
        },
        Ce = ei.extend({
            options: {
                clickTolerance: 3
            },
            initialize: function(t, i, e, n) {
                l(this, n), this._element = t, this._dragStartTarget = i || t, this._preventOutline = e
            },
            enable: function() {
                this._enabled || (lt(this._dragStartTarget, Te, this._onDown, this), this._enabled = !0)
            },
            disable: function() {
                this._enabled && (Ce._dragging === this && this.finishDrag(), ct(this._dragStartTarget, Te, this._onDown, this), this._enabled = !1, this._moved = !1)
            },
            _onDown: function(t) {
                if (!t._simulated && this._enabled && (this._moved = !1, !K(this._element, "leaflet-zoom-anim") && !(Ce._dragging || t.shiftKey || 1 !== t.which && 1 !== t.button && !t.touches || (Ce._dragging = this, this._preventOutline && rt(this._element), ot(), ai(), this._moving)))) {
                    this.fire("down");
                    var i = t.touches ? t.touches[0] : t,
                        e = ht(this._element);
                    this._startPoint = new y(i.clientX, i.clientY), this._parentScale = ut(e), lt(document, Me[t.type], this._onMove, this), lt(document, ze[t.type], this._onUp, this)
                }
            },
            _onMove: function(t) {
                if (!t._simulated && this._enabled)
                    if (t.touches && t.touches.length > 1) this._moved = !0;
                    else {
                        var i = t.touches && 1 === t.touches.length ? t.touches[0] : t,
                            e = new y(i.clientX, i.clientY)._subtract(this._startPoint);
                        (e.x || e.y) && (Math.abs(e.x) + Math.abs(e.y) < this.options.clickTolerance || (e.x /= this._parentScale.x, e.y /= this._parentScale.y, gt(t), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = nt(this._element).subtract(e), Y(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), Y(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(e), this._moving = !0, g(this._animRequest), this._lastEvent = t, this._animRequest = f(this._updatePosition, this, !0)))
                    }
            },
            _updatePosition: function() {
                var t = {
                    originalEvent: this._lastEvent
                };
                this.fire("predrag", t), et(this._element, this._newPos), this.fire("drag", t)
            },
            _onUp: function(t) {
                !t._simulated && this._enabled && this.finishDrag()
            },
            finishDrag: function() {
                for (var t in X(document.body, "leaflet-dragging"), this._lastTarget && (X(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), Me) ct(document, Me[t], this._onMove, this), ct(document, ze[t], this._onUp, this);
                st(), hi(), this._moved && this._moving && (g(this._animRequest), this.fire("dragend", {
                    distance: this._newPos.distanceTo(this._startPos)
                })), this._moving = !1, Ce._dragging = !1
            }
        }),
        Se = (Object.freeze || Object)({
            simplify: bt,
            pointToSegmentDistance: Tt,
            closestPointOnSegment: function(t, i, e) {
                return Zt(t, i, e)
            },
            clipSegment: zt,
            _getEdgeIntersection: Mt,
            _getBitCode: Ct,
            _sqClosestPointOnSegment: Zt,
            isFlat: Et,
            _flat: kt
        }),
        Ze = (Object.freeze || Object)({
            clipPolygon: At
        }),
        Ee = {
            project: function(t) {
                return new y(t.lng, t.lat)
            },
            unproject: function(t) {
                return new z(t.y, t.x)
            },
            bounds: new w([-180, -90], [180, 90])
        },
        ke = {
            R: 6378137,
            R_MINOR: 6356752.314245179,
            bounds: new w([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
            project: function(t) {
                var i = Math.PI / 180,
                    e = this.R,
                    n = t.lat * i,
                    o = this.R_MINOR / e,
                    s = Math.sqrt(1 - o * o),
                    r = s * Math.sin(n),
                    a = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - r) / (1 + r), s / 2);
                return n = -e * Math.log(Math.max(a, 1e-10)), new y(t.lng * i * e, n)
            },
            unproject: function(t) {
                for (var i, e = 180 / Math.PI, n = this.R, o = this.R_MINOR / n, s = Math.sqrt(1 - o * o), r = Math.exp(-t.y / n), a = Math.PI / 2 - 2 * Math.atan(r), h = 0, u = .1; h < 15 && Math.abs(u) > 1e-7; h++) i = s * Math.sin(a), i = Math.pow((1 - i) / (1 + i), s / 2), a += u = Math.PI / 2 - 2 * Math.atan(r * i) - a;
                return new z(a * e, t.x * e / n)
            }
        },
        Ae = (Object.freeze || Object)({
            LonLat: Ee,
            Mercator: ke,
            SphericalMercator: ri
        }),
        Be = i({}, si, {
            code: "EPSG:3395",
            projection: ke,
            transformation: function() {
                var t = .5 / (Math.PI * ke.R);
                return S(t, .5, -t, .5)
            }()
        }),
        Ie = i({}, si, {
            code: "EPSG:4326",
            projection: Ee,
            transformation: S(1 / 180, 1, -1 / 180, .5)
        }),
        Oe = i({}, oi, {
            projection: Ee,
            transformation: S(1, 0, -1, 0),
            scale: function(t) {
                return Math.pow(2, t)
            },
            zoom: function(t) {
                return Math.log(t) / Math.LN2
            },
            distance: function(t, i) {
                var e = i.lng - t.lng,
                    n = i.lat - t.lat;
                return Math.sqrt(e * e + n * n)
            },
            infinite: !0
        });
    oi.Earth = si, oi.EPSG3395 = Be, oi.EPSG3857 = li, oi.EPSG900913 = ci, oi.EPSG4326 = Ie, oi.Simple = Oe;
    var Re = ei.extend({
        options: {
            pane: "overlayPane",
            attribution: null,
            bubblingMouseEvents: !0
        },
        addTo: function(t) {
            return t.addLayer(this), this
        },
        remove: function() {
            return this.removeFrom(this._map || this._mapToAdd)
        },
        removeFrom: function(t) {
            return t && t.removeLayer(this), this
        },
        getPane: function(t) {
            return this._map.getPane(t ? this.options[t] || t : this.options.pane)
        },
        addInteractiveTarget: function(t) {
            return this._map._targets[n(t)] = this, this
        },
        removeInteractiveTarget: function(t) {
            return delete this._map._targets[n(t)], this
        },
        getAttribution: function() {
            return this.options.attribution
        },
        _layerAdd: function(t) {
            var i = t.target;
            if (i.hasLayer(this)) {
                if (this._map = i, this._zoomAnimated = i._zoomAnimated, this.getEvents) {
                    var e = this.getEvents();
                    i.on(e, this), this.once("remove", function() {
                        i.off(e, this)
                    }, this)
                }
                this.onAdd(i), this.getAttribution && i.attributionControl && i.attributionControl.addAttribution(this.getAttribution()), this.fire("add"), i.fire("layeradd", {
                    layer: this
                })
            }
        }
    });
    me.include({
        addLayer: function(t) {
            if (!t._layerAdd) throw new Error("The provided object is not a Layer.");
            var i = n(t);
            return this._layers[i] ? this : (this._layers[i] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this)
        },
        removeLayer: function(t) {
            var i = n(t);
            return this._layers[i] ? (this._loaded && t.onRemove(this), t.getAttribution && this.attributionControl && this.attributionControl.removeAttribution(t.getAttribution()), delete this._layers[i], this._loaded && (this.fire("layerremove", {
                layer: t
            }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this
        },
        hasLayer: function(t) {
            return !!t && n(t) in this._layers
        },
        eachLayer: function(t, i) {
            for (var e in this._layers) t.call(i, this._layers[e]);
            return this
        },
        _addLayers: function(t) {
            for (var i = 0, e = (t = t ? Yt(t) ? t : [t] : []).length; i < e; i++) this.addLayer(t[i])
        },
        _addZoomLimit: function(t) {
            !isNaN(t.options.maxZoom) && isNaN(t.options.minZoom) || (this._zoomBoundLayers[n(t)] = t, this._updateZoomLevels())
        },
        _removeZoomLimit: function(t) {
            var i = n(t);
            this._zoomBoundLayers[i] && (delete this._zoomBoundLayers[i], this._updateZoomLevels())
        },
        _updateZoomLevels: function() {
            var t = 1 / 0,
                i = -1 / 0,
                e = this._getZoomSpan();
            for (var n in this._zoomBoundLayers) {
                var o = this._zoomBoundLayers[n].options;
                t = void 0 === o.minZoom ? t : Math.min(t, o.minZoom), i = void 0 === o.maxZoom ? i : Math.max(i, o.maxZoom)
            }
            this._layersMaxZoom = i === -1 / 0 ? void 0 : i, this._layersMinZoom = t === 1 / 0 ? void 0 : t, e !== this._getZoomSpan() && this.fire("zoomlevelschange"), void 0 === this.options.maxZoom && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), void 0 === this.options.minZoom && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom)
        }
    });
    var De = Re.extend({
            initialize: function(t, i) {
                var e, n;
                if (l(this, i), this._layers = {}, t)
                    for (e = 0, n = t.length; e < n; e++) this.addLayer(t[e])
            },
            addLayer: function(t) {
                var i = this.getLayerId(t);
                return this._layers[i] = t, this._map && this._map.addLayer(t), this
            },
            removeLayer: function(t) {
                var i = t in this._layers ? t : this.getLayerId(t);
                return this._map && this._layers[i] && this._map.removeLayer(this._layers[i]), delete this._layers[i], this
            },
            hasLayer: function(t) {
                return !!t && (t in this._layers || this.getLayerId(t) in this._layers)
            },
            clearLayers: function() {
                return this.eachLayer(this.removeLayer, this)
            },
            invoke: function(t) {
                var i, e, n = Array.prototype.slice.call(arguments, 1);
                for (i in this._layers)(e = this._layers[i])[t] && e[t].apply(e, n);
                return this
            },
            onAdd: function(t) {
                this.eachLayer(t.addLayer, t)
            },
            onRemove: function(t) {
                this.eachLayer(t.removeLayer, t)
            },
            eachLayer: function(t, i) {
                for (var e in this._layers) t.call(i, this._layers[e]);
                return this
            },
            getLayer: function(t) {
                return this._layers[t]
            },
            getLayers: function() {
                var t = [];
                return this.eachLayer(t.push, t), t
            },
            setZIndex: function(t) {
                return this.invoke("setZIndex", t)
            },
            getLayerId: function(t) {
                return n(t)
            }
        }),
        Ne = De.extend({
            addLayer: function(t) {
                return this.hasLayer(t) ? this : (t.addEventParent(this), De.prototype.addLayer.call(this, t), this.fire("layeradd", {
                    layer: t
                }))
            },
            removeLayer: function(t) {
                return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), De.prototype.removeLayer.call(this, t), this.fire("layerremove", {
                    layer: t
                })) : this
            },
            setStyle: function(t) {
                return this.invoke("setStyle", t)
            },
            bringToFront: function() {
                return this.invoke("bringToFront")
            },
            bringToBack: function() {
                return this.invoke("bringToBack")
            },
            getBounds: function() {
                var t = new b;
                for (var i in this._layers) {
                    var e = this._layers[i];
                    t.extend(e.getBounds ? e.getBounds() : e.getLatLng())
                }
                return t
            }
        }),
        je = v.extend({
            options: {
                popupAnchor: [0, 0],
                tooltipAnchor: [0, 0]
            },
            initialize: function(t) {
                l(this, t)
            },
            createIcon: function(t) {
                return this._createIcon("icon", t)
            },
            createShadow: function(t) {
                return this._createIcon("shadow", t)
            },
            _createIcon: function(t, i) {
                var e = this._getIconUrl(t);
                if (!e) {
                    if ("icon" === t) throw new Error("iconUrl not set in Icon options (see the docs).");
                    return null
                }
                var n = this._createImg(e, i && "IMG" === i.tagName ? i : null);
                return this._setIconStyles(n, t), n
            },
            _setIconStyles: function(t, i) {
                var e = this.options,
                    n = e[i + "Size"];
                "number" == typeof n && (n = [n, n]);
                var o = x(n),
                    s = x("shadow" === i && e.shadowAnchor || e.iconAnchor || o && o.divideBy(2, !0));
                t.className = "leaflet-marker-" + i + " " + (e.className || ""), s && (t.style.marginLeft = -s.x + "px", t.style.marginTop = -s.y + "px"), o && (t.style.width = o.x + "px", t.style.height = o.y + "px")
            },
            _createImg: function(t, i) {
                return (i = i || document.createElement("img")).src = t, i
            },
            _getIconUrl: function(t) {
                return ji && this.options[t + "RetinaUrl"] || this.options[t + "Url"]
            }
        }),
        We = je.extend({
            options: {
                iconUrl: "marker-icon.png",
                iconRetinaUrl: "marker-icon-2x.png",
                shadowUrl: "marker-shadow.png",
                iconSize: [43, 55],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                tooltipAnchor: [16, -28],
                shadowSize: [41, 41]
            },
            _getIconUrl: function(t) {
                return We.imagePath || (We.imagePath = this._detectIconPath()), (this.options.imagePath || We.imagePath) + je.prototype._getIconUrl.call(this, t)
            },
            _detectIconPath: function() {
                var t = F("div", "leaflet-default-icon-path", document.body),
                    i = H(t, "background-image") || H(t, "backgroundImage");
                return document.body.removeChild(t), null === i || 0 !== i.indexOf("url") ? "" : i.replace(/^url\(["']?/, "").replace(/marker-icon\.png["']?\)$/, "")
            }
        }),
        He = Le.extend({
            initialize: function(t) {
                this._marker = t
            },
            addHooks: function() {
                var t = this._marker._icon;
                this._draggable || (this._draggable = new Ce(t, t, !0)), this._draggable.on({
                    dragstart: this._onDragStart,
                    predrag: this._onPreDrag,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                }, this).enable(), Y(t, "leaflet-marker-draggable")
            },
            removeHooks: function() {
                this._draggable.off({
                    dragstart: this._onDragStart,
                    predrag: this._onPreDrag,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                }, this).disable(), this._marker._icon && X(this._marker._icon, "leaflet-marker-draggable")
            },
            moved: function() {
                return this._draggable && this._draggable._moved
            },
            _adjustPan: function(t) {
                var i = this._marker,
                    e = i._map,
                    n = this._marker.options.autoPanSpeed,
                    o = this._marker.options.autoPanPadding,
                    s = nt(i._icon),
                    r = e.getPixelBounds(),
                    a = e.getPixelOrigin(),
                    h = P(r.min._subtract(a).add(o), r.max._subtract(a).subtract(o));
                if (!h.contains(s)) {
                    var u = x((Math.max(h.max.x, s.x) - h.max.x) / (r.max.x - h.max.x) - (Math.min(h.min.x, s.x) - h.min.x) / (r.min.x - h.min.x), (Math.max(h.max.y, s.y) - h.max.y) / (r.max.y - h.max.y) - (Math.min(h.min.y, s.y) - h.min.y) / (r.min.y - h.min.y)).multiplyBy(n);
                    e.panBy(u, {
                        animate: !1
                    }), this._draggable._newPos._add(u), this._draggable._startPos._add(u), et(i._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = f(this._adjustPan.bind(this, t))
                }
            },
            _onDragStart: function() {
                this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup().fire("movestart").fire("dragstart")
            },
            _onPreDrag: function(t) {
                this._marker.options.autoPan && (g(this._panRequest), this._panRequest = f(this._adjustPan.bind(this, t)))
            },
            _onDrag: function(t) {
                var i = this._marker,
                    e = i._shadow,
                    n = nt(i._icon),
                    o = i._map.layerPointToLatLng(n);
                e && et(e, n), i._latlng = o, t.latlng = o, t.oldLatLng = this._oldLatLng, i.fire("move", t).fire("drag", t)
            },
            _onDragEnd: function(t) {
                g(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t)
            }
        }),
        Fe = Re.extend({
            options: {
                icon: new We,
                interactive: !0,
                keyboard: !0,
                title: "",
                alt: "",
                zIndexOffset: 0,
                opacity: 1,
                riseOnHover: !1,
                riseOffset: 250,
                pane: "markerPane",
                bubblingMouseEvents: !1,
                draggable: !1,
                autoPan: !1,
                autoPanPadding: [50, 50],
                autoPanSpeed: 10
            },
            initialize: function(t, i) {
                l(this, i), this._latlng = M(t)
            },
            onAdd: function(t) {
                this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation, this._zoomAnimated && t.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update()
            },
            onRemove: function(t) {
                this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && t.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow()
            },
            getEvents: function() {
                return {
                    zoom: this.update,
                    viewreset: this.update
                }
            },
            getLatLng: function() {
                return this._latlng
            },
            setLatLng: function(t) {
                var i = this._latlng;
                return this._latlng = M(t), this.update(), this.fire("move", {
                    oldLatLng: i,
                    latlng: this._latlng
                })
            },
            setZIndexOffset: function(t) {
                return this.options.zIndexOffset = t, this.update()
            },
            setIcon: function(t) {
                return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this
            },
            getElement: function() {
                return this._icon
            },
            update: function() {
                if (this._icon && this._map) {
                    var t = this._map.latLngToLayerPoint(this._latlng).round();
                    this._setPos(t)
                }
                return this
            },
            _initIcon: function() {
                var t = this.options,
                    i = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"),
                    e = t.icon.createIcon(this._icon),
                    n = !1;
                e !== this._icon && (this._icon && this._removeIcon(), n = !0, t.title && (e.title = t.title), "IMG" === e.tagName && (e.alt = t.alt || "")), Y(e, i), t.keyboard && (e.tabIndex = "0"), this._icon = e, t.riseOnHover && this.on({
                    mouseover: this._bringToFront,
                    mouseout: this._resetZIndex
                });
                var o = t.icon.createShadow(this._shadow),
                    s = !1;
                o !== this._shadow && (this._removeShadow(), s = !0), o && (Y(o, i), o.alt = ""), this._shadow = o, t.opacity < 1 && this._updateOpacity(), n && this.getPane().appendChild(this._icon), this._initInteraction(), o && s && this.getPane("shadowPane").appendChild(this._shadow)
            },
            _removeIcon: function() {
                this.options.riseOnHover && this.off({
                    mouseover: this._bringToFront,
                    mouseout: this._resetZIndex
                }), q(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null
            },
            _removeShadow: function() {
                this._shadow && q(this._shadow), this._shadow = null
            },
            _setPos: function(t) {
                et(this._icon, t), this._shadow && et(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex()
            },
            _updateZIndex: function(t) {
                this._icon.style.zIndex = this._zIndex + t
            },
            _animateZoom: function(t) {
                var i = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
                this._setPos(i)
            },
            _initInteraction: function() {
                if (this.options.interactive && (Y(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), He)) {
                    var t = this.options.draggable;
                    this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new He(this), t && this.dragging.enable()
                }
            },
            setOpacity: function(t) {
                return this.options.opacity = t, this._map && this._updateOpacity(), this
            },
            _updateOpacity: function() {
                var t = this.options.opacity;
                Q(this._icon, t), this._shadow && Q(this._shadow, t)
            },
            _bringToFront: function() {
                this._updateZIndex(this.options.riseOffset)
            },
            _resetZIndex: function() {
                this._updateZIndex(0)
            },
            _getPopupAnchor: function() {
                return this.options.icon.options.popupAnchor
            },
            _getTooltipAnchor: function() {
                return this.options.icon.options.tooltipAnchor
            }
        }),
        qe = Re.extend({
            options: {
                stroke: !0,
                color: "#3388ff",
                weight: 3,
                opacity: 1,
                lineCap: "round",
                lineJoin: "round",
                dashArray: null,
                dashOffset: null,
                fill: !1,
                fillColor: null,
                fillOpacity: .2,
                fillRule: "evenodd",
                interactive: !0,
                bubblingMouseEvents: !0
            },
            beforeAdd: function(t) {
                this._renderer = t.getRenderer(this)
            },
            onAdd: function() {
                this._renderer._initPath(this), this._reset(), this._renderer._addPath(this)
            },
            onRemove: function() {
                this._renderer._removePath(this)
            },
            redraw: function() {
                return this._map && this._renderer._updatePath(this), this
            },
            setStyle: function(t) {
                return l(this, t), this._renderer && this._renderer._updateStyle(this), this
            },
            bringToFront: function() {
                return this._renderer && this._renderer._bringToFront(this), this
            },
            bringToBack: function() {
                return this._renderer && this._renderer._bringToBack(this), this
            },
            getElement: function() {
                return this._path
            },
            _reset: function() {
                this._project(), this._update()
            },
            _clickTolerance: function() {
                return (this.options.stroke ? this.options.weight / 2 : 0) + this._renderer.options.tolerance
            }
        }),
        Ue = qe.extend({
            options: {
                fill: !0,
                radius: 10
            },
            initialize: function(t, i) {
                l(this, i), this._latlng = M(t), this._radius = this.options.radius
            },
            setLatLng: function(t) {
                return this._latlng = M(t), this.redraw(), this.fire("move", {
                    latlng: this._latlng
                })
            },
            getLatLng: function() {
                return this._latlng
            },
            setRadius: function(t) {
                return this.options.radius = this._radius = t, this.redraw()
            },
            getRadius: function() {
                return this._radius
            },
            setStyle: function(t) {
                var i = t && t.radius || this._radius;
                return qe.prototype.setStyle.call(this, t), this.setRadius(i), this
            },
            _project: function() {
                this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds()
            },
            _updateBounds: function() {
                var t = this._radius,
                    i = this._radiusY || t,
                    e = this._clickTolerance(),
                    n = [t + e, i + e];
                this._pxBounds = new w(this._point.subtract(n), this._point.add(n))
            },
            _update: function() {
                this._map && this._updatePath()
            },
            _updatePath: function() {
                this._renderer._updateCircle(this)
            },
            _empty: function() {
                return this._radius && !this._renderer._bounds.intersects(this._pxBounds)
            },
            _containsPoint: function(t) {
                return t.distanceTo(this._point) <= this._radius + this._clickTolerance()
            }
        }),
        Ve = Ue.extend({
            initialize: function(t, e, n) {
                if ("number" == typeof e && (e = i({}, n, {
                        radius: e
                    })), l(this, e), this._latlng = M(t), isNaN(this.options.radius)) throw new Error("Circle radius cannot be NaN");
                this._mRadius = this.options.radius
            },
            setRadius: function(t) {
                return this._mRadius = t, this.redraw()
            },
            getRadius: function() {
                return this._mRadius
            },
            getBounds: function() {
                var t = [this._radius, this._radiusY || this._radius];
                return new b(this._map.layerPointToLatLng(this._point.subtract(t)), this._map.layerPointToLatLng(this._point.add(t)))
            },
            setStyle: qe.prototype.setStyle,
            _project: function() {
                var t = this._latlng.lng,
                    i = this._latlng.lat,
                    e = this._map,
                    n = e.options.crs;
                if (n.distance === si.distance) {
                    var o = Math.PI / 180,
                        s = this._mRadius / si.R / o,
                        r = e.project([i + s, t]),
                        a = e.project([i - s, t]),
                        h = r.add(a).divideBy(2),
                        u = e.unproject(h).lat,
                        l = Math.acos((Math.cos(s * o) - Math.sin(i * o) * Math.sin(u * o)) / (Math.cos(i * o) * Math.cos(u * o))) / o;
                    (isNaN(l) || 0 === l) && (l = s / Math.cos(Math.PI / 180 * i)), this._point = h.subtract(e.getPixelOrigin()), this._radius = isNaN(l) ? 0 : h.x - e.project([u, t - l]).x, this._radiusY = h.y - r.y
                } else {
                    var c = n.unproject(n.project(this._latlng).subtract([this._mRadius, 0]));
                    this._point = e.latLngToLayerPoint(this._latlng), this._radius = this._point.x - e.latLngToLayerPoint(c).x
                }
                this._updateBounds()
            }
        }),
        Ge = qe.extend({
            options: {
                smoothFactor: 1,
                noClip: !1
            },
            initialize: function(t, i) {
                l(this, i), this._setLatLngs(t)
            },
            getLatLngs: function() {
                return this._latlngs
            },
            setLatLngs: function(t) {
                return this._setLatLngs(t), this.redraw()
            },
            isEmpty: function() {
                return !this._latlngs.length
            },
            closestLayerPoint: function(t) {
                for (var i, e, n = 1 / 0, o = null, s = Zt, r = 0, a = this._parts.length; r < a; r++)
                    for (var h = this._parts[r], u = 1, l = h.length; u < l; u++) {
                        var c = s(t, i = h[u - 1], e = h[u], !0);
                        c < n && (n = c, o = s(t, i, e))
                    }
                return o && (o.distance = Math.sqrt(n)), o
            },
            getCenter: function() {
                if (!this._map) throw new Error("Must add layer to map before using getCenter()");
                var t, i, e, n, o, s, r, a = this._rings[0],
                    h = a.length;
                if (!h) return null;
                for (t = 0, i = 0; t < h - 1; t++) i += a[t].distanceTo(a[t + 1]) / 2;
                if (0 === i) return this._map.layerPointToLatLng(a[0]);
                for (t = 0, n = 0; t < h - 1; t++)
                    if (o = a[t], s = a[t + 1], (n += e = o.distanceTo(s)) > i) return r = (n - i) / e, this._map.layerPointToLatLng([s.x - r * (s.x - o.x), s.y - r * (s.y - o.y)])
            },
            getBounds: function() {
                return this._bounds
            },
            addLatLng: function(t, i) {
                return i = i || this._defaultShape(), t = M(t), i.push(t), this._bounds.extend(t), this.redraw()
            },
            _setLatLngs: function(t) {
                this._bounds = new b, this._latlngs = this._convertLatLngs(t)
            },
            _defaultShape: function() {
                return Et(this._latlngs) ? this._latlngs : this._latlngs[0]
            },
            _convertLatLngs: function(t) {
                for (var i = [], e = Et(t), n = 0, o = t.length; n < o; n++) e ? (i[n] = M(t[n]), this._bounds.extend(i[n])) : i[n] = this._convertLatLngs(t[n]);
                return i
            },
            _project: function() {
                var t = new w;
                this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t);
                var i = this._clickTolerance(),
                    e = new y(i, i);
                this._bounds.isValid() && t.isValid() && (t.min._subtract(e), t.max._add(e), this._pxBounds = t)
            },
            _projectLatlngs: function(t, i, e) {
                var n, o, s = t[0] instanceof z,
                    r = t.length;
                if (s) {
                    for (o = [], n = 0; n < r; n++) o[n] = this._map.latLngToLayerPoint(t[n]), e.extend(o[n]);
                    i.push(o)
                } else
                    for (n = 0; n < r; n++) this._projectLatlngs(t[n], i, e)
            },
            _clipPoints: function() {
                var t = this._renderer._bounds;
                if (this._parts = [], this._pxBounds && this._pxBounds.intersects(t))
                    if (this.options.noClip) this._parts = this._rings;
                    else {
                        var i, e, n, o, s, r, a, h = this._parts;
                        for (i = 0, n = 0, o = this._rings.length; i < o; i++)
                            for (e = 0, s = (a = this._rings[i]).length; e < s - 1; e++)(r = zt(a[e], a[e + 1], t, e, !0)) && (h[n] = h[n] || [], h[n].push(r[0]), r[1] === a[e + 1] && e !== s - 2 || (h[n].push(r[1]), n++))
                    }
            },
            _simplifyPoints: function() {
                for (var t = this._parts, i = this.options.smoothFactor, e = 0, n = t.length; e < n; e++) t[e] = bt(t[e], i)
            },
            _update: function() {
                this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath())
            },
            _updatePath: function() {
                this._renderer._updatePoly(this)
            },
            _containsPoint: function(t, i) {
                var e, n, o, s, r, a, h = this._clickTolerance();
                if (!this._pxBounds || !this._pxBounds.contains(t)) return !1;
                for (e = 0, s = this._parts.length; e < s; e++)
                    for (n = 0, o = (r = (a = this._parts[e]).length) - 1; n < r; o = n++)
                        if ((i || 0 !== n) && Tt(t, a[o], a[n]) <= h) return !0;
                return !1
            }
        });
    Ge._flat = kt;
    var Ke = Ge.extend({
            options: {
                fill: !0
            },
            isEmpty: function() {
                return !this._latlngs.length || !this._latlngs[0].length
            },
            getCenter: function() {
                if (!this._map) throw new Error("Must add layer to map before using getCenter()");
                var t, i, e, n, o, s, r, a, h, u = this._rings[0],
                    l = u.length;
                if (!l) return null;
                for (s = r = a = 0, t = 0, i = l - 1; t < l; i = t++) e = u[t], n = u[i], o = e.y * n.x - n.y * e.x, r += (e.x + n.x) * o, a += (e.y + n.y) * o, s += 3 * o;
                return h = 0 === s ? u[0] : [r / s, a / s], this._map.layerPointToLatLng(h)
            },
            _convertLatLngs: function(t) {
                var i = Ge.prototype._convertLatLngs.call(this, t),
                    e = i.length;
                return e >= 2 && i[0] instanceof z && i[0].equals(i[e - 1]) && i.pop(), i
            },
            _setLatLngs: function(t) {
                Ge.prototype._setLatLngs.call(this, t), Et(this._latlngs) && (this._latlngs = [this._latlngs])
            },
            _defaultShape: function() {
                return Et(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0]
            },
            _clipPoints: function() {
                var t = this._renderer._bounds,
                    i = this.options.weight,
                    e = new y(i, i);
                if (t = new w(t.min.subtract(e), t.max.add(e)), this._parts = [], this._pxBounds && this._pxBounds.intersects(t))
                    if (this.options.noClip) this._parts = this._rings;
                    else
                        for (var n, o = 0, s = this._rings.length; o < s; o++)(n = At(this._rings[o], t, !0)).length && this._parts.push(n)
            },
            _updatePath: function() {
                this._renderer._updatePoly(this, !0)
            },
            _containsPoint: function(t) {
                var i, e, n, o, s, r, a, h, u = !1;
                if (!this._pxBounds || !this._pxBounds.contains(t)) return !1;
                for (o = 0, a = this._parts.length; o < a; o++)
                    for (s = 0, r = (h = (i = this._parts[o]).length) - 1; s < h; r = s++) e = i[s], n = i[r], e.y > t.y != n.y > t.y && t.x < (n.x - e.x) * (t.y - e.y) / (n.y - e.y) + e.x && (u = !u);
                return u || Ge.prototype._containsPoint.call(this, t, !0)
            }
        }),
        Ye = Ne.extend({
            initialize: function(t, i) {
                l(this, i), this._layers = {}, t && this.addData(t)
            },
            addData: function(t) {
                var i, e, n, o = Yt(t) ? t : t.features;
                if (o) {
                    for (i = 0, e = o.length; i < e; i++)((n = o[i]).geometries || n.geometry || n.features || n.coordinates) && this.addData(n);
                    return this
                }
                var s = this.options;
                if (s.filter && !s.filter(t)) return this;
                var r = Bt(t, s);
                return r ? (r.feature = jt(t), r.defaultOptions = r.options, this.resetStyle(r), s.onEachFeature && s.onEachFeature(t, r), this.addLayer(r)) : this
            },
            resetStyle: function(t) {
                return t.options = i({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this
            },
            setStyle: function(t) {
                return this.eachLayer(function(i) {
                    this._setLayerStyle(i, t)
                }, this)
            },
            _setLayerStyle: function(t, i) {
                "function" == typeof i && (i = i(t.feature)), t.setStyle && t.setStyle(i)
            }
        }),
        Xe = {
            toGeoJSON: function(t) {
                return Nt(this, {
                    type: "Point",
                    coordinates: Rt(this.getLatLng(), t)
                })
            }
        };
    Fe.include(Xe), Ve.include(Xe), Ue.include(Xe), Ge.include({
        toGeoJSON: function(t) {
            var i = !Et(this._latlngs);
            return Nt(this, {
                type: (i ? "Multi" : "") + "LineString",
                coordinates: Dt(this._latlngs, i ? 1 : 0, !1, t)
            })
        }
    }), Ke.include({
        toGeoJSON: function(t) {
            var i = !Et(this._latlngs),
                e = i && !Et(this._latlngs[0]),
                n = Dt(this._latlngs, e ? 2 : i ? 1 : 0, !0, t);
            return i || (n = [n]), Nt(this, {
                type: (e ? "Multi" : "") + "Polygon",
                coordinates: n
            })
        }
    }), De.include({
        toMultiPoint: function(t) {
            var i = [];
            return this.eachLayer(function(e) {
                i.push(e.toGeoJSON(t).geometry.coordinates)
            }), Nt(this, {
                type: "MultiPoint",
                coordinates: i
            })
        },
        toGeoJSON: function(t) {
            var i = this.feature && this.feature.geometry && this.feature.geometry.type;
            if ("MultiPoint" === i) return this.toMultiPoint(t);
            var e = "GeometryCollection" === i,
                n = [];
            return this.eachLayer(function(i) {
                if (i.toGeoJSON) {
                    var o = i.toGeoJSON(t);
                    if (e) n.push(o.geometry);
                    else {
                        var s = jt(o);
                        "FeatureCollection" === s.type ? n.push.apply(n, s.features) : n.push(s)
                    }
                }
            }), e ? Nt(this, {
                geometries: n,
                type: "GeometryCollection"
            }) : {
                type: "FeatureCollection",
                features: n
            }
        }
    });
    var Je = Wt,
        $e = Re.extend({
            options: {
                opacity: 1,
                alt: "",
                interactive: !1,
                crossOrigin: !1,
                errorOverlayUrl: "",
                zIndex: 1,
                className: ""
            },
            initialize: function(t, i, e) {
                this._url = t, this._bounds = T(i), l(this, e)
            },
            onAdd: function() {
                this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (Y(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset()
            },
            onRemove: function() {
                q(this._image), this.options.interactive && this.removeInteractiveTarget(this._image)
            },
            setOpacity: function(t) {
                return this.options.opacity = t, this._image && this._updateOpacity(), this
            },
            setStyle: function(t) {
                return t.opacity && this.setOpacity(t.opacity), this
            },
            bringToFront: function() {
                return this._map && V(this._image), this
            },
            bringToBack: function() {
                return this._map && G(this._image), this
            },
            setUrl: function(t) {
                return this._url = t, this._image && (this._image.src = t), this
            },
            setBounds: function(t) {
                return this._bounds = T(t), this._map && this._reset(), this
            },
            getEvents: function() {
                var t = {
                    zoom: this._reset,
                    viewreset: this._reset
                };
                return this._zoomAnimated && (t.zoomanim = this._animateZoom), t
            },
            setZIndex: function(t) {
                return this.options.zIndex = t, this._updateZIndex(), this
            },
            getBounds: function() {
                return this._bounds
            },
            getElement: function() {
                return this._image
            },
            _initImage: function() {
                var t = "IMG" === this._url.tagName,
                    i = this._image = t ? this._url : F("img");
                Y(i, "leaflet-image-layer"), this._zoomAnimated && Y(i, "leaflet-zoom-animated"), this.options.className && Y(i, this.options.className), i.onselectstart = r, i.onmousemove = r, i.onload = e(this.fire, this, "load"), i.onerror = e(this._overlayOnError, this, "error"), (this.options.crossOrigin || "" === this.options.crossOrigin) && (i.crossOrigin = !0 === this.options.crossOrigin ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t ? this._url = i.src : (i.src = this._url, i.alt = this.options.alt)
            },
            _animateZoom: function(t) {
                var i = this._map.getZoomScale(t.zoom),
                    e = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
                it(this._image, e, i)
            },
            _reset: function() {
                var t = this._image,
                    i = new w(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
                    e = i.getSize();
                et(t, i.min), t.style.width = e.x + "px", t.style.height = e.y + "px"
            },
            _updateOpacity: function() {
                Q(this._image, this.options.opacity)
            },
            _updateZIndex: function() {
                this._image && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._image.style.zIndex = this.options.zIndex)
            },
            _overlayOnError: function() {
                this.fire("error");
                var t = this.options.errorOverlayUrl;
                t && this._url !== t && (this._url = t, this._image.src = t)
            }
        }),
        Qe = $e.extend({
            options: {
                autoplay: !0,
                loop: !0
            },
            _initImage: function() {
                var t = "VIDEO" === this._url.tagName,
                    i = this._image = t ? this._url : F("video");
                if (Y(i, "leaflet-image-layer"), this._zoomAnimated && Y(i, "leaflet-zoom-animated"), i.onselectstart = r, i.onmousemove = r, i.onloadeddata = e(this.fire, this, "load"), t) {
                    for (var n = i.getElementsByTagName("source"), o = [], s = 0; s < n.length; s++) o.push(n[s].src);
                    this._url = n.length > 0 ? o : [i.src]
                } else {
                    Yt(this._url) || (this._url = [this._url]), i.autoplay = !!this.options.autoplay, i.loop = !!this.options.loop;
                    for (var a = 0; a < this._url.length; a++) {
                        var h = F("source");
                        h.src = this._url[a], i.appendChild(h)
                    }
                }
            }
        }),
        tn = Re.extend({
            options: {
                offset: [0, 7],
                className: "",
                pane: "popupPane"
            },
            initialize: function(t, i) {
                l(this, t), this._source = i
            },
            onAdd: function(t) {
                this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && Q(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && Q(this._container, 1), this.bringToFront()
            },
            onRemove: function(t) {
                t._fadeAnimated ? (Q(this._container, 0), this._removeTimeout = setTimeout(e(q, void 0, this._container), 200)) : q(this._container)
            },
            getLatLng: function() {
                return this._latlng
            },
            setLatLng: function(t) {
                return this._latlng = M(t), this._map && (this._updatePosition(), this._adjustPan()), this
            },
            getContent: function() {
                return this._content
            },
            setContent: function(t) {
                return this._content = t, this.update(), this
            },
            getElement: function() {
                return this._container
            },
            update: function() {
                this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
            },
            getEvents: function() {
                var t = {
                    zoom: this._updatePosition,
                    viewreset: this._updatePosition
                };
                return this._zoomAnimated && (t.zoomanim = this._animateZoom), t
            },
            isOpen: function() {
                return !!this._map && this._map.hasLayer(this)
            },
            bringToFront: function() {
                return this._map && V(this._container), this
            },
            bringToBack: function() {
                return this._map && G(this._container), this
            },
            _updateContent: function() {
                if (this._content) {
                    var t = this._contentNode,
                        i = "function" == typeof this._content ? this._content(this._source || this) : this._content;
                    if ("string" == typeof i) t.innerHTML = i;
                    else {
                        for (; t.hasChildNodes();) t.removeChild(t.firstChild);
                        t.appendChild(i)
                    }
                    this.fire("contentupdate")
                }
            },
            _updatePosition: function() {
                if (this._map) {
                    var t = this._map.latLngToLayerPoint(this._latlng),
                        i = x(this.options.offset),
                        e = this._getAnchor();
                    this._zoomAnimated ? et(this._container, t.add(e)) : i = i.add(t).add(e);
                    var n = this._containerBottom = -i.y,
                        o = this._containerLeft = -Math.round(this._containerWidth / 2) + i.x;
                    this._container.style.bottom = n + "px", this._container.style.left = o + "px"
                }
            },
            _getAnchor: function() {
                return [0, 0]
            }
        }),
        en = tn.extend({
            options: {
                maxWidth: 300,
                minWidth: 50,
                maxHeight: null,
                autoPan: !0,
                autoPanPaddingTopLeft: null,
                autoPanPaddingBottomRight: null,
                autoPanPadding: [5, 5],
                keepInView: !1,
                closeButton: !0,
                autoClose: !0,
                closeOnEscapeKey: !0,
                className: ""
            },
            openOn: function(t) {
                return t.openPopup(this), this
            },
            onAdd: function(t) {
                tn.prototype.onAdd.call(this, t), t.fire("popupopen", {
                    popup: this
                }), this._source && (this._source.fire("popupopen", {
                    popup: this
                }, !0), this._source instanceof qe || this._source.on("preclick", pt))
            },
            onRemove: function(t) {
                tn.prototype.onRemove.call(this, t), t.fire("popupclose", {
                    popup: this
                }), this._source && (this._source.fire("popupclose", {
                    popup: this
                }, !0), this._source instanceof qe || this._source.off("preclick", pt))
            },
            getEvents: function() {
                var t = tn.prototype.getEvents.call(this);
                return (void 0 !== this.options.closeOnClick ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this._close), this.options.keepInView && (t.moveend = this._adjustPan), t
            },
            _close: function() {
                this._map && this._map.closePopup(this)
            },
            _initLayout: function() {
                var t = "leaflet-popup",
                    i = this._container = F("div", t + " " + (this.options.className || "") + " leaflet-zoom-animated"),
                    e = this._wrapper = F("div", t + "-content-wrapper", i);
                if (this._contentNode = F("div", t + "-content", e), ft(e), mt(this._contentNode), lt(e, "contextmenu", pt), this._tipContainer = F("div", t + "-tip-container", i), this._tip = F("div", t + "-tip", this._tipContainer), this.options.closeButton) {
                    var n = this._closeButton = F("a", t + "-close-button", i);
                    n.href = "#close", n.innerHTML = "&#215;", lt(n, "click", this._onCloseButtonClick, this)
                }
            },
            _updateLayout: function() {
                var t = this._contentNode,
                    i = t.style;
                i.width = "", i.whiteSpace = "nowrap";
                var e = t.offsetWidth;
                e = Math.min(e, this.options.maxWidth), e = Math.max(e, this.options.minWidth), i.width = e + 1 + "px", i.whiteSpace = "", i.height = "";
                var n = t.offsetHeight,
                    o = this.options.maxHeight;
                o && n > o ? (i.height = o + "px", Y(t, "leaflet-popup-scrolled")) : X(t, "leaflet-popup-scrolled"), this._containerWidth = this._container.offsetWidth
            },
            _animateZoom: function(t) {
                var i = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center),
                    e = this._getAnchor();
                et(this._container, i.add(e))
            },
            _adjustPan: function() {
                if (!(!this.options.autoPan || this._map._panAnim && this._map._panAnim._inProgress)) {
                    var t = this._map,
                        i = parseInt(H(this._container, "marginBottom"), 10) || 0,
                        e = this._container.offsetHeight + i,
                        n = this._containerWidth,
                        o = new y(this._containerLeft, -e - this._containerBottom);
                    o._add(nt(this._container));
                    var s = t.layerPointToContainerPoint(o),
                        r = x(this.options.autoPanPadding),
                        a = x(this.options.autoPanPaddingTopLeft || r),
                        h = x(this.options.autoPanPaddingBottomRight || r),
                        u = t.getSize(),
                        l = 0,
                        c = 0;
                    s.x + n + h.x > u.x && (l = s.x + n - u.x + h.x), s.x - l - a.x < 0 && (l = s.x - a.x), s.y + e + h.y > u.y && (c = s.y + e - u.y + h.y), s.y - c - a.y < 0 && (c = s.y - a.y), (l || c) && t.fire("autopanstart").panBy([l, c])
                }
            },
            _onCloseButtonClick: function(t) {
                this._close(), vt(t)
            },
            _getAnchor: function() {
                return x(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0])
            }
        });
    me.mergeOptions({
        closePopupOnClick: !0
    }), me.include({
        openPopup: function(t, i, e) {
            return t instanceof en || (t = new en(e).setContent(t)), i && t.setLatLng(i), this.hasLayer(t) ? this : (this._popup && this._popup.options.autoClose && this.closePopup(), this._popup = t, this.addLayer(t))
        },
        closePopup: function(t) {
            return t && t !== this._popup || (t = this._popup, this._popup = null), t && this.removeLayer(t), this
        }
    }), Re.include({
        bindPopup: function(t, i) {
            return t instanceof en ? (l(t, i), this._popup = t, t._source = this) : (this._popup && !i || (this._popup = new en(i, this)), this._popup.setContent(t)), this._popupHandlersAdded || (this.on({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup
            }), this._popupHandlersAdded = !0), this
        },
        unbindPopup: function() {
            return this._popup && (this.off({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup
            }), this._popupHandlersAdded = !1, this._popup = null), this
        },
        openPopup: function(t, i) {
            if (t instanceof Re || (i = t, t = this), t instanceof Ne)
                for (var e in this._layers) {
                    t = this._layers[e];
                    break
                }
            return i || (i = t.getCenter ? t.getCenter() : t.getLatLng()), this._popup && this._map && (this._popup._source = t, this._popup.update(), this._map.openPopup(this._popup, i)), this
        },
        closePopup: function() {
            return this._popup && this._popup._close(), this
        },
        togglePopup: function(t) {
            return this._popup && (this._popup._map ? this.closePopup() : this.openPopup(t)), this
        },
        isPopupOpen: function() {
            return !!this._popup && this._popup.isOpen()
        },
        setPopupContent: function(t) {
            return this._popup && this._popup.setContent(t), this
        },
        getPopup: function() {
            return this._popup
        },
        _openPopup: function(t) {
            var i = t.layer || t.target;
            this._popup && this._map && (vt(t), i instanceof qe ? this.openPopup(t.layer || t.target, t.latlng) : this._map.hasLayer(this._popup) && this._popup._source === i ? this.closePopup() : this.openPopup(i, t.latlng))
        },
        _movePopup: function(t) {
            this._popup.setLatLng(t.latlng)
        },
        _onKeyPress: function(t) {
            13 === t.originalEvent.keyCode && this._openPopup(t)
        }
    });
    var nn = tn.extend({
        options: {
            pane: "tooltipPane",
            offset: [0, 0],
            direction: "auto",
            permanent: !1,
            sticky: !1,
            interactive: !1,
            opacity: .9
        },
        onAdd: function(t) {
            tn.prototype.onAdd.call(this, t), this.setOpacity(this.options.opacity), t.fire("tooltipopen", {
                tooltip: this
            }), this._source && this._source.fire("tooltipopen", {
                tooltip: this
            }, !0)
        },
        onRemove: function(t) {
            tn.prototype.onRemove.call(this, t), t.fire("tooltipclose", {
                tooltip: this
            }), this._source && this._source.fire("tooltipclose", {
                tooltip: this
            }, !0)
        },
        getEvents: function() {
            var t = tn.prototype.getEvents.call(this);
            return Ri && !this.options.permanent && (t.preclick = this._close), t
        },
        _close: function() {
            this._map && this._map.closeTooltip(this)
        },
        _initLayout: function() {
            var t = "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
            this._contentNode = this._container = F("div", t)
        },
        _updateLayout: function() {},
        _adjustPan: function() {},
        _setPosition: function(t) {
            var i = this._map,
                e = this._container,
                n = i.latLngToContainerPoint(i.getCenter()),
                o = i.layerPointToContainerPoint(t),
                s = this.options.direction,
                r = e.offsetWidth,
                a = e.offsetHeight,
                h = x(this.options.offset),
                u = this._getAnchor();
            "top" === s ? t = t.add(x(-r / 2 + h.x, -a + h.y + u.y, !0)) : "bottom" === s ? t = t.subtract(x(r / 2 - h.x, -h.y, !0)) : "center" === s ? t = t.subtract(x(r / 2 + h.x, a / 2 - u.y + h.y, !0)) : "right" === s || "auto" === s && o.x < n.x ? (s = "right", t = t.add(x(h.x + u.x, u.y - a / 2 + h.y, !0))) : (s = "left", t = t.subtract(x(r + u.x - h.x, a / 2 - u.y - h.y, !0))), X(e, "leaflet-tooltip-right"), X(e, "leaflet-tooltip-left"), X(e, "leaflet-tooltip-top"), X(e, "leaflet-tooltip-bottom"), Y(e, "leaflet-tooltip-" + s), et(e, t)
        },
        _updatePosition: function() {
            var t = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(t)
        },
        setOpacity: function(t) {
            this.options.opacity = t, this._container && Q(this._container, t)
        },
        _animateZoom: function(t) {
            var i = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
            this._setPosition(i)
        },
        _getAnchor: function() {
            return x(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0])
        }
    });
    me.include({
        openTooltip: function(t, i, e) {
            return t instanceof nn || (t = new nn(e).setContent(t)), i && t.setLatLng(i), this.hasLayer(t) ? this : this.addLayer(t)
        },
        closeTooltip: function(t) {
            return t && this.removeLayer(t), this
        }
    }), Re.include({
        bindTooltip: function(t, i) {
            return t instanceof nn ? (l(t, i), this._tooltip = t, t._source = this) : (this._tooltip && !i || (this._tooltip = new nn(i, this)), this._tooltip.setContent(t)), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this
        },
        unbindTooltip: function() {
            return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null), this
        },
        _initTooltipInteractions: function(t) {
            if (t || !this._tooltipHandlersAdded) {
                var i = t ? "off" : "on",
                    e = {
                        remove: this.closeTooltip,
                        move: this._moveTooltip
                    };
                this._tooltip.options.permanent ? e.add = this._openTooltip : (e.mouseover = this._openTooltip, e.mouseout = this.closeTooltip, this._tooltip.options.sticky && (e.mousemove = this._moveTooltip), Ri && (e.click = this._openTooltip)), this[i](e), this._tooltipHandlersAdded = !t
            }
        },
        openTooltip: function(t, i) {
            if (t instanceof Re || (i = t, t = this), t instanceof Ne)
                for (var e in this._layers) {
                    t = this._layers[e];
                    break
                }
            return i || (i = t.getCenter ? t.getCenter() : t.getLatLng()), this._tooltip && this._map && (this._tooltip._source = t, this._tooltip.update(), this._map.openTooltip(this._tooltip, i), this._tooltip.options.interactive && this._tooltip._container && (Y(this._tooltip._container, "leaflet-clickable"), this.addInteractiveTarget(this._tooltip._container))), this
        },
        closeTooltip: function() {
            return this._tooltip && (this._tooltip._close(), this._tooltip.options.interactive && this._tooltip._container && (X(this._tooltip._container, "leaflet-clickable"), this.removeInteractiveTarget(this._tooltip._container))), this
        },
        toggleTooltip: function(t) {
            return this._tooltip && (this._tooltip._map ? this.closeTooltip() : this.openTooltip(t)), this
        },
        isTooltipOpen: function() {
            return this._tooltip.isOpen()
        },
        setTooltipContent: function(t) {
            return this._tooltip && this._tooltip.setContent(t), this
        },
        getTooltip: function() {
            return this._tooltip
        },
        _openTooltip: function(t) {
            var i = t.layer || t.target;
            this._tooltip && this._map && this.openTooltip(i, this._tooltip.options.sticky ? t.latlng : void 0)
        },
        _moveTooltip: function(t) {
            var i, e, n = t.latlng;
            this._tooltip.options.sticky && t.originalEvent && (i = this._map.mouseEventToContainerPoint(t.originalEvent), e = this._map.containerPointToLayerPoint(i), n = this._map.layerPointToLatLng(e)), this._tooltip.setLatLng(n)
        }
    });
    var on = je.extend({
        options: {
            iconSize: [12, 12],
            html: !1,
            bgPos: null,
            className: "leaflet-div-icon"
        },
        createIcon: function(t) {
            var i = t && "DIV" === t.tagName ? t : document.createElement("div"),
                e = this.options;
            if (i.innerHTML = !1 !== e.html ? e.html : "", e.bgPos) {
                var n = x(e.bgPos);
                i.style.backgroundPosition = -n.x + "px " + -n.y + "px"
            }
            return this._setIconStyles(i, "icon"), i
        },
        createShadow: function() {
            return null
        }
    });
    je.Default = We;
    var sn = Re.extend({
            options: {
                tileSize: 256,
                opacity: 1,
                updateWhenIdle: ki,
                updateWhenZooming: !0,
                updateInterval: 200,
                zIndex: 1,
                bounds: null,
                minZoom: 0,
                maxZoom: void 0,
                maxNativeZoom: void 0,
                minNativeZoom: void 0,
                noWrap: !1,
                pane: "tilePane",
                className: "",
                keepBuffer: 2
            },
            initialize: function(t) {
                l(this, t)
            },
            onAdd: function() {
                this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView(), this._update()
            },
            beforeAdd: function(t) {
                t._addZoomLimit(this)
            },
            onRemove: function(t) {
                this._removeAllTiles(), q(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = void 0
            },
            bringToFront: function() {
                return this._map && (V(this._container), this._setAutoZIndex(Math.max)), this
            },
            bringToBack: function() {
                return this._map && (G(this._container), this._setAutoZIndex(Math.min)), this
            },
            getContainer: function() {
                return this._container
            },
            setOpacity: function(t) {
                return this.options.opacity = t, this._updateOpacity(), this
            },
            setZIndex: function(t) {
                return this.options.zIndex = t, this._updateZIndex(), this
            },
            isLoading: function() {
                return this._loading
            },
            redraw: function() {
                return this._map && (this._removeAllTiles(), this._update()), this
            },
            getEvents: function() {
                var t = {
                    viewprereset: this._invalidateAll,
                    viewreset: this._resetView,
                    zoom: this._resetView,
                    moveend: this._onMoveEnd
                };
                return this.options.updateWhenIdle || (this._onMove || (this._onMove = o(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t
            },
            createTile: function() {
                return document.createElement("div")
            },
            getTileSize: function() {
                var t = this.options.tileSize;
                return t instanceof y ? t : new y(t, t)
            },
            _updateZIndex: function() {
                this._container && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._container.style.zIndex = this.options.zIndex)
            },
            _setAutoZIndex: function(t) {
                for (var i, e = this.getPane().children, n = -t(-1 / 0, 1 / 0), o = 0, s = e.length; o < s; o++) i = e[o].style.zIndex, e[o] !== this._container && i && (n = t(n, +i));
                isFinite(n) && (this.options.zIndex = n + t(-1, 1), this._updateZIndex())
            },
            _updateOpacity: function() {
                if (this._map && !pi) {
                    Q(this._container, this.options.opacity);
                    var t = +new Date,
                        i = !1,
                        e = !1;
                    for (var n in this._tiles) {
                        var o = this._tiles[n];
                        if (o.current && o.loaded) {
                            var s = Math.min(1, (t - o.loaded) / 200);
                            Q(o.el, s), s < 1 ? i = !0 : (o.active ? e = !0 : this._onOpaqueTile(o), o.active = !0)
                        }
                    }
                    e && !this._noPrune && this._pruneTiles(), i && (g(this._fadeFrame), this._fadeFrame = f(this._updateOpacity, this))
                }
            },
            _onOpaqueTile: r,
            _initContainer: function() {
                this._container || (this._container = F("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container))
            },
            _updateLevels: function() {
                var t = this._tileZoom,
                    i = this.options.maxZoom;
                if (void 0 !== t) {
                    for (var e in this._levels) this._levels[e].el.children.length || e === t ? (this._levels[e].el.style.zIndex = i - Math.abs(t - e), this._onUpdateLevel(e)) : (q(this._levels[e].el), this._removeTilesAtZoom(e), this._onRemoveLevel(e), delete this._levels[e]);
                    var n = this._levels[t],
                        o = this._map;
                    return n || ((n = this._levels[t] = {}).el = F("div", "leaflet-tile-container leaflet-zoom-animated", this._container), n.el.style.zIndex = i, n.origin = o.project(o.unproject(o.getPixelOrigin()), t).round(), n.zoom = t, this._setZoomTransform(n, o.getCenter(), o.getZoom()), n.el.offsetWidth, this._onCreateLevel(n)), this._level = n, n
                }
            },
            _onUpdateLevel: r,
            _onRemoveLevel: r,
            _onCreateLevel: r,
            _pruneTiles: function() {
                if (this._map) {
                    var t, i, e = this._map.getZoom();
                    if (e > this.options.maxZoom || e < this.options.minZoom) this._removeAllTiles();
                    else {
                        for (t in this._tiles)(i = this._tiles[t]).retain = i.current;
                        for (t in this._tiles)
                            if ((i = this._tiles[t]).current && !i.active) {
                                var n = i.coords;
                                this._retainParent(n.x, n.y, n.z, n.z - 5) || this._retainChildren(n.x, n.y, n.z, n.z + 2)
                            } for (t in this._tiles) this._tiles[t].retain || this._removeTile(t)
                    }
                }
            },
            _removeTilesAtZoom: function(t) {
                for (var i in this._tiles) this._tiles[i].coords.z === t && this._removeTile(i)
            },
            _removeAllTiles: function() {
                for (var t in this._tiles) this._removeTile(t)
            },
            _invalidateAll: function() {
                for (var t in this._levels) q(this._levels[t].el), this._onRemoveLevel(t), delete this._levels[t];
                this._removeAllTiles(), this._tileZoom = void 0
            },
            _retainParent: function(t, i, e, n) {
                var o = Math.floor(t / 2),
                    s = Math.floor(i / 2),
                    r = e - 1,
                    a = new y(+o, +s);
                a.z = +r;
                var h = this._tileCoordsToKey(a),
                    u = this._tiles[h];
                return u && u.active ? (u.retain = !0, !0) : (u && u.loaded && (u.retain = !0), r > n && this._retainParent(o, s, r, n))
            },
            _retainChildren: function(t, i, e, n) {
                for (var o = 2 * t; o < 2 * t + 2; o++)
                    for (var s = 2 * i; s < 2 * i + 2; s++) {
                        var r = new y(o, s);
                        r.z = e + 1;
                        var a = this._tileCoordsToKey(r),
                            h = this._tiles[a];
                        h && h.active ? h.retain = !0 : (h && h.loaded && (h.retain = !0), e + 1 < n && this._retainChildren(o, s, e + 1, n))
                    }
            },
            _resetView: function(t) {
                var i = t && (t.pinch || t.flyTo);
                this._setView(this._map.getCenter(), this._map.getZoom(), i, i)
            },
            _animateZoom: function(t) {
                this._setView(t.center, t.zoom, !0, t.noUpdate)
            },
            _clampZoom: function(t) {
                var i = this.options;
                return void 0 !== i.minNativeZoom && t < i.minNativeZoom ? i.minNativeZoom : void 0 !== i.maxNativeZoom && i.maxNativeZoom < t ? i.maxNativeZoom : t
            },
            _setView: function(t, i, e, n) {
                var o = this._clampZoom(Math.round(i));
                (void 0 !== this.options.maxZoom && o > this.options.maxZoom || void 0 !== this.options.minZoom && o < this.options.minZoom) && (o = void 0);
                var s = this.options.updateWhenZooming && o !== this._tileZoom;
                n && !s || (this._tileZoom = o, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), void 0 !== o && this._update(t), e || this._pruneTiles(), this._noPrune = !!e), this._setZoomTransforms(t, i)
            },
            _setZoomTransforms: function(t, i) {
                for (var e in this._levels) this._setZoomTransform(this._levels[e], t, i)
            },
            _setZoomTransform: function(t, i, e) {
                var n = this._map.getZoomScale(e, t.zoom),
                    o = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(i, e)).round();
                Ei ? it(t.el, o, n) : et(t.el, o)
            },
            _resetGrid: function() {
                var t = this._map,
                    i = t.options.crs,
                    e = this._tileSize = this.getTileSize(),
                    n = this._tileZoom,
                    o = this._map.getPixelWorldBounds(this._tileZoom);
                o && (this._globalTileRange = this._pxBoundsToTileRange(o)), this._wrapX = i.wrapLng && !this.options.noWrap && [Math.floor(t.project([0, i.wrapLng[0]], n).x / e.x), Math.ceil(t.project([0, i.wrapLng[1]], n).x / e.y)], this._wrapY = i.wrapLat && !this.options.noWrap && [Math.floor(t.project([i.wrapLat[0], 0], n).y / e.x), Math.ceil(t.project([i.wrapLat[1], 0], n).y / e.y)]
            },
            _onMoveEnd: function() {
                this._map && !this._map._animatingZoom && this._update()
            },
            _getTiledPixelBounds: function(t) {
                var i = this._map,
                    e = i._animatingZoom ? Math.max(i._animateToZoom, i.getZoom()) : i.getZoom(),
                    n = i.getZoomScale(e, this._tileZoom),
                    o = i.project(t, this._tileZoom).floor(),
                    s = i.getSize().divideBy(2 * n);
                return new w(o.subtract(s), o.add(s))
            },
            _update: function(t) {
                var i = this._map;
                if (i) {
                    var e = this._clampZoom(i.getZoom());
                    if (void 0 === t && (t = i.getCenter()), void 0 !== this._tileZoom) {
                        var n = this._getTiledPixelBounds(t),
                            o = this._pxBoundsToTileRange(n),
                            s = o.getCenter(),
                            r = [],
                            a = this.options.keepBuffer,
                            h = new w(o.getBottomLeft().subtract([a, -a]), o.getTopRight().add([a, -a]));
                        if (!(isFinite(o.min.x) && isFinite(o.min.y) && isFinite(o.max.x) && isFinite(o.max.y))) throw new Error("Attempted to load an infinite number of tiles");
                        for (var u in this._tiles) {
                            var l = this._tiles[u].coords;
                            l.z === this._tileZoom && h.contains(new y(l.x, l.y)) || (this._tiles[u].current = !1)
                        }
                        if (Math.abs(e - this._tileZoom) > 1) this._setView(t, e);
                        else {
                            for (var c = o.min.y; c <= o.max.y; c++)
                                for (var _ = o.min.x; _ <= o.max.x; _++) {
                                    var d = new y(_, c);
                                    if (d.z = this._tileZoom, this._isValidTile(d)) {
                                        var p = this._tiles[this._tileCoordsToKey(d)];
                                        p ? p.current = !0 : r.push(d)
                                    }
                                }
                            if (r.sort(function(t, i) {
                                    return t.distanceTo(s) - i.distanceTo(s)
                                }), 0 !== r.length) {
                                this._loading || (this._loading = !0, this.fire("loading"));
                                var m = document.createDocumentFragment();
                                for (_ = 0; _ < r.length; _++) this._addTile(r[_], m);
                                this._level.el.appendChild(m)
                            }
                        }
                    }
                }
            },
            _isValidTile: function(t) {
                var i = this._map.options.crs;
                if (!i.infinite) {
                    var e = this._globalTileRange;
                    if (!i.wrapLng && (t.x < e.min.x || t.x > e.max.x) || !i.wrapLat && (t.y < e.min.y || t.y > e.max.y)) return !1
                }
                if (!this.options.bounds) return !0;
                var n = this._tileCoordsToBounds(t);
                return T(this.options.bounds).overlaps(n)
            },
            _keyToBounds: function(t) {
                return this._tileCoordsToBounds(this._keyToTileCoords(t))
            },
            _tileCoordsToNwSe: function(t) {
                var i = this._map,
                    e = this.getTileSize(),
                    n = t.scaleBy(e),
                    o = n.add(e);
                return [i.unproject(n, t.z), i.unproject(o, t.z)]
            },
            _tileCoordsToBounds: function(t) {
                var i = this._tileCoordsToNwSe(t),
                    e = new b(i[0], i[1]);
                return this.options.noWrap || (e = this._map.wrapLatLngBounds(e)), e
            },
            _tileCoordsToKey: function(t) {
                return t.x + ":" + t.y + ":" + t.z
            },
            _keyToTileCoords: function(t) {
                var i = t.split(":"),
                    e = new y(+i[0], +i[1]);
                return e.z = +i[2], e
            },
            _removeTile: function(t) {
                var i = this._tiles[t];
                i && (q(i.el), delete this._tiles[t], this.fire("tileunload", {
                    tile: i.el,
                    coords: this._keyToTileCoords(t)
                }))
            },
            _initTile: function(t) {
                Y(t, "leaflet-tile");
                var i = this.getTileSize();
                t.style.width = i.x + "px", t.style.height = i.y + "px", t.onselectstart = r, t.onmousemove = r, pi && this.options.opacity < 1 && Q(t, this.options.opacity), gi && !vi && (t.style.WebkitBackfaceVisibility = "hidden")
            },
            _addTile: function(t, i) {
                var n = this._getTilePos(t),
                    o = this._tileCoordsToKey(t),
                    s = this.createTile(this._wrapCoords(t), e(this._tileReady, this, t));
                this._initTile(s), this.createTile.length < 2 && f(e(this._tileReady, this, t, null, s)), et(s, n), this._tiles[o] = {
                    el: s,
                    coords: t,
                    current: !0
                }, i.appendChild(s), this.fire("tileloadstart", {
                    tile: s,
                    coords: t
                })
            },
            _tileReady: function(t, i, n) {
                i && this.fire("tileerror", {
                    error: i,
                    tile: n,
                    coords: t
                });
                var o = this._tileCoordsToKey(t);
                (n = this._tiles[o]) && (n.loaded = +new Date, this._map._fadeAnimated ? (Q(n.el, 0), g(this._fadeFrame), this._fadeFrame = f(this._updateOpacity, this)) : (n.active = !0, this._pruneTiles()), i || (Y(n.el, "leaflet-tile-loaded"), this.fire("tileload", {
                    tile: n.el,
                    coords: t
                })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), pi || !this._map._fadeAnimated ? f(this._pruneTiles, this) : setTimeout(e(this._pruneTiles, this), 250)))
            },
            _getTilePos: function(t) {
                return t.scaleBy(this.getTileSize()).subtract(this._level.origin)
            },
            _wrapCoords: function(t) {
                var i = new y(this._wrapX ? s(t.x, this._wrapX) : t.x, this._wrapY ? s(t.y, this._wrapY) : t.y);
                return i.z = t.z, i
            },
            _pxBoundsToTileRange: function(t) {
                var i = this.getTileSize();
                return new w(t.min.unscaleBy(i).floor(), t.max.unscaleBy(i).ceil().subtract([1, 1]))
            },
            _noTilesToLoad: function() {
                for (var t in this._tiles)
                    if (!this._tiles[t].loaded) return !1;
                return !0
            }
        }),
        rn = sn.extend({
            options: {
                minZoom: 0,
                maxZoom: 18,
                subdomains: "abc",
                errorTileUrl: "",
                zoomOffset: 0,
                tms: !1,
                zoomReverse: !1,
                detectRetina: !1,
                crossOrigin: !1
            },
            initialize: function(t, i) {
                this._url = t, (i = l(this, i)).detectRetina && ji && i.maxZoom > 0 && (i.tileSize = Math.floor(i.tileSize / 2), i.zoomReverse ? (i.zoomOffset--, i.minZoom++) : (i.zoomOffset++, i.maxZoom--), i.minZoom = Math.max(0, i.minZoom)), "string" == typeof i.subdomains && (i.subdomains = i.subdomains.split("")), gi || this.on("tileunload", this._onTileRemove)
            },
            setUrl: function(t, i) {
                return this._url = t, i || this.redraw(), this
            },
            createTile: function(t, i) {
                var n = document.createElement("img");
                return lt(n, "load", e(this._tileOnLoad, this, i, n)), lt(n, "error", e(this._tileOnError, this, i, n)), (this.options.crossOrigin || "" === this.options.crossOrigin) && (n.crossOrigin = !0 === this.options.crossOrigin ? "" : this.options.crossOrigin), n.alt = "", n.setAttribute("role", "presentation"), n.src = this.getTileUrl(t), n
            },
            getTileUrl: function(t) {
                var e = {
                    r: ji ? "@2x" : "",
                    s: this._getSubdomain(t),
                    x: t.x,
                    y: t.y,
                    z: this._getZoomForUrl()
                };
                if (this._map && !this._map.options.crs.infinite) {
                    var n = this._globalTileRange.max.y - t.y;
                    this.options.tms && (e.y = n), e["-y"] = n
                }
                return _(this._url, i(e, this.options))
            },
            _tileOnLoad: function(t, i) {
                pi ? setTimeout(e(t, this, null, i), 0) : t(null, i)
            },
            _tileOnError: function(t, i, e) {
                var n = this.options.errorTileUrl;
                n && i.getAttribute("src") !== n && (i.src = n), t(e, i)
            },
            _onTileRemove: function(t) {
                t.tile.onload = null
            },
            _getZoomForUrl: function() {
                var t = this._tileZoom,
                    i = this.options.maxZoom;
                return this.options.zoomReverse && (t = i - t), t + this.options.zoomOffset
            },
            _getSubdomain: function(t) {
                var i = Math.abs(t.x + t.y) % this.options.subdomains.length;
                return this.options.subdomains[i]
            },
            _abortLoading: function() {
                var t, i;
                for (t in this._tiles) this._tiles[t].coords.z !== this._tileZoom && ((i = this._tiles[t].el).onload = r, i.onerror = r, i.complete || (i.src = Xt, q(i), delete this._tiles[t]))
            },
            _removeTile: function(t) {
                var i = this._tiles[t];
                if (i) return xi || i.el.setAttribute("src", Xt), sn.prototype._removeTile.call(this, t)
            },
            _tileReady: function(t, i, e) {
                if (this._map && (!e || e.getAttribute("src") !== Xt)) return sn.prototype._tileReady.call(this, t, i, e)
            }
        }),
        an = rn.extend({
            defaultWmsParams: {
                service: "WMS",
                request: "GetMap",
                layers: "",
                styles: "",
                format: "image/jpeg",
                transparent: !1,
                version: "1.1.1"
            },
            options: {
                crs: null,
                uppercase: !1
            },
            initialize: function(t, e) {
                this._url = t;
                var n = i({}, this.defaultWmsParams);
                for (var o in e) o in this.options || (n[o] = e[o]);
                var s = (e = l(this, e)).detectRetina && ji ? 2 : 1,
                    r = this.getTileSize();
                n.width = r.x * s, n.height = r.y * s, this.wmsParams = n
            },
            onAdd: function(t) {
                this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
                var i = this._wmsVersion >= 1.3 ? "crs" : "srs";
                this.wmsParams[i] = this._crs.code, rn.prototype.onAdd.call(this, t)
            },
            getTileUrl: function(t) {
                var i = this._tileCoordsToNwSe(t),
                    e = this._crs,
                    n = P(e.project(i[0]), e.project(i[1])),
                    o = n.min,
                    s = n.max,
                    r = (this._wmsVersion >= 1.3 && this._crs === Ie ? [o.y, o.x, s.y, s.x] : [o.x, o.y, s.x, s.y]).join(","),
                    a = rn.prototype.getTileUrl.call(this, t);
                return a + c(this.wmsParams, a, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + r
            },
            setParams: function(t, e) {
                return i(this.wmsParams, t), e || this.redraw(), this
            }
        });
    rn.WMS = an, Ht.wms = function(t, i) {
        return new an(t, i)
    };
    var hn = Re.extend({
            options: {
                padding: .1,
                tolerance: 0
            },
            initialize: function(t) {
                l(this, t), n(this), this._layers = this._layers || {}
            },
            onAdd: function() {
                this._container || (this._initContainer(), this._zoomAnimated && Y(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this)
            },
            onRemove: function() {
                this.off("update", this._updatePaths, this), this._destroyContainer()
            },
            getEvents: function() {
                var t = {
                    viewreset: this._reset,
                    zoom: this._onZoom,
                    moveend: this._update,
                    zoomend: this._onZoomEnd
                };
                return this._zoomAnimated && (t.zoomanim = this._onAnimZoom), t
            },
            _onAnimZoom: function(t) {
                this._updateTransform(t.center, t.zoom)
            },
            _onZoom: function() {
                this._updateTransform(this._map.getCenter(), this._map.getZoom())
            },
            _updateTransform: function(t, i) {
                var e = this._map.getZoomScale(i, this._zoom),
                    n = nt(this._container),
                    o = this._map.getSize().multiplyBy(.5 + this.options.padding),
                    s = this._map.project(this._center, i),
                    r = this._map.project(t, i).subtract(s),
                    a = o.multiplyBy(-e).add(n).add(o).subtract(r);
                Ei ? it(this._container, a, e) : et(this._container, a)
            },
            _reset: function() {
                for (var t in this._update(), this._updateTransform(this._center, this._zoom), this._layers) this._layers[t]._reset()
            },
            _onZoomEnd: function() {
                for (var t in this._layers) this._layers[t]._project()
            },
            _updatePaths: function() {
                for (var t in this._layers) this._layers[t]._update()
            },
            _update: function() {
                var t = this.options.padding,
                    i = this._map.getSize(),
                    e = this._map.containerPointToLayerPoint(i.multiplyBy(-t)).round();
                this._bounds = new w(e, e.add(i.multiplyBy(1 + 2 * t)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom()
            }
        }),
        un = hn.extend({
            getEvents: function() {
                var t = hn.prototype.getEvents.call(this);
                return t.viewprereset = this._onViewPreReset, t
            },
            _onViewPreReset: function() {
                this._postponeUpdatePaths = !0
            },
            onAdd: function() {
                hn.prototype.onAdd.call(this), this._draw()
            },
            _initContainer: function() {
                var t = this._container = document.createElement("canvas");
                lt(t, "mousemove", o(this._onMouseMove, 32, this), this), lt(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), lt(t, "mouseout", this._handleMouseOut, this), this._ctx = t.getContext("2d")
            },
            _destroyContainer: function() {
                g(this._redrawRequest), delete this._ctx, q(this._container), ct(this._container), delete this._container
            },
            _updatePaths: function() {
                if (!this._postponeUpdatePaths) {
                    for (var t in this._redrawBounds = null, this._layers) this._layers[t]._update();
                    this._redraw()
                }
            },
            _update: function() {
                if (!this._map._animatingZoom || !this._bounds) {
                    this._drawnLayers = {}, hn.prototype._update.call(this);
                    var t = this._bounds,
                        i = this._container,
                        e = t.getSize(),
                        n = ji ? 2 : 1;
                    et(i, t.min), i.width = n * e.x, i.height = n * e.y, i.style.width = e.x + "px", i.style.height = e.y + "px", ji && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update")
                }
            },
            _reset: function() {
                hn.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths())
            },
            _initPath: function(t) {
                this._updateDashArray(t), this._layers[n(t)] = t;
                var i = t._order = {
                    layer: t,
                    prev: this._drawLast,
                    next: null
                };
                this._drawLast && (this._drawLast.next = i), this._drawLast = i, this._drawFirst = this._drawFirst || this._drawLast
            },
            _addPath: function(t) {
                this._requestRedraw(t)
            },
            _removePath: function(t) {
                var i = t._order,
                    e = i.next,
                    o = i.prev;
                e ? e.prev = o : this._drawLast = o, o ? o.next = e : this._drawFirst = e, delete this._drawnLayers[t._leaflet_id], delete t._order, delete this._layers[n(t)], this._requestRedraw(t)
            },
            _updatePath: function(t) {
                this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t)
            },
            _updateStyle: function(t) {
                this._updateDashArray(t), this._requestRedraw(t)
            },
            _updateDashArray: function(t) {
                if ("string" == typeof t.options.dashArray) {
                    var i, e = t.options.dashArray.split(/[, ]+/),
                        n = [];
                    for (i = 0; i < e.length; i++) n.push(Number(e[i]));
                    t.options._dashArray = n
                } else t.options._dashArray = t.options.dashArray
            },
            _requestRedraw: function(t) {
                this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || f(this._redraw, this))
            },
            _extendRedrawBounds: function(t) {
                if (t._pxBounds) {
                    var i = (t.options.weight || 0) + 1;
                    this._redrawBounds = this._redrawBounds || new w, this._redrawBounds.extend(t._pxBounds.min.subtract([i, i])), this._redrawBounds.extend(t._pxBounds.max.add([i, i]))
                }
            },
            _redraw: function() {
                this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null
            },
            _clear: function() {
                var t = this._redrawBounds;
                if (t) {
                    var i = t.getSize();
                    this._ctx.clearRect(t.min.x, t.min.y, i.x, i.y)
                } else this._ctx.clearRect(0, 0, this._container.width, this._container.height)
            },
            _draw: function() {
                var t, i = this._redrawBounds;
                if (this._ctx.save(), i) {
                    var e = i.getSize();
                    this._ctx.beginPath(), this._ctx.rect(i.min.x, i.min.y, e.x, e.y), this._ctx.clip()
                }
                this._drawing = !0;
                for (var n = this._drawFirst; n; n = n.next) t = n.layer, (!i || t._pxBounds && t._pxBounds.intersects(i)) && t._updatePath();
                this._drawing = !1, this._ctx.restore()
            },
            _updatePoly: function(t, i) {
                if (this._drawing) {
                    var e, n, o, s, r = t._parts,
                        a = r.length,
                        h = this._ctx;
                    if (a) {
                        for (this._drawnLayers[t._leaflet_id] = t, h.beginPath(), e = 0; e < a; e++) {
                            for (n = 0, o = r[e].length; n < o; n++) s = r[e][n], h[n ? "lineTo" : "moveTo"](s.x, s.y);
                            i && h.closePath()
                        }
                        this._fillStroke(h, t)
                    }
                }
            },
            _updateCircle: function(t) {
                if (this._drawing && !t._empty()) {
                    var i = t._point,
                        e = this._ctx,
                        n = Math.max(Math.round(t._radius), 1),
                        o = (Math.max(Math.round(t._radiusY), 1) || n) / n;
                    this._drawnLayers[t._leaflet_id] = t, 1 !== o && (e.save(), e.scale(1, o)), e.beginPath(), e.arc(i.x, i.y / o, n, 0, 2 * Math.PI, !1), 1 !== o && e.restore(), this._fillStroke(e, t)
                }
            },
            _fillStroke: function(t, i) {
                var e = i.options;
                e.fill && (t.globalAlpha = e.fillOpacity, t.fillStyle = e.fillColor || e.color, t.fill(e.fillRule || "evenodd")), e.stroke && 0 !== e.weight && (t.setLineDash && t.setLineDash(i.options && i.options._dashArray || []), t.globalAlpha = e.opacity, t.lineWidth = e.weight, t.strokeStyle = e.color, t.lineCap = e.lineCap, t.lineJoin = e.lineJoin, t.stroke())
            },
            _onClick: function(t) {
                for (var i, e, n = this._map.mouseEventToLayerPoint(t), o = this._drawFirst; o; o = o.next)(i = o.layer).options.interactive && i._containsPoint(n) && !this._map._draggableMoved(i) && (e = i);
                e && (wt(t), this._fireEvent([e], t))
            },
            _onMouseMove: function(t) {
                if (this._map && !this._map.dragging.moving() && !this._map._animatingZoom) {
                    var i = this._map.mouseEventToLayerPoint(t);
                    this._handleMouseHover(t, i)
                }
            },
            _handleMouseOut: function(t) {
                var i = this._hoveredLayer;
                i && (X(this._container, "leaflet-interactive"), this._fireEvent([i], t, "mouseout"), this._hoveredLayer = null)
            },
            _handleMouseHover: function(t, i) {
                for (var e, n, o = this._drawFirst; o; o = o.next)(e = o.layer).options.interactive && e._containsPoint(i) && (n = e);
                n !== this._hoveredLayer && (this._handleMouseOut(t), n && (Y(this._container, "leaflet-interactive"), this._fireEvent([n], t, "mouseover"), this._hoveredLayer = n)), this._hoveredLayer && this._fireEvent([this._hoveredLayer], t)
            },
            _fireEvent: function(t, i, e) {
                this._map._fireDOMEvent(i, e || i.type, t)
            },
            _bringToFront: function(t) {
                var i = t._order,
                    e = i.next,
                    n = i.prev;
                e && (e.prev = n, n ? n.next = e : e && (this._drawFirst = e), i.prev = this._drawLast, this._drawLast.next = i, i.next = null, this._drawLast = i, this._requestRedraw(t))
            },
            _bringToBack: function(t) {
                var i = t._order,
                    e = i.next,
                    n = i.prev;
                n && (n.next = e, e ? e.prev = n : n && (this._drawLast = n), i.prev = null, i.next = this._drawFirst, this._drawFirst.prev = i, this._drawFirst = i, this._requestRedraw(t))
            }
        }),
        ln = function() {
            try {
                return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
                    function(t) {
                        return document.createElement("<lvml:" + t + ' class="lvml">')
                    }
            } catch (t) {
                return function(t) {
                    return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
                }
            }
        }(),
        cn = {
            _initContainer: function() {
                this._container = F("div", "leaflet-vml-container")
            },
            _update: function() {
                this._map._animatingZoom || (hn.prototype._update.call(this), this.fire("update"))
            },
            _initPath: function(t) {
                var i = t._container = ln("shape");
                Y(i, "leaflet-vml-shape " + (this.options.className || "")), i.coordsize = "1 1", t._path = ln("path"), i.appendChild(t._path), this._updateStyle(t), this._layers[n(t)] = t
            },
            _addPath: function(t) {
                var i = t._container;
                this._container.appendChild(i), t.options.interactive && t.addInteractiveTarget(i)
            },
            _removePath: function(t) {
                var i = t._container;
                q(i), t.removeInteractiveTarget(i), delete this._layers[n(t)]
            },
            _updateStyle: function(t) {
                var i = t._stroke,
                    e = t._fill,
                    n = t.options,
                    o = t._container;
                o.stroked = !!n.stroke, o.filled = !!n.fill, n.stroke ? (i || (i = t._stroke = ln("stroke")), o.appendChild(i), i.weight = n.weight + "px", i.color = n.color, i.opacity = n.opacity, n.dashArray ? i.dashStyle = Yt(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : i.dashStyle = "", i.endcap = n.lineCap.replace("butt", "flat"), i.joinstyle = n.lineJoin) : i && (o.removeChild(i), t._stroke = null), n.fill ? (e || (e = t._fill = ln("fill")), o.appendChild(e), e.color = n.fillColor || n.color, e.opacity = n.fillOpacity) : e && (o.removeChild(e), t._fill = null)
            },
            _updateCircle: function(t) {
                var i = t._point.round(),
                    e = Math.round(t._radius),
                    n = Math.round(t._radiusY || e);
                this._setPath(t, t._empty() ? "M0 0" : "AL " + i.x + "," + i.y + " " + e + "," + n + " 0,23592600")
            },
            _setPath: function(t, i) {
                t._path.v = i
            },
            _bringToFront: function(t) {
                V(t._container)
            },
            _bringToBack: function(t) {
                G(t._container)
            }
        },
        _n = Fi ? ln : Z,
        dn = hn.extend({
            getEvents: function() {
                var t = hn.prototype.getEvents.call(this);
                return t.zoomstart = this._onZoomStart, t
            },
            _initContainer: function() {
                this._container = _n("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = _n("g"), this._container.appendChild(this._rootGroup)
            },
            _destroyContainer: function() {
                q(this._container), ct(this._container), delete this._container, delete this._rootGroup, delete this._svgSize
            },
            _onZoomStart: function() {
                this._update()
            },
            _update: function() {
                if (!this._map._animatingZoom || !this._bounds) {
                    hn.prototype._update.call(this);
                    var t = this._bounds,
                        i = t.getSize(),
                        e = this._container;
                    this._svgSize && this._svgSize.equals(i) || (this._svgSize = i, e.setAttribute("width", i.x), e.setAttribute("height", i.y)), et(e, t.min), e.setAttribute("viewBox", [t.min.x, t.min.y, i.x, i.y].join(" ")), this.fire("update")
                }
            },
            _initPath: function(t) {
                var i = t._path = _n("path");
                t.options.className && Y(i, t.options.className), t.options.interactive && Y(i, "leaflet-interactive"), this._updateStyle(t), this._layers[n(t)] = t
            },
            _addPath: function(t) {
                this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path)
            },
            _removePath: function(t) {
                q(t._path), t.removeInteractiveTarget(t._path), delete this._layers[n(t)]
            },
            _updatePath: function(t) {
                t._project(), t._update()
            },
            _updateStyle: function(t) {
                var i = t._path,
                    e = t.options;
                i && (e.stroke ? (i.setAttribute("stroke", e.color), i.setAttribute("stroke-opacity", e.opacity), i.setAttribute("stroke-width", e.weight), i.setAttribute("stroke-linecap", e.lineCap), i.setAttribute("stroke-linejoin", e.lineJoin), e.dashArray ? i.setAttribute("stroke-dasharray", e.dashArray) : i.removeAttribute("stroke-dasharray"), e.dashOffset ? i.setAttribute("stroke-dashoffset", e.dashOffset) : i.removeAttribute("stroke-dashoffset")) : i.setAttribute("stroke", "none"), e.fill ? (i.setAttribute("fill", e.fillColor || e.color), i.setAttribute("fill-opacity", e.fillOpacity), i.setAttribute("fill-rule", e.fillRule || "evenodd")) : i.setAttribute("fill", "none"))
            },
            _updatePoly: function(t, i) {
                this._setPath(t, E(t._parts, i))
            },
            _updateCircle: function(t) {
                var i = t._point,
                    e = Math.max(Math.round(t._radius), 1),
                    n = "a" + e + "," + (Math.max(Math.round(t._radiusY), 1) || e) + " 0 1,0 ",
                    o = t._empty() ? "M0 0" : "M" + (i.x - e) + "," + i.y + n + 2 * e + ",0 " + n + 2 * -e + ",0 ";
                this._setPath(t, o)
            },
            _setPath: function(t, i) {
                t._path.setAttribute("d", i)
            },
            _bringToFront: function(t) {
                V(t._path)
            },
            _bringToBack: function(t) {
                G(t._path)
            }
        });
    Fi && dn.include(cn), me.include({
        getRenderer: function(t) {
            var i = t.options.renderer || this._getPaneRenderer(t.options.pane) || this.options.renderer || this._renderer;
            return i || (i = this._renderer = this._createRenderer()), this.hasLayer(i) || this.addLayer(i), i
        },
        _getPaneRenderer: function(t) {
            if ("overlayPane" === t || void 0 === t) return !1;
            var i = this._paneRenderers[t];
            return void 0 === i && (i = this._createRenderer({
                pane: t
            }), this._paneRenderers[t] = i), i
        },
        _createRenderer: function(t) {
            return this.options.preferCanvas && Ft(t) || qt(t)
        }
    });
    var pn = Ke.extend({
        initialize: function(t, i) {
            Ke.prototype.initialize.call(this, this._boundsToLatLngs(t), i)
        },
        setBounds: function(t) {
            return this.setLatLngs(this._boundsToLatLngs(t))
        },
        _boundsToLatLngs: function(t) {
            return [(t = T(t)).getSouthWest(), t.getNorthWest(), t.getNorthEast(), t.getSouthEast()]
        }
    });
    dn.create = _n, dn.pointsToPath = E, Ye.geometryToLayer = Bt, Ye.coordsToLatLng = It, Ye.coordsToLatLngs = Ot, Ye.latLngToCoords = Rt, Ye.latLngsToCoords = Dt, Ye.getFeature = Nt, Ye.asFeature = jt, me.mergeOptions({
        boxZoom: !0
    });
    var mn = Le.extend({
        initialize: function(t) {
            this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this)
        },
        addHooks: function() {
            lt(this._container, "mousedown", this._onMouseDown, this)
        },
        removeHooks: function() {
            ct(this._container, "mousedown", this._onMouseDown, this)
        },
        moved: function() {
            return this._moved
        },
        _destroy: function() {
            q(this._pane), delete this._pane
        },
        _resetState: function() {
            this._resetStateTimeout = 0, this._moved = !1
        },
        _clearDeferredResetState: function() {
            0 !== this._resetStateTimeout && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0)
        },
        _onMouseDown: function(t) {
            if (!t.shiftKey || 1 !== t.which && 1 !== t.button) return !1;
            this._clearDeferredResetState(), this._resetState(), ai(), ot(), this._startPoint = this._map.mouseEventToContainerPoint(t), lt(document, {
                contextmenu: vt,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            }, this)
        },
        _onMouseMove: function(t) {
            this._moved || (this._moved = !0, this._box = F("div", "leaflet-zoom-box", this._container), Y(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
            var i = new w(this._point, this._startPoint),
                e = i.getSize();
            et(this._box, i.min), this._box.style.width = e.x + "px", this._box.style.height = e.y + "px"
        },
        _finish: function() {
            this._moved && (q(this._box), X(this._container, "leaflet-crosshair")), hi(), st(), ct(document, {
                contextmenu: vt,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            }, this)
        },
        _onMouseUp: function(t) {
            if ((1 === t.which || 1 === t.button) && (this._finish(), this._moved)) {
                this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(e(this._resetState, this), 0);
                var i = new b(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
                this._map.fitBounds(i).fire("boxzoomend", {
                    boxZoomBounds: i
                })
            }
        },
        _onKeyDown: function(t) {
            27 === t.keyCode && this._finish()
        }
    });
    me.addInitHook("addHandler", "boxZoom", mn), me.mergeOptions({
        doubleClickZoom: !0
    });
    var fn = Le.extend({
        addHooks: function() {
            this._map.on("dblclick", this._onDoubleClick, this)
        },
        removeHooks: function() {
            this._map.off("dblclick", this._onDoubleClick, this)
        },
        _onDoubleClick: function(t) {
            var i = this._map,
                e = i.getZoom(),
                n = i.options.zoomDelta,
                o = t.originalEvent.shiftKey ? e - n : e + n;
            "center" === i.options.doubleClickZoom ? i.setZoom(o) : i.setZoomAround(t.containerPoint, o)
        }
    });
    me.addInitHook("addHandler", "doubleClickZoom", fn), me.mergeOptions({
        dragging: !0,
        inertia: !vi,
        inertiaDeceleration: 3400,
        inertiaMaxSpeed: 1 / 0,
        easeLinearity: .2,
        worldCopyJump: !1,
        maxBoundsViscosity: 0
    });
    var gn = Le.extend({
        addHooks: function() {
            if (!this._draggable) {
                var t = this._map;
                this._draggable = new Ce(t._mapPane, t._container), this._draggable.on({
                    dragstart: this._onDragStart,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this))
            }
            Y(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = []
        },
        removeHooks: function() {
            X(this._map._container, "leaflet-grab"), X(this._map._container, "leaflet-touch-drag"), this._draggable.disable()
        },
        moved: function() {
            return this._draggable && this._draggable._moved
        },
        moving: function() {
            return this._draggable && this._draggable._moving
        },
        _onDragStart: function() {
            var t = this._map;
            if (t._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
                var i = T(this._map.options.maxBounds);
                this._offsetLimit = P(this._map.latLngToContainerPoint(i.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(i.getSouthEast()).multiplyBy(-1).add(this._map.getSize())), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity))
            } else this._offsetLimit = null;
            t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = [])
        },
        _onDrag: function(t) {
            if (this._map.options.inertia) {
                var i = this._lastTime = +new Date,
                    e = this._lastPos = this._draggable._absPos || this._draggable._newPos;
                this._positions.push(e), this._times.push(i), this._prunePositions(i)
            }
            this._map.fire("move", t).fire("drag", t)
        },
        _prunePositions: function(t) {
            for (; this._positions.length > 1 && t - this._times[0] > 50;) this._positions.shift(), this._times.shift()
        },
        _onZoomEnd: function() {
            var t = this._map.getSize().divideBy(2),
                i = this._map.latLngToLayerPoint([0, 0]);
            this._initialWorldOffset = i.subtract(t).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x
        },
        _viscousLimit: function(t, i) {
            return t - (t - i) * this._viscosity
        },
        _onPreDragLimit: function() {
            if (this._viscosity && this._offsetLimit) {
                var t = this._draggable._newPos.subtract(this._draggable._startPos),
                    i = this._offsetLimit;
                t.x < i.min.x && (t.x = this._viscousLimit(t.x, i.min.x)), t.y < i.min.y && (t.y = this._viscousLimit(t.y, i.min.y)), t.x > i.max.x && (t.x = this._viscousLimit(t.x, i.max.x)), t.y > i.max.y && (t.y = this._viscousLimit(t.y, i.max.y)), this._draggable._newPos = this._draggable._startPos.add(t)
            }
        },
        _onPreDragWrap: function() {
            var t = this._worldWidth,
                i = Math.round(t / 2),
                e = this._initialWorldOffset,
                n = this._draggable._newPos.x,
                o = (n - i + e) % t + i - e,
                s = (n + i + e) % t - i - e,
                r = Math.abs(o + e) < Math.abs(s + e) ? o : s;
            this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = r
        },
        _onDragEnd: function(t) {
            var i = this._map,
                e = i.options,
                n = !e.inertia || this._times.length < 2;
            if (i.fire("dragend", t), n) i.fire("moveend");
            else {
                this._prunePositions(+new Date);
                var o = this._lastPos.subtract(this._positions[0]),
                    s = (this._lastTime - this._times[0]) / 1e3,
                    r = e.easeLinearity,
                    a = o.multiplyBy(r / s),
                    h = a.distanceTo([0, 0]),
                    u = Math.min(e.inertiaMaxSpeed, h),
                    l = a.multiplyBy(u / h),
                    c = u / (e.inertiaDeceleration * r),
                    _ = l.multiplyBy(-c / 2).round();
                _.x || _.y ? (_ = i._limitOffset(_, i.options.maxBounds), f(function() {
                    i.panBy(_, {
                        duration: c,
                        easeLinearity: r,
                        noMoveStart: !0,
                        animate: !0
                    })
                })) : i.fire("moveend")
            }
        }
    });
    me.addInitHook("addHandler", "dragging", gn), me.mergeOptions({
        keyboard: !0,
        keyboardPanDelta: 80
    });
    var vn = Le.extend({
        keyCodes: {
            left: [37],
            right: [39],
            down: [40],
            up: [38],
            zoomIn: [187, 107, 61, 171],
            zoomOut: [189, 109, 54, 173]
        },
        initialize: function(t) {
            this._map = t, this._setPanDelta(t.options.keyboardPanDelta), this._setZoomDelta(t.options.zoomDelta)
        },
        addHooks: function() {
            var t = this._map._container;
            t.tabIndex <= 0 && (t.tabIndex = "0"), lt(t, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            }, this), this._map.on({
                focus: this._addHooks,
                blur: this._removeHooks
            }, this)
        },
        removeHooks: function() {
            this._removeHooks(), ct(this._map._container, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            }, this), this._map.off({
                focus: this._addHooks,
                blur: this._removeHooks
            }, this)
        },
        _onMouseDown: function() {
            if (!this._focused) {
                var t = document.body,
                    i = document.documentElement,
                    e = t.scrollTop || i.scrollTop,
                    n = t.scrollLeft || i.scrollLeft;
                this._map._container.focus(), window.scrollTo(n, e)
            }
        },
        _onFocus: function() {
            this._focused = !0, this._map.fire("focus")
        },
        _onBlur: function() {
            this._focused = !1, this._map.fire("blur")
        },
        _setPanDelta: function(t) {
            var i, e, n = this._panKeys = {},
                o = this.keyCodes;
            for (i = 0, e = o.left.length; i < e; i++) n[o.left[i]] = [-1 * t, 0];
            for (i = 0, e = o.right.length; i < e; i++) n[o.right[i]] = [t, 0];
            for (i = 0, e = o.down.length; i < e; i++) n[o.down[i]] = [0, t];
            for (i = 0, e = o.up.length; i < e; i++) n[o.up[i]] = [0, -1 * t]
        },
        _setZoomDelta: function(t) {
            var i, e, n = this._zoomKeys = {},
                o = this.keyCodes;
            for (i = 0, e = o.zoomIn.length; i < e; i++) n[o.zoomIn[i]] = t;
            for (i = 0, e = o.zoomOut.length; i < e; i++) n[o.zoomOut[i]] = -t
        },
        _addHooks: function() {
            lt(document, "keydown", this._onKeyDown, this)
        },
        _removeHooks: function() {
            ct(document, "keydown", this._onKeyDown, this)
        },
        _onKeyDown: function(t) {
            if (!(t.altKey || t.ctrlKey || t.metaKey)) {
                var i, e = t.keyCode,
                    n = this._map;
                if (e in this._panKeys) n._panAnim && n._panAnim._inProgress || (i = this._panKeys[e], t.shiftKey && (i = x(i).multiplyBy(3)), n.panBy(i), n.options.maxBounds && n.panInsideBounds(n.options.maxBounds));
                else if (e in this._zoomKeys) n.setZoom(n.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[e]);
                else {
                    if (27 !== e || !n._popup || !n._popup.options.closeOnEscapeKey) return;
                    n.closePopup()
                }
                vt(t)
            }
        }
    });
    me.addInitHook("addHandler", "keyboard", vn), me.mergeOptions({
        scrollWheelZoom: !0,
        wheelDebounceTime: 40,
        wheelPxPerZoomLevel: 60
    });
    var yn = Le.extend({
        addHooks: function() {
            lt(this._map._container, "mousewheel", this._onWheelScroll, this), this._delta = 0
        },
        removeHooks: function() {
            ct(this._map._container, "mousewheel", this._onWheelScroll, this)
        },
        _onWheelScroll: function(t) {
            var i = xt(t),
                n = this._map.options.wheelDebounceTime;
            this._delta += i, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +new Date);
            var o = Math.max(n - (+new Date - this._startTime), 0);
            clearTimeout(this._timer), this._timer = setTimeout(e(this._performZoom, this), o), vt(t)
        },
        _performZoom: function() {
            var t = this._map,
                i = t.getZoom(),
                e = this._map.options.zoomSnap || 0;
            t._stop();
            var n = this._delta / (4 * this._map.options.wheelPxPerZoomLevel),
                o = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(n)))) / Math.LN2,
                s = e ? Math.ceil(o / e) * e : o,
                r = t._limitZoom(i + (this._delta > 0 ? s : -s)) - i;
            this._delta = 0, this._startTime = null, r && ("center" === t.options.scrollWheelZoom ? t.setZoom(i + r) : t.setZoomAround(this._lastMousePos, i + r))
        }
    });
    me.addInitHook("addHandler", "scrollWheelZoom", yn), me.mergeOptions({
        tap: !0,
        tapTolerance: 15
    });
    var xn = Le.extend({
        addHooks: function() {
            lt(this._map._container, "touchstart", this._onDown, this)
        },
        removeHooks: function() {
            ct(this._map._container, "touchstart", this._onDown, this)
        },
        _onDown: function(t) {
            if (t.touches) {
                if (gt(t), this._fireClick = !0, t.touches.length > 1) return this._fireClick = !1, void clearTimeout(this._holdTimeout);
                var i = t.touches[0],
                    n = i.target;
                this._startPos = this._newPos = new y(i.clientX, i.clientY), n.tagName && "a" === n.tagName.toLowerCase() && Y(n, "leaflet-active"), this._holdTimeout = setTimeout(e(function() {
                    this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", i))
                }, this), 1e3), this._simulateEvent("mousedown", i), lt(document, {
                    touchmove: this._onMove,
                    touchend: this._onUp
                }, this)
            }
        },
        _onUp: function(t) {
            if (clearTimeout(this._holdTimeout), ct(document, {
                    touchmove: this._onMove,
                    touchend: this._onUp
                }, this), this._fireClick && t && t.changedTouches) {
                var i = t.changedTouches[0],
                    e = i.target;
                e && e.tagName && "a" === e.tagName.toLowerCase() && X(e, "leaflet-active"), this._simulateEvent("mouseup", i), this._isTapValid() && this._simulateEvent("click", i)
            }
        },
        _isTapValid: function() {
            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
        },
        _onMove: function(t) {
            var i = t.touches[0];
            this._newPos = new y(i.clientX, i.clientY), this._simulateEvent("mousemove", i)
        },
        _simulateEvent: function(t, i) {
            var e = document.createEvent("MouseEvents");
            e._simulated = !0, i.target._simulatedClick = !0, e.initMouseEvent(t, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), i.target.dispatchEvent(e)
        }
    });
    Ri && !Oi && me.addInitHook("addHandler", "tap", xn), me.mergeOptions({
        touchZoom: Ri && !vi,
        bounceAtZoomLimits: !0
    });
    var wn = Le.extend({
        addHooks: function() {
            Y(this._map._container, "leaflet-touch-zoom"), lt(this._map._container, "touchstart", this._onTouchStart, this)
        },
        removeHooks: function() {
            X(this._map._container, "leaflet-touch-zoom"), ct(this._map._container, "touchstart", this._onTouchStart, this)
        },
        _onTouchStart: function(t) {
            var i = this._map;
            if (t.touches && 2 === t.touches.length && !i._animatingZoom && !this._zooming) {
                var e = i.mouseEventToContainerPoint(t.touches[0]),
                    n = i.mouseEventToContainerPoint(t.touches[1]);
                this._centerPoint = i.getSize()._divideBy(2), this._startLatLng = i.containerPointToLatLng(this._centerPoint), "center" !== i.options.touchZoom && (this._pinchStartLatLng = i.containerPointToLatLng(e.add(n)._divideBy(2))), this._startDist = e.distanceTo(n), this._startZoom = i.getZoom(), this._moved = !1, this._zooming = !0, i._stop(), lt(document, "touchmove", this._onTouchMove, this), lt(document, "touchend", this._onTouchEnd, this), gt(t)
            }
        },
        _onTouchMove: function(t) {
            if (t.touches && 2 === t.touches.length && this._zooming) {
                var i = this._map,
                    n = i.mouseEventToContainerPoint(t.touches[0]),
                    o = i.mouseEventToContainerPoint(t.touches[1]),
                    s = n.distanceTo(o) / this._startDist;
                if (this._zoom = i.getScaleZoom(s, this._startZoom), !i.options.bounceAtZoomLimits && (this._zoom < i.getMinZoom() && s < 1 || this._zoom > i.getMaxZoom() && s > 1) && (this._zoom = i._limitZoom(this._zoom)), "center" === i.options.touchZoom) {
                    if (this._center = this._startLatLng, 1 === s) return
                } else {
                    var r = n._add(o)._divideBy(2)._subtract(this._centerPoint);
                    if (1 === s && 0 === r.x && 0 === r.y) return;
                    this._center = i.unproject(i.project(this._pinchStartLatLng, this._zoom).subtract(r), this._zoom)
                }
                this._moved || (i._moveStart(!0, !1), this._moved = !0), g(this._animRequest);
                var a = e(i._move, i, this._center, this._zoom, {
                    pinch: !0,
                    round: !1
                });
                this._animRequest = f(a, this, !0), gt(t)
            }
        },
        _onTouchEnd: function() {
            this._moved && this._zooming ? (this._zooming = !1, g(this._animRequest), ct(document, "touchmove", this._onTouchMove), ct(document, "touchend", this._onTouchEnd), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom))) : this._zooming = !1
        }
    });
    me.addInitHook("addHandler", "touchZoom", wn), me.BoxZoom = mn, me.DoubleClickZoom = fn, me.Drag = gn, me.Keyboard = vn, me.ScrollWheelZoom = yn, me.Tap = xn, me.TouchZoom = wn, Object.freeze = Ut, t.version = "1.3.4+HEAD.0e566b2", t.Control = fe, t.control = ge, t.Browser = qi, t.Evented = ei, t.Mixin = be, t.Util = ti, t.Class = v, t.Handler = Le, t.extend = i, t.bind = e, t.stamp = n, t.setOptions = l, t.DomEvent = de, t.DomUtil = ue, t.PosAnimation = pe, t.Draggable = Ce, t.LineUtil = Se, t.PolyUtil = Ze, t.Point = y, t.point = x, t.Bounds = w, t.bounds = P, t.Transformation = C, t.transformation = S, t.Projection = Ae, t.LatLng = z, t.latLng = M, t.LatLngBounds = b, t.latLngBounds = T, t.CRS = oi, t.GeoJSON = Ye, t.geoJSON = Wt, t.geoJson = Je, t.Layer = Re, t.LayerGroup = De, t.layerGroup = function(t, i) {
        return new De(t, i)
    }, t.FeatureGroup = Ne, t.featureGroup = function(t) {
        return new Ne(t)
    }, t.ImageOverlay = $e, t.imageOverlay = function(t, i, e) {
        return new $e(t, i, e)
    }, t.VideoOverlay = Qe, t.videoOverlay = function(t, i, e) {
        return new Qe(t, i, e)
    }, t.DivOverlay = tn, t.Popup = en, t.popup = function(t, i) {
        return new en(t, i)
    }, t.Tooltip = nn, t.tooltip = function(t, i) {
        return new nn(t, i)
    }, t.Icon = je, t.icon = function(t) {
        return new je(t)
    }, t.DivIcon = on, t.divIcon = function(t) {
        return new on(t)
    }, t.Marker = Fe, t.marker = function(t, i) {
        return new Fe(t, i)
    }, t.TileLayer = rn, t.tileLayer = Ht, t.GridLayer = sn, t.gridLayer = function(t) {
        return new sn(t)
    }, t.SVG = dn, t.svg = qt, t.Renderer = hn, t.Canvas = un, t.canvas = Ft, t.Path = qe, t.CircleMarker = Ue, t.circleMarker = function(t, i) {
        return new Ue(t, i)
    }, t.Circle = Ve, t.circle = function(t, i, e) {
        return new Ve(t, i, e)
    }, t.Polyline = Ge, t.polyline = function(t, i) {
        return new Ge(t, i)
    }, t.Polygon = Ke, t.polygon = function(t, i) {
        return new Ke(t, i)
    }, t.Rectangle = pn, t.rectangle = function(t, i) {
        return new pn(t, i)
    }, t.Map = me, t.map = function(t, i) {
        return new me(t, i)
    };
    var Ln = window.L;
    t.noConflict = function() {
        return window.L = Ln, this
    }, window.L = t
}), L.TileLayer.Grayscale = L.TileLayer.extend({
    options: {
        quotaRed: 21,
        quotaGreen: 71,
        quotaBlue: 8,
        quotaDividerTune: 0,
        quotaDivider: function() {
            return this.quotaRed + this.quotaGreen + this.quotaBlue + this.quotaDividerTune
        }
    },
    initialize: function(t, i) {
        (i = i || {}).crossOrigin = !0, L.TileLayer.prototype.initialize.call(this, t, i), this.on("tileload", function(t) {
            this._makeGrayscale(t.tile)
        })
    },
    _createTile: function() {
        var t = L.TileLayer.prototype._createTile.call(this);
        return t.crossOrigin = "Anonymous", t
    },
    _makeGrayscale: function(t) {
        if (!t.getAttribute("data-grayscaled")) {
            t.crossOrigin = "";
            var i = document.createElement("canvas");
            i.width = t.width, i.height = t.height;
            var e = i.getContext("2d");
            e.drawImage(t, 0, 0);
            for (var n = e.getImageData(0, 0, i.width, i.height), o = n.data, s = 0, r = o.length; s < r; s += 4) o[s] = o[s + 1] = o[s + 2] = (this.options.quotaRed * o[s] + this.options.quotaGreen * o[s + 1] + this.options.quotaBlue * o[s + 2]) / this.options.quotaDivider();
            e.putImageData(n, 0, 0), t.setAttribute("data-grayscaled", !0), t.src = i.toDataURL()
        }
    }
}), L.tileLayer.grayscale = function(t, i) {
    return new L.TileLayer.Grayscale(t, i)
};

















/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssanimations-csscolumns-customelements-flexbox-history-picture-pointerevents-postmessage-sizes-srcset-webgl-websockets-webworkers-addtest-domprefixes-hasevent-mq-prefixedcssvalue-prefixes-setclasses-testallprops-testprop-teststyles !*/
! function(e, t, n) {
    function r(e, t) {
        return typeof e === t
    }

    function o() {
        var e, t, n, o, i, s, a;
        for (var l in C)
            if (C.hasOwnProperty(l)) {
                if (e = [], t = C[l], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
                    for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
                for (o = r(t.fn, "function") ? t.fn() : t.fn, i = 0; i < e.length; i++) s = e[i], a = s.split("."), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), w.push((o ? "" : "no-") + a.join("-"))
            }
    }

    function i(e) {
        var t = S.className,
            n = Modernizr._config.classPrefix || "";
        if (x && (t = t.baseVal), Modernizr._config.enableJSClass) {
            var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
            t = t.replace(r, "$1" + n + "js$2")
        }
        Modernizr._config.enableClasses && (t += " " + n + e.join(" " + n), x ? S.className.baseVal = t : S.className = t)
    }

    function s(e, t) {
        if ("object" == typeof e)
            for (var n in e) P(e, n) && s(n, e[n]);
        else {
            e = e.toLowerCase();
            var r = e.split("."),
                o = Modernizr[r[0]];
            if (2 == r.length && (o = o[r[1]]), "undefined" != typeof o) return Modernizr;
            t = "function" == typeof t ? t() : t, 1 == r.length ? Modernizr[r[0]] = t : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = t), i([(t && 0 != t ? "" : "no-") + r.join("-")]), Modernizr._trigger(e, t)
        }
        return Modernizr
    }

    function a() {
        return "function" != typeof t.createElement ? t.createElement(arguments[0]) : x ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments)
    }

    function l() {
        var e = t.body;
        return e || (e = a(x ? "svg" : "body"), e.fake = !0), e
    }

    function u(e, n, r, o) {
        var i, s, u, f, d = "modernizr",
            c = a("div"),
            p = l();
        if (parseInt(r, 10))
            for (; r--;) u = a("div"), u.id = o ? o[r] : d + (r + 1), c.appendChild(u);
        return i = a("style"), i.type = "text/css", i.id = "s" + d, (p.fake ? p : c).appendChild(i), p.appendChild(c), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(t.createTextNode(e)), c.id = d, p.fake && (p.style.background = "", p.style.overflow = "hidden", f = S.style.overflow, S.style.overflow = "hidden", S.appendChild(p)), s = n(c, e), p.fake ? (p.parentNode.removeChild(p), S.style.overflow = f, S.offsetHeight) : c.parentNode.removeChild(c), !!s
    }

    function f(e, t) {
        return !!~("" + e).indexOf(t)
    }

    function d(e) {
        return e.replace(/([A-Z])/g, function(e, t) {
            return "-" + t.toLowerCase()
        }).replace(/^ms-/, "-ms-")
    }

    function c(t, n, r) {
        var o;
        if ("getComputedStyle" in e) {
            o = getComputedStyle.call(e, t, n);
            var i = e.console;
            if (null !== o) r && (o = o.getPropertyValue(r));
            else if (i) {
                var s = i.error ? "error" : "log";
                i[s].call(i, "getComputedStyle returning null, its possible modernizr test results are inaccurate")
            }
        } else o = !n && t.currentStyle && t.currentStyle[r];
        return o
    }

    function p(t, r) {
        var o = t.length;
        if ("CSS" in e && "supports" in e.CSS) {
            for (; o--;)
                if (e.CSS.supports(d(t[o]), r)) return !0;
            return !1
        }
        if ("CSSSupportsRule" in e) {
            for (var i = []; o--;) i.push("(" + d(t[o]) + ":" + r + ")");
            return i = i.join(" or "), u("@supports (" + i + ") { #modernizr { position: absolute; } }", function(e) {
                return "absolute" == c(e, null, "position")
            })
        }
        return n
    }

    function m(e) {
        return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
            return t + n.toUpperCase()
        }).replace(/^-/, "")
    }

    function h(e, t, o, i) {
        function s() {
            u && (delete N.style, delete N.modElem)
        }
        if (i = r(i, "undefined") ? !1 : i, !r(o, "undefined")) {
            var l = p(e, o);
            if (!r(l, "undefined")) return l
        }
        for (var u, d, c, h, v, A = ["modernizr", "tspan", "samp"]; !N.style && A.length;) u = !0, N.modElem = a(A.shift()), N.style = N.modElem.style;
        for (c = e.length, d = 0; c > d; d++)
            if (h = e[d], v = N.style[h], f(h, "-") && (h = m(h)), N.style[h] !== n) {
                if (i || r(o, "undefined")) return s(), "pfx" == t ? h : !0;
                try {
                    N.style[h] = o
                } catch (g) {}
                if (N.style[h] != v) return s(), "pfx" == t ? h : !0
            } return s(), !1
    }

    function v(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    }

    function A(e, t, n) {
        var o;
        for (var i in e)
            if (e[i] in t) return n === !1 ? e[i] : (o = t[e[i]], r(o, "function") ? v(o, n || t) : o);
        return !1
    }

    function g(e, t, n, o, i) {
        var s = e.charAt(0).toUpperCase() + e.slice(1),
            a = (e + " " + O.join(s + " ") + s).split(" ");
        return r(t, "string") || r(t, "undefined") ? h(a, t, o, i) : (a = (e + " " + T.join(s + " ") + s).split(" "), A(a, t, n))
    }

    function y(e, t, r) {
        return g(e, n, n, t, r)
    }
    var C = [],
        b = {
            _version: "3.6.0",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(e, t) {
                var n = this;
                setTimeout(function() {
                    t(n[e])
                }, 0)
            },
            addTest: function(e, t, n) {
                C.push({
                    name: e,
                    fn: t,
                    options: n
                })
            },
            addAsyncTest: function(e) {
                C.push({
                    name: null,
                    fn: e
                })
            }
        },
        Modernizr = function() {};
    Modernizr.prototype = b, Modernizr = new Modernizr;
    var w = [],
        S = t.documentElement,
        x = "svg" === S.nodeName.toLowerCase(),
        _ = "Moz O ms Webkit",
        T = b._config.usePrefixes ? _.toLowerCase().split(" ") : [];
    b._domPrefixes = T;
    var E = b._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
    b._prefixes = E;
    var P;
    ! function() {
        var e = {}.hasOwnProperty;
        P = r(e, "undefined") || r(e.call, "undefined") ? function(e, t) {
            return t in e && r(e.constructor.prototype[t], "undefined")
        } : function(t, n) {
            return e.call(t, n)
        }
    }(), b._l = {}, b.on = function(e, t) {
        this._l[e] || (this._l[e] = []), this._l[e].push(t), Modernizr.hasOwnProperty(e) && setTimeout(function() {
            Modernizr._trigger(e, Modernizr[e])
        }, 0)
    }, b._trigger = function(e, t) {
        if (this._l[e]) {
            var n = this._l[e];
            setTimeout(function() {
                var e, r;
                for (e = 0; e < n.length; e++)(r = n[e])(t)
            }, 0), delete this._l[e]
        }
    }, Modernizr._q.push(function() {
        b.addTest = s
    });
    var k = function() {
        function e(e, t) {
            var o;
            return e ? (t && "string" != typeof t || (t = a(t || "div")), e = "on" + e, o = e in t, !o && r && (t.setAttribute || (t = a("div")), t.setAttribute(e, ""), o = "function" == typeof t[e], t[e] !== n && (t[e] = n), t.removeAttribute(e)), o) : !1
        }
        var r = !("onblur" in t.documentElement);
        return e
    }();
    b.hasEvent = k;
    var z = function() {
        var t = e.matchMedia || e.msMatchMedia;
        return t ? function(e) {
            var n = t(e);
            return n && n.matches || !1
        } : function(t) {
            var n = !1;
            return u("@media " + t + " { #modernizr { position: absolute; } }", function(t) {
                n = "absolute" == (e.getComputedStyle ? e.getComputedStyle(t, null) : t.currentStyle).position
            }), n
        }
    }();
    b.mq = z;
    var B = function(e, t) {
        var n = !1,
            r = a("div"),
            o = r.style;
        if (e in o) {
            var i = T.length;
            for (o[e] = t, n = o[e]; i-- && !n;) o[e] = "-" + T[i] + "-" + t, n = o[e]
        }
        return "" === n && (n = !1), n
    };
    b.prefixedCSSValue = B;
    var O = b._config.usePrefixes ? _.split(" ") : [];
    b._cssomPrefixes = O;
    var L = {
        elem: a("modernizr")
    };
    Modernizr._q.push(function() {
        delete L.elem
    });
    var N = {
        style: L.elem.style
    };
    Modernizr._q.unshift(function() {
        delete N.style
    }), b.testAllProps = g, b.testAllProps = y;
    b.testProp = function(e, t, r) {
        return h([e], n, t, r)
    }, b.testStyles = u;
    Modernizr.addTest("customelements", "customElements" in e), Modernizr.addTest("history", function() {
        var t = navigator.userAgent;
        return -1 === t.indexOf("Android 2.") && -1 === t.indexOf("Android 4.0") || -1 === t.indexOf("Mobile Safari") || -1 !== t.indexOf("Chrome") || -1 !== t.indexOf("Windows Phone") || "file:" === location.protocol ? e.history && "pushState" in e.history : !1
    }), Modernizr.addTest("pointerevents", function() {
        var e = !1,
            t = T.length;
        for (e = Modernizr.hasEvent("pointerdown"); t-- && !e;) k(T[t] + "pointerdown") && (e = !0);
        return e
    }), Modernizr.addTest("postmessage", "postMessage" in e), Modernizr.addTest("webgl", function() {
        var t = a("canvas"),
            n = "probablySupportsContext" in t ? "probablySupportsContext" : "supportsContext";
        return n in t ? t[n]("webgl") || t[n]("experimental-webgl") : "WebGLRenderingContext" in e
    });
    var R = !1;
    try {
        R = "WebSocket" in e && 2 === e.WebSocket.CLOSING
    } catch (j) {}
    Modernizr.addTest("websockets", R), Modernizr.addTest("cssanimations", y("animationName", "a", !0)),
        function() {
            Modernizr.addTest("csscolumns", function() {
                var e = !1,
                    t = y("columnCount");
                try {
                    e = !!t, e && (e = new Boolean(e))
                } catch (n) {}
                return e
            });
            for (var e, t, n = ["Width", "Span", "Fill", "Gap", "Rule", "RuleColor", "RuleStyle", "RuleWidth", "BreakBefore", "BreakAfter", "BreakInside"], r = 0; r < n.length; r++) e = n[r].toLowerCase(), t = y("column" + n[r]), ("breakbefore" === e || "breakafter" === e || "breakinside" == e) && (t = t || y(n[r])), Modernizr.addTest("csscolumns." + e, t)
        }(), Modernizr.addTest("flexbox", y("flexBasis", "1px", !0)), Modernizr.addTest("picture", "HTMLPictureElement" in e), Modernizr.addAsyncTest(function() {
            var e, t, n, r = a("img"),
                o = "sizes" in r;
            !o && "srcset" in r ? (t = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==", e = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", n = function() {
                s("sizes", 2 == r.width)
            }, r.onload = n, r.onerror = n, r.setAttribute("sizes", "9px"), r.srcset = e + " 1w," + t + " 8w", r.src = e) : s("sizes", o)
        }), Modernizr.addTest("srcset", "srcset" in a("img")), Modernizr.addTest("webworkers", "Worker" in e), o(), i(w), delete b.addTest, delete b.addAsyncTest;
    for (var M = 0; M < Modernizr._q.length; M++) Modernizr._q[M]();
    e.Modernizr = Modernizr
}(window, document);



















/*
 Popper.min.js
 Copyright (C) Federico Zivolo 2018
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
 (function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t()
})(this, function() {
    'use strict';

    function e(e) {
        return e && '[object Function]' === {}.toString.call(e)
    }

    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var o = e.ownerDocument.defaultView,
            n = o.getComputedStyle(e, null);
        return t ? n[t] : n
    }

    function o(e) {
        return 'HTML' === e.nodeName ? e : e.parentNode || e.host
    }

    function n(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case 'HTML':
            case 'BODY':
                return e.ownerDocument.body;
            case '#document':
                return e.body;
        }
        var i = t(e),
            r = i.overflow,
            p = i.overflowX,
            s = i.overflowY;
        return /(auto|scroll|overlay)/.test(r + s + p) ? e : n(o(e))
    }

    function r(e) {
        return 11 === e ? pe : 10 === e ? se : pe || se
    }

    function p(e) {
        if (!e) return document.documentElement;
        for (var o = r(10) ? document.body : null, n = e.offsetParent || null; n === o && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
        var i = n && n.nodeName;
        return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TH', 'TD', 'TABLE'].indexOf(n.nodeName) && 'static' === t(n, 'position') ? p(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
    }

    function s(e) {
        var t = e.nodeName;
        return 'BODY' !== t && ('HTML' === t || p(e.firstElementChild) === e)
    }

    function d(e) {
        return null === e.parentNode ? e : d(e.parentNode)
    }

    function a(e, t) {
        if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
        var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            n = o ? e : t,
            i = o ? t : e,
            r = document.createRange();
        r.setStart(n, 0), r.setEnd(i, 0);
        var l = r.commonAncestorContainer;
        if (e !== l && t !== l || n.contains(i)) return s(l) ? l : p(l);
        var f = d(e);
        return f.host ? a(f.host, t) : a(e, d(t).host)
    }

    function l(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
            o = 'top' === t ? 'scrollTop' : 'scrollLeft',
            n = e.nodeName;
        if ('BODY' === n || 'HTML' === n) {
            var i = e.ownerDocument.documentElement,
                r = e.ownerDocument.scrollingElement || i;
            return r[o]
        }
        return e[o]
    }

    function f(e, t) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            n = l(t, 'top'),
            i = l(t, 'left'),
            r = o ? -1 : 1;
        return e.top += n * r, e.bottom += n * r, e.left += i * r, e.right += i * r, e
    }

    function m(e, t) {
        var o = 'x' === t ? 'Left' : 'Top',
            n = 'Left' == o ? 'Right' : 'Bottom';
        return parseFloat(e['border' + o + 'Width'], 10) + parseFloat(e['border' + n + 'Width'], 10)
    }

    function h(e, t, o, n) {
        return ee(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], r(10) ? parseInt(o['offset' + e]) + parseInt(n['margin' + ('Height' === e ? 'Top' : 'Left')]) + parseInt(n['margin' + ('Height' === e ? 'Bottom' : 'Right')]) : 0)
    }

    function c(e) {
        var t = e.body,
            o = e.documentElement,
            n = r(10) && getComputedStyle(o);
        return {
            height: h('Height', t, o, n),
            width: h('Width', t, o, n)
        }
    }

    function g(e) {
        return fe({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }

    function u(e) {
        var o = {};
        try {
            if (r(10)) {
                o = e.getBoundingClientRect();
                var n = l(e, 'top'),
                    i = l(e, 'left');
                o.top += n, o.left += i, o.bottom += n, o.right += i
            } else o = e.getBoundingClientRect()
        } catch (t) {}
        var p = {
                left: o.left,
                top: o.top,
                width: o.right - o.left,
                height: o.bottom - o.top
            },
            s = 'HTML' === e.nodeName ? c(e.ownerDocument) : {},
            d = s.width || e.clientWidth || p.right - p.left,
            a = s.height || e.clientHeight || p.bottom - p.top,
            f = e.offsetWidth - d,
            h = e.offsetHeight - a;
        if (f || h) {
            var u = t(e);
            f -= m(u, 'x'), h -= m(u, 'y'), p.width -= f, p.height -= h
        }
        return g(p)
    }

    function b(e, o) {
        var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            p = r(10),
            s = 'HTML' === o.nodeName,
            d = u(e),
            a = u(o),
            l = n(e),
            m = t(o),
            h = parseFloat(m.borderTopWidth, 10),
            c = parseFloat(m.borderLeftWidth, 10);
        i && s && (a.top = ee(a.top, 0), a.left = ee(a.left, 0));
        var b = g({
            top: d.top - a.top - h,
            left: d.left - a.left - c,
            width: d.width,
            height: d.height
        });
        if (b.marginTop = 0, b.marginLeft = 0, !p && s) {
            var w = parseFloat(m.marginTop, 10),
                y = parseFloat(m.marginLeft, 10);
            b.top -= h - w, b.bottom -= h - w, b.left -= c - y, b.right -= c - y, b.marginTop = w, b.marginLeft = y
        }
        return (p && !i ? o.contains(l) : o === l && 'BODY' !== l.nodeName) && (b = f(b, o)), b
    }

    function w(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = e.ownerDocument.documentElement,
            n = b(e, o),
            i = ee(o.clientWidth, window.innerWidth || 0),
            r = ee(o.clientHeight, window.innerHeight || 0),
            p = t ? 0 : l(o),
            s = t ? 0 : l(o, 'left'),
            d = {
                top: p - n.top + n.marginTop,
                left: s - n.left + n.marginLeft,
                width: i,
                height: r
            };
        return g(d)
    }

    function y(e) {
        var n = e.nodeName;
        return 'BODY' === n || 'HTML' === n ? !1 : 'fixed' === t(e, 'position') || y(o(e))
    }

    function E(e) {
        if (!e || !e.parentElement || r()) return document.documentElement;
        for (var o = e.parentElement; o && 'none' === t(o, 'transform');) o = o.parentElement;
        return o || document.documentElement
    }

    function v(e, t, i, r) {
        var p = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
            s = {
                top: 0,
                left: 0
            },
            d = p ? E(e) : a(e, t);
        if ('viewport' === r) s = w(d, p);
        else {
            var l;
            'scrollParent' === r ? (l = n(o(t)), 'BODY' === l.nodeName && (l = e.ownerDocument.documentElement)) : 'window' === r ? l = e.ownerDocument.documentElement : l = r;
            var f = b(l, d, p);
            if ('HTML' === l.nodeName && !y(d)) {
                var m = c(e.ownerDocument),
                    h = m.height,
                    g = m.width;
                s.top += f.top - f.marginTop, s.bottom = h + f.top, s.left += f.left - f.marginLeft, s.right = g + f.left
            } else s = f
        }
        i = i || 0;
        var u = 'number' == typeof i;
        return s.left += u ? i : i.left || 0, s.top += u ? i : i.top || 0, s.right -= u ? i : i.right || 0, s.bottom -= u ? i : i.bottom || 0, s
    }

    function x(e) {
        var t = e.width,
            o = e.height;
        return t * o
    }

    function O(e, t, o, n, i) {
        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf('auto')) return e;
        var p = v(o, n, r, i),
            s = {
                top: {
                    width: p.width,
                    height: t.top - p.top
                },
                right: {
                    width: p.right - t.right,
                    height: p.height
                },
                bottom: {
                    width: p.width,
                    height: p.bottom - t.bottom
                },
                left: {
                    width: t.left - p.left,
                    height: p.height
                }
            },
            d = Object.keys(s).map(function(e) {
                return fe({
                    key: e
                }, s[e], {
                    area: x(s[e])
                })
            }).sort(function(e, t) {
                return t.area - e.area
            }),
            a = d.filter(function(e) {
                var t = e.width,
                    n = e.height;
                return t >= o.clientWidth && n >= o.clientHeight
            }),
            l = 0 < a.length ? a[0].key : d[0].key,
            f = e.split('-')[1];
        return l + (f ? '-' + f : '')
    }

    function L(e, t, o) {
        var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
            i = n ? E(t) : a(t, o);
        return b(o, i, n)
    }

    function S(e) {
        var t = e.ownerDocument.defaultView,
            o = t.getComputedStyle(e),
            n = parseFloat(o.marginTop || 0) + parseFloat(o.marginBottom || 0),
            i = parseFloat(o.marginLeft || 0) + parseFloat(o.marginRight || 0),
            r = {
                width: e.offsetWidth + i,
                height: e.offsetHeight + n
            };
        return r
    }

    function T(e) {
        var t = {
            left: 'right',
            right: 'left',
            bottom: 'top',
            top: 'bottom'
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e]
        })
    }

    function D(e, t, o) {
        o = o.split('-')[0];
        var n = S(e),
            i = {
                width: n.width,
                height: n.height
            },
            r = -1 !== ['right', 'left'].indexOf(o),
            p = r ? 'top' : 'left',
            s = r ? 'left' : 'top',
            d = r ? 'height' : 'width',
            a = r ? 'width' : 'height';
        return i[p] = t[p] + t[d] / 2 - n[d] / 2, i[s] = o === s ? t[s] - n[a] : t[T(s)], i
    }

    function C(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function N(e, t, o) {
        if (Array.prototype.findIndex) return e.findIndex(function(e) {
            return e[t] === o
        });
        var n = C(e, function(e) {
            return e[t] === o
        });
        return e.indexOf(n)
    }

    function P(t, o, n) {
        var i = void 0 === n ? t : t.slice(0, N(t, 'name', n));
        return i.forEach(function(t) {
            t['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            var n = t['function'] || t.fn;
            t.enabled && e(n) && (o.offsets.popper = g(o.offsets.popper), o.offsets.reference = g(o.offsets.reference), o = n(o, t))
        }), o
    }

    function k() {
        if (!this.state.isDestroyed) {
            var e = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            e.offsets.reference = L(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = O(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = D(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute', e = P(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
        }
    }

    function W(e, t) {
        return e.some(function(e) {
            var o = e.name,
                n = e.enabled;
            return n && o === t
        })
    }

    function H(e) {
        for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
            var i = t[n],
                r = i ? '' + i + o : e;
            if ('undefined' != typeof document.body.style[r]) return r
        }
        return null
    }

    function B() {
        return this.state.isDestroyed = !0, W(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.position = '', this.popper.style.top = '', this.popper.style.left = '', this.popper.style.right = '', this.popper.style.bottom = '', this.popper.style.willChange = '', this.popper.style[H('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function A(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window
    }

    function M(e, t, o, i) {
        var r = 'BODY' === e.nodeName,
            p = r ? e.ownerDocument.defaultView : e;
        p.addEventListener(t, o, {
            passive: !0
        }), r || M(n(p.parentNode), t, o, i), i.push(p)
    }

    function F(e, t, o, i) {
        o.updateBound = i, A(e).addEventListener('resize', o.updateBound, {
            passive: !0
        });
        var r = n(e);
        return M(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o
    }

    function I() {
        this.state.eventsEnabled || (this.state = F(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function R(e, t) {
        return A(e).removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function(e) {
            e.removeEventListener('scroll', t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
    }

    function U() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = R(this.reference, this.state))
    }

    function Y(e) {
        return '' !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function j(e, t) {
        Object.keys(t).forEach(function(o) {
            var n = ''; - 1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && Y(t[o]) && (n = 'px'), e.style[o] = t[o] + n
        })
    }

    function V(e, t) {
        Object.keys(t).forEach(function(o) {
            var n = t[o];
            !1 === n ? e.removeAttribute(o) : e.setAttribute(o, t[o])
        })
    }

    function q(e, t) {
        var o = e.offsets,
            n = o.popper,
            i = o.reference,
            r = -1 !== ['left', 'right'].indexOf(e.placement),
            p = -1 !== e.placement.indexOf('-'),
            s = i.width % 2 == n.width % 2,
            d = 1 == i.width % 2 && 1 == n.width % 2,
            a = function(e) {
                return e
            },
            l = t ? r || p || s ? $ : Z : a,
            f = t ? $ : a;
        return {
            left: l(d && !p && t ? n.left - 1 : n.left),
            top: f(n.top),
            bottom: f(n.bottom),
            right: l(n.right)
        }
    }

    function K(e, t, o) {
        var n = C(e, function(e) {
                var o = e.name;
                return o === t
            }),
            i = !!n && e.some(function(e) {
                return e.name === o && e.enabled && e.order < n.order
            });
        if (!i) {
            var r = '`' + t + '`';
            console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!')
        }
        return i
    }

    function z(e) {
        return 'end' === e ? 'start' : 'start' === e ? 'end' : e
    }

    function G(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = ce.indexOf(e),
            n = ce.slice(o + 1).concat(ce.slice(0, o));
        return t ? n.reverse() : n
    }

    function _(e, t, o, n) {
        var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            r = +i[1],
            p = i[2];
        if (!r) return e;
        if (0 === p.indexOf('%')) {
            var s;
            switch (p) {
                case '%p':
                    s = o;
                    break;
                case '%':
                case '%r':
                default:
                    s = n;
            }
            var d = g(s);
            return d[t] / 100 * r
        }
        if ('vh' === p || 'vw' === p) {
            var a;
            return a = 'vh' === p ? ee(document.documentElement.clientHeight, window.innerHeight || 0) : ee(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r
        }
        return r
    }

    function X(e, t, o, n) {
        var i = [0, 0],
            r = -1 !== ['right', 'left'].indexOf(n),
            p = e.split(/(\+|\-)/).map(function(e) {
                return e.trim()
            }),
            s = p.indexOf(C(p, function(e) {
                return -1 !== e.search(/,|\s/)
            }));
        p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
        var d = /\s*,\s*|\s+/,
            a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
        return a = a.map(function(e, n) {
            var i = (1 === n ? !r : r) ? 'height' : 'width',
                p = !1;
            return e.reduce(function(e, t) {
                return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t)
            }, []).map(function(e) {
                return _(e, i, t, o)
            })
        }), a.forEach(function(e, t) {
            e.forEach(function(o, n) {
                Y(o) && (i[t] += o * ('-' === e[n - 1] ? -1 : 1))
            })
        }), i
    }

    function J(e, t) {
        var o, n = t.offset,
            i = e.placement,
            r = e.offsets,
            p = r.popper,
            s = r.reference,
            d = i.split('-')[0];
        return o = Y(+n) ? [+n, 0] : X(n, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e
    }
    for (var Q = Math.min, Z = Math.floor, $ = Math.round, ee = Math.max, te = 'undefined' != typeof window && 'undefined' != typeof document, oe = ['Edge', 'Trident', 'Firefox'], ne = 0, ie = 0; ie < oe.length; ie += 1)
        if (te && 0 <= navigator.userAgent.indexOf(oe[ie])) {
            ne = 1;
            break
        } var i = te && window.Promise,
        re = i ? function(e) {
            var t = !1;
            return function() {
                t || (t = !0, window.Promise.resolve().then(function() {
                    t = !1, e()
                }))
            }
        } : function(e) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1, e()
                }, ne))
            }
        },
        pe = te && !!(window.MSInputMethodContext && document.documentMode),
        se = te && /MSIE 10/.test(navigator.userAgent),
        de = function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
        },
        ae = function() {
            function e(e, t) {
                for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
            return function(t, o, n) {
                return o && e(t.prototype, o), n && e(t, n), t
            }
        }(),
        le = function(e, t, o) {
            return t in e ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = o, e
        },
        fe = Object.assign || function(e) {
            for (var t, o = 1; o < arguments.length; o++)
                for (var n in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e
        },
        me = te && /Firefox/i.test(navigator.userAgent),
        he = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
        ce = he.slice(3),
        ge = {
            FLIP: 'flip',
            CLOCKWISE: 'clockwise',
            COUNTERCLOCKWISE: 'counterclockwise'
        },
        ue = function() {
            function t(o, n) {
                var i = this,
                    r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                de(this, t), this.scheduleUpdate = function() {
                    return requestAnimationFrame(i.update)
                }, this.update = re(this.update.bind(this)), this.options = fe({}, t.Defaults, r), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = o && o.jquery ? o[0] : o, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(fe({}, t.Defaults.modifiers, r.modifiers)).forEach(function(e) {
                    i.options.modifiers[e] = fe({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                    return fe({
                        name: e
                    }, i.options.modifiers[e])
                }).sort(function(e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function(t) {
                    t.enabled && e(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state)
                }), this.update();
                var p = this.options.eventsEnabled;
                p && this.enableEventListeners(), this.state.eventsEnabled = p
            }
            return ae(t, [{
                key: 'update',
                value: function() {
                    return k.call(this)
                }
            }, {
                key: 'destroy',
                value: function() {
                    return B.call(this)
                }
            }, {
                key: 'enableEventListeners',
                value: function() {
                    return I.call(this)
                }
            }, {
                key: 'disableEventListeners',
                value: function() {
                    return U.call(this)
                }
            }]), t
        }();
    return ue.Utils = ('undefined' == typeof window ? global : window).PopperUtils, ue.placements = he, ue.Defaults = {
        placement: 'bottom',
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        n = t.split('-')[1];
                    if (n) {
                        var i = e.offsets,
                            r = i.reference,
                            p = i.popper,
                            s = -1 !== ['bottom', 'top'].indexOf(o),
                            d = s ? 'left' : 'top',
                            a = s ? 'width' : 'height',
                            l = {
                                start: le({}, d, r[d]),
                                end: le({}, d, r[d] + r[a] - p[a])
                            };
                        e.offsets.popper = fe({}, p, l[n])
                    }
                    return e
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: J,
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(e, t) {
                    var o = t.boundariesElement || p(e.instance.popper);
                    e.instance.reference === o && (o = p(o));
                    var n = H('transform'),
                        i = e.instance.popper.style,
                        r = i.top,
                        s = i.left,
                        d = i[n];
                    i.top = '', i.left = '', i[n] = '';
                    var a = v(e.instance.popper, e.instance.reference, t.padding, o, e.positionFixed);
                    i.top = r, i.left = s, i[n] = d, t.boundaries = a;
                    var l = t.priority,
                        f = e.offsets.popper,
                        m = {
                            primary: function(e) {
                                var o = f[e];
                                return f[e] < a[e] && !t.escapeWithReference && (o = ee(f[e], a[e])), le({}, e, o)
                            },
                            secondary: function(e) {
                                var o = 'right' === e ? 'left' : 'top',
                                    n = f[o];
                                return f[e] > a[e] && !t.escapeWithReference && (n = Q(f[o], a[e] - ('right' === e ? f.width : f.height))), le({}, o, n)
                            }
                        };
                    return l.forEach(function(e) {
                        var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
                        f = fe({}, f, m[t](e))
                    }), e.offsets.popper = f, e
                },
                priority: ['left', 'right', 'top', 'bottom'],
                padding: 5,
                boundariesElement: 'scrollParent'
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(e) {
                    var t = e.offsets,
                        o = t.popper,
                        n = t.reference,
                        i = e.placement.split('-')[0],
                        r = Z,
                        p = -1 !== ['top', 'bottom'].indexOf(i),
                        s = p ? 'right' : 'bottom',
                        d = p ? 'left' : 'top',
                        a = p ? 'width' : 'height';
                    return o[s] < r(n[d]) && (e.offsets.popper[d] = r(n[d]) - o[a]), o[d] > r(n[s]) && (e.offsets.popper[d] = r(n[s])), e
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(e, o) {
                    var n;
                    if (!K(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
                    var i = o.element;
                    if ('string' == typeof i) {
                        if (i = e.instance.popper.querySelector(i), !i) return e;
                    } else if (!e.instance.popper.contains(i)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;
                    var r = e.placement.split('-')[0],
                        p = e.offsets,
                        s = p.popper,
                        d = p.reference,
                        a = -1 !== ['left', 'right'].indexOf(r),
                        l = a ? 'height' : 'width',
                        f = a ? 'Top' : 'Left',
                        m = f.toLowerCase(),
                        h = a ? 'left' : 'top',
                        c = a ? 'bottom' : 'right',
                        u = S(i)[l];
                    d[c] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[c] - u)), d[m] + u > s[c] && (e.offsets.popper[m] += d[m] + u - s[c]), e.offsets.popper = g(e.offsets.popper);
                    var b = d[m] + d[l] / 2 - u / 2,
                        w = t(e.instance.popper),
                        y = parseFloat(w['margin' + f], 10),
                        E = parseFloat(w['border' + f + 'Width'], 10),
                        v = b - e.offsets.popper[m] - y - E;
                    return v = ee(Q(s[l] - u, v), 0), e.arrowElement = i, e.offsets.arrow = (n = {}, le(n, m, $(v)), le(n, h, ''), n), e
                },
                element: '[x-arrow]'
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(e, t) {
                    if (W(e.instance.modifiers, 'inner')) return e;
                    if (e.flipped && e.placement === e.originalPlacement) return e;
                    var o = v(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                        n = e.placement.split('-')[0],
                        i = T(n),
                        r = e.placement.split('-')[1] || '',
                        p = [];
                    switch (t.behavior) {
                        case ge.FLIP:
                            p = [n, i];
                            break;
                        case ge.CLOCKWISE:
                            p = G(n);
                            break;
                        case ge.COUNTERCLOCKWISE:
                            p = G(n, !0);
                            break;
                        default:
                            p = t.behavior;
                    }
                    return p.forEach(function(s, d) {
                        if (n !== s || p.length === d + 1) return e;
                        n = e.placement.split('-')[0], i = T(n);
                        var a = e.offsets.popper,
                            l = e.offsets.reference,
                            f = Z,
                            m = 'left' === n && f(a.right) > f(l.left) || 'right' === n && f(a.left) < f(l.right) || 'top' === n && f(a.bottom) > f(l.top) || 'bottom' === n && f(a.top) < f(l.bottom),
                            h = f(a.left) < f(o.left),
                            c = f(a.right) > f(o.right),
                            g = f(a.top) < f(o.top),
                            u = f(a.bottom) > f(o.bottom),
                            b = 'left' === n && h || 'right' === n && c || 'top' === n && g || 'bottom' === n && u,
                            w = -1 !== ['top', 'bottom'].indexOf(n),
                            y = !!t.flipVariations && (w && 'start' === r && h || w && 'end' === r && c || !w && 'start' === r && g || !w && 'end' === r && u);
                        (m || b || y) && (e.flipped = !0, (m || b) && (n = p[d + 1]), y && (r = z(r)), e.placement = n + (r ? '-' + r : ''), e.offsets.popper = fe({}, e.offsets.popper, D(e.instance.popper, e.offsets.reference, e.placement)), e = P(e.instance.modifiers, e, 'flip'))
                    }), e
                },
                behavior: 'flip',
                padding: 5,
                boundariesElement: 'viewport'
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        n = e.offsets,
                        i = n.popper,
                        r = n.reference,
                        p = -1 !== ['left', 'right'].indexOf(o),
                        s = -1 === ['top', 'left'].indexOf(o);
                    return i[p ? 'left' : 'top'] = r[o] - (s ? i[p ? 'width' : 'height'] : 0), e.placement = T(t), e.offsets.popper = g(i), e
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(e) {
                    if (!K(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
                    var t = e.offsets.reference,
                        o = C(e.instance.modifiers, function(e) {
                            return 'preventOverflow' === e.name
                        }).boundaries;
                    if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes['x-out-of-boundaries'] = ''
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes['x-out-of-boundaries'] = !1
                    }
                    return e
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(e, t) {
                    var o = t.x,
                        n = t.y,
                        i = e.offsets.popper,
                        r = C(e.instance.modifiers, function(e) {
                            return 'applyStyle' === e.name
                        }).gpuAcceleration;
                    void 0 !== r && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
                    var s, d, a = void 0 === r ? t.gpuAcceleration : r,
                        l = p(e.instance.popper),
                        f = u(l),
                        m = {
                            position: i.position
                        },
                        h = q(e, 2 > window.devicePixelRatio || !me),
                        c = 'bottom' === o ? 'top' : 'bottom',
                        g = 'right' === n ? 'left' : 'right',
                        b = H('transform');
                    if (d = 'bottom' == c ? 'HTML' === l.nodeName ? -l.clientHeight + h.bottom : -f.height + h.bottom : h.top, s = 'right' == g ? 'HTML' === l.nodeName ? -l.clientWidth + h.right : -f.width + h.right : h.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[c] = 0, m[g] = 0, m.willChange = 'transform';
                    else {
                        var w = 'bottom' == c ? -1 : 1,
                            y = 'right' == g ? -1 : 1;
                        m[c] = d * w, m[g] = s * y, m.willChange = c + ', ' + g
                    }
                    var E = {
                        "x-placement": e.placement
                    };
                    return e.attributes = fe({}, E, e.attributes), e.styles = fe({}, m, e.styles), e.arrowStyles = fe({}, e.offsets.arrow, e.arrowStyles), e
                },
                gpuAcceleration: !0,
                x: 'bottom',
                y: 'right'
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(e) {
                    return j(e.instance.popper, e.styles), V(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && j(e.arrowElement, e.arrowStyles), e
                },
                onLoad: function(e, t, o, n, i) {
                    var r = L(i, t, e, o.positionFixed),
                        p = O(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
                    return t.setAttribute('x-placement', p), j(t, {
                        position: o.positionFixed ? 'fixed' : 'absolute'
                    }), o
                },
                gpuAcceleration: void 0
            }
        }
    }, ue
});
//# sourceMappingURL=popper.min.js.map


























! function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function(i) {
    "use strict";
    var e = window.Slick || {};
    (e = function() {
        var e = 0;
        return function(t, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return i('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
        var s = this;
        if ("boolean" == typeof t) o = t, t = null;
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e)
        }), s.$slidesCache = s.$slides, s.reinit()
    }, e.prototype.animateHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed)
        }
    }, e.prototype.animateSlide = function(e, t) {
        var o = {},
            s = this;
        s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(i) {
                i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
            },
            complete: function() {
                t && t.call()
            }
        })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() {
            s.disableTransition(), t.call()
        }, s.options.speed))
    }, e.prototype.getNavTarget = function() {
        var e = this,
            t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)), t
    }, e.prototype.asNavFor = function(e) {
        var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function() {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function(i) {
        var e = this,
            t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function() {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function() {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
    }, e.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function() {
        var e, t, o = this;
        if (!0 === o.options.dots) {
            for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
        }
    }, e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function() {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function(e, t) {
        var o, s, n, r = this,
            l = !1,
            d = r.$slider.width(),
            a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
        }
    }, e.prototype.changeSlide = function(e, t) {
        var o, s, n, r = this,
            l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case "previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                break;
            case "next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                break;
            case "index":
                var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function(i) {
        var e, t;
        if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) {
                    i = t;
                    break
                }
                t = e[o]
            }
        return i
    }, e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.cleanUpRows = function() {
        var i, e = this;
        e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i))
    }, e.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }, e.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            i(this).attr("style", i(this).data("originalStyling"))
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
    }, e.prototype.disableTransition = function(i) {
        var e = this,
            t = {};
        t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.fadeSlide = function(i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }), t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function() {
            t.disableTransition(i), e.call()
        }, t.options.speed))
    }, e.prototype.fadeSlideOut = function(i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
            }, 0)
        })
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, e.prototype.getDotCount = function() {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow) ++o;
            else
                for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }, e.prototype.getLeft = function(i) {
        var e, t, o, s, n = this,
            r = 0;
        return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function(i) {
        return this.options[i]
    }, e.prototype.getNavigableIndexes = function() {
        var i, e = this,
            t = 0,
            o = 0,
            s = [];
        for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }, e.prototype.getSlick = function() {
        return this
    }, e.prototype.getSlideCount = function() {
        var e, t, o = this;
        return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) {
            if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1
        }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }, e.prototype.init = function(e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function() {
        var e = this,
            t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function(i) {
                return i >= 0 && i < e.slideCount
            });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            var s = o.indexOf(t);
            i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1
            }), -1 !== s && i(this).attr({
                "aria-describedby": "slick-slide-control" + e.instanceUid + s
            })
        }), e.$dots.attr("role", "tablist").find("li").each(function(s) {
            var n = o[s];
            i(this).attr({
                role: "presentation"
            }), i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
        e.activateADA()
    }, e.prototype.initArrowEvents = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }, e.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }, e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
    }, e.prototype.initUI = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }, e.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }, e.prototype.lazyLoad = function() {
        function e(e) {
            i("img[data-lazy]", e).each(function() {
                var e = i(this),
                    t = i(this).attr("data-lazy"),
                    o = i(this).attr("data-srcset"),
                    s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                    r = document.createElement("img");
                r.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), n.$slider.trigger("lazyLoaded", [n, e, t])
                    })
                }, r.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t])
                }, r.src = t
            })
        }
        var t, o, s, n = this;
        if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad)
            for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
        e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }, e.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(), i.$slideTrack.css({
            opacity: 1
        }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, e.prototype.orientationChange = function() {
        var i = this;
        i.checkResponsive(), i.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function() {
        var i = this;
        i.autoPlayClear(), i.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, e.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
    }, e.prototype.prev = e.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, e.prototype.preventDefault = function(i) {
        i.preventDefault()
    }, e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, o, s, n, r, l = this,
            d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
        }, r.onerror = function() {
            e < 3 ? setTimeout(function() {
                l.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
        }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
    }, e.prototype.refresh = function(e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
            currentSlide: t
        }), s.init(), e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function() {
        var e, t, o, s = this,
            n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
                if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                    s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
                } s.breakpoints.sort(function(i, e) {
                return s.options.mobileFirst ? i - e : e - i
            })
        }
    }, e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, e.prototype.resize = function() {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
        o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
    }, e.prototype.setCSS = function(i) {
        var e, t, o = this,
            s = {};
        !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
    }, e.prototype.setDimensions = function() {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }, e.prototype.setFade = function() {
        var e, t = this;
        t.$slides.each(function(o, s) {
            e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        }), t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    }, e.prototype.setHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, t, o, s, n, r = this,
            l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
        else if ("multiple" === n) i.each(o, function(i, e) {
            r.options[i] = e
        });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                    r.options.responsive.push(s[t])
                } l && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
    }, e.prototype.setProps = function() {
        var i = this,
            e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }, e.prototype.setSlideClasses = function(i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
            var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
        } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }, e.prototype.setupInfinite = function() {
        var e, t, o, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
            for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                i(this).attr("id", "")
            })
        }
    }, e.prototype.interrupt = function(i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i
    }, e.prototype.selectHandler = function(e) {
        var t = this,
            o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
    }, e.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l, d = null,
            a = this;
        if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
            if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
                a.postSlide(o)
            }) : a.postSlide(o));
            else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
            a.postSlide(o)
        }) : a.postSlide(o));
        else {
            if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function() {
                a.postSlide(s)
            })) : a.postSlide(s), void a.animateHeight();
            !0 !== t ? a.animateSlide(d, function() {
                a.postSlide(s)
            }) : a.postSlide(s)
        }
    }, e.prototype.startLoad = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function() {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }, e.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
                case "left":
                case "down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, e.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
        }
    }, e.prototype.swipeMove = function(i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
    }, e.prototype.swipeStart = function(i) {
        var e, t = this;
        if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
    }, e.prototype.unload = function() {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function(i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy()
    }, e.prototype.updateArrows = function() {
        var i = this;
        Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }, e.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }, i.fn.slick = function() {
        var i, t, o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
        return o
    }
});