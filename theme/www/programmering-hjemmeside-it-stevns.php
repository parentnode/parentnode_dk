<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();


$page->bodyClass("tools");
$page->pageTitle("Programmering og hjemmesider på Stevns");

$page->language("da");
$page->page(array(
	"templates" => "pages/stevns.php"
));
$page->language("en");
exit();

?>