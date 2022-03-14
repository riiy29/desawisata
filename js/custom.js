var width = window.innerWidth,
	height = window.innerHeight;

var optionsCookies = {
    title: "Cookies",
    message:
      "We use cookies to understand how you use our site, to personalize content and to improve your experience. By continuing to use our site, you accept our use of cookies and revised.",
    delay: 600,
    expires: 30,
    onAccept: function() {
      var myPreferences = $.fn.ihavecookies.cookie();
    },
    moreInfoLabel: "",
    uncheckBoxes: true,
    advancedBtnLabel: ""
};

var wow = new WOW();
	wow.init();

$(function() {

	$('body').ihavecookies(optionsCookies);

	$(".mask-phone").mask("+1 (999) 999-9999");

	if( (device.mobile() || device.tablet()) && device.ios() ) {
		var tempCSS = $('a').css('-webkit-tap-highlight-color');
		$('main, .main-inner').css('cursor', 'pointer')
				 .css('-webkit-tap-highlight-color', 'rgba(0, 0, 0, 0)');
		$('a').css('-webkit-tap-highlight-color', tempCSS);
	}

	$(".ripple").on("click", function(event) {
		var _this = $(this),
			offset = $(this).offset(),
			positionX = (event.pageX - offset.left),
			positionY = (event.pageY - offset.top);
		_this.append("<div class='ripple-effect'>");
		_this.find(".ripple-effect").css({
		   left: positionX,
		   top: positionY
		}).animate({
			opacity: 0,
		  }, 1500, function() {
		   $(this).remove();
		});
	});

	$('.open_popup').popup({
		transition: 'all 0.4s',
		color: '#141c2e',
		opacity: 0.8
	});

	$('.main-mnu, .main-nmu-mob-container').liLanding({
		topMargin: $(".header-fixed").outerHeight()
	});

	$(".logo").on("click", function() {
		$("html, body").animate({ scrollTop: 0 }, 1000);
		return false;
	});

	$(".header-nav-item-mnu-btn a").on("click", function(e) {
		e.preventDefault();

		$("body").addClass("mnu-open");

		var item = $(".main-nmu-mob-list li"),
			duration = 200,
			i = 1;

	  	setTimeout(function() {
  
		  	var timerId = setTimeout(function go() {
			  	$(".main-nmu-mob-list li:nth-child("+ i +")").addClass("visible");
			  	if (i < item.length) {
				  	setTimeout(go, duration);
			  	} else {
					$(".main-nmu-mob-close").addClass("visible");
					$(".main-nmu-mob .header-nav-list").addClass("visible");
				}
			  	i++;
		 	 }, duration);
  
	  	}, 150);


	});
	$(".main-nmu-mob-close").on("click", function() {

		$("body").removeClass("mnu-open");
		$(".main-nmu-mob-close").removeClass("visible");
		$(".main-nmu-mob .header-nav-list").removeClass("visible");
		$(".main-nmu-mob-list li").removeClass("visible");

	});


	formingHrefTel();
	headerFixed();

	datepickerInit();
	carousels();
	tabsAndAccordions();

	inputChange();
	forms();

	contentTable();

	tourPopup();

	footerReveal();
	lazyLoading();

	$(window).on("resize", function() {
		headerFixed();
	});

});

