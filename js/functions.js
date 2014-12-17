jQuery(function($){
	var decks = $('.deck'),
		audios = decks.find('audio');
	var fader = $('#sli');
	var activate_btn = $('.active-deck-button');
	var toggle_btns = $('.toggle-button');
	var loaded_tracks = $('#loaded-playlist > ul > li');
	var volume_controls = $('.v-slider').children('.vo-slider');
	var wave_scrub = $('.wave-prog');


	$(window).on('load', function(){
		volume_controls.attr('value', 1);
		fader.attr('value', 0);
		wave_scrub.attr('value', 0);
	});

	SC.initialize({
  		client_id: '7d9677620e4d860d055604be6c25d43a'
	});

	activate_btn.on('click', function(e){
		var tog_btn = $(this),
			act_this_deck = tog_btn.parent(),
			the_vinyl = act_this_deck.find('.vinyl');

		activate_btn.removeClass('active');
		activate_btn.children().removeClass('glyphicon-remove-sign');
		
		tog_btn.addClass('active has-been');
		tog_btn.children().addClass('glyphicon-remove-sign');

		$('audio').removeClass('active-p');
		the_vinyl.addClass('active-p');

	});

	loaded_tracks.on('click', function(e){
		e.preventDefault();
		var this_track_obj = $(this),
			this_track_txt = this_track_obj.text(),
			this_track_id = this_track_obj.data('id'),
			this_duration = this_track_obj.data('duration'),
			this_wave = this_track_obj.data('art');

		var l_this_deck = $('.active-deck-button.active').parent(),
			active_deck = l_this_deck.find('audio');

		var dt_lb = l_this_deck.find('.total-time'),
			wave_lb = l_this_deck.find('.progress');
		
		var text_durration = convert_time(this_duration);

		dt_lb.text(text_durration);
		wave_lb.css('background-image', 'url("'+this_wave+'")');
		l_this_deck.find('.wave-prog').attr('max', this_duration).attr('value', 0);
		l_this_deck.find('.now-playing').text(this_track_txt);
		
		SC.stream('tracks/'+this_track_id, function(sound){
			var raw_url = sound.url,
				split_url = raw_url.split('.com');
				use_url = split_url[0]+'.com/'+split_url[1];
			active_deck.prop('src', use_url);
			// active_deck.prop('defaultPlaybackRate', 0.5);
			// console.log(active_deck.prop('defaultPlaybackRate'));
			active_deck.load();

		});
		
	});

	volume_controls.on('input', function(){
		var this_control = $(this),
			control_id = this_control.attr('id'),
			vol_this_deck = $('section').find("[data-volume_control='"+control_id+"']"),
			volume_level = this_control.val();

		vol_this_deck.find('audio').prop('volume', volume_level);
	});

	fader.on('input', function(){
		var fader_value = parseFloat(fader.val());
		if(fader_value > 0){
			var new_volume_level = 1,
				silance_volume_level = 1 - fader_value;
				fd_this_deck = $('#deck-b'),
				silance_deck = $('#deck-a');
		} else if(fader_value < 0){
			var new_volume_level = 1,
				silance_volume_level = 1 - (-fader_value),
				fd_this_deck = $('#deck-a'),
				silance_deck = $('#deck-b');
		}else if(fader_value == 0){
			var fd_this_deck = $('#deck-a'),
				silance_deck = $('#deck-b'),
				new_volume_level = 1,
				silance_volume_level = 1;
		}

		fd_this_deck.find('audio').prop('volume', new_volume_level);
		silance_deck.find('audio').prop('volume', silance_volume_level);
	});

	wave_scrub.bind('change', function(){
		var this_scrub = $(this),
			wv_this_deck = this_scrub.parents(':eq(1)'),
			wv_this_audio = wv_this_deck.find('audio'),
			wv_ct_lb = wv_this_deck.find('.current-time'),
			seek_value = parseInt(this_scrub.val())/1000;
			
		wv_this_deck.find('.wave-prog').attr('value', this_scrub.val());
		wv_this_audio.prop('currentTime', seek_value);
	});

	audios.on('timeupdate', function(){
		var this_audio = this,
			ct_raw = this_audio.currentTime,
			du_raw = this_audio.duration,
			scrb_time = Math.ceil(ct_raw*1000),
			prog = (ct_raw / du_raw) * 100;

		
		var a_this_deck = $(this).parent(),
			ct_lb = a_this_deck.find('.current-time'),
			a_this_scrub = a_this_deck.find('.wave-prog'),
			progress_bar = a_this_deck.find('.progress label');

		var time_secs = Math.floor(ct_raw),
			mins = Math.floor(time_secs/60),
			secs_raw = time_secs - mins * 60;
		
		if(secs_raw > -1 && secs_raw < 10){
			var secs = '0'+secs_raw;
		}else{
			var secs = secs_raw;
		}

		var current_time = mins + ':' + secs;
		ct_lb.text(current_time);
		a_this_scrub.attr('value', scrb_time);
		// progress_bar.css('width', prog + '%');

		if(ct_raw >= du_raw){
			a_this_deck.find('.vinyl').removeClass('acvitve-v');
			a_this_deck.find('.toggle-button').removeClass('sc-play').addClass('sc-stop');
			a_this_deck.find('.toggle-button').children().removeClass('glyphicon-pause').addClass('glyphicon-play');
		}
	});

	toggle_btns.click(function(e){
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

		}else{
			var use_sec = sec;
		}
		var the_time = minutes + ':' + use_sec;
		return the_time; 
	};

});