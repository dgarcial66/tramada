package com.example.tramada20.app.ui

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.tramada20.R
import com.example.tramada20.app.Adapter.ClienteAdapter
import com.example.tramada20.app.api.ApiClient
import com.example.tramada20.app.models.Cliente
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ClientesActivity : AppCompatActivity() {
    private lateinit var recyclerView: RecyclerView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_clientes)

        recyclerView = findViewById(R.id.rvClientes)
        recyclerView.layoutManager = LinearLayoutManager(this)

        ApiClient.apiService.obtenerClientes().enqueue(object : Callback<List<Cliente>> {
            override fun onResponse(call: Call<List<Cliente>>, response: Response<List<Cliente>>) {
                if (response.isSuccessful) {
                    val clientes = response.body() ?: emptyList()
                    recyclerView.adapter = ClienteAdapter(clientes)
                } else {
                    Toast.makeText(this@ClientesActivity, "Error al cargar clientes", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Cliente>>, t: Throwable) {
                Toast.makeText(this@ClientesActivity, "Fallo en la conexión", Toast.LENGTH_SHORT).show()
            }
        })
    }
}