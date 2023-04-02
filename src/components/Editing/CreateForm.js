import { Box, Button, FormControlLabel, FormGroup, Grid, IconButton, MenuItem, Switch, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';
//css
import '../assets/css/create.css'
//icon
// import DeleteRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
// apis 
import {addForm} from '../../service/service'
import { setAlert } from '../../store/action/action';
import { useDispatch, useSelector } from 'react-redux';

const CreateForm = ({history}) => {

    const [data, setData] = useState({ title: 'Untitled Form', description : "Form Description" });
    const [section, setSection] = useState([{ question: '', fieldType: '', options: [{ "Option 1": '' }], required: false }]);

    const dispatch = useDispatch();
    const {auth} = useSelector(state=>state);

    function handleChange(e) {
        setData(old => ({ ...old, [e.target.name]: e.target.value }))
    }

    function checkEmpty(e) {
        if (e.target.name === 'title' && e.target.value === '')
            setData(old => ({ ...old, [e.target.name]: "Untitled Form" }))
    }

    function addSection() {
        setSection(old => [...old, { question: '', fieldType: '', options: [{ "Option 1": '' }], required: false }])
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
      
            const FD = new FormData();
      
            FD.append('title',data.title);
            FD.append('description',data.description);
            FD.append('email',auth.email);
            FD.append('sections',JSON.stringify(section));
      
            let res = await addForm(FD)
            
            if (res.status === 200) {
                history('/listing')
              dispatch(setAlert({
                open: true,
                variant: 'success',
                message: "Form added successfully !!!"
              }))
            }
            else {
                dispatch(setAlert({
                    open: true,
                    variant: 'error',
                    message: "Operation failed !!!"
                  }))
            }
          } catch (error) {
            dispatch(setAlert(
              {
                open: true,
                message: 'Something Went Wrong !!!',
                variant: 'error'
              }
            ))
          }
      
    }

    return (
        <Box className='createForm'>
            {/* Title Section */}
            <Grid container className='mainWrapper' component={'form'} method = 'post' encType='multipart/form-data' onSubmit={handleSubmit}>
                <Grid item xs={12} className='titleSection boxShadow' >
                    <TextField
                        fullWidth
                        name='title'
                        variant='standard'
                        sx={{ fontSize: '2rem' }}
                        value={data.title}
                        onBlur={checkEmpty}
                        onChange={handleChange}
                        placeholder='From Title / Question' />
                    <TextField
                        fullWidth
                        name='description'
                        variant='standard'
                        sx={{ fontSize: '2rem' }}
                        value={data.description || ''}
                        onBlur={checkEmpty}
                        onChange={handleChange}
                        placeholder='From Description' />
                </Grid>
                {/* Title Section ends*/}
                {/* Custom Sections  */}
                <CreateSection section={section} setSection={setSection} />
                {/* Custom Sections ends */}
                {/* Add Section */}
                <Grid item xs={12} className='flexUtility'>
                    <Tooltip title='Add Section'>
                        <IconButton color='primary' onClick={addSection} >
                            <AddCircleIcon sx={{ fontSize: '35px' }} />
                        </IconButton>
                    </Tooltip>
                </Grid>
                {/* Add Section ends*/}
                {/* Submit */}
                <Grid item xs={12} className='submitButton'>
                    <Button type = "submit" startIcon={<NoteAddIcon />} variant='contained' >Create Form</Button>
                </Grid>
                {/* Submit Button */}
            </Grid>
        </Box>
    );
}

