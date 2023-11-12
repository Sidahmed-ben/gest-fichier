import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardFD from "./CardFD";

function DirectoryView(props) {
  let data =
    '{\n    ".": {\n        "files": [\n            "./files/test1.txt",\n            "./files/test3.pdf",\n            "./files/test2.txt"\n        ],\n        "subDir": {\n            "files": [\n                "./files/subDir/test1.txt",\n                "./files/subDir/test2.txt",\n                "./files/subDir/test3.txt"\n            ]\n        },\n        "subDir2": {\n            "files": [\n                "./files/subDir2/test1.txt",\n                "./files/subDir2/test2.txt",\n                "./files/subDir2/test3.txt"\n            ],\n            "subDir copy": {\n                "files": [\n                    "./files/subDir2/subDir copy/test1.txt",\n                    "./files/subDir2/subDir copy/test2.txt",\n                    "./files/subDir2/subDir copy/test3.txt"\n                ]\n            },\n            "subDir3": {\n                "files": [\n                    "./files/subDir2/subDir3/test1.txt",\n                    "./files/subDir2/subDir3/test2.txt",\n                    "./files/subDir2/subDir3/test3.txt"\n                ]\n            }\n        },\n        "subDir2 copy": {\n            "files": [\n                "./files/subDir2 copy/test1.txt",\n                "./files/subDir2 copy/test2.txt",\n                "./files/subDir2 copy/test3.txt"\n            ],\n            "subDir3": {\n                "files": [\n                    "./files/subDir2 copy/subDir3/test1.txt",\n                    "./files/subDir2 copy/subDir3/test2.txt",\n                    "./files/subDir2 copy/subDir3/test3.txt"\n                ]\n            }\n        }\n    }\n}';

  const currentView = props.currentView;
  const Item = styled(Paper)(() => ({
    // backgroundColor: "#98d6a9",
    // padding: 8,
    textAlign: "center",
    color: "black",
    // width: "100px",
  }));

  function displayFolderView() {
    console.log(" je suis dans directoryView ", currentView);
    const itemsToRender = []; // Create an array to store components
    let ind = 0;
    Object.keys(currentView).forEach((key, index1) => {
      const element = currentView[key];
      // console.log(element);
      // console.log(key);
      // si c'est un dossier
      if (!Array.isArray(element)) {
        itemsToRender.push(
          <Grid item xs={1.5} key={(ind++).toString()}>
            <Item elevation={0}>
              <CardFD cloud={null} cardName={key} cardType={"Folder"}></CardFD>
            </Item>
          </Grid>
        );
      } else {
        element.map((file, index2) => {
          itemsToRender.push(
            <Grid item xs={1.5} key={(ind++).toString()}>
              <Item elevation={0}>
                <CardFD
                  cloud={file["cloud"]}
                  cardName={file["path"]}
                  cardType={"File"}
                  frequence={file["frequence"]}
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
      {/* <p>{currentView}</p> */}
      {displayFolderView()}
      {/* 

      <Grid item xs={1.5}>
        <CardFD></CardFD>
      </Grid>

      <Grid item xs={1.5}>
        <CardFD></CardFD>
      </Grid>

      <Grid item xs={1.5}>
        <CardFD></CardFD>
      </Grid>

      <Grid item xs={1.5}>
        <CardFD></CardFD>
      </Grid>

      <Grid item xs={1.5}>
        <CardFD></CardFD>
      </Grid>

      <Grid item xs={1.5}>
        <Item elevation={0}>
          <CardFD></CardFD>
        </Item>
      </Grid>
      <Grid item xs={1.5}>
        <Item elevation={0}>
          <CardFD></CardFD>
        </Item>
      </Grid> */}
    </Grid>
  );
}

export default DirectoryView;
