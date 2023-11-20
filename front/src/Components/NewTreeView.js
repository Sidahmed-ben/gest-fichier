import { useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { extract_name_from_path, extract_extension } from "../utils/utils";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import HtmlOutlinedIcon from "@mui/icons-material/HtmlOutlined";
import Typography from "@mui/joy/Typography";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article"; // psql -h localhost -d tp_tooken_db -U tooken_user -W

export default function NewTreeView(props) {
  let globalBoolInd = -1;
  const setCurrentView = props.setCurrentView;
  let jsonData = props.data;

  const handleClick = (element) => {
    setCurrentView(element);
    console.log(element);
    console.log("clicked");
  };

  // useEffect(() => {
  //   setOpenStateFalse(jsonData);
  //   // Initialize view
  //   // setCurrentView(jsonData["./files"]);
  //   setOpenList(updatedOpenList);
  // }, [jsonData]);

  function getIcone(fineName) {
    const extension = extract_extension(fineName);
    switch (extension) {
      case "txt":
        return (
          <InsertDriveFileOutlinedIcon
            style={{ fontSize: "35px", color: "red" }}
          ></InsertDriveFileOutlinedIcon>
        );
      case "html":
        return (
          <HtmlOutlinedIcon
            style={{ fontSize: "35px", color: "red" }}
          ></HtmlOutlinedIcon>
        );
      case "pdf":
        return (
          <PictureAsPdfIcon
            style={{ fontSize: "35px", color: "red" }}
          ></PictureAsPdfIcon>
        );
      case "docx":
        return (
          <ArticleIcon
            style={{ fontSize: "35px", color: "#0000CD" }}
          ></ArticleIcon>
        );
      default:
        return (
          <InsertDriveFileOutlinedIcon
            style={{ fontSize: "30px", color: "red" }}
          ></InsertDriveFileOutlinedIcon>
        );
    }
  }

  function AfficherArborescence(arborescence) {
    return (
      <div>
        {Object.keys(arborescence).map((key, index1) => {
          const element = arborescence[key];
          if (Array.isArray(element)) {
            // Afficher les fichiers dans une balise <p>
            return (
              <div key={index1.toString()}>
                {element.map(function (file, index2) {
                  return (
                    <TreeItem
                      icon={getIcone(extract_name_from_path(file["path"]))}
                      nodeId={(globalBoolInd++).toString()}
                      key={globalBoolInd}
                      label={
                        <Typography
                          style={{ fontSize: 25, paddingLeft: "25px" }}
                        >
                          {extract_name_from_path(file["path"])}
                        </Typography>
                      }
                    ></TreeItem>
                  );
                })}
              </div>
            );
          } else {
            // Récursivement afficher les sous-dossiers
            return (
              <div key={index1.toString()}>
                <TreeItem
                  onClick={() => {
                    handleClick(element);
                  }}
                  icon={
                    <FolderIcon
                      style={{
                        fontSize: "35px",
                        color: "#0083ff",
                      }}
                    ></FolderIcon>
                  }
                  nodeId={(globalBoolInd++).toString()}
                  key={globalBoolInd}
                  label={
                    <Typography style={{ fontSize: 25, paddingLeft: "25px" }}>
                      {extract_name_from_path(key)}
                    </Typography>
                  }
                >
                  {AfficherArborescence(element)}
                </TreeItem>
              </div>
            );
          }
        })}
      </div>
    );
  }

  const style = {
    width: "100%",
    flexGrow: 1,
    "& .MuiTreeItem-label": {
      fontFamily: "Segoe Print",
      fontSize: 30,
    },
  };

  return (
    <div>
      <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: "95%" }}>
        <TreeView
          sx={style}
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {AfficherArborescence(jsonData)}
        </TreeView>
      </Box>
    </div>
  );
}
