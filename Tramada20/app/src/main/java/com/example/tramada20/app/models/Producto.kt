package com.example.tramada20.app.models

data class Producto(
    val id: Int? = null,
    val nombre_producto: String,
    val genero_producto: String,
    val tipo_producto: String,
    val talla_producto: String,
    val color_producto: String,
    val peso_producto: Int,
    val cantidad_producto: Int,
    val precio_producto: Int,
    val categoria_productos_id: Int,
    val fecha_actualizacion: String? = null
)