if(detectIE()) {
	var body = document.querySelector("body");
	body.classList.add("overflow-hidden")
	body.innerHTML = '<div class="ie-browser"><div class="ie-browser-tr"><div class="ie-browser-td">Unfortunately, the browser Internet Explorer you use is outdated and cannot display the site normally. <br> Please open the site in another browser</div></div></div>';
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
function formingHrefTel() {

	var linkAll = $('.formingHrefTel'),
		joinNumbToStringTel = 'tel:';

	$.each(linkAll, function () {
		var _this = $(this),
			linkValue = _this.text(),
			arrayString = linkValue.split("");

		for (var i = 0; i < arrayString.length; i++) {
			var thisNunb = isNumber(arrayString[i]);
			if (thisNunb === true || (arrayString[i] === "+" && i === 0)) {
				joinNumbToStringTel += arrayString[i];
			}
		}

		_this.attr("href", function () {
			return joinNumbToStringTel;
		});
		joinNumbToStringTel = 'tel:'

	});

}

function headerFixed() {

	var header = $(".header"),
		headerFixed = header.find(".header-fixed");

	$(window).on("load scroll", function() {
		var st = $(this).scrollTop();
		if (st > 0) {
			headerFixed.addClass("fixed");
		} else {
			headerFixed.removeClass("fixed");
		}
	});

}

function datepickerInit() {

	$.fn.datepicker.language['en'] = {
		days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
		monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		today: 'Today',
		clear: 'Clear',
		dateFormat: 'mm/dd/yyyy',
		timeFormat: 'hh:ii aa',
		firstDay: 0
	};

	var dateToday = new Date();

	$('.datepicker-init').datepicker({
		language: 'en',
		minDate: dateToday
	});

} 

function tourPopup() {

	$(".tour-item").on("click", function(e) {
		e.preventDefault();

		var _this = $(this),
			title = _this.find(".tour-item-title").html(),
			titleText = _this.find(".tour-item-title").text(),
			price = _this.find(".tour-item-price").html(),
			promo = _this.find(".tour-item-promo").html(),
			desc = _this.find(".tour-item-addt-desc").html(),
			galleryImages = [],
			days = [];

		_this.find(".tour-item-addt-gallety-img").each(function() {
			galleryImages.push($(this).text());
		});
		_this.find(".tour-item-addt-day").each(function() {
			var _this = $(this),
				title = _this.find(".tour-item-addt-day-title").text(),
				desc = _this.find(".tour-item-addt-day-desc").html(),
				obj = {};

			obj.title = title;
			obj.desc = desc;
			days.push(obj);
		});


		var popup = $("#tour_popup"),
			wrappGallery = popup.find(".wrapp-tour-carusel"),
			tabs = popup.find(".wrapp-tour-tabs"),
			form = popup.find(".tour_order_form"),
			subject = form.attr("data-form-subject"),
			formSubject = form.find("input[name='form_subject']"),
			poupInfo = popup.find(".tour_popup_content");

		poupInfo.empty().append('<div class="tour_p_price">'+ price +'</div>')
						.append('<h4 class="tour_p_title">'+ title +'</h4>')
						.append('<div class="content tour_p_desc">'+ desc +'</div>');

		/* Begin add gallery on popup */
		wrappGallery.empty().append('<div class="owl-carousel owl-theme tour-carusel"></div><div class="tour-item-promo"></div>');
		var tourCarusel = wrappGallery.find(".tour-carusel"),
			popupPromo = wrappGallery.find(".tour-item-promo");
		
		$.each(galleryImages, function(index, value) {

			tourCarusel.append('<div class="tour-carusel-item"><img src="'+ value +'" alt=""></div>');

		});

		tourCarusel.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			nav: true,
			navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
			dots: false,
			onTranslated: function() {
				lazyLoading();
			}
		});
		tourCarusel.on('changed.owl.carousel', function(event) {
			lazyLoading();
		});

		popupPromo.empty().append(promo);

		/* End add gallery on popup */

		/* Begin add days on popup */
		tabs.empty().append('<ul class="tabs-nav"></ul><div class="tabs-container"></div>');
		var tabsNav = tabs.find(".tabs-nav"),
			tabsContainer = tabs.find(".tabs-container");

		$.each(days, function(index, value) {

			if ( index === 0 ) {
				tabsNav.append('<li class="active">'+ value.title +'</li>');
				tabsContainer.append('<div class="tabs-item content active">'+ value.desc +'</div>');
			} else {
				tabsNav.append('<li>'+ value.title +'</li>');
				tabsContainer.append('<div class="tabs-item content">'+ value.desc +'</div>');
			}

		});
		/* End add days on popup */

		formSubject.val(subject + " " + titleText);
		
	});

	$('.open_popup_tour').popup({
		transition: 'all 0.4s',
		color: '#141c2e',
		opacity: 0.8,
		scrolllock: true
	});

}

