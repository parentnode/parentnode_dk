<?
global $action;



$page_item = items()->getItem(array("tags" => "page:demos", "status" => 1, "extend" => array("user" => true, "mediae" => true)));
if($page_item) {
	$this->sharingMetaData($page_item);
}

$itemtype = "demo";
$demos = items()->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => $itemtype.".position ASC", "extend" => array("tags" => true, "mediae" => true)));

?>
<div class="scene demos i:demos">

<? if($page_item): 
	$media = items()->sliceMediae($page_item, "single_media"); ?>
	<div class="article i:article id:<?= $page_item["item_id"] ?>" itemscope itemtype="http://schema.org/Article">


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

	<div class="article">
		<h1>Demos</h1>
		<p>Take a look. And note that I did all the stuff you can't really see, unless you look under the hood :-)</p>
	</div>

<? endif; ?>


<? if($demos): ?>

	<div class="demos">
		<ul class="items demos">
		<? foreach($demos as $demo):
			$media = items()->sliceMediae($demo, "main_image"); ?>

			<li class="demo item article i:article id:<?= $demo["item_id"] ?>" itemscope itemtype="http://schema.org/Article">
				<h2 itemprop="headline"><?= $demo["name"] ?></h2>


				<?= HTML()->renderSnippet("snippets/media.php", [
					"item" => $demo,
					"media" => $media,
				]) ?>


				<ul class="link">
					<li><a href="<?= $demo["link"] ?>" target="_blank" class="hardlink"><?= $demo["link"] ?></a></li>
				</ul>


				<?= HTML()->renderSnippet("snippets/tags.php", [
					"item" => $demo,
					"context" => [$itemtype],
				]) ?>


				<?= HTML()->renderSnippet("snippets/info.php", [
					"item" => $demo,
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
			No, not even close. Some of my work cannot be showcased as it's deeply integrated with other systems. In other cases, I simply 
			deemed it too much work to make a demo version. Or it was too boring (sorry clients). And then of course, there is all the stuff I don't have the source-code for
			anymore. I especially regret not having any of the really, really old stuff – but who could have known
			I'd survive this long?
		</p>
	</div>

	<? else:?>

		<p>Aha. It seems there are no demos to show off right now.</p>

	<? endif; ?>

</div>
