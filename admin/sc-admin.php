
<h1>Load your playlist here</h1>
<h3 id="status"></h3>
<form id="sc-load">
	<input id="input" type="file" placeholder="select playlist"></input>
	<div id="sc-load-btn">Load</div>
</form>

<div id="select-to-load">
	<div class="sel-box" id="select-from">
		<h3>Please select the songs you would like to load</h3>
		<ul></ul>
	</div>
	<div id="select-buttons">
		<div id="add-btn" class="sel-btn">></div>
		<div id="remove-btn" class="sel-btn"><</div>
	</div>
	<!-- <div id="select-btn">Select</div> -->
	<div id="save-btn">Save</div>

	<div class="sel-box" id='que-to-load'>
	<h3>Songs Loaded</h3>
		<ul>
			<?php load_song_list(); ?>
		</ul>
	</div>
</div>
<div id="text-area"></div>
