"use client";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import { MovieCard } from "@/app/components/MovieCard";
import { WatchList } from "@prisma/client";

interface iAppProps {
  title: string;
  overview: string;
  age: number;
  id: number;
  imageString: string;
  duration: number;
  WatchLists: WatchList[];
  release: number;
  youtubeString: string;
}

const fetchPosts = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

export default function SearchPageComponent() {
  const search = useSearchParams();

  const searchQuery = search ? search.get("q") : null;
  const router = useRouter();

  const encodedSearchQuery = encodeURI(searchQuery || "");

  const { data, isLoading } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchPosts,
    { refreshInterval: 500 }
  );

  if (!encodedSearchQuery) {
    router.push("/home");
  }

  if (!data?.movies) {
    return null;
  }

  return (
    <>
      <h1 className="text-white text-4xl  mt-10 px-5 sm:px-0">
        Showing results for: {searchQuery}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
        {data?.movies.map((movie: iAppProps) => (
          <div key={movie.id} className="relative h-60">
            <Image
              src={movie.imageString}
              alt="Movie"
              width={500}
              height={400}
              className="rounded-sm absolute w-full h-full object-cover"
            />

            <div className="h-60 relative z-10 w-full transform duration-500 hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                <Image
                  src={movie.imageString}
                  alt="Movie"
                  width={800}
                  height={800}
                  className="absolute w-full h-full -z-10 rounded-lg object-cover"
                />
                <MovieCard
                  key={movie.id}
                  age={movie.age}
                  movieId={movie.id}
                  overview={movie.overview}
                  time={movie.duration}
                  title={movie.title}
                  watchListId={movie.WatchLists[0]?.id}
                  watchList={movie.WatchLists.length > 0 ? true : false}
                  year={movie.release}
                  youtubeUrl={movie.youtubeString}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
