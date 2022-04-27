<?php

/**
* @package janitor.itemtypes
* This file contains itemtype functionality
*/

class TypeTimesheetUuid extends Itemtype {

	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());

		// itemtype database
		$this->db = SITE_DB.".item_timesheetuuid";
		$this->db_projects = SITE_DB.".item_timesheetuuid_projects";

		$IC = new Items();
		$PC = $IC->typeObject("project");
		$projects = $PC->getProjects();

		// uuid
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "UUID",
			"required" => true,
			"hint_message" => "Put the UUID here.", 
			"error_message" => "UUID must be filled out."
		));

		// Project ID
		$this->addToModel("project_id", array(
			"type" => "select",
			"options" => $this->toOptions($projects, "id", "name", ["add" => ["" => "Select project"]]),
			"label" => "Project ID from external service",
			"hint_message" => "This project ID will be imported from the external service, currently Toggl.",
			"error_message" => "Use a valid project ID."
		));

	}


	function addProject($action) {

		$query = new Query();

		if(count($action) == 2 && $this->validateList(["project_id"])) {

			$timesheetuuid_id = $action[1];

			$this->getPostedEntities();
			$project_id = $this->getProperty("project_id", "value");

			$IC = new Items();
			$PC = $IC->TypeObject("project");
			$project = $PC->getProjects(["project_id" => $project_id]);
			
			if($PC->getProjects(["project_id" => $project_id, "timesheetuuid_id" => $timesheetuuid_id])) {

				message()->addMessage("Project is already linked to this UUID", ["type" => "error"]);
				return true;
			}
			else {

				$sql = "INSERT INTO ".$this->db_projects." SET item_timesheetuuid_id = $timesheetuuid_id, item_project_id = $project_id";
				if($query->sql($sql)) {
	
					$timesheetuuid_project_id = $query->lastInsertId();
					
	
					return [
						"timesheetuuid_project_id" => $timesheetuuid_project_id,
						"project_id" => $project_id,
						"project_name" => $project["name"]
					];
				}
			}

		}

		return false;

	}

	function removeProject($action) {

		if(count($action) == 1) {

			$project_id = getPost("project_id");
			$query = new Query();

			$sql = "DELETE FROM $this->db_projects WHERE item_project_id = ".$project_id;
			// debug([$sql]);

			if($query->sql($sql)) {
				message()->addMessage("Project removed");
				return true;
			}

		}

		return false;
	}

}

?>