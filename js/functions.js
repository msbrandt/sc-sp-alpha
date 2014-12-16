jQuery(function($){
	var fader = $('#sli');
	var activate = $('.active-deck-button');
	var toggle_buttons = $('.toggle-button');
	var tracks = $('#loaded-playlist > ul > li');
	var volume = $('.v-slider').children();
	var audio_a = $('#au-a'),
		audio_b = $('#au-b');
	var wave_scrub = $('.wave-prog');

	SC.initialize({
	  client_id: '7d9677620e4d860d055604be6c25d43a'
	});

	volume.on('input', function(){
		var this_slider = $(this),
			volume_level = this_slider.val();

		if(this_slider.is('#vo-a')){
			this_deck = $('#deck-a');
		}else{
			this_deck = $('#deck-b');
		}
		this_deck.find('audio').prop('volume', volume_level);

	});

	fader.on('input', function(){
		var the_val = parseFloat(fader.val());
		var deck_a = document.getElementsByTagName('audio')[0],
			deck_b = document.getElementsByTagName('audio')[1];

		if(the_val < 0){
			var change_val = 1+(the_val);
			console.log(change_val)
			$(deck_b).prop('volume', change_val);
			// console.log(deck_b.volume);
		}else{
			var change_val = the_val;
			console.log(change_val);
			$(deck_a).prop('volume', change_val);
		}
		// console.log(the_val);
	});

	wave_scrub.on('change', function(){
		var the_scrub = $(this),
			this_deck = the_scrub.parent().parent(),
			new_val = the_scrub.val();
		console.log(the_scrub);
		var this_ct = convert_time(new_val);
		// if(this_deck.is('#deck-a')){
		// 	// console.log(document.getElementsByTagName('audio')[0]);
		$('#deck-a').find('audio')[0].currentTime = parseInt(new_val);
		// }else{
		// 	document.getElementsByTagName('audio')[1].currentTime = parseFloat(new_val);
		// }
		// the_audio.currentTime = new_val;
		// console.log(parseInt(new_val));

		this_deck.find('.wave-prog').attr('value', parseInt(new_val)); 
		// this_deck.find('.current-time').text(this_ct);
		
		// console.log(this_deck);
	});

	audio_a.on('timeupdate', function(){
		var this_audio = document.getElementsByTagName('audio')[0];
		var ct_raw = this_audio.currentTime;
		var dt_raw = this_audio.duration;
		var ct = Math.floor(this_audio.currentTime);
		var m = Math.floor(ct/60);
		var s = ct - m *60;

		if(s > -1 && s < 10){
			var use_s = '0'+s;
		}else{
			var use_s = s;
		}
		var this_CT = m + ':' +use_s;
		var scrb_time = ct_raw*1000;
		var x = Math.floor((ct_raw / dt_raw)*100);

		$('#deck-a .current-time').text(this_CT);

		$('#deck-a .wave-prog').attr('value', scrb_time);

		if(ct_raw >= dt_raw){
			$('#deck-a .vinyl').removeClass('acvitve-v');
			$('#tog-a').removeClass('sc-play').addClass('sc-stop');
			$('#tog-a').children().removeClass('glyphicon-pause').addClass('glyphicon-play');
		}
	});

	audio_b.on('timeupdate', function(){
		var this_audio = document.getElementsByTagName('audio')[1];
		var ct_raw = this_audio.currentTime;
		var dt_raw = this_audio.duration;
		var ct = Math.floor(this_audio.currentTime);
		var m = Math.floor(ct/60);
		var s = ct - m *60;

		if(s > -1 && s < 10){
			var use_s = '0'+s;
		}else{
			var use_s = s;
		}
		var current_time = m + ':' +use_s;
		$('#deck-b .current-time').text(current_time);
		
		if(ct_raw >= dt_raw){
			$('.vinyl').removeClass('acvitve-v');
			$('#tog-b').removeClass('sc-play').addClass('sc-stop');
			$('#tog-b').children().removeClass('glyphicon-pause').addClass('glyphicon-play');
		}
	});



	toggle_buttons.click(function(e){
		e.preventDefault();
		var the_toggle = $(e.currentTarget),
			the_player_id = the_toggle.parent().find('audio').attr('id'),
			the_player = document.getElementById(the_player_id),
			the_vinyl = the_toggle.parent().find('.vinyl');

		if(the_toggle.hasClass('sc-stop')){
			the_toggle.removeClass('sc-stop').addClass('sc-play');
			the_toggle.children().removeClass('glyphicon-play').addClass('glyphicon-pause');
			the_vinyl.addClass('acvitve-v');
			the_player.play();

		}else if(the_toggle.hasClass('sc-play')){
			the_toggle.removeClass('sc-play').addClass('sc-stop');
			the_toggle.children().removeClass('glyphicon-pause').addClass('glyphicon-play');
			the_vinyl.removeClass('acvitve-v');
			the_player.pause();
		};

	});
	
	activate.click(function(e){
		var tog_btn = $(this);
		var the_deck = tog_btn.parent();
		var the_vinyla = tog_btn.prev();
		var the_player_ID = the_deck.find('audio').attr('id');
		var the_player = document.getElementById(the_player_ID);
		
		if(!activate.hasClass('has-been')){
			the_deck.find('audio').prop('volume', 1);
			
			if(the_deck.is('#deck-a')){
				$('#v-a').children().attr('value', 1);
			}else{
				$('#v-b').children().attr('value', 1);
			}
		}

		activate.removeClass('active');
		activate.children().removeClass('glyphicon-remove-sign');
		
		tog_btn.addClass('active has-been');
		tog_btn.children().addClass('glyphicon-remove-sign');

		$('audio').removeClass('active-p');
		the_vinyla.addClass('active-p');

	});

	tracks.click(function(e){
		e.preventDefault();
		var this_track_obj = $(this),
			this_track_txt = this_track_obj.text(),
			this_track_id = this_track_obj.data('id'),
			this_duration = this_track_obj.data('duration'),
			this_wave = this_track_obj.data('art');

		var the_duration = convert_time(this_duration);

		var to_add = $('.active-deck-button.active').parent().children('.display').children('.now-playing');
		var this_deck = $('.active-deck-button.active').parent();
		var	dt = this_deck.find('.total-time');
		var wavee = this_deck.find('.progres');

		var the_player_id = $('.audio.active-p').attr('id');
		var this_player = document.getElementById(the_player_id);
		console.log(this_duration);

		to_add.text(this_track_txt);
		dt.text(the_duration);

		this_deck.find('.wave-prog').attr('max', this_duration);
		wavee.css('background-image', 'url("'+this_wave+'")');
		
		SC.stream('tracks/'+this_track_id, function(sound){
			var raw_url = sound.url,
				split_url = raw_url.split('.com');
				use_url = split_url[0]+'.com/'+split_url[1];

			this_player.setAttribute("src", use_url);
		});
		this_player.load();
		
	});

	function convert_time(time){
		var minutes = Math.floor((time % 3600000) / 60000);
		var sec = Math.floor(((time % 360000) % 60000) / 1000);
		// console.log(sec);
			
		if(sec > 0 && sec < 10){
			if(sec < 6){
				var use_sec = '0'+Math.ceil(sec);
			}else{
				var use_sec = '10';
			}
			// console.log(use_sec);
			// if(sec.length=1){
			// 	console.log('less');
			// }
		}else{
			var use_sec = sec;
		}
		var the_time = minutes + ':' + use_sec;
		return the_time; 
	};

});