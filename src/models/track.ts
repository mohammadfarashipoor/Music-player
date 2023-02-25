export default interface Track {
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: string[];
  id: string; //uuidv4()
  active: boolean;
}
