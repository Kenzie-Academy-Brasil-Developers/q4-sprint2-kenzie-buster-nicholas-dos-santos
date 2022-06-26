import * as yup from "yup";

/*
  A diferença entre optional e notRequired é 
  que o optional apresenta sempre um default
  enquanto o notRequired é nullable
*/
const createUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().default(false).optional(),
});

const serializedUserSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  email: yup.string().email().required(),
  isAdm: yup.boolean().required(),
});

export { createUserSchema, serializedUserSchema };
