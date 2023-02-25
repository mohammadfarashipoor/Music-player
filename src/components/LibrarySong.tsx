import Track from "../models/track";

interface LibraryProps {
  audioRef: any;
  song: Track;
  songs: Track[];
  setSongs: (value: Track[]) => void;
  setCurrentSong: (value: Track) => void;
  isPlaying: boolean;
}

function LibrarySong({
  song,
  audioRef,
  songs,
  setSongs,
  setCurrentSong,
  isPlaying,
}: LibraryProps) {
  const songSelectHandler = async () => {
    //const selectedSong = songs.filter((state) => state.id === song.id);
    await setCurrentSong(song);
    const newSongs = songs.map((newSong) => {
      if (newSong.id === song.id) {
        return {
          ...newSong,
          active: true,
        };
      } else {
        return {
          ...newSong,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    if (isPlaying) audioRef.current.play();
    //playAudio(isPlaying, audioRef);
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
