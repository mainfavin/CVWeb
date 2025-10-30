import Core from "smooothy";

export class VerticalParallaxSlider extends Core {
  constructor(wrapper: HTMLElement) {
    super(wrapper, {
      snap: true,
      infinite: true,
    });

    // @ts-expect-error - tipos incompletos
    this.on("update", ({ current }) => {
      const slides = Array.from(this.wrapper.children) as HTMLElement[];
      slides.forEach((el, i) => {
        // cada slide se desplaza en eje Y según su índice y la posición actual
        const offset = (i * 100 - current) * 0.2;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    });
  }
}
