const projects = [
  {
    slug: "site-latency-monitor",
    category: "Network diagnostics",
    title: "Popular Site Latency Monitor",
    summary:
      "Compare live response-time estimates and reachability for popular sites, with a chart of recent checks.",
    updatedAt: "2026-10-27",
    type: "latency-monitor",
  },
  {
    slug: "conways-game-of-life",
    category: "Interactive simulation",
    title: "Conway's Game of Life",
    summary:
      "Set up a grid, place cells by hand or at random, and watch a cellular automaton evolve one generation at a time.",
    updatedAt: "2026-10-18",
    type: "game-of-life",
  },
];

export function sortProjectsNewestFirst(items) {
  return items
    .map((project, index) => ({ project, index }))
    .sort((first, second) => {
      const firstDate = Date.parse(first.project.updatedAt || "");
      const secondDate = Date.parse(second.project.updatedAt || "");
      const firstHasDate = Number.isFinite(firstDate);
      const secondHasDate = Number.isFinite(secondDate);

      if (firstHasDate && secondHasDate) {
        return secondDate - firstDate || first.index - second.index;
      }
      if (firstHasDate) return -1;
      if (secondHasDate) return 1;
      return first.index - second.index;
    })
    .map(({ project }) => project);
}

export default projects;
