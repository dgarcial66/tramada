package com.example.tramada20.app.models

data class DetalleVenta(
    val id: Int? = null,
    val cantidad: Int,
    val precio_unitario: Int,
    val subtotal: Int,
    val ventas_id: Int,
    val productos_id: Int
)