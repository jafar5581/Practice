import React from "react";
import TextField from '@mui/material/TextField';
import TableCell from "@mui/material/TableCell";

import { AiOutlineDelete } from "react-icons/ai";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useFieldArray, useFormContext } from 'react-hook-form'

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BsFillPlusCircleFill } from "react-icons/bs";


function DrugsCycle(props) {
    const { register } = useFormContext();
    const nestindex = props.nestindex
    const childindex = props.childindex;
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `chemoprotocol.${nestindex}.${childindex}.drugs`
    });

    console.log("fileds", fields);

    // const [drugName, setdrugName] = React.useState([])
    // const [dose, setdose] = React.useState([]);

    const [doses, setdoses] = React.useState([]);


    function drugvalue(value, index) {

        const uniquedoses = [...doses]
        uniquedoses[index] = { ...uniquedoses[index], drugName: value }
        setdoses(uniquedoses);

    }

    function dosevalue(value, index) {
        const uniquedoses = [...doses]
        uniquedoses[index] = { ...uniquedoses[index], dose: value }
        setdoses(uniquedoses);

    }
    // const alldurg = [
    //     [
    //         {drugName:10,dose:10},

    //         {},
    //         {}
    //     ],
    //     [
    //         {},
    //         {},
    //         {}
    //     ]
    // ];  
    // alldurg.push([...doses])
    // console.log(alldurg)



    // // console.log("drugname",drugName)
    // console.log("dose", dosalldurges)





    return (
        <div>



            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead className="bg-gray-300">
                    <TableRow>
                        <TableCell>Actions</TableCell>
                        <TableCell sx={{ minWidth: 250 }}> <button type="button" onClick={() => {
                            append({})
                        }}>
                            <div className="flex items-center">

                                <h6>Drug</h6>
                                <p>

                                    <BsFillPlusCircleFill />
                                </p>

                            </div>
                        </button>
                        </TableCell>
                        <TableCell sx={{ minWidth: 500 }} >Drug Name</TableCell>
                        <TableCell >Overin</TableCell>
                        <TableCell >Duraition</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>




                    {
                        fields.map((item, index3) => (
                            <TableRow key={item.id} >
                                <TableCell component="th" scope="row" className="flex justify-start items-center w-10">
                                    <AiOutlineDelete onClick={() => remove(index3)} />
                                </TableCell>
                                <TableCell className="w-3/12" >
                                    <div className="flex justify-start items-center gap-3 border-r-4 ml-8 ">
                                        <TextField

                                            id="outlined-multiline-flexible"
                                            label="Drug Name"
                                            placeholder=""
                                            multiline
                                            maxRows={4}
                                            size="small"
                                            type="search"
                                            sx={{ width: 130 }}
                                            onChange={(e) => drugvalue(e.target.value, index3)}
                                        // {...register(`drugs.${nestindex}.${childindex}.${index3}.name`)}


                                        />
                                        <TextField

                                            id="outlined-multiline-flexible"
                                            label="Dose"
                                            placeholder="   "
                                            multiline
                                            maxRows={4}
                                            size="small"
                                            type="number"
                                            sx={{ width: 100 }}
                                            onChange={(e) => dosevalue(e.target.value, index3)}
                                        // {...register(`drugs.${nestindex}.${childindex}.${index3}.name`)}

                                        />
                                        <FormControl variant="filled" sx={{ minWidth: 80, minHeight: 15 }}>
                                            <InputLabel id="demo-simple-select-filled-label">UOM</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                // value={age}
                                                // onChange={handleChange}
                                                size="small"
                                                disabled
                                            >

                                            </Select>
                                        </FormControl>
                                        <Button variant="contained" style={{ background: "#002D62" }}  onClick={[...doses]}>ADD </Button>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <TextField

                                        id="outlined-multiline-flexible"
                                        multiline
                                        maxRows={4}
                                        size="small"
                                        type="text"
                                        sx={{ width: 150 }}
                                        value={doses[index3]?.drugName || ""}
                                    />
                                    <TextField

                                        id="outlined-multiline-flexible"
                                        multiline
                                        maxRows={4}
                                        size="small"
                                        type="number"
                                        sx={{ width: 150 }}
                                        value={doses[index3]?.dose || ""}
                                    />
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>


                            </TableRow>
                        ))


                    }




                </TableBody>
            </Table>

        </div>



    )
}

export default DrugsCycle