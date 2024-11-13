INSERT INTO rol (nombre_rol) VALUES
('Administrador'),
('Usuario'),
('Gerente');

INSERT INTO usuario (email, contraseña, id_rol) VALUES
('admin@ejemplo.com', 'contraseña_admin', 1),
('usuario@ejemplo.com', 'contraseña_usuario', 2),
('gerente@ejemplo.com', 'contraseña_gerente', 3);


INSERT INTO proveedor (nombre_proveedor, telefono, tipo_insumo) VALUES
('Proveedor A', 1234567890, 'Materiales'),
('Proveedor B', 2345678901, 'Herramientas'),
('Proveedor C', 3456789012, 'Equipos');


INSERT INTO categoria_insumos (nombre_categoria_insumo) VALUES
('Materiales de construcción'),
('Herramientas'),
('Equipos electrónicos');


INSERT INTO insumos (nombre_insumo, color, peso, cantidad_stock, cantidad_salir_unidad, total_cantidad_unidad, total_peso_insumo, precio_insumo, id_proveedor, inventario_insumos_id, categoria_insumos_id) VALUES
('Cemento', 'Gris', 50.00, 100, 1, 100, 5000.00, 10.00, 1, 1, 1),
('Martillo', 'Negro', 0.80, 50, 1, 50, 40.00, 15.00, 2, 2, 2),
('Soldadora', 'Naranja', 10.00, 30, 1, 30, 300.00, 200.00, 3, 3, 3);


INSERT INTO productos (nombre_producto, peso_producto, precio_producto, stock_producto, total_unidades_producto, inventario_producto_id) VALUES
('Producto A', 5.0, 100.00, 50, 50, 1),
('Producto B', 3.0, 150.00, 30, 30, 2),
('Producto C', 10.0, 200.00, 20, 20, 3);


INSERT INTO categoria_productos (nombre_categoria_producto, producto_id) VALUES
('Categoría A', 1),
('Categoría B', 2),
('Categoría C', 3);


INSERT INTO insumos_producto (insumos_id, producto_id, metros, peso, cantidad_unidad_insumo) VALUES
(1, 1, 1.5, 50.0, 2),
(2, 2, 0.8, 0.8, 5),
(3, 3, 3.0, 10.0, 1);


INSERT INTO perdida_productos (nombre_de_producto, cantidad_unidades_perdida, producto_id) VALUES
('Producto A', 2, 1),
('Producto B', 5, 2);


INSERT INTO perdida_insumos (cantidad_unidad_perdida, insumos_id) VALUES
(10, 1),
(5, 2);


INSERT INTO historial_precios_productos (precio, producto_id) VALUES
(100.00, 1),
(150.00, 2),
(200.00, 3);


INSERT INTO historial_precios_insumos (precio_insumo, insumos_id) VALUES
(10.00, 1),
(15.00, 2),
(200.00, 3);

