import * as Yup from "yup";
import { postLearner } from "../../../Services/Learner";

export const initialValues = {
  name: "",
  userName: "",
  email: "",
  password: "",
};

export const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be 5 characters or more")
    .max(30, "Name must be 30 characters or less")
    .required("Name shouldn't be empty"),
  userName: Yup.string()
    .min(2, "User Name must be 1 characters or more")
    .max(30, "User Name must be 30 characters or less")
    .required("User Name shouldn't be empty"),
  email: Yup.string()
    .email("Invalid Email")
    .required("Email shouldn't be empty"),
  password: Yup.string()
    .min(4, "Password must be 4 characters or more")
    .max(30, "Password must be 30 characters or less")
    .required("Password shouldn't be empty"),
});

export const handleSubmit = (
  values,
  categoryName,
  resetForm,
  setCategoryNameError,
  setOpen
) => {
  if (categoryName.length === 0) {
    setCategoryNameError("Select atleast one subject");
    return;
  }
  setCategoryNameError("");

  let favouriteSubCategories = [];

  if (categoryName.length > 1) {
    for (let arr of categoryName) {
      favouriteSubCategories = favouriteSubCategories.concat(arr.subCategories);
    }
  } else {
    favouriteSubCategories = categoryName[0].subCategories;
  }
  postLearner(
    { ...values, favouriteSubCategories: favouriteSubCategories },
    resetForm,
    setOpen
  );
};
