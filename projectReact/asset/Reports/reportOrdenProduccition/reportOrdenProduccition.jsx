/* eslint-disable react/prop-types */
import React from "react"; 
import { StyleSheet, View, Text, Page, Document, Image } from "@react-pdf/renderer";
import logosena from "../../img/logosena.png";


const styles = StyleSheet.create({
  page: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 2,
  },
  dateText: {
    fontSize: 10,
    textAlign: "left",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
    minHeight: 20 
  },
  tableCell: {
    padding: 5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    flex: 1,
    flexWrap: "wrap", 
    wordBreak: "break-word",  
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  tableText: {
    fontSize: 7,
  },
  tableTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
    textAlign: "center",
  },
  titleLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "100%",
    marginTop: 5,
  }
});

// eslint-disable-next-line react/prop-types
const ReportOrdenProduccion = ({ orden_de_produccion }) => {
   if (!Array.isArray(orden_de_produccion)) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text>No hay datos de producción disponibles.</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.headerContainer}>
          <Image src={logosena} style={styles.icon} />
          <Text style={styles.headerText}>Sena</Text>
          <Text style={styles.headerText}>tramada tejidos</Text>
          <Text style={styles.dateText}>Fecha: {new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.table}>
        <Text style={styles.tableTitle}>orden de produccion</Text> 
        <View style={styles.titleLine} />
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.tableText]}>ID</Text>
            <Text style={[styles.tableCell, styles.tableText]}>Fecha Entrega</Text>
            <Text style={[styles.tableCell, styles.tableText]}>Cantidad Solicitada</Text>
            <Text style={[styles.tableCell, styles.tableText]}>Cantidad Insumo</Text>
            <Text style={[styles.tableCell, styles.tableText]}>Email usuario</Text>
            <Text style={[styles.tableCell, styles.tableText]}>Anotaciones</Text>
            <Text style={[styles.tableCell, styles.tableText]}>Estado</Text>
            <Text style={[styles.tableCell, styles.tableText]}>Insumos</Text>
            <Text style={[styles.tableCell, styles.tableText]}>Producto</Text>
          </View>


          {orden_de_produccion.map((odp,) => (
            <View key={odp.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableText]}>{odp.id}</Text>
              <Text style={[styles.tableCell, styles.tableText]}>{odp.fecha_entrega ? new Date(odp.fecha_entrega).toLocaleDateString() : "N/A"}</Text>
              <Text style={[styles.tableCell, styles.tableText]}>{odp.cantidad_productos_solicitada}</Text>
              <Text style={[styles.tableCell, styles.tableText]}>{odp.cantidad_insumo_necesaria}</Text>
              <Text style={[styles.tableCell, styles.tableText]}>{odp.nombre_usuario.length > 25 
                ? odp.nombre_usuario.slice(0, 25) + "..." 
               : odp.nombre_usuario}
              </Text>
              <Text style={[styles.tableCell, styles.tableText]}>{odp.anotaciones || "N/A"}</Text>
              <Text style={[styles.tableCell, styles.tableText]}>{odp.estado_orden}</Text>
              <Text style={[styles.tableCell, styles.tableText]}>{odp.nombre_insumo}</Text>
              <Text style={[styles.tableCell, styles.tableText]}>{odp.nombre_producto}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ReportOrdenProduccion;

