/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.7.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: tramada_dbc
-- ------------------------------------------------------
-- Server version	11.7.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

CREATE DATABASE IF NOT EXISTS tramada_dbc;
USE tramada_dbc;


--
-- Table structure for table `categoria_insumos`
--

DROP TABLE IF EXISTS `categoria_insumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_insumos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nombre_categoria_insumo` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_insumos`
--

LOCK TABLES `categoria_insumos` WRITE;
/*!40000 ALTER TABLE `categoria_insumos` DISABLE KEYS */;
INSERT INTO `categoria_insumos` VALUES
(1,'Materiales para tejidos'),
(2,'Herramientas de confección'),
(3,'Equipos de maquinaria textil');
/*!40000 ALTER TABLE `categoria_insumos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_productos`
--

DROP TABLE IF EXISTS `categoria_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_productos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_productos`
--

LOCK TABLES `categoria_productos` WRITE;
/*!40000 ALTER TABLE `categoria_productos` DISABLE KEYS */;
INSERT INTO `categoria_productos` VALUES
(1,'	Ropa de verano'),
(2,'Ropa de invierno'),
(3,'	Accesorios');
/*!40000 ALTER TABLE `categoria_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(55) NOT NULL,
  `telefono_cliente` varchar(15) DEFAULT NULL,
  `direccion_cliente` varchar(100) DEFAULT NULL,
  `tipo_pago` varchar(50) DEFAULT NULL,
  `tipo_cliente` varchar(55) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES
