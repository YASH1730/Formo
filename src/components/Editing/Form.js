import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    IconButton,
    MenuItem,
    Radio,
    RadioGroup,
    Switch,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//css
import "../assets/css/create.css";
//icon
// import DeleteRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import SendIcon from '@mui/icons-material/Send';
// apis
import { getFormDetails, submitResponse } from "../../service/service";
// redux
import { setAlert } from "../../store/action/action";
import { useDispatch, useSelector } from "react-redux";

const Form = ({ history }) => {
    const [data, setData] = useState({
        title: "Untitled Form",
        description: "Form Description",
    });
    const [section, setSection] = useState([
        {
            question: "",
            fieldType: "",
            options: [{ "Option 1": "" }],
            required: false,
        },
    ]);

    const [response, setResponse] = useState({});

    const { uuid } = useParams();

    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state);

    useEffect(() => {
        fetchData();
    }, [uuid]);

    async function fetchData() {
        try {
            let res = await getFormDetails(uuid);
            if (res) {
                setData({ title: res.data.title, description: res.data.description });
                setSection([...res.data.sections]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();

            const FD = new FormData();

            Object.keys(response).map((key,index)=>{
                FD.append(key,response[key])
            })

            FD.append("email",auth.email)
            FD.append("uuid",uuid);
            let res = await submitResponse(FD);

            if (res.status === 200) {
                history("/listing");
                dispatch(
                    setAlert({
                        open: true,
                        variant: "success",
                        message: "Form updated successfully !!!",
                    })
                );
            } else {
                dispatch(
                    setAlert({
                        open: true,
                        variant: "error",
                        message: "Operation failed !!!",
                    })
                );
            }
        } catch (error) {
            dispatch(
                setAlert({
                    open: true,
                    message: "Something Went Wrong !!!",
                    variant: "error",
                })
            );
        }
    }

    return (
        <Box className="createForm">
            {/* Title Section */}
            {data && (
                <Grid
                    container
                    className="mainWrapper"
                    component={"form"}
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                >
                    <Grid item xs={12} className="titleSection boxShadow">
                        <Typography variant="h4">{data.title}</Typography>
                        <Typography variant="body1">{data.description}</Typography>
                    </Grid>
                    {/* Title Section ends*/}
                    {/* Custom Sections  */}
                    <CreateSection
                        response={response}
                        setResponse={setResponse}
                        section={section}
                    />
                    {/* Custom Sections ends */}
                    {/* Submit */}
                    <Grid item xs={12} className="submitButton">
                        <Button type="submit" startIcon={<SendIcon />} variant="contained">
                            Submit
                        </Button>
                    </Grid>
                    {/* Submit Button */}
                </Grid>
            )}
        </Box>
    );
};

function CreateSection({ section, response, setResponse }) {
    function handleValue(e) {
        console.log(response);
        setResponse((old) => ({
            ...old,
            [e.target.name]: e.target.value,
        }));
    }
    function handleCheckValue(e) {
        console.log(response);
        setResponse((old) => ({
            ...old,
            [e.target.name]: e.target.checked,
        }));
    }

    return (
        <>
            {section.map((row, index) => (
                <Grid key={index} item xs={12} className=" section boxShadow">
                    {/* question */}
                    <Typography variant="h6">{row.question}</Typography>
                    {/* question ends*/}

                    {/* // textField */}
                    {row.fieldType === "TextField" && (
                        <TextField
                            fullWidth
                            required={true}
                            value={response[row.question.replace(" ", "_")] || ""}
                            placeholder="Text"
                            size="small"
                            onChange={handleValue}
                            name={row.question.replace(" ", "_")}
                        />
                    )}
                    {/* // textField ends*/}

                    {/* // dropdown,*/}
                    {row.fieldType === "Dropdown" && (
                        <>
                            <TextField
                                fullWidth
                                select
                                required={row.required}
                                onChange={handleValue}
                                name={row.question.replace(" ", "_")}
                                value={
                                    response[row.question.replace(" ", "_")] || ""
                                }
                                size="small"
                                label={row.question}
                            >
                                {row.options.map((row, index) => <MenuItem
                                    key={row[`Option ${index + 1}`]}
                                    value={row[`Option ${index + 1}`]}
                                >
                                    {row[`Option ${index + 1}`]}
                                </MenuItem>
                                )}
                            </TextField>
                        </>
                    )}
                    {/* // dropdown ends*/}
                    {/* // Radio,*/}
                    {row.fieldType === "Radio" && (
                        <>
                            <FormControl>
                                <RadioGroup
                                    required={row.required}
                                    onChange={handleValue}
                                    value={response[row.question.replace(" ", "_")] || ''}
                                    name={row.question.replace(" ", "_")}
                                >
                                    {row.options.map((row, i) => (
                                        <Box className={"optionWrapper"}>
                                            <FormControlLabel
                                                value={row[`Option ${i + 1}`]}
                                                control={<Radio />}
                                                label={row[`Option ${i + 1}`]}
                                            />
                                        </Box>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </>
                    )}
                    {/* // Radio ends*/}
                    {/* // CheckBox,*/}
                    {row.fieldType === "Checkbox" && (
                        <>
                            <FormGroup>
                                {row.options.map((row, i) => (
                                    <FormControlLabel
                                        required={row.required}

                                        checked={response[row[`Option ${i + 1}`]]}
                                        onChange={handleCheckValue}
                                        name={row[`Option ${i + 1}`]}
                                        control={<Checkbox />}
                                        label={row[`Option ${i + 1}`]}
                                    />
                                ))}
                            </FormGroup>
                        </>
                    )}
                    {/* // CheckBOx ends*/}
                </Grid>
            ))}
        </>
    );
}

export default Form;
