package com.example.tramada20.app.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.example.tramada20.R

class MenuActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_menu)

        val btnProductos = findViewById<Button>(R.id.btnProductos)
        val btnClientes = findViewById<Button>(R.id.btnClientes)
        val btnVentas = findViewById<Button>(R.id.btnVentas)

        btnProductos.setOnClickListener {
            val intent = Intent(this, ProductoActivity::class.java)
            startActivity(intent)
        }

        btnClientes.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        }

        btnVentas.setOnClickListener {
            val intent = Intent(this, VentaActivity::class.java)
            startActivity(intent)
        }
    }
}