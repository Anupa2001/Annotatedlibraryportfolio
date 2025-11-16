import { BookOpen } from 'lucide-react';

interface GenreFilterProps {
  genres: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

export function GenreFilter({ genres, selectedGenre, onGenreChange }: GenreFilterProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <BookOpen className="w-5 h-5 text-[#6b8099]" />
      <span className="text-[#3d5a6b] mr-2">Genre:</span>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onGenreChange(genre)}
          className={`px-4 py-2 rounded border-2 transition-all ${
            selectedGenre === genre
              ? 'bg-[#8fa8c5] text-white border-[#8fa8c5]'
              : 'bg-white text-[#3d5a6b] border-[#c8d8e8] hover:border-[#8fa8c5] hover:bg-[#e8f0f7]'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}