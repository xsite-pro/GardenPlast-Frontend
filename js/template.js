// Получаем рандомное число

function getRandom(min, max) {
	var rand = Math.floor(Math.random() * (max - min + 1)) + min;
	return Math.floor(rand/min)*min;  
}
	
	
// Функция склонения слов после чисел
	
function declOfNum(number, titles) {  
	cases = [2, 0, 1, 1, 1, 2];  
	return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}  


function tpaneScroll()
{
	var $scrollTop = parseInt(jQuery(window).scrollTop()),
		$scrollPane = jQuery('body'),
		h=0,
		w = parseInt(jQuery(window).width())
		
	if($scrollTop > h)
	{
		if(!$scrollPane.hasClass('fix'))
			$scrollPane.addClass('fix')
	}
	else
	{
		if($scrollPane.hasClass('fix'))
			$scrollPane.removeClass('fix')
	}
}


jQuery(function($){
	
	// fancybox

	jQuery(".fancybox").fancybox(
	{
		'padding'			: 20,
		'width'				: 250,
		'height'			: "auto",
		'autoDimensions'	: false,
		'centerOnScroll'	: 'yes',
		'titleShow'			: false,
		'touch'				: false
	})

    jQuery('.gallery-icon a').fancybox(
	{
		'overlayShow': true, 
		'hideOnContentClick': true, 
		'overlayOpacity': 0.85
	})

	
	//tpaneScroll()
	//$(window).resize(function(){tpaneScroll()})
	//$(document).scroll(function(){tpaneScroll()})

	
	// Маска для телефона
	
	if($('input.phone').length)
		$('input.phone').inputmask("+7 (999) 999-99-99");
	
	if($('input[name=xs_phone]').length)
		$('input[name=xs_phone]').inputmask("+7 (999) 999-99-99");
	

	// Скролл к элементам с хэшем

	$('.xs_hash').click(function(event)
	{
		var height = parseInt(Math.round($($(this).attr('href')).offset().top)) - parseInt($('header').height())
		
		$('html, body').stop().animate({
			scrollTop: height
		}, 500, "linear")
		
		return false
	})
	
	
	// Выдвигаем адаптивное меню
	
	$('.buttonMenu').click(function()
	{
		$('body').toggleClass('show_menu')
	})
	
	$('header nav .menu_container .close').click(function()
	{
		$('body').removeClass('show_menu')
	})
	
	$(document).click(function(event)
	{
		if (
			$(event.target).closest("header nav .menu_container .menu_wrapper").length ||
			$(event.target).closest("header nav .buttonMenu").length 
		) return;

		$('body').removeClass('show_menu')

		event.stopPropagation();
	})

	
	// Скрытие селектора при клике вне его
	
	$(document).mouseup(function (e)
	{
		var div = $(".hide_click_away")
		
		if (!div.is(e.target) && div.has(e.target).length === 0) 
			div.hide();
	})
	
	
	// Активируем слайдер

	$('.xs_slider').slick({
  		slidesToShow: 3,
  		slidesToScroll: 1,
		arrows: false,
		infinite: false,
		touchMove: false,
		swipeToSlide: false,
		touchThreshold: false,
		swipe: false,
  		responsive: [
		{
		    breakpoint: 900,
		    settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
		    breakpoint: 600,
		    settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
			}
		}]
	});
	
	
	// Обратная связь
	
	$('a[href="#xs_recall"]').click(function()
	{
		var t = $(this).data('theme'),
			b = $(this).data('button'),
            d = $(this).data("description"),
			y = $(this).data('yandexid'),
			g = $(this).data('googleid')
			
		$('#xs_recall input[type=submit]').val(b)
		$('#xs_recall input[name=xs_theme]').val(t)
		$("#xs_recall .description").text(d)
		$('#xs_recall .title').text(t)
		
		if(y !== undefined)
			$('#xs_recall .xs_send_form').data('yandexid', y)
		else
			$('#xs_recall .xs_send_form').data('yandexid', '')
		
		if(g !== undefined)
			$('#xs_recall .xs_send_form').data('googleid', g)
		else
			$('#xs_recall .xs_send_form').data('googleid', '')
		
		$('.xs_result').text('');
	})
	
	if($('input[name=xs_link]').length > 0)
		$('input[name=xs_link]').val(window.location.href)
	
	$('.xs_send_form').on('submit', function(e)
	{
		e.preventDefault()
		
		var f = $(this),
			yandexid = f.data('yandexid'),
			googleid = $(this).data('googleid')
		
		f.addClass('xs_load')
		
		$.ajax({
			url: '/wp-content/themes/xs_business/load/mail.php',
			method: 'post',
			data: f.serialize(),
			success: function(data)
			{
				if(data != 'error')
				{
					//if(yandexid !== undefined && yandexid != '')
						//ym(50465191,'reachGoal', yandexid)
					
					//if(googleid !== undefined && googleid != '')
					//	ga('send', 'event', googleid);
					
					f.find('input[type=text],textarea,input[type=url],input[type=number],select,input[type=email],input[type=date],input[type=tel]').val('')
					f.find('.xs_result').html(data)
				}
				else
					alert('Ошибка при отправке данных. Пожалуйста заполните обязательное поле "Телефон"')
				
				
				f.removeClass('xs_load')
			}
		})
	})


	// разворот дочерних пунктов меню

	if( $(document).width() <= 960)
	{
		$('header nav ul li.menu-item-has-children > a').click(function(){
			
		
		 	$(this).toggleClass('rotate');

	        var menu = $(this).next(); 
	        if( $(menu).is(':visible')){
	            $(menu).slideUp(400);
	        }
	        else{
	            $(menu).slideDown(400);
	        }
			
			return false;
			
		});
	}

	// Прикрепление фото к форме

    $(document).on('change', '.work__upload-input', function(){
		if(jQuery(this).val() != '') 
		{
			jQuery(this).parents('.work__upload').find('.work__upload-text').html('Фото прикреплено')
		} 
		else 
		{
			jQuery(this).next('.attache').removeClass('hover').text('Прикрепите фото персонажа')
		}
    })

    // Main Slider
    $('.m-slider').slick({
  		slidesToShow: 1,
  		slidesToScroll: 1,
		arrows: true
	});

    // Advantages Slider
	$('.advantages__inner').slick({
  		slidesToShow: 5,
  		slidesToScroll: 1,
		arrows: true,
  		responsive: [
		{
		    breakpoint: 1000,
		    settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			}
		},
		{
		    breakpoint: 800,
		    settings: {
		        slidesToShow: 3,
		        slidesToScroll: 1
			}
		},
		{
		    breakpoint: 550,
		    settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1
			}
		}]
	});

	// Advantages Slider
	$('.news_inner').slick({
  		slidesToShow: 3,
  		slidesToScroll: 1,
		arrows: true,
  		responsive: [
		{
		    breakpoint: 1050,
		    settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
		    breakpoint: 750,
		    settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
			}
		}]
	});

	// Parrtners Slider
	$('.partners__inner').slick({
  		slidesToShow: 5,
  		slidesToScroll: 1,
		arrows: true,
  		responsive: [
		{
		    breakpoint: 1050,
		    settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			}
		},
		{
		    breakpoint: 850,
		    settings: {
		        slidesToShow: 3,
		        slidesToScroll: 1
			}
		},
		{
		    breakpoint: 650,
		    settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1
			}
		}]
	});

	// Cities extand
	$(document).on('click', '.cities__more', function(){

		var menu = $('.cities__ul')
		if($(menu).hasClass('cities__ul--short')){
			$(menu).removeClass('cities__ul--short')
			$(this).text('Скрыть')
		}
		else{
			$(menu).addClass('cities__ul--short')
			$(this).text('Все города')
		}

		return false;

	})

})
	
