package com.example.tramada20.app.ui


import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.tramada20.app.Adapter.DetalleVentaAdapter
import com.example.tramada20.app.models.DetalleVenta
import com.example.tramada20.app.api.ApiService.ApiService
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import com.example.tramada20.R
import com.example.tramada20.app.api.ApiClient

class ListaDetalleVentaActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: DetalleVentaAdapter
    private val detallesList = mutableListOf<DetalleVenta>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_lista_detalles_venta)

        recyclerView = findViewById(R.id.rvDetallesVenta)
        recyclerView.layoutManager = LinearLayoutManager(this)

        adapter = DetalleVentaAdapter(detallesList)
        recyclerView.adapter = adapter

        val ventaId = intent.getIntExtra("VENTA_ID", -1)
        if (ventaId != -1) {
            obtenerDetallesPorVenta(ventaId)
        } else {
            Toast.makeText(this, "ID de venta no válido", Toast.LENGTH_SHORT).show()
        }
    }

    private fun obtenerDetallesPorVenta(ventaId: Int) {
        val call = ApiClient.apiService.obtenerDetallesPorVenta(ventaId)
        call.enqueue(object : Callback<List<DetalleVenta>> {
            override fun onResponse(
                call: Call<List<DetalleVenta>>,
                response: Response<List<DetalleVenta>>
            ) {
                if (response.isSuccessful) {
                    detallesList.clear()
                    detallesList.addAll(response.body() ?: emptyList())
                    adapter.notifyDataSetChanged()
                } else {
                    Log.e("DETALLE_VENTA_ERROR", "Código: ${response.code()} - Error: ${response.errorBody()?.string()}")
                    Toast.makeText(applicationContext, "Error al obtener los detalles", Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<List<DetalleVenta>>, t: Throwable) {
                Log.e("DETALLE_VENTA_ERROR", "Error: ${t.message}")
                Toast.makeText(applicationContext, "Fallo en la conexión", Toast.LENGTH_SHORT).show()
            }
        })
    }
}