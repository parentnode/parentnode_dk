<?php
$IC = new Items();

$page_item = $IC->getItem(array("tags" => "page:front", "extend" => array("user" => true, "mediae" => true, "tags" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

$post_items = $IC->getItems(array("itemtype" => "post", "tags" => "on:frontpage", "status" => 1, "extend" => array("tags" => true, "readstate" => true, "user" => true, "mediae" => true)));
?>
<div class="scene front i:scene i:front">

<? if($page_item && $page_item["status"]): 
	$media = $IC->sliceMedia($page_item); ?>
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


		<?= $HTML->articleInfo($page_item, "/", [
			"media" => $media, 
			"sharing" => true
		]) ?>


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


				<?= $HTML->articleTags($item, [
					"context" => ["post"],
					"url" => "/blog/tag",
					"default" => ["/blog", "Posts"]
				]) ?>


				<h3 itemprop="headline"><a href="/blog/<?= $item["sindex"] ?>"><?= preg_replace("/<br>|<br \/>/", "", $item["name"]) ?></a></h3>


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

	</div>
<?	endif; ?>


	<div class="usedby">
		<h2>Selected clients</h2>
		<ul>
			<li class="distortion" title="Distortion">Distortion</li>
			<li class="lsb" title="Lån & Spar Bank">Lån &amp; Spar Bank</li>
			<li class="torvehallerne" title="Torvehallerne">Torvehallerne</li>
			<li class="punkt1" title="Punkt1">Punkt1</li>
			<li class="metro" title="Copenhagen Metro">Copenhagen Metro</li>
		</ul>
	</div>
</div>
