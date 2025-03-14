import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import "./RobotList.css";
import robotBanner from "../robot_ini.png";

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
        <img src={robotBanner} alt="robots" className="robot-banner" />
      </div>

      <div className="row">
        <div className="col-md-8">
          <table className="table table-bordered table-striped table-hover text-center shadow-sm">
            <thead className="table-dark">
              <tr>
                <th><FormattedMessage id="table.id" /></th>
                <th><FormattedMessage id="table.name" /></th>
                <th><FormattedMessage id="table.model" /></th>
                <th><FormattedMessage id="table.company" /></th>
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
                  className="robot-img mb-3 d-block mx-auto"
                />
                <ul className="list-unstyled small">
                  <li>
                    <strong>→ <FormattedMessage id="detail.year" />:</strong> {selectedRobot.añoFabricacion}
                  </li>
                  <li>
                    <strong>→ <FormattedMessage id="detail.cpu" />:</strong> {selectedRobot.capacidadProcesamiento}
                  </li>
                  <li>
                    <strong>→ <FormattedMessage id="detail.humor" />:</strong> {selectedRobot.humor}
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
