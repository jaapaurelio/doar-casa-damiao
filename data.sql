# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: lhcp1130.webapps.net (MySQL 5.6.36-cll-lve)
# Database: fw3bjoi6_donations_site
# Generation Time: 2020-11-01 15:26:41 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table donations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `donations`;

CREATE TABLE `donations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `donor_name` varchar(200) DEFAULT NULL,
  `from_site` varchar(100) DEFAULT NULL,
  `payment_id` varchar(200) DEFAULT NULL,
  `payment_method` varchar(100) DEFAULT NULL,
  `total_amount` varchar(100) DEFAULT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `anonym` int(11) NOT NULL DEFAULT '0',
  `payed` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;

INSERT INTO `donations` (`id`, `donor_name`, `from_site`, `payment_id`, `payment_method`, `total_amount`, `notes`, `email`, `anonym`, `payed`, `created_at`, `updated_at`)
VALUES
	(254,'as','stripe','src_1HeeK1Enkgw3vohv0tGXxfwg','multibanco','100','','asd@asd.com',0,0,'2020-10-21 12:13:35','2020-10-21 12:13:35'),
	(255,'as','stripe','src_1HeeL9Enkgw3vohvzevbixO4','multibanco','100','','asd@asd.com',0,0,'2020-10-21 12:14:44','2020-10-21 12:14:44'),
	(256,'asd','stripe','src_1HekWyEnkgw3vohvXDrS7bMZ','multibanco','800','','jaapaurelio@gmail.com',0,0,'2020-10-21 18:51:21','2020-10-21 18:51:21'),
	(257,'sad','stripe','pi_1HemBvEnkgw3vohvlZbTUqPs','card','100','','jaapaurelio@gmail.com',0,0,'2020-10-21 20:37:43','2020-10-21 20:37:43'),
	(258,'sad','iban','iban',NULL,'100',NULL,'jaapaurelio@gmail.com ',0,0,'2020-10-21 20:44:01','2020-10-21 20:44:01'),
	(259,'sad','iban','iban',NULL,'100',NULL,'jaapaurelio@gmail.com ',0,0,'2020-10-21 20:44:10','2020-10-21 20:44:10'),
	(260,'sa','iban','iban',NULL,'100',NULL,'jaapaurelio@gmail.com ',0,0,'2020-10-21 20:44:39','2020-10-21 20:44:39'),
	(261,'','stripe','pi_1Hgsa3Enkgw3vohvPNkvHlEW','card','100','','jaapaurelio@gmail.com',1,0,'2020-10-27 14:51:19','2020-10-27 14:51:19');

/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table donators
# ------------------------------------------------------------

DROP TABLE IF EXISTS `donators`;

CREATE TABLE `donators` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `donor` varchar(200) NOT NULL,
  `payment_id` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `amount` varchar(200) NOT NULL,
  `visible` int(200) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `donators` WRITE;
/*!40000 ALTER TABLE `donators` DISABLE KEYS */;

INSERT INTO `donators` (`id`, `donor`, `payment_id`, `email`, `amount`, `visible`, `created_at`)
VALUES
	(199,'José Carvalho','src_123','','',1,'2019-12-27 16:48:33');

/*!40000 ALTER TABLE `donators` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table logs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `logs`;

CREATE TABLE `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `log_text` text NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;

INSERT INTO `logs` (`id`, `log_text`, `creation_date`)
VALUES
	(815,'create donation mb: asd src_1HekWyEnkgw3vohvXDrS7bMZ','2020-10-21 18:51:21'),
	(816,'webwooks: event type: source.canceled','2020-10-26 13:18:37'),
	(817,'webwooks: event type: source.canceled','2020-10-28 11:13:42'),
	(818,'webwooks: event type: source.canceled','2020-10-28 11:14:59'),
	(819,'webwooks: event type: source.canceled','2020-10-28 17:51:23');

/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table messages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `name_id` varchar(100) NOT NULL,
  `message` varchar(500) NOT NULL,
  `url` varchar(200) NOT NULL,
  `logo_url` varchar(10000) NOT NULL,
  `creation-date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;

INSERT INTO `messages` (`id`, `name`, `name_id`, `message`, `url`, `logo_url`, `creation-date`)
VALUES
	(22,'Gonçalo Alves ','ga','O Gonçalo Alves  já faz bater Corações ','https://casadamiao.pt/','https://img.elo7.com.br/product/zoom/2266127/adesivo-de-porta-decoracao-natal-frase-feliz-natal-decoracao-natal.jpg','2019-12-24 15:40:37'),
	(23,'Família Ivo','familiaivo','O Ivo Abreu, a Lídia Mariana, a Graciela Teles, a Cidália Teles, a Teresa Teles, a Cecília Teles e a Otília Teles ja fazem parte deste coração. Obrigado e Feliz Ano Novo.','https://casadamiao.pt','https://images.vexels.com/media/users/3/157721/isolated/preview/9791f002c481f76960e0ba6200bfb1a4-letras-de-feliz-ano-novo-by-vexels.png','2020-01-03 15:05:33');

/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sponsors
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sponsors`;

CREATE TABLE `sponsors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sponsors` text NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `sponsors` WRITE;
/*!40000 ALTER TABLE `sponsors` DISABLE KEYS */;

INSERT INTO `sponsors` (`id`, `sponsors`, `updated_at`)
VALUES
	(1,'[\r\n  {\r\n    \"name\": \"Blip\",\r\n    \"logoUrl\": \"https://media.glassdoor.com/sqll/574750/blip-squarelogo-1546796149576.png\",\r\n    \"url\": \"https://blip.pt\",\r\n    \"displayOrder\": \"1\"\r\n  },\r\n    {\r\n    \"name\": \"Latino Coelho 87\",\r\n    \"logoUrl\": \"https://i.ibb.co/LNz60N7/latino.png\",\r\n    \"url\": \"https://www.latinocoelho87.pt/\",\r\n    \"displayOrder\": \"2\"\r\n  },\r\n  {\r\n    \"name\": \"Coragem\",\r\n    \"logoUrl\": \"https://i.ibb.co/mJgSTqP/logo-ACoragem-2.png\",\r\n    \"url\": \"https://associacaocoragem.webnode.pt/\",\r\n    \"displayOrder\": \"3\"\r\n  }\r\n]\r\n','2019-12-23 14:36:31');

/*!40000 ALTER TABLE `sponsors` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table story
# ------------------------------------------------------------

DROP TABLE IF EXISTS `story`;

CREATE TABLE `story` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `characters` text NOT NULL,
  `email` text,
  `name` text,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
