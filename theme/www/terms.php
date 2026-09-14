<?php
$controller_type = "page";
$controller_favors = ["name" => "Terms page"];

$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$action = $page->actions();


$page->bodyClass("terms");
$page->pageTitle("Terms");


$page->page([
	"templates" => "pages/terms.php"
]);
exit();
