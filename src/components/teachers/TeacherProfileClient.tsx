"use client";

import { CoursesListCard } from "@/components/courses/list/CoursesListCard";
import { AppBreadcrumb } from "@/components/shared/AppBreadcrumb";
import { useTeacher } from "@/services";
import { TeacherCourse, TeacherWithCourses } from "@/types";
import { BookOpen, Globe, GraduationCap, Sparkles, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

interface TeacherProfileClientProps {
  slug: string;
  initialTeacher: TeacherWithCourses;
}

export function TeacherProfileClient({
  slug,
  initialTeacher,
}: TeacherProfileClientProps) {
  const t = useTranslations("teacher");
  const tNav = useTranslations("nav");
  const prefersReducedMotion = useReducedMotion();

  const { data } = useTeacher(slug);
  const teacher = data?.data?.teacher ?? initialTeacher;

  const totalStudents = teacher?.courses?.reduce(
    (acc: number, course: TeacherCourse) => acc + (course.studentsCount || 0),
    0,
  );

  const breadcrumbItems = [
    { label: tNav("courses"), href: "/courses" },
    { label: teacher?.name },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div
      className="relative min-h-screen pb-20"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="absolute top-0 inset-x-0 h-112.5 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-primary/15 via-brand-accent/5 to-background dark:from-primary/10 dark:via-brand-accent/5 dark:to-background" />
        <div
          className="absolute -top-40 -right-40 h-125 w-125 rounded-full bg-primary/20 blur-[100px] motion-reduce:animate-none animate-float"
          aria-hidden="true"
        />
        <div
          className="absolute top-20 -left-40 h-100 w-100 rounded-full bg-brand-cyan/20 blur-[100px] motion-reduce:animate-none animate-float-delayed"
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <AppBreadcrumb items={breadcrumbItems} className="mb-8" />

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto mt-12 sm:mt-16 mb-16"
        >
          <div className="rounded-[2.5rem] border border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl p-6 sm:p-10 text-center flex flex-col items-center">
            <div className="relative -mt-24 sm:-mt-28 mb-6">
              <div className="relative h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-[2rem] border-4 border-card/80 bg-muted shadow-2xl ring-4 ring-primary/10 rotate-3 transition-transform duration-500 hover:rotate-0">
                {teacher?.avatar ? (
                  <Image
                    src={teacher.avatar}
                    alt={teacher.name}
                    fill
                    priority
                    quality={95}
                    sizes="160px"
                    className="object-cover"
                    itemProp="image"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/20 to-brand-accent/20 text-primary text-5xl font-black">
                    {teacher?.name?.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              <span>{t("teacher")}</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-4"
              itemProp="name"
            >
              {teacher?.name}
            </h1>

            {teacher?.bio && (
              <p
                className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl font-medium mb-8"
                itemProp="description"
              >
                {teacher.bio}
              </p>
            )}

            <div className="flex items-center justify-center gap-3 mb-8">
              <SocialButton icon={Globe} href="#" label="وب‌سایت" />
              <SocialButton icon={FaLinkedin} href="#" label="لینکدین" />
              <SocialButton icon={FaGithub} href="#" label="گیت‌هاب" />
              <SocialButton icon={FaTwitter} href="#" label="توییتر" />
            </div>

            <hr className="w-full border-dashed border-border/60 mb-8" />

            <div className="grid grid-cols-2 gap-4 sm:gap-12 w-full max-w-lg">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm font-semibold">
                    {t("totalCourses")}
                  </span>
                </div>
                <span className="text-3xl font-black text-foreground">
                  {teacher?.courses?.length || 0}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-semibold">
                    {t("totalStudents")}
                  </span>
                </div>
                <span className="text-3xl font-black text-foreground">
                  {totalStudents || 0}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        <section
          aria-labelledby="teacher-courses-title"
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col items-center text-center gap-3 mb-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/10 text-brand-accent shadow-xs">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2
              id="teacher-courses-title"
              className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground"
            >
              {t.rich("teacherCourses", {
                name: teacher?.name,
                highlight: (chunks) => (
                  <span className="text-primary">{chunks}</span>
                ),
              })}
            </h2>
          </div>

          {teacher?.courses && teacher.courses.length > 0 ? (
            <motion.div
              variants={prefersReducedMotion ? undefined : containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {teacher.courses.map((course: any, index: number) => (
                <motion.div
                  key={course.id}
                  variants={prefersReducedMotion ? undefined : itemVariants}
                >
                  <CoursesListCard
                    course={{ ...course, teacher }}
                    priority={index < 4}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4 rounded-[2rem] border border-dashed border-border/60 bg-muted/20">
              <BookOpen className="h-16 w-16 text-muted-foreground/30" />
              <p className="text-lg font-bold text-muted-foreground">
                {t("noCourses")}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function SocialButton({
  icon: Icon,
  href,
  label,
}: {
  icon: any;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 motion-reduce:transition-none"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}
