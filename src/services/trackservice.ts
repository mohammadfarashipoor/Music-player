import axios from "axios";
import Track from "../models/track";

class trackService {
  http = axios.create({
    baseURL: "https://spotify.com",
  });
  async getTracks() {
    const response = await this.http.get<Track>("/traks");
    return response.data;
  }
  async addTracks(title: string) {
    const response = await this.http.post<Track>("/traks", { title });
    return response.data;
  }
  async removeTracks(id: number) {
    const response = await this.http.delete<Track>(`/traks${id}`);
    return response.data;
  }
}
export default new trackService();
