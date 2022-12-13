import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Request, Response, Router } from "express";
import { productsSchema, productSchema, getProductParams } from "./api-schema";
import { ProductController } from "./product-controller";
import { Product } from "../db-models";
import {
  ApiRouteNoInput,
  ApiRouteParams,
  registerRoute,
} from "../open-api-helper";

const getProductsRoute: ApiRouteNoInput<Product[]> = {
  path: "/products",
  method: "get",
  description: "Get all products",
  handler: ProductController.getProducts,
  tags: ["products"],
  middleware: [(req: Request, res: Response, next) => {
    console.log('example middleware', req.path);
    next();
  }],
  responses: {
    200: {
      description: "Product list",
      content: {
        "application/json": {
          schema: productsSchema,
        },
      },
    },
  },
};

const getProductRoute: ApiRouteParams<typeof getProductParams, Product> = {
  path: "/products/{id}",
  method: "get",
  description: "Get a single product",
  request: {
    params: getProductParams,
  },
  handler: ProductController.getProduct,
  tags: ["products"],
  responses: {
    200: {
      description: "Product",
      content: {
        "application/json": {
          schema: productSchema,
        },
      },
    },
    404: {
      description: "Product Not Found",
    },
  },
};

export function registerProductRoutes(
  registry: OpenAPIRegistry,
  router: Router
) {
  registerRoute(getProductsRoute, registry, router);
  registerRoute(getProductRoute, registry, router);
}