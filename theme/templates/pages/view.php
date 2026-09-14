<?php
global $action;
global $itemtype;


$sindex = $action[0];

$item = items()->getItem([
	"sindex" => $sindex, 
	"status" => 1,
	"extend" => [
		"tags" => true, 
		"user" => true, 
		"mediae" => true, 
		"readstate" => true
	]
]);

if($item) {
	$this->pageTitle($item["name"]);
	$this->bodyClass($item["classname"] ? $item["classname"] : "pages");
	$this->sharingMetaData($item);
}

?>

<div class="scene page i:pageitem">

<? if($item):
	$media = items()->sliceMediae($item, "single_media"); ?>

	<div class="article i:article id:<?= $item["item_id"] ?> page" itemscope itemtype="http://schema.org/Article"<?= HTML()->jsData(["readstate"]) ?>>

		<?= HTML()->renderSnippet("snippets/media.php", [
			"item" => $item,
			"media" => $media,
		]) ?>


		<?= HTML()->renderSnippet("snippets/tags.php", [
			"item" => $item,
			"context" => [$itemtype]
		]) ?>


		<h1 itemprop="headline"><?= $item["name"] ?></h1>


		<?= HTML()->renderSnippet("snippets/info.php", [
			"item" => $item,
			"media" => $media,
			"sharing" => true
		]) ?>


		<div class="articlebody" itemprop="articleBody">
			<?= $item["html"] ?>
		</div>

	</div>

<? else: ?>

	<div class="article">
		<h1>Technology has limits</h1>
		<p>We could not find the specified page.</p>
	</div>

<? endif; ?>

</div>
