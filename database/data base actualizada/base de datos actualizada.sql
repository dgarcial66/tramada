-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         11.4.4-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para tramada_dbc
CREATE DATABASE IF NOT EXISTS `tramada_dbc` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `tramada_dbc`;

-- Volcando estructura para tabla tramada_dbc.categoria_insumos
CREATE TABLE IF NOT EXISTS `categoria_insumos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nombre_categoria_insumo` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.categoria_insumos: ~3 rows (aproximadamente)
INSERT INTO `categoria_insumos` (`id`, `nombre_categoria_insumo`) VALUES
	(1, 'Materiales para tejidos'),
	(2, 'Herramientas de confección'),
	(3, 'Equipos de maquinaria textil');

-- Volcando estructura para tabla tramada_dbc.categoria_productos
CREATE TABLE IF NOT EXISTS `categoria_productos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.categoria_productos: ~3 rows (aproximadamente)
INSERT INTO `categoria_productos` (`id`, `nombre_categoria`) VALUES
	(1, 'Material'),
	(2, 'Herramienta'),
	(3, 'Equipo');

-- Volcando estructura para tabla tramada_dbc.clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(55) NOT NULL,
  `telefono_cliente` varchar(15) DEFAULT NULL,
  `direccion_cliente` varchar(100) DEFAULT NULL,
  `tipo_pago` int(11) DEFAULT NULL,
  `tipo_cliente` varchar(55) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.clientes: ~3 rows (aproximadamente)
INSERT INTO `clientes` (`id`, `nombre_cliente`, `telefono_cliente`, `direccion_cliente`, `tipo_pago`, `tipo_cliente`) VALUES
	(1, 'jacinto  arbelaes', '1234567890', 'Calle Falsa 123', 1, 'Regular'),
	(2, 'gabriela gonzales', '987654321', 'Avenida Siempreviva 456', 2, 'VIP'),
	(3, 'andres gutierrez', '123456789', 'Boulevard Central 789', 1, 'Nuevo');

-- Volcando estructura para tabla tramada_dbc.detalle_venta
CREATE TABLE IF NOT EXISTS `detalle_venta` (
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.detalle_venta: ~1 rows (aproximadamente)
INSERT INTO `detalle_venta` (`id`, `cantidad`, `precio_unitario`, `subtotal`, `ventas_id`, `productos_id`) VALUES
	(2, 100, 50, 100, 6, 4),
	(3, 50, 100, 50, 2, 4);

-- Volcando estructura para tabla tramada_dbc.historial_precios_insumos
CREATE TABLE IF NOT EXISTS `historial_precios_insumos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `precio_insumo` double(19,0) NOT NULL,
  `fecha_historial` timestamp NOT NULL DEFAULT current_timestamp(),
  `insumos_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhistorial_619176` (`insumos_id`),
  CONSTRAINT `FKhistorial_619176` FOREIGN KEY (`insumos_id`) REFERENCES `insumos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.historial_precios_insumos: ~5 rows (aproximadamente)
INSERT INTO `historial_precios_insumos` (`id`, `precio_insumo`, `fecha_historial`, `insumos_id`) VALUES
	(3, 200, '2024-11-20 02:10:39', 6),
	(9, 200, '2024-11-20 02:25:09', 6),
	(13, 900, '2024-11-20 22:54:35', 6),
	(14, 900, '2024-11-21 00:14:57', 14),
	(17, 10, '2024-12-08 00:05:13', 16);

-- Volcando estructura para tabla tramada_dbc.historial_precios_productos
CREATE TABLE IF NOT EXISTS `historial_precios_productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `precios_producto` double(19,2) NOT NULL,
  `fecha_historial` timestamp NOT NULL DEFAULT current_timestamp(),
  `producto_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhistorial_745263` (`producto_id`),
  CONSTRAINT `FKhistorial_745263` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.historial_precios_productos: ~10 rows (aproximadamente)
