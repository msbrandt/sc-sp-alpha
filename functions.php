<?php
 require get_template_directory() . '/inc/my-navbar.php';

/**
 * blank setup.
 *
 * @since myTheme 1.0
 */
function blank_setup(){
	/**
	* Register wp nav menu to create custom navbars
	*
	* @since blank 1.0 
	*
	*/
	add_theme_support( 'html5' );

	register_nav_menu( 'primary', __( 'Primary Menu', 'blank') );

	add_theme_support( 'post-thumbnails' );

}
add_action( 'after_setup_theme', 'blank_setup' );

/**
 * Enqueue scripts and styles for the front end.
 *
 * @since blank 1.0
 *
 * @return void
 */
function blank_scripts() {
	// Add Lato font, used in the main stylesheet.
	// wp_enqueue_style( 'blank-lato', blank_font_url(), array(), null );

	// Load main stylesheet.
	wp_enqueue_style( 'blank-bootstrap', get_template_directory_uri() . '/css/bootstrap.min.css');
	wp_enqueue_style( 'blank-style', get_stylesheet_uri());
	wp_enqueue_style( 'blank-fonts', '//fonts.googleapis.com/css?family=Raleway|Open+Sans|Ubuntu|Ubuntu+Condensed|Oswald' );

	wp_enqueue_script( 'soundcloud', '//connect.soundcloud.com/sdk.js' ); 
	wp_enqueue_script( 'blank-bootstrapjs', get_template_directory_uri() . '/js/bootstrap.min.js', array( 'jquery' ), '20131209', true );
	wp_register_script( 'sc-script', get_template_directory_uri() . '/js/functions.js', array( 'jquery' ), '20131209', true );
	wp_localize_script( 'sc-script', 'sc', array(
		'ajaxurl' => admin_url( 'admin-ajax.php' ),
	) );	
	wp_enqueue_script( 'sc-script' );

}
add_action( 'wp_enqueue_scripts', 'blank_scripts' );

function add_admin_stuff(){
	wp_enqueue_style( 'admin-style', get_template_directory_uri() . '/css/admin-styles.css' );
	wp_register_script( 'admin-script', get_template_directory_uri() . '/js/admin-js.js', array( 'jquery' ), '20131209', true );
	
	wp_localize_script( 'admin-script', 'sc', array(
		'ajaxurl' => admin_url( 'admin-ajax.php' ),
	) );
	wp_enqueue_script( 'admin-script' );

}
add_action( 'admin_enqueue_scripts', 'add_admin_stuff' );

/**
 * Added dashboard icon for soundcloud plugin
 *
 * @since blank 1.0
 *
 * @return void
 */

function sc_menu_page() {
	add_menu_page( 'SC-Loader', 'SC-Loader', 'manage_options', 'sc-list', 'sc_list_page', 'dashicons-format-audio', '80' );
}
add_action( 'admin_menu', 'sc_menu_page' );

function sc_list_page() {
	include get_template_directory() . '/admin/sc-admin.php';
}

function parse_playlist(){
	// $the_file = json_decode( stripslashes( $_GET['data'] ), true );
	$the_file = file_get_contents(get_template_directory() .'/inc/list1.txt');
	$rows = explode("\n", $the_file);
	$sc_list = array();


	foreach ($rows as $row) {
		array_push($sc_list, $row);	 
	}
	return $sc_list;

	// exit();
}
function load_songs($track_list){
	require_once get_template_directory() .'/Services/Soundcloud.php';
	
	$client = new Services_Soundcloud('7d9677620e4d860d055604be6c25d43a', 'ecbbaf33f2f146a8ebb92d195074e219');
	$client->setCurlOptions(array(CURLOPT_FOLLOWLOCATION => 1) );
	foreach ($track_list as $track) {
		$raw_track = explode('-', $track);
		$artist = $raw_track[0];
		$song = $raw_track[1];
			
	
		$tracks = json_decode($client->get('tracks', array('q'=> $track)));	

		$track_arry = array();

		foreach ($tracks as $tra) {

			$track_title = $tra->title;
			$this_id = $tra->id;
			$this_duration = $tra->duration;
			$wave = $tra->waveform_url;
			$bpm = $thr->bpm;
			// echo $this_id;
			// var_dump($tra);
			$the_str = '<li data-art="'.$wave.'" data-bpm="'.$bpm.'" data-duration="'.$this_duration.'"data-ID="'.$this_id.'">'.$track_title.'</li>';
			array_push($track_arry, $the_str);
		}
			// echo $bpm . '<br />';

		echo $track_arry[0];
	}

}

// add_action( 'wp_ajax_nopriv_otn_ogs_query', 'otn_ogs_query' );

?>