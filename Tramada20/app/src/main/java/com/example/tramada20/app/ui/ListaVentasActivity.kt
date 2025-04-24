package com.example.tramada20.app.ui

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.tramada20.R
import com.example.tramada20.app.Adapter.ProductoAdapter
import com.example.tramada20.app.Adapter.VentaAdapter
import com.example.tramada20.app.api.ApiClient
import com.example.tramada20.app.models.Producto
import com.example.tramada20.app.models.Venta
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ListaVentasActivity : AppCompatActivity() {
    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: VentaAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_lista_ventas)

        recyclerView = findViewById(R.id.tvVenta)
        recyclerView.layoutManager = LinearLayoutManager(this)

        ApiClient.apiService.obtenerVenta().enqueue(object : Callback<List<Venta>> {
            override fun onResponse(
                call: Call<List<Venta>>,
                response: Response<List<Venta>>
            ) {
                if (response.isSuccessful) {
                    val venta = response.body() ?: emptyList()
                    adapter = VentaAdapter(this@ListaVentasActivity, venta)
                    recyclerView.adapter = adapter
                } else {
                    Toast.makeText(this@ListaVentasActivity, "Error al obtener productos", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Venta>>, t: Throwable) {
                Toast.makeText(this@ListaVentasActivity, "Fallo en la conexión", Toast.LENGTH_SHORT).show()
            }
        })
    }
}