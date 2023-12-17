import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Cloud from "./Cloud";
import Divider from "@mui/material/Divider";

export default function BasicPopover(props) {
  const { popOverContent, handleSearch, setInputValue, title, start } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleSearchParent() {
    handleSearch();
  }
  function setInputValueParent(tag) {
    setInputValue(tag);
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button>
        <FiberManualRecordIcon
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
        ></FiberManualRecordIcon>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        style={{ width: "1000px", overflow: "visible" }}
      >
        <h1 style={{ color: "blue" }}>{title}</h1>
        <p style={{ fontSize: "25px" }}>{start}</p>
        <Divider sx={{ bgcolor: "black" }} />

        <Cloud
          handleSearch={handleSearchParent}
          setInputValue={setInputValueParent}
          handleClose={handleClose}
          cloud={popOverContent}
        ></Cloud>
      </Popover>
    </div>
  );
}
