-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: tp5
-- ------------------------------------------------------
-- Server version	5.6.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrateurs`
--

DROP TABLE IF EXISTS `administrateurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrateurs` (
  `idAdmin` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(10) NOT NULL,
  `password` varchar(8) NOT NULL,
  PRIMARY KEY (`idAdmin`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrateurs`
--

LOCK TABLES `administrateurs` WRITE;
/*!40000 ALTER TABLE `administrateurs` DISABLE KEYS */;
INSERT INTO `administrateurs` VALUES (1,'admin','admin');
/*!40000 ALTER TABLE `administrateurs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approvisionnement`
--

DROP TABLE IF EXISTS `approvisionnement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approvisionnement` (
  `numeroAppro` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `idFournisseur` int(11) DEFAULT NULL,
  PRIMARY KEY (`numeroAppro`),
  KEY `fk20` (`idFournisseur`),
  CONSTRAINT `fk20` FOREIGN KEY (`idFournisseur`) REFERENCES `fournisseur` (`idFournisseur`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvisionnement`
--

LOCK TABLES `approvisionnement` WRITE;
/*!40000 ALTER TABLE `approvisionnement` DISABLE KEYS */;
INSERT INTO `approvisionnement` VALUES (1,'2022-12-23 03:03:00',12),(2,'2022-12-23 03:15:00',12),(3,'2022-12-23 03:15:00',12),(4,'2022-12-23 03:15:00',12);
/*!40000 ALTER TABLE `approvisionnement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorie` (
  `idCategorie` varchar(10) NOT NULL,
  `nomCategorie` varchar(50) NOT NULL,
  PRIMARY KEY (`idCategorie`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorie`
--

LOCK TABLES `categorie` WRITE;
/*!40000 ALTER TABLE `categorie` DISABLE KEYS */;
INSERT INTO `categorie` VALUES ('DE1','Dell Electro'),('TV1','LG10221');
/*!40000 ALTER TABLE `categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `idClient` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `adresse` varchar(45) NOT NULL,
  `telephone` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`idClient`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'Youness','L3ASIMA',627594239,'test@tgogod'),(12,'Mohammed JADIR','rue 20 numero 9',66666666,'test@test'),(13,'Abdelmoughit ELOUMARI','hay eljadid, 162',627585858,'moughit@gmail.com'),(14,'Abdelmoughit ELOUMARI','hay eljadid, 162',627585858,'moughit@gmail.com'),(15,'Abdelmoughit ELOUMARI','hay eljadid, 162',627585858,'moughit@gmail.com'),(16,'oussama idrissi','Salmia 2, Rue 18, Imm 52, Apprt 5,',627594239,'oidrissi44@gmail.com'),(17,'oussama idrissi','Salmia 2, Rue 18, Imm 52, Apprt 5,',627594239,'oidrissi44@gmail.com'),(18,'oussama idrissi','Salmia 2, Rue 18, Imm 52, Apprt 5,',627594239,'oidrissi44@gmail.com'),(19,'oussama idrissi','Salmia 2, Rue 18, Imm 52, Apprt 5,',627594239,'oidrissi44@gmail.com'),(20,'hala','hala',2,'hala@hala');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commande`
--

DROP TABLE IF EXISTS `commande`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commande` (
  `numeroCmd` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `idClient` int(11) DEFAULT NULL,
  PRIMARY KEY (`numeroCmd`),
  KEY `fk1_idx` (`idClient`),
  CONSTRAINT `fk1` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1 COMMENT='			';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commande`
--

LOCK TABLES `commande` WRITE;
/*!40000 ALTER TABLE `commande` DISABLE KEYS */;
INSERT INTO `commande` VALUES (1,'2002-04-21 00:00:00',1),(2,'2022-12-14 00:41:32',1),(3,'2022-12-14 00:43:07',1),(4,'2022-12-14 00:43:22',1),(5,'2022-12-14 00:43:22',1),(6,'2022-12-14 00:46:32',1),(7,'2022-12-14 01:10:56',1),(8,'2022-12-14 01:11:09',1),(9,'2022-12-14 01:11:24',1),(10,'2022-12-18 14:33:43',1),(11,'2022-12-18 14:41:15',1),(12,'2022-12-18 14:46:07',1),(13,'2022-12-18 14:47:16',1),(14,'2022-12-18 14:48:15',1),(15,'2022-12-18 15:59:33',1),(16,'2022-10-18 22:32:08',1),(17,'2022-12-18 22:33:11',1),(18,'2022-12-18 22:33:45',1),(19,'2022-12-18 22:34:50',1),(20,'2022-12-18 22:34:50',1),(21,'2022-12-18 22:34:50',1),(22,'2022-12-18 22:34:50',1),(23,'2022-12-18 22:38:22',1),(24,'2022-12-18 22:38:22',1),(25,'2022-12-18 22:40:02',1),(26,'2022-03-18 22:41:26',1),(27,'2022-12-22 01:11:54',1),(28,'2022-12-22 01:12:15',1),(29,'2022-12-22 01:13:28',1),(30,'2022-11-22 01:14:59',1),(31,'2022-12-22 01:15:23',1),(32,'2022-12-22 01:17:52',1),(33,'2022-12-22 01:24:29',1),(34,'2022-12-22 03:57:39',1),(35,'2022-12-22 17:04:29',1),(36,'2022-12-22 17:05:27',1),(37,'2022-12-22 17:05:36',1),(38,'2022-12-22 17:25:15',1),(39,'2022-12-22 17:25:43',1),(40,'2022-12-22 17:27:33',1),(41,'2022-12-22 17:27:36',1),(42,'2022-12-22 17:27:38',1),(43,'2022-12-22 17:29:27',1),(44,'2022-12-22 17:29:30',1),(45,'2022-12-22 17:29:31',1),(46,'2022-12-22 17:29:33',1),(47,'2022-12-22 17:33:47',1),(48,'2022-12-22 17:33:50',1),(49,'2022-12-22 17:33:51',1),(50,'2022-12-22 17:33:53',1),(51,'2022-12-22 17:33:55',1),(52,'2022-12-23 01:16:00',1),(53,'2022-12-23 01:16:00',1),(54,'2022-12-23 01:19:00',1),(55,'2022-12-23 01:21:00',1),(56,'2022-12-23 01:23:00',1),(57,'2022-12-23 01:37:00',1),(58,'2022-12-23 01:37:00',1),(59,'2022-12-23 03:06:00',1),(60,'2022-12-23 03:09:00',1),(61,'2022-12-23 03:11:00',1),(62,'2022-12-23 03:14:00',1);
/*!40000 ALTER TABLE `commande` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fournisseur`
--

DROP TABLE IF EXISTS `fournisseur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fournisseur` (
  `idFournisseur` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `adresse` varchar(45) NOT NULL,
  `telephone` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`idFournisseur`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fournisseur`
--

LOCK TABLES `fournisseur` WRITE;
/*!40000 ALTER TABLE `fournisseur` DISABLE KEYS */;
INSERT INTO `fournisseur` VALUES (12,'Danone','casa',40,'danone@maroc');
/*!40000 ALTER TABLE `fournisseur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ligneappro`
--

DROP TABLE IF EXISTS `ligneappro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ligneappro` (
  `numeroAppro` int(11) NOT NULL,
  `quantite` int(11) DEFAULT NULL,
  `reference` varchar(50) NOT NULL,
  `prixAchat` float NOT NULL,
  PRIMARY KEY (`numeroAppro`,`reference`),
  KEY `po_idx` (`reference`),
  CONSTRAINT `po` FOREIGN KEY (`reference`) REFERENCES `produit` (`reference`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ap` FOREIGN KEY (`numeroAppro`) REFERENCES `approvisionnement` (`numeroAppro`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ligneappro`
--

LOCK TABLES `ligneappro` WRITE;
/*!40000 ALTER TABLE `ligneappro` DISABLE KEYS */;
INSERT INTO `ligneappro` VALUES (1,2,'AZ10',300),(1,1,'ong',199),(2,1,'AZ10',20),(2,1,'T440',199),(2,1,'T440p',200);
/*!40000 ALTER TABLE `ligneappro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lignecmd`
--

DROP TABLE IF EXISTS `lignecmd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lignecmd` (
  `numeroCmd` int(11) NOT NULL,
  `quantite` int(11) DEFAULT NULL,
  `reference` varchar(50) NOT NULL,
  `prixVente` float NOT NULL,
  PRIMARY KEY (`numeroCmd`,`reference`),
  KEY `fk3_idx` (`reference`),
  CONSTRAINT `fk2` FOREIGN KEY (`numeroCmd`) REFERENCES `commande` (`numeroCmd`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk3` FOREIGN KEY (`reference`) REFERENCES `produit` (`reference`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lignecmd`
--

LOCK TABLES `lignecmd` WRITE;
/*!40000 ALTER TABLE `lignecmd` DISABLE KEYS */;
INSERT INTO `lignecmd` VALUES (1,1,'AZ10',1),(1,1,'T440p',1000),(16,2,'AZ10',100),(26,2,'fr',700),(30,4,'ong',1000),(33,1,'ong',300),(33,1,'T440',200),(35,1,'AZ10',20),(36,1,'fr',199),(38,1,'fr',199),(38,1,'ong',199),(39,1,'dde',199),(40,1,'dde',199),(41,1,'dde',199),(42,1,'AZ10',20),(43,1,'AZ10',20),(44,1,'AZ10',20),(45,1,'AZ10',20),(46,1,'ong',199),(47,1,'T440',199),(48,1,'T440',199),(49,1,'T440',199),(50,1,'T440',199),(51,1,'T440',199),(52,2,'AZ10',20),(52,1,'dde',199),(52,2,'fr',199),(54,1,'AZ10',20),(54,1,'fr',199),(54,1,'ong',199),(54,1,'T440',199),(54,1,'T440p',200),(55,1,'ong',199),(56,1,'ong',199),(57,1,'ong',199),(57,1,'T440',199),(59,1,'ong',199),(59,1,'T440',199),(60,1,'T440',199),(61,1,'ong',199),(62,1,'T440',199);
/*!40000 ALTER TABLE `lignecmd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produit`
--

DROP TABLE IF EXISTS `produit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produit` (
  `reference` varchar(50) NOT NULL,
  `libelle` varchar(45) NOT NULL,
  `prixUnitaire` float NOT NULL,
  `quantiteStock` int(11) NOT NULL,
  `prixAchat` float NOT NULL,
  `image` varchar(45) DEFAULT NULL,
  `idCategorie` varchar(45) NOT NULL,
  PRIMARY KEY (`reference`),
  KEY `fk5_idx` (`idCategorie`),
  CONSTRAINT `fk5` FOREIGN KEY (`idCategorie`) REFERENCES `categorie` (`idCategorie`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produit`
--

LOCK TABLES `produit` WRITE;
/*!40000 ALTER TABLE `produit` DISABLE KEYS */;
INSERT INTO `produit` VALUES ('AZ10','azib',20,13,7,'azib der3y.png','TV1'),('dde','Lenovo',199,1,11,'default.png','DE1'),('fr','Lenovo',199,6,11,'MAROC.jpg','DE1'),('ong','Lenovo',199,5,11,'default.png','DE1'),('T440','Lenovo',199,10,11,'default.png','DE1'),('T440p','Lenovo',200,9,11,'Lenovo.jpg','DE1');
/*!40000 ALTER TABLE `produit` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-23 16:31:09
