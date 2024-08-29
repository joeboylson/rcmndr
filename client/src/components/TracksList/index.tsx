import { Track } from "@spotify/web-api-ts-sdk";
import styled from "styled-components";

const StyledTracksList = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  &.simple {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const TrackButton = styled("button")`
  display: block;
  border: 1px solid white;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  text-align: left;
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
  simple?: true;
}

export default function TracksList({ tracks, onTrackSelect, simple }: _props) {
  return (
    <StyledTracksList className={simple ? "simple" : ""}>
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
