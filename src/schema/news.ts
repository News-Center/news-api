import { Static, Type } from "@sinclair/typebox";

export const NewsSchema = Type.Object({
    id: Type.Optional(Type.String()),
    title: Type.String(),
    content: Type.String(),
    tags: Type.Union([Type.Array(Type.String()), Type.Undefined()]),
    creatorId: Type.Optional(Type.String()),
});

export type NewsType = Static<typeof NewsSchema>;

export const NewsBodySchema = Type.Object({
    title: Type.String(),
    content: Type.String(),
    tags: Type.Array(Type.String()),
    creatorId: Type.String(),
});

export type NewsBodyType = Static<typeof NewsBodySchema>;

export const NewsParamsSchema = Type.Object({
    id: Type.String(),
});

export type NewsParamsType = Static<typeof NewsParamsSchema>;

export const NewsResponseSchema = Type.Object({
    news: Type.Union([NewsSchema, Type.Null()]),
});

export type NewsResponseType = Static<typeof NewsResponseSchema>;

export const NewsArrayResponseSchema = Type.Object({
    news: Type.Union([Type.Array(NewsSchema), Type.Null()]),
});

export type NewsArrayResponseType = Static<typeof NewsArrayResponseSchema>;

export const QueryParamsSchema = Type.Object({
    sortBy: Type.Optional(Type.String({ enum: ["title"] })),
    sortOrder: Type.Optional(Type.String({ enum: ["asc", "desc"] })),
    tags: Type.Optional(Type.String()),
    searchQuery: Type.Optional(Type.String()),
});

export type QueryParamsType = Static<typeof QueryParamsSchema>;
