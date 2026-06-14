import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CATEGORY_FOLDERS: Record<string, string> = {
  "Pre Wedding": "prewedding",
  "Engagement": "engagement",
  "Family": "family",
};

export async function GET() {
  const gallery: { id: number; category: string; url: string }[] = [];
  let id = 1;

  for (const [category, folder] of Object.entries(CATEGORY_FOLDERS)) {
    const dirPath = path.join(process.cwd(), "public", "assets", folder);

    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter((f) =>
      /\.(jpe?g|png|webp|avif|gif)$/i.test(f)
    );

    for (const file of files) {
      gallery.push({
        id: id++,
        category,
        url: `/assets/${folder}/${file}`,
      });
    }
  }

  return NextResponse.json(gallery);
}