import Core, {damp} from "smooothy";

export class Slider extends Core {
    constructor(wrapper: HTMLElement, config?: Record<string, unknown>) {
        super(wrapper, config);
    
        //Create UI here
    }

    doSomething() {
        console.log("Doing something");
    }

    update(): void {
        super.update();
        //Custom update logic here
    }
}

export class ParallaxSlider extends Core {
    private scale: number = 1;

    constructor(wrapper:HTMLElement,config?: Record<string, unknown>) {
        super(wrapper,config);
    
        //Create UI here
        //@ts-expect-error smooothy no tiene tipos completos
        this.on("update", ({ progress }: { progress: number, deltaTime: number }) => {
            const target = Math.abs(progress % 1) - 0.5 * 0.3;
            this.scale = damp(this.scale, target, 0.8, 0.1); // Assuming deltaTime ~16ms/frame
            this.wrapper.style.transform = `scale(${this.scale})`;
        });
    }

    doSomething() {
        console.log("Doing something");
    }

    update(): void {
        super.update();
        //Custom update logic here
    }
}
