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

		<div class="articlebody" itemprop="articleBody">
			<p>
				Paragraph after primary headline ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
				incididunt <span class="file">/etc/hosts</span> ut labore et dolore magna aliqua. 
				Nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
				qui officia deserunt mollit anim id est laborum.
			</p>
		</div>

	</div>

	<ul class="actions">
		<li class="more"><a href="/geek">Actions in scene</a></li>
	</ul>


	<hr />


	<div class="article i:article" itemscope itemtype="http://schema.org/Article">

		<ul class="tags">
			<li><a href="/geek/posts">Tags</a></li>
			<li><a href="/geek/posts/tag/Attempted+peotry" itemprop="articleSection">Attempted peotry</a></li>
		</ul>

		<h1 itemprop="name">Primary headline followed by info</h1>

		<dl class="info">
			<dt class="published_at">Date published</dt>
			<dd class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", filemtime(__FILE__)) ?>"><?= date("Y-m-d, H:i", filemtime(__FILE__)) ?></dd>
			<dt class="author">Author</dt>
			<dd class="author" itemprop="author">Martin Kæstel Nielsen</dd>
		</dl>

		<div class="articlebody" itemprop="articleBody">
			<h2>Secondary headline after info</h2>
			<p>
				Paragraph after Secondary headline consectetur adipisicing elit, sed do eiusmod tempor
				incididunt <span class="file">/etc/hosts</span> ut labore et dolore magna aliqua. 
			</p>
		</div>

	</div>


	<hr />


	<div class="article i:article" itemscope itemtype="http://schema.org/Article">

		<h1 itemprop="name">Primary headline followed by h2</h1>

		<h2 itemprop="alternateName">Secondary headline after primary headline</h2>

		<dl class="info">
			<dt class="published_at">Date published</dt>
			<dd class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", filemtime(__FILE__)) ?>"><?= date("Y-m-d, H:i", filemtime(__FILE__)) ?></dd>
			<dt class="author">Author</dt>
			<dd class="author" itemprop="author">Martin Kæstel Nielsen</dd>
		</dl>

		<div class="articlebody" itemprop="articleBody">
			<p>
				Paragraph after info consectetur adipisicing elit, sed do eiusmod tempor
				incididunt <span class="file">/etc/hosts</span> ut labore et dolore magna aliqua. 
			</p>
		</div>

	</div>


	<hr />


	<div class="article i:article" itemscope itemtype="http://schema.org/Article">

		<div class="image item_id:0 variant:missing format:png">
			<p>Image: <a href="/images/0/missing/500x.png">Image in top of article</a>
		</div>

		<ul class="tags">
			<li><a href="/geek/posts">Tags</a></li>
			<li><a href="/geek/posts/tag/Attempted+peotry" itemprop="articleSection">Attempted peotry</a></li>
		</ul>

		<h1 itemprop="name">Primary headline followed by info and geolocation</h1>

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

		<div class="articlebody" itemprop="articleBody">
			<p>
				Paragraph after info adipisicing elit, sed do eiusmod tempor
				incididunt <span class="file">/etc/hosts</span> ut labore et dolore magna aliqua. 
			</p>
		</div>
	</div>


	<hr />


	<div class="article i:article" itemscope itemtype="http://schema.org/Article">

		<h1 itemprop="name">Primary headline followed by info and geolocation</h1>

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

		<div class="articlebody" itemprop="articleBody">
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

			<div class="image item_id:0 variant:missing format:png">
				<p>Image: <a href="/images/0/missing/500x.png">Image after paragraph</a></p>
			</div>

			<h2>H2 after image</h2>

			<div class="image item_id:0 variant:missing format:png">
				<p>Image: <a href="/images/0/missing/500x.png">Image after h2</a></p>
			</div>

			<h3>H3 after image</h3>

			<div class="image item_id:0 variant:missing format:png">
				<p>Image: <a href="/images/0/missing/500x.png">Image after h3</a></p>
			</div>

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
				<li>Terminal irure dolor in reprehenderit in voluptate velit esse cillum irure dolor in reprehenderit in voluptate velit esse cillum</li>
				<li>MacPorts</li>
			</ul>

			<h3>Heading 3 after Unordered list</h3>

			<ol>
				<li>Ordered list after h3</li>
				<li>Terminal irure dolor in reprehenderit in voluptate velit esse cillum irure dolor in reprehenderit in voluptate velit esse cillum</li>
				<li>MacPorts</li>
			</ol>

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
	</div>



	<hr />


	<h1>List of articles</h1>

	<div class="fake_article_scope">
		<ul class="items i:articlelist">
			<li class="item article" itemscope itemtype="http://schema.org/Article">

				<ul class="tags">
					<li><a href="/geek/posts">Tags</a></li>
					<li><a href="/geek/posts/tag/Attempted+peotry" itemprop="articleSection">Attempted peotry</a></li>
				</ul>

				<h2 itemprop="name">Complex list item</h2>
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

				<div class="articlebody" itemprop="articleBody">
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

					<div class="image item_id:0 variant:missing format:png">
						<p>Image: <a href="/images/0/missing/500x.png">Image after paragraph</a>
					</div>
					<!-- no caption -->
					<div class="image item_id:0 variant:missing format:png"></div>
					<div class="image item_id:0 variant:missing format:png">
						<p>Image: <a href="/images/0/missing/500x.png">Image after paragraph</a>
					</div>

					<ul>
						<li>Unordered list after h2</li>
						<li>Terminal irure dolor in reprehenderit in voluptate velit esse cillum irure dolor in reprehenderit in voluptate velit esse cillum</li>
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
				</div>
			</li>
			<li class="item article" itemscope itemtype="http://schema.org/Article">

				<h2 itemprop="name">Simple list item</h2>
				<div class="articlebody" itemprop="articleBody">
					<p>
						Paragraph before h3 adipisicing elit, sed do eiusmod tempor
						incididunt <span class="file">/etc/hosts</span> ut labore et dolore magna aliqua. 
					</p>

					<div class="image item_id:0 variant:missing format:png">
						<p>Image: <a href="/images/0/missing/500x.png">Image after paragraph</a></p>
					</div>
				</div>
			</li>
			<li class="item article" itemscope itemtype="http://schema.org/Article">

				<div class="image item_id:0 variant:missing format:png"></div>
				<h2 itemprop="name">Simple list item</h2>

				<div class="articlebody" itemprop="articleBody">
					<p>
						Paragraph before h3 adipisicing elit, sed do eiusmod tempor
						incididunt <span class="file">/etc/hosts</span> ut labore et dolore magna aliqua. 
					</p>
				</div>
			</li>
			<li class="item article" itemscope itemtype="http://schema.org/Article">

				<div class="image item_id:0 variant:missing format:png">
					<p>Image: <a href="/images/0/missing/500x.png">Image after paragraph</a></p>
				</div>

				<h2 itemprop="name">iOS wyebde gvelo</h2>
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

				<div class="articlebody" itemprop="articleBody">
					<p>
						Paragraph before h3 adipisicing elit, sed do eiusmod tempor
						incididunt <span class="file">/etc/hosts</span> ut labore et dolore magna aliqua. 
					</p>
				</div>
			</li>
		</ul>
	</div>

	<div class="pagination">
		<ul class="actions">
			<li class="previous"><a href="/blog/asdfasdf/prev">Previous page</a></li>
			<li class="next"><a href="/blog/asdfasdf/next">Next page</a></li>
		</ul>
	</div>


	<hr />


	<h2>Vcard</h2>
	<div itemtype="http://schema.org/Person" itemscope="" class="vcard company">
		<div itemprop="name" class="name fn org">Martin Kæstel Nielsen</div>
		<div itemprop="telephone" class="tel"><a href="callto:+4520742819">+45 2074 2819</a></div>
		<div itemprop="email" class="email"><a href="mailto:martin@kaestel.dk">martin@kaestel.dk</a></div>
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

										<dt><span class="value">playpause</span></dt>
										<dd>Inject custom controls div with Play/Pause button</dd>

										<dt><span class="value">search</span></dt>
										<dd>Inject custom controls div with FF/RW buttons</dd>

										<dt><span class="value">ff_skip</span></dt>
										<dd>Time in seconds to skip ahead for Fast Forward</dd>

										<dt><span class="value">rw_skip</span></dt>
										<dd>Time in seconds to jump back for Rewind</dd>

										<!--dt><span class="value">zoom</span></dt>
										<dd>Inject custom controls div with Zoom/Fullscreen button</dd-->

										<!--dt><span class="value">volume</span></dt>
										<dd>Inject custom controls div with volume button</dd-->
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
							<dt>audioPlayer.playing(event)</dt>
							<dd>when playback is begun</dd>
							<dt>audioPlayer.paused(event)</dt>
							<dd>when playback is paused</dd>
							<dt>audioPlayer.stalled(event)</dt>
							<dd>when playback is stalling</dd>

							<dt>audioPlayer.ended(event)</dt>
							<dd>when playback has ended</dd>
							<dt>audioPlayer.loadedmetadata(event)</dt>
							<dd>when metadata is loaded (duration, title, etc.)</dd>
							<dt>audioPlayer.loadeddata(event)</dt>
							<dd>when entire source is loaded</dd>
							<dt>audioPlayer.timeupdate(event)</dt>
							<dd>when position is updated</dd>	
						</dl>
					</div>

					<div class="examples">
						<h4>Examples</h4>

						<div class="example">
							<code>var player = u.audioPlayer();</code>
							<p>Returns simple <span class="htmltag">div.audioplayer</span></p>
						</div>

						<div class="example">
							<code>var player = u.audioPlayer({"playpause":true});</code>
							<p>Return <span class="htmltag">div.audioplayer</span> with Play/Pause button</p>
						</div>
					</div>

					<div class="uses">
						<h4>Uses</h4>

						<div class="javascript">
							<h5>JavaScript</h5>
							<ul>
								<li>document.removeChild</li>
								<li>String.match</li>
								<li>String.replace</li>
								<li>switch ... case</li>
								<li>typeof</li>
								<li>for ... in</li>
							</ul>
						</div>

						<div class="manipulator">
							<h5>Manipulator</h5>
							<ul>
								<li>Util.addClass</li>
								<li>Util.removeClass</li>
								<li>Util.hasClass</li>
								<li>Util.appendElement</li>
								<li>Util.Events.addEvent</li>
								<li>Util.Events.removeEvent</li>
								<li>Util.randomString</li>
							</ul>
						</div>

					</div>

				</div>

			</div>

			<div class="function" id="audioPlayer.load">
				<div class="header">
					<h3>audioPlayer.load</h3>
				</div>
				<div class="body">
					<div class="definition">
						<h4>Definition</h4>
						<dl class="definition">
							<dt class="name">Name</dt>
							<dd class="name">audioPlayer.load</dd>
							<dt class="syntax">Syntax</dt>
							<dd class="syntax"><span class="type">Void</span> = 
								audioPlayer.load(
									<span class="type">String</span> <span class="var">src</span> 
									[, <span class="type">JSON</span> <span class="var">_options</span> ]
								);
							</dd>
						</dl>
					</div>

					<div class="description">
						<h4>Description</h4>
						<p>Load src into audio player. Source is automatically changed to format supported by browser.</p>
					</div>

					<div class="parameters">
						<h4>Parameters</h4>

						<dl class="parameters">
							<dt><span class="var">src</span></dt>
							<dd>
								<div class="summary">
									<span class="type">String</span> audio src to load
								</div>
							</dd>
							<dt><span class="var">options</span></dt>
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

										<dt><span class="value">playpause</span></dt>
										<dd>Inject custom controls div with Play/Pause button</dd>

										<dt><span class="value">search</span></dt>
										<dd>Inject custom controls div with FF/RW buttons</dd>

										<dt><span class="value">ff_skip</span></dt>
										<dd>Time in seconds to skip ahead for Fast Forward</dd>

										<dt><span class="value">rw_skip</span></dt>
										<dd>Time in seconds to jump back for Rewind</dd>

										<!--dt><span class="value">zoom</span></dt>
										<dd>Inject custom controls div with Zoom/Fullscreen button</dd-->

										<!--dt><span class="value">volume</span></dt>
										<dd>Inject custom controls div with volume button</dd-->
									</dl>
								</div>
							</dd>
						</dl>
					</div>

					<div class="return">
						<h4>Returns</h4>
						<p><span class="type">Void</span></p>
					</div>

					<div class="examples">
						<h4>Examples</h4>

						<div class="example">
							<code>var player = u.audioPlayer();
