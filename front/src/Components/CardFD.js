import React from "react";
import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { extract_name_from_path } from "../utils/utils";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/joy/Typography";

import PopoverPopupState from "./PopoverPopupState";

const FolderCard = ({ cardImages, cardType, cardName, cloud, frequence }) => {
  return (
    <Paper style={{ textAlign: "center", alignItems: "center" }}>
      {cardType == "Folder" ? (
        <img
          src={cardImages.folder}
          alt="Folder"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      ) : (
        <img
          src={cardImages.file}
          alt="File"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}
      <Typography sx={{ fontSize: 25 }}>{cardName}</Typography>
      {cloud && <PopoverPopupState popOverContent={cloud}></PopoverPopupState>}
      {frequence && (
        <Typography color="success" variant="solid">
          {frequence}
        </Typography>
      )}
    </Paper>
  );
};

const CardFD = (props) => {
  const cardType = props.cardType;
  const cardName = props.cardName;
  const cloud = props.cloud;
  const frequence = props.frequence || "";
  const cardImages = {
    folder:
      "https://img.freepik.com/vecteurs-libre/style-plat-dossier-informatique-bleu_78370-1029.jpg?w=826&t=st=1697571014~exp=1697571614~hmac=0e2faed80afa286672bb74ce4e82bd4501d5a2ef7ebf35dddeca719a6728117a",
    file: "https://icons.iconarchive.com/icons/pelfusion/long-shadow-media/512/Document-icon.png",
  };
  return (
    <Grid container>
      <FolderCard
        cloud={cloud}
        cardImages={cardImages}
        cardType={cardType}
        cardName={extract_name_from_path(cardName)}
        frequence={frequence}
      />
    </Grid>
  );
};

export default CardFD;
