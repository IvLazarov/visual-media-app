import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h2>404! Page not found!</h2>
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default ErrorPage;
