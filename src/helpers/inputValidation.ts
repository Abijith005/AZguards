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
