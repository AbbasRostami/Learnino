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

interface BaseEntity {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt?: string;
}

function createStaticLocalizedEntry(
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

function createDynamicLocalizedEntries<T extends BaseEntity>(
  itemsFa: T[],
  itemsEn: T[],
  basePath: "courses" | "blog" | "teachers",
  priority: number = 0.8,
  changeFrequency: ChangeFrequency = "weekly",
): MetadataRoute.Sitemap {
  const enMap = new Map(itemsEn.map((item) => [item.id, item]));
  const entries: MetadataRoute.Sitemap = [];

  itemsFa.forEach((itemFa) => {
    const itemEn = enMap.get(itemFa.id);

    const slugFa = itemFa.slug;
    const slugEn = itemEn?.slug || itemFa.slug;
    console.log(`Creating sitemap entry for ${basePath}: FA slug = ${slugFa}, EN slug = ${slugEn}`);

    const encodedSlugFa = encodeURIComponent(decodeURIComponent(slugFa));
    const encodedSlugEn = encodeURIComponent(decodeURIComponent(slugEn));

    const urlFa = `${SEO_CONFIG.baseUrl}/fa/${basePath}/${encodedSlugFa}`;
    const urlEn = `${SEO_CONFIG.baseUrl}/en/${basePath}/${encodedSlugEn}`;
    const lastModified = new Date(itemFa.updatedAt || itemFa.createdAt);

    const alternates = {
      languages: {
        fa: urlFa,
        en: urlEn,
        "x-default": urlFa,
      },
    };

    entries.push({
      url: urlFa,
      lastModified,
      changeFrequency,
      priority,
      alternates,
    });

    entries.push({
      url: urlEn,
      lastModified,
      changeFrequency,
      priority,
      alternates,
    });
  });

  return entries;
}

async function fetchCourses(locale: "fa" | "en") {
  try {
    const res = await api<GetCoursesResponse>("/courses", {
      params: { limit: 1000 },
      headers: { "Accept-Language": locale },
    });
    return res?.data?.items ?? [];
  } catch (error) {
    console.error(`[Sitemap API] fetchCourses (${locale}) failed:`, error);
    return [];
  }
}

async function fetchPosts(locale: "fa" | "en") {
  try {
    const res = await api<GetPostsResponse>("/posts", {
      params: { limit: 1000 },
      headers: { "Accept-Language": locale },
    });
    return res?.data?.items ?? [];
  } catch (error) {
    console.error(`[Sitemap API] fetchPosts (${locale}) failed:`, error);
    return [];
  }
}

async function fetchTeachers(locale: "fa" | "en") {
  try {
    const res = await api<GetTeachersResponse>("/teachers", {
      params: { limit: 100 },
      headers: { "Accept-Language": locale },
    });
    return res?.data?.items ?? [];
  } catch (error) {
    console.error(`[Sitemap API] fetchTeachers (${locale}) failed:`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    ...createStaticLocalizedEntry("/", new Date(), "daily", 1.0),
    ...createStaticLocalizedEntry("/courses", new Date(), "daily", 0.9),
    ...createStaticLocalizedEntry("/blog", new Date(), "daily", 0.9),
    ...createStaticLocalizedEntry("/learning-paths", new Date(), "weekly", 0.8),
    ...createStaticLocalizedEntry("/about", new Date(), "monthly", 0.6),
    ...createStaticLocalizedEntry("/contact", new Date(), "monthly", 0.5),
  ];

  const [
    [coursesFa, coursesEn],
    [postsFa, postsEn],
    [teachersFa, teachersEn],
  ] = await Promise.all([
    Promise.all([fetchCourses("fa"), fetchCourses("en")]),
    Promise.all([fetchPosts("fa"), fetchPosts("en")]),
    Promise.all([fetchTeachers("fa"), fetchTeachers("en")]),
  ]);

  const courseRoutes = createDynamicLocalizedEntries(
    coursesFa,
    coursesEn,
    "courses",
    0.9,
    "weekly",
  );

  const postRoutes = createDynamicLocalizedEntries(
    postsFa,
    postsEn,
    "blog",
    0.8,
    "weekly",
  );

  const teacherRoutes = createDynamicLocalizedEntries(
    teachersFa,
    teachersEn,
    "teachers",
    0.7,
    "monthly",
  );

  return [...staticRoutes, ...courseRoutes, ...postRoutes, ...teacherRoutes];
}