(1,'jacinto  arbelaes','1234567890','Calle Falsa 123','Efectivo','Regular'),
(2,'gabriela gonzales','987654321','Avenida Siempreviva 456','Efectivo','VIP'),
(3,'andres gutierrez','123456789','Boulevard Central 789','Efectivo','Mayorista'),
(5,'Luis gutierrez ','32221179141','CALLE 3B N-5-35 EST3','Efectivo','Minorista'),
(6,'cosculluela cañañas','32020135','calle 1213 #1-621','Efectivo','Mayorista'),
(7,'leny kraxct','3214562285','calle prueva 123','Efectivo','Regular'),
(8,'nepomuseno matallana','3212250232','los jusgados 123','Efectivo','Regular'),
(9,'Mohame Abyal ','2365124523','israel 123','Transferencia Bancaria','Regular');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_venta`
--

DROP TABLE IF EXISTS `detalle_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) DEFAULT NULL,
  `precio_unitario` int(11) DEFAULT NULL,
  `subtotal` int(11) DEFAULT NULL,
  `ventas_id` int(11) NOT NULL,
  `productos_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdetalle_ve138844` (`ventas_id`),
  KEY `FKdetalle_ve318385` (`productos_id`),
  CONSTRAINT `FKdetalle_ve138844` FOREIGN KEY (`ventas_id`) REFERENCES `venta` (`id`),
  CONSTRAINT `FKdetalle_ve318385` FOREIGN KEY (`productos_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta`
--

LOCK TABLES `detalle_venta` WRITE;
/*!40000 ALTER TABLE `detalle_venta` DISABLE KEYS */;
INSERT INTO `detalle_venta` VALUES
(2,100,50,100,6,4),
(3,50,100,50,2,4),
(4,100,5000,100000,16,4),
(5,50,5000,100000,17,4),
(6,25,5000,100000,2,4),
(7,25,5000,100000,3,5),
(8,50,5000,5000,2,21),
(9,50,5000,5000,9,22),
(10,25,5000,5000,4,22),
(11,25,5000,5000,5,22),
(12,50,1000,50000,3,6),
(13,50,1000,690000,19,5),
(14,50,1000,9999999,18,11),
(15,50,50000,25000,20,23);
/*!40000 ALTER TABLE `detalle_venta` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER actualizar_stock_productos
AFTER INSERT ON detalle_venta
FOR EACH ROW
BEGIN
    
    UPDATE productos 
    SET cantidad_producto = cantidad_producto - NEW.cantidad
    WHERE id = NEW.productos_id;
    
    
    INSERT INTO movimientos_inventario 
    (tipo_movimiento, cantidad, fecha_movimiento, motivo, producto_id)
    VALUES ('salida', NEW.cantidad, NOW(), 'Venta registrada', NEW.productos_id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `historial_precios_insumos`
--

DROP TABLE IF EXISTS `historial_precios_insumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_precios_insumos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `precio_insumo` double(19,0) NOT NULL,
  `fecha_historial` timestamp NOT NULL DEFAULT current_timestamp(),
  `insumos_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhistorial_619176` (`insumos_id`),
  CONSTRAINT `FKhistorial_619176` FOREIGN KEY (`insumos_id`) REFERENCES `insumos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_precios_insumos`
--

LOCK TABLES `historial_precios_insumos` WRITE;
/*!40000 ALTER TABLE `historial_precios_insumos` DISABLE KEYS */;
INSERT INTO `historial_precios_insumos` VALUES
(3,200,'2024-11-20 02:10:39',6),
(9,200,'2024-11-20 02:25:09',6),
(13,900,'2024-11-20 22:54:35',6),
(14,900,'2024-11-21 00:14:57',14),
(17,10,'2024-12-08 00:05:13',16),
(19,0,'2025-04-14 16:24:50',4),
(20,10,'2025-04-14 16:24:55',4),
(21,5,'2025-04-14 16:25:14',4),
(22,0,'2025-04-14 16:29:03',4),
(23,100000,'2025-04-14 17:36:52',17),
(24,10000,'2025-04-17 21:53:08',18),
(25,10000,'2025-04-17 21:53:10',19),
(26,10000,'2025-04-17 21:53:14',20),
(27,10000,'2025-04-17 21:53:18',21),
(28,100,'2025-04-17 21:53:54',22),
(29,100000,'2025-04-17 21:55:56',23),
(30,100,'2025-04-17 22:05:13',24),
(31,100000,'2025-04-17 22:09:52',25),
(32,50000,'2025-04-17 22:11:10',26),
(33,1000000,'2025-04-17 22:13:36',27),
(34,100000,'2025-04-17 22:25:45',28),
(35,100000,'2025-04-17 22:26:31',29),
(36,69000,'2025-04-18 01:57:34',30),
(37,100000,'2025-04-18 01:58:43',31),
(38,69200,'2025-04-18 02:05:16',32),
(39,80000,'2025-04-18 02:08:00',33),
(40,80000,'2025-04-18 02:19:35',34),
(41,100,'2025-04-18 02:20:26',35),
(42,89000,'2025-04-18 02:26:19',36),
(43,99000,'2025-04-18 02:27:27',37),
(44,10000,'2025-04-18 02:28:01',38),
(45,169000,'2025-04-18 02:35:49',39),
(46,62000,'2025-04-18 02:39:17',40),
(47,169000,'2025-04-18 02:44:16',41),
(48,59000,'2025-04-18 02:51:30',42),
(49,769000,'2025-04-18 02:55:32',43),
(50,69000,'2025-04-18 02:59:43',44);
/*!40000 ALTER TABLE `historial_precios_insumos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_precios_productos`
--

DROP TABLE IF EXISTS `historial_precios_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_precios_productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `precios_producto` double(19,2) NOT NULL,
  `fecha_historial` timestamp NOT NULL DEFAULT current_timestamp(),
  `producto_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhistorial_745263` (`producto_id`),
  CONSTRAINT `FKhistorial_745263` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_precios_productos`
--

LOCK TABLES `historial_precios_productos` WRITE;
/*!40000 ALTER TABLE `historial_precios_productos` DISABLE KEYS */;
INSERT INTO `historial_precios_productos` VALUES
(1,100.00,'2024-11-20 02:15:49',4),
(2,150.00,'2024-11-20 02:15:49',5),
(3,200.00,'2024-11-20 02:15:49',6),
(4,100.00,'2024-11-20 02:18:12',4),
(5,150.00,'2024-11-20 02:18:12',5),
(6,200.00,'2024-11-20 02:18:12',6),
(7,100.00,'2024-11-20 02:23:03',4),
(8,150.00,'2024-11-20 02:23:03',5),
(9,200.00,'2024-11-20 02:23:03',6),
(10,500.00,'2024-12-03 01:54:22',7),
(11,100.00,'2024-12-06 22:18:10',8),
(12,50.00,'2024-12-07 23:53:48',9),
(13,1000.00,'2025-04-06 02:35:52',10),
(14,1000.00,'2025-04-06 02:36:13',11),
(15,50000.00,'2025-04-06 02:37:50',12),
(16,66666.00,'2025-04-06 02:46:44',13),
(17,50000.00,'2025-04-06 03:22:14',14),
(18,50000.00,'2025-04-06 03:23:13',15),
(19,500.00,'2025-04-06 19:35:18',16),
(20,50000.00,'2025-04-06 19:40:33',17),
(21,5000.00,'2025-04-07 00:23:59',20),
(22,50000.00,'2025-04-07 00:27:57',21),
(23,10000.00,'2025-04-14 19:07:02',22),
(24,10000.00,'2025-04-14 22:44:15',22),
(25,20000.00,'2025-04-14 22:50:00',22),
(26,50000.00,'2025-04-15 00:55:19',22),
(27,100.00,'2025-04-15 01:06:00',4),
(28,200.00,'2025-04-15 01:08:10',4),
(29,77777.00,'2025-04-15 01:11:17',22),
(30,888888.00,'2025-04-15 01:15:07',22),
(31,15000.00,'2025-04-15 23:53:43',23),
(32,15000.00,'2025-04-15 23:54:46',23);
/*!40000 ALTER TABLE `historial_precios_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insumos`
--

DROP TABLE IF EXISTS `insumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `insumos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nombre_insumo` varchar(55) NOT NULL,
  `color_insumo` varchar(25) NOT NULL,
  `peso_insumo` double(19,0) NOT NULL,
  `cantidad_insumo` int(10) NOT NULL,
  `precio_insumo` int(10) NOT NULL,
  `id_proveedor` int(10) NOT NULL,
  `categoria_insumos_id` int(10) NOT NULL,
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FKinsumos264924` (`id_proveedor`),
  KEY `FKinsumos664014` (`categoria_insumos_id`),
  CONSTRAINT `FKinsumos264924` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id`),
  CONSTRAINT `FKinsumos664014` FOREIGN KEY (`categoria_insumos_id`) REFERENCES `categoria_insumos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insumos`
--

LOCK TABLES `insumos` WRITE;
/*!40000 ALTER TABLE `insumos` DISABLE KEYS */;
INSERT INTO `insumos` VALUES
(4,'Tejido de lino','Gris',-5,-1405,0,4,1,'2025-04-14 16:29:03'),
(6,'Hilo de fibra','rojo',444,200,900,5,3,'2024-12-07 04:04:12'),
(14,'Hilo de fibra','rojo',444,150,900,5,3,'2025-04-13 01:15:50'),
(15,'Tela de algodón','Gris',25,50,5,4,1,'2024-12-09 15:58:38'),
(16,'hilossssaaa','aaa',20,50,10,4,2,'2024-12-09 15:38:23'),
(17,'algodon','azul',60,20,100000,19,1,'2025-04-14 17:36:52'),
(18,'nuevo mate','azul',500,100,10000,22,1,'2025-04-17 21:53:08'),
(19,'nuevo mate','azul',500,100,10000,22,1,'2025-04-17 21:53:10'),
(20,'nuevo mate','azul',500,100,10000,22,1,'2025-04-17 21:53:14'),
(21,'nuevo mate','azul',500,100,10000,22,1,'2025-04-17 21:53:18'),
(22,'otro material','blanco',50,100,100,21,1,'2025-04-17 21:53:54'),
(23,'un materila mas','rojo ',50,100,100000,18,2,'2025-04-17 21:55:56'),
(24,'actualiza mate','azul ',60,100,100,20,1,'2025-04-17 22:05:13'),
(25,'parbacdo tbla','negro',50,100,100000,20,3,'2025-04-17 22:09:52'),
(26,'actualizando mate','blanco',100,100,50000,19,2,'2025-04-17 22:11:10'),
(27,'otro material ','ngo',1000,100,1000000,19,2,'2025-04-17 22:13:36'),
(28,'pob otro material','blanco',50000,100,100000,20,1,'2025-04-17 22:25:45'),
(29,'probando material ','nnn',5000,140,100000,4,1,'2025-04-17 22:26:31'),
(30,'probando add','azula',50,100,69000,21,1,'2025-04-18 01:57:34'),
(31,'probando add-2','mmm',52,100,100000,18,1,'2025-04-18 01:58:43'),
(32,'probano otro materia 3','nn',92,20,69200,22,1,'2025-04-18 02:05:16'),
(33,'agregando','negro',5000,100,80000,4,1,'2025-04-18 02:08:00'),
(34,'materia-69','negro',5000,100,80000,18,2,'2025-04-18 02:19:35'),
(35,'material-80','negro',59,100,100,4,1,'2025-04-18 02:20:26'),
(36,'ultimaprueva','asul',50,100,89000,17,2,'2025-04-18 02:26:19'),
(37,'probandodenuevo','balco',50,100,99000,21,1,'2025-04-18 02:27:27'),
(38,'otra_vez','asas',5000,1000,10000,5,1,'2025-04-18 02:28:01'),
(39,'probando otravez','azul',50000,100,169000,20,2,'2025-04-18 02:35:49'),
(40,'estaves ','negro',200,100,62000,17,2,'2025-04-18 02:39:17'),
(41,'esta vez si dio','blanco',500,50,169000,17,2,'2025-04-18 23:12:48'),
(42,'cnuevacateg','100',10,5000,59000,17,1,'2025-04-18 02:51:30'),
(43,'estavessera','blanco',550,100,769000,5,1,'2025-04-18 02:55:32'),
(44,'estaeslaverda','blanco',50,100,69000,22,2,'2025-04-18 02:59:43');
/*!40000 ALTER TABLE `insumos` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER insumos_historial_precio
AFTER INSERT ON insumos
FOR EACH ROW
BEGIN
    INSERT INTO historial_precios_insumos (insumos_id, precio_insumo)
    VALUES (NEW.id, NEW.precio_insumo);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER ActualizarHistoricoPreciosInsumos
BEFORE UPDATE ON insumos
FOR EACH ROW
BEGIN
    IF NEW.precio_insumo <> OLD.precio_insumo THEN
        INSERT INTO historial_precios_insumos (insumos_id, precio_insumo, fecha_historial)
        VALUES (NEW.id, NEW.precio_insumo, CURRENT_TIMESTAMP);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `movimientos_inventario`
--

DROP TABLE IF EXISTS `movimientos_inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimientos_inventario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_movimiento` enum('entrada','salida','ajuste','perdida') NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_movimiento` timestamp NOT NULL DEFAULT current_timestamp(),
  `motivo` varchar(100) NOT NULL,
  `insumos_id` int(10) DEFAULT NULL,
  `producto_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmovimiento315619` (`insumos_id`),
  KEY `FKmovimiento469901` (`producto_id`),
  CONSTRAINT `FKmovimiento315619` FOREIGN KEY (`insumos_id`) REFERENCES `insumos` (`id`),
  CONSTRAINT `FKmovimiento469901` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimientos_inventario`
--

LOCK TABLES `movimientos_inventario` WRITE;
/*!40000 ALTER TABLE `movimientos_inventario` DISABLE KEYS */;
INSERT INTO `movimientos_inventario` VALUES
(25,'salida',50,'2024-12-07 04:04:12','Orden en proceso',6,5),
(27,'salida',100,'2025-04-13 00:14:10','Orden en proceso',4,4),
(28,'salida',100,'2025-04-13 01:15:50','Orden en proceso',14,15),
(29,'salida',100,'2025-04-13 01:57:04','Orden en proceso',4,4),
(30,'salida',50,'2025-04-13 20:26:29','Orden en proceso',4,5),
(31,'salida',15,'2025-04-13 22:02:59','Orden en proceso',4,5),
(32,'salida',25,'2025-04-15 01:55:54','Venta registrada',NULL,4),
(33,'salida',25,'2025-04-15 01:56:36','Venta registrada',NULL,5),
(34,'salida',50,'2025-04-15 02:02:03','Venta registrada',NULL,21),
(35,'salida',50,'2025-04-15 02:02:03','Venta ID 2',NULL,21),
(36,'salida',50,'2025-04-15 02:03:04','Venta registrada',NULL,22),
(37,'salida',50,'2025-04-15 02:03:04','Venta ID 9',NULL,22),
(38,'salida',25,'2025-04-15 02:03:55','Venta registrada',NULL,22),
(39,'salida',25,'2025-04-15 02:03:55','Venta ID 4',NULL,22),
(40,'salida',25,'2025-04-15 02:06:02','Venta registrada',NULL,22),
(41,'salida',50,'2025-04-18 22:30:15','Venta registrada',NULL,6),
(42,'salida',50,'2025-04-18 22:31:55','Venta registrada',NULL,5),
(43,'salida',50,'2025-04-18 22:32:28','Venta registrada',NULL,11),
(44,'salida',50,'2025-04-18 22:40:04','Venta registrada',NULL,23),
(45,'salida',50,'2025-04-18 23:12:48','Orden en proceso',41,20);
/*!40000 ALTER TABLE `movimientos_inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orden_de_produccion`
--

DROP TABLE IF EXISTS `orden_de_produccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `orden_de_produccion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_orden` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_entrega` timestamp NOT NULL,
  `cantidad_productos_solicitada` int(50) DEFAULT NULL,
  `cantidad_insumo_necesaria` int(50) NOT NULL,
  `usuario_id` int(10) NOT NULL,
  `anotaciones` varchar(255) DEFAULT NULL,
  `estado_orden` enum('completado','en proceso','en revision') NOT NULL,
  `insumos_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_insumos_orden` (`insumos_id`),
  KEY `fk_producto_orden` (`producto_id`),
  KEY `fk_usuario_orden` (`usuario_id`),
  CONSTRAINT `FKorden_de_p803341` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `fk_insumos_orden` FOREIGN KEY (`insumos_id`) REFERENCES `insumos` (`id`),
  CONSTRAINT `fk_producto_orden` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`),
  CONSTRAINT `fk_usuario_orden` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden_de_produccion`
--

LOCK TABLES `orden_de_produccion` WRITE;
/*!40000 ALTER TABLE `orden_de_produccion` DISABLE KEYS */;
INSERT INTO `orden_de_produccion` VALUES
(3,'2024-11-24 20:45:13','2024-12-01 20:00:00',100,50,1,'Orden prioritaria','en proceso',4,5),
(20,'2024-12-07 03:12:26','2024-12-07 03:12:00',100,50,1,'mm','en proceso',4,5),
(27,'2024-12-07 04:04:12','2024-12-14 04:02:00',100,50,2,'wdasd','en proceso',6,5),
(28,'2024-12-07 04:05:23','2024-12-21 04:04:00',20,10,3,'lklkm','completado',15,8),
(32,'2025-04-13 01:15:50','2025-04-11 01:57:00',50,100,4,'probando ids ','en proceso',6,4),
(33,'2025-04-13 01:57:04','2025-04-18 01:56:00',100,100,1,'probando los ids en tablas ','en proceso',4,4),
(34,'2025-04-13 02:36:12','2025-04-15 20:26:00',50,10,3,'probando fecha editar','en proceso',6,16),
(35,'2025-04-13 20:26:29','2025-04-14 20:25:00',100,50,1,'probando fechas ','en proceso',4,5),
(36,'2025-04-13 22:02:59','2025-04-15 22:02:00',30,15,1,'probando nevo ','en proceso',4,5),
(37,'2025-04-18 23:12:48','2025-04-18 23:16:00',100,50,3,'orden en movimiento','completado',26,13),
(38,'2025-04-18 23:14:05','2025-04-18 23:13:00',50,25,3,'orden hecha','completado',14,16);
/*!40000 ALTER TABLE `orden_de_produccion` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER actualizar_movimientos_inventario
AFTER INSERT ON orden_de_produccion
FOR EACH ROW
BEGIN
    IF NEW.estado_orden = 'en proceso' THEN
        
        INSERT INTO movimientos_inventario (tipo_movimiento, cantidad, fecha_movimiento, motivo, insumos_id, producto_id)
        VALUES ('salida', NEW.cantidad_insumo_necesaria, NOW(), 'Orden en proceso', NEW.insumos_id, NEW.producto_id);

        
        UPDATE insumos
        SET cantidad_insumo = cantidad_insumo - NEW.cantidad_insumo_necesaria
        WHERE id = NEW.insumos_id;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `orden_produccion_movimiento`
--

DROP TABLE IF EXISTS `orden_produccion_movimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `orden_produccion_movimiento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orden_produccion_id` int(11) NOT NULL,
  `movimiento_inventario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orden_produccion_movimiento_ibfk_1` (`orden_produccion_id`),
  KEY `orden_produccion_movimiento_ibfk_2` (`movimiento_inventario_id`),
  CONSTRAINT `orden_produccion_movimiento_ibfk_1` FOREIGN KEY (`orden_produccion_id`) REFERENCES `orden_de_produccion` (`id`),
  CONSTRAINT `orden_produccion_movimiento_ibfk_2` FOREIGN KEY (`movimiento_inventario_id`) REFERENCES `movimientos_inventario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden_produccion_movimiento`
--

LOCK TABLES `orden_produccion_movimiento` WRITE;
/*!40000 ALTER TABLE `orden_produccion_movimiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `orden_produccion_movimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_pago` timestamp NULL DEFAULT NULL,
  `monto` int(11) NOT NULL,
  `metodo_pago` varchar(55) DEFAULT NULL,
  `comentarios` varchar(200) DEFAULT NULL,
  `venta_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpago371729` (`venta_id`),
  CONSTRAINT `FKpago371729` FOREIGN KEY (`venta_id`) REFERENCES `venta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perdida_insumos`
--

DROP TABLE IF EXISTS `perdida_insumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `perdida_insumos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `cantidad_perdida` int(10) NOT NULL,
  `insumos_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKperdida_in183794` (`insumos_id`),
  CONSTRAINT `FKperdida_in183794` FOREIGN KEY (`insumos_id`) REFERENCES `insumos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perdida_insumos`
--

LOCK TABLES `perdida_insumos` WRITE;
/*!40000 ALTER TABLE `perdida_insumos` DISABLE KEYS */;
/*!40000 ALTER TABLE `perdida_insumos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perdida_productos`
--

DROP TABLE IF EXISTS `perdida_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `perdida_productos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `cantidad_perdida` int(10) NOT NULL,
  `producto_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKperdida_pr759061` (`producto_id`),
  CONSTRAINT `FKperdida_pr759061` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perdida_productos`
--

LOCK TABLES `perdida_productos` WRITE;
/*!40000 ALTER TABLE `perdida_productos` DISABLE KEYS */;
INSERT INTO `perdida_productos` VALUES
(3,2,4),
(4,5,5);
/*!40000 ALTER TABLE `perdida_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(50) NOT NULL,
  `genero_producto` varchar(25) NOT NULL,
  `tipo_producto` varchar(55) NOT NULL,
  `talla_producto` varchar(10) NOT NULL,
  `color_producto` varchar(25) NOT NULL,
  `peso_producto` int(10) NOT NULL,
  `cantidad_producto` int(11) NOT NULL,
  `precio_producto` int(10) NOT NULL,
  `categoria_productos_id` int(10) NOT NULL,
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FKproductos779460` (`categoria_productos_id`),
  CONSTRAINT `FKproductos779460` FOREIGN KEY (`categoria_productos_id`) REFERENCES `categoria_productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES
(4,'Producto A','Masculino','Material','M','Rojo',5,25,300,2,'2025-04-15 02:10:00'),
(5,'Producto B','Femenino','Herramienta','S','Negro',3,-45,150,2,'2025-04-18 22:31:55'),
(6,'Producto C','Unisex','Equipo','L','Azul',10,-30,200,3,'2025-04-18 22:30:15'),
(7,'ma ','m','m','m','m',5,50,500,1,'2024-12-03 01:52:00'),
(8,'ma','ma','ma','ma','ma',52,52,100,2,'2024-12-24 22:19:00'),
(9,'saco','n','n','n','n',50,50,50,1,'2024-12-07 23:53:00'),
(10,'saco','m','ropa','m','axul',50,1,1000,1,'2025-04-06 02:35:52'),
(11,'saco','m','ropa','m','axul',50,-49,1000,1,'2025-04-18 22:32:28'),
(12,'Nuevo producto','m','nevoproduct','m','blanco',50,69,50000,1,'2025-04-06 02:37:50'),
(13,'otro producto','m','otro prodcut','m','amarillo',50,66,66666,1,'2025-04-06 02:46:44'),
(14,'nievop','m','niopodd','m','azul',50,10,50000,1,'2025-04-06 03:22:14'),
(15,'saco','m','niopodd','m','azul',50,10,50000,1,'2025-04-06 20:03:00'),
(16,'soynuevo','m','nuevo ','m','rojo',50,20,500,1,'2025-04-06 19:35:18'),
(17,'hola ','m','master','m','azulk',50,13,50000,1,'2025-04-06 19:40:33'),
(20,'soynuevoiproducto','m','nuevo','m','azul',50,10,5000,1,'2025-04-07 00:23:59'),
(21,'probando editar','Masculino','Camisa','M','asul',50,500,50000,1,'2025-04-16 02:06:00'),
(22,'editando camisa','Masculino','Ropa interior','XXL','negro ',200,325,99999,1,'2025-04-15 02:06:02'),
(23,'editando  este producto ','Femenino','Ropa deportiva','XXL','blanco ',100,150,200000,2,'2025-04-18 22:40:04');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER insertar_historial_precio
AFTER INSERT ON productos
FOR EACH ROW
BEGIN
    INSERT INTO historial_precios_productos (precios_producto, producto_id)
    VALUES (NEW.precio_producto, NEW.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER actualizar_historial_precio
BEFORE UPDATE ON productos
FOR EACH ROW
BEGIN
    IF NEW.precio_producto <> OLD.precio_producto THEN
        INSERT INTO historial_precios_productos 
        (producto_id, precios_producto, fecha_historial)
        VALUES (OLD.id, OLD.precio_producto, CURRENT_TIMESTAMP);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nombre_proveedor` varchar(55) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `correo` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_proveedor` (`nombre_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES
(4,'Proveedor A','123-456-7890','Calle 123, Ciudad X',NULL),
(5,'Proveedor B','+1 234 567 8901','Av. Principal 456, Ciudad Y',NULL),
(17,'hilos azules','32221145','calle identic 123','hilosAzules@gmail.xom'),
(18,'hilos del norte','32211145563','calle identifca 123','hilosdelnorte@gmail.com'),
(19,'soy nuevo','1232345','calle falsa 1223','soynuevo@gmail.com'),
(20,'nuevo proveedor','3221235232','probando calle',''),
(21,'hola otravez','51321312','calle 3-65','hola@gmail.com'),
(22,'probando prov','133326','calle 1231','prov@gmail.com');
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES
(1,'Administrador'),
(2,'Usuario'),
(3,'Gerente');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `email` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `FKusuario340715` (`id_rol`),
  CONSTRAINT `FKusuario340715` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES
(1,'admin@ejemplo.com','$2a$10$kgGkVB8aEyfd09mD.EHuWOaKv4gZ7FrDeOEGTwk7lbykTsjV6wz26',1),
(2,'usuario@ejemplo.com','$2a$10$kgGkVB8aEyfd09mD.EHuWOaKv4gZ7FrDeOEGTwk7lbykTsjV6wz26',2),
(3,'gerente@ejemplo.com','$2a$10$kgGkVB8aEyfd09mD.EHuWOaKv4gZ7FrDeOEGTwk7lbykTsjV6wz26',3),
(4,'facil@gmail.com','$2a$10$faq44YocCqfR.MVf/dNr.OuD0PgPupDKEro1dpMk/hcIIOXJE3dme',2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_venta` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado_pago` varchar(55) NOT NULL,
  `tipo_venta` varchar(55) NOT NULL,
  `total_venta` int(20) NOT NULL,
  `comentarios` varchar(100) DEFAULT NULL,
  `clientes_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKventa321749` (`clientes_id`),
  CONSTRAINT `FKventa321749` FOREIGN KEY (`clientes_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES
(2,'2024-12-06 00:17:30','Pagado','Online',1500,'Entrega rápida solicitada',1),
(3,'2024-12-06 00:17:30','Pendiente','Presencial',800,NULL,2),
(4,'2024-12-06 00:17:30','Pagado','Online',1200,'Pedido recurrente',3),
(5,'2024-12-06 22:48:00','efectivo ','muco ',502,'pagado ',1),
(6,'2024-12-08 00:09:00','efectivo ','muco 2',501,'tarjeta',2),
(7,'2025-04-07 01:19:20','pago','efectivo',5020000,'Nueva venta',1),
(8,'2025-04-07 02:00:13','Nuevo ','nuevo',100000,'Nueva venta',1),
(9,'2025-04-07 02:00:17','Nuevo ','nuevo',100000,'Nueva venta',1),
(10,'2025-04-07 02:00:20','Nuevo ','nuevo',100000,'Nueva venta',1),
(11,'2025-04-07 02:00:25','Nuevo ','nuevo',100000,'Nueva venta',1),
(12,'2025-04-07 02:01:02','Nuevo ','nuevo',100000,'Nueva venta',1),
(13,'2025-04-07 02:06:39','venta fecha','ventafecha',100000,'fechaventa',1),
(14,'2025-04-07 02:06:58','venta fecha','ventafecha',100000,'fechaventa',1),
(15,'2025-04-07 02:07:33','venta fecha','ventafecha',100000,'fechaventa',1),
(16,'2025-04-07 02:15:36','Nueva venta','no hay nuila ',100000,'no hay nulo',1),
(17,'2025-04-07 05:25:49','Nueva venta','efectivo',50000,'provando venta',1),
(18,'2025-04-10 04:19:00','Pendiente','Al Por Mayor',69000,'editando venta ',8),
(19,'2025-04-18 21:41:00','Pendiente','Al Por Mayor',69000,'otra venta ',6),
(20,'2025-04-15 22:36:00','Pagado','Al Detal',8888888,'se edita la ultima venta',3);
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-04-22 19:57:02
