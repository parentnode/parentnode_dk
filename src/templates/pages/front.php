<?php
$IC = new Items();

$page_item = $IC->getItem(array("tags" => "page:front", "extend" => array("user" => true, "mediae" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

$post_items = $IC->getItems(array("itemtype" => "post", "tags" => "on:frontpage", "status" => 1, "extend" => array("tags" => true, "readstate" => true, "user" => true, "mediae" => true)));
$event_items = $IC->getItems(array("itemtype" => "event", "tags" => "on:frontpage", "status" => 1, "extend" => array("tags" => true, "readstate" => true, "user" => true, "mediae" => true)));
	
?>
<div class="scene front i:front">

<? if($page_item && $page_item["status"]): 
	$media = $IC->sliceMedia($page_item); ?>
	<div class="article i:article" itemscope itemtype="http://schema.org/Article">

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>

		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>

		<? if($page_item["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page_item["subheader"] ?></h2>
		<? endif; ?>

		<ul class="info">
			<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($page_item["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($page_item["published_at"])) ?></li>
			<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", strtotime($page_item["modified_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($page_item["published_at"])) ?></li>
			<li class="author" itemprop="author"><?= $page_item["user_nickname"] ?></li>
			<li class="main_entity share" itemprop="mainEntityOfPage"><?= SITE_URL ?></li>
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
			<? if($media): ?>
				<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/images/<?= $page_item["item_id"] ?>/<?= $media["variant"] ?>/720x.<?= $media["format"] ?>"></span>
				<span class="image_width" itemprop="width" content="720"></span>
				<span class="image_height" itemprop="height" content="<?= floor(720 / ($media["width"] / $media["height"])) ?>"></span>
			<? else: ?>
				<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/img/logo-large.png"></span>
				<span class="image_width" itemprop="width" content="720"></span>
				<span class="image_height" itemprop="height" content="405"></span>
			<? endif; ?>
			</li>
		</ul>

		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>
	</div>
<? endif; ?>


<? if($post_items): ?>
	<div class="news">
		<h2>Latest news</h2>
		<ul class="items articles">
		<? foreach($post_items as $item): 
			$media = $IC->sliceMedia($item); ?>
			<li class="item article id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/NewsArticle"
				data-readstate="<?= $item["readstate"] ?>"
				>

				<ul class="tags">
				<? if($item["tags"]):
					// editing?
					$editing_tag = arrayKeyValue($item["tags"], "context", "editing"); ?>

					<? if($editing_tag !== false): ?>
					<li class="editing" title="This post is work in progress"><?= $item["tags"][$editing_tag]["value"] == "true" ? "Still editing" : $item["tags"][$editing_tag]["value"] ?></li>
					<? endif; ?>

					<li><a href="/blog">Posts</a></li>
					<? foreach($item["tags"] as $item_tag): ?>
						<? if($item_tag["context"] == "post"): ?>
					<li itemprop="articleSection"><a href="/blog/tag/<?= urlencode($item_tag["value"]) ?>"><?= $item_tag["value"] ?></a></li>
						<? endif; ?>
					<? endforeach; ?>
				<? endif; ?>
				</ul>

				<h3 itemprop="headline"><a href="/blog/<?= $item["sindex"] ?>"><?= preg_replace("/<br>|<br \/>/", "", $item["name"]) ?></a></h3>

				<ul class="info">
					<li class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($item["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($item["published_at"])) ?></li>
					<li class="modified_at" itemprop="dateModified" content="<?= date("Y-m-d", strtotime($item["modified_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($item["published_at"])) ?></li>
					<li class="author" itemprop="author"><?= $item["user_nickname"] ?></li>
					<li class="main_entity" itemprop="mainEntityOfPage"><?= SITE_URL."/blog/".$item["sindex"] ?></li>
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
					<? if($media): ?>
						<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/images/<?= $item["item_id"] ?>/<?= $media["variant"] ?>/720x.<?= $media["format"] ?>"></span>
						<span class="image_width" itemprop="width" content="720"></span>
						<span class="image_height" itemprop="height" content="<?= floor(720 / ($media["width"] / $media["height"])) ?>"></span>
					<? else: ?>
						<span class="image_url" itemprop="url" content="<?= SITE_URL ?>/img/logo-large.png"></span>
						<span class="image_width" itemprop="width" content="720"></span>
						<span class="image_height" itemprop="height" content="405"></span>
					<? endif; ?>
					</li>
				</ul>

				<? if($item["html"]): ?>
				<div class="articlebody" itemprop="articleBody">
					<?= $item["html"] ?>
				</div>
				<? endif; ?>

			</li>
		<? endforeach; ?>
		</ul>

	</div>
<?	endif; ?>


	<div class="usedby">
		<h2>Selected clients</h2>
		<ul>
			<li class="distortion" title="Distortion">Distortion</li>
			<li class="landskabsarkitekter" title="Danske Landskabsarkitekter">Danske Landskabsarkitekter</li>
			<li class="torvehallerne" title="Torvehallerne">Torvehallerne</li>
			<li class="urbangreen" title="URBAN GREEN">URBAN GREEN</li>
			<li class="metro" title="Copenhagen Metro">Copenhagen Metro</li>
		</ul>
	</div>
</div>