function CreateSection({ section, setSection }) {

    const fieldType = [
        "TextField",
        "Dropdown",
        "Checkbox",
        "Radio",
    ]

    function handleChange(e, i) {
        setSection(old => old.map((row, index) => {
            if (index === i) {
                return { ...row, [e.target.name]: e.target.value }
            }
            else
                return row
        }))
    }

    function addOption(e, i) {
        setSection(old => old.map((row, index) => {
            if (index === i) {
                return {
                    ...row, options: [...old[i].options,
                    { [`Option ${old[i].options.length + 1}`]: "" }]
                }
            }
            else
                return row
        }))
    }
    function removeOption(e, i, optionIndex) {
        setSection(old => old.map((row, index) => {
            if (index === i) {
                return {
                    ...row, options: old[i].options.filter((row, option) => optionIndex !== option)
                }
            }
            else
                return row
        }))
    }

    function handleOptionsValue(e, i, optionIndex) {
        // console.log(section)
        setSection(old => old.map((row, index) => {
            if (index === i) {
                return {
                    ...row, options: old[i].options.map((val, option) => {
                        if (option === optionIndex) {
                            return { [`Option ${optionIndex + 1}`]: e.target.value }
                        }
                        else
                            return val
                    })
                }
            }
            else
                return row
        }))
    }

    function removeSection(index) {
        setSection(old => old.filter((row, i) => i !== index))
    }

    function handleRequired(e, i) {
        // console.log(section)
        setSection(old => old.map((row, index) => {
            if (index === i) {
                return {
                    ...row, required: e.target.checked
                }
            }
            else
                return row
        }))
    }
    return (
        <>
            {section.map((row, index) =>
                <Grid key={index} item xs={12} className='flexUtility section boxShadow'>
                    {/* question */}
                    <TextField
                        variant='standard'
                        value={section[index].question || ''}
                        fullWidth size={'small'}
                        label='Question'
                        onChange={(e) => handleChange(e, index)}
                        name='question' />
                    {/* question ends*/}
                    <TextField
                        fullWidth
                        select
                        size='small'
                        value={section[index].fieldType || ''}
                        label='Answer Type'
                        onChange={(e) => handleChange(e, index)}
                        name='fieldType'>
                        {fieldType.map((row =>
                            <MenuItem key={row} value={row}>
                                {row}
                            </MenuItem>))}
                    </TextField>
                    {/* // textField */}
                    {
                        section[index].fieldType === 'TextField'
                        && <TextField
                            fullWidth
                            disabled
                            placeholder='Text'
                            size='small'
                            name={'response'}
                        />
                    }
                    {/* // textField ends*/}
                    {/* // dropdown, checkBox, Radio */}
                    {
                        (section[index].fieldType === 'Dropdown'
                            || section[index].fieldType === 'Radio'
                            || section[index].fieldType === 'Checkbox'

                        )
                        && <>
                            {/* <TextField
                                fullWidth
                                select
                                size='small'
                                label={section[index].question}
                                name={'response'}
                            >
                                {section[index].options.map((row, index) => <MenuItem key={row[`Option ${index + 1}`]} value={row["Option " + index + 1]}>
                                    {console.log(row)}
                                    {row[`Option ${index + 1}`]}
                                </MenuItem>)}
                            </TextField> */}

                            {/* rendering new option adding fields */}
                            {
                                section[index].options.map((row, i) =>
                                    <Box className={'optionWrapper'}>
                                        <TextField
                                            size={'small'}
                                            fullWidth
                                            name={Object.keys(row)[0]}
                                            onChange={(e) => handleOptionsValue(e, index, i)}
                                            label={Object.keys(row)[0]}
                                        />
                                        <Tooltip title='Remove Option'>
                                            <IconButton onClick={(e) => removeOption(e, index, i)} >
                                                <HighlightOffRoundedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )
                            }

                            {/* add  option*/}
                            <Tooltip title='Add Option'>
                                <IconButton onClick={(e) => addOption(e, index)} >
                                    <AddCircleIcon />
                                </IconButton>
                            </Tooltip>
                        </>

                    }
                    {/* // dropdown ends*/}
                    {/* remove button  */}
                    <br />
                    <br />
                    <Box className='removeSec' >
                        <FormGroup>
                            <FormControlLabel control={<Switch
                                checked={section[index].required || false}
                                onChange={(e) => handleRequired(e, index)}
                            />} label="Required" />
                        </FormGroup>
                        <Tooltip title='Remove Section'>
                            <IconButton onClick={() => removeSection(index)} >
                                <DeleteRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    {/* remove button ends */}
                </Grid>
            )
            }
        </>
    )
}


export default CreateForm;
