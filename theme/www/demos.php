<?php
$controller_type = "page";
$controller_favors = ["name" => "List demos"];

$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();


$page->bodyClass("demos");
$page->pageTitle("Demos");


$page->page([
	"templates" => "demos/demos.php"
]);
 