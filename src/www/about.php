<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$action = $page->actions();


$page->bodyClass("about");
$page->pageTitle("About parentNode");


$page->header();
$page->template("pages/about.php");
$page->footer();
exit();

?>