import bcrypt from "bcryptjs";

export const createHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(8);

  return await bcrypt.hash(password, salt);
};

export const comparePasswordHash = async (
  passoword: string,
  passowordHash: string
) => {
  return await bcrypt.compare(passoword, passowordHash);
};
