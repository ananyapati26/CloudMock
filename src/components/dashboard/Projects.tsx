import ProjectCard from "../common/ProjectCard";

export default function ProjectsCards(): React.ReactNode {
  return (
    <div className="flex flex-row flex-wrap justify-start items-start gap-4">
      <ProjectCard
        id={1}
        name="Linktree"
        desc="An app to dynamically your links and showcase it"
        endpoints={5}
      />
      <ProjectCard
        id={2}
        name="Interview Ace"
        desc="A platform to to practice mock interview on any topic"
        endpoints={5}
      />
      <ProjectCard
        id={3}
        name="Linktree"
        desc="An app to dynamically your links and showcase it"
        endpoints={5}
      />
      <ProjectCard
        id={4}
        name="Interview Ace"
        desc="A platform to to practice mock interview on any topic"
        endpoints={5}
      />
    </div>
  );
}
