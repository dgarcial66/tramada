Filtros para la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD CONSTRAINT `FKdetalle_ve138844` FOREIGN KEY (`ventas_id`) REFERENCES `venta` (`id`),
  ADD CONSTRAINT `FKdetalle_ve318385` FOREIGN KEY (`productos_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `historial_precios_insumos`
--
ALTER TABLE `historial_precios_insumos`
  ADD CONSTRAINT `FKhistorial_619176` FOREIGN KEY (`insumos_id`) REFERENCES `insumos` (`id`);

--
-- Filtros para la tabla `historial_precios_productos`
--
ALTER TABLE `historial_precios_productos`
  ADD CONSTRAINT `FKhistorial_745263` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `insumos`
--
ALTER TABLE `insumos`
  ADD CONSTRAINT `FKinsumos264924` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id`),
  ADD CONSTRAINT `FKinsumos664014` FOREIGN KEY (`categoria_insumos_id`) REFERENCES `categoria_insumos` (`id`);



--
-- Filtros para la tabla `movimientos_inventario`
--
ALTER TABLE `movimientos_inventario`
  ADD CONSTRAINT `FKmovimiento315619` FOREIGN KEY (`insumos_id`) REFERENCES `insumos` (`id`),
  ADD CONSTRAINT `FKmovimiento469901` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `orden_de_produccion`
--
ALTER TABLE `orden_de_produccion`
  ADD CONSTRAINT `FKorden_de_p803341` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`);

ALTER TABLE `orden_de_produccion`
  ADD CONSTRAINT `fk_insumos_orden` FOREIGN KEY (`insumos_id`) REFERENCES `insumos` (`id`),
  ADD CONSTRAINT `fk_producto_orden` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `fk_usuario_orden` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`);


--
-- Filtros para la tabla `orden_produccion_movimiento`
--
ALTER TABLE `orden_produccion_movimiento`
  ADD CONSTRAINT `orden_produccion_movimiento_ibfk_1` FOREIGN KEY (`orden_produccion_id`) REFERENCES `orden_de_produccion` (`id`);
ALTER TABLE `orden_produccion_movimiento`
  ADD CONSTRAINT `orden_produccion_movimiento_ibfk_2` FOREIGN KEY (`movimiento_inventario_id`) REFERENCES `movimientos_inventario` (`id`);

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `FKpago371729` FOREIGN KEY (`venta_id`) REFERENCES `venta` (`id`);

--
-- Filtros para la tabla `perdida_insumos`
--
ALTER TABLE `perdida_insumos`
  ADD CONSTRAINT `FKperdida_in183794` FOREIGN KEY (`insumos_id`) REFERENCES `insumos` (`id`);

--
-- Filtros para la tabla `perdida_productos`
--
ALTER TABLE `perdida_productos`
  ADD CONSTRAINT `FKperdida_pr759061` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `FKproductos779460` FOREIGN KEY (`categoria_productos_id`) REFERENCES `categoria_productos` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `FKusuario340715` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`);

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `FKventa321749` FOREIGN KEY (`clientes_id`) REFERENCES `clientes` (`id`);
COMMIT;