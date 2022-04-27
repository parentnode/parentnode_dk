<?php
global $action;
global $IC;
global $model;
global $itemtype;

$items = $IC->getItems(["itemtype" => $itemtype, "order" => "status DESC, client_name ASC, name ASC", "extend" => ["editors" => true]]);
?>
<div class="scene i:scene defaultList <?= $itemtype ?>List">
	<h1>Projects</h1>

	<ul class="actions">
		<?= $HTML->oneButtonForm("Sync projects", "syncProjects", ["class" => "primary", "success-location" => "list"]) ?>
	</ul>

	<div class="all_items i:defaultList filters width:100"<?= $HTML->jsData(["tags", "search"]) ?>>
<?		if($items): ?>
		<ul class="items">
<?			foreach($items as $item): ?>
			<li class="item item_id:<?= $item["id"] ?>">
				<h3><?= strip_tags($item["name"]) ?></h3>
				<dl class="info">
					<dt>Client</dt>
					<dd><?= $item["client_name"] ?: "N/A" ?></dd>
				</dl>
				<?= $JML->listActions($item, ["modify" => ["delete" => false, "disable" => false]]) ?>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No projects.</p>
<?		endif; ?>
	</div>

</div>
