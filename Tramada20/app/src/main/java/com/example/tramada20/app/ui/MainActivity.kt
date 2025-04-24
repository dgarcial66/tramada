package com.example.tramada20.app.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.media3.common.util.Log
import com.example.tramada20.R
import com.example.tramada20.app.api.ApiClient
import com.example.tramada20.app.models.Cliente
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {

    private var clienteId: Int? = null  // Para saber si estamos editando
    private lateinit var etNombre: EditText
    private lateinit var etTelefono: EditText
    private lateinit var etDireccion: EditText
    private lateinit var etTipoPago: EditText
    private lateinit var etTipoCliente: EditText
    private lateinit var btnGuardar: Button
    private lateinit var btnBuscar: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        etNombre = findViewById(R.id.etNombre)
        etTelefono = findViewById(R.id.etTelefono)
        etDireccion = findViewById(R.id.etDireccion)
        etTipoPago = findViewById(R.id.etTipodepago)
        etTipoCliente = findViewById(R.id.etTipocliente)
        btnGuardar = findViewById(R.id.btnGuardar)
        btnBuscar = findViewById(R.id.btnBusca)

        // Revisamos si venimos desde editar
        clienteId = intent.getIntExtra("cliente_id", -1).takeIf { it != -1 }
        if (clienteId != null) {
            etNombre.setText(intent.getStringExtra("nombre"))
            etTelefono.setText(intent.getStringExtra("telefono"))
            etDireccion.setText(intent.getStringExtra("direccion"))
            etTipoPago.setText(intent.getIntExtra("tipo_pago", 0).toString())
            etTipoCliente.setText(intent.getStringExtra("tipo_cliente"))
            btnGuardar.text = "Actualizar Cliente"
        }

        btnGuardar.setOnClickListener {
            val nombre = etNombre.text.toString().trim()
            val telefono = etTelefono.text.toString().trim()
            val direccion = etDireccion.text.toString().trim()
            val tipoPago = etTipoPago.text.toString().trim()
            val tipoCliente = etTipoCliente.text.toString().trim()

            if (nombre.isEmpty() || telefono.isEmpty() || direccion.isEmpty() || tipoPago.isEmpty()) {
                Toast.makeText(this, "Todos los campos son obligatorios", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val cliente = Cliente(
                id = clienteId,
                nombre_cliente = nombre,
                telefono_cliente = telefono,
                direccion_cliente = direccion,
                tipo_pago = tipoPago.toInt(),
                tipo_cliente = tipoCliente
            )

            if (clienteId != null) {
                // Actualizar cliente
                ApiClient.apiService.actualizarCliente(cliente)

                    .enqueue(object : Callback<Cliente> {
                        override fun onResponse(call: Call<Cliente>, response: Response<Cliente>) {
                            if (response.isSuccessful) {
                                Toast.makeText(this@MainActivity, "Cliente actualizado", Toast.LENGTH_SHORT).show()
                                limpiarCampos()
                            } else {
                                val errorBody = response.errorBody()?.string()
                                Toast.makeText(
                                    this@MainActivity,
                                    "Error al actualizar (${response.code()}): $errorBody",
                                    Toast.LENGTH_LONG
                                ).show()
                            }
                        }

                        override fun onFailure(call: Call<Cliente>, t: Throwable) {
                            Toast.makeText(this@MainActivity, "Fallo en la conexión", Toast.LENGTH_SHORT).show()
                        }
                    })
            } else {
                // Crear nuevo cliente
                ApiClient.apiService.crearProveedor(cliente)

                    .enqueue(object : Callback<Cliente> {
                        override fun onResponse(call: Call<Cliente>, response: Response<Cliente>) {
                            if (response.isSuccessful) {
                                Toast.makeText(this@MainActivity, "Cliente guardado", Toast.LENGTH_SHORT).show()
                                limpiarCampos()
                            } else {
                                Toast.makeText(this@MainActivity, "Error al guardar", Toast.LENGTH_SHORT).show()
                            }
                        }

                        override fun onFailure(call: Call<Cliente>, t: Throwable) {
                            Toast.makeText(this@MainActivity, "Fallo en la conexión", Toast.LENGTH_SHORT).show()
                        }
                    })
            }
        }

        btnBuscar.setOnClickListener {
            startActivity(Intent(this, ClientesActivity::class.java))
        }
    }

    private fun limpiarCampos() {
        etNombre.text.clear()
        etTelefono.text.clear()
        etDireccion.text.clear()
        etTipoPago.text.clear()
        etTipoCliente.text.clear()
        clienteId = null
        btnGuardar.text = "Guardar Cliente"
    }
}