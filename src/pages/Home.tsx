import VerticalReel from "../components/VerticalReel";
import { projects } from "../data/projects";

export default function Home() {
  const items = projects.map(p => ({
    image: p.cover,
    title: p.title,
    subtitle: p.subtitle,
  }));

  const slugs = projects.map(p => p.slug);

  return <VerticalReel items={items} 
                    wheelMult={0.25}
                    dragMult={0.20}
                    friction={0.96}
                    slugs={slugs}/>;
}
