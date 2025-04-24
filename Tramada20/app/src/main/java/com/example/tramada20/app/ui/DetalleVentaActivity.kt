package com.example.tramada20.app.ui

import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.tramada20.app.api.ApiClient
import com.example.tramada20.app.models.DetalleVenta
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import com.example.tramada20.R

class DetalleVentaActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detalleventa)

        val etCantidad = findViewById<EditText>(R.id.etCantidad)
        val etPrecioUnitario = findViewById<EditText>(R.id.etPrecioUnitario)
        val etSubtotal = findViewById<EditText>(R.id.etSubtotal)
        val etVentasId = findViewById<EditText>(R.id.etVentasId)
        val etProductosId = findViewById<EditText>(R.id.etProductosId)
        val btnGuardarDetalleVenta = findViewById<Button>(R.id.btnGuardarDetalleVenta)

        btnGuardarDetalleVenta.setOnClickListener {
            val cantidad = etCantidad.text.toString().trim()
            val precioUnitario = etPrecioUnitario.text.toString().trim()
            val subtotal = etSubtotal.text.toString().trim()
            val ventasId = etVentasId.text.toString().trim()
            val productosId = etProductosId.text.toString().trim()

            if (cantidad.isEmpty() || precioUnitario.isEmpty() || subtotal.isEmpty() || ventasId.isEmpty() || productosId.isEmpty()) {
                Toast.makeText(this, "Todos los campos son obligatorios", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val detalleVenta = DetalleVenta(cantidad = cantidad.toInt(), precio_unitario = precioUnitario.toInt(), subtotal = subtotal.toInt(), ventas_id = ventasId.toInt(), productos_id = productosId.toInt())

            ApiClient.apiService.crearDetalleVenta(detalleVenta).enqueue(object : Callback<DetalleVenta> {
                override fun onResponse(call: Call<DetalleVenta>, response: Response<DetalleVenta>) {
                    if (response.isSuccessful) {
                        Toast.makeText(this@DetalleVentaActivity, "Detalle de venta guardado", Toast.LENGTH_SHORT).show()
                    } else {
                        Toast.makeText(this@DetalleVentaActivity, "Error al guardar", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<DetalleVenta>, t: Throwable) {
                    Log.e("API_ERROR", "Error al conectar", t)
                    Toast.makeText(this@DetalleVentaActivity, "Fallo: ${t.message}", Toast.LENGTH_LONG).show()
                }
            })
        }
    }
}