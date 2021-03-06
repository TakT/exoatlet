jQuery(document).ready(function ($) {

	if ($('.wrapper').hasClass('page-main')) {
		function sectHeight() {
			if (window.matchMedia("(min-width: 1025px)").matches) {
				var h = $(window).outerHeight();
				$('.section-start').css({
					height: h
				});
			} else {
				$('.section-start').css({
					height: 'auto'
				});
			}
			/*var hCircle = $('.corner-circle').width();
		$('.corner-circle').css({height: hCircle});*/
		}

		sectHeight();
		$(window).on('resize', sectHeight);

		//ПЕРЕХОДЫ
		if (window.matchMedia("(min-width: 1025px)").matches) {
			var pinHome = document.getElementById('pinHome');

			var controller = new ScrollMagic.Controller();

			var sceneStart = new ScrollMagic.Scene({
					triggerElement: '.section-start',
					triggerHook: 'onLeave',
				})
				.setPin('.section-start').addTo(controller);

			/*$(window).on('scroll', function() {
			if ($(window).scrollTop() >= $('.section-for-home').offset().top) {
				$('.section-start').css({position: 'relative'});
			}
			else {
				$('.section-start').css({position: 'fixed'});
			}
		});*/

			var sceneHome = new ScrollMagic.Scene({
					triggerElement: '#triggerHome',
					triggerHook: 'onLeave'
				})
				.setPin(pinHome).addTo(controller);

			var sceneHospital = new ScrollMagic.Scene({
					triggerElement: '.section-pilots',
					triggerHook: 'onEnter'
				})
				.setPin('.section-for-hospital').addTo(controller);

			var sceneNumberAppear = new ScrollMagic.Scene({
					triggerElement: ".section-pilots",
					duration: 200,
					triggerHook: 0.4,
					reverse: false
				})
				.addTo(controller)
				.on("progress", function (e) {
					var opacity = e.progress.toFixed(2);
					if (opacity >= 1) {
						opacity = 1;
					}
					$("#tweenNumber").css({
						opacity: opacity
					});
				})
				.on("leave", function (e) {
					$(".section-pilots .section-title").animate({
						marginLeft: 0
					}, "slow", function () {
						setTimeout(function () {
							$('.container-descr').animate({
								left: 0
							});
						}, 500);
					});
				});

			var sceneNumberScale = new ScrollMagic.Scene({
					triggerElement: "#triggerScale",
					duration: $('.section-numbers').offset().top - $('#triggerScale').offset().top,
					triggerHook: 0.02,
					reverse: true
				})
				.addTo(controller)
				.on("enter", function (e) {
					$('.section-pilots .sect-overlay').fadeIn();
					$('.section-numbers .container').css({
						opacity: 0
					});
				})
				.on("progress", function (e) {
					var bgOp = e.progress.toFixed(5);
					var scale = e.progress.toFixed(3) * 10;
					var dir = e.target.controller().info("scrollDirection");
					if (scale <= 1) {
						scale = 1;
					}
					$("#tweenNumber").css({
						transform: 'scale(' + scale + ')'
					});
					$('.section-pilots .sect-overlay, .section-numbers .sect-inner').css({
						backgroundColor: 'rgba(0, 174, 239, ' + bgOp + ')'
					});
					$('.section-numbers .container').css({
						opacity: bgOp
					});
				});
		}

		/*if (window.matchMedia("(max-width: 1024px)").matches) {
		controller.enabled(false);
	}*/

		//ИНДИКАЦИЯ ШАГОВ
		/*$(window).on('scroll', function () {
					var $steps = $('.container-screen-steps'),
						posTopSteps = $steps.offset().top;

					$('.section').each(function () {
				var sectTop = $(this).offset().top;
				var num = ($(this).index()) - 1;
				if (posTopSteps >= sectTop) {
					$steps.find('p').eq(num).addClass('filled');
					if ($(this).hasClass('dark-bg')) {
						$steps.removeClass('black black-white');
					} else if ($(this).hasClass('light-bg')) {
						$steps.addClass('black');
						$steps.removeClass('white black-white');
					} else if ($(this).hasClass('blue-bg')) {
						$steps.addClass('black-white');
						$steps.removeClass('black white');
					} else if ($(this).hasClass('section-start')) {
						$steps.removeClass('black black-white');
					} else if ($(this).hasClass('section-for-hospital')) {
						$steps.removeClass('black black-white');
					}
				} else {
					$steps.find('p').eq(num).removeClass('filled');
				}
			});
			if (posTopSteps >= $('.section-for-hospital').offset().top) {
				$steps.find('p').eq(2).addClass('filled');
			} else {
				$steps.find('p').eq(2).removeClass('filled');
			}
			if (posTopSteps >= $('footer').offset().top) {
				$steps.css({
					opacity: 0
				});
			} else {
				$steps.css({
					opacity: 1
				});
			}
		});*/

		//НАБОР ТЕКСТА НА ГЛАВНОЙ
		$('#containerDescrTyped').typed({
			stringsElement: $('#typed-text'),
			showCursor: false,
			callback: function () {
				$('#containerDescrTyped').prepend($('.link-in-typed'));
			}
		});

		//ВКЛЮЧЕНИЕ ВИДЕО
		$('.section-start .btn-play').on('click', function () {
			// $('.corner-circle').animate({width: '10000px', height: '10000px'});
			$('.corner-circle').addClass('clicked');
			setTimeout(function () {
				$('.container-start').hide();
				$('.container-start-video').show();
				document.getElementById('startVideo').play();
			}, 1000);
		});

		//ДВИЖЕНИЕ ИЗОБРАЖЕНИЙ В СЕКЦИИ ДЛЯ ДОМА
		function containerW(o, l) {
			var l = 0;
			o.children().each(function () {
				l += $(this).outerWidth(true);
			});
			return l;
		}
		$(window).on('resize', function () {
			var movedW = containerW($('.container-moved'));
			$('.container-moved').css('width', movedW);
		});
		var slidesQuant = $('.container-moved').children().length;
		$('.container-slide-numbers .all span').text(slidesQuant);
		var movedW = containerW($('.container-moved'));
		$('.container-moved').css('width', movedW);
		var act = true;



		


		var posMovedTop2 = $('.section-for-home .slick-home').offset().top-300;
		var posMovedTop3 = $('.section-for-home .slick-home').offset().top+250;
		var act = true;
		var scrollPos = 0;
		$(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
			delta = parseInt(event.originalEvent.wheelDelta || -event.originalEvent.detail);
			screenPos = $(window).scrollTop();
			if (screenPos >= posMovedTop2 && screenPos <= posMovedTop3 && $( document ).width()>=1024) {
				// event.preventDefault();
						event.stopPropagation();
				if (delta >= 0) {
					if ($('#pinHome').find('.slick-center').next().index() != 1) {
							window.scrollTo(0, posMovedTop2);
						// movedLeft += step;
						// console.log('stop');
						event.preventDefault();
						event.stopPropagation();
						$('.slick-home').slick('slickPrev');
						slideNum2 = $('#pinHome').find('.slick-center').index()+1;
						$('#slControlsHome .container-slide-numbers .current').text(slideNum2);
					}
				} else {
					console.log($('#pinHome').find('.slick-center').index());
				  	if ($('#pinHome').find('.slick-center').index()+1 != 5) {
						event.preventDefault();
						event.stopPropagation();
						// console.log('stop2');
						slideNum2 = $('#pinHome').find('.slick-center').next().index()+1;
						window.scrollTo(0, posMovedTop2);
						$('.slick-home').slick('slickNext');
						$('#slControlsHome .container-slide-numbers .current').text(slideNum2);
					}
				  
				}				
			}
		});
		// $(window).on('scroll', function (ee) {
		// 	// var posMovedTop = $('.section-for-home .slick-home').offset().top - $(window).outerHeight() * 0.45,
		// 	// 	posMovedBottom = posMovedTop + 300;
		// 	screenPos = $(window).scrollTop();
		// 	// console.log(screenPos);
		// 		// if (screenPos >= posMovedTop & screenPos <= posMovedBottom & act) {?
		// 		// console.log(screenPos);
		// 		// console.log(posMovedTop2);
		// 		// console.log(posMovedTop3);
		// 	if (screenPos >= posMovedTop2-50 && screenPos <= posMovedTop3+50 && $( document ).width()>=1024) {
		// 		act = true;
		// 	}
		// 	if (screenPos >= posMovedTop2 && screenPos <= posMovedTop3 && $( document ).width()>=1024) {
		// 	// if (screenPos >= posMovedTop2+200 && screenPos <= posMovedTop2+200 && $( document ).width()>=1024) {
		// 		 // console.log('visible');		
		// 		ee.preventDefault();
		// 		ee.stopPropagation();
		// 		// console.log('visible');
		// 		// window.scrollTo(0, posMovedTop2);

				   					
		// 	// if ($(document).scrollTop() + $(window).height() > $('.section-for-home .slick-home').offset().top && $(document).scrollTop() - $('.section-for-home .slick-home').offset().top < $('.section-for-home .slick-home').height()) {

		// 	// $( ".section-for-home" ).hover(
  // 	// 		function() {
				

		// 		var activatorL = true,
		// 			activatorR = true;

		// 		$('html, body').on('mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function() {
  //                  $('html, body').stop();
  //               });
  //               var st = $(window).scrollTop();
  //               // console.log(st);
  //               // console.log(scrollPos);
		// 						// window.scrollTo(0, posMovedTop2);
		// 		if (st > scrollPos){
		// 			// down
		// 			console.log('down');
					
		// 		 	if ($('#pinHome').find('.slick-center').index()+1 != 5) {
		// 				ee.preventDefault();
		// 				ee.stopPropagation();
		// 				// console.log('stop2');
		// 				window.scrollTo(0, posMovedTop2);
		// 				slideNum2 = $('#pinHome').find('.slick-center').index()+1;
		// 				$('.slick-home').slick('slickNext');
		// 				$('#slControlsHome .container-slide-numbers .current').text(slideNum2);
		// 			}
		// 			else {
		// 				activatorR = false;
		// 				act = false;
		// 			}
		// 		} else {
		// 			 // up
		// 			 console.log('up');
		// 					// window.scrollTo(0, posMovedTop2);
		// 			 // console.log($('#pinHome').find('.slick-center').next().index());
		// 			if ($('#pinHome').find('.slick-center').next().index() != 1) {
		// 					window.scrollTo(0, posMovedTop2);
		// 				// movedLeft += step;
		// 				// console.log('stop');
		// 				ee.preventDefault();
		// 				// ee.stopPropagation();
		// 				$('.slick-home').slick('slickPrev');
		// 				slideNum2 = $('#pinHome').find('.slick-center').index()+1;
		// 				$('#slControlsHome .container-slide-numbers .current').text(slideNum2);
		// 			}
		// 			else {
		// 				// movedLeft = $(window).outerWidth();
		// 				// activatorR = false;
		// 				// $(window).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');
		// 				// console.log('scroll2');
		// 				// movedLeft -= 150;
		// 				act = false;
		// 			}
		// 			// $moved.css('marginLeft', movedLeft);
		// 			// activatorL = true;
		// 			// console.log('scroll1');
		// 		}
		// 		   scrollPos = st;




		// 			// event.preventDefault();

		// 				// var wImg = $('.container-moved').children().first().outerWidth(true),
		// 				// 	visible = $(window).width() - movedLeft,
		// 				// 	act2 = true;
		// 				// $('.container-moved').children().each(function () {

		// 				// 	if (visible <= wImg & act2) {
		// 				// 		slideNum = $(this).index() + 1;
		// 				// 		if (visible <= 3) {
		// 				// 			slideNum = 3;
		// 				// 		}
		// 				// 		act2 = false;
		// 				// 	} else if (act2) {
		// 				// 		wImg += $(this).outerWidth(true);
		// 				// 	}
		// 				// });
		// 				// if (slideNum == 5) {
		// 				// 	$('#slControlsHome').find('.visible-arr').removeClass('visible-arr');
		// 				// 	$('#movedLeft').addClass('visible-arr');
		// 				// } else {
		// 				// 	$('#slControlsHome').find('.visible-arr').removeClass('visible-arr');
		// 				// }
		// 				// $('#slControlsHome .current').text(slideNum);
				
		// 	// });
		// 	}
		// });
		$('.slick-home').on('swipe', function(event, slick, direction){
			slideNum2 = $(this).parents('#pinHome').find('.slick-center').index()+1;
			$('#slControlsHome .container-slide-numbers .current').text(slideNum2);
		});

		$('#movedLeft').on('click', function () {
			var visible = $(window).width() - parseInt($('.section-for-home .container-moved').css('marginLeft')),
				wImg = $('.container-moved').children().first().outerWidth(true),
				activatorArrL = true,
				mov = 0,
				marg = 0,
				slideNum = 0;
			$('.container-moved').children().each(function () {
				if (wImg > visible & activatorArrL) {
					mov = wImg - visible;
					marg = parseInt($('.container-moved').css('marginLeft')) - mov;
					activatorArrL = false;
					if ($(this).index() == 4) {
						$('.slControlsHome').find('.visible-arr').addClass('visible-arr');
						$('#movedLeft').addClass('visible-arr');
					} else {
						$('#slControlsHome').find('.visible-arr').removeClass('visible-arr');
					}
					slideNum = $(this).index() + 1;
				} else {
					wImg += $(this).outerWidth(true);
				}
			});
			if (($('.container-moved').offset().left - mov + $('.container-moved').outerWidth()) <= $(window).outerWidth()) {
				marg -= $('.container-moved').offset().left + $('.container-moved').outerWidth() - $(window).outerWidth() - mov;
			}
			$('.container-moved').animate({'marginLeft':marg},500);
			$('#slControlsHome .current').text(slideNum);
			slideNum2 = $(this).parents('#pinHome').find('.slick-center').prev().index()+1;
			$('#slControlsHome .container-slide-numbers .current').text(slideNum2);
		});
		$('#movedRight').on('click', function () {
			var visible = $(window).width() - parseInt($('.section-for-home .container-moved').css('marginLeft')),
				wImg = $('.container-moved').children().first().outerWidth(true),
				activatorArrR = true,
				marg = 0,
				slideNum = 0;
			$('.container-moved').children().each(function () {
				if (wImg > visible & activatorArrR) {
					var mov = $(this).outerWidth(true) - (wImg - visible);
					if (mov == 0) {
						mov = $(this).outerWidth(true);
						slideNum = $(this).index() - 1;
						if (slideNum < 0) {
							slideNum = 0;
						}
					} else {
						slideNum = $(this).index();
					}
					marg = parseInt($('.container-moved').css('marginLeft')) + mov;
					activatorArrR = false;

					if ($(this).index() == 1) {
						// $('.slControlsHome').find('.visible-arr').addClass('visible-arr');
						$('#movedRight').addClass('visible-arr');
					} else {
						$('#slControlsHome').find('.visible-arr').removeClass('visible-arr');
					}

				} else {
					wImg += $(this).outerWidth(true);
				}
			});
			slideNum2 = $(this).parents('#pinHome').find('.slick-center').next().index()+1;
			$('.container-moved').animate({'marginLeft':marg},500);
			$('#slControlsHome .current').text(slideNum);
			$('#slControlsHome .container-slide-numbers .current').text(slideNum2);
		});
	}

	//СЛАЙДЕРЫ
	$('.slick-home').slick({
		slidesToShow: 1,
		infinite: false,
		mobileFirst: true,
		centerMode: true,
		slideToScroll: 1,
		// variableWidth: 270,
		// dots: true,
		// variableWidth: true,
		appendArrows: $('#slControlsHome'),
		prevArrow: $('#movedLeft'),
		nextArrow: $('#movedRight'),
		responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 3,
		        slideToScroll: 1,
				infinite: false,
				mobileFirst: true,
				centerMode: true,
				// variableWidth: 270,
				// dots: true,
				// variableWidth: true,
				appendArrows: $('#slControlsHome'),
				prevArrow: $('#movedLeft'),
				nextArrow: $('#movedRight'),
		      }
		    }
		    // You can unslick at a given breakpoint now by adding:
		    // settings: "unslick"
		    // instead of a settings object
		  ]
	});
	$('.slick-hospital').slick({
		slidesToShow: 3,
		variableWidth: true,
		infinite: false,
		// dots: true,
		appendArrows: $('#slControlsHospital'),
		prevArrow: $('#slLeftHospital'),
		nextArrow: $('#slRightHospital')
	});
	var quantHospSlides = $('.slick-hospital .slick-slide[role = option]').length;
	$('#slControlsHospital .all span').text(quantHospSlides);
	$('.slick-hospital').on('afterChange', function (currentSlide) {
		var currentSlide = $('.slick-hospital').slick('slickCurrentSlide') + 1;
		$('#slControlsHospital .current').text(currentSlide);
	});

	//ФОРМЫ ВХОДА
	$('.switch-enter a, #footerEnter').on('click', function () {
		$('body').addClass('modal__opened').prepend('<div class="overlay"></div>');
		
		if ($( document ).width()<768) {
			$(this).parents('.container-enter').show();
		}
		else {
			$('.container-enter').animate({'right':0},500);		
		}

	});
	$('.mob-enter a').on('click', function () {
		$('body').prepend('<div class="overlay"></div>');
		// $('.container-top-menu').toggleClass('opened');
		$('.container-enter').fadeIn();
	});
    $(document).mouseup(function (e) {
	    var container = $(".container-enter");
	    var container2 = $(".container-top-menu");
	    if ((container.has(e.target).length === 0) && (container2.has(e.target).length === 0) && ($( document ).width()>768)){
	    	// console.log('sdfsdf');
	        if ($('.container-top-menu').hasClass('opened')) {
				$('.container-top-menu').removeClass('opened');
			}
			$('body .overlay').remove();
			$('body').removeClass('modal__opened');
	        $('.container-enter').animate({'right':-600},500);
	    }
	});
	$('.container-enter .close-form').on('click', function () {
		if ($('.container-top-menu').hasClass('opened')) {
			$('.container-top-menu').removeClass('opened');
			$('body').removeClass('modal-hidden');
		}
		if ($( document ).width()<768) {
			$(this).parents('.container-enter').hide();
		}
		else {
			$(this).parents('.container-enter').animate({'right':-600},500);			
		}
		$('body .overlay').remove();
		$('body').removeClass('modal__opened');
	});

	$('.container-switches a').on('click', function () {
		$(this).parents('.container-enter').addClass('container-bg');
		$('.tab-content .tab-pane').find('.container-forgotten-passw').hide();
		$('.tab-content .tab-pane').find('.container-enter-form').show();
	});
	$('.container-enter .form-control').on('focusin', function () {
		$(this).parents('.form-group').toggleClass('current');
	});
	$('.container-enter .form-control').on('focusout', function () {
		$(this).parents('.form-group').toggleClass('current');
	});
	$('.forgotten-passw').on('click', function () {
		$(this).parents('.container-enter-form').hide().siblings('.container-forgotten-passw').show();
	});
	$('.link-registr').on('click', function () {
		$(this).parents('.container-inner').children().not('.close-form').hide();
		$('.container-registr-form').show();
		$('.container-enter').addClass('container-enter-abs');
		console.log($(window).width());
		if ($(window).width()<768) {
			$('body').addClass('modal-hidden');			
		}
	});
	$('.link-back').on('click', function () {
		$('.container-enter .container-inner').children().show();
		$('.container-registr-form').hide();
		$('.container-enter').removeClass('container-enter-abs');
	});


	$('.btn-mob-menu, .close-mob-menu').on('click', function () {

		if ($(this).parent().hasClass('container-btn-menu-form')) {
			$('.container-enter:first').fadeOut();
			$('body .overlay').remove();
		} else {
			$('.container-top-menu').toggleClass('opened');
		}
		$('body').removeClass('modal-hidden');		
	});




	// only for demo purposes
	// $.validator.setDefaults({
	// 	submitHandler: function() {
	// 		alert("submitted!");
	// 	}
	// });

	// 	// validate the form when it is submitted
	// 	var validator = $("#form").validate({
	// 		errorPlacement: function(error, element) {
	// 			// Append error within linked label
	// 			$( element )
	// 				.closest( "form" )
	// 					.find( "label[for='" + element.attr( "id" ) + "']" )
	// 						.append( error );
	// 		},
	// 		errorElement: "span",
	// 		messages: {
	// 			fizLogin: {
	// 				required: " (required)",
	// 				minlength: " (must be at least 3 characters)"
	// 			},
	// 			password: {
	// 				required: " (required)",
	// 				minlength: " (must be between 5 and 12 characters)",
	// 				maxlength: " (must be between 5 and 12 characters)"
	// 			}
	// 		}
	// 	});

	// 	$(".cancel").click(function() {
	// 		validator.resetForm();
	// 	});


	// $('#form').validate(
 //        {   
 //            // правила для проверки
 //            rules:{
 //                firstname: {
 //                    required: true,
 //                    minlength: 2,
 //                    maxlength: 30
 //                    }   
 //            },

 //            // выводимые сообщения при нарушении соответствующих правил
 //            messages:{
 //                "fizLogin":{
 //                    required: "Заполните это поле",
 //                    minlength: "От 2 до 30 символов",
 //                    maxlength: "От 2 до 30 символов"
 //                }                       
 //            },

 //            // указаваем обработчик
 //            submitHandler: function(form){
 //                $(form).ajaxSubmit({
 //                    target: '#preview', 
 //                    success: function() { 
 //                        $('#contact_form').slideUp("fast", function(){
 //                        $(this).before($("<div id='checkmark'><img src='img/check.png'><p>Ваша заявка принята!</p></div>").delay(6000));                                
 //                         }
 //                         ).delay(6000).slideDown('fast',function() {$(this).prev().remove();});
 //                         $("#form").clearForm();
 //                        }                               
 //                    }) 
 //                    } 
 //    }); 


 $( "#form" ).validate( {
				rules: {
					firstname: "required",
					lastname: "required",
					fizLogin: {
						required: true,
						minlength: 2
					},
					password: {
						required: true,
						minlength: 5
					},
					confirm_password: {
						required: true,
						minlength: 5,
						equalTo: "#password"
					},
					email: {
						required: true,
						email: true
					},
					agree: "required"
				},
				messages: {
					firstname: "Please enter your firstname",
					lastname: "Please enter your lastname",
					username222: {
						required: "Please enter a username",
						minlength: "Your username must consist of at least 2 characters"
					},
					password: {
						required: "Please provide a password",
						minlength: "Your password must be at least 5 characters long"
					},
					confirm_password: {
						required: "Please provide a password",
						minlength: "Your password must be at least 5 characters long",
						equalTo: "Please enter the same password as above"
					},
					email: "Please enter a valid email address",
					agree: "Please accept our policy"
				},
				// errorElement: "em",
				// errorPlacement: function ( error, element ) {
				// 	// Add the `help-block` class to the error element
				// 	error.addClass( "help-block" );

				// 	if ( element.prop( "type" ) === "checkbox" ) {
				// 		error.insertAfter( element.parent( "label" ) );
				// 	} else {
				// 		error.insertAfter( element );
				// 	}
				// },
				highlight: function ( element, errorClass, validClass ) {
					$( element ).parents( ".form-group" ).addClass( "has-error" ).removeClass( "has-success" );
				},
				unhighlight: function (element, errorClass, validClass) {
					$( element ).parents( ".form-group" ).addClass( "has-success" ).removeClass( "has-error" );
				}
			} );

});
