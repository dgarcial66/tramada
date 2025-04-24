package com.example.tramada20.app.models

data class Cliente(
    val id: Int? = null,
    val nombre_cliente: String,
    val telefono_cliente: String,
    val direccion_cliente: String,
    val tipo_pago: Int,
    val tipo_cliente: String
)
