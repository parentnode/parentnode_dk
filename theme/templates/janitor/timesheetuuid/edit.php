<?php
global $action;
global $IC;
global $model;
global $itemtype;

$model_project = $IC->TypeObject("project");

$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => ["editors" => true]));
$item_projects = $model_project->getProjects(["timesheetuuid_id" => $item_id]);
$project_count = $item_projects ? count($item_projects) : 0;

?>
<div class="scene i:scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit Timesheet UUID</h1>
	<h2><?= strip_tags($item["name"]) ?></h2>

	<?= $JML->editGlobalActions($item, ["modify" => ["duplicate" => false, "status" => false]]) ?>

		<div class="item all_items projects i:timesheetuuid" data-csrf-token=<?= session()->value("csrf") ?> data-project-remove=<?= $model->path.'/removeProject'?>>
		<h2>Projects (<span class="project_count"><?= $project_count ?></span>)</h2>
		<fieldset>
			<h3>Associated projects</h3>
			<? if($item_projects): ?>
			<ul class="timesheetuuid items projects">
				<? foreach($item_projects as $project): ?>
				<li class="timesheetuuid project project_id:<?= $project["id"] ?>">
					<h3><?= $project["name"] ?></h3>
				</li>
				<? endforeach; ?>
			</ul>
			<? else: ?>
			<p>No associated projects.</p>
			<? endif; ?>
		</fieldset>

		<?= $model->formStart("addProject/".$item["id"], array("class" => "labelstyle:inject projects")) ?>
		
			<fieldset>
				<?= $model->input("project_id") ?>
			</fieldset>

			<ul class="actions">
				<?= $model->submit("Add project", ["class" => "primary", "wrapper" => "li.save"]) ?>	
			</ul>
		<?= $model->formEnd() ?>
	</div>

</div>
