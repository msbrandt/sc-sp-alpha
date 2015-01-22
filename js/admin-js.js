jQuery(function($){
	var button = $('#sc-load-btn');
	var lda = $('#loaded > ul');
	var newData = [];

	button.on('click', function(e){
		// var the_file = $('#sc-load > input').val();
		var the_file = document.getElementById('input');
		var x = the_file.files[0];
		// load_file(the_file);
		readFile(x);
		// console.log(x);
		// console.log(the_file);
	});

	function readFile(file) {

		var reader = new FileReader();
		// console.log(reader);
		reader.onload = function(e){
			var text = reader.result;
			var lines = text.split(/[\r\n|\n]+/);
			for(var i =0; i<lines.length; i++){
				newData.push(lines[i]);
				var str = '<li>'+lines[i]+'</li>';

			}
			select_pl(newData);
		}
		reader.readAsText(file);
	}

	function select_pl(new_file){
		var g = JSON.stringify(new_file);
		$.ajax({
			url: sc.ajaxurl,
			type: 'POST',
			data: {
				action: 'select_songs',
				file_lines: g
			},
			success: function(response){
				$('#select-to-load .sel-box:eq(0) ul').append(response);
				return false;
			}
		});
	}

	var b = $('#select-to-load > .sel-box > ul');

	b.on('click', 'li', function(e){
		var selected = $(this);
		if(selected.hasClass('act')){
			selected.removeClass('act');
		}else{
			selected.addClass('act');
		}
	});

	$('#add-btn').on('click', function(){
		var active = $('#select-to-load > .sel-box > ul > li.act');
		var act_array = [];
		for(var i = 0; i<active.length; i++){
			var current_track = $(active[i]);
			current_track.clone(true).removeClass('act').appendTo('#que-to-load > ul');
			current_track.remove();
		}

	});
	$('#save-btn').on('click', function(){
		var in_que = $('#que-to-load > ul > li'),
			saved_list = [];

		for(var x = 0; x < in_que.length; x++ ) {

			var current_track = $(in_que[x]);
			if(!current_track.hasClass('db-list')){
				track_title = current_track.html(),
				track_data = current_track.data();
			
				saved_list.push(track_data);			
			}	
		};

		$.ajax({
			url: sc.ajaxurl,
			type: 'POST',
			data: {
				action: 'save_playlist',
				track_list: saved_list
			},
			success: function(response){
				$('#status').html('Songs Saved!').fadeOut(3000);
				// return false;
			}
		});
		
	});

	$('#remove-btn').on('click', function(){
		var to_delete = $('#que-to-load ul li.act'),
			delete_array = [];
			
			for(var x=0; x<to_delete.length; x++){
				var current_track = $(to_delete[x]).data(),
					t_id = current_track.id;
				delete_array.push(t_id);
			}

		$.ajax({
			url: sc.ajaxurl,
			type: 'POST',
			data: {
				action: 'delete_song',
				delete_data: delete_array
			},
			success: function(response){
				$('#status').html('Songs deleted!').fadeOut(3000);
			}
		});	
		to_delete.remove();

	});

});