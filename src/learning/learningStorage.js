export const LEARNING_STORAGE_KEY = "runtimecode.learning-overrides.v1";

export function readLearningOverrides() {
  try {
    const saved = window.localStorage.getItem(LEARNING_STORAGE_KEY);
    if (!saved) return { overrides: [], error: "" };

    const overrides = JSON.parse(saved);
    if (
      !Array.isArray(overrides) ||
      overrides.some(
        (item) =>
          !item ||
          typeof item.topic !== "string" ||
          typeof item.slug !== "string"
      )
    ) {
      throw new Error("Saved learning content has an unexpected format.");
    }
    return { overrides, error: "" };
  } catch (error) {
    return {
      overrides: [],
      error: `Could not load learning content saved in this browser: ${error.message}`,
    };
  }
}

export function mergeLearningContent(topic, baseContent, overrides) {
  const contentByKey = new Map(
    baseContent.map((item) => [`${topic}/${item.slug}`, { ...item, topic }])
  );
  overrides
    .filter((item) => item.topic === topic)
    .forEach((item) => {
      contentByKey.set(`${topic}/${item.slug}`, item);
    });
  return Array.from(contentByKey.values()).sort((first, second) => {
    const firstDate = Date.parse(first.updatedAt || first.createdAt || "");
    const secondDate = Date.parse(second.updatedAt || second.createdAt || "");
    if (Number.isFinite(firstDate) && Number.isFinite(secondDate)) {
      return secondDate - firstDate;
    }
    if (Number.isFinite(firstDate)) return -1;
    if (Number.isFinite(secondDate)) return 1;
    return first.title.localeCompare(second.title);
  });
}

export function saveLearningOverrides(overrides) {
  try {
    window.localStorage.setItem(LEARNING_STORAGE_KEY, JSON.stringify(overrides));
    return "";
  } catch (error) {
    return `Could not save learning content in this browser: ${error.message}`;
  }
}

export function createLearningModule(content) {
  const exportContent = content.map(({ topic, ...item }) => ({
    ...item,
    visible: item.visible !== false,
  }));
  return `const content = ${JSON.stringify(exportContent, null, 2)};\n\nexport default content;\n`;
}
