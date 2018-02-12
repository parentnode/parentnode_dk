<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();


$page->bodyClass("story");
$page->pageTitle("Getting lost without losing my way");

$page->header();
?>

<div class="scene template i:scene">

	<h1>Template</h1>
	<p>
		This template is used to develop the parentNode CSS theme across segments.
	</p>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
		incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
		exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
		irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
		pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
		officia deserunt mollit anim id est laborum.
	</p>

	<div class="categories">
		<h2>Categories</h2>
		<ul class="tags">
			<li><a href="/blog/tag/asdfasd">asdfasd</a></li>
			<li><a href="/blog/tag/test">test</a></li>
		</ul>
	</div>

	<div class="categories">
		<h2>More categories</h2>
		<ul class="tags">
			<li><a href="/geek/posts/tag/Attempted+poetry">Attempted poetry</a></li>
			<li><a href="/geek/posts/tag/Random+updates+en+route">Random updates en route</a></li>
			<li><a href="/geek/posts/tag/Reflections+on+my+sanity">Reflections on my sanity</a></li>
			<li><a href="/geek/posts/tag/Sci-Phi">Sci-Phi</a></li>
			<li><a href="/geek/posts/tag/Commentaries+and+Opinions">Commentaries and Opinions</a></li>
			<li><a href="/geek/posts/tag/Guide+to+understanding+me">Guide to understanding me</a></li>
			<li><a href="/geek/posts/tag/Tech+wreck">Tech wreck</a></li>
		</ul>

		<ul class="actions">
			<li class="more"><a href="/geek/posts">Category actions</a></li>
		</ul>
	</div>


	<hr />


	<div class="article i:article" itemscope itemtype="http://schema.org/Article">

		<ul class="tags">
			<li><a href="#">Tags</a></li>
			<li><a href="#" itemprop="articleSection">Before H1</a></li>
		</ul>

		<h1 itemprop="name">Primary headline followed by paragraph</h1>

		<ul class="info">
			<li class="published_at" itemprop="datePublished" content="2015-01-25">2015-01-25, 06:24</li>
			<li class="modified_at" itemprop="dateModified" content="2015-02-22"></li>
			<li class="author" itemprop="author">Martin Kæstel Nielsen</li>
			<li class="main_entity share" itemprop="mainEntityOfPage" content="http://kaestel.local/geek/logs/dubai-transit"></li>
			<li class="publisher" itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
				<ul class="publisher_info">
					<li class="name" itemprop="name">kaestel.dk</li>
					<li class="logo" itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
						<span class="image_url" itemprop="url" content="http://kaestel.local/img/logo-large.png"></span>
						<span class="image_width" itemprop="width" content="720"></span>
						<span class="image_height" itemprop="height" content="405"></span>
					</li>
				</ul>
			</li>
			<li class="image_info" itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
				<span class="image_url" itemprop="url" content="http://kaestel.local/images/545/qyqtk4pv/720x.jpg"></span>
				<span class="image_width" itemprop="width" content="720"></span>
				<span class="image_height" itemprop="height" content="442"></span>
			</li>
			<li class="place" itemprop="contentLocation" itemscope itemtype="http://schema.org/Place">
				<ul class="geo" itemprop="geo" itemscope itemtype="http://schema.org/GeoCoordinates">
					<li class="location" itemprop="name">Dubai International Airport</li>
					<li class="latitude" itemprop="latitude" content="25.25137"></li>
					<li class="longitude" itemprop="longitude" content="55.35683"></li>
				</ul>
			</li>
		</ul>


		<div class="articlebody" itemprop="articleBody">
			<h2>Secondary headline after info</h2>
			<p>
				Paragraph after primary headline ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
				incididunt <span class="file">/etc/hosts</span> ut labore et dolore magna aliqua. 
				Nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
				qui officia deserunt mollit anim id est laborum.
			</p>

			<h3>One heading 3 after a heading 2</h3>
			<p>
				Paragraph after Heading 3 ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
				irure dolor in reprehenderit in voluptate velit esse cillum.
			</p>
			<p class="note">
				Note: This guide does not consider security whatsoever. Read the details 
				of squid.conf to setup your own security.
			</p>

			<div class="image item_id:0 variant:missing format:png">
				<p>Image: <a href="/images/0/missing/500x.png">Image after paragraph</a></p>
			</div>

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

			<p>Paragraph before code element</p>
			<code>$ code after paragraph</code>

			<div class="image item_id:0 variant:missing format:png">
				<p>Image: <a href="/images/0/missing/500x.png">Image after paragraph</a></p>
			</div>

			<ul>
				<li>Unordered list</li>
				<li>Terminal</li>
				<li>MacPorts</li>
			</ul>

			<ol>
				<li>Ordered list after h3</li>
				<li>Terminal irure dolor in reprehenderit in voluptate velit esse cillum irure dolor in reprehenderit in voluptate velit esse cillum</li>
				<li>MacPorts</li>
			</ol>

		</div>

	</div>


	<hr />


	<ul class="actions">
		<li class="more"><a href="/geek">Link actions in scene</a></li>
		<li class="less"><a href="/geek" class="button">Link actions in scene</a></li>
		<li class="same"><a href="/geek" class="button primary">Link actions in scene</a></li>
	</ul>


	<hr />


	<h2>Vcards</h2>
	<div itemtype="http://schema.org/Organization" itemscope class="vcard company">
		<h2 class="name fn org" itemprop="name">parentNode.dk</h2>

		<dl class="info basic">
			<dt class="address">Address</dt>
			<dd class="address" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
				<ul>
					<li itemprop="streetAddress">Æbeløgade 4</li>
					<li><span class="postal" itemprop="postalCode">2100</span> <span class="locality" itemprop="addressLocality">København Ø</span></li>
					<li class="country" itemprop="addressCountry">Denmark</li>
				</ul>
			</dd>
		</dl>

		<dl class="info contact">
			<dt class="contact">Contact</dt>
			<dd class="contact">
				<ul>
					<li class="email"><a href="mailto:info@parentnode.dk" itemprop="email" content="info@parentnode.dk">info@parentnode.dk</a></li>
				</ul>
			</dd>
			<dt class="social">Social media</dt>
			<dd class="social">
				<ul>
					<li class="facebook"><a href="https://facebook.com/parentnode">Facebook</a></li>
					<li class="linkedin"><a href="https://www.linkedin.com/company/parentnode">LinkedIn</a></li>
				</ul>
			</dd>
		</dl>

	</div>

	<div itemtype="http://schema.org/Person" itemscope class="vcard person">
		<h2 class="name" itemprop="name">Martin Kæstel Nielsen</h2>

		<dl class="info contact">
			<dt class="contact">Contact</dt>
			<dd class="contact">
				<ul>
					<li class="tel" itemprop="telephone" content="+4520742819">+45 2074 2819</li>
					<li class="email"><a href="mailto:martin@kaestel.dk" itemprop="email" content="martin@kaestel.dk">martin@kaestel.dk</a></li>
				</ul>
			</dd>
			<dt class="social">Social media</dt>
			<dd class="social">
				<ul>
					<li class="facebook"><a href="https://facebook.com/kaestel">Facebook</a></li>
					<li class="linkedin"><a href="https://www.linkedin.com/in/kaestel">LinkedIn</a></li>
				</ul>
			</dd>
		</dl>

	</div>


	<hr />


	<h1>TODOs</h1>

	<ul class="items todos">
		<li class="item item_id:62">
			<h3>Finish and test new improments to Device identification</h3>

			<dl class="info">
				<dt class="priority">Priority</dt>
				<dd class="priority">Medium</dd>
				<dt class="deadline">Deadline</dt>
				<dd class="deadline">2014-03-14</dd>
			</dl>

			<ul class="actions">
				<li class="close">
					<form action="#/close/62" method="post" class="labelstyle:inject">
						<input type="hidden" name="csrf-token" value="57048480-7c6f-4035-b94e-b4291be84ba3" />
						<input value="Close" type="submit" class="button primary" />
					</form>
				</li>
				<li class="open">
					<form action="#/open/62" method="post" class="labelstyle:inject">
						<input type="hidden" name="csrf-token" value="57048480-7c6f-4035-b94e-b4291be84ba3" />
						<input value="Open" type="submit" class="button primary" />
					</form>
				</li>
			</ul>

			<div class="description">
				<p>
					Update all templates to use global IC, model and itemtype instead of creating new objects
					Look at todo's for reference
				</p>
			</div>

		</li>
		<li class="item item_id:59">
			<h3>Update all templates to use global IC, model and itemtype</h3>

			<dl class="info">
				<dt class="priority">Priority</dt>
				<dd class="priority">Medium</dd>
				<dt class="deadline">Deadline</dt>
				<dd class="deadline">2014-03-14</dd>
			</dl>

			<ul class="actions closed">
				<li class="close">
					<form action="/todolist/close/59" method="post" class="labelstyle:inject">
						<input type="hidden" name="csrf-token" value="57048480-7c6f-4035-b94e-b4291be84ba3" />
						<input value="Close" type="submit" class="button primary" />
					</form>
				</li>
				<li class="open">
					<form action="/todolist/open/59" method="post" class="labelstyle:inject">
						<input type="hidden" name="csrf-token" value="57048480-7c6f-4035-b94e-b4291be84ba3" />
						<input value="Open" type="submit" class="button primary" />
					</form>
				</li>
			</ul>

			<div class="description">
				<p>
					Update all templates to use global IC, model and itemtype instead of creating new objects
					Look at todo's for reference
				</p>
			</div>

		</li>
	</ul>


	<hr />


	<h1>Documentation</h1>

	<div class="section functions">
		<div class="header">
			<h2>Functions</h2>
		</div>
		<div class="body">

			<div class="function" id="Util.audioPlayer">
				<div class="header">
					<h3>Util.audioPlayer</h3>
				</div>
				<div class="body">
					<div class="definition">
						<h4>Definition</h4>
						<dl class="definition">
							<dt class="name">Name</dt>
							<dd class="name">Util.audioPlayer</dd>
							<dt class="syntax">Syntax</dt>
							<dd class="syntax"><span class="type">Node audioPlayer</span> = 
								Util.audioPlayer(
									[<span class="type">JSON</span> <span class="var">_options</span> ]
								);
							</dd>
						</dl>
					</div>

					<div class="description">
						<h4>Description</h4>
						<p>Return audio player node, extended with controller methods and event callbacks.</p>
					</div>

					<div class="parameters">
						<h4>Parameters</h4>

						<dl class="parameters">
							<dt><span class="var">_options</span></dt>
							<dd>
								<div class="summary">
									<span class="type">JSON</span> Optional, JSON object with options for click handling.
								</div>
								<!-- optional details -->
								<div class="details">
									<h5>Options</h5>
									<dl class="options">
										<dt><span class="value">autoplay</span></dt>
										<dd>Set initial autoplay state - default false</dd>

										<dt><span class="value">controls</span></dt>
										<dd>Set native controls state - default false</dd>
									</dl>
								</div>
							</dd>
						</dl>
					</div>

					<div class="return">
						<h4>Returns</h4>
						<p>
							<span class="type">node</span> <span class="htmltag">DIV.audioplayer</span> (audioPlayer) containing 
							<span class="htmltag">audio</span> or <span class="htmltag">object</span> with fallback
							flash player.
						</p>
					</div>

					<div class="callbacks">
						<h4>Callbacks</h4>
						<dl>
							<dt>audioPlayer.loading(event)</dt>
							<dd>when data is loading</dd>
							<dt>audioPlayer.canplaythrough(event)</dt>
							<dd>when enough data is loaded to perform uninterrupted playback</dd>
						</dl>
					</div>

					<div class="examples">
						<h4>Examples</h4>

						<div class="example">
							<code>var player = u.audioPlayer();</code>
							<p>Returns simple <span class="htmltag">div.audioplayer</span></p>
						</div>
					</div>

					<div class="uses">
						<h4>Uses</h4>

						<div class="javascript">
							<h5>JavaScript</h5>
							<ul>
								<li>document.removeChild</li>
								<li>String.match</li>
							</ul>
						</div>

						<div class="manipulator">
							<h5>Manipulator</h5>
							<p>Nothing</p>
						</div>

					</div>

				</div>

			</div>

		</div>
	</div>


	<hr />


	<h2>Code color syntax</h2>
	<ul>
		<li><span class="type">type</span></li>
		<li><span class="var">var</span></li>
		<li><span class="file">file</span></li>
		<li><span class="value">value</span></li>
		<li><span class="htmltag">tag</span></li>
		<li><span class="command">command</span></li>
	</ul>


	<hr />


	<h1>Form</h1>

	<? $model = new Model() ?>

	<script type="text/javascript">

		// Standard form initializer
		u.o.standardForm = new function() {
			this.init = function(form) {
				u.f.init(form);

				// while testing form - scroll to form onload
//				u.scrollTo(window, {"node":form});
			}
		}

	</script>

	<?= $model->formStart("#/1", array("class" => "labelstyle:inject i:standardForm")) ?>

		<h2>Form elements</h2>
		<p>
			This is a general form layout, containing most common input/text combinations. 
		</p>

		<fieldset>
			<h3>String and text</h3>
			<?= $model->input("string_required", array("type" => "string", "label" => "String required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("text_required", array("type" => "text", "class" => "autoexpand", "label" => "Text required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
		</fieldset>

		<h3>Buttons</h3>
		<ul class="actions">
			<?= $model->submit("Primary submit", array("class" => "primary", "wrapper" => "li.save")) ?>
			<?= $model->button("Secondary button", array("class" => "secondary", "wrapper" => "li.button")) ?>
			<?= $model->link("Default button", "/template", array("class" => "button", "wrapper" => "li.cancel")) ?>
		</ul>


		<fieldset>
			<h3>Select, Checkbox and Radio buttons</h3>
			<?= $model->input("select_required", array("type" => "select", "label" => "Select required", "options" => array(0 => "test"), "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("checkbox_required", array("type" => "checkbox", "label" => "Checkbox required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("radiobuttons_required", array("type" => "radiobuttons", "label" => "Radiobuttons required", "options" => array("test1" => "Test A", "test2" => "Test B"), "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
		</fieldset>


		<fieldset>
			<h3>Special input types</h3>

			<?= $model->input("email_required", array("type" => "email", "label" => "Email required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("tel_required", array("type" => "tel", "label" => "Phone required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("password_required", array("type" => "password", "label" => "Password required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("number_required", array("type" => "number", "label" => "Number required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("integer_required", array("type" => "integer", "label" => "Integer required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("date_required", array("type" => "date", "label" => "Date required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("datetime_required", array("type" => "datetime", "label" => "Datetime required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("files_required", array("type" => "files", "label" => "Files required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
		</fieldset>


		<fieldset>
			<h3>Custom input types</h3>

			<?= $model->inputLocation("location_required", "latitude_required", "longitude_required", array("type" => "location", "label_loc" => "Location required", "label_lat" => "Latitude required", "label_lon" => "Longitude required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->inputHTML("html_required", array("type" => "html", "allowed_tags" => "p,h2,h3,h4,ul,ol,code,download,jpg,png", "label" => "HTML required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
		</fieldset>


	<?= $model->formEnd() ?>

</div>

<? $page->footer() ?>
