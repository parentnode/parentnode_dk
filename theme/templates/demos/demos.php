<?
global $action;
global $IC;



$page_item = $IC->getItem(array("tags" => "page:demos", "status" => 1, "extend" => array("user" => true, "mediae" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

$itemtype = "demo";
$demos = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => $itemtype.".position ASC", "extend" => array("tags" => true, "mediae" => true)));

?>
<div class="scene demos i:demos">

<? if($page_item): 
	$media = $IC->sliceMediae($page_item, "single_media"); ?>
	<div class="article i:article id:<?= $page_item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">

		<? if($media): ?>
		<div class="image item_id:<?= $page_item["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
		<? endif; ?>


		<h1 itemprop="headline"><?= $page_item["name"] ?></h1>

		<? if($page_item["subheader"]): ?>
		<h2 itemprop="alternativeHeadline"><?= $page_item["subheader"] ?></h2>
		<? endif; ?>


		<?= $HTML->articleInfo($page_item, "/demos", [
			"media" => $media,
		]) ?>


		<? if($page_item["html"]): ?>
		<div class="articlebody" itemprop="articleBody">
			<?= $page_item["html"] ?>
		</div>
		<? endif; ?>
	</div>
<? else:?>

	<div class="article">
		<h1>Demos</h1>
		<p>Take a look. And remember, I did all the stuff you can't really see, unless you look under the hood :-)</p>
	</div>

<? endif; ?>


<? if($demos): ?>

	<div class="demos">
		<ul class="items demos">
		<? foreach($demos as $demo):
			$media = $IC->sliceMediae($demo, "single_media"); ?>

			<li class="demo item article i:article id:<?= $demo["item_id"] ?>" itemscope itemtype="http://schema.org/Article">
				<h2 itemprop="headline"><?= $demo["name"] ?></h2>
				<ul class="link">
					<li><a href="<?= $demo["link"] ?>" target="_blank" class="hardlink"><?= $demo["link"] ?></a></li>
				</ul>

				<? if($media): ?>
				<div class="image item_id:<?= $demo["item_id"] ?> format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>"></div>
				<? endif; ?>


				<?= $HTML->articleTags($demo, [
					"context" => ["demo"]
				]) ?>

				<?= $HTML->articleInfo($demo, "/demos", [
					"media" => $media,
				]) ?>

				<div class="articlebody" itemprop="articleBody">

					<? if(preg_match("/(^|,)".$this->segment()."(,|$)/", $demo["unsupported_segments"])): ?>
						<p class="invaliddevice">Your current browser cannot show this demo.</p>
					<? endif; ?>

					<?= $demo["description"] ?>
				</div>
			</li>
		<? endforeach; ?>
		</ul>
	</div>

	<div class="finalnote">
		<h2>Is that really all?</h2>
		<p>
			No. Some of my work cannot be showcased as it's deeply integrated with other systems. In other cases, I simply 
			deemed it too much work to make a demo. Or it was too boring (sorry clients). And then of course, there is all the stuff I don't have the source-code for
			anymore. I especially regret not having any of the really, really old stuff – but who could have known
			I'd survive this long?
		</p>
	</div>

	<? else:?>

		<p>Aha. It seems there are no demos to show off right now.</p>

	<? endif; ?>

</div>

