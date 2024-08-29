import { Track } from "@spotify/web-api-ts-sdk";
import { uniq, uniqueId } from "lodash";
import { ReactNode } from "react";
import styled, { css } from "styled-components";

const StyledTracksList = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;
`;

const TrackButton = styled("button")`
  width: 100%;
  display: grid;
  grid-template-columns: 50px 1fr 16px;
  gap: 8px;
  align-items: center;
  padding: 8px;
  border: 0;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  text-align: left;
  line-height: 12px;
  transition-duration: 200ms;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const sharedOverflowText = css`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 350px;

  @media (max-width: 600px) {
    max-width: 50vw;
  }

  @media (max-width: 400px) {
    max-width: 40vw;
  }
`;

const TrackName = styled("p")`
  ${sharedOverflowText}
`;

const ButtonSmallText = styled("code")`
  ${sharedOverflowText}
  padding-top: 4px;
  color: #d596ff;
`;

interface _props {
  tracks?: Track[];
  onTrackSelect: (track: Track) => void;
  icon?: ReactNode;
}

export default function TracksList({ tracks, onTrackSelect, icon }: _props) {
  return (
    <StyledTracksList>
      {tracks?.map((track) => {
        const {
          name: trackName,
          artists,
          album: { name: albumName, images },
        } = track;

        const _onClick = () => onTrackSelect(track);

        return (
          <TrackButton onClick={_onClick} key={uniqueId(track.id)}>
            <img src={images[0]?.url} alt="" />
            <div>
              <TrackName>{trackName}</TrackName>
              <ButtonSmallText>
                {albumName}
                &nbsp;|&nbsp;
                {artists.map(({ name: artistName }) => artistName).join(", ")}
              </ButtonSmallText>
            </div>
            {icon}
          </TrackButton>
        );
      })}
    </StyledTracksList>
  );
}
