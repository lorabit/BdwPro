var version = '20150327';
var localStoragePrefix = 'older_lorabit_com_';
$(function(){
	$('.login-btn').on('tap',function(){
		login($('#login-phone').val(),$('#login-password').val(),function(){
			$.mobile.changePage('#start-page',{transition:'slide'});
		});
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
function loadLoginPage(){
	$.mobile.changePage('#login-page',{transition:'slide'});
}

var server_address = 'http://older.lorabit.com/';
function getToken(callback){
	var token = window.localStorage[localStoragePrefix+'token'];
	if(token!=null){
		callback(token);
		return;
	}
	var phone = window.localStorage[localStoragePrefix+'phone'];
	var password = window.localStorage[localStoragePrefix+'password'];
	if(phone==null||password==null){
		loadLoginPage();
		return;
	}
	login(phone,password,callback);
}

function login(phone,password,callback){
	console.log(phone,password);
	$.ajax({
		url: server_address+'app/auth/login',
		data: {
			phone:phone,
			password:password
		},
		success:function(json){
			if(json.success==1){
				window.localStorage[localStoragePrefix+'token'] = json.token;
				callback(json.token);
				return;
			}

			alert('登陆失败...');
			//提示错误
		},
		error:function(){
			//提示错误
			alert('网络异常...');
		}
	});
}

function raw_post(url,data,success,failure,retry){
	retry = retry || 1;
	$.ajax({
		url:url+'?token='+getToken()+'&version='+version,
		data:data,
		dataType:'json',
		success:function(json){
			if(json.token_failed == 1){
				if(retry==1)
					getToken(raw_post(url,data,success,failure,retry+1));
				else
					failure(json);
				return;
			}
			success(json);
		},
		error:function(json){
			failure(json);
		}
	});
}