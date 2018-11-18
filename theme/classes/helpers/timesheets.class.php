<?php
	


class TimesheetGateway {


	// Payment gateway settings
	private $_settings;
	private $adapter;

	/**
	*
	*/
	function __construct() {

		// no adapter selected yet
		$this->adapter = false;

		// mailer connection info
		@include_once("config/connect_timesheets.php");

	}

	function timesheet_connection($_settings) {

		// set type to default, Stripe, if not defined in configs
		$_settings["type"] = isset($_settings["type"]) ? $_settings["type"] : "toggl";
		$this->_settings = $_settings;

	}

	function init_adapter() {

		if(!$this->adapter) {

			if(preg_match("/^toggl$/i", $this->_settings["type"])) {

				@include_once("classes/adapters/timesheets/toggl.class.php");
				$this->adapter = new JanitorToggl($this->_settings);

			}
			// Other options
			else {


			}

		}

	}

	// Add Bridge functions

	// Bridge functions work as a bridge between Janitor and the specific module
	// They provide a unambiguous interface for Janitor, that allows you to use the same methods for
	// all gateway providers, allowing you to easily switch between providers
	
	// In the Adapter class these methods are "mapped" to the Gateway API


	function getTimeEntries($_options) {

		// only load payment adapter when needed
		$this->init_adapter();

		// Only attempt with valid adapter
		if($this->adapter) {

			return $this->adapter->getTimeEntries($_options);

		}

	}

}


$__ttt = false;
function timesheets() {
	global $__ttt;
	if(!$__ttt) {
		// include_once("classes/helpers/timesheets.class.php");
		$__ttt = new TimesheetGateway();

	}
	return $__ttt;
}
