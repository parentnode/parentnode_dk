<?php
global $action;
global $IC;
global $itemtype;

$selected_tag = urldecode($action[1]);
$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "tags" => $itemtype.":".addslashes($selected_tag), "extend" => array("tags" => true, "user" => true, "readstate" => true)));

$categories = $IC->getTags(array("context" => $itemtype, "order" => "value"));

?>

<div class="scene posts tag i:scene">
	<h1>bLog</h1>

<? if($categories): ?>
	<div class="categories">
		<ul class="tags">
			<li><a href="/blog">All posts</a></li>
		<? foreach($categories as $tag): ?>
			<li<?= ($selected_tag == $tag["value"] ? ' class="selected"' : '') ?>><a href="/blog/tag/<?= urlencode($tag["value"]) ?>"><?= $tag["value"] ?></a></li>
			<? endforeach; ?>
		</ul>
	</div>
<? endif; ?>

<? 
  // CUSTOM TAG HEADERS - SHOULD BE DYNAMIC AT SOME POINT
  if($selected_tag == "Detector"): ?>

	<h2>Browsers, detection and segmentation.</h2>

<? elseif($selected_tag == "Segments"): ?>

	<h2>Detector segments explained.</h2>

<? elseif($selected_tag == "Janitor"): ?>

	<h2>Janitor tricks and tips.</h2>

<? elseif($selected_tag == "Browsers"): ?>

	<h2>Browsers in detail.</h2>

<? elseif($selected_tag == "Git"): ?>

	<h2>Git with it. My notes on how to use Git.</h2>

<? elseif($selected_tag == "Terminal"): ?>

	<h2>Terminal power for the wicked.</h2>

<? endif; ?>


<?	if($items): ?>
	<ul class="items articles i:articleMiniList">
		<? foreach($items as $item):
			$media = $IC->sliceMedia($item); ?>
		<li class="item article id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/NewsArticle"
			data-readstate="<?= $item["readstate"] ?>"
			>

			<ul class="tags">
			<? if($item["tags"]):
				$editing_tag = arrayKeyValue($item["tags"], "context", "editing");
				if($editing_tag !== false): ?>
				<li class="editing" title="This post is work in progress"><?= $item["tags"][$editing_tag]["value"] == "true" ? "Still editing" : $item["tags"][$editing_tag]["value"] ?></li>
				<? endif; ?>
				<li><a href="/blog">Posts</a></li>
				<? foreach($item["tags"] as $item_tag): ?>
					<? if($item_tag["context"] == $itemtype): ?>
				<li itemprop="articleSection"><a href="/blog/tag/<?= urlencode($item_tag["value"]) ?>"><?= $item_tag["value"] ?></a></li>
					<? endif; ?>
				<? endforeach; ?>
			<? endif; ?>
			</ul>

			<h3 itemprop="headline"><a href="/blog/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>


			<?= $HTML->articleInfo($item, "/blog/".$item["sindex"], $media, true) ?>


			<? if($item["description"]): ?>
			<div class="description" itemprop="description">
				<p><?= nl2br($item["description"]) ?></p>
			</div>
			<? endif; ?>

		</li>
		<? endforeach; ?>
	</ul>

<? else: ?>

	<h2>Technology needs humanity.</h2>
	<p>We could not find any posts with the selected tag.</p>

<? endif; ?>

</div>
