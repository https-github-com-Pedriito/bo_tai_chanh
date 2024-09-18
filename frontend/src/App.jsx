import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Menu from "./components/Menu";
import Footer from "./components/footer"

function App() {
  return (
    <div className="overflow-x-hidden overflow-y-hidden"> {/* Évite le défilement horizontal et vertical non désiré */}
      <header className="w-screen bg-transparent"> {/* Enlève tout fond pour vérifier l'espace */}
        <Navbar />
      </header>
      <main className="m-0 p-0"> {/* Enlève les marges et le padding par défaut */}
        {/* Section About avec un dégradé de vert, occupant toute la largeur */}
        <section className="w-screen bg-black" >
          <About />
        </section>
        {/* Section Menu avec un arrière-plan noir, occupant toute la largeur */}
        <section className="w-screen bg-white text-white ">
          <Menu />
        </section>
      </main>
      <Footer/>
    </div>
  );
}

export default App;