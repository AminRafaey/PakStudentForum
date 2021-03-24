import * as Yup from "yup";
import { addSubCat } from "../../Services/AddCatAndSubCat";

export const subCategories = {
  name: "",
  description: "",
};

export const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must contain 2 characters or more  ")
    .max(30, "Name must contain 30 characters or less  ")
    .required("Name shouldn't be empty  "),
  description: Yup.string()
    .min(30, "Description must contain 30 characters or more")
    .max(100, "Description must contain 100 characters or less")
    .required("Description is required"),
});

export const handleSubmit = (
  values,
  subCategories,
  setSubCategories,
  resetForm,
  setOpen
) => {
  console.log(values);
  addSubCat(values, subCategories, setSubCategories, resetForm, setOpen);
};
