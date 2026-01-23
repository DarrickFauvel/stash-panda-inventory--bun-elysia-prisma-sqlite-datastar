import ejs from "ejs";
import { readFile } from "fs/promises";
import path from "path";

const viewsDir = path.join(import.meta.dir, "views");

export async function render(
  page: string,
  data: Record<string, any> = {}
) {
  const pagePath = path.join(viewsDir, "pages", `${page}.ejs`);
  const layoutPath = path.join(viewsDir, "layouts", "base.ejs");

  const pageTemplate = await readFile(pagePath, "utf8");
  const layoutTemplate = await readFile(layoutPath, "utf8");

  // 🔑 IMPORTANT: pass filename
  const body = ejs.render(pageTemplate, data, {
    filename: pagePath
  });

  return ejs.render(layoutTemplate, {
    ...data,
    body
  }, {
    filename: layoutPath
  });
}
