<?php
/**
* @package janitor.itemtypes
* This file contains itemtype functionality
*/

class TypeDemo extends Itemtype {


	public $db;


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_demo";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Project name",
			"required" => true,
			"hint_message" => "Name of the project.", 
			"error_message" => "Name must be filled out."
		));

		// Link
		$this->addToModel("link", array(
			"type" => "string",
			"label" => "Link to project or demo site",
			"required" => true,
			"hint_message" => "Link to project or demo site.", 
			"error_message" => "A demo project must have a link."
		));

		// Unsupported segments
		$this->addToModel("unsupported_segments", array(
			"type" => "string",
			"label" => "Unsupported segments",
			"hint_message" => "List segments that cannot show this demo. Separate multiple segments with a comma (\",\")."
		));

		// Class
		$this->addToModel("classname", array(
			"type" => "string",
			"label" => "CSS Class",
			"hint_message" => "CSS class for custom styling. If you don't know what this is, just leave it empty."
		));

		// Description
		$this->addToModel("description", array(
			"type" => "html",
			"label" => "Project description",
			"required" => true,
			"allowed_tags" => "p,h2,h3",
			"hint_message" => "Project description.",
			"error_message" => "An empty description? How weird."
		));

		// Single media
		$this->addToModel("main_image", array(
			"type" => "files",
			"label" => "Add media here",
			"allowed_sizes" => "960x540",
			"max" => 1,
			"allowed_formats" => "png,jpg",
			"hint_message" => "Add single image by dragging it here. PNG or JPG allowed in 960x540.",
			"error_message" => "Media does not fit requirements."
		));

	}

}

?>