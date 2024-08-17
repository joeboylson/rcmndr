import { Page, Track } from "@spotify/web-api-ts-sdk";
import axios from "axios";
import { isEmpty } from "lodash";
import { useCallback, useState } from "react";

export function useTracksSearch() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tracks, setTracks] = useState<Array<Track>>();

  const searchTracks = useCallback(async (q: string) => {
    try {
      setLoading(true);
      if (isEmpty(q)) return;

      const params = { q };
      const response = await axios.get(`/api/track/search`, { params });
      const page = response.data as Page<Track>;
      setTracks(page.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const exportFunctions = { searchTracks };
  const exportValues = { loading, tracks };

  return { ...exportFunctions, ...exportValues };
}
