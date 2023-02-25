import { Disc, MusicNoteList } from "react-bootstrap-icons";

interface NavProps {
  libraryStatus: boolean;
  setLibraryStatus: (value: boolean) => void;
}
function Nav({ libraryStatus, setLibraryStatus }: NavProps) {
  return (
    <nav>
      <h1>
        Chill <Disc /> Choub
      </h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library <MusicNoteList />
      </button>
    </nav>
  );
}

export default Nav;
