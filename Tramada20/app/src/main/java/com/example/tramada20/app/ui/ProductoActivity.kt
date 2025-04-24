package com.example.tramada20.app.ui

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.tramada20.app.api.ApiClient
import com.example.tramada20.app.models.Producto
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import com.example.tramada20.R
import com.example.tramada20.app.Adapter.ProductoAdapter

class ProductoActivity : AppCompatActivity() {
    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: ProductoAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_productos)

        recyclerView = findViewById(R.id.rvProductos)
        recyclerView.layoutManager = LinearLayoutManager(this)

        ApiClient.apiService.obtenerProductos().enqueue(object : Callback<List<Producto>> {
            override fun onResponse(
                call: Call<List<Producto>>,
                response: Response<List<Producto>>
            ) {
                if (response.isSuccessful) {
                    val productos = response.body() ?: emptyList()
                    adapter = ProductoAdapter(productos)
                    recyclerView.adapter = adapter
                } else {
                    Toast.makeText(this@ProductoActivity, "Error al obtener productos", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Producto>>, t: Throwable) {
                Toast.makeText(this@ProductoActivity, "Fallo en la conexión", Toast.LENGTH_SHORT).show()
            }
        })
    }
}