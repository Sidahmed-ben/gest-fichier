import React from "react";
import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { extract_name_from_path } from "../utils/utils";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/joy/Typography";
import pdfImage from "../images/pdf.png";
import wordImage from "../images/word.png";
import dossierImage from "../images/dossier.avif";
import htmlImage from "../images/html.png";
import fichierImage from "../images/fichier.png";

import PopoverPopupState from "./PopoverPopupState";
import { extract_extension } from "../utils/utils.js";

function returnImageFD(cardName) {
  const extension = extract_extension(cardName);
  switch (extension) {
    case "txt":
      return (
        <img
          src={fichierImage}
          alt="Folder"
          style={{ maxWidth: "70%", height: "auto" }}
        />
      );
    case "html":
      return (
        <img
          src={htmlImage}
          alt="Folder"
          style={{ maxWidth: "70%", height: "auto" }}
        />
      );
    case "pdf":
      return (
        <img
          src={pdfImage}
          alt="Folder"
          style={{ maxWidth: "70%", height: "auto" }}
        />
      );
    case "docx":
      return (
        <img
          src={wordImage}
          alt="Folder"
          style={{ maxWidth: "70%", height: "auto" }}
        />
      );
    default:
      return (
        <img
          src={dossierImage}
          alt="Folder"
          style={{ maxWidth: "70%", height: "auto" }}
        />
      );
  }
}

const FolderCard = ({
  handleSearch,
  setInputValue,
  cardName,
  cloud,
  frequence,
}) => {
  function handleSearchParent() {
    handleSearch();
  }
  function setInputValueParent(tag) {
    setInputValue(tag);
  }

  return (
    <Paper style={{ textAlign: "center", alignItems: "center" }}>
      {returnImageFD(cardName)}
      <Typography sx={{ fontSize: 21 }}>{cardName}</Typography>
      {cloud && (
        <PopoverPopupState
          handleSearch={handleSearchParent}
          setInputValue={setInputValueParent}
          popOverContent={cloud}
        ></PopoverPopupState>
      )}
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
  const handleSearch = props.handleSearch;
  const setInputValue = props.setInputValue;

  function handleSearchParent() {
    handleSearch();
  }
  function setInputValueParent(tag) {
    setInputValue(tag);
  }

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
        handleSearch={handleSearchParent}
        setInputValue={setInputValueParent}
      />
    </Grid>
  );
};

export default CardFD;
