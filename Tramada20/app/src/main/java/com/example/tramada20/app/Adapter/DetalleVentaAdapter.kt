package com.example.tramada20.app.Adapter


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.tramada20.R
import com.example.tramada20.app.models.DetalleVenta

class DetalleVentaAdapter(private val detalles: List<DetalleVenta>) :
    RecyclerView.Adapter<DetalleVentaAdapter.DetalleVentaViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DetalleVentaViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_detalle_venta, parent, false)
        return DetalleVentaViewHolder(view)
    }

    override fun onBindViewHolder(holder: DetalleVentaViewHolder, position: Int) {
        val detalle = detalles[position]
        holder.bind(detalle)
    }

    override fun getItemCount(): Int = detalles.size

    inner class DetalleVentaViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val tvCantidad: TextView = itemView.findViewById(R.id.tvCantidad)
        private val tvPrecioUnitario: TextView = itemView.findViewById(R.id.tvPrecioUnitario)
        private val tvSubtotal: TextView = itemView.findViewById(R.id.tvSubtotal)
        private val tvProductoId: TextView = itemView.findViewById(R.id.tvProductoId)

        fun bind(detalle: DetalleVenta) {
            tvCantidad.text = "Cantidad: ${detalle.cantidad}"
            tvPrecioUnitario.text = "Precio Unitario: $${detalle.precio_unitario}"
            tvSubtotal.text = "Subtotal: $${detalle.subtotal}"
            tvProductoId.text = "ID Producto: ${detalle.productos_id}"
        }
    }
}