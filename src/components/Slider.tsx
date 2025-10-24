import { useEffect, useRef } from "react";
import Core  from "smooothy";

export default function SliderComponent() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<Core | null>(null);
    
    useEffect(() => {

        if(!wrapperRef.current) return;

        sliderRef.current = new Core(wrapperRef.current, { snap: true, infinite: true})

    //Example of using a method from the Slider class
    sliderRef.current = new Core(wrapperRef.current, {
      snap: true,
      infinite: false
    });
    const animate = () => {
        sliderRef.current?.update();
        requestAnimationFrame(animate);
    };
    animate();

    return () => {
        sliderRef.current?.destroy();
    };

    }, []);

    return (
        <div style={{marginTop: "3rem"}}>
            <h3>Mis Proyectos</h3>
            <div
        ref={wrapperRef}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          width: "100%",
          maxWidth: "1200px",
          margin: "2rem auto",
          gap: "1rem",
          padding: "1rem 10vw",
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          cursor: "grab",
        }}
      >
                    <div style={{width:"400px", height:"300px", background: "#6a5acd", borderEndEndRadius:"12px" }}> Proyecto 1</div>
                    <div style={{width:"400px", height:"300px", background: "#63af93", borderEndEndRadius:"12px" }}> Proyecto 2</div>
                    <div style={{width:"400px", height:"300px", background: "#dcab14", borderEndEndRadius:"12px" }}> Mi curriculum</div>
                    <div style={{width:"400px", height:"300px", background: "#e07b91", borderEndEndRadius:"12px" }}> Proyecto 4</div>
                    <div style={{width:"400px", height:"300px", background: "#4a90e2", borderEndEndRadius:"12px" }}> Proyecto 5</div>
                    <div style={{width:"400px", height:"300px", background: "#d14a4a", borderEndEndRadius:"12px" }}> Proyecto 6</div>
                    <div style={{width:"400px", height:"300px", background: "#6a5acd", borderEndEndRadius:"12px" }}> Proyecto 1</div>
                    <div style={{width:"400px", height:"300px", background: "#63af93", borderEndEndRadius:"12px" }}> Proyecto 2</div>
                    <div style={{width:"400px", height:"300px", background: "#dcab14", borderEndEndRadius:"12px" }}> Mi curriculum</div>
                    <div style={{width:"400px", height:"300px", background: "#e07b91", borderEndEndRadius:"12px" }}> Proyecto 4</div>
                    <div style={{width:"400px", height:"300px", background: "#4a90e2", borderEndEndRadius:"12px" }}> Proyecto 5</div>
                    <div style={{width:"400px", height:"300px", background: "#d14a4a", borderEndEndRadius:"12px" }}> Proyecto 6</div>
                                
                </div>

        </div>


    );
}
