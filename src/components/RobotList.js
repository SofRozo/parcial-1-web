import React, { useEffect, useState } from "react";
import "./RobotList.css";

function RobotList() {
  const [robots, setRobots] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/robots")
      .then((response) => response.json())
      .then((data) => setRobots(data))
      .catch((error) => console.error("Error al cargar robots:", error));
  }, []);

  const handleRobotClick = (robotId) => {
    fetch(`http://localhost:3001/robots/${robotId}`)
      .then((res) => res.json())
      .then((data) => setSelectedRobot(data))
      .catch((err) => {
        console.error("Error al obtener detalle del robot:", err);
        setSelectedRobot(null);
      });
  };

  const fixImageUrl = (url) => {
    if (!url) return '';
    if (!url.includes('github.com')) return url;
    return url.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
  };

  return (
    <div className="container my-5">
      <div className="bg-danger-subtle p-3 mb-4 rounded text-center">
        <img
          src="https://www.shutterstock.com/image-vector/set-cute-vintage-robots-banner-260nw-746786869.jpg"
          alt="robots"
          className="img-fluid"
        />
      </div>

      <div className="row">
        {/* Tabla */}
        <div className="col-md-8">
          <table className="table table-bordered table-striped table-hover text-center shadow-sm">
            <thead className="table-dark">
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

        {/* Detalle a la derecha */}
        <div className="col-md-4">
          {selectedRobot && (
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title text-center fw-bold mb-3">
                  {selectedRobot.nombre}
                </h5>
                <img
                  src={fixImageUrl(selectedRobot.imagen)}
                  alt={selectedRobot.nombre}
                  className="img-fluid mb-3"
                />
                <ul className="list-unstyled small">
                  <li>
                    <strong>→ Año de Fabricación:</strong>{" "}
                    {selectedRobot.añoFabricacion}
                  </li>
                  <li>
                    <strong>→ Capacidad de Procesamiento:</strong>{" "}
                    {selectedRobot.capacidadProcesamiento}
                  </li>
                  <li>
                    <strong>→ Humor:</strong> {selectedRobot.humor}
                  </li>
                  <li className="text-muted">{selectedRobot.description}</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RobotList;
