<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();


$page->bodyClass("story");
$page->pageTitle("Getting lost without loosing my way");


$page->page(array(
	"templates" => "pages/template.php"
	)
);

?>
