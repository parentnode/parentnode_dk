<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$action = $page->actions();


$page->bodyClass("member");
$page->pageTitle("Medlem - Landskabsarkitekter");


// show page
// /page/#position_in_structure#/#sindex#
if(count($action)) {

	$page->page(array(
		"templates" => "pages/page.php"
		)
	);
	exit();

}


// 404
$page->page(array(
	"templates" => "pages/404.php"
	)
);

?>
