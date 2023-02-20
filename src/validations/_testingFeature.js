import { userDataSchema } from "./userDataSchema";

const obj = {
  name: "kiran",
  age: 20,
  worked: true,
  companyName: "Edify",
  yearsOfExp: 2,
};

const verify = async () => {
   const result =  await userDataSchema.isValid(obj)
   return {result}
};

verify()