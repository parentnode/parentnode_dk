<?
global $action;

$page_item = items()->getItem(array("tags" => "page:terms", "status" => 1, "extend" => array("mediae" => true, "tags" => true, "user" => true)));

if($page_item) {
	$this->sharingMetaData($page_item);
}
?>
<div class="scene terms i:scene">

<? if($page_item): 
	$media = items()->sliceMediae($page_item, "single_media"); ?>
	<div class="article i:article id:<?= $page_item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

'
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

	</div>


<? else:?>

	<h1>Terms and conditions</h1>
	<p>This page is currently being updated.</p>

<? endif; ?>

</div>
