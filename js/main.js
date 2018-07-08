$(document).ready(function() {
	var getDate = function(){
		var d = new Date(),
		year = d.getFullYear(),
		day = d.getDate(),
		month = d.getMonth(),
		hrs = d.getHours(),
		min = d.getMinutes();

		var monthArray = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");
		var actualDate = `${day} ${monthArray[month]} ${year} года ${hrs} часов ${min} минут`
		return actualDate;
	}

	var countTwitts = function(){
		var twittCounter = $('.twitt-card').length;
		$('#twittCount').text(twittCounter);
	}

	var wrapURLs = function (text, new_window) {
		var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
		var target = (new_window === true || new_window == null) ? '_blank' : '';

		return text.replace(url_pattern, function (url) {
			var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
			var href = protocol_pattern.test(url) ? url : 'http://' + url;
			return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
	 	});
	};

	var createTwitt = function(date, text){
		var $twittBox = $('<div class="card twitt-card">');
		var $twittDate = $('<div class="twitt-date">').text(date);
		var $twittTxt = $('<div class="twitt-text">').html(wrapURLs(text)).wrapInner('<p></p>');
		
		var additionalClassName;
		if ( text.length < 100 ) {
			additionalClassName = 'font-size-large';
		} else if ( text.length > 150 ) {
			additionalClassName = 'font-size-small';
		} else {
			additionalClassName = 'font-size-normal';
		}

		$twittTxt.addClass(additionalClassName);

		$twittBox.append($twittDate).append($twittTxt);
		$('.listTwitt').prepend($twittBox);

		countTwitts();
	}

	var twittsBase = [ 
	{
		date: '07 июля 2018 13 часов 45 минут',
		text: 'Создала каркас клон-твиттера. Огромное спасибо http://webcademy.ru'
	}, {
		date: '08 июля 2018 10 часов 15 минут',
		text: 'Скоро еще один урок. Будет круто!'
	}, {
		date: '09 июля 2018 21 часов 35 минут',
		text: 'Здесь будет много текста. Здесь будет много текста. Здесь будет много текста. Здесь будет много текста. Здесь будет много текста. Здесь будет много текста. Здесь будет много текста.'
	}];

	twittsBase.forEach( function(twitt){
		createTwitt(twitt.date, twitt.text);
	});


    $('#postNewTwitt').on('submit', function(e){
		e.preventDefault();
		var twittText = $('#textTwitt').val();
		createTwitt(getDate(), twittText);
		$('#textTwitt').val('');
	});
});