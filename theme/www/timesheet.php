<?php
$access_item["/"] = true;
$access_item["/uuid"] = true;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "project";
$model = $IC->TypeObject($itemtype);


$page->bodyClass("timesheet");
$page->pageTitle("Timesheet");


$page->page(array(
	"templates" => "timesheet/timesheet.php"
));

?>
 