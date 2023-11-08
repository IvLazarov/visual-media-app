import { Link } from "react-router-dom";
import './ErrorPage.scss';

const ErrorPage = () => {
  return (
    <div className="error">
      <h2>404! Page not found!</h2>
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default ErrorPage;
