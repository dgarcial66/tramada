package com.example.tramada20.app.models

data class LoginResponse(
    val id: Int,
    val email: String,
    val password: String,
    val id_rol: Int
)

