
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import React, { useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
//table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { FaPencilAlt } from "react-icons/fa";
import axios from 'axios';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function CurdOpretion(){
    const schema = yup.object({
        firstname: yup.string().required(),
        middlename: yup.string().required(),
        lastname: yup.string().required(),
        age: yup.string().required(),
        email_Id: yup.string().required(),
        city: yup.string().required(),
        pincode: yup.string().required(),
        landmark: yup.string().required()
    })
    const [data, setData] = React.useState([]);
    const [editindex, seteditindex] = React.useState(false);
    const [isUpadte, setIsUpadte] = React.useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({

        resolver: yupResolver(schema)
    });

    const onsubmit = (value, e) => {
        e.preventDefault();
        if (!isUpadte) {
            post(value)
        } else {
            handleUpdate(value)
        }
    }

    const handleEdit = (update) => {
        seteditindex(update);
        setIsUpadte(true)
        reset(update)
    }

    const handleUpdate = (i) => {
        axios.put('http://http://192.168.0.111:8080/formController/change', i)
      
            .then((response) => {
                console.log(response.data);
                let userdata = data.map(() => {
                    if (i.id === userdata.id) {
                        return { ...data, ...i };
                    } else {
                        return { userdata };
                    }
                });
                seteditindex(userdata);
                setIsUpadte(null);
                seteditindex(false);

            })
            .catch("error")
    }

    const getData = async () => {
        try {
            const responce = await fetch("http://192.168.0.111:8080/formController/form")
            const res = await responce.json();
            console.log(res);
            setData(res)
        } catch (error) {
            console.log(error, "error");
        }
    }

    const post = async (data) => {
        try {
            await axios.post("http://192.168.0.111:8080/formController/store", data)
            reset();
            alert('Submitted Successfully')
            setData(data)
        }
        catch (error) {
            console.log(error, "faild")
            alert("errror", error)
        }
    }

    useEffect(() => {
        getData();
    }, [])


    return(
        <div>
             <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography className='font-bold'>CURD OPRETION</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div>
            <div className="flex justify-center items-center py-5" >
                <form onSubmit={handleSubmit(onsubmit)} className="h-full w-[52vw] border border-black" noValidate>
                    <h1 className="text-center font-bold">FORM</h1>
                    <div className="flex justify-center space-x-3 py-2 px-3">
                        <TextField
                            required
                            id="outlined-required"
                            label="First Name"
                            size="small"
                            {...register("firstname")}
                            error={!!errors.firstname}
                            InputLabelProps={{
                                shrink: editindex.firstname
                            }}
                        />


                        <TextField
                            required
                            id="outlined-required"
                            label="Middle Name"
                            size="small"
                            {...register("middlename")}
                            error={!!errors.middlename}
                            InputLabelProps={{
                                shrink: editindex.middlename
                            }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Last Name"
                            size="small"
                            {...register("lastname")}
                            error={!!errors.lastname}
                            InputLabelProps={{
                                shrink: editindex.lastname
                            }}
                        />
                    </div>
                    <div className="flex justify-center space-x-3 py-2 px-3">
                        <TextField
                            required
                            id="outlined-required"
                            label="Age"
                            size="small"
                            // type="number"
                            {...register("age")}
                            InputLabelProps={{
                                shrink: editindex.age
                            }}

                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Email Id"
                            size="small"
                            type="email"
                            {...register("email_Id")}
                            error={!!errors.email_Id}
                            InputLabelProps={{
                                shrink: editindex.email_Id
                            }}
                        />
                    </div>
                    <div className="flex justify-center space-x-3 py-2 px-3">
                        <TextField
                            required
                            id="outlined-required"
                            label="City"
                            size="small"
                            {...register("city")}
                            error={!!errors.city}
                            InputLabelProps={{
                                shrink: editindex.city
                            }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="PinCode"
                            size="small"
                            {...register("pincode")}
                            InputLabelProps={{
                                shrink: editindex.pincode
                            }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Land Mark"
                            size="small"
                            {...register("landmark")}
                            InputLabelProps={{
                                shrink: editindex.landmark
                            }}
                        />
                    </div>

                    <div className="text-center py-2">
                        <Button variant="contained" color="success" type="submit">
                            {isUpadte ? "Update" : " Submit"}
                        </Button>
                    </div>
                </form>

            </div>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">FIRST NAME</StyledTableCell>
                        <StyledTableCell align="right">MIDDLE NAME</StyledTableCell>
                        <StyledTableCell align="right">LAST NAME</StyledTableCell>
                        <StyledTableCell align="right">AGE</StyledTableCell>
                        <StyledTableCell align="right">EMAIL ID</StyledTableCell>
                        <StyledTableCell align="right">CITY</StyledTableCell>
                        <StyledTableCell align="right">PINCODE</StyledTableCell>
                        <StyledTableCell align="right">EMAIL ID</StyledTableCell>
                        <StyledTableCell align="right">UPDATE</StyledTableCell>
                    </TableRow>
                </TableHead>
                {
                    <TableBody>
                        {data.map((get, i) => (
                            <StyledTableRow key={get.id}>
                                <StyledTableCell align="right">{get.firstname}</StyledTableCell>
                                <StyledTableCell align="right">{get.middlename}</StyledTableCell>
                                <StyledTableCell align="right">{get.lastname}</StyledTableCell>
                                <StyledTableCell align="right">{get.age}</StyledTableCell>
                                <StyledTableCell align="right">{get.email_Id}</StyledTableCell>
                                <StyledTableCell align="right">{get.city}</StyledTableCell>
                                <StyledTableCell align="right">{get.pincode}</StyledTableCell>
                                <StyledTableCell align="right">{get.landmark}</StyledTableCell>
                                <button className="ml-14   mt-4" onClick={() => handleEdit(get)} ><FaPencilAlt /></button>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                }
            </Table>
        </div >
          </Typography>
        </AccordionDetails>
      </Accordion>
        </div>
    )
}
export default CurdOpretion