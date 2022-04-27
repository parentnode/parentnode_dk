CREATE TABLE `SITE_DB`.`item_timesheetuuid_projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_timesheetuuid_id` int(11) NOT NULL,
  `item_project_id` int(11) NOT NULL,


  PRIMARY KEY  (`id`),
  KEY `item_timesheetuuid_id` (`item_timesheetuuid_id`),
  KEY `item_project_id` (`item_project_id`),
  CONSTRAINT `item_timesheetuuid_projects_ibfk_1` FOREIGN KEY (`item_timesheetuuid_id`) REFERENCES `SITE_DB`.`item_timesheetuuid` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_timesheetuuid_projects_ibfk_2` FOREIGN KEY (`item_project_id`) REFERENCES `SITE_DB`.`item_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
