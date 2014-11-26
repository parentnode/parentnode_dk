<?php
global $action;
$IC = new Items();
$itemtype = "post";


// get post tags for listing
$categories = $IC->getTags(array("context" => $itemtype));


// get paginated content
$limit = stringOr(getVar("limit"), 6);
$sindex = isset($action[0]) ? $action[0] : false;
$direction = isset($action[1]) ? $action[1] : false; 

$pattern = array("itemtype" => $itemtype, "status" => 1, "extend" => array("tags" => true, "user" => true));
$pagination = $IC->paginate(array("pattern" => $pattern, "sindex" => $sindex, "limit" => $limit, "direction" => $direction));

?>

<div class="scene posts i:scene">
	<h1>bLog</h1>
	<p>
		Tech stuff all over. It's not really a Blog.
	</p>

	<div class="categories">
<?	if($categories): ?>
		<h2>Categories</h2>
		<ul class="tags">
<?		foreach($categories as $tag): ?>
			<li><a href="/blog/tag/<?= urlencode($tag["value"]) ?>"><?= $tag["value"] ?></a></li>
<?		endforeach; ?>
		</ul>
<?	endif; ?>
	</div>

<?	if($pagination["range_items"]): ?>
	<ul class="items postings i:articlelist">
<?		foreach($pagination["range_items"] as $item):
			$media = $IC->sliceMedia($item); ?>
		<li class="item post id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

<?			if($media): ?>
			<div class="image image_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
<?			endif; ?>

			<ul class="tags">
				<li><a href="/blog">Posts</a></li>
<?			if($item["tags"]): ?>
<?				foreach($item["tags"] as $item_tag): ?>
<?	 				if($item_tag["context"] == $itemtype): ?>
				<li><a href="/blog/tag/<?= urlencode($item_tag["value"]) ?>" itemprop="articleSection"><?= $item_tag["value"] ?></a></li>
<?					endif; ?>
<?				endforeach; ?>
<?			endif; ?>
			</ul>

			<h2 itemprop="name"><?= $item["name"] ?></h2>

			<dl class="info">
				<dt class="published_at">Date published</dt>
				<dd class="published_at" itemprop="datePublished" content="<?= date("Y-m-d", strtotime($item["published_at"])) ?>"><?= date("Y-m-d, H:i", strtotime($item["published_at"])) ?></dd>
				<dt class="author">Author</dt>
				<dd class="author" itemprop="author"><?= $item["user_nickname"] ?></dd>
				<dt class="hardlink">Hardlink</dt>
				<dd class="hardlink" itemprop="url"><a href="<?= SITE_URL."/blog/".$item["sindex"]; ?>" target="_blank"><?= $hardlink ?></a></dd>
			</dl>

			<div class="description" itemprop="articleBody">
				<?= $item["html"] ?>
			</div>
<?			if($item["mediae"]):
				foreach($item["mediae"] as $media): ?>
			<div class="image image_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
<? 				endforeach;
			endif; ?>

		</li>
<?		endforeach; ?>
	</ul>
<? endif; ?>


<? if($pagination["next"] || $pagination["prev"]): ?>
	<div class="pagination">
		<ul class="actions">
<? if($pagination["prev"]): ?><li class="previous"><a href="/blog/<?= $pagination["first_sindex"] ?>/prev">Previous page</a></li><? endif; ?>
<? if($pagination["next"]): ?><li class="next"><a href="/blog/<?= $pagination["last_sindex"] ?>/next">Next page</a></li><? endif; ?>
		</ul>
	</div>
<? endif; ?>

</div>
