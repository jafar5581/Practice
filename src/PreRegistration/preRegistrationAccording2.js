import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
//select
import Select from 'react-select';



const Referral_Type = [
    { value: 'Doctor', label: 'Doctor', color: '#00B8D9', isFixed: true },

]
const Referral_Doctor = [
    { value: 'Dr.Tejas Bhosle', label: 'Dr.Tejas Bhosle', color: '#00B8D9', isFixed: true },
    { value: 'Dr.Ashvini Yadav', label: 'Dr.Ashvini Yadav', color: '#00B8D9', isFixed: true },
    { value: 'Dr.Tushar Sawant', label: 'Doctor', color: '#00B8D9', isFixed: true },

]
function PreRegistrationAccording2() {
    const [expanded, setExpanded] = useState(true);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };
    //dropdown
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false)
    //dropdown


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
                    sx={{width:'full'}}
                >
                    <Typography>Referral Details</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{backgroundColor:'#F5F5F5'}}>
                    <Typography>
                        <div >
                            <div className="flex justify-start items-center gap-2 ">
                                <Select
                                    className="basic-single w-[50%]"
                                    classNamePrefix="Prfix"
                                    defaultInputValue="
                                    Referral Type
                                    "
                                    defaultValue={Referral_Type[0]}
                                    isDisabled={isDisabled}
                                    isLoading={isLoading}
                                    isClearable={isClearable}
                                    isRtl={isRtl}
                                    isSearchable={isSearchable}
                                    name="color"
                                    options={
                                        Referral_Type
                                    }
                                />
                                <Select
                                    className="basic-single w-[50%]"
                                    classNamePrefix="Prfix"
                                    defaultInputValue="
                                    Referral Type
                                    "
                                    defaultValue={Referral_Doctor[0]}
                                    isDisabled={isDisabled}
                                    isLoading={isLoading}
                                    isClearable={isClearable}
                                    isRtl={isRtl}
                                    isSearchable={isSearchable}
                                    name="color"
                                    options={
                                        Referral_Doctor
                                    }
                                />
                            </div>

                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default PreRegistrationAccording2