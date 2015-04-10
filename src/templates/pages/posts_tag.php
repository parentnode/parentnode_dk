<?php
global $action;
global $IC;
global $itemtype;

$tag = urldecode($action[1]);
$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "tags" => $itemtype.":".addslashes($tag), "extend" => array("tags" => true, "readstate" => true)));

?>

<div class="scene posts tag i:scene">
	<h1><?= $tag ?></h1>

<?	if($items): ?>

	<ul class="articles i:articlelist">
<?		foreach($items as $item): ?>
		<li class="article id:<?= $item["item_id"] ?> readstate:<?= $item["readstate"] ? 1 : "" ?>">

			<ul class="tags">
<?			if($item["tags"]): ?>
<?				if(arrayKeyValue($item["tags"], "context", "editing")): ?>
					<li class="editing" title="This post is work in progress">Still editing</li>
<?				endif; ?>
				<li><a href="/blog">Posts</a></li>
<?				foreach($item["tags"] as $item_tag): ?>
<?	 				if($item_tag["context"] == $itemtype): ?>
				<li><a href="/blog/tag/<?= urlencode($item_tag["value"]) ?>"><?= $item_tag["value"] ?></a></li>
<?					endif; ?>
<?				endforeach; ?>
<?			endif; ?>
			</ul>

			<h3><a href="/blog/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>
			<p><?= $item["description"] ?></p>

		</li>
<?		endforeach; ?>
	</ul>
<? endif; ?>

</div>
