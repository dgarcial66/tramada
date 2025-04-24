package com.example.tramada20.app.Adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.tramada20.R
import com.example.tramada20.app.models.Producto

class ProductoAdapter(private val listaProductos: List<Producto>) :
    RecyclerView.Adapter<ProductoAdapter.ProductoViewHolder>() {

    class ProductoViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val nombre = itemView.findViewById<TextView>(R.id.tvNombre)
        val genero = itemView.findViewById<TextView>(R.id.tvGenero)
        val tipo = itemView.findViewById<TextView>(R.id.tvTipo)
        val talla = itemView.findViewById<TextView>(R.id.tvTalla)
        val color = itemView.findViewById<TextView>(R.id.tvColor)
        val peso = itemView.findViewById<TextView>(R.id.tvPeso)
        val cantidad = itemView.findViewById<TextView>(R.id.tvCantidad)
        val precio = itemView.findViewById<TextView>(R.id.tvPrecio)
        val categoria = itemView.findViewById<TextView>(R.id.tvCategoria)
        val fecha = itemView.findViewById<TextView>(R.id.tvFecha)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProductoViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_producto, parent, false)
        return ProductoViewHolder(view)
    }

    override fun onBindViewHolder(holder: ProductoViewHolder, position: Int) {
        val producto = listaProductos[position]
        holder.nombre.text = producto.nombre_producto
        holder.genero.text = producto.genero_producto
        holder.tipo.text = producto.tipo_producto
        holder.talla.text = producto.talla_producto
        holder.color.text = producto.color_producto
        holder.peso.text = "${producto.peso_producto}g"
        holder.cantidad.text = producto.cantidad_producto.toString()
        holder.precio.text = "$${producto.precio_producto}"
        holder.categoria.text = producto.categoria_productos_id.toString()
        holder.fecha.text = producto.fecha_actualizacion
    }

    override fun getItemCount(): Int = listaProductos.size
}