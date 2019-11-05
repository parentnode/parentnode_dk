<?php
global $action;
global $IC;
global $itemtype;

$page_item = $IC->getItem(array("tags" => "page:blog", "status" => 1, "extend" => array("user" => true, "mediae" => true, "tags" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

// get post tags for listing
$categories = $IC->getTags(array("context" => $itemtype, "order" => "value"));
$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "extend" => array("tags" => true, "user" => true, "readstate" => true)));

?>

<div class="scene posts i:scene">


<? if($page_item): 
	$media = $IC->sliceMediae($page_item, "single_media"); ?>
	<div class="article i:article" itemscope itemtype="http://schema.org/Article">

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>


		<?= $HTML->articleTags($page_item, [
			"context" => false
		]) ?>


		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>

		<? if($page_item["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page_item["subheader"] ?></h2>
		<? endif; ?>


		<?= $HTML->articleInfo($page_item, "/blog", [
			"media" => $media,
		]) ?>


		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>
	</div>

<? else: ?>

	<h1>bLog</h1>
	<p>
		Tech stuff all over. It's not really a (we)Blog. <br />
		You'll figure it out, otherwise read the <a href="http://google.com/search?q=manual" target="_blank">manual</a>.
	</p>

<? endif; ?>


<? if($categories): ?>
	<div class="categories">
		<ul class="tags">
			<li class="selected"><a href="/blog">All posts</a></li>
			<? foreach($categories as $tag): ?>
			<li><a href="/blog/tag/<?= urlencode($tag["value"]) ?>"><?= $tag["value"] ?></a></li>
			<? endforeach; ?>
		</ul>
	</div>
<? endif; ?>


<? if($items): ?>
	<ul class="articles i:articleMiniList">
		<? foreach($items as $item):
			$media = $IC->sliceMediae($item, "mediae"); ?>
		<li class="item article id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/NewsArticle"
			data-readstate="<?= $item["readstate"] ?>"
			>


			<?= $HTML->articleTags($item, [
				"context" => [$itemtype],
				"url" => "/blog/tag",
				"default" => ["/blog", "Posts"]
			]) ?>


			<h3 itemprop="headline"><a href="/blog/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>


			<?= $HTML->articleInfo($item, "/blog/".$item["sindex"], [
				"media" => $media, 
				"sharing" => true
			]) ?>


			<? if($item["description"]): ?>
			<div class="description" itemprop="description">
				<p><?= nl2br($item["description"]) ?></p>
			</div>
			<? endif; ?>

		</li>
		<? endforeach; ?>
	</ul>
	
<? else: ?>
	<p>No posts</p>
<? endif; ?>

</div>
