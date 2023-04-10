import "./App.css";
import Routes from './routes/Routes'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <ToastContainer />
   <Routes />
   </>
  );
}

export default App;
