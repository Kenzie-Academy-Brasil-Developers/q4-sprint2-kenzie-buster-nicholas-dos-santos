import * as yup from "yup";

const buyDvdSchema = yup.object().shape({
  quantity: yup.number().positive().required(),
});

export default buyDvdSchema;
