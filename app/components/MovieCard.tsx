interface iAppProps {
  title: string;
  overview: string;
  movieId: number;
  watchList: boolean;
  watchListId: string;
  youtubeUrl: string;
}

export function MovieCard({
  title,
  overview,
  movieId,
  watchList,
  watchListId,
  youtubeUrl,
}: iAppProps) {
  return <h1>Hello from movie card</h1>;
}
