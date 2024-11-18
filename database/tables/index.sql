-- Crear base de datos

CREATE DATABASE IF NOT EXISTS `tramada_db`;

USE `tramada_db`;

CREATE TABLE `categoria_insumos` (
  `id` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre_categoria_insumo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_productos`
--

CREATE TABLE `categoria_productos` (
  `id` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre_categoria` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre_cliente` varchar(55) NOT NULL,
  `telefono_cliente` int(11) DEFAULT NULL,
  `direccion_cliente` varchar(100) DEFAULT NULL,
  `tipo_pago` int(11) DEFAULT NULL,
  `tipo_cliente` varchar(55) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `cantidad` int(11) DEFAULT NULL,
  `precio_unitario` int(11) DEFAULT NULL,
  `subtotal` int(11) DEFAULT NULL,
  `ventas_id` int(11) NOT NULL,
  `productos_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_precios_insumos`
--

CREATE TABLE `historial_precios_insumos` (
  `id` int(10) DEFAULT NULL AUTO_INCREMENT PRIMARY KEY,
  `precio_insumo` DOUBLE(19,0) NOT NULL,
  `fecha_historial` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `insumos_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_precios_productos`
--

CREATE TABLE `historial_precios_productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `precios_producto` DOUBLE(19,2) NOT NULL,
  `fecha_historial` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `producto_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumos`
--

CREATE TABLE `insumos` (
  `id` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre_insumo` varchar(55) NOT NULL,
  `color_insumo` varchar(25) NOT NULL,
  `peso_insumo` DOUBLE(19,0) NOT NULL,
  `tipo_insumo` varchar(55) NOT NULL,
  `cantidad_insumo` int(10) NOT NULL,
  `precio_insumo` int(10) NOT NULL,
  `id_proveedor` int(10) NOT NULL,
  `categoria_insumos_id` int(10) NOT NULL,
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

Estructura de tabla para la tabla `movimientos_inventario`
--

CREATE TABLE `movimientos_inventario` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `tipo_movimiento` enum('entrada','salida','ajuste','perdida') NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_movimiento` timestamp NOT NULL DEFAULT current_timestamp(),
  `motivo` varchar(100) NOT NULL,
  `insumos_id` int(10) DEFAULT NULL,
  `producto_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


Estructura de tabla para la tabla `orden_de_produccion`
--

CREATE TABLE `orden_de_produccion` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `fecha_orden` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_entrega` TIMESTAMP NOT NULL,
  `cantidad_productos_solicitada` int(50) DEFAULT NULL,
  `cantidad_insumo_necesaria` int(50) NOT NULL,
  `usuario_id` int(10) NOT NULL,
  `anotaciones` varchar(255) DEFAULT NULL,
  `estado_orden` enum('completado','en proceso','en revision') NOT NULL,
  `insumos_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


Estructura de tabla para la tabla `orden_produccion_movimiento`
--

CREATE TABLE `orden_produccion_movimiento` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `orden_produccion_id` int(11) NOT NULL,
  `movimiento_inventario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `fecha_pago` TIMESTAMP DEFAULT NULL,
  `monto` int(11) NOT NULL,
  `metodo_pago` varchar(55) DEFAULT NULL,
  `comentarios` varchar(200) DEFAULT NULL,
  `venta_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perdida_insumos`
--

CREATE TABLE `perdida_insumos` (
  `id` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `cantidad_perdida` int(10) NOT NULL,
  `insumos_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perdida_productos`
--

CREATE TABLE `perdida_productos` (
  `id` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `cantidad_perdida` int(10) NOT NULL,
  `producto_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre_producto` varchar(50) NOT NULL,
  `genero_producto` varchar(25) NOT NULL,
  `tipo_producto` varchar(55) NOT NULL,
  `talla_producto` varchar(10) NOT NULL,
  `color_producto` varchar(25) NOT NULL,
  `peso_producto` int(10) NOT NULL,
  `cantidad_producto` int(11) NOT NULL,
  `precio_producto` int(10) NOT NULL,
  `categoria_productos_id` int(10) NOT NULL,
  `fecha_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre_proveedor` varchar(55) NOT NULL,
  `telefono` int(10) DEFAULT NULL,
  `tipo_insumo` int(10) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre_rol` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(10) NOT NULL AUTO_INCEMENT PRIMARY KEY,
  `email` varchar(55) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `fecha_venta` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado_pago` varchar(55) NOT NULL,
  `tipo_venta` varchar(55) NOT NULL,
  `total_venta` int(20) NOT NULL,
  `comentarios` varchar(100) DEFAULT NULL,
  `clientes_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;