package com.example.tramada20.app.ui

import android.content.Intent
import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.example.tramada20.R
import com.example.tramada20.app.api.ApiClient
import com.example.tramada20.app.models.Venta
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class VentaActivity : AppCompatActivity() {

    private var idVentaEditando: Int? = null

    private lateinit var etEstadoPago: EditText
    private lateinit var etTipoVenta: EditText
    private lateinit var etTotal: EditText
    private lateinit var etComentarios: EditText
    private lateinit var etClienteId: EditText
    private lateinit var btnGuardar: Button
    private lateinit var btnIrDetalle: Button
    private lateinit var btnVerVentas: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_venta)

        etEstadoPago = findViewById(R.id.etEstadoPago)
        etTipoVenta = findViewById(R.id.etTipoVenta)
        etTotal = findViewById(R.id.etTotalVenta)
        etComentarios = findViewById(R.id.etComentarios)
        etClienteId = findViewById(R.id.etClienteId)
        btnGuardar = findViewById(R.id.btnGuardarVenta)
        btnIrDetalle = findViewById(R.id.btnIrDetalleVenta)
        btnVerVentas = findViewById(R.id.btnVerVentas)

        // Cargar datos si se está editando
        idVentaEditando = intent.getIntExtra("venta_id", -1).takeIf { it != -1 }
        if (idVentaEditando != null) {
            etEstadoPago.setText(intent.getStringExtra("estado_pago") ?: "")
            etTipoVenta.setText(intent.getStringExtra("tipo_venta") ?: "")
            etTotal.setText(intent.getIntExtra("total_venta", 0).toString())
            etComentarios.setText(intent.getStringExtra("comentarios") ?: "")
            etClienteId.setText(intent.getIntExtra("clientes_id", 0).toString())
            btnGuardar.text = "Actualizar Venta"
        }

        btnGuardar.setOnClickListener {
            val estadoPago = etEstadoPago.text.toString().trim()
            val tipoVenta = etTipoVenta.text.toString().trim()
            val totalStr = etTotal.text.toString().trim()
            val clienteIdStr = etClienteId.text.toString().trim()
            val comentarios = etComentarios.text.toString().trim()

            // Validaciones
            if (estadoPago.isEmpty() || tipoVenta.isEmpty() || totalStr.isEmpty() || clienteIdStr.isEmpty()) {
                Toast.makeText(this, "Todos los campos son obligatorios", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val venta = Venta(
                id = idVentaEditando,
                estado_pago = estadoPago,
                tipo_venta = tipoVenta,
                total_venta = totalStr.toInt(),
                comentarios = comentarios,
                clientes_id = clienteIdStr.toInt()
            )

            val call = if (idVentaEditando != null) {
                ApiClient.apiService.actualizarVenta(venta)
            } else {
                ApiClient.apiService.crearVenta(venta)
            }

            call.enqueue(object : Callback<Venta> {
                override fun onResponse(call: Call<Venta>, response: Response<Venta>) {
                    if (response.isSuccessful) {
                        Toast.makeText(this@VentaActivity, "Venta guardada correctamente", Toast.LENGTH_SHORT).show()
                        limpiarCampos()
                    } else {
                        Toast.makeText(this@VentaActivity, "Error al guardar (${response.code()})", Toast.LENGTH_LONG).show()
                    }
                }

                override fun onFailure(call: Call<Venta>, t: Throwable) {
                    Toast.makeText(this@VentaActivity, "Fallo en la conexión", Toast.LENGTH_SHORT).show()
                }
            })
        }

        btnIrDetalle.setOnClickListener {
            startActivity(Intent(this, DetalleVentaActivity::class.java))
        }

        btnVerVentas.setOnClickListener {
            startActivity(Intent(this, ListaVentasActivity::class.java))
        }
    }

    private fun limpiarCampos() {
        etEstadoPago.text.clear()
        etTipoVenta.text.clear()
        etTotal.text.clear()
        etComentarios.text.clear()
        etClienteId.text.clear()
        idVentaEditando = null
        btnGuardar.text = "Guardar Venta"
    }
}