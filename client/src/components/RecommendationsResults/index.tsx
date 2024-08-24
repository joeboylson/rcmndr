import { RecommendationsResponse, Track } from "@spotify/web-api-ts-sdk";
import { PropertyData } from "../../types";
import { useEffect, useState } from "react";
import { getRecommendations } from "../../utils";
import TracksList from "../TracksList";

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

  useEffect(() => {
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

  return (
    <div>
      <TracksList tracks={results?.tracks} onTrackSelect={() => {}} simple />
    </div>
  );
}
