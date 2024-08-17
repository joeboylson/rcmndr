import { Track } from "@spotify/web-api-ts-sdk";
import styled from "styled-components";

const StyledTracksList = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TrackButton = styled("button")`
  display: block;
  border: 1px solid white;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  text-align: left;
  white-space: nowrap;
  padding: 8px 16px;
  border-radius: 64px;
  line-height: 12px;
`;

const ButtonSmallText = styled("code")`
  display: block;
  padding-top: 6px;
  color: #d596ff;
`;

interface _props {
  tracks?: Track[];
  onTrackSelect: (track: Track) => void;
}

export default function TracksList({ tracks, onTrackSelect }: _props) {
  return (
    <StyledTracksList>
      {tracks?.map((track) => {
        const _onClick = () => onTrackSelect(track);

        return (
          <TrackButton onClick={_onClick}>
            <p>{track.name}</p>
            <ButtonSmallText>
              {track.album.name}
              &nbsp;|&nbsp;
              {track.artists.map((artist) => artist.name).join(", ")}
            </ButtonSmallText>
          </TrackButton>
        );
      })}
    </StyledTracksList>
  );
}
