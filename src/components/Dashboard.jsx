import { useNavigate } from "react-router-dom";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  const API_URL = "http://localhost:8000/api/logout.php";

  const handleLogout = async (e) => {
    e.preventDefault();

    const response = await fetch(API_URL, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.alert_message || "Hubo un error en la solicitud.");
    }

    switch (data.redirect) {
      case "login":
        navigate("/login");
        break;

      default:
        setMessage(data.alert_message);
    }
  };

  return (
    <div className="main-container">
      <aside className="dashboard-menu">
        <img
          src="./src/assets/adamo-logo.png"
          className="adamo-logo-small"
        ></img>
        <div className="dashboard-section">Clientes</div>
        <div className="dashboard-section">Mi perfil</div>
        <div className="dashboard-section" onClick={handleLogout}>
          Cerrar sesión
        </div>
      </aside>

      <div className="main-dashboard">
        <div className="preview">
          <strong>Adamo Pay</strong>
          <p>Gestión de pagos</p>
          <p>3.827 clientes</p>
          <button className="detail-button">Gestionar Clientes</button>
        </div>

        <div className="preview">
          <strong>Adamo ID</strong>
          <p>Verificación de identidad</p>
          <p>9.411 clientes</p>
          <button className="detail-button">Gestionar Clientes</button>
        </div>

        <div className="preview">
          <strong>Adamo Risk</strong>
          <p>Reducción de riesgos</p>
          <p>793 clientes</p>
          <button className="detail-button">Gestionar Clientes</button>
        </div>

        <div className="preview">
          <strong>Adamo Sign</strong>
          <p>Firma de documentos</p>
          <p>2.738 clientes</p>
          <button className="detail-button">Gestionar Clientes</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
