import { FastifyInstance } from "fastify";
import axios, { AxiosError } from "axios";

import {
    NewsBodySchema,
    NewsBodyType,
    NewsParamsSchema,
    NewsParamsType,
    NewsArrayResponseSchema,
    NewsArrayResponseType,
    NewsResponseSchema,
    NewsResponseType,
} from "../../schema/news";

export default async function (fastify: FastifyInstance) {
    const { prisma } = fastify;

    fastify.post<{ Body: NewsBodyType; Reply: NewsResponseType }>(
        "/",
        {
            schema: {
                description: "Create a News Post containing a title, content and a list of tags",
                tags: ["news"],
                body: NewsBodySchema,
                response: {
                    200: {
                        description: "Success Response",
                        ...NewsResponseSchema,
                    },
                },
            },
        },
        async (request, _reply) => {
            const { title, content, tags } = request.body;

            await axios
                .post("http://news-manager:8082/api/v1/publish", {
                    title: title,
                    content: content,
                    tags: tags,
                })
                .catch((err: AxiosError) => {
                    fastify.log.error(err);
                });

            const post = await prisma.news.create({
                data: {
                    title,
                    content,
                    tags,
                },
            });
            return { news: post };
        },
    );

    fastify.delete<{ Params: NewsParamsType; Reply: NewsResponseType }>(
        "/:id",
        {
            schema: {
                description: "Delete a News Post by its ID if it exists",
                tags: ["news"],
                params: NewsParamsSchema,
                response: {
                    200: {
                        description: "Success Response",
                        ...NewsResponseSchema,
                    },
                },
            },
        },
        async (request, _reply) => {
            const { id } = request.params;

            const deletedPost = await prisma.news.delete({
                where: {
                    id,
                },
            });
            return { news: deletedPost };
        },
    );

    fastify.get<{ Params: NewsParamsType; Reply: NewsResponseType }>(
        "/:id",
        {
            schema: {
                description: "Return a Post with a specific ID if it exists",
                tags: ["news"],
                params: NewsParamsSchema,
                response: {
                    200: {
                        description: "Success Response",
                        ...NewsResponseSchema,
                    },
                },
            },
        },
        async (request, _reply) => {
            const { id } = request.params;

            const post = await prisma.news.findUnique({
                where: {
                    id,
                },
            });
            return { news: post };
        },
    );

    fastify.get<{ Reply: NewsArrayResponseType }>(
        "/",
        {
            schema: {
                description: "Return all News Posts",
                tags: ["news"],
                response: {
                    200: {
                        description: "Success Response",
                        ...NewsArrayResponseSchema,
                    },
                },
            },
        },
        async (_request, _reply) => {
            const posts = await prisma.news.findMany();
            return { news: posts };
        },
    );

    fastify.put<{ Body: NewsBodyType; Params: NewsParamsType; Reply: NewsResponseType }>(
        "/:id",
        {
            schema: {
                description: "Update a Post",
                tags: ["news"],
                params: NewsParamsSchema,
                body: NewsBodySchema,
                response: {
                    200: {
                        description: "Success Response",
                        ...NewsResponseSchema,
                    },
                },
            },
        },
        async (request, _reply) => {
            const { id } = request.params;
            const { title, content, tags } = request.body;

            const post = await prisma.news.update({
                where: {
                    id,
                },
                data: {
                    title,
                    content,
                    tags,
                },
            });
            return { news: post };
        },
    );
}
