import * as yup from "yup";

const createDvdSchema = yup.object().shape({
  name: yup.string().required(),
  duration: yup.string().required(),
  quantity: yup.number().required(),
  price: yup.number().required(),
});

export default createDvdSchema;
