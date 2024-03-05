
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
//according
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
//useform
import { useFieldArray } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import DaysPercycle from "./DaysPercycle";




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "95%",
    height: "95%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: "auto"
};


function ChemoProtocol() {


    const { register, control, handleSubmit } = useFormContext();

    //useFiledArry
    const { fields, append, remove } = useFieldArray({
        control,
        name: "chemoprotocol",
    })

    //

    //checkbox
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    //checkbox
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // chemo proticool fisrt index
    const [cycleno, setCycleNo] = useState(0);
    const [cyclefields, setcyclefields] = useState(0);

    if (cyclefields > fields.length) {
        let i = fields.length;
        while (i < cyclefields) {
            append({});
            i++;
        }
    }
    // days cycle second  index
    const [daysinputNum, setdaysinputNum] = React.useState(0);
    const [daysfiled, setdaysfiled] = React.useState(0);

    const onsubmit = (e) => {
        console.log(e, "data")
    }



    return (
        <div>


            <div className="space-x-3 flex justify-start items-center">

                <Button variant="contained" onClick={handleOpen} style={{ background: "#002D62" }}>ADD CHEMO</Button>
            </div>
            <Modal
                keepMounted
                open={open}

                aria-labelledby="keep-mounted-modal-title"
                aria-descri bedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit(onsubmit)}>


                        <button type="button" onClick={handleClose} className="float-right " >❎</button>
                        <div className="flex justify-start items-center space-x-4 ">
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Protocol Code"
                                placeholder="Protocol Code"
                                multiline
                                maxRows={4}
                                size="small"
                                sx={{ width: 400 }}
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Protocol Code"
                                placeholder="Protocol Code"
                                multiline
                                maxRows={4}
                                size="small"
                                sx={{ width: 400 }}
                            />

                            <Checkbox {...label} />
                            Active
                        </div>

                        <div className="py-1 flex justify-center items-center   pb-2   ">
                            <div className="grid grid-cols-4">
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="No Of Cycle"
                                    placeholder="No of Cycle"
                                    multiline
                                    maxRows={4}
                                    size="small"
                                    onChange={(e) => {
                                        setCycleNo(e.target.value)
                                    }}

                                    className="w-[18vw]"
                                />

                                <Button variant="contained" className="w-[14vw]" onClick={() => {
                                    setcyclefields(cycleno)

                                }} style={{ background: "#002D62" }}>Create</Button>
                          
                            <div className="flex justify-between gap-3">
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Days Of Interval"
                                    placeholder="Days Of Interval"
                                    multiline
                                    maxRows={4}
                                    size="small"
                                    className="w-[34vw]"

                                />
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Route"
                                    placeholder="Route"
                                    multiline
                                    maxRows={4}
                                    size="small"
                                    className="w-[34vw]"
                                 
                                />

                            </div>
                            </div>
                        </div>
                        {/* according */}
                        {
                            fields.map((items, index) => (
                                <Accordion >
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        <Typography>
                                            Cycle {index + 1}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="flex justify-start space-x-3 items-center">
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                label="Days Per Cycle"
                                                placeholder="Days Per Cycle"
                                                multiline
                                                maxRows={4}
                                                size="small"
                                                {...register(`chemoprotocol.${index}.name`)}
                                                sx={{ width: 280 }}
                                                onChange={(e) => { setdaysinputNum(e.target.value) }}
                                            />

                                            <Button variant="contained" style={{ background: "#002D62" }} onClick={
                                                () => { setdaysfiled(daysinputNum) }
                                            }  >Create</Button>
                                            <Button variant="outlined" color="error" onClick={() => remove(items)}>Reset</Button>
                                        </div>
                                        {/* CHEMO TABLE COMPONET CALL */}
                                        <DaysPercycle daysfiled={daysfiled} nestindex={index} />
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        }

                        <Button variant="contained" type="submit" color="success">
                            ADD ALL GET DATA
                        </Button>
                    </form>
                </Box>
            </Modal>




        </div>
    )
}
export default ChemoProtocol;