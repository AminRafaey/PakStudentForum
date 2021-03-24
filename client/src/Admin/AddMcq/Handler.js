import * as Yup from "yup";
import { addMcq } from "../../Services/Mcq";
import { updateMcq } from "../../Services/Mcq";

export const initialValues = {
  statement: "",
  a: "",
  b: "",
  c: "",
  d: "",
  correct: "",
  subCategories: "",
  difficultyLevel: "",
};

export const validationSchema = Yup.object({
  statement: Yup.string()
    .min(5, "Statement must be 5 characters or more")
    .max(600, "Statement must be 600 characters or less")
    .required("Statement shouldn't be empty"),
  a: Yup.string()
    .min(1, "Option-A must be 1 characters or more")
    .max(300, "Option-A must be 300 characters or less")
    .required("Option-A shouldn't be empty"),
  b: Yup.string()
    .min(1, "Option-B must be 1 characters or more")
    .max(300, "Option-B must be 300 characters or less")
    .required("Option-B shouldn't be empty"),
  c: Yup.string()
    .min(1, "Option-C must be 1 characters or more")
    .max(300, "Option-C must be 300 characters or less"),
  d: Yup.string()
    .min(1, "Option-D must be 1 characters or more")
    .max(300, "Option-D must be 300 characters or less"),
  correct: Yup.string()
    .oneOf(["a", "b", "c", "d"])
    .required("Correct option Field shouldn't be empty"),
  subCategories: Yup.array()
    .of(Yup.string().required("Select atleast one Category"))
    .required("Sub-Category option Field shouldn't be empty"),
  difficultyLevel: Yup.string()
    .oneOf(["Eazy", "Normal", "Difficult"])
    .required("Choose one difficulty level"),
  learnerId: Yup.string(),
});

export const handleSubmit = (
  values,
  subCategories,
  mcqInitVal,
  setMcqInitVal,
  resetForm,
  setOpen
) => {
  mcqInitVal
    ? mcqInitVal.learnerId
      ? updateMcq(
          {
            _id: mcqInitVal._id,
            statement: values.statement,
            options: {
              a: values.a,
              b: values.b,
              c: values.c,
              d: values.d,
              correct: values.correct,
            },
            subCategories: values.subCategories.map(
              (s) => subCategories.find((su) => su.name === s)._id
            ),
            learnerId: mcqInitVal.learnerId,
            status: "Active",
            difficultyLevel: values.difficultyLevel,
            numOfShares: 0,
            date: new Date(),
          },
          resetForm, 
          setOpen
        )
      : mcqInitVal.errorCategory
      ? updateMcq(
          {
            _id: mcqInitVal._id,
            statement: values.statement,
            options: {
              a: values.a,
              b: values.b,
              c: values.c,
              d: values.d,
              correct: values.correct,
            },
            subCategories: values.subCategories.map(
              (s) => subCategories.find((su) => su.name === s)._id
            ),
            status: "Active",
            difficultyLevel: values.difficultyLevel,
            numOfShares: 0,
            date: new Date(),
          },
          resetForm,
          setOpen
        )
      : updateMcq(
          {
            _id: mcqInitVal._id,
            statement: values.statement,
            options: {
              a: values.a,
              b: values.b,
              c: values.c,
              d: values.d,
              correct: values.correct,
            },
            subCategories: values.subCategories.map(
              (s) => subCategories.find((su) => su.name === s)._id
            ),
            status: "Active",
            difficultyLevel: values.difficultyLevel,
            numOfShares: 0,
            date: new Date(),
          },
          resetForm,
          setOpen
        )
    : addMcq(
        {
          statement: values.statement,
          options: {
            a: values.a,
            b: values.b,
            c: values.c,
            d: values.d,
            correct: values.correct,
          },
          subCategories: values.subCategories.map(
            (s) => subCategories.find((su) => su.name === s)._id
          ),
          difficultyLevel: values.difficultyLevel,
        },
        resetForm,
        setOpen
      );
  setMcqInitVal("");
};
