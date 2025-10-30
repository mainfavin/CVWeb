type IconName = "instagram" | "linkedin" | "mail" | "github";

type IconProps = {
  name: IconName;
  size?: number;
  color?: string; // por defecto blanco
  title?: string;
};

export default function Icon({ name, size = 24, color = "#fff", title }: IconProps) {
  const url = `/images/icons/${name}.svg`;
  return (
    <span
      aria-hidden={title ? undefined : true}
      title={title}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: color,               // << el color del icono
        maskImage: `url(${url})`,
        WebkitMaskImage: `url(${url})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        verticalAlign: "middle",
      }}
    />
  );
}