INSERT INTO `historial_precios_productos` (`id`, `precios_producto`, `fecha_historial`, `producto_id`) VALUES
	(1, 100.00, '2024-11-20 02:15:49', 4),
	(2, 150.00, '2024-11-20 02:15:49', 5),
	(3, 200.00, '2024-11-20 02:15:49', 6),
	(4, 100.00, '2024-11-20 02:18:12', 4),
	(5, 150.00, '2024-11-20 02:18:12', 5),
	(6, 200.00, '2024-11-20 02:18:12', 6),
	(7, 100.00, '2024-11-20 02:23:03', 4),
	(8, 150.00, '2024-11-20 02:23:03', 5),
	(9, 200.00, '2024-11-20 02:23:03', 6),
	(10, 500.00, '2024-12-03 01:54:22', 7),
	(11, 100.00, '2024-12-06 22:18:10', 8),
	(12, 50.00, '2024-12-07 23:53:48', 9),
	(13, 80000.00, '2024-12-09 17:14:53', 10);

-- Volcando estructura para tabla tramada_dbc.insumos
CREATE TABLE IF NOT EXISTS `insumos` (
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.insumos: ~6 rows (aproximadamente)
INSERT INTO `insumos` (`id`, `nombre_insumo`, `color_insumo`, `peso_insumo`, `cantidad_insumo`, `precio_insumo`, `id_proveedor`, `categoria_insumos_id`, `fecha_actualizacion`) VALUES
	(4, 'Tejido de lino', 'Gris', 50, -1125, 10, 4, 1, '2024-12-09 15:59:57'),
	(6, 'Hilo de fibra', 'rojo', 444, 200, 900, 5, 3, '2024-12-07 04:04:12'),
	(14, 'Hilo de fibra', 'rojo', 444, 250, 900, 5, 3, '2024-11-21 00:14:57'),
	(15, 'Tela de algodón', 'Gris', 25, 50, 5, 4, 1, '2024-12-09 15:58:38'),
	(16, 'hilossssaaa', 'aaa', 20, 50, 10, 4, 2, '2024-12-09 15:38:23');

-- Volcando estructura para tabla tramada_dbc.movimientos_inventario
CREATE TABLE IF NOT EXISTS `movimientos_inventario` (
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.movimientos_inventario: ~6 rows (aproximadamente)
INSERT INTO `movimientos_inventario` (`id`, `tipo_movimiento`, `cantidad`, `fecha_movimiento`, `motivo`, `insumos_id`, `producto_id`) VALUES
	(25, 'salida', 50, '2024-12-07 04:04:12', 'Orden en proceso', 6, 5),
	(27, 'entrada', 100, '2024-12-10 13:30:00', 'Compra de material', 6, NULL),
	(28, 'salida', 30, '2024-12-10 14:00:00', 'Uso para producción', 6, NULL),
	(29, 'ajuste', 20, '2024-12-10 15:00:00', 'Ajuste por inventario', 6, NULL),
	(30, 'perdida', 15, '2024-12-10 16:00:00', 'Material dañado', 6, NULL),
	(31, 'entrada', 200, '2024-12-10 17:00:00', 'Nueva compra de hilo', NULL, 5);

-- Volcando estructura para tabla tramada_dbc.orden_de_produccion
CREATE TABLE IF NOT EXISTS `orden_de_produccion` (
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.orden_de_produccion: ~6 rows (aproximadamente)
INSERT INTO `orden_de_produccion` (`id`, `fecha_orden`, `fecha_entrega`, `cantidad_productos_solicitada`, `cantidad_insumo_necesaria`, `usuario_id`, `anotaciones`, `estado_orden`, `insumos_id`, `producto_id`) VALUES
	(3, '2024-11-24 20:45:13', '2024-12-01 20:00:00', 100, 50, 1, 'Orden prioritaria', 'en proceso', 4, 5),
	(20, '2024-12-07 03:12:26', '2024-12-07 03:12:00', 100, 50, 1, 'mm', 'en proceso', 4, 5),
	(27, '2024-12-07 04:04:12', '2024-12-14 04:02:00', 100, 50, 2, 'wdasd', 'en proceso', 6, 5),
	(28, '2024-12-07 04:05:23', '2024-12-21 04:04:00', 20, 10, 3, 'lklkm', 'completado', 15, 8),
	(31, '2024-12-09 17:08:28', '2024-12-09 17:07:00', 100, 50, 1, 'buena', 'completado', 4, 5);

-- Volcando estructura para tabla tramada_dbc.orden_produccion_movimiento
CREATE TABLE IF NOT EXISTS `orden_produccion_movimiento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orden_produccion_id` int(11) NOT NULL,
  `movimiento_inventario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orden_produccion_movimiento_ibfk_1` (`orden_produccion_id`),
  KEY `orden_produccion_movimiento_ibfk_2` (`movimiento_inventario_id`),
  CONSTRAINT `orden_produccion_movimiento_ibfk_1` FOREIGN KEY (`orden_produccion_id`) REFERENCES `orden_de_produccion` (`id`),
  CONSTRAINT `orden_produccion_movimiento_ibfk_2` FOREIGN KEY (`movimiento_inventario_id`) REFERENCES `movimientos_inventario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.orden_produccion_movimiento: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tramada_dbc.pago
CREATE TABLE IF NOT EXISTS `pago` (
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

-- Volcando datos para la tabla tramada_dbc.pago: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tramada_dbc.perdida_insumos
CREATE TABLE IF NOT EXISTS `perdida_insumos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `cantidad_perdida` int(10) NOT NULL,
  `insumos_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKperdida_in183794` (`insumos_id`),
  CONSTRAINT `FKperdida_in183794` FOREIGN KEY (`insumos_id`) REFERENCES `insumos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.perdida_insumos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla tramada_dbc.perdida_productos
CREATE TABLE IF NOT EXISTS `perdida_productos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `cantidad_perdida` int(10) NOT NULL,
  `producto_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKperdida_pr759061` (`producto_id`),
  CONSTRAINT `FKperdida_pr759061` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.perdida_productos: ~2 rows (aproximadamente)
INSERT INTO `perdida_productos` (`id`, `cantidad_perdida`, `producto_id`) VALUES
	(3, 2, 4),
	(4, 5, 5);

-- Volcando estructura para tabla tramada_dbc.productos
CREATE TABLE IF NOT EXISTS `productos` (
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.productos: ~7 rows (aproximadamente)
INSERT INTO `productos` (`id`, `nombre_producto`, `genero_producto`, `tipo_producto`, `talla_producto`, `color_producto`, `peso_producto`, `cantidad_producto`, `precio_producto`, `categoria_productos_id`, `fecha_actualizacion`) VALUES
	(4, 'Producto A', 'Masculino', 'Material', 'M', 'Rojo', 5, 50, 100, 1, '2024-11-20 02:15:49'),
	(5, 'Producto B', 'Femenino', 'Herramienta', 'S', 'Negro', 3, 30, 150, 2, '2024-11-20 02:15:49'),
	(6, 'Producto C', 'Unisex', 'Equipo', 'L', 'Azul', 10, 20, 200, 3, '2024-11-20 02:15:49'),
	(7, 'ma ', 'm', 'm', 'm', 'm', 5, 50, 500, 1, '2024-12-03 01:52:00'),
	(8, 'ma', 'ma', 'ma', 'ma', 'ma', 52, 52, 100, 2, '2024-12-24 22:19:00'),
	(9, 'saco', 'n', 'n', 'n', 'n', 50, 50, 50, 1, '2024-12-07 23:53:00'),
	(10, 'chaqueta', 'femenino', 'cuero', 's', 'azul', 50, 50, 80000, 1, '2024-12-09 17:15:00');

-- Volcando estructura para tabla tramada_dbc.proveedor
CREATE TABLE IF NOT EXISTS `proveedor` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nombre_proveedor` varchar(55) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `correo` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_proveedor` (`nombre_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.proveedor: ~6 rows (aproximadamente)
INSERT INTO `proveedor` (`id`, `nombre_proveedor`, `telefono`, `direccion`, `correo`) VALUES
	(4, 'Proveedor A', '123-456-7890', 'Calle 123, Ciudad X', NULL),
	(5, 'Proveedor B', '+1 234 567 8901', 'Av. Principal 456, Ciudad Y', NULL),
	(6, 'Proveedor C', '(345) 678-9012', 'Calle Secundaria 789, Ciudad Z', NULL),
	(12, 'hilos del sur', 'ab32115455', 'calle 1234 # x esar', NULL),
	(15, 'adads', '3222117971', 'CALLE 3B N-5-35 ESTE', 'jesusgarcia922@hotmail.com');

-- Volcando estructura para tabla tramada_dbc.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.rol: ~3 rows (aproximadamente)
INSERT INTO `rol` (`id`, `nombre_rol`) VALUES
	(1, 'Administrador'),
	(2, 'Usuario'),
	(3, 'Gerente');

-- Volcando estructura para tabla tramada_dbc.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `email` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `FKusuario340715` (`id_rol`),
  CONSTRAINT `FKusuario340715` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.usuario: ~3 rows (aproximadamente)
INSERT INTO `usuario` (`id`, `email`, `password`, `id_rol`) VALUES
	(1, 'admin@ejemplo.com', '$2a$10$kgGkVB8aEyfd09mD.EHuWOaKv4gZ7FrDeOEGTwk7lbykTsjV6wz26', 1),
	(2, 'usuario@ejemplo.com', '$2a$10$kgGkVB8aEyfd09mD.EHuWOaKv4gZ7FrDeOEGTwk7lbykTsjV6wz26', 2),
	(3, 'gerente@ejemplo.com', '$2a$10$kgGkVB8aEyfd09mD.EHuWOaKv4gZ7FrDeOEGTwk7lbykTsjV6wz26', 3);

-- Volcando estructura para tabla tramada_dbc.venta
CREATE TABLE IF NOT EXISTS `venta` (
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla tramada_dbc.venta: ~4 rows (aproximadamente)
INSERT INTO `venta` (`id`, `fecha_venta`, `estado_pago`, `tipo_venta`, `total_venta`, `comentarios`, `clientes_id`) VALUES
	(2, '2024-12-06 00:17:30', 'Pagado', 'Online', 1500, 'Entrega rápida solicitada', 1),
	(3, '2024-12-06 00:17:30', 'Pendiente', 'Presencial', 800, NULL, 2),
	(4, '2024-12-06 00:17:30', 'Pagado', 'Online', 1200, 'Pedido recurrente', 3),
	(5, '2024-12-06 22:48:00', 'efectivo ', 'muco ', 502, 'pagado ', 1),
	(6, '2024-12-08 00:09:00', 'efectivo ', 'muco 2', 501, 'tarjeta', 2);

-- Volcando estructura para disparador tramada_dbc.ActualizarHistoricoPreciosInsumos
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER ActualizarHistoricoPreciosInsumos
BEFORE UPDATE ON insumos
FOR EACH ROW
BEGIN
    IF NEW.precio_insumo <> OLD.precio_insumo THEN
        INSERT INTO historial_precios_insumos (insumos_id, precio_insumo, fecha_historial)
        VALUES (NEW.id, NEW.precio_insumo, CURRENT_TIMESTAMP);
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador tramada_dbc.actualizar_historial_precio
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER actualizar_historial_precio
BEFORE UPDATE ON productos
FOR EACH ROW
BEGIN
    IF NEW.precio_producto <> OLD.precio_producto THEN
        INSERT INTO historial_precios_productos (producto_id, precio, fecha_historial)
        VALUES (OLD.id, OLD.precio_producto, CURRENT_TIMESTAMP);
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador tramada_dbc.actualizar_movimientos_inventario
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER actualizar_movimientos_inventario
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
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador tramada_dbc.insertar_historial_precio
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER insertar_historial_precio
AFTER INSERT ON productos
FOR EACH ROW
BEGIN
    INSERT INTO historial_precios_productos (precios_producto, producto_id)
    VALUES (NEW.precio_producto, NEW.id);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador tramada_dbc.insumos_historial_precio
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER insumos_historial_precio
AFTER INSERT ON insumos
FOR EACH ROW
BEGIN
    INSERT INTO historial_precios_insumos (insumos_id, precio_insumo)
    VALUES (NEW.id, NEW.precio_insumo);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
