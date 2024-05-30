import { PortableTextBlock } from "next-sanity";

export type chapterSchema = {
  _id: string;
  _createdAt: string;
  chapterNo: number;
  chapterTitle: string;
  chapterSlug: string;
  video: {
    playbackId: string;
    assetID: string;
  };
  body: PortableTextBlock[];
};
