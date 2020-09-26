import * as Yup from "yup";
import { addCat } from "../../Services/AddCatAndSubCat";

export const initialValues = {
  name: "",
  subCategories: [""],
  description: "Hello how are you",
};

export const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Every Field must contain 2 characters or more")
    .max(60, "Every Field must contain 60 characters or less")
    .required("No Field should be empty  "),
  subCategories: Yup.array()
    .of(Yup.string().required("Select atleast one Sub-Category"))
    .required("Sub-Category option shouldn't be empty"),
  description: Yup.string()
    .min(10, "Description must contain 2 characters or more")
    .max(40, "Description must contain 40 characters or less")
    .required("Description is required"),
});

export const handleSubmit = (
  values,
  subCategories,
  categories,
  setCategories
) => {
  addCat({
    ...values,
    subCategories: values.subCategories.map(
      (s) => subCategories.find((su) => su.name === s)._id
    ),
  });
  setCategories([...categories]);
};
