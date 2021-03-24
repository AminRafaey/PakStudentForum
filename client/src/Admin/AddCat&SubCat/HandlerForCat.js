import * as Yup from "yup";
import { addCat, updateCat } from "../../Services/AddCatAndSubCat";

export const initialValues = {
  name: "",
  subCategories: [""],
  description: "",
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
    .min(30, "Description must contain 30 characters or more")
    .max(100, "Description must contain 100 characters or less")
    .required("Description is required"),
});

export const handleSubmit = (
  values,
  subCategories,
  categories,
  setCategories,
  categoryInitVal,
  resetForm,
  setOpen
) => {
  categoryInitVal?updateCat({
    ...values,
    subCategories: values.subCategories.map(
      (s) => subCategories.find((su) => su.name === s)._id
    ),
    _id:categoryInitVal._id
  },
  resetForm,
  setOpen):
  addCat(
    {
      ...values,
      subCategories: values.subCategories.map(
        (s) => subCategories.find((su) => su.name === s)._id
      ),
    },
    resetForm,
    setOpen
  );
  setCategories([...categories]);
};
