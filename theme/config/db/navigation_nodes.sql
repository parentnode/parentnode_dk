INSERT INTO `SITE_DB`.`navigation_nodes` (node_name, node_link, navigation_id)
SELECT 'Services', '/janitor/service/list', (SELECT id FROM `SITE_DB`.`navigation` WHERE handle = 'main-janitor')
WHERE NOT EXISTS (
	SELECT id FROM `SITE_DB`.`navigation_nodes` WHERE node_link = '/janitor/service/list'
);