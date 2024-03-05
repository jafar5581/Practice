import React,{useState} from "react";
import TextField from '@mui/material/TextField';

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useFieldArray, useFormContext} from 'react-hook-form'
import Button from '@mui/material/Button';
import DrugsCycle from "./Drugs";







function DaysPercycle({daysfiled,nestindex}) {


    const {register,control}=useFormContext()

const {fields,append,remove}=useFieldArray({
    control,
    name:`chemoprotocol.${nestindex}daycycle`
})

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value)

    };

            if (daysfiled > fields.length) {
                let j = fields.length;
                while (j < daysfiled) {
                    append({});
                    j++;
                }
            }


    return (
        <div>

            {/* //first according// */}

            {/* //days according */}
          
            {fields.map((item,childindex) => (
                <div>

            <div className="flex justify-start items-center py-3 gap-2">
          
                <p>Days</p>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Protocol Code"
                    placeholder=""
                    multiline
                    maxRows={4}
                    size="small"
                    sx={{ width: 130 }}
                />
            </div>
         
           
            <DrugsCycle nestindex={nestindex} childindex={childindex}/>
            </div>
              ))}

      
        </div>
    )
}




  
export default DaysPercycle