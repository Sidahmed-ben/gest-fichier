import * as React from "react";
import { Grid } from "@mui/material";
// import { Tree } from "react-arborist";
import styled from "@mui/system/styled";
// import TreeView from "./TreeView";
import DirectoryView from "./DirectoryView";
import PopoverPopupState from "./PopoverPopupState";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import JSON5 from "json5";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { dbApi } from "../hooks/dp_api";
import NewTreeView from "./NewTreeView";
import Typography from "@mui/joy/Typography";

import Cloud from "./Cloud";

const { searchWord, indexation } = dbApi();

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "center",
}));

export default function GloabView(props) {
  const [currentView, setCurrentView] = React.useState({});
  const [inputValue, setInputValue] = React.useState("");
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // const valueRef = React.useRef("bonjour"); //creating a refernce for TextField Component
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [viewTreeData, setViewTreeData] = React.useState({});

  // This function handles word searching
  const handleSearch = async () => {
    // console.log(inputValue);
    const query = inputValue;
    console.log(query);
    try {
      if (query.length > 0) {
        searchWord(query)
          .then((data) => {
            const object = JSON5.parse(data);
            if (object.length > 0) {
              console.log(object);
              const newView = { files: [] };
              object.forEach((file) => {
                newView.files.push({
                  path: file["texte_title"],
                  cloud: file["cloud"],
                  frequence: file["frequences"],
                });
              });
              setCurrentView(newView);
            } else {
              setOpenSnackBar(true);
            }
            console.log(object);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const startIndexation = () => {
    // setDisabled(true);
    indexation()
      .then((data) => {
        // setDisabled(false);
        let jsonData = JSON.parse(data);
        setViewTreeData(jsonData);
        console.log(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
    // console.log("Tree view : ", viewTreeData);
  };

  // React.useEffect(() => {
  //   if (query.length === 0) {
  //   }
  // }, [query]);

  const action = (
    <React.Fragment>
      <IconButton
        size="large"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {" "}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <Typography sx={{ color: "primary", fontSize: 40 }}>
              Gestionnaire de fichier
            </Typography>{" "}
            <Button
              onClick={startIndexation}
              variant="contained"
              color="error"
              // endIcon={<SendIcon />}
            >
              Indexer
            </Button>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            {" "}
            <Typography sx={{ color: "primary", fontSize: 25 }}>
              Arborescence
            </Typography>{" "}
          </Item>
        </Grid>

        <Grid item xs={9}>
          <Item>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  // inputRef={valueRef}
                  value={inputValue}
                  onChange={handleChange}
                  id="fullWidth"
                  size="small"
                  inputProps={{
                    style: {
                      width: "300px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  onClick={handleSearch}
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Recherche
                </Button>
              </Grid>
              <div>
                <Snackbar
                  open={openSnackBar}
                  autoHideDuration={2000}
                  onClose={handleClose}
                  message="Le mot n'a pas été trouvé"
                  size="large"
                  action={action}
                />
              </div>
            </Grid>
          </Item>
        </Grid>
        <Grid
          item
          xs={3}
          // minWidth={"300px"}
          maxHeight={"700px"}
          minHeight={"700px"}
          sx={{ overflowY: "scroll" }}
        >
          {/* <TreeView
            data={viewTreeData}
            setCurrentView={setCurrentView}
          ></TreeView> */}
          <NewTreeView
            data={viewTreeData}
            setCurrentView={setCurrentView}
          ></NewTreeView>
        </Grid>
        <Grid item xs={9}>
          <DirectoryView
            handleSearch={handleSearch}
            currentView={currentView}
            setInputValue={setInputValue}
          ></DirectoryView>
        </Grid>
      </Grid>
    </div>
  );
}
