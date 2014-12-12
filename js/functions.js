jQuery(function($){
	var slider = $('#sli');
	var activate = $('.active-deck-button');
	var toggle_buttons = $('.toggle-button');
	var tracks = $('#loaded-playlist > ul > li');

	SC.initialize({
	  client_id: '7d9677620e4d860d055604be6c25d43a'
	});


	slider.change(function(){
		var the_val = slider.val();
		console.log(the_val);
	});

	toggle_buttons.click(function(e){
		e.preventDefault();
		var the_toggle = $(e.currentTarget),
			the_player_id = the_toggle.parent().find('audio').attr('id'),
			the_player = document.getElementById(the_player_id);

		if(the_toggle.hasClass('sc-stop')){
			the_toggle.removeClass('sc-stop').addClass('sc-play');
			the_toggle.children().removeClass('glyphicon-pause').addClass('glyphicon-play');
			the_player.play();

		}
		else if(the_toggle.hasClass('sc-play')){
			the_toggle.removeClass('sc-play').addClass('sc-stop');
			the_toggle.children().removeClass('glyphicon-play').addClass('glyphicon-pause');
		}

	});
	
	activate.click(function(e){
		var the_deck = $(this);
		var the_player = the_deck.prev();
		
		activate.removeClass('active');
		activate.children().removeClass('glyphicon-remove-sign');
		
		the_deck.addClass('active');
		the_deck.children().addClass('glyphicon-remove-sign');

		$('audio').removeClass('active-p');
		the_player.addClass('active-p');

	});

	tracks.click(function(e){
		e.preventDefault();
		var this_track_obj = $(this),
			this_track_txt = this_track_obj.text(),
			this_track_id = this_track_obj.data('id');

		var to_add = $('.active-deck-button.active').parent().children('.display').children('.now-playing');
		var this_deck = $('.active-deck-button.active').parent();
		var the_player_id = $('.audio.active-p').attr('id');
		var this_player = document.getElementById(the_player_id);
		
		to_add.text(this_track_txt);
		 
		SC.stream('tracks/'+this_track_id, function(sound){
			var raw_url = sound.url,
				split_url = raw_url.split('.com');
				use_url = split_url[0]+'.com/'+split_url[1];


			this_player.setAttribute("src", use_url);
		});

		this_player.load();
		
	});

});