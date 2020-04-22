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
					<li class="name" itemprop="name">parentnode.dk</li>
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
				We are web developers. Frontend specialists with backend skills.
				Here is a small collection of demos of some of the work we've done over the years. 
			</p>
			<h2>
				How do you show off code?
			</h2>
			<p>
				We figured it wouldn't make sense to show a bunch of screenshots, since we didn't make the design anyway. 
				Well, in some cases we did, but don't tell anyone. We are not designers; we just make things work.
				But the point is, you kinda have to see the sites running in a browser to get a sense of what we did. 
			</p>
			<p>	
				The web is a living organism, so most of the sites listed below are no longer online in their original form. 
				That is why we made these custom demo versions, where some functionality may be disabled.
			</p>
			<p>
				For the sake of not having these sites indexed by search engines, we have added a simple login.
				The username is: <em>demo</em>. If you spell it backwards, you'll have the password.
			</p>
			<p>
				So, take a look. And remember, we did all the stuff you can't really see, unless you look under the hood :-)
			</p>
		</div>	

		<div class="articlebody demos">
			<ul class="demos">
				<li class="demo">
					<h2>Mit GreenSpeak – Self-service application for charitable phone service provider, GreenSpeak</h2>
					<ul class="actions">
						<li><a href="https://mit.greenspeak.dk" target="_blank" class="hardlink">https://mit.greenspeak.dk</a></li>
					</ul>

					<ul class="tags">
						<li>javascript</li>
						<li>html</li>
						<li>css</li>
						<li>websites</li>
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
							<em>Note:</em> This is a "live"-demo. We didn't have time to make a full demo yet. We are busy doing real stuff :-)
						</p>
						<p>
							Full self-service application for GreenSpeak subscribers, enabling them to maintain and modify
							any aspect of their phone subscription from their phone or desktop computer.
						</p>
						<p>
							This is the first of a series of self-service application we are developing and maintaining
							for GreenSpeak. The goal is to ensure a complete suite of self-service applications, grating the
							customer full control over their subscription(s), while still having access to a real-life, 
							hands-on customer service.
						</p>
						<p>
							Produced in 2019 in collaboration with GreenSpeak.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, Apache and dedicated hosting on Linux.
						</p>
						<p class="note">Built using Manipulator v0.9.3, Templator v3.0 and Detector v4.0.</p>
					</div>
				</li>
				<li class="demo">
					<h2>Boye & Spellerberg – corporate website for Ad- and communication agency, Boye & Spellerberg</h2>
					<ul class="actions">
						<li><a href="https://boyespellerberg.dk" target="_blank" class="hardlink">https://boyespellerberg.dk</a></li>
					</ul>

					<ul class="tags">
						<li>javascript</li>
						<li>html</li>
						<li>css</li>
						<li>websites</li>
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
							<em>Note:</em> This is a "live"-demo. We didn't have time to make a full demo yet. We are busy doing real stuff :-)
						</p>
						<p>
							Corporate website for Ad- and communication agency, Boye & Spellerberg. The client wanted a fully
							customized design, with a specific off-grid grid – and luckily that is what our platform has been designed 
							to accommodate.
						</p>
						<p>
							High resolution images and video, and a flexible project material viewer. Everything is editable by the client
							but still kept in a tight design grip, to ensure long term compliance.
						</p>
						<p>
							Produced in 2019 in collaboration with Boye & Spellerberg.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, MariaDB, Apache and dedicated hosting on Linux.
						</p>
						<p class="note">Built using Manipulator v0.9.3, Janitor v0.7.8, Templator v3.0 and Detector v4.0.</p>
					</div>
				</li>
				<li class="demo">
					<h2>Scor med Poulsen – Campaign website for Tuborg</h2>
					<ul class="actions">
						<li><a href="http://demo-scormedpoulsen.parentnode.dk" target="_blank" class="hardlink">http://demo-scormedpoulsen.parentnode.dk</a></li>
					</ul>

					<ul class="tags">
						<li>javascript</li>
						<li>html</li>
						<li>css</li>
						<li>websites</li>
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
							Campaign website for the Tuborg Breweries – based on over-the-edge pick-up lines. The website was launched alongside a TV, radio and print campaign
							and allowed users to create the own pick-up Memes. The system included liking, admin moderation and a word
							filter to minimize the potential absurdity of this campaign :-)
						</p>
						<p>
							Produced in 2019 in collaboration with Animated and WDP.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, MariaDB, Apache and dedicated hosting on Linux.
						</p>
						<p class="note">Built using Manipulator v0.9.3, Janitor v0.7.7, Templator v3.0 and Detector v4.0.</p>
					</div>
				</li>
				<li class="demo">
					<h2>Sanctum Ananda – Bespoke luxury holiday retreats</h2>
					<ul class="actions">
						<li><a href="http://demo-sanctumananda.parentnode.dk" target="_blank" class="hardlink">http://demo-sanctumananda.parentnode.dk</a></li>
					</ul>

					<ul class="tags">
						<li>javascript</li>
						<li>html</li>
						<li>css</li>
						<li>websites</li>
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
							Concept website for Sanctum Ananda – an investment company working to establish co-owned 
							luxury holiday retreats. The website is designed to explain the concept and to support
							the process of attracting potential investors.
						</p>
						<p>
							The project was re-designed in late 2019 (also implemented by us) and can also be seen in the
							new colors here: https://sanctumananda.com/.
						</p>
						<p>
							Produced in 2019 in collaboration with Sanctum Ananda.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, Apache and dedicated hosting on Linux.
						</p>
						<p class="note">Built using Manipulator v0.9.3, Janitor v0.7.8, Templator v3.0 and Detector v4.0.</p>
					</div>
				</li>
				<li class="demo">
					<h2>Er det J-dag? – Campaign website for Tuborg Julebryg</h2>
					<ul class="actions">
						<li><a href="http://demo-erdetjdag.parentnode.dk" target="_blank" class="hardlink">http://demo-erdetjdag.parentnode.dk</a></li>
					</ul>

					<ul class="tags">
						<li>javascript</li>
						<li>html</li>
						<li>css</li>
						<li>websites</li>
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
							Annually re-occurring campaign website for the infamous Tuborg Julebryg (Christmas beer). The beer is
							released at a specified time every year and some people tend to gather in bars to get the first one of the year.
						</p>
						<p>
							The current count-down site for 2020 can be seen live here: http://www.erdetjdag.dk/
						</p>
						<p>
							Produced in 2018 in collaboration with Animated and WDP.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, Apache and dedicated hosting on Linux.
						</p>
						<p class="note">Built using Manipulator v0.9.3, Janitor v0.7.7, Templator v3.0 and Detector v3.0.</p>
					</div>
				</li>
				<li class="demo">
					<h2>Himmelmekanik.dk – New album by Marc Facchini</h2>
					<ul class="actions">
						<li><a href="http://demo-himmelmekanik.parentnode.dk" target="_blank" class="hardlink">http://demo-himmelmekanik.parentnode.dk</a></li>
					</ul>

					<ul class="tags">
						<li>javascript</li>
						<li>html</li>
						<li>css</li>
						<li>websites</li>
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
							Album release project for Marc Facchini's new album – Himmelmekanik. We purposefully created "the
							simplest and most difficult listening experience" (Gaffa, 2018), to challenge the non-attentive shallow
							consumption of music.
						</p>
						<p>
							The site was awarded an honorary mention by the Webby Awards and nominated for an International Music Award.
						</p>
						<p>
							Produced in 2018 in collaboration with Marc Facchini, Christian Langballe and Bo Fløjborg.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, Apache and dedicated hosting on Linux.
						</p>
						<p class="note">Built using Manipulator v0.9.2, Janitor v0.7.7, Templator v3.0 and Detector v3.0.</p>
					</div>
				</li>
				<li class="demo">
					<h2>L&aring;n &amp; Spar Bank – Targeted mini survey</h2>
					<ul class="actions">
						<li><a href="http://demo-lsb-survey.parentnode.dk" target="_blank" class="hardlink">http://demo-lsb-survey.parentnode.dk</a></li>
					</ul>

					<ul class="tags">
						<li>javascript</li>
						<li>html</li>
						<li>css</li>
						<li>websites</li>
						<li>web apps</li>
						<li>banners</li>
						<li>games</li>
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
						<p>Part of a series of campaign websites for L&aring;n &amp; Spar Bank.	</p>
						<p>
							Survey with 10 questions targeted towards teachers, nurses, and academics. Desktop, tablet and smartphone. Instant statistical visual feedback based on the total sum of answers from all participants.
							Backend for collecting answers and signups.
						</p>
						<p>
							The page had integrated device detection, and it was able to route internal links to either the desktop or smartphone
							version respectively, which in this case were two different urls. We built the page to work as a take-over, directly extending a page
							in the bank's main CMS. This allowed the marketing department to edit the texts as needed, while all campaign
							material and data collection endpoints were hosted on a separate server, giving us full development control.
							This was done to avoid dependencies to L&aring;n &amp; Spar Bank's own IT department.
						</p>
						<p>
							Produced in 2017 in collaboration with Lån &amp; Spar Bank and We❤︎People.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, MySQL, Apache and dedicated hosting on Linux.
						</p>
						<p class="note">Built using Manipulator v0.9.2, Janitor v0.7.7, Templator v2.0 and Detector v3.0.</p>
					</div>
				</li>
				<li class="demo">
					<h2>Stofa – Valget er dit</h2>
					<ul class="actions">
						<li><a href="http://demo-valgeterdit.parentnode.dk" target="_blank" class="hardlink">http://demo-valgeterdit.parentnode.dk</a></li>
					</ul>

					<ul class="tags">
						<li>peter</li>
						<li>søren</li>
						<li>martin</li>
						<li>websites</li>
						<li>web apps</li>
						<li>banners</li>
						<li>games</li>
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
							Campaign website for Stofa. Desktop, tablet and smartphone.
							Quiz with 6 rounds – a new round automatically launching every Monday. A couple of months later
							we did a fully re-skinned version 2. Backend for validating and collecting
							user answers and signups.
						</p>
						<p>
							Produced in 2017 in collaboration with Animated, WDP and Stofa IT.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, MySQL.
						</p>
						<p class="note">Built using Manipulator v0.9.2, Janitor v0.7.7, Templator v2.0 and Detector v3.0.</p>
					</div>
				</li>
				<li class="demo">
					<h2>Distortion – Gadearmbånd</h2>
					<ul class="actions">
						<li><a href="http://demo-gadearmbaand.parentnode.dk" target="_blank" class="hardlink">http://demo-gadearmbaand.parentnode.dk</a></li>
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
				<li class="demo">
					<h2>Digital vælgererklæring – Alternativet</h2>
					<ul class="actions">
						<li><a href="http://demo-alternativet.parentnode.dk" target="_blank" class="hardlink">http://demo-alternativet.parentnode.dk</a></li>
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
							Denmark. In total, the party collected more than 50.000 signatures over 5 months and was voted
							into Parliament at the next election.
						</p>
						<p>
							A few months earlier, we had developed the first ever digital voter declaration system in
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
				<li class="demo">
					<h2>Dukkepartiet</h2>
					<ul class="actions">
						<li><a href="http://demo-dukkepartiet.parentnode.dk" target="_blank" class="hardlink">http://demo-dukkepartiet.parentnode.dk</a></li>
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
							Web site for protest party / political satire group, Dukkepartiet (The Puppet Party). 
							Support for desktop, tablet and smartphone (limited content). All content editable via 
							backend and integration of YouTube videos.
						</p>
						<p>
							In the spirit of the project we decided to challenge the system and build the first ever
							digital voter declaration system, essentially to make it easier for new parties to collect
							the signatures required to run for Parliament. The system was officially approved by the
							Ministry of Interior (Indenrigsministeriet), and shortly after adopted by new green party, 
							Alternativet.
						</p>
						<p>
							Produced in 2014 in collaboration with e-Types and Dukkepartiet.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, MySQL, Apache, Dedicated hosting on Linux.
						</p>
						<p class="note">Built using Manipulator v0.9, Janitor v0.7, Templator v1.0 and Detector v2.0.</p>
					</div>
				</li>
				<li class="demo">
					<h2>OeO - Website</h2>
					<ul class="actions">
						<li><a href="http://demo-oeo.parentnode.dk" target="_blank" class="hardlink">http://demo-oeo.parentnode.dk</a></li>
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
							Corporate website for design agency OeO. Desktop and tablet. Simple contact page for smartphone visitors. Backend for everything.
						</p>
						<p>
							We pushed the performance limits of the iPad to the max on this one – probably overdoing it a little for the time. 
						</p>
						<p>
							Produced in 2014 in collaboration with e-Types.<br />
							Technologies: JavaScript, HTML5, CSS3, PHP, MySQL, Apache, Dedicated hosting on Linux.
						</p>
						<p class="note">Built using Manipulator v0.8, Janitor v0.7, Templator v1.0 and Detector v1.0.</p>
					</div>
				</li>
				<li class="demo">
					<h2>e-Types.com - Website</h2>
					<ul class="actions">
						<li><a href="http://demo-e-types.parentnode.dk" target="_blank" class="hardlink">http://demo-e-types.parentnode.dk</a></li>
					</ul>

					<div class="info">
						<p>
							Corporate website for the design and identity agency, e-Types. Made for all browser segments (desktop, 
							desktop_light, smartphone, tablet, mobile), so it works in anything from the newest 
							Chrome to Internet Explorer 6; from the newest iPhones to the oldest Nokia feature
							phones.
						</p>
						<p>
							In the desktop version the frontpage contains a scalable pixel perfect custom grid, with three intervals,
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
				<li class="demo">
					<h2>HTML5 WebApp</h2>
					<ul class="actions">
						<li><a href="http://demo-html5-app.parentnode.dk" target="_blank" class="hardlink">http://demo-html5-app.parentnode.dk</a></li>
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
							HTML5 WebApp demo made primarily to demonstrate animation performance and "native" appearance
							of WebApps as a response to the AppStore/native app frenzy.
						</p>
						<p>
							Produced in 2013.<br />
							Technologies: HTML5, CSS3, JavaScript.
						</p>
						<p class="note">Built using Manipulator 0.7 and Templator v1.0.</p>
					</div>
				</li>
				<li class="demo">
					<h2>Hemocue WebApp</h2>
					<ul class="actions">
						<li><a href="http://demo-hemocue.parentnode.dk" target="_blank" class="hardlink">http://demo-hemocue.parentnode.dk</a></li>
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
							Radiometer, and the project was cancelled before we really got started.
						</p>
						<p>
							Produced in 2012.<br />
							Technologies: HTML5, CSS3, JavaScript.
						</p>
						<p class="note">Built using Manipulator 0.7 and Templator v1.0.</p>
					</div>
				</li>
				<li class="demo">
					<h2>Wibroe, Duckert &amp; Partners - Website</h2>
					<ul class="actions">
						<li><a href="http://demo-wdp.parentnode.dk" target="_blank" class="hardlink">http://demo-wdp.parentnode.dk</a></li>
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
							Small temporary website for Wibroe, Duckert &amp; Partners (WDP), while they transitioned to a new 
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
				<li class="demo">
					<h2>Partnersproduction - Website</h2>
					<ul class="actions">
						<li><a href="http://demo-partnersproduction.parentnode.dk" target="_blank" class="hardlink">http://demo-partnersproduction.parentnode.dk</a></li>
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
							Small temporary website for Partners production, while they transitioned to a new organisation structure. Desktop, tablet and 
							smartphone. Mostly just an online business card.
						</p>
						<p>
							Produced in 2012 in collaboration with WDP/Netpeople/Peoplegroup.<br />
							Technologies: HTML5, CSS3, JavaScript.
						</p>
						<p class="note">Built using Manipulator 0.7 and Templator v1.0.</p>
					</div>
				</li>
				<li class="demo">
					<h2>tuborg.dk - Website</h2>
					<ul class="actions">
						<li><a href="http://demo-tuborg.parentnode.dk" target="_blank" class="hardlink">http://demo-tuborg.parentnode.dk</a></li>
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
						<p>Corporate website for Tuborg with a, for the time, heavy use of animations. Desktop and tablet.</p>
						<p>
							Produced in 2012 in collaboration with Netpeople/WDP.<br />
							Technologies: JavaScript, HTML5, CSS3, Ruby on Rails.
						</p>
						<p class="note">Built using Manipulator 0.5.</p>
					</div>
				</li>
				<li class="demo">
					<h2>peoplegroup.dk - Website</h2>
					<ul class="actions">
						<li><a href="http://demo-peoplegroup.parentnode.dk" target="_blank" class="hardlink">http://demo-peoplegroup.parentnode.dk</a></li>
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
				<li class="demo">
					<h2>netpeople.dk - Website</h2>
					<ul class="actions">
						<li><a href="http://demo-netpeople.parentnode.dk" target="_blank" class="hardlink">http://demo-netpeople.parentnode.dk</a></li>
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
							the entire PeopleGroup organisation. The main site was inverted, as can be seen
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
				<li class="demo">
					<h2>Microsoft, Windows 8 - Responsive HTML5 banners</h2>
					<ul class="actions">
						<li><a href="http://demo-win8.parentnode.dk" target="_blank" class="hardlink">http://demo-win8.parentnode.dk</a></li>
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
							devices and smooth playback. This was something else back in 2012, when HTML banners were just barely beginning
							to be supported by the banner systems.
						</p>
						<p>
							Produced in 2012 in collaboration with Wunderman.<br />
							Technologies: HTML5, CSS3, JavaScript.
						</p>
						<p class="note">Built using Manipulator 0.6.</p>
					</div>
				</li>
				<li class="demo">
					<h2>Whil.com - Pitch website</h2>
					<ul class="actions">
						<li><a href="http://demo-whil.parentnode.dk" target="_blank" class="hardlink">http://demo-whil.parentnode.dk</a></li>
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
				<li class="demo">
					<h2>Novo - Mobile website</h2>
					<ul class="actions">
						<li><a href="http://demo-novo-mobile.parentnode.dk" target="_blank" class="hardlink">http://demo-novo-mobile.parentnode.dk</a></li>
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
				<li class="demo">
					<h2>Vestas online - Frontend HTML templates and JavaScript framework</h2>
					<ul class="actions">
						<li><a href="http://demo-vestas.parentnode.dk" target="_blank" class="hardlink">http://demo-vestas.parentnode.dk</a></li>
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
				<li class="demo">
					<h2>BR, GakGak - HTML5 game for Danish carnival</h2>
					<ul class="actions">
						<li><a href="http://demo-gakgak.parentnode.dk" target="_blank" class="hardlink">http://demo-gakgak.parentnode.dk</a></li>
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
				<li class="demo">
					<h2>MCreative Group - Website</h2>
					<ul class="actions">
						<li><a href="http://demo-mcreativegroup.parentnode.dk" target="_blank" class="hardlink">http://demo-mcreativegroup.parentnode.dk</a></li>
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
				<li class="demo">
					<h2>Fri for mobberi - HTML5 version of existing Flash site</h2>
					<ul class="actions">
						<li><a href="http://demo-friformobberi.parentnode.dk" target="_blank" class="hardlink">http://demo-friformobberi.parentnode.dk</a></li>
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
							Non flash version of Fri for mobberi, primarily for the iPad where there is no Flash plugin. Included a lot
							of fancy stuff for the time, like CSS animations and a jumping game with cute sounds. The best part was clearly
							failing the game. 
						</p>
						<p>
							Produced in 2011 in collaboration with Contentcube.<br />
							Technologies: JavaScript, HTML5, CSS3.
						</p>
						<p class="note">Built using Manipulator 0.3.</p>
					</div>
				</li>
				<li class="demo">
					<h2>Amgen, Aranesp – Product presentation for iPad</h2>
					<ul class="actions">
						<li><a href="http://demo-aranesp.parentnode.dk" target="_blank" class="hardlink">http://demo-aranesp.parentnode.dk</a></li>
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
				<li class="demo">
					<h2>Amgen, Mimpara - Product presentation for iPad</h2>
					<ul class="actions">
						<li><a href="http://demo-mimpara.parentnode.dk" target="_blank" class="hardlink">http://demo-mimpara.parentnode.dk</a></li>
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
				<li class="demo">
					<h2>Amgen, Neulasta - Product presentation for iPad</h2>
					<ul class="actions">
						<li><a href="http://demo-neulasta.parentnode.dk" target="_blank" class="hardlink">http://demo-neulasta.parentnode.dk</a></li>
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
				<li class="demo">
					<h2>Sanofi/Avensis - Product presentation for iPad</h2>
					<ul class="actions">
						<li><a href="http://demo-sanofi.parentnode.dk" target="_blank" class="hardlink">http://demo-sanofi.parentnode.dk</a></li>
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
				<li class="demo">
					<h2>Nomeco - Warehouse packing status monitor</h2>
					<ul class="actions">
						<li><a href="http://demo-nomeco.parentnode.dk" target="_blank" class="hardlink">http://demo-nomeco.parentnode.dk</a></li>
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
				<li class="demo">
					<h2>mst.dk</h2>
					<ul class="actions">
						<li><a href="http://demo-mst.parentnode.dk" target="_blank" class="hardlink">http://demo-mst.parentnode.dk</a></li>
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
				<li class="demo">
					<h2>Elsparefonden.dk</h2>
					<ul class="actions">
						<li><a href="http://demo-elsparefonden.parentnode.dk" target="_blank" class="hardlink">http://demo-elsparefonden.parentnode.dk</a></li>
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
				No. Some of our work cannot be showcased as it's deeply integrated with other systems. In other cases, we simply 
				deemed it too much work to make a demo. Or it was too boring (sorry clients). And then of course, there is all the stuff we don't have the source-code for
				anymore. Says our founder, <a href="http://kaestel.dk" target="_blank">Martin</a>: "I especially regret not having any of the really, really old stuff – but who could have known
				I'd survive this long?"
			</p>
		</div>
	</div>

</div>

