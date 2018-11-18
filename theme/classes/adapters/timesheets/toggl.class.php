<?php
/**
* @package janitor.shop
*/


require_once("includes/timesheets/toggl-api-1.0.3/vendor/autoload.php");


class JanitorToggl {

	/**
	*
	*/
	function __construct($_settings) {

		$this->api_key = $_settings["api-key"];
		$this->workspace_id = $_settings["workspace-id"];

		$this->useragent = "start@parentnode.dk";

		$this->toggl = new MorningTrain\TogglApi\TogglApi($this->api_key);
		$this->togglReport = new MorningTrain\TogglApi\TogglReportsApi($this->api_key);

	}


	// Delete stripe customer id
	function getTimeEntries($_options) {

		

	}




}

?>