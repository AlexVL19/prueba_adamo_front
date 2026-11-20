import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8000/api/register.php";

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
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
          setMessage(
            data.alert_message,
          );
      }
    } catch (error) {
      setMessage(
        error.message || "No ha sido posible conectar con el servidor.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <aside className="logo-container">
        <img src="./src/assets/adamo-logo.png" className="adamo-logo"></img>
        <p>Tus procesos más eficientes, seguros y sin fricciones.</p>
        <div className="description-text">
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beata.
          </p>
        </div>
      </aside>

      <div className="login-container">
        <p>
          <strong>Crea una cuenta de AdamoServices</strong>
        </p>
        <p>Ingresa tus datos personales</p>

        <form onSubmit={handleRegister} id="form-register" autoComplete="off">
          <div className="form-field">
            <input
              type="text"
              name="names"
              placeholder="Nombres"
              required
            ></input>
          </div>
          <div className="form-field">
            <input
              type="text"
              name="last_names"
              placeholder="Apellidos"
              required
            ></input>
          </div>
          <div className="form-field">
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              required
            ></input>
          </div>

          <p>
            Tu contraseña temporal llegará al correo electrónico que hayas
            asignado.
          </p>

          <input
            type="submit"
            className="login-button"
            value={loading ? "Creando..." : "Crear cuenta"}
            disabled={loading}
          ></input>

          {message && <p className="login-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
