package com.example.tramada20.app.Adapter


import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.tramada20.R
import com.example.tramada20.app.models.Cliente
import com.example.tramada20.app.ui.MainActivity

class ClienteAdapter(private val clientes: List<Cliente>) :
    RecyclerView.Adapter<ClienteAdapter.ClienteViewHolder>() {

    class ClienteViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val nombre = itemView.findViewById<TextView>(R.id.tvNombreCliente)
        val telefono = itemView.findViewById<TextView>(R.id.tvTelefono)
        val direccion = itemView.findViewById<TextView>(R.id.tvDireccion)
        val tipoPago = itemView.findViewById<TextView>(R.id.tvTipoPago)
        val tipoCliente = itemView.findViewById<TextView>(R.id.tvTipoCliente)
        val btnEditar = itemView.findViewById<Button>(R.id.btnEditarCliente)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ClienteViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_cliente, parent, false)
        return ClienteViewHolder(view)
    }

    override fun onBindViewHolder(holder: ClienteViewHolder, position: Int) {
        val cliente = clientes[position]
        holder.nombre.text = "Nombre: ${cliente.nombre_cliente}"
        holder.telefono.text = "Teléfono: ${cliente.telefono_cliente}"
        holder.direccion.text = "Dirección: ${cliente.direccion_cliente}"
        holder.tipoPago.text = "Pago: ${cliente.tipo_pago}"
        holder.tipoCliente.text = "Tipo: ${cliente.tipo_cliente}"

        holder.btnEditar.setOnClickListener {
            val context = holder.itemView.context
            val intent = Intent(context, MainActivity::class.java)
            intent.putExtra("cliente_id", cliente.id)
            intent.putExtra("nombre", cliente.nombre_cliente)
            intent.putExtra("telefono", cliente.telefono_cliente)
            intent.putExtra("direccion", cliente.direccion_cliente)
            intent.putExtra("tipo_pago", cliente.tipo_pago)
            intent.putExtra("tipo_cliente", cliente.tipo_cliente)
            context.startActivity(intent)
        }
    }

    override fun getItemCount(): Int = clientes.size
}