<div class="scene front i:front">

	<div class="article" itemscope itemtype="http://schema.org/Article">
		<h1 itemprop="name">You have to start somewhere ...</h1>

		<dl class="info">
			<dt class="published_at">Date published</dt>
			<dd class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", filemtime(__FILE__)) ?>"><?= date("Y-m-d, H:i", filemtime(__FILE__)) ?></dd>
			<dt class="author">Author</dt>
			<dd class="author" itemprop="author">Martin Kæstel Nielsen</dd>
		</dl>

		<div class="articlebody" itemprop="articleBody">

			<p>
				Perfect is an illusion. We all have our own idea of perfect, reflecting our own priorities,
				needs and desires. More often than not we are forced to accept a level far below our own idea of
				perfection. To me that is deeply depressing and this is my compensation.
			</p>
			<p>
				In my persuit of perfection I have built a full stack platform for web development. Always
				prioritizing frontend development and content accissibility, while keeping complexity low and 
				flexibility high. With no compromises because I never had a deadline.
			</p>
			<p>
				I am this stubborn because I love coding and hate restrictions. Everything is open source and
				forkable on GitHub. Try it out on your next project.
			</p>

			<h2>The parentNode platform</h2>
			<ul class="projects">
				<li class="manipulator">
					<h3><a href="http://manipulator.parentnode.dk" target="_blank">Manipulator</a></h3>
					<p>
						Manipulator is an extremely flexible, performance optimized JavaScript library 
						and framework with a slightly neurotic focus on details. Simple DOM manipulations
						or advanced Animations. It is 8 times faster than jQuery.
					</p>
				</li>
				<li class="janitor">
					<h3><a href="http://janitor.parentnode.dk" target="_blank">Janitor</a></h3>
					<p>
						Janitor is a PHP content management developer toolkit, designed to build custom 
						content managements systems, not to be one on its own. A simple item-based model
						allows you to extend Janitor in any way you want.
					</p>
				</li>
				<li class="modulator">
					<h3><a href="http://modulator.parentnode.dk" target="_blank">Modulator</a></h3>
					<p>
						Modulator is a SEO optimized HTML model for web development, that allows for a 
						complete separation of content, design and functionality. Get ready for copy/paste
						markup for any site.
					</p>
				</li>
				<li class="detector">
					<h3><a href="http://detector.parentnode.dk" target="_blank">Detector</a></h3>
					<p>
						Detector is your one-stop solution to supporting all HTML capable devices on earth and 
						lowering your development complexity at the same time. Providing you with a simple model
						for mixing up your own device support in any given project.
					</p>
				</li>
			</ul>

			<h2>Want to contribute?</h2>
			<p>
				We always need help. Send an email to 
				<a href="mailto:contribute@parentnode.dk">contribute@parentnode.dk</a> to join the team.
			</p>
		</div>
	</div>
</div>
