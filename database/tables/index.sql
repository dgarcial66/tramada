-- Crear base de datos
CREATE DATABASE IF NOT EXISTS `textiles_db`;

USE `textiles_db`;

CREATE DATABASE IF NOT EXISTS `tramada_db`;

USE `tramada_db`;

-- Crear tabla de usuario
CREATE TABLE `usuario` (
    `id` BIGINT UNSIGNED NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(25) NOT NULL,
    `id_rol` INT(11) NOT NULL,
    PRIMARY KEY (id)
);

-- Crear tabla de rol
CREATE TABLE `rol` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nombre_rol` VARCHAR(50),
    PRIMARY KEY (id)
);

-- Crear tabla de proveedor
CREATE TABLE `proveedor` (
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `nombre_proveedor` VARCHAR(50),
    `telefono` VARCHAR(15),
    `tipo_insumo` VARCHAR(30),
    PRIMARY KEY (`id`)
);

-- Crear tabla de insumos
CREATE TABLE `insumos` (
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `nombre_insumo` VARCHAR(50),
    `color` VARCHAR(15),
    `peso` DOUBLE(10, 2),
    `fecha_entrada` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `actualizacion_fecha` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `cantidad_stock` INT(10),
    `cantidad_salir_unidad` INT(10),
    `total_cantidad_unidad` INT(10),
    `total_peso_insumo` DOUBLE(10, 2),
    `precio_insumo` DOUBLE(10, 2),
    `id_proveedor` INT(10) NOT NULL,
    `inventario_insumos_id` INT(10) NOT NULL,
    `categoria_insumos_id` INT(10) NOT NULL,
    PRIMARY KEY (`id`)
);




-- Crear tabla de categoria_insumos
CREATE TABLE `categoria_insumos` (
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `nombre_categoria_insumo` VARCHAR(60),
    PRIMARY KEY (`id`)
);

-- Crear tabla de categoria_productos
CREATE TABLE `categoria_productos` (
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `nombre_categoria_producto` VARCHAR(50),
    `producto_id` INT(10) NOT NULL,
    PRIMARY KEY (`id`)
);

-- Crear tabla de productos
CREATE TABLE `productos` (
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `nombre_producto` VARCHAR(50),
    `peso_producto` DOUBLE(10, 2),
    `precio_producto` DOUBLE(10, 2),
    `stock_producto` INT(10),
    `total_unidades_producto` INT(10),
    `fecha_entrada` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `actualizacion_fecha` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `inventario_producto_id` INT(10) NOT NULL,
    PRIMARY KEY (`id`)
);
---
-- Crear tabla de perdida_productos
CREATE TABLE `perdida_productos` (
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `nombre_de_producto` VARCHAR(50),
    `cantidad_unidades_perdida` INT(10),
    `producto_id` INT(10) NOT NULL,
    PRIMARY KEY(`id`)
);

-- Crear tabla de perdida_insumos
CREATE TABLE `perdida_insumos` (
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `cantidad_unidad_perdida` INT(10),
    `insumos_id` INT(10) NOT NULL,
    PRIMARY KEY(`id`)
);

-- Crear tabla de historial_precios_productos
CREATE TABLE historial_precios_productos (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `precio`  DOUBLE(10, 2),
    `fecha_historial` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `producto_id` INT(10) NOT NULL,
    PRIMARY KEY(`id`)
);

-- Crear tabla de historial_precios_insumos
CREATE TABLE `historial_precios_insumos` (
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `precio_insumo` DOUBLE(10, 2),
    `fecha_historial` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `insumos_id` INT(10) NOT NULL,
    PRIMARY KEY(`id`)
);

-- Crear tabla de insumos_producto
CREATE TABLE `insumos_producto` (
    `insumos_id` INT(10) NOT NULL,
    `producto_id` INT(10) NOT NULL,
    `metros`  DOUBLE(10, 2),
    `peso`  DOUBLE(10, 2),
    `cantidad_unidad_insumo` INT(11),
    PRIMARY KEY (`insumos_id`, `producto_id`)
);
