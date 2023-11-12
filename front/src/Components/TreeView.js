import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useEffect } from "react";
import { extract_name_from_path } from "../utils/utils";
// psql -h localhost -d tp_tooken_db -U tooken_user -W

export default function TreeView(props) {
  // const [openList, setOpenList] = React.useState([]);
  // // const [globalBoolInd, setGlobalBoolInd] = React.useState(-1);
  // let globalBoolInd = -1;
  // const setCurrentView = {};
  // // let jsonData = props.data;
  // let data =
  //   '{\n    ".": {\n        "files": [\n            "./files/test1.txt",\n            "./files/test3.pdf",\n            "./files/test2.txt"\n        ],\n        "subDir": {\n            "files": [\n                "./files/subDir/test1.txt",\n                "./files/subDir/test2.txt",\n                "./files/subDir/test3.txt"\n            ]\n        },\n        "subDir2": {\n            "files": [\n                "./files/subDir2/test1.txt",\n                "./files/subDir2/test2.txt",\n                "./files/subDir2/test3.txt"\n            ],\n            "subDir copy": {\n                "files": [\n                    "./files/subDir2/subDir copy/test1.txt",\n                    "./files/subDir2/subDir copy/test2.txt",\n                    "./files/subDir2/subDir copy/test3.txt"\n                ]\n            },\n            "subDir3": {\n                "files": [\n                    "./files/subDir2/subDir3/test1.txt",\n                    "./files/subDir2/subDir3/test2.txt",\n                    "./files/subDir2/subDir3/test3.txt"\n                ]\n            }\n        },\n        "subDir2 copy": {\n            "files": [\n                "./files/subDir2 copy/test1.txt",\n                "./files/subDir2 copy/test2.txt",\n                "./files/subDir2 copy/test3.txt"\n            ],\n            "subDir3": {\n                "files": [\n                    "./files/subDir2 copy/subDir3/test1.txt",\n                    "./files/subDir2 copy/subDir3/test2.txt",\n                    "./files/subDir2 copy/subDir3/test3.txt"\n                ]\n            }\n        }\n    }\n}';
  // const jsonData = JSON.parse(data);
  // console.log(jsonData);
  // let updatedOpenList = [];
  // const handleClick = (boolInd, element) => {
  //   // console.log(" before => ", openList, " ind ", boolInd);
  //   const newOpenList = openList.map((el, ind) => (ind === boolInd ? !el : el));
  //   // console.log(" after => ", newOpenList, " ind ", boolInd);
  //   setOpenList(newOpenList);
  //   // console.log(element);
  //   setCurrentView(element);
  //   console.log("clicked");
  //   console.log(boolInd);
  // };
  // function setOpenStateFalse(jsonData) {
  //   // console.log(jsonData);
  //   Object.keys(jsonData).map((key, index1) => {
  //     const element = jsonData[key];
  //     // si c'est un dossier
  //     if (!Array.isArray(element)) {
  //       // let updatedOpenList = [...openList];
  //       updatedOpenList.push(false);
  //       // console.log("hrllo");
  //       //  Creer un nouveau tableau booleen ici avec useState et l'initialiser a false
  //       // setOpenList(updatedOpenList);
  //       setOpenStateFalse(element);
  //     }
  //   });
  // }
  // useEffect(() => {
  //   setOpenStateFalse(jsonData);
  //   // Initialize view
  //   setCurrentView(jsonData["./files"]);
  //   setOpenList(updatedOpenList);
  // }, [jsonData]);
  // function AfficherArborescence(arborescence, paddingVal, test) {
  //   return (
  //     <div>
  //       {Object.keys(arborescence).map((key, index1) => {
  //         const element = arborescence[key];
  //         if (Array.isArray(element)) {
  //           // Afficher les fichiers dans une balise <p>
  //           return (
  //             <Collapse
  //               in={openList[test]}
  //               timeout="auto"
  //               unmountOnExit
  //               key={index1.toString()}
  //               onClick={() => {
  //                 console.log(globalBoolInd);
  //               }}
  //             >
  //               <List
  //                 sx={{
  //                   // width: "100%",
  //                   // maxWidth: 90,
  //                   bgcolor: "background.paper",
  //                 }}
  //                 component="div"
  //                 disablePadding
  //               >
  //                 {element.map(function (file, index2) {
  //                   return (
  //                     <div key={index2.toString()}>
  //                       <ListItemButton
  //                         sx={{
  //                           fontSize: "10px",
  //                           overflow: "visible",
  //                           pl: paddingVal,
  //                         }}
  //                         key={index2.toString()}
  //                       >
  //                         <ListItemIcon>
  //                           <InsertDriveFileIcon />
  //                         </ListItemIcon>
  //                         <ListItemText
  //                           primaryTypographyProps={{ fontSize: "15px" }}
  //                           primary={extract_name_from_path(file)}
  //                         />
  //                       </ListItemButton>
  //                     </div>
  //                   );
  //                 })}
  //               </List>
  //             </Collapse>
  //           );
  //           // Si ce n'est pas un boolean donc un dossier
  //         } else {
  //           // setGlobalBoolInd(globalBoolInd + 1);
  //           let newVar = globalBoolInd;
  //           newVar++;
  //           globalBoolInd++;
  //           // console.log(
  //           //   " je uis dans le dossier ",
  //           //   key,
  //           //   " Index Global ",
  //           //   globalBoolInd
  //           // );
  //           // Récursivement afficher les sous-dossiers
  //           return (
  //             <div style={{ color: "green" }} key={index1.toString()}>
  //               {/* <ListItemButton sx={{ pl: paddingVal }} onClick={handleClick}> */}
  //               <ListItemButton
  //                 fontSize="small"
  //                 sx={{ overflow: "visible", pl: paddingVal }}
  //                 onClick={() => {
  //                   handleClick(newVar, element);
  //                 }}
  //               >
  //                 <ListItemIcon>
  //                   <FolderIcon style={{ fontSize: "20px" }} />
  //                 </ListItemIcon>
  //                 <ListItemText
  //                   primaryTypographyProps={{ fontSize: "15px" }}
  //                   primary={key}
  //                 />
  //                 {openList[globalBoolInd] ? <ExpandLess /> : <ExpandMore />}
  //               </ListItemButton>
  //               {AfficherArborescence(element, paddingVal + 2, test + 1)}
  //             </div>
  //           );
  //         }
  //       })}
  //     </div>
  //   );
  // }
  // useEffect(() => {});
  // return (
  //   <List
  //     sx={{
  //       width: "100%",
  //       bgcolor: "background.paper",
  //     }}
  //     // component="nav"
  //     aria-labelledby="nested-list-subheader"
  //     subheader={
  //       <ListSubheader component="div" id="nested-list-subheader">
  //         Mes dossiers
  //       </ListSubheader>
  //     }
  //   >
  //     {AfficherArborescence(jsonData, 0, 0)}
  //   </List>
  // );
}
