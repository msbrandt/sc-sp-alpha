<?php 
/**
*
* @subpackage sc-playlist
* @since Today
*/

 get_header(); ?> 

<section>
	<div class="deck" id="deck-a">
		<audio class="audio" id="au-a" src="" controls="controls"></audio>

		<div class="active-deck-button"><div class="glyphicon"></div></div>
		<div class="vinyl"></div>
		<div class="progres">

		</div>
		<div class="display">
			<h5>Now Playing:</h5>
			<div class="now-playing">none</div>
		</div>
		<div class="toggle-button sc-stop" id="tog-a">
			<div class="glyphicon glyphicon-pause"></div>	
		</div>
	</div>
	<div class="deck" id="deck-b">
		<audio class="audio" id="au-b" src="" controls="controls"></audio>

		<div class="active-deck-button"><div class="glyphicon"></div></div>
		<div class="vinyl"></div>
		<div class="progres">

		</div>
		<div class="display">
			<h5>Now Playing:</h5>
			<div class="now-playing">none</div>
		</div>
		<div class="toggle-button sc-stop" id="tog-b">
			<div class="glyphicon glyphicon-pause"></div>	
		</div>
	</div>
	<div id="volum">
		<div class='vol-container'>
			<div class="v-slider" id="v-a">
				<input type="range" min="0" max="50" value="0" step="1" class="vo-slider" id='vo-a'>

			</div>
			<div class="v-slider" id="v-b">
				<input type="range" min="0" max="50" value="50" step="-1" class="vo-slider" id='vo-b'>		
			</div>
		</div>
	</div>
	<div id="slider">
		<input type="range" min="-50" max="50" value="0" step="1" id="sli">
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