var scene = u.qs(".scene");
u.ae(scene, player);
player.load("/media/audio/audio_1.mp3");</code>
							<p>Injects audio into <span class="htmltag">div.scene</span> and loads "/media/audio/audio_1.mp3", without beginning playback.</p>
						</div>
					</div>

					<div class="uses">
						<h4>Uses</h4>

						<div class="javascript">
							<h5>JavaScript</h5>
							<ul>
								<li>switch ... case</li>
								<li>typeof</li>
								<li>for ... in</li>
							</ul>
						</div>

						<div class="manipulator">
							<h5>Manipulator</h5>
							<ul>
								<li>Util.hasClass</li>
							</ul>
						</div>

					</div>

				</div>
			</div>

		</div>
	</div>

	<h2>Color syntax</h2>
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
				u.scrollTo(window, {"node":form});
			}
		}

	</script>

	<?= $model->formStart("#/1", array("class" => "labelstyle:inject i:standardForm")) ?>

		<h2>Form elements</h2>
		<p>
			This is a general form layout, containing most common input/text combinations. 
			This is not used to test anything but parentNode CSS!
		</p>
		<p>
			To perform tests on JavaScript layer, use:<br />
			<a href="http://manipulator.parentnode.dk/tests/u-form">http://manipulator.parentnode.dk/tests/u-form</a>.
		</p>
		<p>
			To perform tests on Janitor layer, use:<br />
			<a href="http://janitor.parentnode.dk/tests/form">http://janitor.parentnode.dk/tests/form</a>.
		</p>

		<fieldset>
			<h3>String and text</h3>

			<?= $model->input("string", array("type" => "string", "label" => "String", "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("string_required", array("type" => "string", "label" => "String required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>

			<?= $model->input("text", array("type" => "text", "class" => "autoexpand", "label" => "Text", "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("text_required", array("type" => "text", "class" => "autoexpand", "label" => "Text required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
		</fieldset>

		<h3>Buttons</h3>
		<ul class="actions">
			<?= $model->submit("Primary submit", array("class" => "primary", "wrapper" => "li.save")) ?>
			<?= $model->link("Primary a", "/template", array("class" => "button primary", "wrapper" => "li.button")) ?>

			<?= $model->link("Secondary a", "/template", array("class" => "button secondary", "wrapper" => "li.cancel")) ?>
			<?= $model->button("Secondary button", array("class" => "secondary", "wrapper" => "li.button")) ?>

			<?= $model->link("Default a", "/template", array("class" => "button", "wrapper" => "li.cancel")) ?>
			<?= $model->button("Default button", array("type" => "button", "wrapper" => "li.button")) ?>
		</ul>


		<fieldset>
			<h3>Select, Checkbox and Radio buttons</h3>

			<?= $model->input("select", array("type" => "select", "label" => "Select", "options" => array(0 => "test"), "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("select_required", array("type" => "select", "label" => "Select required", "options" => array(0 => "test"), "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>

			<?= $model->input("checkbox", array("type" => "checkbox", "label" => "Checkbox", "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("checkbox_required", array("type" => "checkbox", "label" => "Checkbox required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>

			<?= $model->input("radiobuttons", array("type" => "radiobuttons", "label" => "Radiobuttons", "options" => array("test1" => "Test A", "test2" => "Test B"), "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("radiobuttons_required", array("type" => "radiobuttons", "label" => "Radiobuttons required", "options" => array("test1" => "Test A", "test2" => "Test B"), "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
		</fieldset>

		<ul class="actions">
			<?= $model->link("Cancel", "/template", array("class" => "button key:esc", "wrapper" => "li.cancel")) ?>
			<?= $model->submit("Submit", array("class" => "primary key:s", "wrapper" => "li.save")) ?>
		</ul>


		<fieldset>
			<h3>Special input types</h3>

			<?= $model->input("email", array("type" => "email", "label" => "Email", "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("email_required", array("type" => "email", "label" => "Email required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>

			<?= $model->input("tel", array("type" => "tel", "label" => "Phone", "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("tel_required", array("type" => "tel", "label" => "Phone required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>

			<?= $model->input("password", array("type" => "password", "label" => "Password", "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("password_required", array("type" => "password", "label" => "Password required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>

			<?= $model->input("number", array("type" => "number", "label" => "Number", "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("number_required", array("type" => "number", "label" => "Number required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>

			<?= $model->input("integer", array("type" => "integer", "label" => "Integer", "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("integer_required", array("type" => "integer", "label" => "Integer required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>

			<?= $model->input("date", array("type" => "date", "label" => "Date", "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("date_required", array("type" => "date", "label" => "Date required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>

			<?= $model->input("datetime", array("type" => "datetime", "label" => "Datetime", "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("datetime_required", array("type" => "datetime", "label" => "Datetime required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>

			<?= $model->input("files", array("type" => "files", "label" => "Files", "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("files_required", array("type" => "files", "label" => "Files required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
		</fieldset>

		<ul class="actions">
			<?= $model->link("Cancel", "/template", array("class" => "button key:esc", "wrapper" => "li.cancel")) ?>
			<?= $model->submit("Submit", array("class" => "primary key:s", "wrapper" => "li.save")) ?>
		</ul>


		<fieldset>
			<h3>Custom input types</h3>

			<?= $model->inputLocation("location", "latitude", "longitude", array("type" => "location", "label_loc" => "Location", "label_lat" => "Latitude", "label_lon" => "Longitude", "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->inputLocation("location_required", "latitude_required", "longitude_required", array("type" => "location", "label_loc" => "Location required", "label_lat" => "Latitude required", "label_lon" => "Longitude required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>

			<?= $model->input("html", array("type" => "html", "allowed_tags" => "p,h2,h3,h4,ul,ol,code,download,jpg,png", "label" => "HTML", "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>
			<?= $model->input("html_required", array("type" => "html", "allowed_tags" => "p,h2,h3,h4,ul,ol,code,download,jpg,png", "label" => "HTML required", "required" => true, "hint_message" => "Hint message example which might collide", "error_message" => "Error message which might visually collide with hint message or other error messages")) ?>

		</fieldset>

		<ul class="actions">
			<?= $model->link("Cancel", "/template", array("class" => "button key:esc", "wrapper" => "li.cancel")) ?>
			<?= $model->submit("Submit", array("class" => "primary key:s", "wrapper" => "li.save")) ?>
		</ul>



	<?= $model->formEnd() ?>

</div>

<? $page->footer() ?>
