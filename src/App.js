import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrView from "./components/PrView";

function App() {
  return (
    <div className="git-page-container">
      <Header />
      <PrView/>
      <Footer/>
    </div>
  );
}

export default App;
