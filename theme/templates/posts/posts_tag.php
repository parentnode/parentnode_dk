<?php
global $IC;
global $action;
global $itemtype;

$selected_tag = urldecode($action[1]);


// List extension (page > 1)
if(count($action) === 4) {
	$page = $action[3];
	$page_item = false;
}
// Default list
else {
	$page = false;
	$page_item = $IC->getItem([
		"itemtype" => "blog",
		"tags" => "blog:".$selected_tag, 
		"status" => 1, 
		"extend" => [
			"user" => true, 
			"mediae" => true, 
			"tags" => true
		]
	]);
}


if($page_item) {
	$this->sharingMetaData($page_item);
}
else {
	$this->sharingMetaData(["description" => "Something about $selected_tag"]);
}




// get log tags for listing
$categories = $IC->getTags(array("context" => $itemtype));


$pagination_pattern = [
	"pattern" => [
		"itemtype" => $itemtype, 
		"status" => 1, 
		"tags" => $itemtype.":".addslashes($selected_tag), 
		"extend" => [
			"tags" => true, 
			"user" => true, 
			"mediae" => true,
			"readstate" => true
		]
	],
	"page" => $page,
	"limit" => 5
];

// Get posts
$items = $IC->paginate($pagination_pattern);


?>

<?php
// global $action;
// global $IC;
// global $itemtype;
//
// $selected_tag = urldecode($action[1]);
// $items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "tags" => $itemtype.":".addslashes($selected_tag), "extend" => array("tags" => true, "user" => true, "readstate" => true)));
//
// $categories = $IC->getTags(array("context" => $itemtype, "order" => "value"));

?>

<div class="scene posts tag i:columns">

<? if($page_item): 
	$media = $IC->sliceMediae($page_item, "single_media"); ?>
	<div class="article i:article" itemscope itemtype="http://schema.org/Article">

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>

		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>

		<?= $HTML->articleInfo($page_item, "/blog/tag/".urlencode($selected_tag), [
			"media" => $media,
			"sharing" => true
		]) ?>


		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>
	</div>

<? else: ?>

	<div class="article">
		<h1>bLog</h1>

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

	</div>

<? endif; ?>





	<div class="articles">

	<?	if($items): ?>

		<h2><?= $items["total"] ?> Posts</h2>

		<?= $HTML->pagination($items, [
			"base_url" => "/blog/tag/".urlencode($selected_tag), 
			"direction" => "prev",
			"show_total" => false,
			"labels" => ["prev" => "Previous posts"]
		]) ?>

		<ul class="items articles articlePreviewList i:articlePreviewList">
			<? foreach($items["range_items"] as $item):
				$media = $IC->sliceMediae($item, "mediae"); ?>
			<li class="item article id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/NewsArticle"
				data-readstate="<?= $item["readstate"] ?>"
				>


				<? if($media): ?>
				<div class="image item_id:<?= $item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
				<? endif; ?>


				<?= $HTML->articleTags($item, [
					"context" => [$itemtype],
					"url" => "/blog/tag",
					"default" => ["/blog", "Posts"]
				]) ?>


				<h3 itemprop="headline"><a href="/blog/tag/<?= urlencode($selected_tag) ?>/<?= $item["sindex"] ?>"><?= $item["name"] ?></a></h3>


				<?= $HTML->articleInfo($item, "/blog/".$item["sindex"], [
					"media" => $media
				]) ?>


				<? if($item["description"]): ?>
				<div class="description" itemprop="description">
					<p><?= nl2br($item["description"]) ?></p>
				</div>
				<? endif; ?>

			</li>
			<? endforeach; ?>
		</ul>

		<?= $HTML->pagination($items, [
			"base_url" => "/blog/tag/".urlencode($selected_tag),
			"direction" => "next",
			"show_total" => false,
			"labels" => ["next" => "Next posts"]
		]) ?>

	<? else: ?>

		<h2>Technology needs humanity.</h2>
		<p>We could not find any posts with the selected tag.</p>

	<? endif; ?>
	</div>



	<?= $HTML->search("/details/posts/search", [
		"headline" => "Search posts",
		"pattern" => $pagination_pattern["pattern"]
	]) ?>


<? if($categories): ?>
	<div class="categories">
		<h2>Categories</h2>
		<ul class="tags">
			<? foreach($categories as $tag): ?>
			<li<?= $tag["value"] === $selected_tag ? ' class="selected"' : '' ?>><a href="/blog/tag/<?= urlencode($tag["value"]) ?>"><?= $tag["value"] ?></a></li>
			<? endforeach; ?>
			<li class="all"><a href="/blog">All postings</a></li>
		</ul>
	</div>
<? endif; ?>

</div>
