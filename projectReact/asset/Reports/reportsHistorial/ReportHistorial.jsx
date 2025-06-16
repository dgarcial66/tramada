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
  },
  tableCell: {
    padding: 5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    flex: 1,
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  tableText: {
    fontSize: 10,
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
const ReportHistorial = ({ HistoricalPricesMaterialsList = [], historicalPricesList = [], filter = "all" }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.headerContainer}>
          <Image src={logosena} style={styles.icon} />
          <Text style={styles.headerText}>Sena</Text>
          <Text style={styles.headerText}>tramada tejidos</Text>
          <Text style={styles.dateText}>Fecha: {new Date().toLocaleDateString()}</Text>
        </View>


        {filter === "all" || filter === "materials" ? (
  <View style={styles.table}>
    <Text style={styles.tableTitle}>Historial de Precios de Insumos</Text> 
    <View style={styles.titleLine} />
    <View style={[styles.tableRow, styles.tableHeader]}>
      <Text style={[styles.tableCell, styles.tableText]}>ID</Text>
      <Text style={[styles.tableCell, styles.tableText]}>Nombre Insumo</Text>
      <Text style={[styles.tableCell, styles.tableText]}>Precio Insumo</Text>
      <Text style={[styles.tableCell, styles.tableText]}>Fecha Registrada</Text>
    </View>

    {HistoricalPricesMaterialsList.map((val) => (
      <View key={val.id} style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.tableText]}>{val.id}</Text>
        <Text style={[styles.tableCell, styles.tableText]}>{val.nombre_insumo}</Text>
        <Text style={[styles.tableCell, styles.tableText]}>{val.precio_insumo}</Text>
        <Text style={[styles.tableCell, styles.tableText]}>{new Date(val.fecha_historial).toLocaleDateString()}</Text>
      </View>
    ))}
  </View>
) : null}



{filter === "all" || filter === "products" ? (
  <View style={styles.table}>
    <Text style={styles.tableTitle}>Historial de Precios de Productos</Text> 
    <View style={styles.titleLine} />
    <View style={[styles.tableRow, styles.tableHeader]}>
      <Text style={[styles.tableCell, styles.tableText]}>ID</Text>
      <Text style={[styles.tableCell, styles.tableText]}>Nombre Producto</Text> 
      <Text style={[styles.tableCell, styles.tableText]}>Precio Producto</Text>
      <Text style={[styles.tableCell, styles.tableText]}>Fecha Registrada</Text>
    </View>

    {historicalPricesList.map((val) => (
      <View key={val.id} style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.tableText]}>{val.id}</Text>
        <Text style={[styles.tableCell, styles.tableText]}>{val.nombre_producto}</Text> 
        <Text style={[styles.tableCell, styles.tableText]}>{val.precios_producto}</Text>
        <Text style={[styles.tableCell, styles.tableText]}>{new Date(val.fecha_historial).toLocaleDateString()}</Text>
      </View>
    ))}
  </View>
) : null}

      </Page>
    </Document>
  );
};

export default ReportHistorial;

