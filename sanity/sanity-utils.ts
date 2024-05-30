import { createClient, groq } from "next-sanity";
import clientConfig from "@/sanity/config/client-config";
import { courseSchema } from "@/types/Courses";
import { chapterSchema } from "@/types/chapterSchema";

export async function getCourses(): Promise<courseSchema[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "course"] | order(_createdAt desc){
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      "author": {
        "_id": author->_id,
        "_createdAt": author->_createdAt,
        "name": author->name,
        "slug": author->slug,
        "image": {
          "url": author->image.asset->url,
          "alt": author->image.alt,
          },
        "bio": author->bio,
        },
      "image": {
          "url": image.asset->url
      },
      publishedAt,
      description,
      body,
      "chapters": chapter[]{
        _id,
        _createdAt,
        chapterNo,
        chapterTitle,
        "chapterSlug": chapterSlug.current,
        "video": video.asset->{
          playbackId,
          assetId,
          filename,
        },
        body,
      }
    }`
  );
}

export async function getCourse(slug: string): Promise<courseSchema> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "course" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      "author": {
        "_id": author->_id,
        "_createdAt": author->_createdAt,
        "name": author->name,
        "slug": author->slug,
        "image": {
          "url": author->image.asset->url,
          "alt": author->image.alt,
        },
        "bio": author->bio,
      },
      "image": {
        "url": image.asset->url
      },
      publishedAt,
      description,
      body,
      "chapters": chapters[]->{
        _id,
        _createdAt,
        chapterNo,
        chapterTitle,
        "chapterSlug": chapterSlug.current,
        "video": video.asset->{
          "duration": data.duration,
        }
      },
    }`,
    { slug }
  );
}

export async function getChapter(slug: string): Promise<chapterSchema> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "chapter" && chapterSlug.current == $slug][0]{
        _id,
        _createdat,
        chapterTitle,
        "chapterSlug": chapterSlug.current,
        chapterNo,
        "video": video.asset->{
          playbackId,
          assetId,
        },
        body,
    }`,
    { slug }
  );
}

export async function getCourseByChapter(slug: string) {
  return createClient(clientConfig).fetch(
    groq`
    *[_type == "course" && references(*[_type=="chapter" && chapterSlug.current == $slug]._id)][0]{
      title,
      "slug": slug.current,
      publishedAt,
      "author": {
        "name": author->name,
      },
      "chapters": chapters[]->{
        _id,
        _createdAt,
        chapterNo,
        chapterTitle,
        "chapterSlug": chapterSlug.current,
        "video": video.asset->{
          "duration": data.duration,
        }
      }
    }`,
    { slug }
  );
}
