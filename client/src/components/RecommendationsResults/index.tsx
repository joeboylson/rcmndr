import { RecommendationsResponse, Track } from "@spotify/web-api-ts-sdk";
import { PropertyData } from "../../types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getRecommendations } from "../../utils";
import TracksList from "../TracksList";
import {
  ReviewBlock,
  SearchButton,
  StyledRecommendationsResults,
} from "./StyledComponents";

interface _props {
  propertyData: PropertyData[];
  tracks: Track[];
}

export default function RecommendationsResults({
  propertyData,
  tracks,
}: _props) {
  const [results, setResults] = useState<RecommendationsResponse>();
  const [loading, setLoading] = useState<boolean>(false);

  const activeProperties = useMemo(() => {
    return propertyData.filter((i) => i.active);
  }, [propertyData]);

  const handleSearch = useCallback(() => {
    if (results || loading) return;

    setLoading(true);
    getRecommendations(propertyData, tracks).then(
      (results: RecommendationsResponse | null) => {
        if (!results) return setResults({ seeds: [], tracks: [] });
        setResults(results);
        setLoading(false);
      }
    );
  }, [results, loading]);

  if (loading) return <p>loading...</p>;

  if (!results) {
    return (
      <StyledRecommendationsResults>
        <h2>Search Review:</h2>

        <ReviewBlock>
          <strong>Tracks:</strong>
          {tracks.map((i) => {
            return (
              <code>
                {i.name} (by {i.artists.map((j) => j.name).join(", ")})
              </code>
            );
          })}
        </ReviewBlock>

        <ReviewBlock>
          <strong>Fine-tuning:</strong>

          {activeProperties.map((i) => {
            return (
              <code>
                {i.key}: ({i.value.join(", ")})
              </code>
            );
          })}

          {activeProperties.length === 0 && <code>(No fine-tuning)</code>}
        </ReviewBlock>

        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </StyledRecommendationsResults>
    );
  }

  return (
    <StyledRecommendationsResults>
      <code>Check out these tracks!</code>
      <TracksList tracks={results?.tracks} onTrackSelect={() => {}} simple />
    </StyledRecommendationsResults>
  );
}
