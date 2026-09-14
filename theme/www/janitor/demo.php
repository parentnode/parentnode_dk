<?php
$controller_itemtype = "demo";
$controller_favors = false;

$access_item["/"] = true;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$itemtype = $controller_itemtype;
$action = $page->actions();
$model = model($itemtype);


$page->bodyClass($itemtype);
$page->pageTitle("Demos");


if(is_array($action) && count($action)) {

	// LIST/EDIT/NEW ITEM
	if(preg_match("/^(list|edit|new)$/", $action[0])) {

		$page->page([
			"type" => "janitor",
			"templates" => "janitor/".$itemtype."/".$action[0].".php"
		]);
		exit();
	}

	// Handle possible API request
	else {
		security()->API_request($model, $action);
	}

}

$page->page([
	"templates" => "pages/404.php"
]);
