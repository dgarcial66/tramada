package com.example.tramada20.app.Adapter

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.tramada20.R
import com.example.tramada20.app.models.Venta
import com.example.tramada20.app.ui.DetalleVentaActivity
import com.example.tramada20.app.ui.ListaDetalleVentaActivity
import com.example.tramada20.app.ui.VentaActivity

class VentaAdapter(
    private val context: Context,
    private val listaVentas: List<Venta>
) : RecyclerView.Adapter<VentaAdapter.VentaViewHolder>() {

    inner class VentaViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvVentaId: TextView = itemView.findViewById(R.id.tvVentaId)
        val tvFecha: TextView = itemView.findViewById(R.id.tvFecha)
        val tvEstadoPago: TextView = itemView.findViewById(R.id.tvEstadoPago)
        val tvTipoVenta: TextView = itemView.findViewById(R.id.tvTipoVenta)
        val tvTotal: TextView = itemView.findViewById(R.id.tvTotal)
        val tvComentario: TextView = itemView.findViewById(R.id.tvComentario)
        val tvClienteId: TextView = itemView.findViewById(R.id.tvClienteId)
        val btnEditar: Button = itemView.findViewById(R.id.btnEditar)
        val btnVerDetalle: Button = itemView.findViewById(R.id.btnVerDetalle)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VentaViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_venta, parent, false)
        return VentaViewHolder(view)
    }

    override fun onBindViewHolder(holder: VentaViewHolder, position: Int) {
        val venta = listaVentas[position]

        holder.tvVentaId.text = "ID: ${venta.id}"
        holder.tvFecha.text = "Fecha: ${venta.fecha_venta}"
        holder.tvEstadoPago.text = "Pago: ${venta.estado_pago}"
        holder.tvTipoVenta.text = "Tipo: ${venta.tipo_venta}"
        holder.tvTotal.text = "Total: $${venta.total_venta}"
        holder.tvComentario.text = "Comentario: ${venta.comentarios ?: "N/A"}"
        holder.tvClienteId.text = "Cliente ID: ${venta.clientes_id}"

        holder.btnEditar.setOnClickListener {
            val intent = Intent(context, VentaActivity::class.java).apply {
                putExtra("venta_id", venta.id ?: -1)
                putExtra("estado_pago", venta.estado_pago)
                putExtra("tipo_venta", venta.tipo_venta)
                putExtra("total_venta", venta.total_venta)
                putExtra("comentarios", venta.comentarios)
                putExtra("clientes_id", venta.clientes_id)
            }
            context.startActivity(intent)
        }

        holder.btnVerDetalle.setOnClickListener {
            val intent = Intent(context, ListaDetalleVentaActivity::class.java)
            intent.putExtra("VENTA_ID", venta.id ?: -1)
            context.startActivity(intent)
        }
    }

    override fun getItemCount(): Int = listaVentas.size
}