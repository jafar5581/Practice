import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import { TextField } from "@mui/material";


function PreRegistrationAccording3() {
    const [expanded, setExpanded] = useState(true);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };



    return (
        <div >
            <Accordion
                expanded={expanded}
                onChange={handleExpansion}
                slots={{ transition: Fade }}
                slotProps={{ transition: { timeout: 400 } }}
                sx={{
                    "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
                    "& .MuiAccordionDetails-root": {
                        display: expanded ? "block" : "none",
                       
                    },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    
                >
                    <Typography>Representative Details</Typography>
                 
                </AccordionSummary>
                <AccordionDetails sx={{backgroundColor:'#F5F5F5'}} >
                    <Typography>
                        <div className="bg-gray-100">
                            <div className="flex justify-center items-center gap-3">
                                <TextField
                                    sx={{ width: 450 ,backgroundColor:"white"}}
                                    size="small"
                                    id="filled-search"
                                    label="Name of Representative
                                    "
                                    placeholder="Name of Representative
                                    "
                                    type="text"
                                //   className="w-96"
                                />
                                   <TextField
                                    sx={{ width: 450,backgroundColor:"white"} }
                                    size="small"
                                    id="filled-search"
                                    label="Mobile No. of Representative
                                    "
                                    placeholder="Mobile No. of Representative
                                    "
                                    type="text"
                                //   className="w-2/6"
                                />
                                <TextField
                                    sx={{ width: 450,backgroundColor:"white"} }
                                    size="small"
                                    id="filled-search"
                                    label="
                                    Relationship with Patient
                                    "
                                    placeholder="
                                    Relationship with Patient
                                    "
                                    type="text"
                                    // className="w-2/6"
                                />
                            </div>

                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default PreRegistrationAccording3