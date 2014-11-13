<?php
$access_item["/"] = true;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$db = SITE_DB;

$IC = new Item();
$query = new Query();
$fs = new FileSystem();


// UPDATING ACCESS TABLE

// insert new controller row
$query->sql("ALTER TABLE $db.user_access ADD `controller` VARCHAR(255) NOT NULL AFTER `user_group_id`");


// get controllers
$controllers = array();

// local controllers
$frontend_controllers = $fs->files(LOCAL_PATH."/www", array("allow_extensions" => "php"));
// print_r($frontend_controllers);

foreach($frontend_controllers as $controller) {

	// replace local path
	$short_point = str_replace(".php", "", str_replace(LOCAL_PATH."/www", "", $controller));
	// remove index path, because it is not being used in requests
//	$short_point = preg_replace("/\/index$/", "", $short_point);

	// make sure we at least have a slash for root index
//	$short_point = $short_point ? $short_point : "/";

	$controllers[] = $short_point;

}

// janitor controllers
$janitor_controllers = $fs->files(FRAMEWORK_PATH."/www", array("allow_extensions" => "php"));
// print_r($frontend_controllers);

foreach($janitor_controllers as $controller) {

	// replace local path
	$short_point = str_replace(".php", "", str_replace(FRAMEWORK_PATH."/www", "/janitor/admin", $controller));
	// remove index path, because it is not being used in requests
//	$short_point = preg_replace("/\/index$/", "", $short_point);

	// make sure we at least have a slash for root index
//	$short_point = $short_point ? $short_point : "/";

	$controllers[] = $short_point;

}

//print_r($controllers);


// get access grants
$sql = "SELECT * FROM $db.user_access";
//print $sql."<br>\n";
$query->sql($sql);
$results = $query->results();

foreach($results as $result) {

	$action = $result["action"];
	$id = $result["id"];

	// fix admin reference - rename to janitor
	$action = str_replace("admin", "janitor", $action);
//	print "action: " . $action . ", " . preg_replace("/^\/|\/$/", "", $action) . "<br>\n";


	$fragments = explode("/", preg_replace("/^\/|\/$/", "", $action));
	// insert root index
	if(!count($fragments) || !$fragments[0]) {
		$fragments[0] = "index";
	}

//	print_r($fragments);
//	print "<br>\n";


	// attempt to find controller part of action
 	while(count($fragments) && array_search("/".implode("/", $fragments), $controllers) === false) {
		array_pop($fragments);
	}

	if(!count($fragments)) {

		if(array_search($action."index", $controllers) !== false) {

			$fragments = explode("/", preg_replace("/^\/|\/$/", "", $action));
			$fragments[] = "index";

		}
		else {

			print "FAILED TEST FOR INDEX<br>\n";

		}

	}


	$matching_controller = "/".implode("/", $fragments);
	$actual_action = preg_replace("/\/$/", "", str_replace(preg_replace("/index$/", "", $matching_controller), "", $action));

	if(!$actual_action) {
		$actual_action = "/";
	}

//	print "action: " . $action . " - matching_controller:" . $matching_controller . " - action:" . $actual_action . "<br>\n";


	$sql = "UPDATE $db.user_access SET action = '$actual_action', controller = '$matching_controller' WHERE id = $id";
//	print $sql."<br>\n";
	$query->sql($sql);

}


print "Now go to Admin and update access settings";

?>