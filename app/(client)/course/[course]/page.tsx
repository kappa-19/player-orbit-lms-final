"use client";

import "./coursePage.scss";

import { getCourse } from "@/sanity/sanity-utils";
import { courseSchema } from "@/types/Courses";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ChessKing from "@/components/client/Icons/ChessKing";
import ArrowRight from "@/components/client/Icons/ArrowRight";
import { PortableText } from "next-sanity";

type Props = {
  params: { course: string };
};

export default function Course({ params }: Props) {
  const [course, setCourse] = useState<courseSchema>();
  const slug = params.course;

  useEffect(() => {
    getCourse(slug).then((data) => {
      setCourse(data);
    });
  }, [slug]);

  console.log("course:", course);

  return (
    <section id="course-section">
      {course && (
        <div className="course-container">
          <div className="course-details-container">
            <div className="course-title-container">
              <div className="course-icon">
                <ChessKing />
              </div>
              <div className="course-name">{course.title}</div>
            </div>
            <div className="course-info-container">
              <div className="course-image">
                <Image
                  src={course.image.url}
                  alt={course.title}
                  style={{ objectFit: "cover" }}
                  fill
                />
              </div>
              <div className="course-description-container">
                <div className="description-body">{course.description}</div>
                <div className="author-container">
                  <div className="author-name">
                    Created by: {course.author.name}
                  </div>
                  <div className="updated-at">
                    Created on:{" "}
                    {new Date(course.publishedAt).toLocaleDateString("en-GB")}
                  </div>
                </div>
              </div>
            </div>
            <div className="course-details">
              <PortableText value={course.body} />
            </div>
          </div>
          <div className="chapter-list-container">
            <div className="chapter-heading">
              <div className="chapter-heading-icon">
                <ArrowRight />
              </div>
              <div className="chapter-heading-text">Chapters</div>
            </div>
            <div className="chapter-list-main">
              {course.chapters?.map((chapter, i) => (
                <Link
                  href={`/course/${course.slug}/${chapter.chapterSlug}`}
                  key={i}
                >
                  <div className="chapter-main">
                    <div className="chapter-number">{chapter.chapterNo}</div>
                    <div className="chapter-title">{chapter.chapterTitle}</div>
                    <div className="chapter-duration">
                      {`${chapter.video.duration}`.length > 5
                        ? `${chapter.video.duration}`
                            .slice(0, -4)
                            .replace(".", ":")
                        : `${chapter.video.duration}`.length < 3
                          ? `${chapter.video.duration}:00`
                          : chapter.video.duration}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
