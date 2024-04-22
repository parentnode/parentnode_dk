<?php
global $action;
global $IC;
global $model;
global $itemtype;

$items = $IC->getItems(["itemtype" => $itemtype, "extend" => true]);
?>
<div class="scene i:scene defaultList <?= $itemtype ?>List">
	<h1>Timesheet UUIDs</h1>

	<ul class="actions">
		<?= $JML->listNew(array("label" => "New UUID")) ?>
	</ul>

	<div class="all_items i:defaultList filters width:100"<?= $HTML->jsData(["tags", "search"]) ?>>
<?		if($items): ?>
		<ul class="items">
<?			foreach($items as $item): ?>
			<li class="item item_id:<?= $item["id"] ?>">
				<h3><?= strip_tags($item["friendly_name"]) ?> (<?= $item["name"] ?>)</h3>
				<?= $JML->listActions($item) ?>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No UUIDs.</p>
<?		endif; ?>
	</div>

</div>