function forms() {

	var ajaxurl = "/mail.php";

	$.validator.addMethod("customemail", function (value, element) {
		return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
	},
		"The email is not a valid email."
	);

	$(".section-subscribe-form").validate({
		rules: {
			Email: {
				required: true,
				email: true,
				customemail: true
			}
		},
		messages: {
			Email: {
				required: "The email field is required.",
				email: "The email field is required.",
				customemail: "The email is not a valid email."
			}
		},
		submitHandler: function(form) {
			var th = $(form);
			
			$.ajax({
				type: "POST",
				url: ajaxurl,
				data: th.serialize()
			}).done(function() {
				customAlert("Successfully sent!", 4000, "success");

				setTimeout(function() {
					th.trigger("reset");
					$(".form-field").removeClass("focus");
				}, 1000);
			});
		}
	});

	$(".contact-form").validate({
      rules: {
        Name: {
		  required: true,
		  minlength: 2
        },
        Phone: {
		  required: true
		}
      },
      messages: {
        Name: {
          required: "The name field is required.",
		},
		Phone: {
          required: "The phone field is required.",
		}
      },
      submitHandler: function(form) {
		var th = $(form);

		$.ajax({
			type: "POST",
			url: ajaxurl,
			data: th.serialize()
		}).done(function() {
			customAlert("Successfully sent!", 4000, "success");

			setTimeout(function() {
				th.trigger("reset");
				$(".form-field").removeClass("focus");
			}, 1000);
		});

      }
	});

	$(".Ñallback_popup_form").validate({
      rules: {
        Name: {
		  required: true,
		  minlength: 2
        },
        Phone: {
		  required: true
        }
      },
      messages: {
        Name: {
          required: "The name field is required.",
		},
		Phone: {
          required: "The phone field is required.",
        }
      },
      submitHandler: function(form) {
		var th = $(form),
			popup = th.closest(".popup_style"),
			close = popup.find(".popup_close");
		close.click();

		$.ajax({
			type: "POST",
			url: ajaxurl,
			data: th.serialize()
		}).done(function() {
			customAlert("Successfully sent!", 4000, "success");

			setTimeout(function() {
				th.trigger("reset");
				$(".form-field").removeClass("focus");
			}, 1000);
		});

      }
	});

	$(".tour_order_form").validate({
      rules: {
        Name: {
		  required: true,
		  minlength: 2
		},
		Email: {
			required: true,
			email: true,
			customemail: true
		},
        Phone: {
		  required: true
		}
      },
      messages: {
        Name: {
          required: "The name field is required.",
		},
		Email: {
			required: "The email field is required.",
			email: "The email field is required.",
			customemail: "The email is not a valid email."
		},
		Phone: {
          required: "The phone field is required.",
		}
      },
      submitHandler: function(form) {
		var th = $(form);

		$.ajax({
			type: "POST",
			url: ajaxurl,
			data: th.serialize()
		}).done(function() {
			customAlert("Successfully sent!", 4000, "success");

			setTimeout(function() {
				th.trigger("reset");
				$(".form-field").removeClass("focus");
			}, 1000);
		});

      }
	});

}

function carousels() {
	
	var reviewsCarusel = $(".reviews-carusel");
	reviewsCarusel.owlCarousel({
		loop: true,
		margin: 30,
		nav: false,
		navText: [],
		dots: true,
		responsive : {
			0 : {
				items: 1
			},
			768 : {
				items: 2
			},
			1200 : {
				items: 3
			}
		},
		onTranslated: function() {
			lazyLoading();
		}
	});
	reviewsCarusel.on('changed.owl.carousel', function(event) {
		lazyLoading();
	});

}

function tabsAndAccordions() {

	$(document).on("click", ".tabs-nav li", function() {

		var _this = $(this),
			index = _this.index(),
			tabs = _this.closest(".tabs"),
			items = tabs.find(".tabs-item");

		if (!_this.hasClass("active")) {

			items
				.eq(index)
				.add(_this)
				.addClass("active")
				.siblings()
				.removeClass("active");

		}

	});

	$(".accordion-trigger").on("click", function(e) {
    e.preventDefault();

    var _this = $(this),
		item = _this.closest(".accordion-item"),
		container = _this.closest(".accordion"),
		list = _this.closest(".accordion-list"),
		items = container.find(".accordion-item"),
		content = item.find(".accordion-content"),
		otherContents = container.find(".accordion-content"),
		duration = 300;

    if (!item.hasClass("active")) {
		items.removeClass("active");
		item.addClass("active");
		otherContents.stop(true, true).slideUp(duration);
		content.stop(true, true).slideDown(duration);
    } else {
		content.stop(true, true).slideUp(duration);
		item.removeClass("active");
    }
  });

}

