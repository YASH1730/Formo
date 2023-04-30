import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Backdrop,
  Box,
  Button,
  Drawer,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import "../assets/css/home.css";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
//tinymce
import { Editor } from "@tinymce/tinymce-react";
//icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import HistoryIcon from "@mui/icons-material/History";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SaveIcon from "@mui/icons-material/Save";
import ReplyIcon from "@mui/icons-material/Reply";
import PrintIcon from "@mui/icons-material/Print";
import BackspaceIcon from "@mui/icons-material/Backspace";
import SendIcon from "@mui/icons-material/Send";
import Draggable from "react-draggable";
import { CloseRounded } from "@mui/icons-material";

const Home = () => {
  // just a sample data for history
  let [history, setHistory] = useState([
    {
      Q1: {
        r1: "Hello I am Chat GPT from Query 1",
        r2: "I am bot",
      },
    },
    {
      Q2: {
        r1: "Hello I am Chat GPT from Query 2 ",
        r2: "I am bot",
      },
    },
    {
      Q3: {
        r1: "Hello I am Chat GPT from Query 3",
        r2: "I am bot",
      },
    },
    {
      Q4: {
        r1: "Hello I am Chat GPT from Query 4",
        r2: "I am bot",
      },
    },
    {
      Q4: {
        r1: "Hello I am Chat GPT from Query 4",
        r2: "I am bot",
      },
    },
    {
      Q4: {
        r1: "Hello I am Chat GPT from Query 4",
        r2: "I am bot",
      },
    },
  ]);
  let [Query, setQuery] = useState({ r1: "Let's have some queries..." });
  // control over the history Drawer
  let [open, setOpen] = useState({
    history: false,
    imageBox: false,
    share: false,
  });

  return (
    <Box className="homeWrapper">

      {/* header */}
      <Box className="headerContainer">
        <Typography variant="h4" sx={{ color: "white" }}>
          Company Label
        </Typography>
        <Avatar sx={{ bgcolor: "orange" }}>YS</Avatar>
      </Box>
      {/* header ends */}
      {/* status bar here */}
      <StatusBar />
      {/* status bar ends */}
      {/* operationSection */}
      <Box className="operationSection">
        {/* left Side operationSection */}
        <Box className="leftSideOperationDesk">
          {/* history */}
          <History
            history={history}
            open={open}
            setOpen={setOpen}
            setQuery={setQuery}
          />
          {/* history ends */}
          {/* image Dropper */}
          <ModalBox open={open} setOpen={setOpen} />
          {/* image Dropper ends */}
        </Box>
        {/* left Side operationSection ends*/}

        {/* right side desk */}
        <Box className="rightSideOperationDesk">
          {/* query Box */}
          <Box className="textAreaWrapper">
            <TextareaAutosize
              placeholder="Type your query here..."
              minRows={5}
            ></TextareaAutosize>
            <Box sx={{ display: "flex", justifyContent: "right", gap: "1rem" }}>
              <Button
                startIcon={<BackspaceIcon />}
                size={"small"}
                variant="outlined"
              >
                Clear
              </Button>
              <Button
                startIcon={<SendIcon />}
                size={"small"}
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </Box>
          {/* query Box ends */}
          {/* result Box */}
          <Box className="resultBoxWrapper">
            <Box className="resultBoxContainer">
              <ResultTabs Query={Query} />
            </Box>
            <Box
              sx={{ display: "flex", gap: "0.3rem", justifyContent: "right" }}
            >
              <Button
                size="small"
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={() =>
                  setOpen((old) => ({
                    ...old,
                    boxType: "Export As",
                    open: true,
                  }))
                }
              >
                Save
              </Button>
              <Button
                size="small"
                onClick={() =>
                  setOpen((old) => ({
                    ...old,
                    boxType: "Share Vai",
                    open: true,
                  }))
                }
                startIcon={<ReplyIcon />}
                variant="contained"
              >
                Share
              </Button>
              <Button
                size="small"
                startIcon={<PrintIcon />}
                variant="contained"
              >
                Print
              </Button>
            </Box>
          </Box>
          {/* result Box ends */}
        </Box>
        {/* right side desk */}
        <Box className="historyButton">
          <Tooltip title="History">
            <Button
              variant="contained"
              onClick={() => setOpen((old) => ({ ...old, history: true }))}
              color="primary"
              size="small"
            >
              <HistoryIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Browse Files">
            <Button
              variant="contained"
              onClick={() =>
                setOpen((old) => ({ ...old, boxType: "Upload", open: true }))
              }
              color="primary"
              size="small"
            >
              <UploadFileIcon />
            </Button>
          </Tooltip>
        </Box>
      </Box>
      {/* operationSection ends */}
    </Box>
  );
};

