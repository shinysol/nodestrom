import { arrayChecker } from "@nodestrom/array";
import { INestApplication } from "@nestjs/common";
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerCustomOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import expressBasicAuth from "express-basic-auth";
import { CreateSwaggerOptions } from "./create-swagger.type";

/**
 * CreateSwagger
 * @description
 * Usage: createSwagger(app, options)
 */
function createSwagger(
  app: INestApplication,
  options: CreateSwaggerOptions
): [
  string,
  INestApplication,
  OpenAPIObject | (() => OpenAPIObject),
  SwaggerCustomOptions?
] {
  if (!app) return;
  if (!options) return;
  const { basicAuthOptions, documents } = options;
  if (!arrayChecker(documents, false)) {
    return;
  }
  if (basicAuthOptions) {
    app.use(
      documents.map((document) => document.url),
      expressBasicAuth({
        challenge: true,
        users: {
          [basicAuthOptions.id]: basicAuthOptions.password,
        },
      })
    );
  }
  for (const document of documents) {
    const {
      bearerAuthOptions,
      modules,
      tags,
      title,
      uiOptions,
      url,
      description,
      version,
    } = document;
    const config = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version);
    if (bearerAuthOptions) {
      for (const bearerAuthOption of bearerAuthOptions) {
        const { name, options } = bearerAuthOption;
        config.addBearerAuth(options, name);
      }
    }
    if (tags) {
      for (const tag of tags) {
        const { name, description } = tag;
        config.addTag(name, description);
      }
    }
    const swaggerDocument = SwaggerModule.createDocument(app, config.build(), {
      include: modules,
    });
    SwaggerModule.setup(url, app, swaggerDocument, {
      swaggerOptions: {
        ...uiOptions,
        requestInterceptor: (req: Request) => {
          req.headers.set("X-Request-Source", req.url);
          return req;
        },
      },
    });
  }
}

export { createSwagger };
