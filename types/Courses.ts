import { PortableTextBlock } from "sanity";

export type courseSchema = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: string;
  author: {
    _id: string;
    _createdAt: Date;
    name: string;
    slug: string;
    image: {
      url: string;
      alt: string;
    };
    bio: Array<{}>;
  };
  image: {
    url: string;
  };
  publishedAt: Date;
  description: string;
  body: PortableTextBlock[];
  chapters: {
    chapterNo: number;
    chapterTitle: string;
    chapterSlug: string;
    video: {
      duration: string;
    };
    body: PortableTextBlock[];
  }[];
};
