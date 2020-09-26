import * as Yup from "yup";
import {addSubCat} from "../../Services/AddCatAndSubCat";

export const subCategories = {
  name: [""],
};

export const validationSchema = Yup.object({
  name: Yup.array()
    .of(
      Yup.string()
        .min(2, "Every Field must contain 2 characters or more  ")
        .max(30, "Every Field must contain 30 characters or less  ")
        .required("No Field should be empty  ")
    )
    .required(),
});

export const handleSubmit = (values,  subCategories, setSubCategories) => {
  addSubCat(values, subCategories, setSubCategories)
};