function StatusBar() {
  return (
    <Box className="statusWrapper">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontWeight: 500 }}>Status...</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
function History({ history, open, setOpen, setQuery }) {
  return (
    <>
    {open.history &&
    // <Draggable></Draggable>
    <Draggable
      // anchor={"left"}
      // open={open.history}
      // className="historyDrawer"
      // onClose={() => setOpen((old) => ({ ...old, history: false }))}
    > 
      <Box className="historyWrapper" m={1}>
        <Box sx = {{display : 'flex',justifyContent : 'space-between', alignItems : 'center'}}>
        <Typography variant="body1" sx = {{fontWeight : 700}} align={"center"}>
          History
        </Typography>
        <IconButton onClick={()=> setOpen((old) => ({ ...old, history: false }))}>
          <CloseRounded></CloseRounded>
        </IconButton>
        </Box>
        <Box className="historyContainer">
          {history.length > 0
            ? history.map((query, i) => {
                let Qkeys = Object.keys(query);
                let Rkeys = Object.keys(query[Qkeys[0]]);

                return (
                  <Box className="listWrapper">
                    <Typography
                      component={Button}
                      onClick={() => {
                        setQuery(query[Qkeys[0]]);
                        // setOpen((old) => ({ ...old, history: false }));
                      }}
                      sx={{ fontWeight: 500 }}
                      mt={1}
                      variant="body2"
                    >
                      Query {i + 1}
                    </Typography>
                    <Box component={"ul"} pl={3} mt={1}>
                      {Rkeys.map((row) => {
                        return (
                          <Box component={"li"}>
                            <Typography
                              variant="body2"
                              className="resultWrapper"
                            >
                              {query[Qkeys][row]}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                );
              })
            : "Ask me anything !!!"}
        </Box>
      </Box>
    </Draggable>}
    </>
  );
}
function ModalBox(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt="searchImage"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open.open}
      onClose={() => props.setOpen((old) => ({ ...old, open: false }))}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={props.open.open}>
        <Box sx={style}>
          <Box className="imageSearchWrapper">
            <Typography variant="h6">{props.open.boxType}</Typography>
            <Box className="dropperContainer">
              {props.open.boxType === "Upload" && (
                <section>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <center>
                      {" "}
                      <b>Click here and browse files</b>
                    </center>
                  </div>
                  <aside style={thumbsContainer}>{thumbs}</aside>
                </section>
              )}
              {props.open.boxType === "Export As" && (
                <Box>
                  <FormControl>
                    {/* <FormLabel id="demo-radio-buttons-group-label">
                      Export File as :
                    </FormLabel> */}
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio size="small" />}
                        label="As PDF"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio size="small" />}
                        label="As Docx"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio size="small" />}
                        label="As Text"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              )}
              {props.open.boxType === "Share Vai" && <div></div>}
              <Button variant="contained" sx={{ float: "right" }} size="small">
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
function ResultTabs({ Query }) {
  const [value, setValue] = React.useState(0);
  const editorRef = useRef(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {Object.keys(Query).map((row, i) => (
            <Tab size="small" label={`Result ${i + 1}`} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>

      {Object.keys(Query).map((row, i) => (
        <TabPanel value={value} index={i}>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={`${Query[row]}`}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </TabPanel>
      ))}
    </>
  );
}
// for modal box
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default Home;
