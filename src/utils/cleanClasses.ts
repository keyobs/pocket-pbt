export function cleanClasses(classes: string) {
  return classes
    .split(" ")
    .filter((c) => c !== "true" && c !== "false" && c !== "undefined")
    .join(" ");
}
