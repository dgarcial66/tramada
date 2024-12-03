INSERT INTO `rol` (`nombre_rol`) VALUES 
('Administrador'),
('Empleado');

--- Clave de los dos usuarios: hashed_password

INSERT INTO `usuario` ( `email`, `contraseña`, `id_rol`) VALUES 
('admin@empresa.com', '$2a$10$CXYoZOYk6JOAJvnCfJ5T7uyKLU05rmrDiEntjtJIrvOqZ79ge8rPq', 1),
('empleado@empresa.com', 'CXYoZOYk6JOAJvnCfJ5T7uyKLU05rmrDiEntjtJIrvOqZ79ge8rPq', 2);

INSERT INTO `categoria_insumos` (`nombre_categoria_insumo`) VALUES 
('Tela'), 
('Hilo'), 
('Botón');



INSERT INTO `categoria_productos` (`nombre_categoria`) VALUES 
('Ropa de hombre'), 
('Ropa de mujer'), 
('Accesorios');


INSERT INTO `proveedor` (`nombre_proveedor`, `telefono`, `correo`, `direccion`) VALUES 
('Textiles S.A.', 123456789, 1, 'despues@gmail.com', 'Av. Siempre Viva 742'),
('Hilos y Botones Ltda.', 987654321, 2, 'algo@gmail.com', 'Calle 10 #20-30');



INSERT INTO `clientes` (`nombre_cliente`, `telefono_cliente`, `direccion_cliente`, `tipo_pago`, `tipo_cliente`) VALUES 
('Juan Pérez', 1234567890, 'Calle Falsa 123', 1, 'Mayorista'),
('María López', 987654321, 'Av. Principal 456', 2, 'Minorista');


INSERT INTO `insumos` (`nombre_insumo`, `color_insumo`, `peso_insumo`, `tipo_insumo`, `cantidad_insumo`, `precio_insumo`, `id_proveedor`, `categoria_insumos_id`) VALUES 
('Tela de algodón', 'Blanco', 100, 'Tela', 50, 2000, 1, 1),
('Hilo de poliéster', 'Negro', 10, 'Hilo', 100, 500, 2, 2);


INSERT INTO `productos` (`nombre_producto`, `genero_producto`, `tipo_producto`, `talla_producto`, `color_producto`, `peso_producto`, `cantidad_producto`, `precio_producto`, `categoria_productos_id`) VALUES 
('Camisa', 'Hombre', 'Casual', 'M', 'Blanco', 500, 100, 20000, 1),
('Blusa', 'Mujer', 'Formal', 'S', 'Rojo', 300, 50, 15000, 2);



INSERT INTO `venta` (`fecha_venta`, `estado_pago`, `tipo_venta`, `total_venta`, `comentarios`, `clientes_id`) VALUES 
('2024-11-15 12:00:00', 'Pagado', 'Contado', 20000, 'Sin comentarios', 1),
('2024-11-16 15:00:00', 'Pendiente', 'Crédito', 30000, 'Entrega a 30 días', 2);

INSERT INTO `detalle_venta` (`cantidad`, `precio_unitario`, `subtotal`, `ventas_id`, `productos_id`) VALUES
(2, 5000, 10000, 3, 1), -- Aquí ajustamos ventas_id a 3
(3, 3000, 9000, 3, 2); -- Aquí también usamos ventas_id 3



INSERT INTO `detalle_venta` (`cantidad`, `precio_unitario`, `subtotal`, `ventas_id`, `productos_id`) VALUES 
(2, 5000, 10000, 1, 1),
(3, 3000, 9000, 1, 2);

INSERT INTO `historial_precios_insumos` (`precio_insumo`, `insumos_id`) VALUES 
(1500, 1),
(2500, 2);


INSERT INTO `historial_precios_productos` (`precios_producto`, `producto_id`) VALUES 
(20000.00, 1),
(15000.50, 2);


INSERT INTO `movimientos_inventario` (`tipo_movimiento`, `cantidad`, `motivo`, `insumos_id`, `producto_id`) VALUES 
('entrada', 50, 'Nuevo pedido', 1, NULL),
('salida', 10, 'Producción', 1, 1);



INSERT INTO `orden_de_produccion` (`fecha_orden`, `fecha_entrega`, `cantidad_productos_solicitada`, `cantidad_insumo_necesaria`, `usuario_id`, `anotaciones`, `estado_orden`, `insumos_id`, `producto_id`) VALUES
('2024-11-15 10:00:00', '2024-12-01 10:00:00', 100, 500, 1, 'Producción urgente', 'en proceso', 1, 1),
('2024-11-16 12:00:00', '2024-12-05 12:00:00', 200, 800, 2, 'Producción normal', 'en proceso', 2, 2);


INSERT INTO `orden_produccion_movimiento` (`orden_produccion_id`, `movimiento_inventario_id`) VALUES
(1, 1),
(2, 2);

INSERT INTO `pago` (`fecha_pago`, `monto`, `metodo_pago`, `comentarios`, `venta_id`) VALUES 
('2024-11-14 10:00:00', 10000, 'Tarjeta', 'Pago completo', 1),
('2024-11-15 12:00:00', 5000, 'Efectivo', 'Abono', 2);


INSERT INTO `pago` (`fecha_pago`, `monto`, `metodo_pago`, `comentarios`, `venta_id`) VALUES
('2024-11-14 10:00:00', 10000, 'Tarjeta', 'Pago completo', 3),
('2024-11-15 12:00:00', 5000, 'Efectivo', 'Abono', 4);


INSERT INTO `perdida_insumos` (`cantidad_perdida`, `insumos_id`) VALUES 
(5, 1),
(2, 2);

