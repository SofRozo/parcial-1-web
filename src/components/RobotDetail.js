import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './RobotDetail.css';

function RobotDetail() {
  const { robotId } = useParams();
  const [robot, setRobot] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/robots.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los detalles del robot");
        }
        return response.json();
      })
      .then((data) => {
        const foundRobot = data.find((r) => r.id === parseInt(robotId));
        setRobot(foundRobot);
      })
      .catch((error) => setError(error.message));
  }, [robotId]);

  if (error) return <div className="text-danger text-center mt-4">Error: {error}</div>;
  if (!robot) return <div className="text-center mt-4">Cargando detalles del robot...</div>;

  return (
    <div className="container mt-4 robot-detail-page">
      <h1 className="text-center title">Adopta un Robot con Robot Lovers!</h1>

      <div className="banner-container">
        <img
          src="https://www.shutterstock.com/image-vector/set-cute-vintage-robots-banner-260nw-746786869.jpg"
          alt="robots"
          className="robot-banner"
        />
      </div>

      <div className="row mt-4">
        <div className="col-md-8">
          {/* Aquí puedes reutilizar la tabla de lista si quieres */}
          <p className="text-muted">Puedes volver atrás para ver todos los robots.</p>
        </div>

        <div className="col-md-4">
          <div className="robot-detail-card">
            <h4 className="text-center">{robot.nombre}</h4>
            <img src={robot.imagen} alt={robot.nombre} className="img-fluid robot-img" />
            <ul className="robot-info">
              <li><strong>→ Año de Fabricación:</strong> {robot.añoFabricacion}</li>
              <li><strong>→ Capacidad de Procesamiento:</strong> {robot.capacidadProcesamiento}</li>
              <li><strong>→ Humor:</strong> {robot.humor}</li>
              <li>{robot.description}</li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="footer text-center mt-4">
        <p>Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers</p>
      </footer>
    </div>
  );
}

export default RobotDetail;
