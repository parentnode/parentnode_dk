<?php
global $action;
global $IC;
global $model;
global $itemtype;

$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => ["editors" => true]));
?>
<div class="scene i:scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit Project</h1>
	<h2><?= strip_tags($item["name"]) ?></h2>

	<?= $JML->editGlobalActions($item, ["modify" => ["delete" => false, "duplicate" => false, "status" => false]]) ?>

	<div class="item i:defaultEdit">
		<h2>Settings</h2>
		<?= $model->formStart("update/".$item["id"], array("class" => "labelstyle:inject")) ?>
		
			<fieldset>
				<?= $model->input("show_history", array("value" => $item["show_history"])) ?>
			</fieldset>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>
	<?= $JML->editEditors($item) ?>

</div>
