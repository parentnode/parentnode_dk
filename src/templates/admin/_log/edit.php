<?php
global $action;
global $IC;
global $model;
global $itemtype;

$item = $IC->getCompleteItem(array("id" => $action[1]));
$item_id = $item["item_id"];
?>
<div class="scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit log entry</h1>

	<ul class="actions i:defaultEditActions item_id:<?= $item_id ?>">
		<?= $HTML->link("List", "/admin/".$itemtype."/list", array("class" => "button", "wrapper" => "li.cancel")) ?>
		<?= $HTML->deleteButton("Delete", "/admin/cms/delete/".$item["id"], array("js" => true)) ?>
	</ul>

	<div class="status i:defaultEditStatus item_id:<?= $item["id"] ?>">
		<ul class="actions">
			<?= $HTML->statusButton("Enable", "Disable", "/admin/cms/status", $item, array("js" => true)) ?>
		</ul>
	</div>

	<div class="item i:defaultEdit">
		<?= $model->formStart("/admin/cms/update/".$item_id, array("class" => "labelstyle:inject")) ?>
			<fieldset>
				<?= $model->input("published_at", array("value" => $item["published_at"])) ?>

				<?= $model->input("name", array("value" => $item["name"])) ?>
				<?= $model->input("description", array("class" => "autoexpand short", "value" => $item["description"])) ?>
				<?= $model->input("html", array("value" => $item["html"])) ?>

				<?= $model->inputLocation("location", "latitude", "longitude", array("value_loc" => $item["location"], "value_lat" => $item["latitude"], "value_lon" => $item["longitude"])) ?>
			</fieldset>

			<ul class="actions">
				<?= $model->link("Back", "/admin/".$itemtype."/list", array("class" => "button key:esc", "wrapper" => "li.cancel")) ?>
				<?= $model->submit("Update", array("class" => "primary key:s", "wrapper" => "li.save")) ?>
			</ul>
		<?= $model->formEnd() ?>
	</div>

	<h2>Tags</h2>
	<div class="tags i:defaultTags item_id:<?= $item_id ?>"
		data-get-tags="<?= $this->validAction("/admin/cms/tags") ?>" 
		data-delete-tag="<?= $this->validAction("/admin/cms/tags/delete") ?>"
		>
		<?= $model->formStart("/admin/cms/update/".$item_id, array("class" => "labelstyle:inject")) ?>
			<fieldset>
				<?= $model->input("tags") ?>
			</fieldset>

			<ul class="actions">
				<?= $model->submit("Add tag", array("class" => "primary", "wrapper" => "li.save")) ?>
			</ul>
		<?= $model->formEnd() ?>

		<ul class="tags">
<?		if($item["tags"]): ?>
<?			foreach($item["tags"] as $index => $tag): ?>
			<li class="tag">
				<span class="context"><?= $tag["context"] ?></span>:<span class="value"><?= $tag["value"] ?></span>
			</li>
<?			endforeach; ?>
<?		endif; ?>
		</ul>
	</div>

	<h2>Media</h2>
	<div class="media i:addMedia"
		data-csrf-token="<?= session()->value("csrf") ?>"
		>
		<p>Image must be jpg or png.</p>

		<?= $model->formStart("/admin/cms/update/".$item_id, array("class" => "upload labelstyle:inject")) ?>
			<fieldset>
				<?= $model->input("files") ?>
			</fieldset>

			<ul class="actions">
				<?= $model->submit("Add image", array("class" => "primary", "wrapper" => "li.save")) ?>
			</ul>
		<?= $model->formEnd() ?>

		<ul class="media">
			<li class="image">
<?		if($item["files"]): ?>
				<img src="/images/<?= $item["id"] ?>/160x.<?= $item["files"] ?>" alt="Current image" />
				<?= $model->formStart("/admin/cms/".$itemtype."/".$item_id."/deleteMedia", array("class" => "delete i:deleteMedia")) ?>
					<?= $model->submit("Delete", array("class" => "delete")) ?>
				<?= $model->formEnd() ?>
<?		else: ?>
				<img src="/images/0/missing/160x.png" alt="Missing image" />
<?		endif; ?>
			</li>
		</ul>

	</div>

</div>
