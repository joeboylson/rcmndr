export * from "./authentication";
export * from "./spotify";

export function isProduction() {
  return process.env.MODE === "production";
}
