$(function(){
	$('.login-btn').on('tap',function(){
		$.mobile.changePage('#start-page',{transition:'slide'});
	});

	$('#start-page .start-btn').on('tap',function(){
		$.mobile.changePage('#basic-page',{transition:'slide'});
	});
	$('#basic-page .start-btn').on('tap',function(){
		numberPageInit();
		$.mobile.changePage('#number-page',{transition:'slide'});
	});

	$('#number-page .next-btn').on('tap',function(){
		$.mobile.changePage('#text-page',{transition:'slide'});
	});
	$('#text-page .next-btn').on('tap',function(){
		$.mobile.changePage('#radio-page',{transition:'slide'});
	});


});

function numberPageInit(){
	 $( ".slider-input" ).slider({
      stop: function( event, ui ) {

        console.log($(this).val());
      }
    }).on('change',function(){
        $('.slider-value').text($(this).val());
    });
}