-- Crear Trigger para asignar un UUID_SHORT en el campo id antes de insertar
DELIMITER $$
CREATE TRIGGER before_insert_user
BEFORE INSERT ON usuario
FOR EACH ROW
BEGIN
    SET NEW.id = UUID_SHORT();
END $$
DELIMITER ;

-- Trigger para historial de precios de productos al insertar
DELIMITER $$
CREATE TRIGGER productosHistoricoPrecioProducto
AFTER INSERT ON productos
FOR EACH ROW
BEGIN
    INSERT INTO historial_precios_productos (producto_id, precio)
    VALUES (NEW.id, NEW.precio_producto);
END $$
DELIMITER ;

-- Trigger para historial de precios de productos al actualizar
DELIMITER $$
CREATE TRIGGER ActualizarHistoricoPreciosProductos
BEFORE UPDATE ON productos
FOR EACH ROW
BEGIN
    IF NEW.precio_producto <> OLD.precio_producto THEN
        INSERT INTO historial_precios_productos (producto_id, precio, fecha_historial)
        VALUES (NEW.id, NEW.precio_producto, CURRENT_TIMESTAMP);
    END IF;
END $$
DELIMITER ;



-- Trigger para historial de precios de insumos al insertar
DELIMITER $$
CREATE TRIGGER insumosHistoricoPrecio
AFTER INSERT ON insumos
FOR EACH ROW
BEGIN
    INSERT INTO historial_precios_insumos (insumos_id, precio_insumo)
    VALUES (NEW.id, NEW.precio_insumo);
END $$
DELIMITER ;

-- Trigger para historial de precios de insumos al actualizar
DELIMITER $$
CREATE TRIGGER ActualizarHistoricoPreciosInsumos
BEFORE UPDATE ON insumos
FOR EACH ROW
BEGIN
    IF NEW.precio_insumo <> OLD.precio_insumo THEN
        INSERT INTO historial_precios_insumos (insumos_id, precio_insumo, fecha_historial)
        VALUES (NEW.id, NEW.precio_insumo, CURRENT_TIMESTAMP);
    END IF;
END $$
DELIMITER ;
