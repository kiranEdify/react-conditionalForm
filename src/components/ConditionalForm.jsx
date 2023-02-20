import {
  Stack,
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userDataSchema } from "../validations/userDataSchema";

const ConditionalForm = () => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userDataSchema),
  });
  console.log(watch("yearsOfExp"));
  return (
    <>
      <Paper
        sx={{ width: "500px", margin: "10px auto", padding: "10px" }}
        elevation={3}
      >
        <form onSubmit={handleSubmit((data, e) => console.log(e, data))}>
          <Stack spacing={2} sx={{ padding: "10px" }}>
            <Controller
              control={control}
              name="name"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  type="text"
                  label="Name"
                  error={errors.name ? true : false}
                  helperText={errors.name ? errors.name.message : ""}
                />
              )}
            />
            <Controller
              control={control}
              name="age"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  type="number"
                  label="Age"
                  error={errors.name ? true : false}
                  helperText={errors.age ? errors.age.message : ""}
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
              name="worked"
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
              name="companyName"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  type="text"
                  label="Comapny Name"
                  error={errors.companyName ? true : false}
                  helperText={
                    errors.companyName ? errors.companyName.message : ""
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="yearsOfExp"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  type="number"
                  label="Years of Experience"
                  error={errors.yearsOfExp ? true : false}
                  helperText={
                    errors.yearsOfExp ? errors.yearsOfExp.message : ""
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
