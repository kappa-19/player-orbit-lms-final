"use client";

import { getChapter, getCourseByChapter } from "@/sanity/sanity-utils";
import { chapterSchema } from "@/types/chapterSchema";
import { useEffect, useState } from "react";
import "./chapterPage.scss";
import { PortableText } from "next-sanity";
import ArrowRight from "@/components/client/Icons/ArrowRight";
import MuxPlayer from "@mux/mux-player-react";
import ChessKing from "@/components/client/Icons/ChessKing";
import Link from "next/link";

type Props = {
  params: { chapter: string };
};

export interface courseByChapterSchema {
  title: string;
  slug: string;
  publishedAt: Date;
  author: {
    name: string;
  };
  chapters: {
    _id: string;
    _createdAt: Date;
    chapterNo: number;
    chapterTitle: string;
    chapterSlug: string;
    video: {
      duration: string;
    };
  }[];
}

function MuxVideo({
  playbackId,
  title,
}: {
  playbackId?: string;
  title?: string;
}) {
  if (!playbackId) return null;
}

export default function ChapterPage({ params }: Props) {
  const [chapter, setChapter] = useState<chapterSchema>();
  const [courseByChapter, setCourseByChapter] =
    useState<courseByChapterSchema>();
  const slug = params.chapter;

  useEffect(() => {
    getChapter(slug).then((data) => {
      setChapter(data);
    });

    getCourseByChapter(slug).then((data) => {
      setCourseByChapter(data);
    });
  }, [slug]);

  return (
    <section id="chapter-section">
      {courseByChapter && chapter && (
        <div className="chapter-container">
          <div className="course-title-container">
            <div className="course-title-icon">
              <ChessKing />
            </div>
            <div className="course-title-text">{courseByChapter.title}</div>
          </div>
          <div className="chapter-main">
            <div className="chapter-main-content">
              <div className="chapter-content">
                <div className="chapter-title-container">
                  <div className="chapter-number">{chapter.chapterNo}</div>
                  <div className="chapter-title">{chapter.chapterTitle}</div>
                </div>
                <div className="chapter-video-container">
                  <div className="chapter-video">
                    <MuxPlayer playbackId={chapter.video.playbackId} />
                  </div>
                </div>
                <div className="chapter-body">
                  <div className="chapter-body-text">
                    <PortableText value={chapter.body} />
                  </div>
                  <div className="course-author-container">
                    <div className="course-author-name">
                      Created by: {courseByChapter.author.name}
                    </div>
                    <div className="course-publishedAt">
                      Updated on:{" "}
                      {new Date(courseByChapter.publishedAt).toLocaleDateString(
                        "en-GB"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="chapter-main-list-container">
              <div className="chapter-main-list-heading">Course Content</div>
              <div className="chapter-main-list">
                {courseByChapter.chapters?.map((listChapter, i) => {
                  const isCurrentChapter =
                    listChapter.chapterSlug === chapter.chapterSlug;
                  const hrefValue = `/course/${courseByChapter.slug}/${listChapter.chapterSlug}`;
                  console.log(hrefValue);
                  return (
                    <Link
                      href={hrefValue}
                      key={i}
                      className={
                        isCurrentChapter
                          ? "current-chapter"
                          : "chapter-list-item"
                      }
                    >
                      <div className="chapter-list-item-container">
                        <div className="chapter-list-item-icon">
                          <ArrowRight />
                        </div>
                        <div className="chapter-list-item-title">{`${listChapter.chapterNo}. ${listChapter.chapterTitle}`}</div>
                        <div className="chapter-list-item-duration">
                        {`${listChapter.video.duration}`.length > 5
                        ? `${listChapter.video.duration}`
                            .slice(0, -4)
                            .replace(".", ":")
                        : `${listChapter.video.duration}`.length < 3
                          ? `${listChapter.video.duration}:00`
                          : listChapter.video.duration}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
