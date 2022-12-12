// product zod schema that is checked against the db model using toZod
import { toZod } from "tozod";
import { Product } from "./db-models";
import { z } from "zod";
import { numericString } from "./open-api-helper";

export const productSchema: toZod<Product> = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  categories: z.array(z.string()),
});

export const routeParams = z.object({
  id: numericString,
});
