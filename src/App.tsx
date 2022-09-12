import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Loading from "./components/Loading/Loading";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container flex">
        <Loading />
      </div>
    </div>
  );
}

export default App;