import { useEffect } from "react";
import axios from "axios";

import {
  Stack,
  Paper,
  TextField,
  Button,
  Checkbox,
  Alert,
  FormControlLabel,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  userDataSchema,
  userDataSchema_setValue,
} from "../validations/userDataSchema";
import { useState } from "react";

const ConditionalForm = () => {
  const [isValidUser, setIsValidUser] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const {
    control,
    watch,
    setValue,
    reset,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: {
        name: "",
        age: "",
        worked: true,
        companyName: "",
        yearsOfExp: "",
      },
    },
    resolver: yupResolver(userDataSchema_setValue),
  });

  // console.log(watch("yearsOfExp"));

  useEffect(() => {
    axios
      .get("http://localhost:9000/users")
      .then(({ data }) => setValue("user", data[0]))
      .catch((error) => console.log(error));
  }, []);

  const submitHandler = (user) => {
    // console.log(JSON.stringify(user));

    axios
      .post("http://localhost:9000/user", user)
      .then((res) => setIsValidUser(true))
      .catch(({ response }) => setIsValidUser(false));

    setIsFormSubmitted(true);
  };

  // console.log(watch("user"));

  return (
    <>
      {/* {console.log({ errors })} */}

      <Paper
        sx={{ width: "500px", margin: "10px auto", padding: "10px" }}
        elevation={3}
      >
        {isFormSubmitted ? (
          isValidUser ? (
            <Alert severity="success">User data submited successfully</Alert>
          ) : (
            <Alert severity="error">Enter valid data!</Alert>
          )
        ) : (
          ""
        )}

        <form onSubmit={handleSubmit(submitHandler)}>
          <Stack spacing={2} sx={{ padding: "10px" }}>
            <Controller
              control={control}
              name="user.name"
              // defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  type="text"
                  label="Name"
                  error={errors.user?.name ? true : false}
                  helperText={
                    errors.user?.name ? errors.user?.name.message : ""
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="user.age"
              // defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  type="number"
                  label="Age"
                  error={errors.user?.age ? true : false}
                  helperText={errors.user?.age ? errors.user?.age.message : ""}
                />
              )}
            />
          </Stack>

          <Stack
            spacing={2}
            sx={{
              backgroundColor: "#AEE2FF",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <Controller
              name="user.worked"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  label="Work details"
                  control={<Checkbox {...field} checked={field.value} />}
                />
              )}
            />
            <Controller
              control={control}
              name="user.companyName"
              // defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  type="text"
                  label="Comapny Name"
                  error={errors.user?.companyName ? true : false}
                  helperText={
                    errors.user?.companyName
                      ? errors.user?.companyName.message
                      : ""
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="user.yearsOfExp"
              // defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  type="number"
                  label="Years of Experience"
                  error={errors.user?.yearsOfExp ? true : false}
                  helperText={
                    errors.user?.yearsOfExp
                      ? errors.user?.yearsOfExp.message
                      : ""
                  }
                />
              )}
            />
          </Stack>
          <Stack mt={2}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  );
};

export default ConditionalForm;
