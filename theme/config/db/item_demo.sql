CREATE TABLE `SITE_DB`.`item_demo` (
  `id` int(11) NOT NULL auto_increment,
  `item_id` int(11) NOT NULL,

  `name` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL DEFAULT '',
  `unsupported_segments` varchar(255) NOT NULL DEFAULT '',
  `classname` varchar(50) NOT NULL DEFAULT '',
  `description` text NOT NULL DEFAULT '',

  `position` int(11) NOT NULL DEFAULT 0,

  PRIMARY KEY  (`id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `item_demo_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `SITE_DB`.`items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
