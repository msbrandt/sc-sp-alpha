<?php 
/**
*
* @subpackage sc-playlist
* @since Today
*/

 get_header(); ?> 

<section>
	<div class="deck" id="deck-a">
		<audio class="audio" id="au-a" src=""></audio>

		<div class="active-deck-button"><div class="glyphicon"></div></div>
			<div class="time-display">
				<span class="current-time">0:00</span>
				<span>/</span>
				<span class="total-time">0:00</span>
			</div>
		<div class="vinyl">

		</div>
		<div class="progres">
			<input class="wave-prog" value="0" id="wave-a" type="range" min='0' max="">
			<div class="fill-proj" id="f-a"></div>
		</div>
		<div class="display">
			<div class="now-playing">none</div>
		</div>
		<div class="toggle-button sc-stop" id="tog-a">
			<div class="glyphicon glyphicon-play"></div>	
		</div>
	</div>
	<div class="deck" id="deck-b">
		<audio class="audio" id="au-b" src=""></audio>

		<div class="active-deck-button"><div class="glyphicon"></div></div>
			<div class="time-display">
				<span class="current-time">0:00</span>
				<span>/</span>
				<span class="total-time">0:00</span>
			</div>
		<div class="vinyl">

		</div>
		<div class="progres">
			<input class="wave-prog" value="0" id="wave-b" type="range" min='0' max="">
			<div class="fill-proj" id="f-b"></div>
		</div>
		<div class="display">
			<div class="now-playing">none</div>
		</div>
		<div class="toggle-button sc-stop" id="tog-b">
			<div class="glyphicon glyphicon-play"></div>	
		</div>
	</div>
	<div id="volum">
		<div class='vol-container'>
			<div class="v-slider" id="v-a">
				<input type="range" min="0" max="1" value="0" step="0.05" class="vo-slider" id='vo-a'>
			</div>
			<div class="v-slider" id="v-b">
				<input type="range" min="0" max="1" value="0" step="0.05" class="vo-slider" id='vo-b'>		
			</div>
		</div>
	</div>
	<div id="slider">
		<input type="range" min="-1" max="1" value="0" step=".05" id="sli">
		<!-- <div></div> -->
	</div>

</section>
<div id="load"></div>
<div id="loaded-playlist">
	<ul>
	<?php
		$z = parse_playlist();
		load_songs($z);
	?>
	</ul>
</div>

<?php get_footer(); ?>