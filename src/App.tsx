import FabMenu from "./components/FabMenu";
import SliderVertical from "./components/SliderVertical";

function App() {
  const images = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
  ];

  return (
    <main style={{ background: "#0e0e0e",color: "#fff", height: "100vh", overflow: "hidden" }}>
      <FabMenu />
      <SliderVertical       
        images={images}
        wheelMult={0.25}
        dragMult={0.25}
        friction={0.96} />
    </main>
  );
}

export default App;
