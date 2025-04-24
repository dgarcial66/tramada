package com.example.tramada20.app.models

import java.io.Serializable

data class Venta(
    val id: Int? = null,
    val fecha_venta: String? = null,
    val estado_pago: String,
    val tipo_venta: String,
    val total_venta: Int,
    val comentarios: String?,
    val clientes_id: Int
) : Serializable