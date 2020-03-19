<?
global $action;
global $IC;
global $model;
?>
<div class="scene demos i:scene">

	<div class="article" itemscope itemtype="http://schema.org/Article">
		<h1 itemprop="headline">Demos</h1>

		<ul class="info">
			<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", filemtime(__FILE__)) ?>"><?= date("Y-m-d, H:i", filemtime(__FILE__)) ?></li>
			<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", filemtime(__FILE__)) ?>"></li>
			<li class="author" itemprop="author">Martin Kæstel Nielsen</li>
			<li class="main_entity" itemprop="mainEntityOfPage" content="<?= SITE_URL."/demos" ?>"></li>
			<li class="publisher" itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
				<ul class="publisher_info">
					<li class="name" itemprop="name">kaestel.dk</li>
					<li class="logo" itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
						<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/img/logo-large.png"></span>
						<span class="image_width" itemprop="width" content="720"></span>
						<span class="image_height" itemprop="height" content="405"></span>
					</li>
				</ul>
			</li>
			<li class="image_info" itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
				<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/img/logo-large.png"></span>
				<span class="image_width" itemprop="width" content="720"></span>
				<span class="image_height" itemprop="height" content="405"></span>
			</li>
		</ul>


		<div class="articlebody" itemprop="articleBody">
			<p>
				I'm a webdeveloper. A sort of frontend specialist, with backend skills.
				Here is a small collection of demos of some of the work I've done over the years. 
			</p>
			<h2>
				How do you show off code?
			</h2>
			<p>
				I figured it wouldn't make sense to show a bunch of screenshot, since I didn't make the design anyway. 
				Well, in some cases I did, but don't tell anyone. I'm not a designer. I just made it work.
				But the point is, you kinda have to see the sites running in a browser to get a sense of what I did and
				web is a living organism, so most of the sites listed below are no longer online in their original form. 
				That is why I made these custom demo versions, where some functionality may be disabled.
			</p>
			<p>
				For the sake of not having these sites indexed by search engines, I have added a simple login.
				The username is: <em>demo</em>. If you spell it backwards, you'll have the password.
			</p>
			<p>
				So, take a look. And remember, I did all the stuff you can't really see, unless you look under the hood :-)
			</p>

			<ul class="demos">
				<li>
					<h2>L&aring;n &amp; Spar Bank - Targeted mini survey</h2>
					<ul class="actions">
						<li><a href="http://lsb-survey.kaestel.dk" target="_blank" class="hardlink">http://lsb-survey.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "desktop_light" ||
								$this->segment() == "tablet_light" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Series of campaign website for L&aring;n &amp; Spar Bank. Desktop, tablet and Smartphone.
							Survey with 10 questions targeted towards a specific group - teachers, nurses, academicians and masters. 
							Instant statistical visual feedback based on the total sum of answers from all participants.
							Backend for collecting answers and signups.
						</p>
						<p>
							The page had intregrated device detection and it was able to route internal links to either the desktop or smartphone
							version respectively, which in their case is two different urls. It was built to work as a take-over, directly extending a page
							in the banks main CMS. This allowed the marketing department to edit the texts as needed, while all campaign
							material and data collection endpoints was hosted on a separate server, giving me full development control.
							This was done to avoid dependencies to their own IT department.
						</p>
						<p>
							Produced in 2017 in collaboration with Lån &amp; Spar Bank and We❤︎People.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, MySQL, Apache and dedicated hosting on Linux.
						</p>
						<p class="note">Built using Manipulator v0.9.2, Janitor v0.7.7, Templator v2.0 and Detector v3.0.</p>
					</div>
				</li>
				<li>
					<h2>Stofa - Valget er dit</h2>
					<ul class="actions">
						<li><a href="http://valgeterdit.kaestel.dk" target="_blank" class="hardlink">http://valgeterdit.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "desktop_light" ||
								$this->segment() == "tablet_light" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Campaign website for Stofa. Desktop, tablet and Smartphone.
							Quiz with 6 rounds - a new round automatically launching every Monday. A couple of months later
							we did a fully reskinned version 2. Backend for validating and collecting
							user answers and signups.
						</p>
						<p>
							Produced in 2017 in collaboration with Animated, WDP and Stofa IT.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, MySQL.
						</p>
						<p class="note">Built using Manipulator v0.9.2, Janitor v0.7.7, Templator v2.0 and Detector v3.0.</p>
					</div>
				</li>
				<li>
					<h2>Distortion - Gadearmbånd</h2>
					<ul class="actions">
						<li><a href="http://gaadearmbaand.kaestel.dk" target="_blank" class="hardlink">http://gaadearmbaand.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "desktop_light" ||
								$this->segment() == "tablet_light" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Campaign website for Distortion to promote the support wristband. 
							Desktop, tablet and smartphone. Twitter and Instagram feeds. Event program with filters.
							Backend for event program.
						</p>
						<p>
							Produced in 2016 in collaboration with Great Works Copenhagen.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, MySQL, Apache and dedicated hosting on Linux.
						</p>
						<p class="note">Built using Manipulator v0.9.1, Janitor v0.7.6, Templator v2.0 and Detector v3.0.</p>
					</div>
				</li>
				<li>
					<h2>Digital vælgererklæring - Alternativet</h2>
					<ul class="actions">
						<li><a href="http://demo-alternativet.kaestel.dk" target="_blank" class="hardlink">http://demo-alternativet.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "desktop_light" ||
								$this->segment() == "mobile"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Online voter declaration system for new political green party, Alternativet. Used by the party
							to collect the 20.600 signed voter declarations, which are required to run for Parliament in
							Denmark. In total the party collected more than 50.000 signatures over 5 months and was voted
							into Parliament at the next election.
						</p>
						<p>
							A few months earlier, I had developed the first ever digital voter declaration system in
							Denmark as a contribution to Dukke Partiet (the puppet party), upon which this solution 
							is based.
						</p>
						<p>
							Produced in 2014 in collaboration with Alternativet.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, MySQL, Apache, Dedicated hosting on Linux.
						</p>
						<p class="note">Built using Manipulator v0.9, Janitor v0.7, Templator v1.0 and Detector v2.0.</p>
					</div>
				</li>
				<li>
					<h2>Dukkepartiet</h2>
					<ul class="actions">
						<li><a href="http://demo-dukkepartiet.kaestel.dk" target="_blank" class="hardlink">http://demo-dukkepartiet.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "desktop_light" ||
								$this->segment() == "mobile"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Web site for protest party / political satire group, Dukke Partiet (the puppet party). 
							Support for Desktop, tablet and smartphone (limited content). All content editable via 
							backend and integration of YouTube videos.
						</p>
						<p>
							In the spirit of the project I decided to challenge the system and build the first ever
							digital voter declaration system, essentially to make it easier for new parties to collect
							the signatures required to run for Parliament. The system was officially approved by the
							Ministry of Interior (Indenrigsministeriet), and shortly after adopted by new green party, 
							Alternativet.
						</p>
						<p>
							Produced in 2014 in collaboration with e-Types and Dukke Partiet.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, MySQL, Apache, Dedicated hosting on Linux.
						</p>
						<p class="note">Built using Manipulator v0.9, Janitor v0.7, Templator v1.0 and Detector v2.0.</p>
					</div>
				</li>
				<li>
					<h2>OeO - Website</h2>
					<ul class="actions">
						<li><a href="http://oeo.kaestel.dk" target="_blank" class="hardlink">http://oeo.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "desktop_light" ||
								$this->segment() == "tablet_light" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Corporate website for design agency OeO. Desktop and tablet. Simple contact page for smartphone visitors.
							Pushing the performance limits of the iPad to the max. 
							Probably overdoing it a little for the time. Backend for everything.
						</p>
						<p>
							Produced in 2014 in collaboration with e-Types.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, MySQL, Apache, Dedicated hosting on Linux.
						</p>
						<p class="note">Built using Manipulator v0.8, Janitor v0.7, Templator v1.0 and Detector v1.0.</p>
					</div>
				</li>
				<li>
					<h2>e-Types.com - Website</h2>
					<ul class="actions">
						<li><a href="http://e-types.kaestel.dk" target="_blank" class="hardlink">http://e-types.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<p>
							Corporate website for the design and identity agency, e-Types. Made for all browser segments (desktop, 
							desktop_light, smartphone, tablet, mobile), so it works in anything from the newest 
							Chrome to Internet Explorer 6, from the newest iPhones to the oldest Nokia feature
							phones.
						</p>
						<p>
							In the desktop version the frontpage contains a scalable pixel perfect custom grid, with 3 intervals,
							which was particularly difficult to make due to it's non-gridish nature. The rest of the
							pages are also highly customized, with complex scaling rules.
						</p>
						<p>
							There is a backend for frontpage curation, journals and articles. 
						</p>
						<p>
							Produced in 2013 in collaboration with and for e-Types.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, MySQL, Apache, Dedicated hosting on Linux.
						</p>
						<p class="note">Built using Manipulator v0.8, Janitor v0.7, Templator v1.0 and Detector v1.0.</p>
					</div>
				</li>
				<li>
					<h2>HTML5 WebApp</h2>
					<ul class="actions">
						<li><a href="http://html5-app.kaestel.dk" target="_blank" class="hardlink">http://html5-app.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "desktop_ie9" ||
								$this->segment() == "desktop_ie10" ||
								$this->segment() == "desktop_ie11" ||
								$this->segment() == "desktop_light" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							HTML5 WebApp demo made primarily to demonstrate animation performance and Native appearance
							of WebApps as a response to the AppStore/Native app frenzy.
						</p>
						<p>
							Produced in 2013.<br />
							Technologies: HTML5, CSS3, JavaScript.
						</p>
						<p class="note">Built using Manipulator 0.7 and Templator v1.0.</p>
					</div>
				</li>
				<li>
					<h2>Hemocue WebApp</h2>
					<ul class="actions">
						<li><a href="http://hemocue.kaestel.dk" target="_blank" class="hardlink">http://hemocue.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "desktop_ie9" ||
								$this->segment() == "desktop_ie10" ||
								$this->segment() == "desktop_ie11" ||
								$this->segment() == "desktop_light" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Tablet WebApp demo for Sales Guide tool with offline support for Hemocue.
							This demo is only showcasing potential offline functionality in a pure WebApp, 
							which was unheard off in 2012. Huh. It still is.
							In the process, Hemocue was bought by 
							Radiometer and the project was cancelled before we really got started.
						</p>
						<p>
							Produced in 2012.<br />
							Technologies: HTML5, CSS3, JavaScript.
						</p>
						<p class="note">Built using Manipulator 0.7 and Templator v1.0.</p>
					</div>
				</li>
				<li>
					<h2>Wibroe, Duckert &amp; Partners - Website</h2>
					<ul class="actions">
						<li><a href="http://wdp.kaestel.dk" target="_blank" class="hardlink">http://wdp.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Small temporary website for Wibroe, Duckert &amp; Partners (WDP), while transitioning to new 
							organisation structure. Desktop, tablet and 
							smartphone.
						</p>
						<p>
							Produced in 2012 in collaboration with WDP/Netpeople/Peoplegroup.<br />
							Technologies: HTML5, CSS3, JavaScript.
						</p>
						<p class="note">Built using Manipulator 0.7 and Templator v1.0.</p>
					</div>
				</li>
				<li>
					<h2>Partnersproduction - Website</h2>
					<ul class="actions">
						<li><a href="http://partnersproduction.kaestel.dk" target="_blank" class="hardlink">http://partnersproduction.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Small temporary website for Partners production, while transitioning to new organisation structure. Desktop, tablet and 
							smartphone. Mostly just an online business card.
						</p>
						<p>
							Produced in 2012 in collaboration with WDP/Netpeople/Peoplegroup.<br />
							Technologies: HTML5, CSS3, JavaScript.
						</p>
						<p class="note">Built using Manipulator 0.7 and Templator v1.0.</p>
					</div>
				</li>
				<li>
					<h2>tuborg.dk - Website</h2>
					<ul class="actions">
						<li><a href="http://tuborg.kaestel.dk" target="_blank" class="hardlink">http://tuborg.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>Corporate website for Tuborg with heavy use of animations for the time. Desktop and tablet.</p>
						<p>
							Produced in 2012 in collaboration with Netpeople/WDP.<br />
							Technologies: JavaScript, HTML5, CSS3, Ruby on Rails.
						</p>
						<p class="note">Built using Manipulator 0.5.</p>
					</div>
				</li>
				<li>
					<h2>peoplegroup.dk - Website</h2>
					<ul class="actions">
						<li><a href="http://peoplegroup.kaestel.dk" target="_blank" class="hardlink">http://peoplegroup.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Corporate website for PeopleGroup. Desktop and tablet. This was the main site and part of a range of sites for 
							the entire PeopleGroup organisation. The individual subdivision sites were inverted, as can be seen
							below in the Netpeople demo.
						</p>
						<p>
							Produced in 2012 in collaboration with Netpeople/WDP.<br />
							Technologies: JavaScript, HTML5, CSS3, Ruby on Rails.
						</p>
						<p class="note">Built using	Manipulator 0.5.</p>
					</div>
				</li>
				<li>
					<h2>netpeople.dk - Website</h2>
					<ul class="actions">
						<li><a href="http://netpeople.kaestel.dk" target="_blank" class="hardlink">http://netpeople.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Corporate website for Netpeople. Desktop and tablet. This was a subdivision site and part of a range of sites for 
							the entire PeopleGroup organisation. The individual mail site wes inverted, as can be seen
							above in the PeopleGroup demo. The subdivision sites offered a couple of sections more than the main
							site.
						</p>
						<p>
							Produced in 2012 in collaboration with Netpeople/WDP.<br />
							Technologies: JavaScript, HTML5, CSS3, Ruby on Rails.
						</p>
						<p class="note">Built using Manipulator 0.5.</p>
					</div>
				</li>
				<li>
					<h2>Microsoft, Windows 8 - Responsive HTML5 banners</h2>
					<ul class="actions">
						<li><a href="http://win8-banners.kaestel.dk" target="_blank" class="hardlink">http://win8-banners.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Interactive and responsive HTML5 banners for the launch of Windows 8. The banners autoplay when they 
							enter the viewable section of the page. The banners stop when out of view, and reset on browser-resizing, 
							providing smooth transitions between the different responsive states.
							Animated and interactive versions for smartphones, tablet and desktop browsers. 
							Resize your browser to see all versions. Static fallback versions for IE8 and IE7.
						</p>
						<p>
							Super-optimized preloading, ensuring a minimal initial load as required for banners, no overhead across 
							devices and smooth playback. This was something else back in 2012, when HTML banners were just bare beginning
							to be supported by the banner systems.
						</p>
						<p>
							Produced in 2012 in collaboration with Wunderman.<br />
							Technologies: HTML5, CSS3, JavaScript.
						</p>
						<p class="note">Built using Manipulator 0.6.</p>
					</div>
				</li>
				<li>
					<h2>Whil.com - Pitch website</h2>
					<ul class="actions">
						<li><a href="http://whil.kaestel.dk" target="_blank" class="hardlink">http://whil.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Pitch website for Whil.com – a potential new project by Lululemon's Canadian Yoga billionaire, 
							Chip Wilson, to create a community platform for likeminded people. Desktop only. 
							The project was presented to the client in New York, but never realized.
						</p>
						<p>
							Produced in 2012 in collaboration with in2media (now Charlie-Tango).<br />
							Technologies: HTML5, CSS3, jQuery.
						</p>
					</div>
				</li>
				<li>
					<h2>Novo - Mobile website</h2>
					<ul class="actions">
						<li><a href="http://novo-mobile.kaestel.dk" target="_blank" class="hardlink">http://novo-mobile.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "dekstop_ie9" ||
								$this->segment() == "dekstop_ie10" ||
								$this->segment() == "dekstop_ie11" ||
								$this->segment() == "desktop_light" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Frontend HTML templates for Novo mobile website. Smartphone only. The templates were later implemented by
							the team at Novo.
						</p>
						<p>
							Produced in 2012 in collaboration with Loft37.<br />
							Technologies: HTML5, CSS3, JavaScript.
						</p>
						<p class="note">Built using Manipulator 0.5.</p>
					</div>
				</li>
				<li>
					<h2>Vestas online - Frontend HTML templates and JavaScript framework</h2>
					<ul class="actions">
						<li><a href="http://vestas.kaestel.dk" target="_blank" class="hardlink">http://vestas.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "smartphone" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Frontend HTML templates and extensive JavaScript framework for Vestas mill administration and 
							maintenance platform. Desktop only. Implemented on top of a SAP system.
						</p>
						<p>
							Produced in 2011 in collaboration with Invokers, Dwarf and Vestas IT.<br />
							Technologies: JavaScript, HTML5, CSS3.
						</p>
						<p class="note">Built using Manipulator 0.5.</p>
					</div>
				</li>
				<li>
					<h2>BR, GakGak - HTML5 game for Danish carnival</h2>
					<ul class="actions">
						<li><a href="http://gakgak.kaestel.dk" target="_blank" class="hardlink">http://gakgak.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "smartphone" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Online dress-up game in HTML5. Desktop and tablet, including support for IE7+ because the client was still
							using it internally. That set the bar a bit lower than then client was hoping for. Classic dilemma.
						</p>
						<p>
							Produced in 2012 in collaboration with Advance.<br />
							Technologies: JavaScript, HTML5, CSS3.
						</p>
						<p class="note">Built using Manipulator 0.5.</p>
					</div>
				</li>
				<li>
					<h2>MCreative Group - Website</h2>
					<ul class="actions">
						<li><a href="http://mcreativegroup.kaestel.dk" target="_blank" class="hardlink">http://mcreativegroup.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "smartphone" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>Corporate website for Californian video production company and agency, MCreative Group. Desktop only.</p>
						<p>
							Produced in 2011 in collaboration with MCreative Group.<br />
							Built using HTML5, CSS3, JavaScript.
						</p>
						<p class="note">Built using Manipulator 0.5.</p>
					</div>
				</li>
				<li>
					<h2>Fri for mobberi - HTML5 version of existing Flash site</h2>
					<ul class="actions">
						<li><a href="http://friformobberi.kaestel.dk" target="_blank" class="hardlink">http://friformobberi.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "desktop_light" ||
								$this->segment() == "desktop_ie9" ||
								$this->segment() == "desktop_ie10" ||
								$this->segment() == "desktop_ie11" ||
								$this->segment() == "smartphone" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light" ||
								$this->segment() == "tv"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Non flash version of Fri for mobberi, primarily for the iPad where there is no Flash plugin. Includes a lot
							of fanzy stuff for the time, like CSS animations and a jumping game with cute sounds. The best part was clearly
							failing the game. 
						</p>
						<p>
							Produced in 2011 in collaboration with Contentcube.<br />
							Technologies: JavaScript, HTML5, CSS3.
						</p>
						<p class="note">Built using Manipulator 0.3.</p>
					</div>
				</li>
				<li>
					<h2>Amgen, Aranesp - Product presentation for iPad</h2>
					<ul class="actions">
						<li><a href="http://aranesp.kaestel.dk" target="_blank" class="hardlink">http://aranesp.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "desktop_light" ||
								$this->segment() == "desktop_ie9" ||
								$this->segment() == "desktop_ie10" ||
								$this->segment() == "desktop_ie11" ||
								$this->segment() == "smartphone" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light" ||
								$this->segment() == "tv"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							iPad HTML5 presentation for Agnitio iPlanner, a sales tool primarily used by Pharma companies. 
							Final HTML is integrated in their iOS App. This demo has been 
							altered to run outside the intended app, which means some features have been disabled.
						</p>
						<p>
							It is designed for fullscreen viewing and works well as a standalone HTML5 app. Bookmark to 
							homescreen on iPad for best experience.
						</p>
						<p>
							Produced in 2011 in collaboration with Agnitio.<br />
							Technologies: HTML5, CSS3, JavaScript
						</p>
						<p class="note">Built using Manipulator 0.4.</p>
					</div>
				</li>
				<li>
					<h2>Amgen, Mimpara - Product presentation for iPad</h2>
					<ul class="actions">
						<li><a href="http://mimpara.kaestel.dk" target="_blank" class="hardlink">http://mimpara.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "desktop_light" ||
								$this->segment() == "desktop_ie9" ||
								$this->segment() == "desktop_ie10" ||
								$this->segment() == "desktop_ie11" ||
								$this->segment() == "smartphone" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light" ||
								$this->segment() == "tv"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							iPad HTML5 presentation for Agnitio iPlanner, a sales tool primarily used by Pharma companies. 
							Final HTML is integrated in their iOS App. This demo has been 
							altered to run outside the intended app, which means some features have been disabled.
						</p>
						<p>
							It is designed for fullscreen viewing, and works well as a standalone HTML5 app. Bookmark to 
							homescreen on iPad for best experience.
						</p>
						<p>
							Produced in 2011 in collaboration with Agnitio.<br />
							Technologies: HTML5, CSS3, JavaScript
						</p>
						<p class="note">Built using Manipulator 0.4.</p>
					</div>
				</li>
				<li>
					<h2>Amgen, Neulasta - Product presentation for iPad</h2>
					<ul class="actions">
						<li><a href="http://neulasta.kaestel.dk" target="_blank" class="hardlink">http://neulasta.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "desktop_light" ||
								$this->segment() == "desktop_ie9" ||
								$this->segment() == "desktop_ie10" ||
								$this->segment() == "desktop_ie11" ||
								$this->segment() == "smartphone" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light" ||
								$this->segment() == "tv"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							iPad HTML5 presentation for Agnitio iPlanner, a sales tool primarily used by Pharma companies. 
							Final HTML is integrated in their iOS App. This demo has been 
							altered to run outside the intended app, which means some features have been disabled.
						</p>
						<p>
							Though it is designed for fullscreen viewing, it will not work as a standalone HTML5 app, due to its original
							nature.
						</p>
						<p>
							Produced in 2011 in collaboration with Agnitio.<br />
							Technologies: HTML5, CSS3, JavaScript
						</p>
						<p class="note">Built using Manipulator 0.4.</p>
					</div>
				</li>
				<li>
					<h2>Sanofi/Avensis - Product presentation for iPad</h2>
					<ul class="actions">
						<li><a href="http://sanofi.kaestel.dk" target="_blank" class="hardlink">http://sanofi.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "desktop_light" ||
								$this->segment() == "desktop_ie9" ||
								$this->segment() == "desktop_ie10" ||
								$this->segment() == "desktop_ie11" ||
								$this->segment() == "smartphone" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light" ||
								$this->segment() == "tv"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							iPad HTML5 presentation for Agnitio iPlanner, a sales tool primarily used by Pharma companies. 
							Final HTML is integrated in their iOS App. This demo has been 
							altered to run outside the intended app, which means some features have been disabled.
						</p>
						<p>
							Though it is designed for fullscreen viewing, it will not work as a standalone HTML5 app, due to its original
							nature.
						</p>
						<p>
							This project was begun shortly after the first iPad was released. New ground broken, new lessons learnt. The first
							iPad was particular prone to crashing from memory leaks, and this required some very creative approaches to
							make it work.
						</p>
						<p>
							Produced in 2010 in collaboration with Agnitio.<br />
							Technologies: HTML5, CSS3, JavaScript
						</p>
						<p class="note">Built using Manipulator 0.4.</p>
					</div>
				</li>
				<li>
					<h2>Nomeco - Warehouse packing status monitor</h2>
					<ul class="actions">
						<li><a href="http://nomeco.kaestel.dk" target="_blank" class="hardlink">http://nomeco.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "smartphone" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Status monitor slideshow for the warehouse packing team at Nomeco. Desktop only. Shown on large screen TV's in
							the packing facility, to give an overview of the workload/progress. It reads the packing status from their internal
							order/shipping system, and additionally a small ticker based on a feed from their Notes Intranet system.
						</p>
						<p>
							Produced in 2010 in collaboration with Lifted and Nomeco.<br />
							Technologies: HTML5, CSS3, JavaScript.
						</p>
						<p class="note">Built using Manipulator 0.3.</p>
					</div>
				</li>
				<li>
					<h2>mst.dk</h2>
					<ul class="actions">
						<li><a href="http://mst.kaestel.dk" target="_blank" class="hardlink">http://mst.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "smartphone" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Official site for Miljøstyrelsen (The Danish Environmental Protection Agency), a government institution for the
							protection of the environment.
							Desktop only. Support for IE6+, Firefox, Safari and Chrome.
						</p>
						<p>
							Public websites from this era had to conform to very strict validation and accessibility rules. The site
							is fully WAI, AAA and W3C validated and fully accessible via Screen Readers, so even blind people 
							could use it.
						</p>
						<p>
							The HTML still works in modern browsers 9 years later, without any modifications made to the 
							original codebase.
						</p>
						<p>
							Produced in 2009 in collaboration with 1508 A/S.<br />
							Technologies: HTML and CSS.
						</p>
					</div>

				</li>
				<li>
					<h2>Elsparefonden.dk</h2>
					<ul class="actions">
						<li><a href="http://elsparefonden.kaestel.dk" target="_blank" class="hardlink">http://elsparefonden.kaestel.dk</a></li>
					</ul>

					<div class="info">
						<?php
							if(
								$this->segment() == "seo" ||
								$this->segment() == "smartphone" ||
								$this->segment() == "mobile" ||
								$this->segment() == "mobile_light"
							) {
								print '<p class="invaliddevice">Your current browser cannot show this demo.</p>';
							}
						?>
						<p>
							Official site for Elsparefonden, the "save energy"-foundation established by the Danish government.
							Desktop only. Support for IE6+, Firefox, Opera and Safari. Chrome had not been invented yet.
							The first iPhone hit the market while we were producing the site. Imagine :-)
						</p>
						<p>
							Public websites from this era had to conform to very strict validation and accessibility rules. The site
							is fully WAI, AAA and W3C validated and fully accessible via Screen Readers, so even blind people 
							could use it.
						</p>
						<p>
							The HTML still works in modern browsers 10 years later, without any modifications made to the 
							original codebase.
						</p>
						<p>
							Produced in 2007 in collaboration with Kring e-Business Consulting and Viegand Maagøe.<br />
							Technologies: HTML, CSS, JavaScript.
						</p>
					</div>
				</li>
			</ul>

			<h2>Is that really all?</h2>
			<p>
				No. Some of my work cannot be showcased as it's deeply integrated with other systems. In other cases, I simply 
				deemed it too much work to make a demo. Or it was too boring (sorry clients). And then of course, there is all the stuff I don't have the source-code for
				anymore. I especially regret not having any of the really, really old stuff – but who could have known
				I'd survive this long.
			</p>
		</div>
	</div>

</div>

