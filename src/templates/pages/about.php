<div class="scene about i:scene">

	<div class="article" itemscope itemtype="http://schema.org/Article">
		<h1 itemprop="headline">About parentNode</h1>

		<ul class="info">
			<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", filemtime(__FILE__)) ?>"><?= date("Y-m-d, H:i", filemtime(__FILE__)) ?></li>
			<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", filemtime(__FILE__)) ?>"><?= date("Y-m-d, H:i", filemtime(__FILE__)) ?></li>
			<li class="author" itemprop="author">Martin Kæstel Nielsen</li>
			<li class="main_entity share" itemprop="mainEntityOfPage"><?= SITE_URL."/about" ?></li>
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
			<h2>
				On the first day there was HTML. The backend wasn't made until years later. God was clearly busy browsing
				the internet.
			</h2>
			<p>
				Technology should make life easier. Web technology should be centered on enabling frontend development,
				because that is where technology meets people, and at the end of the day - if not for us, the users, the people,
				then what for? Ease of use helps adaptation and minimizes support. Said in a business voice: It is an investment 
				in your success. And yet, most platforms out there are either focused on the backend development or the content 
				editing.
			</p>
			<p>
				A lot of things aren't exactly what they should be and some people use that as an excuse to
				accept pretty bad as good enough. They just continue down the same old path, blindly ignoring
				all warnings in the comfort of old habits and minimal effort. That is the problem, in general <em>and</em>
				in webdevelopment.
			</p>
			<p>
				parentNode is here to create balance, by providing new web ideas and methods designed to enable 
				frontend developers. parentNode is founded on an idealistic dedication to frontend 
				centered technology, because it is the only approach that makes sense when it comes to web
				development.
			</p>
			<p>
				parentNode is an anti-company created in 2008 by <a href="http://kaestel.dk" target="_blank">Martin Kæstel Nielsen</a> to 
				establish a platform for a strictly idealistic approach to webdevelopment. parentNode is not meant to conform to 
				the norm or meet a budget. Exploration is Success.
			</p>
			<p>
				parentNode is part of <a href="http://think.dk">think.dk</a> - a Copenhagen based think tank &amp; center for acceleration of sustainable change.
			</p>

			<h2>Get in touch</h2>
			<p>
				We are always looking for new project- or development partners, so feel free to contact us with any 
				questions, suggestions or comments.
			</p>
		</div>
	</div>

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

</div>