import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";
import { useData } from "./DataProvider";

const RequisitionDetailsForm: React.FC<{ handleTab: (n: PageNumbers) => void }> = ({ handleTab }) => {
  const context = useData(); //Absorbing Context
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  const { state, setState } = context;
  const { requisitionDetails } = state;

  const formik = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: requisitionDetails.requisitionTitle,
      noOfOpenings: requisitionDetails.noOfOpenings,
      urgency: requisitionDetails.urgency,
      gender: requisitionDetails.gender,
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: () => {
      handleTab(1);
    },
  });

  
  const handleFieldChange = (e: React.ChangeEvent<any>) => {
    formik.handleChange(e);
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      requisitionDetails: {
        ...prevState.requisitionDetails,
        [name]: value,
      },
    }));
  };


  const handleSelectChange = (name: string, value: any) => {
    formik.setFieldValue(name, value);
    setState((prevState) => ({
      ...prevState,
      requisitionDetails: {
        ...prevState.requisitionDetails,
        [name]: value,
      },
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={handleFieldChange}
          onBlur={formik.handleBlur}
          value={formik.values.requisitionTitle}
          error={formik.errors.requisitionTitle}
          touched={formik.touched.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={handleFieldChange}
          onBlur={formik.handleBlur}
          value={formik.values.noOfOpenings}
          error={formik.errors.noOfOpenings}
          touched={formik.touched.noOfOpenings}
        />
        
         <FormSelect
           label="Gender"
           name="gender"
           placeholder="Select gender"
           options={genderOptions}
          onChange={handleSelectChange}
          onBlur={formik.setFieldTouched}
          error={formik.errors.gender}
          touched={formik.touched.gender}
          value={formik.values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={handleSelectChange}
          onBlur={formik.setFieldTouched}
          error={formik.errors.urgency}
          touched={formik.touched.urgency}
          value={formik.values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
