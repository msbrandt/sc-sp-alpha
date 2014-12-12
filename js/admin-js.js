jQuery(function($){
	var button = $('#sc-load');

	button.on('click', function(e){
		var the_file = $('#sc-load > input').val();
		load_file(the_file);
	})

	function load_file(file){
		$.ajax({
			url: sc.ajaxurl,
			type: 'POST',
			action: 'parse_playlist',
			sucess: function(response){
				console.log(response);
			}
		});
	}

});