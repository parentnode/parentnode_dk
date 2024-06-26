<?php
$access_item["/"] = true;
$access_item["/editor"] = true;
$access_item["/addEditor"] = "/editor";
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "timesheetproject";
$model = $IC->typeObject($itemtype);


$page->bodyClass($itemtype);
$page->pageTitle("Projects");


if(is_array($action) && count($action)) {

	// LIST/EDIT ITEM
	if(preg_match("/^(list|edit)$/", $action[0])) {

		$page->page(array(
			"type" => "janitor",
			"templates" => "janitor/".$itemtype."/".$action[0].".php"
		));
		exit();
	}

	// Class interface
	else if(security()->validateCsrfToken() && preg_match("/[a-zA-Z]+/", $action[0])) {

		// check if custom function exists on TypeProject class
		if($model && method_exists($model, $action[0])) {

			$output = new Output();
			$output->screen($model->{$action[0]}($action));
			exit();
		}
	}

}

$page->page(array(
	"templates" => "pages/404.php"
));

?>
