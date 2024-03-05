import React  from "react";
import ChemoDrawer from "./chemoDrawer";
import {FormProvider,useFieldArray,useForm} from 'react-hook-form'


function MainChemoProtocol(){
    const useform=useForm();

   

    // const {} =MethodForm
    // const MethodArryFiled=useFieldArray();
    return(
        <div>
            <FormProvider {...useform}>
            <ChemoDrawer />
            </FormProvider>

         
        </div>
    )
}
export default MainChemoProtocol;