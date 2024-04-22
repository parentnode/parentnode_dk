<?php
// Include Toggl API
require("includes/timesheets/toggl/vendor/autoload.php");

class JanitorToggl {

	private $toggl;
	private $togglReport;
	private $_settings;
	
	function __construct($_settings) {

		$this->toggl = new MorningTrain\TogglApi\TogglApi($_settings["api-key"]);
		$this->togglReport = new MorningTrain\TogglApi\TogglReportsApi($_settings["api-key"]);
		$this->_settings = $_settings;

	}

	function getReports($_options = false) {

		$user_agent = $this->_settings["user-agent"];
		$workspace_id = $this->_settings["workspace-id"];

		$since = false;
		$until = false;
		$client_ids = false;
		$project_ids = false;
		$tag_ids = false;

		if($_options !== false) {
			foreach($_options as $_option => $_value) {
				switch($_option) {

					case "since"                     : $since                     = $_value; break;
					case "until"                     : $until                     = $_value; break;
					case "client_ids"                : $client_ids                = $_value; break;
					case "project_ids"               : $project_ids               = $_value; break;
					case "tag_ids"                   : $tag_ids                   = $_value; break;
				}
			}
		}

		// Some kind of id
		$default_query = "user_agent=" . $user_agent;

		// Choose parentNode workspace
		$default_query .= "&workspace_id=" . $workspace_id;

		$query = $default_query;

		if($since) {

			$query .= "&since=".$since;
		}
		if($until) {

			$query .= "&until=".$until;
		}
		if($client_ids) {

			$query .= "&client_ids=".$client_ids;
		}
		if($project_ids) {

			$query .= "&project_ids=".$project_ids;
		}
		if($tag_ids) {

			$query .= "&tag_ids=".$tag_ids;
		}


		$entries = [];
	
		$page_counter = 1;
	
		$detailed_report = $this->togglReport->getDetailsReport($query . "&page=" . $page_counter++);
		// debug(["detailed_report", $detailed_report]);
	
		// Get more pages, as long as there is still entries (50 pr. page)
		while(count($detailed_report)) {
			$entries = array_merge($entries, $detailed_report);
	
			// Abide by Toggl API limit (1 request pr second)
			usleep(1500000);
			$detailed_report = $this->togglReport->getDetailsReport($query . "&page=" . $page_counter++);
		}

		return $entries;
	
	}

	function getProjects($_options = false) {
		
		$workspace_id = $this->_settings["workspace-id"];

		return $this->toggl->getWorkspaceProjects($workspace_id, $_options);

	}

	function getClients($_options = false) {
		
		$client_id = false;

		if($_options !== false) {
			foreach($_options as $_option => $_value) {
				switch($_option) {

					case "client_id"                     : $client_id                     = $_value; break;
				}
			}
		}
		
		if($client_id) {

			return $this->toggl->getClientById($client_id);
		}

		return $this->toggl->getClients();

	}

}
