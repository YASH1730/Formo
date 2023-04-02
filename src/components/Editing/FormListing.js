import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
//css
import "../assets/css/formListing.css";
//APIs
import { listForm } from "../../service/service";
//redux
import { useSelector } from "react-redux";
import { useEffect } from "react";

const FormListing = ({ history }) => {
  const { auth } = useSelector((state) => state);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (auth.isAuth) {
      fetchData();
    } else {
      history("/");
    }
  }, []);

  async function fetchData() {
    let res = await listForm(auth.email);

    if (res.status === 200) {
      setData(res.data);
    } else {
      setData([]);
    }
  }

  function handleList() {
    if (auth.isAuth) {
      history("/create");
    }
  }

  return (
    <Box className="listContainer">
      <Box className="addFrom" component={Button} onClick={handleList}>
        <Tooltip title = {"Add Form"}>
        <IconButton color="primary" size="large">
          <AddBoxIcon fontSize="200px" />
        </IconButton>
        </Tooltip>
      </Box>

      {data.length > 0 &&
        data.map((row, index) => (
          <Box
            key={index}
            className="editFrom"
          >
            <Typography variant="body2">{row.title}</Typography>
            <Box>
            <Tooltip title = "Edit">
              <IconButton
                color="primary"
                onClick={() => history(`/editForm/${row.uuid}`)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title = "Preview">
              <IconButton
                color="primary"
                onClick={() => history(`/openForm/${row.uuid}`)}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default FormListing;
