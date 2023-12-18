import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardFD from "./CardFD";

function DirectoryView(props) {
  const { setCurrentView, currentView, handleSearch, setInputValue } = props;
  function handleSearchParent() {
    handleSearch();
  }
  function setInputValueParent(tag) {
    setInputValue(tag);
  }
  const Item = styled(Paper)(() => ({
    // backgroundColor: "#98d6a9",
    // padding: 8,
    textAlign: "center",
    color: "black",
    // width: "100px",
  }));

  function displayFolderView() {
    // console.log(" je suis dans directoryView ", currentView);
    const itemsToRender = []; // Create an array to store components
    let ind = 0;
    Object.keys(currentView).forEach((key, index1) => {
      const element = currentView[key];
      // si c'est un dossier
      if (!Array.isArray(element)) {
        itemsToRender.push(
          <Grid item xs={1.5} key={(ind++).toString()}>
            <Item
              onDoubleClickCapture={() => {
                setCurrentView(element);
              }}
              elevation={0}
            >
              <CardFD cloud={null} cardName={key} cardType={"Folder"}></CardFD>
            </Item>
          </Grid>
        );
      } else {
        element.map((file, index2) => {
          // console.log("file =>>>>>>< ", file);

          itemsToRender.push(
            <Grid item xs={1.5} key={(ind++).toString()}>
              <Item elevation={0}>
                <CardFD
                  cloud={file["cloud"]}
                  cardName={file["path"]}
                  title={file["title"] ?? ""}
                  start={file["start"] ?? ""}
                  cardType={"File"}
                  frequence={file["frequence"]}
                  handleSearch={handleSearchParent}
                  setInputValue={setInputValueParent}
                ></CardFD>
              </Item>
            </Grid>
          );
        });
      }
    });

    return itemsToRender; // Return the array of components
  }

  // useEffect(() => {
  //   displayFolderView();
  // }, [currentView]);

  return (
    <Grid container spacing={4}>
      {displayFolderView()}
    </Grid>
  );
}

export default DirectoryView;
