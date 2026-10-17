import { SEO_CONFIG } from "@/lib/seo/config";
import { api } from "@/lib/upfetch";
import type { GetCoursesResponse } from "@/types/course/course.types";
import type { GetPostsResponse } from "@/types/post/post.types";
import type { GetTeachersResponse } from "@/types/teacher/teacher.types";
import type { MetadataRoute } from "next";

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

function createLocalizedEntry(
  path: string,
  lastModified: Date = new Date(),
  changeFrequency: ChangeFrequency = "weekly",
  priority: number = 0.7,
): MetadataRoute.Sitemap {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const isHome = cleanPath === "/" || cleanPath === "";

  return SEO_CONFIG.locales.map((locale) => {
    const routeUrl = isHome
      ? `${SEO_CONFIG.baseUrl}/${locale}`
      : `${SEO_CONFIG.baseUrl}/${locale}${cleanPath}`;

    return {
      url: routeUrl,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          fa: isHome
            ? `${SEO_CONFIG.baseUrl}/fa`
            : `${SEO_CONFIG.baseUrl}/fa${cleanPath}`,
          en: isHome
            ? `${SEO_CONFIG.baseUrl}/en`
            : `${SEO_CONFIG.baseUrl}/en${cleanPath}`,
          "x-default": isHome
            ? `${SEO_CONFIG.baseUrl}/fa`
            : `${SEO_CONFIG.baseUrl}/fa${cleanPath}`,
        },
      },
    };
  });
}

async function fetchAllCourses() {
  try {
    const res = await api<GetCoursesResponse>("/courses", {
      params: { limit: 1000 },
    });
    return res?.data?.items ?? [];
  } catch (error) {
    console.error("[Sitemap API] fetchAllCourses failed:", error);
    return [];
  }
}

async function fetchAllPosts() {
  try {
    const res = await api<GetPostsResponse>("/posts", {
      params: { limit: 1000 },
    });
    return res?.data?.items ?? [];
  } catch (error) {
    console.error("[Sitemap API] fetchAllPosts failed:", error);
    return [];
  }
}

async function fetchAllTeachers() {
  try {
    const res = await api<GetTeachersResponse>("/teachers", {
      params: { limit: 100 },
    });
    return res?.data?.items ?? [];
  } catch (error) {
    console.error("[Sitemap API] fetchAllTeachers failed:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    ...createLocalizedEntry("/", new Date(), "daily", 1.0),
    ...createLocalizedEntry("/courses", new Date(), "daily", 0.9),
    ...createLocalizedEntry("/blog", new Date(), "daily", 0.9),
    ...createLocalizedEntry("/learning-paths", new Date(), "weekly", 0.8),
    ...createLocalizedEntry("/about", new Date(), "monthly", 0.6),
    ...createLocalizedEntry("/contact", new Date(), "monthly", 0.5),
  ];

  let courseRoutes: MetadataRoute.Sitemap = [];
  try {
    const courses = await fetchAllCourses();
    courseRoutes = courses.flatMap((course) =>
      createLocalizedEntry(
        `/courses/${encodeURIComponent(course.slug)}`,
        new Date(course.updatedAt || course.createdAt),
        "weekly",
        0.9,
      ),
    );
  } catch (error) {
    console.error("[Sitemap Generator] Processing courses failed:", error);
  }

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await fetchAllPosts();
    postRoutes = posts.flatMap((post) =>
      createLocalizedEntry(
        `/blog/${encodeURIComponent(post.slug)}`,
        new Date(post.updatedAt || post.createdAt),
        "weekly",
        0.8,
      ),
    );
  } catch (error) {
    console.error("[Sitemap Generator] Processing posts failed:", error);
  }

  let teacherRoutes: MetadataRoute.Sitemap = [];
  try {
    const teachers = await fetchAllTeachers();
    teacherRoutes = teachers.flatMap((teacher) =>
      createLocalizedEntry(
        `/teachers/${encodeURIComponent(teacher.slug)}`,
        new Date(teacher.updatedAt || teacher.createdAt),
        "monthly",
        0.7,
      ),
    );
  } catch (error) {
    console.error("[Sitemap Generator] Processing teachers failed:", error);
  }

  return [...staticRoutes, ...courseRoutes, ...postRoutes, ...teacherRoutes];
}
