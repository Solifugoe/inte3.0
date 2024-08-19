import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig/firebase";

import "../graficas/grafpage.css";

ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.responsive = true;

export const Grafpage = () => {
  const [selectedChart, setSelectedChart] = useState("line");
  const [emotionsData, setEmotionsData] = useState([]);

  useEffect(() => {
    const emotionsRef = ref(database, 'datos_usuario/user_001/history');

    onValue(emotionsRef, (snapshot) => {
      const data = snapshot.val();
      const formattedData = [];
      if (data) {
        Object.keys(data).forEach((key) => {
          const entry = data[key];
          const index = formattedData.findIndex(x => x.emocion === entry.emocion);
          if (index === -1) {
            formattedData.push({ emocion: entry.emocion, veces: 1 });
          } else {
            formattedData[index].veces += 1;
          }
        });
      }
      // Convertir todos los valores a enteros
      const integerData = formattedData.map(item => ({
        emocion: item.emocion,
        veces: Math.floor(item.veces), // Usar Math.floor() para redondear hacia abajo
      }));
      setEmotionsData(integerData);
    });
  }, []);

  const renderChart = () => {
    switch (selectedChart) {
      case "line":
        return (
          <Line
            data={{
              labels: emotionsData.map((data) => data.emocion),
              datasets: [
                {
                  label: "Veces",
                  data: emotionsData.map((data) => data.veces),
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  borderColor: "#064FF0",
                },
              ],
            }}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function(tooltipItem) {
                      return tooltipItem.label + ': ' + Math.floor(tooltipItem.raw); // Formatea el valor como entero
                    }
                  }
                }
              },
              scales: {
                y: {
                  ticks: {
                    callback: function(value) {
                      return Math.floor(value); // Asegúrate de que el valor en el eje Y sea un entero
                    }
                  }
                }
              }
            }}
          />
        );
      case "bar":
        return (
          <Bar
            data={{
              labels: emotionsData.map((data) => data.emocion),
              datasets: [
                {
                  label: "Veces",
                  data: emotionsData.map((data) => data.veces),
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(253, 135, 135, 0.8)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function(tooltipItem) {
                      return tooltipItem.label + ': ' + Math.floor(tooltipItem.raw); // Formatea el valor como entero
                    }
                  }
                }
              },
              scales: {
                y: {
                  ticks: {
                    callback: function(value) {
                      return Math.floor(value); // Asegúrate de que el valor en el eje Y sea un entero
                    }
                  }
                }
              }
            }}
          />
        );
      case "doughnut":
        return (
          <Doughnut
            data={{
              labels: emotionsData.map((data) => data.emocion),
              datasets: [
                {
                  data: emotionsData.map((data) => data.veces),
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(253, 135, 135, 0.8)",
                  ],
                },
              ],
            }}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function(tooltipItem) {
                      return tooltipItem.label + ': ' + Math.floor(tooltipItem.raw); // Formatea el valor como entero
                    }
                  }
                }
              }
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="dataCard">{renderChart()}</div>
      <div className="buttonContainer">
        <button onClick={() => setSelectedChart("line")}>Linea</button>
        <button onClick={() => setSelectedChart("bar")}>Barras</button>
        <button onClick={() => setSelectedChart("doughnut")}>Pastel</button>
      </div>
    </div>
  );
};

export default Grafpage;
