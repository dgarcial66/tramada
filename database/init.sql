-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS tramada_db /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE tramada_db;

-- Tablas básicas sin dependencias
CREATE TABLE IF NOT EXISTS rol (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre_rol varchar(15) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS categoria_insumos (
  id int(10) NOT NULL AUTO_INCREMENT,
  nombre_categoria_insumo varchar(30) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS categoria_productos (
  id int(10) NOT NULL AUTO_INCREMENT,
  nombre_categoria varchar(30) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS proveedor (
  id int(10) NOT NULL AUTO_INCREMENT,
  nombre_proveedor varchar(55) NOT NULL,
  telefono varchar(15) DEFAULT NULL,
  direccion varchar(100) DEFAULT NULL,
  correo varchar(70) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY nombre_proveedor (nombre_proveedor)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS clientes (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre_cliente varchar(55) NOT NULL,
  telefono_cliente varchar(15) DEFAULT NULL,
  direccion_cliente varchar(100) DEFAULT NULL,
  tipo_pago varchar(50) DEFAULT NULL,
  tipo_cliente varchar(55) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tablas que dependen de las básicas
CREATE TABLE IF NOT EXISTS usuario (
  id int(10) NOT NULL AUTO_INCREMENT,
  email varchar(60) NOT NULL,
  password varchar(255) NOT NULL,
  id_rol int(11) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email),
  KEY FKusuario340715 (id_rol),
  CONSTRAINT FKusuario340715 FOREIGN KEY (id_rol) REFERENCES rol (id)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS insumos (
  id int(10) NOT NULL AUTO_INCREMENT,
  nombre_insumo varchar(55) NOT NULL,
  color_insumo varchar(25) NOT NULL,
  peso_insumo double(19,0) NOT NULL,
  cantidad_insumo int(10) NOT NULL,
  precio_insumo int(10) NOT NULL,
  id_proveedor int(10) NOT NULL,
  categoria_insumos_id int(10) NOT NULL,
  fecha_actualizacion timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (id),
  KEY FKinsumos264924 (id_proveedor),
  KEY FKinsumos664014 (categoria_insumos_id),
  CONSTRAINT FKinsumos264924 FOREIGN KEY (id_proveedor) REFERENCES proveedor (id),
  CONSTRAINT FKinsumos664014 FOREIGN KEY (categoria_insumos_id) REFERENCES categoria_insumos (id)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS productos (
  id int(10) NOT NULL AUTO_INCREMENT,
  nombre_producto varchar(50) NOT NULL,
  genero_producto varchar(25) NOT NULL,
  tipo_producto varchar(55) NOT NULL,
  talla_producto varchar(10) NOT NULL,
  color_producto varchar(25) NOT NULL,
  peso_producto int(10) NOT NULL,
  cantidad_producto int(11) NOT NULL,
  precio_producto int(10) NOT NULL,
  categoria_productos_id int(10) NOT NULL,
  fecha_actualizacion timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (id),
  KEY FKproductos779460 (categoria_productos_id),
  CONSTRAINT FKproductos779460 FOREIGN KEY (categoria_productos_id) REFERENCES categoria_productos (id)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tablas con más dependencias
CREATE TABLE IF NOT EXISTS venta (
  id int(11) NOT NULL AUTO_INCREMENT,
  fecha_venta timestamp NOT NULL DEFAULT current_timestamp(),
  estado_pago varchar(55) NOT NULL,
  tipo_venta varchar(55) NOT NULL,
  total_venta int(20) NOT NULL,
  comentarios varchar(100) DEFAULT NULL,
  clientes_id int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY FKventa321749 (clientes_id),
  CONSTRAINT FKventa321749 FOREIGN KEY (clientes_id) REFERENCES clientes (id)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS historial_precios_insumos (
  id int(10) NOT NULL AUTO_INCREMENT,
  precio_insumo double(19,0) NOT NULL,
  fecha_historial timestamp NOT NULL DEFAULT current_timestamp(),
  insumos_id int(10) NOT NULL,
  PRIMARY KEY (id),
  KEY FKhistorial_619176 (insumos_id),
  CONSTRAINT FKhistorial_619176 FOREIGN KEY (insumos_id) REFERENCES insumos (id)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS historial_precios_productos (
  id int(11) NOT NULL AUTO_INCREMENT,
  precios_producto double(19,2) NOT NULL,
  fecha_historial timestamp NOT NULL DEFAULT current_timestamp(),
  producto_id int(10) NOT NULL,
  PRIMARY KEY (id),
  KEY FKhistorial_745263 (producto_id),
  CONSTRAINT FKhistorial_745263 FOREIGN KEY (producto_id) REFERENCES productos (id)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS movimientos_inventario (
  id int(11) NOT NULL AUTO_INCREMENT,
  tipo_movimiento enum('entrada','salida','ajuste','perdida') NOT NULL,
  cantidad int(11) NOT NULL,
  fecha_movimiento timestamp NOT NULL DEFAULT current_timestamp(),
  motivo varchar(100) NOT NULL,
  insumos_id int(10) DEFAULT NULL,
  producto_id int(10) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY FKmovimiento315619 (insumos_id),
  KEY FKmovimiento469901 (producto_id),
  CONSTRAINT FKmovimiento315619 FOREIGN KEY (insumos_id) REFERENCES insumos (id),
  CONSTRAINT FKmovimiento469901 FOREIGN KEY (producto_id) REFERENCES productos (id)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS orden_de_produccion (
  id int(11) NOT NULL AUTO_INCREMENT,
  fecha_orden timestamp NOT NULL DEFAULT current_timestamp(),
  fecha_entrega timestamp NOT NULL,
  cantidad_productos_solicitada int(50) DEFAULT NULL,
  cantidad_insumo_necesaria int(50) NOT NULL,
  usuario_id int(10) NOT NULL,
  anotaciones varchar(255) DEFAULT NULL,
  estado_orden enum('completado','en proceso','en revision') NOT NULL,
  insumos_id int(11) NOT NULL,
  producto_id int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY fk_insumos_orden (insumos_id),
  KEY fk_producto_orden (producto_id),
  KEY fk_usuario_orden (usuario_id),
  CONSTRAINT FKorden_de_p803341 FOREIGN KEY (usuario_id) REFERENCES usuario (id),
  CONSTRAINT fk_insumos_orden FOREIGN KEY (insumos_id) REFERENCES insumos (id),
  CONSTRAINT fk_producto_orden FOREIGN KEY (producto_id) REFERENCES productos (id),
  CONSTRAINT fk_usuario_orden FOREIGN KEY (usuario_id) REFERENCES usuario (id)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS detalle_venta (
  id int(11) NOT NULL AUTO_INCREMENT,
  cantidad int(11) DEFAULT NULL,
  precio_unitario int(11) DEFAULT NULL,
  subtotal int(11) DEFAULT NULL,
  ventas_id int(11) NOT NULL,
  productos_id int(10) NOT NULL,
  PRIMARY KEY (id),
  KEY FKdetalle_ve138844 (ventas_id),
  KEY FKdetalle_ve318385 (productos_id),
  CONSTRAINT FKdetalle_ve138844 FOREIGN KEY (ventas_id) REFERENCES venta (id),
  CONSTRAINT FKdetalle_ve318385 FOREIGN KEY (productos_id) REFERENCES productos (id)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS perdida_insumos (
  id int(10) NOT NULL AUTO_INCREMENT,
  cantidad_perdida int(10) NOT NULL,
  insumos_id int(10) NOT NULL,
  PRIMARY KEY (id),
  KEY FKperdida_in183794 (insumos_id),
  CONSTRAINT FKperdida_in183794 FOREIGN KEY (insumos_id) REFERENCES insumos (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS perdida_productos (
  id int(10) NOT NULL AUTO_INCREMENT,
  cantidad_perdida int(10) NOT NULL,
  producto_id int(10) NOT NULL,
  PRIMARY KEY (id),
  KEY FKperdida_pr759061 (producto_id),
  CONSTRAINT FKperdida_pr759061 FOREIGN KEY (producto_id) REFERENCES productos (id)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS pago (
  id int(11) NOT NULL AUTO_INCREMENT,
  fecha_pago timestamp NULL DEFAULT NULL,
  monto int(11) NOT NULL,
  metodo_pago varchar(55) DEFAULT NULL,
  comentarios varchar(200) DEFAULT NULL,
  venta_id int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY FKpago371729 (venta_id),
  CONSTRAINT FKpago371729 FOREIGN KEY (venta_id) REFERENCES venta (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS orden_produccion_movimiento (
  id int(11) NOT NULL AUTO_INCREMENT,
  orden_produccion_id int(11) NOT NULL,
  movimiento_inventario_id int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY orden_produccion_movimiento_ibfk_1 (orden_produccion_id),
  KEY orden_produccion_movimiento_ibfk_2 (movimiento_inventario_id),
  CONSTRAINT orden_produccion_movimiento_ibfk_1 FOREIGN KEY (orden_produccion_id) REFERENCES orden_de_produccion (id),
  CONSTRAINT orden_produccion_movimiento_ibfk_2 FOREIGN KEY (movimiento_inventario_id) REFERENCES movimientos_inventario (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserciones de datos
INSERT INTO rol (id, nombre_rol) VALUES
(1, 'Administrador'),
(2, 'Usuario'),
(3, 'Gerente');

INSERT INTO categoria_insumos (id, nombre_categoria_insumo) VALUES
(1, 'Materiales para tejidos'),
(2, 'Herramientas de confección'),
(3, 'Equipos de maquinaria textil');

INSERT INTO categoria_productos (id, nombre_categoria) VALUES
(1, ' Ropa de verano'),
(2, 'Ropa de invierno'),
(3, ' Accesorios');

INSERT INTO proveedor (id, nombre_proveedor, telefono, direccion, correo) VALUES
(4, 'Proveedor A', '3225000225', 'Calle 123, Ciudad X', ''),
(5, 'Proveedor B', '+1 234 567 8901', 'Av. Principal 456, Ciudad Y', NULL),
(17, 'hilos azules', '32221145', 'calle identic 123', 'hilosAzules@gmail.xom'),
(18, 'hilos del norte', '32211145563', 'calle identifca 123', 'hilosdelnorte@gmail.com'),
(19, 'soy nuevo', '1232345', 'calle falsa 1223', 'soynuevo@gmail.com'),
(20, 'nuevo proveedor', '3221235232', 'probando calle', ''),
(21, 'hola otravez', '51321312', 'calle 3-65', 'hola@gmail.com'),
(22, 'probando prov', '133326', 'calle 1231', 'prov@gmail.com'),
(23, 'ultima vez ', '23157879213', 'calle actual 789', 'ultimavezgmail.com');

INSERT INTO clientes (id, nombre_cliente, telefono_cliente, direccion_cliente, tipo_pago, tipo_cliente) VALUES
(1, 'jacinto  arbelaes', '1234567890', 'Calle Falsa 123', 'Efectivo', 'Regular'),
(2, 'gabriela gonzales', '987654321', 'Avenida Siempreviva 456', 'Efectivo', 'VIP'),
(3, 'andres gutierrez', '123456789', 'Boulevard Central 789', 'Efectivo', 'Mayorista'),
(5, 'Luis gutierrez ', '32221179141', 'CALLE 3B N-5-35 EST3', 'Efectivo', 'Minorista'),
(6, 'cosculluela cañañas', '32020135', 'calle 1213 #1-621', 'Efectivo', 'Mayorista'),
(7, 'leny kraxct', '3214562285', 'calle prueva 123', 'Efectivo', 'Regular'),
(8, 'nepomuseno matallana', '3212250232', 'los jusgados 123', 'Efectivo', 'Regular'),
(9, 'Mohame Abyal ', '2365124523', 'israel 123', 'Transferencia Bancaria', 'Regular'),
(10, 'yannkie lgo22', '213654789', 'calle de prueva 456', 'Transferencia Bancaria', 'VIP');

INSERT INTO usuario (id, email, password, id_rol) VALUES
(1, 'admin@ejemplo.com', '$2a$10$kgGkVB8aEyfd09mD.EHuWOaKv4gZ7FrDeOEGTwk7lbykTsjV6wz26', 1),
(2, 'usuario@ejemplo.com', '$2a$10$kgGkVB8aEyfd09mD.EHuWOaKv4gZ7FrDeOEGTwk7lbykTsjV6wz26', 2),
(3, 'gerente@ejemplo.com', '$2a$10$kgGkVB8aEyfd09mD.EHuWOaKv4gZ7FrDeOEGTwk7lbykTsjV6wz26', 3),
(4, 'facil@gmail.com', '$2a$10$faq44YocCqfR.MVf/dNr.OuD0PgPupDKEro1dpMk/hcIIOXJE3dme', 2);

INSERT INTO insumos (id, nombre_insumo, color_insumo, peso_insumo, cantidad_insumo, precio_insumo, id_proveedor, categoria_insumos_id, fecha_actualizacion) VALUES
(4, 'Tejido de lino', 'azul', 50, 88849, 10000, 4, 1, '2025-04-24 08:36:59'),
(6, 'Hilo de fibra', 'rojo', 294, 93, 89000, 18, 1, '2025-04-24 08:37:15'),
(14, 'Hilo de fibra', 'rojo', 444, 150, 900, 5, 3, '2025-04-13 01:15:50'),
(15, 'Tela de algodón', 'Gris', 25, 50, 5, 4, 1, '2024-12-09 15:58:38'),
(16, 'hilossssaaa', 'aaa', 20, 50, 10, 4, 2, '2024-12-09 15:38:23'),
(17, 'algodon', 'azul', 60, 20, 100000, 19, 1, '2025-04-14 17:36:52'),
(18, 'nuevo mate', 'azul', 500, 100, 10000, 22, 1, '2025-04-17 21:53:08'),
(19, 'nuevo mate', 'azul', 500, 100, 10000, 22, 1, '2025-04-17 21:53:10'),
(20, 'nuevo mate', 'azul', 500, 100, 10000, 22, 1, '2025-04-17 21:53:14'),
(21, 'nuevo mate', 'azul', 500, 100, 10000, 22, 1, '2025-04-17 21:53:18'),
(22, 'otro material', 'blanco', 50, 100, 100, 21, 1, '2025-04-17 21:53:54'),
(23, 'un materila mas', 'rojo ', 50, 100, 100000, 18, 2, '2025-04-17 21:55:56'),
(24, 'actualiza mate', 'azul ', 60, 100, 100, 20, 1, '2025-04-17 22:05:13'),
(25, 'parbacdo tbla', 'negro', 50, 100, 100000, 20, 3, '2025-04-17 22:09:52'),
(26, 'actualizando mate', 'blanco', 100, 100, 50000, 19, 2, '2025-04-17 22:11:10'),
(27, 'otro material ', 'ngo', 1000, 100, 1000000, 19, 2, '2025-04-17 22:13:36'),
(28, 'pob otro material', 'blanco', 50000, 100, 100000, 20, 1, '2025-04-17 22:25:45'),
(29, 'probando material ', 'nnn', 5000, 140, 100000, 4, 1, '2025-04-17 22:26:31'),
(30, 'probando add', 'azula', 50, 100, 69000, 21, 1, '2025-04-18 01:57:34'),
(31, 'probando add-2', 'mmm', 52, 100, 100000, 18, 1, '2025-04-18 01:58:43'),
(32, 'probano otro materia 3', 'nn', 92, 20, 69200, 22, 1, '2025-04-18 02:05:16'),
(33, 'agregando', 'negro', 5000, 100, 80000, 4, 1, '2025-04-18 02:08:00'),
(34, 'materia-69', 'negro', 5000, 100, 80000, 18, 2, '2025-04-18 02:19:35'),
(35, 'material-80', 'negro', 59, 100, 100, 4, 1, '2025-04-18 02:20:26'),
(36, 'ultimaprueva', 'asul', 50, 100, 89000, 17, 2, '2025-04-18 02:26:19'),
(37, 'probandodenuevo', 'balco', 50, 100, 99000, 21, 1, '2025-04-18 02:27:27'),
(38, 'otra_vez', 'asas', 5000, 1000, 10000, 5, 1, '2025-04-18 02:28:01'),
(39, 'probando otravez', 'azul', 50000, 100, 169000, 20, 2, '2025-04-18 02:35:49'),
(40, 'estaves ', 'negro', 200, 100, 62000, 17, 2, '2025-04-18 02:39:17'),
(41, 'esta vez si dio', 'blanco', 500, 50, 169000, 17, 2, '2025-04-18 23:12:48'),
(42, 'cnuevacateg', '100', 10, 5000, 59000, 17, 1, '2025-04-18 02:51:30'),
(43, 'estavessera', 'blanco', 550, 100, 769000, 5, 1, '2025-04-18 02:55:32'),
(44, 'estaeslaverda', 'blanco', 50, 100, 69000, 22, 2, '2025-04-18 02:59:43'),
(45, 'ultimo insumo', 'azul', 50000, 122, 120000, 23, 1, '2025-04-23 02:07:11'),
(46, 'otro material', 'azul', 50000, 9500, 5000, 23, 1, '2025-04-24 08:39:01');

INSERT INTO productos (id, nombre_producto, genero_producto, tipo_producto, talla_producto, color_producto, peso_producto, cantidad_producto, precio_producto, categoria_productos_id, fecha_actualizacion) VALUES
(4, 'Producto A', 'Masculino', 'Material', 'M', 'Rojo', 5, 100, 300, 2, '2025-04-23 08:42:00'),
(5, 'Producto B', 'Femenino', 'Herramienta', 'S', 'Negro', 3, -45, 150, 2, '2025-04-18 22:31:55'),
(6, 'Producto C', 'Unisex', 'Equipo', 'L', 'Azul', 10, -30, 200, 3, '2025-04-18 22:30:15'),
(7, 'ma ', 'm', 'm', 'm', 'm', 5, 50, 500, 1, '2024-12-03 01:52:00'),
(8, 'ma', 'ma', 'ma', 'ma', 'ma', 52, 52, 100, 2, '2024-12-24 22:19:00'),
(9, 'saco', 'n', 'n', 'n', 'n', 50, 50, 50, 1, '2024-12-07 23:53:00'),
(10, 'saco', 'm', 'ropa', 'm', 'axul', 50, 1, 1000, 1, '2025-04-06 02:35:52'),
(11, 'saco', 'm', 'ropa', 'm', 'axul', 50, -49, 1000, 1, '2025-04-18 22:32:28'),
(12, 'Nuevo producto', 'm', 'nevoproduct', 'm', 'blanco', 50, 69, 50000, 1, '2025-04-06 02:37:50'),
(13, 'otro producto', 'm', 'otro prodcut', 'm', 'amarillo', 50, 66, 66666, 1, '2025-04-06 02:46:44'),
(14, 'nievop', 'm', 'niopodd', 'm', 'azul', 50, 10, 50000, 1, '2025-04-06 03:22:14'),
(15, 'saco', 'm', 'niopodd', 'm', 'azul', 50, 10, 50000, 1, '2025-04-06 20:03:00'),
(16, 'soynuevo', 'm', 'nuevo ', 'm', 'rojo', 50, 20, 500, 1, '2025-04-06 19:35:18'),
(17, 'hola ', 'm', 'master', 'm', 'azulk', 50, 13, 50000, 1, '2025-04-06 19:40:33'),
(20, 'soynuevoiproducto', 'm', 'nuevo', 'm', 'azul', 50, 10, 5000, 1, '2025-04-07 00:23:59'),
(21, 'probando editar', 'Masculino', 'Camisa', 'M', 'asul', 50, 500, 50000, 1, '2025-04-16 02:06:00'),
(22, 'editando camisa', 'Masculino', 'Ropa interior', 'XXL', 'negro ', 200, 325, 99999, 1, '2025-04-15 02:06:02'),
(23, 'editando  este producto ', 'Femenino', 'Ropa deportiva', 'XXL', 'blanco ', 100, 125, 900000, 2, '2025-04-23 02:00:39'),
(24, 'un producto mas', 'Masculino', 'Camiseta', 'XS', 'negro', 100, 25, 200000, 1, '2025-04-24 02:44:00'),
(25, 'producto android', 'femenino ', 'ropa deportiva', 'm', 'blanco', 10, 100, 50000, 1, '2025-04-24 00:29:44');

INSERT INTO venta (id, fecha_venta, estado_pago, tipo_venta, total_venta, comentarios, clientes_id) VALUES
(2, '2024-12-06 00:17:30', 'Pagado', 'Online', 1500, 'Entrega rápida solicitada', 1),
(3, '2024-12-06 00:17:30', 'Pendiente', 'Presencial', 800, NULL, 2),
(4, '2024-12-06 00:17:30', 'Pagado', 'Online', 1200, 'Pedido recurrente', 3),
(5, '2024-12-06 22:48:00', 'efectivo ', 'muco ', 502, 'pagado ', 1),
(6, '2024-12-08 00:09:00', 'efectivo ', 'muco 2', 501, 'tarjeta', 2),
(7, '2025-04-07 01:19:20', 'pago', 'efectivo', 5020000, 'Nueva venta', 1),
(8, '2025-04-07 02:00:13', 'Nuevo ', 'nuevo', 100000, 'Nueva venta', 1),
(9, '2025-04-07 02:00:17', 'Nuevo ', 'nuevo', 100000, 'Nueva venta', 1),
(10, '2025-04-07 02:00:20', 'Nuevo ', 'nuevo', 100000, 'Nueva venta', 1),
(11, '2025-04-07 02:00:25', 'Nuevo ', 'nuevo', 100000, 'Nueva venta', 1),
(12, '2025-04-07 02:01:02', 'Nuevo ', 'nuevo', 100000, 'Nueva venta', 1),
(13, '2025-04-07 02:06:39', 'venta fecha', 'ventafecha', 100000, 'fechaventa', 1),
(14, '2025-04-07 02:06:58', 'venta fecha', 'ventafecha', 100000, 'fechaventa', 1),
(15, '2025-04-07 02:07:33', 'venta fecha', 'ventafecha', 100000, 'fechaventa', 1),
(16, '2025-04-07 02:15:36', 'Nueva venta', 'no hay nuila ', 100000, 'no hay nulo', 1),
(17, '2025-04-07 05:25:49', 'Nueva venta', 'efectivo', 50000, 'provando venta', 1),
(18, '2025-04-10 04:19:00', 'Pendiente', 'Al Por Mayor', 69000, 'editando venta ', 8),
(19, '2025-04-18 21:41:00', 'Pendiente', 'Al Por Mayor', 69000, 'otra venta ', 6),
(20, '2025-04-15 22:36:00', 'Pagado', 'Al Detal', 8888888, 'se edita la ultima venta', 3),
(21, '2025-04-23 02:07:00', 'Pagado', 'Al Por Mayor', 120000, 'ultima venta', 10),
(22, '2025-04-24 05:27:36', 'pagada', 'efectivo', 100000, 'venta android', 1);

INSERT INTO historial_precios_insumos (id, precio_insumo, fecha_historial, insumos_id) VALUES
(3, 200, '2024-11-20 02:10:39', 6),
(9, 200, '2024-11-20 02:25:09', 6),
(13, 900, '2024-11-20 22:54:35', 6),
(14, 900, '2024-11-21 00:14:57', 14),
(17, 10, '2024-12-08 00:05:13', 16),
(19, 0, '2025-04-14 16:24:50', 4),
(20, 10, '2025-04-14 16:24:55', 4),
(21, 5, '2025-04-14 16:25:14', 4),
(22, 0, '2025-04-14 16:29:03', 4),
(23, 100000, '2025-04-14 17:36:52', 17),
(24, 10000, '2025-04-17 21:53:08', 18),
(25, 10000, '2025-04-17 21:53:10', 19),
(26, 10000, '2025-04-17 21:53:14', 20),
(27, 10000, '2025-04-17 21:53:18', 21),
(28, 100, '2025-04-17 21:53:54', 22),
(29, 100000, '2025-04-17 21:55:56', 23),
(30, 100, '2025-04-17 22:05:13', 24),
(31, 100000, '2025-04-17 22:09:52', 25),
(32, 50000, '2025-04-17 22:11:10', 26),
(33, 1000000, '2025-04-17 22:13:36', 27),
(34, 100000, '2025-04-17 22:25:45', 28),
(35, 100000, '2025-04-17 22:26:31', 29),
(36, 69000, '2025-04-18 01:57:34', 30),
(37, 100000, '2025-04-18 01:58:43', 31),
(38, 69200, '2025-04-18 02:05:16', 32),
(39, 80000, '2025-04-18 02:08:00', 33),
(40, 80000, '2025-04-18 02:19:35', 34),
(41, 100, '2025-04-18 02:20:26', 35),
(42, 89000, '2025-04-18 02:26:19', 36),
(43, 99000, '2025-04-18 02:27:27', 37),
(44, 10000, '2025-04-18 02:28:01', 38),
(45, 169000, '2025-04-18 02:35:49', 39),
(46, 62000, '2025-04-18 02:39:17', 40),
(47, 169000, '2025-04-18 02:44:16', 41),
(48, 59000, '2025-04-18 02:51:30', 42),
(49, 769000, '2025-04-18 02:55:32', 43),
(50, 69000, '2025-04-18 02:59:43', 44),
(51, 120000, '2025-04-23 02:07:11', 45),
(52, 10000, '2025-04-24 01:54:19', 46),
(53, 10000, '2025-04-24 02:17:46', 4),
(54, 69000, '2025-04-24 02:27:12', 4),
(55, 89000, '2025-04-24 02:31:38', 4),
(56, 99000, '2025-04-24 02:51:55', 4),
(57, 79999, '2025-04-24 03:23:42', 4),
(58, 90900, '2025-04-24 03:45:04', 4),
(59, 99999, '2025-04-24 03:46:07', 4),
(60, -900000, '2025-04-24 05:13:08', 4),
(61, -8100, '2025-04-24 05:13:41', 6),
(62, -950000, '2025-04-24 05:23:29', 4),
(63, 5000, '2025-04-24 05:27:17', 46),
(64, -950120, '2025-04-24 06:04:28', 4),
(65, -8101, '2025-04-24 06:28:28', 6),
(66, 10000, '2025-04-24 08:36:59', 4),
(67, 89000, '2025-04-24 08:37:15', 6);

INSERT INTO historial_precios_productos (id, precios_producto, fecha_historial, producto_id) VALUES
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
(13, 1000.00, '2025-04-06 02:35:52', 10),
(14, 1000.00, '2025-04-06 02:36:13', 11),
(15, 50000.00, '2025-04-06 02:37:50', 12),
(16, 66666.00, '2025-04-06 02:46:44', 13),
(17, 50000.00, '2025-04-06 03:22:14', 14),
(18, 50000.00, '2025-04-06 03:23:13', 15),
(19, 500.00, '2025-04-06 19:35:18', 16),
(20, 50000.00, '2025-04-06 19:40:33', 17),
(21, 5000.00, '2025-04-07 00:23:59', 20),
(22, 50000.00, '2025-04-07 00:27:57', 21),
(23, 10000.00, '2025-04-14 19:07:02', 22),
(24, 10000.00, '2025-04-14 22:44:15', 22),
(25, 20000.00, '2025-04-14 22:50:00', 22),
(26, 50000.00, '2025-04-15 00:55:19', 22),
(27, 100.00, '2025-04-15 01:06:00', 4),
(28, 200.00, '2025-04-15 01:08:10', 4),
(29, 77777.00, '2025-04-15 01:11:17', 22),
(30, 888888.00, '2025-04-15 01:15:07', 22),
(31, 15000.00, '2025-04-15 23:53:43', 23),
(32, 15000.00, '2025-04-15 23:54:46', 23),
(33, 200000.00, '2025-04-23 01:59:16', 23),
(34, 100000.00, '2025-04-23 02:02:34', 24),
(35, 100000.00, '2025-04-23 02:44:52', 24),
(36, 50000.00, '2025-04-24 00:29:44', 25);

INSERT INTO movimientos_inventario (id, tipo_movimiento, cantidad, fecha_movimiento, motivo, insumos_id, producto_id) VALUES
(25, 'salida', 50, '2024-12-07 04:04:12', 'Orden en proceso', 6, 5),
(27, 'salida', 100, '2025-04-13 00:14:10', 'Orden en proceso', 4, 4),
(28, 'salida', 100, '2025-04-13 01:15:50', 'Orden en proceso', 14, 15),
(29, 'salida', 100, '2025-04-13 01:57:04', 'Orden en proceso', 4, 4),
(30, 'salida', 50, '2025-04-13 20:26:29', 'Orden en proceso', 4, 5),
(31, 'salida', 15, '2025-04-13 22:02:59', 'Orden en proceso', 4, 5),
(32, 'salida', 25, '2025-04-15 01:55:54', 'Venta registrada', NULL, 4),
(33, 'salida', 25, '2025-04-15 01:56:36', 'Venta registrada', NULL, 5),
(34, 'salida', 50, '2025-04-15 02:02:03', 'Venta registrada', NULL, 21),
(35, 'salida', 50, '2025-04-15 02:02:03', 'Venta ID 2', NULL, 21),
(36, 'salida', 50, '2025-04-15 02:03:04', 'Venta registrada', NULL, 22),
(37, 'salida', 50, '2025-04-15 02:03:04', 'Venta ID 9', NULL, 22),
(38, 'salida', 25, '2025-04-15 02:03:55', 'Venta registrada', NULL, 22),
(39, 'salida', 25, '2025-04-15 02:03:55', 'Venta ID 4', NULL, 22),
(40, 'salida', 25, '2025-04-15 02:06:02', 'Venta registrada', NULL, 22),
(41, 'salida', 50, '2025-04-18 22:30:15', 'Venta registrada', NULL, 6),
(42, 'salida', 50, '2025-04-18 22:31:55', 'Venta registrada', NULL, 5),
(43, 'salida', 50, '2025-04-18 22:32:28', 'Venta registrada', NULL, 11),
(44, 'salida', 50, '2025-04-18 22:40:04', 'Venta registrada', NULL, 23),
(45, 'salida', 50, '2025-04-18 23:12:48', 'Orden en proceso', 41, 20),
(46, 'salida', 25, '2025-04-23 02:00:39', 'Venta registrada', NULL, 23),
(47, 'salida', 25, '2025-04-23 02:08:56', 'Venta registrada', NULL, 24),
(48, 'salida', 25, '2025-04-24 00:27:43', 'Venta registrada', NULL, 4);

INSERT INTO orden_de_produccion (id, fecha_orden, fecha_entrega, cantidad_productos_solicitada, cantidad_insumo_necesaria, usuario_id, anotaciones, estado_orden, insumos_id, producto_id) VALUES
(3, '2024-11-24 20:45:13', '2024-12-01 20:00:00', 100, 50, 1, 'Orden prioritaria', 'en proceso', 4, 5),
(20, '2024-12-07 03:12:26', '2024-12-07 03:12:00', 100, 50, 1, 'mm', 'en proceso', 4, 5),
(27, '2024-12-07 04:04:12', '2024-12-14 04:02:00', 100, 50, 2, 'wdasd', 'en proceso', 6, 5),
(28, '2024-12-07 04:05:23', '2024-12-21 04:04:00', 20, 10, 3, 'lklkm', 'completado', 15, 8),
(32, '2025-04-13 01:15:50', '2025-04-11 01:57:00', 50, 100, 4, 'probando ids ', 'en proceso', 6, 4),
(33, '2025-04-13 01:57:04', '2025-04-18 01:56:00', 100, 100, 1, 'probando los ids en tablas ', 'en proceso', 4, 4),
(34, '2025-04-13 02:36:12', '2025-04-15 20:26:00', 50, 10, 3, 'probando fecha editar', 'en proceso', 6, 16),
(35, '2025-04-13 20:26:29', '2025-04-14 20:25:00', 100, 50, 1, 'probando fechas ', 'en proceso', 4, 5),
(36, '2025-04-13 22:02:59', '2025-04-15 22:02:00', 30, 15, 1, 'probando nevo ', 'en proceso', 4, 5),
(37, '2025-04-18 23:12:48', '2025-04-18 23:16:00', 100, 50, 3, 'orden en movimiento', 'completado', 26, 13),
(38, '2025-04-18 23:14:05', '2025-04-23 02:03:00', 50, 25, 1, 'nueva orden xxx', 'en proceso', 15, 24);

INSERT INTO detalle_venta (id, cantidad, precio_unitario, subtotal, ventas_id, productos_id) VALUES
(2, 100, 50, 100, 6, 4),
(3, 50, 100, 50, 2, 4),
(4, 100, 5000, 100000, 16, 4),
(5, 50, 5000, 100000, 17, 4),
(6, 25, 5000, 100000, 2, 4),
(7, 25, 5000, 100000, 3, 5),
(8, 50, 5000, 5000, 2, 21),
(9, 50, 5000, 5000, 9, 22),
(10, 25, 5000, 5000, 4, 22),
(11, 25, 5000, 5000, 5, 22),
(12, 50, 1000, 50000, 3, 6),
(13, 50, 1000, 690000, 19, 5),
(14, 50, 1000, 9999999, 18, 11),
(15, 50, 50000, 25000, 20, 23),
(16, 25, 100, 50000, 2, 23),
(17, 25, 100000, 60000, 21, 24),
(18, 25, 50000, 100000, 22, 4);

INSERT INTO perdida_productos (id, cantidad_perdida, producto_id) VALUES
(3, 2, 4),
(4, 5, 5);

-- Triggers
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

SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER actualizar_historial_precio
BEFORE UPDATE ON productos
FOR EACH ROW
BEGIN
    IF NEW.precio_producto <> OLD.precio_producto THEN
        INSERT INTO historial_precios_productos
        (producto_id, precios_producto, fecha_historial)
        VALUES (OLD.id, OLD.precio_producto, CURRENT_TIMESTAMP);
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

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

SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER actualizar_stock_productos
AFTER INSERT ON detalle_venta
FOR EACH ROW
BEGIN
   
    UPDATE productos
    SET cantidad_producto = cantidad_producto - NEW.cantidad
    WHERE id = NEW.productos_id;
   
   
    INSERT INTO movimientos_inventario
    (tipo_movimiento, cantidad, fecha_movimiento, motivo, producto_id)
    VALUES ('salida', NEW.cantidad, NOW(), 'Venta registrada', NEW.productos_id);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

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