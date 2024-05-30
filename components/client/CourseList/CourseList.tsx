"use client";

import "@/components/client/CourseList/courseList.scss";

import Image from "next/image";
import { useEffect, useState } from "react";
import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";
import { getCourses } from "@/sanity/sanity-utils";
import { courseSchema } from "@/types/Courses";

const CourseList = () => {
  const [courses, setCourses] = useState<courseSchema[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      const courses = await getCourses();
      setCourses(courses);
    }

    fetchCourses();
  }, []);

  return (
    <section id="course-list-section">
      <div className="heading">
        <h1>Courses we provide:</h1>
      </div>
      <div className="course-list-container-wrap">
        <div className="course-list-container">
          {courses.map((course, i) => (
            <Link href={`/course/${course.slug}`} key={i}>
              <div className="course-main">
                <div className="course-img">
                  <Image
                    src={course.image.url}
                    alt={course.title}
                    style={{ objectFit: "cover" }}
                    fill
                  />
                </div>
                <div className="course-title">
                  <h2>{course.title}</h2>
                </div>
                <div className="course-description">
                  <p>{course.description}</p>
                </div>
                <div className="course-info">
                  {course.author && (
                    <>
                      <div className="author">
                        Created by:&nbsp;<span>{course.author.name}</span>
                      </div>
                    </>
                  )}
                  <div className="published-at">
                    Updated at:
                    <span>{new Date(course.publishedAt).toLocaleDateString("en-GB")}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseList;
