import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8000/api/login.php";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.alert_message || "Hubo un error en la solicitud.");
      }

      setMessage(data.alert_message);

      switch (data.redirect) {
        case 'dashboard':
            navigate('/dashboard');
            break;

        case 'change-password':
            navigate('/change-password');
            break;

        case 'login':
            navigate('/login');
            break;

        default:
            setMessage('No se pudo procesar la solicitud. Inténtalo de nuevo más tarde.')
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
          <strong>Inicia sesión en tu cuenta de AdamoServices</strong>
        </p>
        <p>Ingresa tus credenciales a continuación para continuar:</p>

        <form onSubmit={handleLogin} id="form-login" autoComplete="off">
          <div className="form-field">
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              required
            ></input>
          </div>

          <div className="form-field">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              required
            ></input>
          </div>

          <p>
            ¿No tienes una cuenta? <a href="/register">Haz clic aquí</a>
          </p>

          <input
            type="submit"
            className="login-button"
            value={loading ? "Iniciando sesión..." : "Iniciar sesión"}
            disabled={loading}
          ></input>

          {message && <p className="login-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
