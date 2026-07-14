import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./pages/Home.tsx"),
  route("recipes", "./pages/Recipes.tsx"),
  route("ingredients", "./pages/Ingredients.tsx"),
  route("vote", "./pages/Vote.tsx"),
] satisfies RouteConfig;
