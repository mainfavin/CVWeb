import SliderVertical from "./components/SliderVertical";
import FabMenu from "./components/FabMenu";

export default function App() {
  const images = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
  ];

  return (
    <main style={{ background: "#0e0e0e", color: "#fff", height: "100vh", overflow: "hidden" }}>
      <FabMenu shape="squircle" />
      <SliderVertical
        images={images}
        wheelMult={1.0}
        dragMult={1.2}
        friction={0.95}
        parallax={0.42}
        baseDrift={0.08}
      />
    </main>
  );
}
