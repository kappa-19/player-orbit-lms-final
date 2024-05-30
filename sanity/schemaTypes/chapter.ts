import {  defineType } from "sanity";

const chapterSchema = {
  name: "chapter",
  title: "Chapter",
  type: "document",
  fields: [
    {
      name: "chapterNo",
      title: "Chapter No.",
      type: "number",
      validation: (rule: any) => [
        rule.required().integer().positive().greaterThan(0),
      ],
    },
    {
      name: "chapterTitle",
      title: "Title",
      type: "string",
    },
    {
      name: "chapterSlug",
      title: "Slug",
      type: "slug",
      options: {
        source: "chapterTitle",
      },
    },
    {
      name: "video",
      title: "Video",
      type: "mux.video",
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};

export default chapterSchema;
