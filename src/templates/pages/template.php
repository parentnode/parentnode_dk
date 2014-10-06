<div class="scene front i:generic">

	<div class="article i:article" itemscope itemtype="http://schema.org/Article">

		<ul class="tags">
			<li><a href="/geek/posts">Tags</a></li>
			<li><a href="/geek/posts/tag/Attempted+peotry" itemprop="articleSection">Attempted peotry</a></li>
		</ul>

		<h1 itemprop="name">Primary headline followed by paragraph</h1>

		<div class="description" itemprop="articleBody">
			<p>
				Paragraph after primary headline ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
				incididunt <span class="file">/etc/hosts</span> ut labore et dolore magna aliqua. 
				Nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
				qui officia deserunt mollit anim id est laborum.
			</p>
		</div>

	</div>

	<hr />

	<div class="article i:article" itemscope itemtype="http://schema.org/Article">

		<h1>Primary headline followed by h2</h1>

		<div class="description" itemprop="articleBody">
			<h2>Secondary headline after primary headline</h2>
			<p>
				Paragraph after Secondary headline consectetur adipisicing elit, sed do eiusmod tempor
				incididunt <span class="file">/etc/hosts</span> ut labore et dolore magna aliqua. 
			</p>
		</div>

	</div>

	<hr />

	<div class="article i:article" itemscope itemtype="http://schema.org/Article">

		<div class="image image_id:0 variant:missing format:png"><a href="/images/0/missing/500x.png">Image after paragraph</a></div>

		<ul class="tags">
			<li><a href="/geek/posts">Tags</a></li>
			<li><a href="/geek/posts/tag/Attempted+peotry" itemprop="articleSection">Attempted peotry</a></li>
		</ul>

		<h1>Primary headline followed by info and geolocation</h1>

		<dl class="info">
			<dt class="published_at">Date published</dt>
			<dd class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", filemtime(__FILE__)) ?>"><?= date("Y-m-d, H:i", filemtime(__FILE__)) ?></dd>
			<dt class="author">Author</dt>
			<dd class="author" itemprop="author">Martin Kæstel Nielsen</dd>
		</dl>

		<dl class="geo" itemprop="contentLocation" itemscope itemtype="http://schema.org/GeoCoordinates">
			<dt class="location">location</dt>
			<dd class="location" itemprop="name">San Francisco</dd>
			<dt class="latitude">&phi;</dt>
			<dd class="latitude" itemprop="latitude">12°</dd>
			<dt class="longitude">&lambda;</dt>
			<dd class="longitude" itemprop="longitude">12°</dd>
		</dl>

		<p>
			Paragraph after info adipisicing elit, sed do eiusmod tempor
			incididunt <span class="file">/etc/hosts</span> ut labore et dolore magna aliqua. 
		</p>

	</div>

	<hr />

	<div class="article i:article" itemscope itemtype="http://schema.org/Article">

		<h1>Primary headline followed by info and geolocation</h1>

		<dl class="info">
			<dt class="published_at">Date published</dt>
			<dd class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", filemtime(__FILE__)) ?>"><?= date("Y-m-d, H:i", filemtime(__FILE__)) ?></dd>
			<dt class="author">Author</dt>
			<dd class="author" itemprop="author">Martin Kæstel Nielsen</dd>
		</dl>

		<dl class="geo" itemprop="contentLocation" itemscope itemtype="http://schema.org/GeoCoordinates">
			<dt class="location">location</dt>
			<dd class="location" itemprop="name">San Francisco</dd>
			<dt class="latitude">&phi;</dt>
			<dd class="latitude" itemprop="latitude">12°</dd>
			<dt class="longitude">&lambda;</dt>
			<dd class="longitude" itemprop="longitude">12°</dd>
		</dl>

		<h2>H2 after info</h2>
		<p>
			Paragraph before h2 adipisicing elit, sed do eiusmod tempor
			incididunt <span class="file">/etc/hosts</span> ut labore et dolore magna aliqua. 
		</p>

		<h2>H2 after paragraph</h2>
		<h3>One heading 3 after a heading 2</h3>
		<p>
			Paragraph after Heading 3 ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
			irure dolor in reprehenderit in voluptate velit esse cillum.
		</p>
		<p class="note">
			Note: This guide does not consider security whatsoever. Read the details 
			of squid.conf to setup your own security.
		</p>
		<p>
			Several paragraphs in a row excepteur sint occaecat cupidatat non proident, sunt in culpa 
			qui officia deserunt mollit anim id est laborum.
		</p>

		<h4>h4 Nostrud exercitation ullamco laboris nisi ut aliquip</h4>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod 
		</p>
		<h5>h5 Ullamco laboris nisi ut aliquip ex ea commodo </h5>
		<p>
			Ut enim ad minim veniam, 
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
		</p>
		<h6>H6 Ullamco laboris nisi ut aliquip ex ea commodo </h6>
		<p>
			Ut enim ad minim veniam, 
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
		</p>

		<h3>H3 after paragraph and before code</h3>
		<code>$ code after heading 3 and testing word wrap on really long snippets of code. It has to be really, really long to explify wrapping issues</code>

		<h2>This is H2 after and before code</h2>
		<code>$ code after h2</code>

		<h3>H3 after code</h3>
		<p>Paragraph before code element</p>
		<code>$ code after paragraph</code>

		<p>
			Paragraph after code and before image excepteur sint occaecat cupidatat non proident, sunt in culpa 
			qui officia deserunt mollit anim id est laborum.
		</p>

		<div class="image image_id:0 variant:missing format:png"><a href="/images/0/missing/500x.png">Image after paragraph</a></div>

		<h2>H2 after image</h2>

		<div class="image image_id:0 variant:missing format:png"><a href="/images/0/missing/500x.png">Image after h2</a></div>

		<h3>H3 after image</h3>

		<div class="image image_id:0 variant:missing format:png"><a href="/images/0/missing/500x.png">Image after h3</a></div>

		<p>
			Paragraph after image excepteur sint occaecat cupidatat non proident, sunt in culpa 
			qui officia deserunt mollit anim id est laborum.
		</p>

		<ul>
			<li>Unordered list</li>
			<li>Terminal</li>
			<li>MacPorts</li>
		</ul>

		<h2>Heading 2 after Unordered list</h2>

		<ul>
			<li>Unordered list after h2</li>
			<li>Terminal</li>
			<li>MacPorts</li>
		</ul>

		<h3>Heading 3 after Unordered list</h3>

		<ul>
			<li>Unordered list after h3</li>
			<li>Terminal</li>
			<li>MacPorts</li>
		</ul>

		<p>
			Paragraph after Unordered list ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
			irure dolor in reprehenderit in voluptate velit esse cillum.
		</p>

		<dl>
			<dt>Definition list</dt>
			<dd>The local IP of the computer running Squid</dd>
			<dt>Term</dt>
			<dd>Description</dd>
		</dl>

		<p>
			Paragraph after Definition list ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
			irure dolor in reprehenderit in voluptate velit esse cillum.
		</p>

	</div>

	<hr />


	<h1>List of articles</h1>
	<ul class="items i:articlelist">
		<li class="item">

			<ul class="tags">
				<li><a href="/geek/posts">Tags</a></li>
				<li><a href="/geek/posts/tag/Attempted+peotry" itemprop="articleSection">Attempted peotry</a></li>
			</ul>

			<h2>iOS wyebde gvelo</h2>
			<dl class="info">
				<dt class="published_at">Date published</dt>
				<dd class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", filemtime(__FILE__)) ?>"><?= date("Y-m-d, H:i", filemtime(__FILE__)) ?></dd>
				<dt class="author">Author</dt>
				<dd class="author" itemprop="author">Martin Kæstel Nielsen</dd>
			</dl>

			<dl class="geo" itemprop="contentLocation" itemscope itemtype="http://schema.org/GeoCoordinates">
				<dt class="location">location</dt>
				<dd class="location" itemprop="name">San Francisco</dd>
				<dt class="latitude">&phi;</dt>
				<dd class="latitude" itemprop="latitude">12°</dd>
				<dt class="longitude">&lambda;</dt>
				<dd class="longitude" itemprop="longitude">12°</dd>
			</dl>

			<p>
				Paragraph before h3 adipisicing elit, sed do eiusmod tempor
				incididunt <span class="file">/etc/hosts</span> ut labore et dolore magna aliqua. 
			</p>

			<h3>Heading 3 after Paragraph</h3>
			<code>$ code after heading 3</code>
			<p>
				Paragraph after Heading 3 ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
				irure dolor in reprehenderit in voluptate velit esse cillum.
			</p>
			<code>$ code after heading 3</code>
			<p>
				Several paragraphs in a row excepteur sint occaecat cupidatat non proident, sunt in culpa 
				qui officia deserunt mollit anim id est laborum.
			</p>

			<h4>h4 Nostrud exercitation ullamco laboris nisi ut aliquip</h4>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod 
			</p>
			<h5>h5 Ullamco laboris nisi ut aliquip ex ea commodo </h5>
			<p>
				Ut enim ad minim veniam, 
				quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
			</p>
			<h6>H6 Ullamco laboris nisi ut aliquip ex ea commodo </h6>
			<p>
				Ut enim ad minim veniam, 
				quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
			</p>

			<div class="image image_id:0 variant:missing format:png"><a href="/images/0/missing/500x.png">Image after paragraph</a></div>

			<ul>
				<li>Unordered list after h2</li>
				<li>Terminal</li>
				<li>MacPorts</li>
			</ul>

			<p>
				Paragraph after Unordered list ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
				irure dolor in reprehenderit in voluptate velit esse cillum.
			</p>

			<dl>
				<dt>Definition list</dt>
				<dd>The local IP of the computer running Squid</dd>
				<dt>Term</dt>
				<dd>Description</dd>
			</dl>

		</li>
		<li class="item">

			<h2>iOS wyebde gvelo</h2>
			<p>
				Paragraph before h3 adipisicing elit, sed do eiusmod tempor
				incididunt <span class="file">/etc/hosts</span> ut labore et dolore magna aliqua. 
			</p>

			<div class="image image_id:0 variant:missing format:png"><a href="/images/0/missing/500x.png">Image after paragraph</a></div>

		</li>
		<li class="item">

			<div class="image image_id:0 variant:missing format:png"><a href="/images/0/missing/500x.png">Image after paragraph</a></div>

			<h2>iOS wyebde gvelo</h2>
			<dl class="info">
				<dt class="published_at">Date published</dt>
				<dd class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", filemtime(__FILE__)) ?>"><?= date("Y-m-d, H:i", filemtime(__FILE__)) ?></dd>
				<dt class="author">Author</dt>
				<dd class="author" itemprop="author">Martin Kæstel Nielsen</dd>
			</dl>

			<dl class="geo" itemprop="contentLocation" itemscope itemtype="http://schema.org/GeoCoordinates">
				<dt class="location">location</dt>
				<dd class="location" itemprop="name">San Francisco</dd>
				<dt class="latitude">&phi;</dt>
				<dd class="latitude" itemprop="latitude">12°</dd>
				<dt class="longitude">&lambda;</dt>
				<dd class="longitude" itemprop="longitude">12°</dd>
			</dl>

			<p>
				Paragraph before h3 adipisicing elit, sed do eiusmod tempor
				incididunt <span class="file">/etc/hosts</span> ut labore et dolore magna aliqua. 
			</p>

		</li>
	</ul>

	<div class="pagination">
		<ul class="actions">
			<li class="previous"><a href="/blog/asdfasdf/prev">Previous page</a></li>
			<li class="next"><a href="/blog/asdfasdf/next">Next page</a></li>
		</ul>
	</div>

	<hr />

	<h1>Documentation</h1>

	<dl class="definition">
		<dt class="name">Name</dt>
		<dd class="name">Util.date</dd>
		<dt class="shorthand">Shorthand</dt>
		<dd class="shorthand">u.date</dd>
		<dt class="syntax">Syntax</dt>
		<dd class="syntax">
			<span class="type">String</span> = Util.date(
			<span class="type">String</span> <span class="var">format</span> 
			[, <span class="type">Mixed</span> <span class="var">timestamp</span> 
			[, <span class="type">Array</span> <span class="var">months</span>]
			]);
		</dd>
	</dl>

	<p>
		Ut enim ad minim veniam, 
		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
		lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod 
		tempor incididunt ut labore et dolore magna aliqua.
	</p>

	<dl class="parameters">
		<dt><span class="var">format</span></dt>
		<dd>
			<div class="summary">
				<span class="type">String</span> date/time format
			</div>
			<div class="details">

				<h5>Options</h5>
				<dl class="options">
					<dt><span class="value">d</span></dt>
					<dd>Day of the month, 2 digits with leading zeros: 01 to 31</dd>

					<dt><span class="value">j</span></dt>
					<dd>Day of the month without leading zeros: 1 to 31</dd>

					<dt><span class="value">m</span></dt>
					<dd>Numeric representation of a month, with leading zeros: 01 through 12</dd>

					<dt><span class="value">n</span></dt>
					<dd>Numeric representation of a month, without leading zeros: 1 through 12</dd>

					<dt><span class="value">F</span></dt>
					<dd>Full month string, given as array</dd>

					<dt><span class="value">Y</span></dt>
					<dd>Full numeric representation of a year, 4 digits</dd>

					<dt><span class="value">G</span></dt>
					<dd>24-hour format of an hour without leading zeros: 0 through 23</dd>

					<dt><span class="value">H</span></dt>
					<dd>24-hour format of an hour with leading zeros 00 through 23</dd>

					<dt><span class="value">i</span></dt>
					<dd>Minutes with leading zeros 00 to 59</dd>

					<dt><span class="value">s</span></dt>
					<dd>Seconds, with leading zeros	00 through 59</dd>
				</dl>
			</div>
		</dd>

		<dt><span class="var">timestamp</span></dt>
		<dd>
			<div class="summary">
				<span class="type">String/Number</span> Optional, unix timestamp in milliseconds since 1970 or valid Date-string. If <span class="var">timestamp</span> is omitted, current time is used.
			</div>
		</dd>
		<dt><span class="var">months</span></dt>
		<dd>
			<div class="summary">
				<span class="type">Array</span> Optional, Array with months. If <span class="var">months</span> is omitted, the &quot;F&quot;-character cannot be used.
			</div>
		</dd>
	</dl>

	<p><span class="type">type</span> <span class="var">var</span> <span class="file">file</span> <span class="value">value</span> <span class="htmltag">tag</span> <span class="command">command</span></p>

		<?php
			$model = new Model();
		?>

	<form action="" method="" class="i:standardForm labelstyle:inject">

		<h3>Form elements</h3>
		<p>Some description to what the form does.</p>
		<fieldset>
			<?= $model->input("string", array("type" => "string", "label" => "String", "hint_message" => "hint message", "error_message" => "error message")) ?>
			<?= $model->input("string_required", array("type" => "string", "label" => "String required", "required" => true, "hint_message" => "hint message", "error_message" => "error message")) ?>

			<?= $model->input("text", array("type" => "text", "label" => "Test", "hint_message" => "hint message", "error_message" => "error message")) ?>
			<?= $model->input("text_required", array("type" => "text", "label" => "Test required", "required" => true, "hint_message" => "hint message", "error_message" => "error message")) ?>
		</fieldset>

		<ul class="actions">
			<li class="save"><input type="submit" value="Submit" class="button primary" /></li>
			<li class="cancel"><a href="#" class="button">Cancel</a></li>
		</ul>

		<fieldset>
			<?= $model->input("select", array("type" => "select", "label" => "Select", "options" => array(0 => "test"), "hint_message" => "hint message", "error_message" => "error message")) ?>
			<?= $model->input("select_required", array("type" => "select", "label" => "Select required", "options" => array(0 => "test"), "required" => true, "hint_message" => "hint message", "error_message" => "error message")) ?>

			<?= $model->input("checkbox", array("type" => "checkbox", "label" => "Checkbox", "hint_message" => "hint message", "error_message" => "error message")) ?>
			<?= $model->input("checkbox_required", array("type" => "checkbox", "label" => "Checkbox required", "required" => true, "hint_message" => "hint message", "error_message" => "error message")) ?>
		</fieldset>

		<ul class="actions">
			<li class="save"><input type="submit" value="Submit" class="button primary" /></li>
			<li class="cancel"><a href="#" class="button">Cancel</a></li>
		</ul>

		<fieldset>
			<h3>TODO: radiobuttons
			<?//= $model->input("radio_buttons", array("type" => "checkbox", "label" => "Checkbox", "hint_message" => "hint message", "error_message" => "error message")) ?>
			<?//= $model->input("radio_buttons", array("type" => "checkbox", "label" => "Checkbox required", "required" => true, "hint_message" => "hint message", "error_message" => "error message")) ?>
		</fieldset>

		<ul class="actions">
			<li class="save"><input type="submit" value="Submit" class="button primary" /></li>
			<li class="cancel"><a href="#" class="button">Cancel</a></li>
		</ul>

	</form>

</div>
