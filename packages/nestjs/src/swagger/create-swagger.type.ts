import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { SwaggerUiOptions } from "@nestjs/swagger/dist/interfaces/swagger-ui-options.interface";

export type CreateSwaggerOptions = {
  basicAuthOptions?: CreateSwaggerBasicAuthOptions;
  documents: CreateSwaggerDocument[];
};

type CreateSwaggerTag = {
  name: string;
  description?: string;
};

export type CreateSwaggerDocument = {
  title: string;
  description: string;
  version: string;
  url: string;
  tags?: CreateSwaggerTag[];
  modules?: Function[];
  uiOptions?: SwaggerUiOptions;
  bearerAuthOptions?: CreateSwaggerBearerAuthOptions[];
};

type CreateSwaggerBasicAuthOptions = {
  id: string;
  password: string;
};

type CreateSwaggerBearerAuthOptions = {
  options: SecuritySchemeObject;
  name: string;
};
