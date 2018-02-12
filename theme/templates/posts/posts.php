<?php
global $action;
global $IC;
global $itemtype;


// get post tags for listing
$categories = $IC->getTags(array("context" => $itemtype, "order" => "value"));
$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "extend" => array("tags" => true, "user" => true, "readstate" => true)));

?>

<div class="scene posts i:scene">
	<h1>bLog</h1>
	<p>
		Tech stuff all over. It's not really a Blog. <br />
		You'll figure it out, otherwise read the <a href="http://google.com/search?q=manual" target="_blank">manual</a>.
	</p>


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
			$media = $IC->sliceMedia($item); ?>
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
