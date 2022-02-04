import axios from "axios";

export const fetchService = async (
  url: string,
  method: string,
  options?: Object
) => {
  const response = await axios[method](url, options);
  console.log(response);
  return { response };
};
