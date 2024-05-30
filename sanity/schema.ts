import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemaTypes/blockContent";
import category from "./schemaTypes/category";
import post from "./schemaTypes/post";
import author from "./schemaTypes/author";
import chapter from "./schemaTypes/chapter";
import course from "./schemaTypes/course";
import CourseSchema from "./schemaTypes/course";
import chapterSchema from "./schemaTypes/chapter";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, blockContent, CourseSchema, chapterSchema],
};
