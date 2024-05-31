<?php
/**
* @package janitor.itemtypes
* This file contains itemtype functionality
*/

class TypeTimesheetproject extends Itemtype {


	public $db;


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_timesheetproject";
		
		$query = new Query();
		$query->checkDbExistence($this->db);
		$query->checkDbExistence(SITE_DB.".item_timesheetuuid");
		$query->checkDbExistence(SITE_DB.".item_timesheetuuid_projects");
		$query->checkDbExistence(SITE_DB.".items_editors");


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Project name",
			"required" => true,
			"hint_message" => "Name of your project.", 
			"error_message" => "Name must be filled out."
		));

		// Project ID
		$this->addToModel("project_id", array(
			"type" => "integer",
			"label" => "Project ID from external service",
			"hint_message" => "This project ID will be imported from the external service, currently Toggl.",
			"error_message" => "Use a valid project ID."
		));


		// Client ID
		$this->addToModel("client_id", array(
			"type" => "integer",
			"label" => "Client ID from external service",
			"hint_message" => "This client ID will be imported from the external service, currently Toggl.",
			"error_message" => "Use a valid client ID."
		));

		// Client Name
		$this->addToModel("client_name", array(
			"type" => "string",
			"label" => "Client name",
			"hint_message" => "Name of the client assicated with this project.", 
			"error_message" => "Please enter a valid client name."
		));

		// show history
		$this->addToModel("show_history", array(
			"type" => "checkbox",
			"label" => "Show billing history",
			"hint_message" => "Select to show the project's billing history on the client timesheet page.",
			"error_message" => "Error."
		));
	}


	function syncProjects($action) {

		include_once("classes/helpers/timesheets.class.php");
		$TC = new TimesheetsGateway();
		$IC = new Items();

		$toggl_projects = $TC->getProjects(["active" => "both"]);
		usleep(1100000);
		$toggl_clients = $TC->getClients();

		$local_project_items = $IC->getItems(["itemtype" => "project", "extend" => true]) ?: [];

		if($toggl_projects) {

			foreach ($toggl_projects as $toggl_project) {

				$toggl_clients_key = isset($toggl_project->cid) ? arrayKeyValue(json_decode(json_encode($toggl_clients), true), "id", $toggl_project->cid) : false;
				$toggl_project_client = $toggl_clients_key !== false ? $toggl_clients[$toggl_clients_key] : false;
				$toggl_project_status = $toggl_project->active ? "1" : "0";
				
				$local_projects_key = arrayKeyValue($local_project_items, "project_id", $toggl_project->id);

				// project is already in db
				if($local_projects_key !== false) {
					
					$item = $local_project_items[$local_projects_key];

					// difference in status
					if($item["status"] !== $toggl_project_status) {
						
						// update status
						$this->status(["status", $item["id"], $toggl_project_status]);
					} 

					
					// difference in name
					if($item["name"] != $toggl_project->name) {
						
						// update name
						$_POST["name"] = $toggl_project->name;
						$this->update(["update", $item["id"]]);
						unset($_POST);
					}

					
					// either local project and toggl project have client
					if(isset($item["client_id"]) || isset($toggl_project->cid)){

						// update to use toggl project client or lack of such	
						$_POST["client_id"] = $toggl_project->cid ?: false;
						$_POST["client_name"] = $toggl_project_client ? $toggl_project_client->name : false;
						$this->update(["update", $item["id"]]);
						unset($_POST);

					}

				}
				else {

					// create project in db
					$_POST["project_id"] = $toggl_project->id;
					$_POST["client_id"] = isset($toggl_project->cid) ? $toggl_project->cid : false;
					$_POST["client_name"] = $toggl_project_client ? $toggl_project_client->name : false;
					$_POST["name"] = $toggl_project->name;
					$_POST["status"] = $toggl_project_status;
					$this->save(["save"]);
					unset($_POST);
				}
			}
		}

		if($local_project_items) {

			foreach ($local_project_items as $item) {

				// project has been deleted from toggl
				if(!arrayKeyValue(json_decode(json_encode($toggl_projects), true), "id", $item["project_id"] )) {

					// delete item
					$this->delete(["delete", $item["id"]]);
				}
			}
		}

		message()->resetMessages();
		message()->addMessage("Projects synced");
		return true;


	}

	function getProjects($_options = false) {

		$query = new Query();

		$project_id = false;
		$editor_id = false;
		$timesheetuuid_id = false;
		$timesheetuuid = false;

		if($_options !== false) {
			foreach($_options as $_option => $_value) {
				switch($_option) {

					case "project_id"              : $project_id              = $_value; break;
					case "editor_id"               : $editor_id               = $_value; break;
					case "timesheetuuid"           : $timesheetuuid           = $_value; break;
					case "timesheetuuid_id"        : $timesheetuuid_id        = $_value; break;
				}
			}
		}

		$sql = "
		SELECT 
			ip.* 
		FROM ".$this->db." ip 
			JOIN ".SITE_DB.".items i ON i.id = ip.item_id
			LEFT JOIN ".SITE_DB.".items_editors ie ON ie.item_id = ip.item_id
			LEFT JOIN ".SITE_DB.".item_timesheetuuid_projects itp ON itp.item_project_id = ip.item_id
			LEFT JOIN ".SITE_DB.".item_timesheetuuid it ON it.item_id = itp.item_timesheetuuid_id
			LEFT JOIN ".SITE_DB.".items itu ON it.item_id = itu.id
		WHERE	
			i.status = 1
		";

		if($project_id) {
			
			$sql .= " AND ip.item_id = $project_id";

		}
		
		if($editor_id) {
			
			$sql .= " AND ie.user_id = $editor_id";
		}
		
		if($timesheetuuid_id) {

			$sql .= " AND itp.item_timesheetuuid_id = $timesheetuuid_id";
		}

		if($timesheetuuid) {

			$sql .= " AND it.name = '".$timesheetuuid."'";
			$sql .= " AND itu.status = 1";
		}

		// debug([$sql]);
		if($query->sql($sql)) {

			if($project_id) {
				return $query->result(0);
			}
			return $query->results();
		}

		return false;
	}

}

?>