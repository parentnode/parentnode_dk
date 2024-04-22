<?php
global $action;
global $IC;
global $model;
global $itemtype;
?>
<div class="scene i:scene defaultNew">
	<h1>New UUID</h1>

	<ul class="actions">
		<?= $JML->newList(array("label" => "List")) ?>
	</ul>

	<?= $model->formStart("save", array("class" => "i:defaultNew labelstyle:inject")) ?>
		<?= $model->input("name", ["type" => "hidden", "value" => gen_uuid()]) ?>
		<fieldset>
			<?= $model->input("friendly_name") ?>
		</fieldset>

		<?= $JML->newActions() ?>
	<?= $model->formEnd() ?>
</div>
