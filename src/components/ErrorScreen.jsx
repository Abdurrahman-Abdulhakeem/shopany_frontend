import { useNavigate } from "react-router-dom";

function ErrorScreen() {
  const navigate = useNavigate();

  return (
    <div className="error-screen">
      <div>
        <h1>Oops! You are beyond our pages,</h1>
        <p onClick={() => navigate(-1)}>Go back...</p>
      </div>
    </div>
  );
}

export default ErrorScreen;
