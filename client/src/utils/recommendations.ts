import {
  RecommendationsRequest,
  RecommendationsResponse,
  Track,
} from "@spotify/web-api-ts-sdk";
import { PropertyData } from "../types";
import axios from "axios";

export async function getRecommendations(
  propertyData: PropertyData[],
  tracks: Track[]
) {
  /**
   * SEED TRACKS MUST BE ARRAY OF IDS
   */
  const seed_tracks = tracks.map((i) => i.id);

  const minMaxPropertyData = propertyData.reduce((acc, i) => {
    if (!i.active) return acc;

    /**
     * Change min and max range from 0-100 to 0-1
     */
    const [min, max] = i.valueModifier(i.value);

    const minKey = `min_${i.key}`;
    const maxKey = `max_${i.key}`;
    return { ...acc, [minKey]: min, [maxKey]: max };
  }, {});

  console.log(minMaxPropertyData);

  const recommendationsRequestData: RecommendationsRequest = {
    limit: 30,
    seed_tracks,
    ...minMaxPropertyData,
  };

  try {
    const params = { ...recommendationsRequestData };
    const response = await axios.get(`/api/track/recommendations`, { params });
    return response.data as RecommendationsResponse;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
  }
}