function inputChange() {
  var input = $(".form-field-input");

  $(".form-field").each(function() {
    var _this = $(this),
      val = _this.find(".form-field-input").val();

    if (val === "") {
      _this.removeClass("focus");
    } else {
      _this.addClass("focus");
    }
  });

  input
    .on("focus", function() {
      var _this = $(this),
        wrappInput = _this.parent();

      wrappInput.addClass("focus");
    })
    .on("keyup change", function() {
      var _this = $(this),
        val = _this.val(),
        wrappInput = _this.parent();

      if (val === "" && !_this.is(":focus")) {
        wrappInput.removeClass("focus");
      } else {
        wrappInput.addClass("focus");
      }
    })
    .on("blur", function() {
      var _this = $(this),
        val = _this.val(),
        wrappInput = _this.parent();

      if (val === "") {
        wrappInput.removeClass("focus");
      }
    });
}

function footerReveal() {

	var footer = $(".footer"),
        content = $(".main-inner"),
        win = $(window);

	win.on('load resize', function() {

		if (footer.outerHeight() <= win.outerHeight() && footer.offset().top >= win.outerHeight()) {

			footer.css({
				'z-index' : -10,
				position : 'fixed',
				bottom : 0
			});
			content.css({
			'margin-bottom' : footer.outerHeight()
			});
		  
		} else {
	
			footer.css({
				'z-index' : 0,
				position : 'relative',
				bottom : 0
			});
			content.css({
			'margin-bottom' : '0'
			});
	
		}

	});
	
}

function customAlert(text, duration, alertInfo) {

	var alerts = $(".alerts"),
		body = $("body");
		alertClass = "",
		alertIco = "info";

	if(!alerts.length) {
		body.append('<div class="alerts"></div>');
	}
	$(".alert").remove();

	if( alertInfo === "success" ) {
		alertClass = "alert-success";
		alertIco = "fa-check";
	} else if ( alertInfo === "danger" ) {
		alertClass = "alert-danger";
		alertIco = "fa-exclamation-circle";
	} else if ( alertInfo === "warning" ) {
		alertClass = "alert-warning";
		alertIco = "fa-exclamation-triangle";
	} else if (alertInfo == "default") {
		alertClass = "alert-default",
		alertIco = "fa-info";
	}

	if ( !$("." + alertClass + "").length ) {

		$(".alerts").append('<div class="alert '+ alertClass +'" data-duration-hide="'+ duration +'"> <div class="alert-close"><i class="fa fa-times" aria-hidden="true"></i></div> <div class="alert-ico"> <i class="fa '+ alertIco +'" aria-hidden="true"></i> </div> <div class="alert-text">'+ text +'</div> </div>');

		setTimeout(function() {
		$("." + alertClass + "").remove();
		}, duration);

	}

	$(document).on("click", ".alert-close", function() {

		$(this).closest(".alert").remove();

	});

}

function contentTable() {
	var contentTable = $(".content");
	if(contentTable.length) {
		
		$.each(contentTable.find("table"), function() {
			$(this).wrap("<div class='table-responsive-outer'></div>").wrap("<div class='table-responsive'></div>");
		});
		
	}
}

function lazyLoading() {
	$('.lazy').Lazy({
		effect: 'fadeIn'
	});
}

function detectIE() {
	var ua = window.navigator.userAgent;
  
	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
	  // IE 10 or older => return version number
	  return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}
  
	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
	  // IE 11 => return version number
	  var rv = ua.indexOf('rv:');
	  return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}
  
	// other browser
	return false;
}

