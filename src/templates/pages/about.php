<div class="scene about i:scene">

	<div class="article" itemscope itemtype="http://schema.org/Article">
		<h1 itemprop="name">About parentNode</h1>

		<dl class="info">
			<dt class="published_at">Date published</dt>
			<dd class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", filemtime(__FILE__)) ?>"><?= date("Y-m-d, H:i", filemtime(__FILE__)) ?></dd>
			<dt class="author">Author</dt>
			<dd class="author" itemprop="author">Martin Kæstel Nielsen</dd>
		</dl>

		<div class="articlebody" itemprop="articleBody">
			<p>
				parentNode ApS was founded in 2008 by <a href="http://kaestel.dk" target="_blank">Martin Kæstel Nielsen</a> to 
				enable investment of time into an idealistic approach to webdevelopment. parentNode is not meant to conform to 
				standards or meet a budget. Exploration is Success.
			</p>

			<h2>Get in touch</h2>
			<p>
				We are always looking for new business or development partners, so feel free to contact us with any 
				questions, suggestions or comments.
			</p>
		</div>
	</div>

	<div class="vcard company" itemscope itemtype="http://schema.org/Organization">
		<div class="name fn org" itemprop="name">parentNode.dk</div>
		<div class="tel" itemprop="telephone"><a href="callto:+4520742819">+45 2074 2819</a></div>
		<div class="email" itemprop="email"><a href="mailto:info@parentnode.dk">info@parentnode.dk</a></div>
	</div>
</div>