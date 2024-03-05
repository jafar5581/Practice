import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TextField } from "@mui/material";
//date 
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//dropdown
import Select from 'react-select';
//radio btn
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
//file upload
import { LoadingOutlined } from "@ant-design/icons";
import { IoPersonAdd } from "react-icons/io5";
import { message, Upload } from "antd";
//uplod document
import { MdOutlineFileUpload } from "react-icons/md";
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import PreRegistrationAccording2 from "./preRegistrationAccording2";
import PreRegistrationAccording3 from "./preRegistrationAccording3";
import { useForm, Controller } from 'react-hook-form'
import *  as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";



const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

//dropdown css
const customStyles = {
    control: (base, state) => ({
        ...base,
        background: "##add8e6",
        // match with the menu
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "gray" : "gray",
        // Removes weird border around container
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "gray" : "gray"
        }
    }),
    menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 0,
        background: "##add8e6"
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
        background: "##add8e6"

    })
};
//dropdown css
//upload image

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
};
//upload image
function PreRegistrationAccording() {
    const {watch} =useForm();
      const PatientRegistrtion = yup.object({
        Firstname: yup.string().required(),
        Age: yup.string().max(105).required(),
        email: yup.string().email().required(),
        Middle_Name: yup.string().required(),
        Lastname: yup.string().required(),
        number: yup.string().required(),
        houseNo:yup.string().required(),
        Countrys: yup.object().shape({
            label: yup.string().required(),
            value: yup.string().required()
          })
    })
    const defaultValues = {
        Country: null,
    }

    const { register, handleSubmit, formState: { errors }, control ,setValue,reset} = useForm({
        resolver: yupResolver(PatientRegistrtion),
        defaultValues
    });




    const prefixObj = [
        { value: 'Mr', label: 'Mr' },
        { value: 'Miss', label: 'Miss' },
      
       
    ]
    const ISDNO = [
        { value: 'ISD', label: 'ISD',},
    ]
    const Marital_Status = [
        { value: 'Single', label: 'Single'},
        { value: 'Divorced', label: 'Divorced' },
        { value: 'Married', label: 'Married' },
    ]
    const Nationality = [
        { value: 'India', label: 'India'},
        { value: 'American', label: 'American' },
        { value: 'Chainese', label: 'Chainese' },
    ]
    const blood_Group = [
        { value: '+ve', label: '+ve' },
        { value: '-ve', label: '-ve' },
        { value: 'A+ve', label: 'A+ve' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' },
    ]
    const Documents = [
        { value: 'Aadhar Card', label: 'Aadhar Card' },
        { value: 'PanCard', label: 'PanCard'},
        { value: 'Driving License', label: 'Driving License' },

    ]
    const Country = [
        { value: 'India', label: 'India' },
        { value: 'America', label: 'America' },
        { value: 'Bhutan', label: 'Bhutan' },

    ]
    const State = [
        { value: 'Maharastra', label: 'Maharastra' },
        { value: 'Goa', label: 'Goa' },
        { value: 'Gujrat', label: 'Gujrat'},

    ]
    const District = [
        { value: 'kolhapur', label: 'kolhapur'},
    ]
    const Area = [
        { value: 'Rankala', label: 'Rankala'},
    ]
    const Taluka = [
        { value: 'Karvir', label: 'Karvir' },
    ]
    const City = [
        { value: 'Ichalkaranji', label: 'Ichalkaranji' },
    ]

    //upload image
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleChange = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <button style={{ border: 0, background: "none", }} type="button" >
            {loading ? <LoadingOutlined /> : <IoPersonAdd size={40} />}
            <div style={{ marginTop: 8, }} >
                Upload
            </div>
        </button>
    );
    //upload image


    const onsubmit = (e) => {

        alert("add")
        console.log(e)
    }
    const [age, setAge] = useState(null)
    const [year, setYear] = useState(null)
    const [month, setMonth] = useState(null)
    const [day, setDay] = useState(null)
    

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birthDateObject = new Date(birthDate);
        let age = today.getFullYear() - birthDateObject.getFullYear();
        let year = today.getFullYear() - birthDateObject.getFullYear();
        let month = today.getMonth() - birthDateObject.getMonth();
        let day = today.getDate() - birthDateObject.getDate();
        const m = today.getMonth() - birthDateObject.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDateObject.getDate())) {
            age--;
        }
        if (day < 0) {
            month--;
            const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
            day = prevMonth.getDate() - birthDateObject.getDate() + today.getDate();
        }
        if (month < 0) {
            year--;
            month = 12 + month;
        }
        return { age, year, month, day };
    }


    const handeleDateOfBirth = (e) => {
        const { age, year, month, day } = calculateAge(e.target.value);
        setAge(age)
        setYear(year)
        setMonth(month)
        setDay(day)
    }