function initMap() {
    var geocoder, map,
        mapInfo = $('#map_address'),
        markerUrl = mapInfo.data("marker"),
        address = mapInfo.val();
    function initialize() {
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(-34.397, 150.644);
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            styles: [ { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#141c2e" } ] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [ { "color": "#141c2e" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#141c2e" }, { "lightness": -37 } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#141c2e" } ] }, { "featureType": "transit", "elementType": "geometry", "stylers": [ { "color": "#141c2e" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "visibility": "on" }, { "color": "#141c2e" }, { "weight": 2 }, { "gamma": 0.84 } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#bebebe" } ] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [ { "weight": 0.6 }, { "color": "#141c2e" } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#141c2e" } ] } ],
            navigationControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                        map.setCenter(results[0].geometry.location);

                        var infowindow = new google.maps.InfoWindow({
                            content: '<b>' + address + '</b>',
                            size: new google.maps.Size(150, 50)
                        });

                        var marker = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map,
                            title: address,
                            icon: {
                              url: markerUrl,
                              scaledSize: new google.maps.Size(47, 71)
                            }
                        });
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.open(map, marker);
                        });

                    } else {
                        console.log("+++");
                    }
                } else {
                  console.log("Status: " + status);
                    
                }
            });
        }
    }
    google.maps.event.addDomListener(window, 'load', initialize);
}

(function ($) {
	var methods = {
		init: function (options) {
			var p = {
				show: function (linkEl, landingItem) {}, 
				hide: function (linkEl, landingItem) {},
				topMargin: 0,
				speedFactor: 1
			};
			if (options) {
				$.extend(p, options);
			}
			return this.each(function () {
				var el = $(this);
				var elPos = el.offset().top;
				var wHalf = $(window).height()/2
				var scrollId = function(){};
				
				//assign events only links with anchors
				$('a[href^=\\#]',el).on('click',function() {
					var linkItem = $(this);
					if(!linkItem.is('.active')){
						var linkHref = linkItem.attr('href');
						var linkTarget = $(linkHref);
						var linkTargetPos = linkTarget.offset().top;
						var windowPos = $(window).scrollTop();
						var animDuration = linkTargetPos - windowPos
						if(animDuration < 0){
							animDuration = animDuration*-1	
						}
						//scroll the page to the desired block
						if(linkTarget.length){
							$('html, body').stop(true).animate({scrollTop:(linkTargetPos-parseFloat(p.topMargin))},1000,function(){
								$(window).trigger('scroll');
							});
						}
					}
					$("body").removeClass("mnu-open");
					$(".main-nmu-mob-close").removeClass("visible");
					$(".main-nmu-mob .header-nav-list").removeClass("visible");
					$(".main-nmu-mob-list li").removeClass("visible");
					return false;
				})
				//stop the animation by scrolling
				var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
				if (document.attachEvent) //if IE (and Opera depending on user setting)
					document.attachEvent("on"+mousewheelevt, function(e){
						$('html, body').stop(true);		
					});
				else if (document.addEventListener) //WC3 browsers
					document.addEventListener(mousewheelevt, function(e){
						//e.detail //direction
						$('html, body').stop(true);
					}, false)
				//highlight the desired link in the menu by scrolling
				$(window).on('scroll',function(e){
					clearTimeout(scrollId);
					var windowPos = $(window).scrollTop();
					if(windowPos > elPos){
						el.addClass('landingFix');	
					}else{
						el.removeClass('landingFix');	
					}
					scrollId = setTimeout(function(){
						$('.section-item').each(function(){
							var landingItem = $(this);
							var landingItemHeight = landingItem.height();
							var landingItemTop = landingItem.offset().top - wHalf;
							var linkHref = landingItem.attr('id');
							var linkEl = $('a[href="#'+linkHref+'"]',el);
							var status;

							if(windowPos > landingItemTop && windowPos < (landingItemTop + landingItemHeight)){
								if(!linkEl.parent().is('.active')){
									linkEl.parent().addClass('active');
									if (p.show !== undefined) {
										p.show(linkEl, landingItem);
									}
								}
							}else{
								if(linkEl.parent().is('.active')){
									linkEl.parent().removeClass('active');
									if (p.hide !== undefined) {
										p.hide(linkEl, landingItem);
									}
								}
							}
						});
					},100);
				})
				$(window).trigger('scroll');
			});
		}
	};
	$.fn.liLanding = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' in jQuery.liLanding does not exist');
		}
	};
	
})(jQuery);