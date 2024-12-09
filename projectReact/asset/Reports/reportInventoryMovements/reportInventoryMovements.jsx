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
});


const InventoryMovementsPDF = ({ inventoryList }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.headerContainer}>
          <Image src={logosena} style={styles.icon} />
          <Text style={styles.headerText}>Sena</Text>
          <Text style={styles.dateText}>Fecha: {new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.table}>

          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.tableText]}>ID</Text>
            <Text style={[styles.tableCell, styles.tableText]}>Tipo de Movimiento</Text>
            <Text style={[styles.tableCell, styles.tableText]}>Cantidad</Text>
            <Text style={[styles.tableCell, styles.tableText]}>Fecha de Movimiento</Text>
            <Text style={[styles.tableCell, styles.tableText]}>Motivo</Text>
            <Text style={[styles.tableCell, styles.tableText]}>Insumos</Text>
            <Text style={[styles.tableCell, styles.tableText]}>Producto</Text>
          </View>


          {inventoryList.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableText]}>{item.id}</Text>
              <Text style={[styles.tableCell, styles.tableText]}>{item.tipo_movimiento}</Text>
              <Text style={[styles.tableCell, styles.tableText]}>{item.cantidad}</Text>
              <Text style={[styles.tableCell, styles.tableText]}>
                {new Date(item.fecha_movimiento).toLocaleDateString()}
              </Text>
              <Text style={[styles.tableCell, styles.tableText]}>{item.motivo || "N/A"}</Text>
              <Text style={[styles.tableCell, styles.tableText]}>{item.insumos_id}</Text>
              <Text style={[styles.tableCell, styles.tableText]}>{item.producto_id}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default InventoryMovementsPDF;