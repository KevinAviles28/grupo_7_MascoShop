CREATE DATABASE  IF NOT EXISTS `mascoshop` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mascoshop`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mascoshop
-- ------------------------------------------------------
-- Server version	5.5.5-10.3.16-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `prod_id_idx` (`prod_id`),
  CONSTRAINT `prod_id` FOREIGN KEY (`prod_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorys`
--

DROP TABLE IF EXISTS `categorys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorys`
--

LOCK TABLES `categorys` WRITE;
/*!40000 ALTER TABLE `categorys` DISABLE KEYS */;
INSERT INTO `categorys` VALUES (1,'perros'),(2,'gatos'),(3,'aves'),(4,'peces'),(5,'roedores'),(6,'reptiles');
/*!40000 ALTER TABLE `categorys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,'img-1616046913272.png',1),(2,'img-1616046976378.png',2),(3,'img-1616047043566.png',3),(4,'img-1616047160261.png',4),(5,'productoDefault.png',5),(6,'productoDefault.png',6),(7,'img-1616047505200.png',7),(8,'img-1616047583660.png',8),(9,'img-1616047650639.png',9),(10,'img-1616047926681.png',10),(11,'img-1616048016305.png',11),(12,'img-1617945360202.png',12),(13,'img-1617941268705.png',13),(14,'img-1617941339522.jpg',14),(15,'img-1617941440969.png',15),(16,'img-1617941554585.png',16),(17,'img-1617941609480.png',17),(18,'img-1617941816327.jpeg',18),(19,'img-1617941897658.jpeg',19),(20,'productoDefault.png',20),(21,'img-1617942188683.jpg',21),(22,'img-1617942336557.png',22),(23,'img-1617942556777.jpeg',23),(24,'img-1617942767185.png',24);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `precio` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `description` varchar(300) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `subcategory_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id_idx` (`category_id`),
  KEY `subcategory_id_idx` (`subcategory_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categorys` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `subcategory_id` FOREIGN KEY (`subcategory_id`) REFERENCES `sub_categorys` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Cama lana, combi cueva',10000,200,30,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.',1,2),(2,'Collar para perros',200,500,0,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.',1,2),(3,'Agility alimento para gatos',500,500,15,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.',2,1),(4,'Felix pate, comida para gatos',200,500,0,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.',2,1),(5,'Alimento para aves, Piolin',300,1000,0,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.',3,1),(6,'Jaula para aves',2000,50,50,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.',3,2),(7,'Marine, alimento para peces',200,100,0,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.',4,1),(8,'Pecera edificio de lujo',5000,50,15,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.',4,2),(9,'Jaula para roedores',5000,50,30,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.',5,2),(10,'Jaula hamster pro',2000,50,0,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.',5,2),(11,'Hervibor, alimento',500,200,30,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.',6,1),(12,'Jaula para reptiles',1000,50,50,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.',6,2),(13,'Upper Crack Criadores',1000,500,50,'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el cuando un impresor N del T persona que se dedica a la imprenta desconocido usó una galería de textos y los de tal manera que logró hacer un ',1,1),(14,'Purina Dogui',2000,500,30,'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el cuando un impresor N del T persona que se dedica a la imprenta desconocido usó una galería de textos y los de tal manera que logró hacer un ',1,1),(15,'Correa extensible',1000,200,0,'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el cuando un impresor N del T persona que se dedica a la imprenta desconocido usó una galería de textos y los de tal manera que logró hacer un ',1,2),(16,'Gimnasio para gatos',10000,50,10,'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el cuando un impresor N del T persona que se dedica a la imprenta desconocido usó una galería de textos y los de tal manera que logró hacer un ',2,2),(17,'Collar para gatos Small',200,200,0,'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el cuando un impresor N del T persona que se dedica a la imprenta desconocido usó una galería de textos y los de tal manera que logró hacer un ',2,2),(18,'Alimento para aves Menu',500,500,30,'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el cuando un impresor N del T persona que se dedica a la imprenta desconocido usó una galería de textos y los de tal manera que logró hacer un ',3,1),(19,'Jaula para aves Roja',7000,50,50,'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el cuando un impresor N del T persona que se dedica a la imprenta desconocido usó una galería de textos y los de tal manera que logró hacer un ',3,2),(20,'Alimento para peces Nemo',1000,100,30,'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el cuando un impresor N del T persona que se dedica a la imprenta desconocido usó una galería de textos y los de tal manera que logró hacer un ',4,1),(21,'Pecera Estilo Moderna',20000,10,30,'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el cuando un impresor N del T persona que se dedica a la imprenta desconocido usó una galería de textos y los de tal manera que logró hacer un ',4,2),(22,'Cunipic Crukiss frutas deshidratadas',200,500,0,'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el cuando un impresor N del T persona que se dedica a la imprenta desconocido usó una galería de textos y los de tal manera que logró hacer un ',5,1),(23,'ReptoCal',500,200,50,'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el cuando un impresor N del T persona que se dedica a la imprenta desconocido usó una galería de textos y los de tal manera que logró hacer un ',6,1),(24,'Casa para perros estilo moderna',25000,50,50,'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el cuando un impresor N del T persona que se dedica a la imprenta desconocido usó una galería de textos y los de tal manera que logró hacer un ',1,2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `product_purch_id` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id_idx` (`client_id`),
  KEY `product_purch_id_idx` (`product_purch_id`),
  CONSTRAINT `client_id` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `product_purch_id` FOREIGN KEY (`product_purch_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_categorys`
--

DROP TABLE IF EXISTS `sub_categorys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sub_categorys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_categorys`
--

LOCK TABLES `sub_categorys` WRITE;
/*!40000 ALTER TABLE `sub_categorys` DISABLE KEYS */;
INSERT INTO `sub_categorys` VALUES (1,'alimentos'),(2,'accesorios');
/*!40000 ALTER TABLE `sub_categorys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `provincia` varchar(100) DEFAULT NULL,
  `localidad` varchar(100) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `avatar` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Michel','Varela','michelvarela.95@outlook.com','$2b$12$XG9UvM6NDjdMnZcHJg7jtewQd0biqfneteU/sIkBL3q7ddWjvBUIi',NULL,NULL,NULL,NULL,'Admin','usuarioDefault.png'),(2,'Jonas','Sayago','yonassayago26@gmail.com','$2b$12$5pFAPgTR3EAdR6IOt6ZHmeE0NnGa6njI1JuCGrhyzWdvhb/Hr5bym',NULL,NULL,NULL,NULL,'Admin','avatar-1617940990559.jpeg'),(3,'Kevin','Bejarano','kevin85192381@gmail.com','$2b$12$zpm/gw0Yfu6AnEa.b49JaOo/Y0wx9.A.IAEWcAdZnWyAYinTkfPVe',NULL,NULL,NULL,NULL,'Admin','avatar-1617941088219.jpeg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-09  1:52:21
