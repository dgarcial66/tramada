
-- Definir las claves foráneas
ALTER TABLE `categoria_productos` ADD CONSTRAINT `FKcategoria_232167` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);
ALTER TABLE `perdida_productos` ADD CONSTRAINT `FKperdida_pr759061` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);
ALTER TABLE `perdida_insumos` ADD CONSTRAINT `FKperdida_in183794` FOREIGN KEY (`insumos_id`) REFERENCES `insumos` (`id`);
ALTER TABLE `historial_precios_productos` ADD CONSTRAINT `FKhistorial_167528` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);
ALTER TABLE `usuario` ADD CONSTRAINT `FKuser_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`);
ALTER TABLE `insumos` ADD CONSTRAINT `FKinsumos664014` FOREIGN KEY (`categoria_insumos_id`) REFERENCES `categoria_insumos` (`id`);
ALTER TABLE `insumos` ADD CONSTRAINT `FKinsumos264924` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id`);
ALTER TABLE `historial_precios_insumos` ADD CONSTRAINT `FKhistorial_619176` FOREIGN KEY (`insumos_id`) REFERENCES `insumos` (`id`);
ALTER TABLE `insumos_producto` ADD CONSTRAINT `FKinsumos_pr982984` FOREIGN KEY (`insumos_id`) REFERENCES `insumos` (`id`);
ALTER TABLE `insumos_producto` ADD CONSTRAINT `FKinsumos_pr203085` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);
