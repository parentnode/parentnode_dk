<?php
$controller_type = "page";
$controller_favors = ["name" => "Frontpage"];

$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();


$page->bodyClass("front");
$page->pageTitle("You have to start somewhere");


$page->page([
	"templates" => "pages/front.php"
]);
exit();

?>
