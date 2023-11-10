import { Link } from "react-router-dom";
import './ErrorPage.scss';

function ErrorPage () {
  return (
    <div className="error">
      <h2>404! Page not found!</h2>
      <Link to={"/"}>Home</Link>
    </div>
  );
}

export default ErrorPage;
