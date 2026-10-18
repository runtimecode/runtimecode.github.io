export const ARTICLE_STORAGE_KEY = "runtimecode.article-overrides.v1";

export function readArticleOverrides() {
  try {
    const saved = window.localStorage.getItem(ARTICLE_STORAGE_KEY);
    if (!saved) {
      return { overrides: [], error: "" };
    }

    const overrides = JSON.parse(saved);
    if (
      !Array.isArray(overrides) ||
      overrides.some((article) => !article || typeof article.slug !== "string")
    ) {
      throw new Error("Saved article data has an unexpected format.");
    }

    return { overrides, error: "" };
  } catch (error) {
    return {
      overrides: [],
      error: `Could not load local article drafts: ${error.message}`,
    };
  }
}

export function mergeArticleOverrides(baseArticles, overrides) {
  const articlesBySlug = new Map(baseArticles.map((article) => [article.slug, article]));
  overrides.forEach((article) => {
    articlesBySlug.set(article.slug, article);
  });
  return Array.from(articlesBySlug.values());
}

export function sortArticlesNewestFirst(articles) {
  return articles
    .map((article, index) => ({ article, index }))
    .sort((first, second) => {
      const firstDate = Date.parse(first.article.updatedAt || first.article.createdAt || "");
      const secondDate = Date.parse(second.article.updatedAt || second.article.createdAt || "");
      const firstHasDate = Number.isFinite(firstDate);
      const secondHasDate = Number.isFinite(secondDate);

      if (firstHasDate && secondHasDate) {
        return secondDate - firstDate || first.index - second.index;
      }
      if (firstHasDate) return -1;
      if (secondHasDate) return 1;
      return first.index - second.index;
    })
    .map(({ article }) => article);
}

export function saveArticleOverrides(overrides) {
  try {
    window.localStorage.setItem(ARTICLE_STORAGE_KEY, JSON.stringify(overrides));
    return "";
  } catch (error) {
    return `Could not save article drafts in this browser: ${error.message}`;
  }
}

export function createArticleModule(articles) {
  const exportArticles = articles.map((article) => ({
    ...article,
    visible: article.visible !== false,
  }));
  return `const articles = ${JSON.stringify(exportArticles, null, 2)};\n\nexport default articles;\n`;
}