const prefrixValue = watch("prefixObj")
    useEffect(()=>{

        if (prefrixValue === 'Mr') {
            setValue("Gender","male")
            
        }else if(prefrixValue === 'Miss') {
            setValue("Gender","female")
        }else if(prefrixValue === ''){
            setValue("Gender","")
        }


    },[prefrixValue])
    return (
        <form onSubmit={handleSubmit(onsubmit)} className=" overflow-x-hidden ">
            <Accordion sx={{ overflow: 'hidden' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"

                >
                    Accordion 1
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <h1 className="font-bold">Patient Basic Information</h1>
                        <div className="flex justify-center w-[89vw]">
                            <div className="flex justify-center  items-center gap-5  ">
                                <div>
                                    <TextField
                                        sx={{ width: '23.3vw', backgroundColor: "white" }}
                                        size="small"
                                        id="filled-search"
                                        label="Search field"
                                        type="search"
                                    />
                                    <div className="flex justify-between gap-4 py-2 w-[full]">
                                        <Controller
                                            name="prefixObj"
                                            control={control}
                                            value={watch("prefixObj") || " "}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    isClearable
                                                    isSearchable={false}
                                                    placeholder="Prefix"
                                                    classNamePrefix="Prefix"
                                                    options={prefixObj}
                                                    styles={customStyles}
                                                />
                                            )}
                                        />

                                        <TextField
                                            sx={{ width: '16.4vw', backgroundColor: "white" }}
                                            size="small"
                                            id="filled-search"
                                            label="First Name"
                                            placeholder="First Name"
                                            type="text"
                                            {...register("Firstname")}
                                            error={errors.Firstname}
                                        />
                                    </div>
                                    <div className="flex justify-center gap-1">
                                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={["DatePicker", "DatePicker"]}>
                                                <DatePicker
                                                    label="Date Of Birth"
                                                    defaultValue={dayjs("2024-03-01 ")}
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    sx={{ backgroundColor: "white", ml: 1, width: '18.3 vw' }}
                                                    {...register("date_of_birth")}
                                                    onChange={handeleDateOfBirth}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider> */}
                                         <TextField
                                            sx={{ width: '30.3', mt: 1, backgroundColor: "white" }}
                                            size="small"
                                            type="date"
                                            {...register("date")}
                                            onChange={handeleDateOfBirth}
                                            readOnly
                                        />


                                        <TextField
                                            sx={{ width: '12vw', mt: 1, backgroundColor: "white" }}
                                            size="small"
                                            id="filled-search"
                                            label="Age"
                                            placeholder="Age"
                                            type="text"
                                            {...register("Age")}
                                            error={errors.Age}
                                            value={age !== null ? age : ''}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                {/* <div>

                                </div> */}
                                <div className="space-y-2">
                                    <TextField
                                        sx={{ width: '22.3vw', backgroundColor: "white" }}
                                        size="small"
                                        id="filled-search"
                                        label="Email Id"
                                        type="email"
                                        {...register("email")}
                                        error={errors.email}

                                    />
                                    <TextField
                                        sx={{ width: '22.3vw', backgroundColor: "white" }}
                                        size="small"
                                        id="filled-search"
                                        label="Middle Name"
                                        placeholder="Middle Name"
                                        type="text"
                                        {...register("Middle_Name")}


                                    />

                                    <div className="flex justify-start items-start space-x-2   ">
                                        <TextField
                                            sx={{ width: '8vw', mt: 1, backgroundColor: "white" }}
                                            size="small"
                                            id="filled-search"
                                            label="Year"
                                            placeholder="Year"
                                            type="text"
                                            {...register("Year")}
                                            value={year !== null ? year : ''}
                                        />
                                        <TextField
                                            sx={{ width: '8vw', mt: 1, backgroundColor: "white" }}
                                            size="small"
                                            id="filled-search"
                                            label="Month"
                                            placeholder="Month"
                                            type="text"
                                            {...register("Month")}
                                            value={month !== null ? month : ''}
                                        />
                                        <TextField
                                            sx={{ width: '5.3vw', mt: 1, backgroundColor: "white" }}
                                            size="small"
                                            id="filled-search"
                                            label="Days"
                                            placeholder="Days"
                                            type="text"
                                            {...register("days")}
                                            value={day !== null ? day : ''}
                                            day

                                        />
                                    </div>
                                </div>

                                <div className=" space-y-3 flex justify-center mr-10">
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={["DatePicker", "DatePicker"]}>
                                                <DatePicker
                                                    label="Date Of Birth"
                                                    defaultValue={dayjs("2024-03-01 ")}
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    sx={{ backgroundColor: "white", ml: 1, width: '22.3vw' }}
                                                    className=" -mt-5"
                                                    {...register("DOB")}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                        <TextField
                                            sx={{ width: '22.3vw', mt: 1, backgroundColor: "white" }}
                                            size="small"
                                            id="filled-search"
                                            label="Last Name"
                                            placeholder="Last Name"
                                            type="text"
                                            {...register("Lastname")}
                                            error={errors.Lastname}
                                        />
                                        <div className="flex justify-center items-center mt-3 ">
                                            <FormLabel id="demo-row-radio-buttons-group-label" className="text-sm">Gender</FormLabel>
                                            <FormControl sx={{ width: '22.3vw', ml: 1 }}>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                    {...register("Gender")}
                                                    value={watch("Gender") || ""}
                                                >
                                                    <FormControlLabel value="male" control={<Radio />} label="Male" className="bg-white" />

                                                    <FormControlLabel value="female" control={<Radio />} label="Female" className="bg-white" />
                                                    <FormControlLabel value="other" control={<Radio />} label="Other" className="bg-white" />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className='border flex justify-start rounded-md items-center px-8 h-[20vh] '>
                                        <Upload name="avatar" listType="picture-card" className="avatar-uploader"  {...register("image")} showUploadList={false}
                                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188" beforeUpload={beforeUpload} onChange={handleChange}>
                                            {imageUrl ? (
                                                <img src={imageUrl} alt="avatar" style={{ width: "50%", height: "100%" }} />
                                            ) : (
                                                uploadButton
                                            )}
                                        </Upload>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="flex justify-items-start items-center gap-4 pt-2">
                        <Controller
                            name="ISDNO"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Prefix"
                                    classNamePrefix="Prefix"
                                    options={ISDNO}
                                    className="basic-single w-24 "
                                />
                            )}
                        />
                        <TextField
                            sx={{ width: '16vw', backgroundColor: "white" }}
                            size="small"
                            id="filled-search"
                            label="Mobile No"
                            type="number"
                            {...register("number")}
                            error={errors.number}
                        />
                        <Controller
                            name="Marital_Status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="MaritalStatus"
                                    classNamePrefix="Prefix"
                                    options={Marital_Status}
                                    className="basic-single w-[345px] "
                                />
                            )}
                        />

                        <Controller
                            name="Nationality"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Nationality"
                                    classNamePrefix="Nationality"
                                    options={Nationality}
                                    className="basic-single  w-[355px] "
                                />
                            )}
                        />
                        <Controller
                            name="blood Group"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="blood Group"
                                    classNamePrefix="blood_Group"
                                    options={blood_Group}
                                    className="basic-single  w-[245px] "
                                />
                            )}
                        />

                    </div>
                    <h1 className="py-2 font-extrabold">DOCUMENTS</h1>
                    <div className="flex justify-items-start items-center gap-4">

                        <Controller
                            name="Documents"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Documents"
                                    classNamePrefix="Documents"
                                    options={Documents}
                                    className="basic-single  w-[355px] "
                                />
                            )}
                        />

                        <TextField
                            sx={{ width: '22.5vw', ml: 1, backgroundColor: "white" }}
                            size="small"
                            id="filled-search"
                            label=" Identification Document No"
                            placeholder="Identification No"
                            type="text"
                            {...register("Identification_No")}
                        />
                        <Button
                            component="label"
                            role={undefined}
                            variant="text"
                            tabIndex={-1}
                            startIcon={<MdOutlineFileUpload />}
                            sx={{ width: '15.6vw' }}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file" />
                        </Button>

                    </div>
                    <h1 className="py-2 font-extrabold">Address Details</h1>
                    <div className="flex justify-start gap-4">
                        <TextField
                            sx={{ mt: 0, backgroundColor: "white" }}
                            size="small"
                            id="filled-search"
                            label="House No./Flat No./Building Name "
                            placeholder="House No./Flat No./Building Name"
                            type="text"
                            className="w-[355px]"
                            {...register("houseNo")}
                            error={errors.houseNo}
                        />
                        <TextField
                            sx={{ width: '22.5vw', ml: 1, backgroundColor: "white" }}
                            size="small"
                            id="filled-search"
                            label="Street Address"
                            placeholder=" Street Address."
                            type="text"
                            {...register("Street_Address")}

                        />

                        <Controller
                            name="Country"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isClearable
                                    isSearchable={false}
                                    className="w-[352px]"
                                    placeholder="Country"
                                    classNamePrefix="Country"
                                    options={Country}
                                />
                            )}
                        />

                        <Controller
                            name="State"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    className="basic-single w-[245px]"
                                    isSearchable={false}
                                    placeholder="State"
                                    classNamePrefix="State"
                                    options={State}
                                />
                            )}
                        />

                    </div >

                    <div className="flex justify-items-start py-2 gap-4">

                        <Controller
                            name="District"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="District"
                                    classNamePrefix="District"
                                    options={District}
                                    className="basic-single  w-[150px] "
                                />
                            )}
                        />

                        <TextField
                            sx={{ backgroundColor: "white" }}
                            size="small"
                            id="filled-search"
                            label="Pincode"
                            type="search"
                            className="w-[186px]"
                        />
                        <Controller
                            name="Area"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Area"
                                    classNamePrefix="Area"
                                    options={Area}
                                    className="basic-single  w-[350px] ml-2 "
                                />
                            )}
                        />
                        <Controller
                            name="Taluka"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Taluka"
                                    classNamePrefix="Taluka"
                                    options={Taluka}
                                    className="basic-single  w-[350px]  "
                                />
                            )}
                        />

                        <Controller
                            name="City"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="City"
                                    classNamePrefix="City"
                                    options={City}
                                    className="basic-single  w-[245px]  "
                                />
                            )}
                        />


                        {/* <Select
                            className="basic-single w-[245px]"
                            classNamePrefix="Prfix"
                            defaultInputValue="City"
                            defaultValue={City[0]}
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            isClearable={isClearable}
                            isRtl={isRtl}
                            isSearchable={isSearchable}
                            name="color"
                            options={City}
                        /> */}

                    </div>


                </AccordionDetails>
            </Accordion>
            <PreRegistrationAccording2 />
            <PreRegistrationAccording3 />
            <div className="flex justify-end gap-2 px-2 py-2 ">
                <Button type="submit" variant="contained" color="success">
                    SUBMIT
                </Button>
                <Button variant="outlined" color="error"onClick={()=>reset()} >
                    RESET
                </Button>
            </div>
        </form>
    )
}
export default PreRegistrationAccording