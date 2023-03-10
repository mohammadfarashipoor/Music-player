import Track from "../models/track";
import TrackInfo from "../models/trackinfo";
import { ChevronRight, ChevronLeft, Pause, Play } from "react-bootstrap-icons";

interface PlayListProps {
  currentSong: Track;
  setCurrentSong: (value: Track) => void;
  setIsPlaying: (value: boolean) => void;
  isPlaying: boolean;
  audioRef: any;
  songInfo: TrackInfo;
  setSongs: (value: Track[]) => void;
  songs: Track[];
  setSongInfo: (value: TrackInfo) => void;
}
const Player = ({
  currentSong,
  setCurrentSong,
  setIsPlaying,
  isPlaying,
  audioRef,
  songInfo,
  setSongs,
  songs,
  setSongInfo,
}: PlayListProps) => {
  const activeLibraryHandler = (nextPrev: Track) => {
    const newSongs: Track[] = songs.map((newSong) => {
      if (newSong.id === nextPrev.id) {
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
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time: number) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e: any) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction: string) => {
    let currentIndex = songs.findIndex(
      (song: Track) => song.id === currentSong.id
    );
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
      } else {
        await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
      }
    }
    if (isPlaying) audioRef.current.play();
    //playAudio(isPlaying, audioRef);
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <ChevronLeft
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
        />
        {isPlaying ? (
          <Pause onClick={playSongHandler} className="play" />
        ) : (
          <Play onClick={playSongHandler} className="play" />
        )}
        <ChevronRight
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
        />
      </div>
    </div>
  );
};

export default Player;
