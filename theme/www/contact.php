<?php
$controller_type = "page";
$controller_favors = ["name" => "Contact page"];

$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();


$page->bodyClass("contact");
$page->pageTitle("Contact");


$page->page([
	"templates" => "pages/contact.php"
]);
exit();
