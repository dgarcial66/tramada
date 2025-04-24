package com.example.tramada20.app.api.ApiService

import com.example.tramada20.app.models.Cliente
import com.example.tramada20.app.models.Producto
import com.example.tramada20.app.models.Venta
import com.example.tramada20.app.models.DetalleVenta
import com.example.tramada20.app.models.LoginRequest
import com.example.tramada20.app.models.LoginResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface ApiService {
    @POST("/api/v1/clients")
    fun crearProveedor(@Body cliente: Cliente): Call<Cliente>

    @GET("/api/v1/clients")
    fun obtenerClientes(): Call<List<Cliente>>

    @PUT("/api/v1/clients")
    fun actualizarCliente(@Body cliente: Cliente): Call<Cliente>

    @GET("/api/v1/products")
    fun obtenerProductos(): Call<List<Producto>>

    @POST("/api/v1/sales")
    fun crearVenta(@Body venta: Venta): Call<Venta>

    @POST("/api/v1/detail-sales")
    fun crearDetalleVenta(@Body detalleVenta: DetalleVenta): Call<DetalleVenta>

    @GET("/api/v1/detail-sales/venta/{id}")
    fun obtenerDetallesPorVenta(@Path("id") ventaId: Int): Call<List<DetalleVenta>>

    @GET("/api/v1/sales")
    fun obtenerVenta(): Call<List<Venta>>

    @PUT("/api/v1/sales")
    fun actualizarVenta(@Body venta: Venta): Call<Venta>


    @POST("/api/v1/auth/login")
    fun login(@Body request: LoginRequest): Call<LoginResponse>
}
