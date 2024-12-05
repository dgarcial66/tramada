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

CREATE TRIGGER actualizar_historial_precio
BEFORE UPDATE ON productos
FOR EACH ROW
BEGIN
    IF NEW.precio_producto <> OLD.precio_producto THEN
        INSERT INTO historial_precios_productos (producto_id, precio, fecha_historial)
        VALUES (OLD.id, OLD.precio_producto, CURRENT_TIMESTAMP);
    END IF;
END $$

DELIMITER ;

-- Trigger para historial de precios de productos al insertar

DELIMITER $$

CREATE TRIGGER insertar_historial_precio
AFTER INSERT ON productos
FOR EACH ROW
BEGIN
    INSERT INTO historial_precios_productos (precios_producto, producto_id)
    VALUES (NEW.precio_producto, NEW.id);
END $$

DELIMITER ;

-- Trigger para historial de precios de insumos al insertar
DELIMITER $$
CREATE TRIGGER insumos_historial_precio
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



--Trigger para salida en una orden de produccion

DELIMITER $$

CREATE TRIGGER actualizar_movimientos_inventario
AFTER INSERT ON orden_de_produccion
FOR EACH ROW
BEGIN
    IF NEW.estado_orden = 'en proceso' THEN
        -- Insertar en movimientos_inventario
        INSERT INTO movimientos_inventario (tipo_movimiento, cantidad, fecha_movimiento, motivo, insumos_id, producto_id)
        VALUES ('salida', NEW.cantidad_insumo_necesaria, NOW(), 'Orden en proceso', NEW.insumos_id, NEW.producto_id);

        -- Descontar cantidad de insumos en la tabla insumos
        UPDATE insumos
        SET cantidad_insumo = cantidad_insumo - NEW.cantidad_insumo_necesaria
        WHERE id = NEW.insumos_id;
    END IF;
END $$

DELIMITER ;


--Trigger para entrada de producto


DELIMITER $$

CREATE TRIGGER actualizar_movimientos_inventario_completado
AFTER UPDATE ON orden_de_produccion
FOR EACH ROW
BEGIN
    IF NEW.estado_orden = 'completado' AND OLD.estado_orden != 'completado' THEN
        -- Insertar en movimientos_inventario
        INSERT INTO movimientos_inventario (tipo_movimiento, cantidad, fecha_movimiento, motivo, insumos_id, producto_id)
        VALUES ('entrada', NEW.cantidad_productos_solicitada, NOW(), 'Orden completada', NEW.insumos_id, NEW.producto_id);

        -- Sumar cantidad de productos en la tabla producto
        UPDATE producto
        SET cantidad_producto = cantidad_producto + NEW.cantidad_productos_solicitada
        WHERE id = NEW.producto_id;
    END IF;
END $$

DELIMITER ;
