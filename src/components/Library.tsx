import Track from "../models/track";
import LibrarySong from "./LibrarySong";

interface LibraryProps {
  audioRef: any;
  songs: Track[];
  setSongs: (value: Track[]) => void;
  setCurrentSong: (value: Track) => void;
  isPlaying: boolean;
  libraryStatus: boolean;
}

function Library({
  audioRef,
  songs,
  setSongs,
  setCurrentSong,
  isPlaying,
  libraryStatus,
}: LibraryProps) {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""} `}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            setSongs={setSongs}
            setCurrentSong={setCurrentSong}
            song={song}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
