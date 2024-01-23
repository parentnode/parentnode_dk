 <?php
global $action;
global $IC;
global $model;
global $itemtype;

$items = $IC->getItems(array("itemtype" => $itemtype, "order" => "position ASC", "extend" => array("tags" => true, "mediae" => true)));

?>
<div class="scene i:scene defaultList <?= $itemtype ?>List">
	<h1>Demos</h1>

	<ul class="actions">
		<?= $JML->listNew(array("label" => "New demo")) ?>
	</ul>

	<div class="all_items i:defaultList filters"<?= $HTML->jsData(["search", "order"]) ?>>
<?		if($items): ?>
		<ul class="items">
<?			foreach($items as $item): ?>
			<li class="item item_id:<?= $item["id"] ?>">
				<h3><?= strip_tags($item["name"]) ?></h3>

				<?= $JML->tagList($item["tags"], ["context" => "demo"]) ?>

				<?= $JML->listActions($item) ?>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No demos.</p>
<?		endif; ?>
	</div>

</div>
