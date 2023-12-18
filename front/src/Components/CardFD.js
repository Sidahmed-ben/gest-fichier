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
  path,
  title,
  start,
}) => {
  function handleSearchParent() {
    handleSearch();
  }
  function setInputValueParent(tag) {
    setInputValue(tag);
  }

  const downloadFile = async (path) => {
    const extension = extract_extension(cardName);
    // If not a folder
    if (
      extension !== "html" &&
      extension !== "txt" &&
      extension !== "pdf" &&
      extension !== "docx"
    ) {
      return;
    }

    await fetch("/api/download-file", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path }),
    })
      .then(async (resp) => {
        // const result = await resp.json();
        // console.log(result);
        if (resp.ok) {
          // Convert the response to blob
          const blob = await resp.blob();
          // Create a link element and trigger a download
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = extract_name_from_path(path); // Set desired file name
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          console.error("File download failed");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Paper
      onDoubleClickCapture={() => {
        // onClick={() => {
        downloadFile(path);
      }}
      style={{ textAlign: "center", alignItems: "center" }}
    >
      {returnImageFD(cardName)}
      <Typography sx={{ fontSize: 21 }}>{cardName}</Typography>
      {cloud && (
        <PopoverPopupState
          handleSearch={handleSearchParent}
          setInputValue={setInputValueParent}
          popOverContent={cloud}
          title={title}
          start={start}
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
  const title = props.title;
  const start = props.start;
  // console.log("title => ", title, "   ", cardName);
  // console.log("start => ", start, "   ", cardName);

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
        path={cardName}
        title={title}
        start={start}
      />
    </Grid>
  );
};

export default CardFD;
