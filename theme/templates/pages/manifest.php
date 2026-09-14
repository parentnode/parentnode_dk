<?php

$page_item = items()->getItem(array("tags" => "page:manifest", "status" => 1, "extend" => array("user" => true, "mediae" => true, "comments" => true, "tags" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}
	
?>
<div class="scene manifest i:scene">

<? if($page_item): 
	$media = items()->sliceMediae($page_item, "single_media"); ?>
	<div class="article i:article" itemscope itemtype="http://schema.org/Article">


		<?= HTML()->renderSnippet("snippets/media.php", [
			"item" => $page_item,
			"media" => $media,
		]) ?>


		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>


		<?= HTML()->renderSnippet("snippets/info.php", [
			"item" => $page_item,
			"media" => $media,
		]) ?>


		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>


		<?= HTML()->renderSnippet("snippets/comments.php", [
			"item" => $page_item,
		]) ?>

	</div>
<? endif; ?>

</div>