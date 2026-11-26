import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  getAcademyTracks,
  getAllLessons,
  getLessonBySlug,
  getTrackById,
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  getYouTubeWatchUrl,
} from "../app/lib/academy";
import { dictionaries } from "../app/lib/profile-translations";
import { translateTag } from "../app/lib/tags";
import { resolvePostForLocale, type BlogPost } from "../app/lib/blog";

function collectLeafKeyPaths(obj: unknown, prefix = ""): string[] {
  if (Array.isArray(obj)) {
    return [prefix];
  }
  if (obj && typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>);
    return entries.flatMap(([k, v]) => collectLeafKeyPaths(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

describe("Academy catalog & integrity", () => {
  const tracks = getAcademyTracks();
  const lessons = getAllLessons();
  const blogDir = path.resolve(process.cwd(), "app/content/blog");

  it("defines 4 tracks with complete EN and pt-BR copy", () => {
    expect(tracks.length).toBe(4);
    const ids = new Set<string>();
    for (const track of tracks) {
      expect(ids.has(track.id)).toBe(false);
      ids.add(track.id);
      expect(track.title.en.trim().length).toBeGreaterThan(0);
      expect(track.title["pt-BR"].trim().length).toBeGreaterThan(0);
      expect(track.description.en.trim().length).toBeGreaterThan(0);
      expect(track.description["pt-BR"].trim().length).toBeGreaterThan(0);
    }
  });

  it("has unique lesson slugs, valid track links, and bilingual fields", () => {
    const slugs = new Set<string>();
    for (const lesson of lessons) {
      expect(slugs.has(lesson.slug)).toBe(false);
      slugs.add(lesson.slug);
      expect(getTrackById(lesson.trackId)).toBeDefined();
      expect(getLessonBySlug(lesson.slug)?.slug).toBe(lesson.slug);
      expect(lesson.estimatedMinutes).toBeGreaterThan(0);
      expect(lesson.title.en.trim().length).toBeGreaterThan(0);
      expect(lesson.title["pt-BR"].trim().length).toBeGreaterThan(0);
      expect(lesson.summary.en.trim().length).toBeGreaterThan(0);
      expect(lesson.summary["pt-BR"].trim().length).toBeGreaterThan(0);
      expect(lesson.outcomes.en.length).toBeGreaterThan(0);
      expect(lesson.outcomes["pt-BR"].length).toBe(lesson.outcomes.en.length);
      expect(lesson.chapters.en.length).toBeGreaterThan(0);
      expect(lesson.chapters["pt-BR"].length).toBe(lesson.chapters.en.length);
      expect(lesson.tags.length).toBeGreaterThan(0);
    }
  });

  it("references existing markdown blueprints in relatedBlogSlugs", () => {
    for (const lesson of lessons) {
      expect(lesson.relatedBlogSlugs.length).toBeGreaterThan(0);
      for (const blogSlug of lesson.relatedBlogSlugs) {
        const mdPath = path.join(blogDir, `${blogSlug}.md`);
        expect(fs.existsSync(mdPath)).toBe(true);
      }
    }
  });

  it("enforces valid YouTube metadata for published lessons and privacy-enhanced embed URLs", () => {
    for (const lesson of lessons) {
      if (lesson.status === "published") {
        expect(lesson.youtubeId).toMatch(/^[a-zA-Z0-9_-]{11}$/);
        expect(lesson.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
    expect(getYouTubeEmbedUrl("dQw4w9WgXcQ")).toBe(
      "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0",
    );
    expect(getYouTubeWatchUrl("dQw4w9WgXcQ")).toBe("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    expect(getYouTubeThumbnailUrl("dQw4w9WgXcQ")).toBe(
      "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    );
  });
});

describe("i18n dictionary parity (EN / pt-BR)", () => {
  it("maintains exact 1:1 key parity across both locales", () => {
    const enKeys = collectLeafKeyPaths(dictionaries.en).sort();
    const ptKeys = collectLeafKeyPaths(dictionaries["pt-BR"]).sort();
    expect(ptKeys).toEqual(enKeys);
  });

  it("translates descriptive tags in pt-BR while keeping brand tags canonical", () => {
    expect(translateTag("Security", "en")).toBe("Security");
    expect(translateTag("Security", "pt-BR")).toBe("Segurança");
    expect(translateTag("Data Engineering", "pt-BR")).toBe("Engenharia de Dados");
    expect(translateTag("BigQuery", "pt-BR")).toBe("BigQuery");
    expect(translateTag("Ollama", "pt-BR")).toBe("Ollama");
  });

  it("resolves pt-BR metadata for native blueprints and flags EN fallback on Substack", () => {
    const sampleNative: BlogPost = {
      slug: "sample-blueprint",
      title: "English Title",
      description: "English Description",
      excerpt: "English Excerpt",
      date: "2026-11-26",
      tags: ["AI"],
      readTimeMinutes: 5,
      wordCount: 900,
      headings: [],
      source: "native",
      lang: "en",
      author: "Célio Vieira",
      availableLocales: ["en", "pt-BR"],
      translations: {
        "pt-BR": {
          title: "Título em Português",
          description: "Descrição em Português",
          excerpt: "Resumo em Português",
          headings: [],
          wordCount: 950,
          readTimeMinutes: 5,
        },
      },
    };
    const resolvedNative = resolvePostForLocale(sampleNative, "pt-BR");
    expect(resolvedNative.title).toBe("Título em Português");
    expect(resolvedNative.isFallback).toBe(false);
    expect(resolvedNative.resolvedLocale).toBe("pt-BR");

    const sampleSubstack: BlogPost = {
      ...sampleNative,
      slug: "sample-substack",
      source: "substack",
      availableLocales: ["en"],
      translations: undefined,
    };
    const resolvedSubstack = resolvePostForLocale(sampleSubstack, "pt-BR");
    expect(resolvedSubstack.title).toBe("English Title");
    expect(resolvedSubstack.isFallback).toBe(true);
    expect(resolvedSubstack.resolvedLocale).toBe("en");
  });

  it("ships complete pt-BR markdown and compiled JSON for every native blueprint", () => {
    const indexPath = path.resolve(process.cwd(), "app/content/generated/index.json");
    const ptMdDir = path.resolve(process.cwd(), "app/content/blog/pt-BR");
    const ptJsonDir = path.resolve(process.cwd(), "app/content/generated/pt-BR");
    const index = JSON.parse(fs.readFileSync(indexPath, "utf-8")) as BlogPost[];
    const natives = index.filter((p) => p.source === "native");
    expect(natives.length).toBeGreaterThanOrEqual(14);
    for (const post of natives) {
      expect(post.availableLocales).toContain("pt-BR");
      expect(post.translations?.["pt-BR"]?.title.trim().length).toBeGreaterThan(0);
      expect(fs.existsSync(path.join(ptMdDir, `${post.slug}.md`))).toBe(true);
      expect(fs.existsSync(path.join(ptJsonDir, `${post.slug}.json`))).toBe(true);
    }
  });
});
