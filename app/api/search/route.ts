import prisma from "@/app/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (typeof query !== "string") {
    throw new Error("Invalid request");
  }

  const movies = await prisma?.movie.findMany({
    where: {
      title: {
        contains: query as string,
        mode: "insensitive",
      },
    },
    select: {
      age: true,
      duration: true,
      id: true,
      title: true,
      release: true,
      imageString: true,
      overview: true,
      youtubeString: true,
      WatchLists: {
        where: {
          userId: session?.user?.email as string,
        },
      },
    },
  });
  return Response.json({ movies });
}
