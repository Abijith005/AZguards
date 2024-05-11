import { credentialDto } from "../dtos/auth.dto";
import { todoDto, validatorDto } from "../dtos/todo.dto";
const statusEnum = ["pending", "completed", "in-progress"];
export function todoInputValidation(data: todoDto): validatorDto {
  try {
    const { description, status } = data;
    if (!description || isEmpty(description)) {
      const message = !description
        ? "All fields are required"
        : "Description should not be empty";
      return { valid: false, message: message };
    }
    if (!status || !statusEnum.includes(status)) {
      const message = !status
        ? "All fields are required"
        : "Status should be pending,in-progess or completed";
      return { valid: false, message: message };
    }
    return { valid: true };
  } catch (error) {
    console.log(error);
    throw new Error("validation error");
  }
}

const isEmpty = (data: string) => {
  if (data.trim().length === 0) {
    return true;
  }
  return false;
};

export const validateStatus = (status: string): validatorDto => {
  try {
    if (!statusEnum.includes(status)) {
      return {
        valid: false,
        message: "Status should be pending,in-progess or completed",
      };
    }
    return { valid: true };
  } catch (error) {
    console.log(error);
    throw new Error("validation error");
  }
};

export function validateCredentials(data: credentialDto,nameRequired:boolean): validatorDto {
  try {
    const { name, email, password } = data;

    if (nameRequired&&(!name || isEmpty(name))) {
      const message = !name
        ? "validation error!! Name is required"
        : "validation error!! Name can not be empty";
      return { valid: false, message: message };
    }
    if (
      !email ||
      !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    ) {
      const message = !email
        ? "validation error!! Email is required"
        : "validation error!! Invalid email format";
      return { valid: false, message: message };
    }

    if (!password || isEmpty(password)) {
      const message = !password
        ? "validation error!! Password is required"
        : "validation error!! Password can not be empty";
      return { valid: false, message: message };
    }
    return {valid:true};
  } catch (error) {
    console.log(error);
    throw new Error("validation error");
  }
}
