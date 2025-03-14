import React, { useEffect, useState } from "react";
import "./RobotList.css";

function RobotList() {
  const [robots, setRobots] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState(null);

  // 🔁 Cargar listado de robots desde el backend
  useEffect(() => {
    fetch("http://localhost:3001/robots")
      .then((response) => response.json())
      .then((data) => setRobots(data))
      .catch((error) => console.error("Error al cargar robots:", error));
  }, []);

  // 🧠 Función para cargar detalle desde /robots/:id
  const handleRobotClick = (robotId) => {
    fetch(`http://localhost:3001/robots/${robotId}`)
      .then((res) => res.json())
      .then((data) => setSelectedRobot(data))
      .catch((err) => {
        console.error("Error al obtener detalle del robot:", err);
        setSelectedRobot(null);
      });
  };

  return (
    <div className="container robot-panel">
      <h1 className="text-center title">Adopta un Robot con Robot Lovers!</h1>

      <div className="banner-container">
        <img
          src="https://www.shutterstock.com/image-vector/set-cute-vintage-robots-banner-260nw-746786869.jpg"
          alt="robots"
          className="robot-banner"
        />
      </div>

      <div className="row mt-4">
        {/* Tabla */}
        <div className="col-md-8">
          <table className="table table-bordered table-striped table-hover text-center">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Modelo</th>
                <th>Empresa Fabricante</th>
              </tr>
            </thead>
            <tbody>
              {robots.map((robot) => (
                <tr
                  key={robot.id}
                  onClick={() => handleRobotClick(robot.id)}
                  className="clickable-row"
                >
                  <td>{robot.id}</td>
                  <td>{robot.nombre}</td>
                  <td>{robot.modelo}</td>
                  <td>{robot.empresaFabricante}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detalle */}
        <div className="col-md-4">
          {selectedRobot && (
            <div className="robot-detail-card">
              <h4 className="text-center">{selectedRobot.nombre}</h4>
              <img
                src={selectedRobot.imagen}
                alt={selectedRobot.nombre}
                className="img-fluid robot-img"
              />
              <ul className="robot-info">
                <li><strong>→ Año de Fabricación:</strong> {selectedRobot.añoFabricacion}</li>
                <li><strong>→ Capacidad de Procesamiento:</strong> {selectedRobot.capacidadProcesamiento}</li>
                <li><strong>→ Humor:</strong> {selectedRobot.humor}</li>
                <li>{selectedRobot.description}</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <footer className="footer text-center mt-4">
        <p>Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers</p>
      </footer>
    </div>
  );
}

export default RobotList;
