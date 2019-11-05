<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");
$query = new Query();
$IC = new Items();

print '<?xml version="1.0" encoding="UTF-8"?>';
?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?
// Front PAGE
$item = $IC->getItem(array("tags" => "page:front"));
?>
	<url>
		<loc><?= SITE_URL ?>/</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>1</priority>
	</url>
<?
// Blog PAGE
$item = $IC->getItem(array("tags" => "page:blog"));
?>
	<url>
		<loc><?= SITE_URL ?>/blog</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>daily</changefreq>
		<priority>1</priority>
	</url>
<?
// POST ITEMS
$items = $IC->getItems(array("itemtype" => "post", "status" => 1, "order" => "modified_at DESC")); 
foreach($items as $item):
?>
	<url>
		<loc><?= SITE_URL ?>/blog/<?= $item["sindex"] ?></loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>daily</changefreq>
		<priority>1</priority>
	</url>
<? endforeach; ?>
<?
// Tools PAGE
$item = $IC->getItem(array("tags" => "page:tools"));
?>
	<url>
		<loc><?= SITE_URL ?>/tools</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>1</priority>
	</url>
<?
// Contact PAGE
$item = $IC->getItem(array("tags" => "page:contact"));
?>
	<url>
		<loc><?= SITE_URL ?>/contact</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>1</priority>
	</url>
<?
// Manifest PAGE
$item = $IC->getItem(array("tags" => "page:manifest"));
?>
	<url>
		<loc><?= SITE_URL ?>/manifest</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>1</priority>
	</url>
<?
// About PAGE
$item = $IC->getItem(array("tags" => "page:about"));
?>
	<url>
		<loc><?= SITE_URL ?>/about</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>1</priority>
	</url>
<?
// Terms PAGE
$item = $IC->getItem(array("tags" => "page:terms"));
?>
	<url>
		<loc><?= SITE_URL ?>/terms</loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>1</priority>
	</url>
</urlset>