<?php
/**
* This file contains definitions
*
* @package Config
*/
header("Content-type: text/html; charset=UTF-8");
error_reporting(E_ALL);

/**
* Required site information
*/
define("SITE_UID", "PARE");
define("SITE_NAME", "parentnode.dk");
define("SITE_URL", "parentnode.dk");
define("SITE_EMAIL", "martin@kaestel.dk");

/**
* Optional constants
*/
define("DEFAULT_PAGE_DESCRIPTION", "");
define("DEFAULT_LANGUAGE_ISO", "EN");
define("DEFAULT_COUNTRY_ISO", "DK");
define("DEFAULT_CURRENCY_ISO", "DKK");


// // Enable items model
// define("SITE_ITEMS", true);
// 
// // Enable shop model
// define("SITE_SHOP", true);


// Enable notifications (send collection email after N notifications)
define("SITE_COLLECT_NOTIFICATIONS", 50);
?>
