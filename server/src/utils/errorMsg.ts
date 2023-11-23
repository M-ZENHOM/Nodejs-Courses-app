import { ErrorType } from "../types";
import { FAIL } from "./statusText";

export const errorMsg = (statusCode: number, message: string, statusText: string) => {
  const error = new Error() as Error & ErrorType;
  error.statusCode = statusCode || 500;
  error.message = message || "Internal Server Error";
  error.statusText = statusText || FAIL;
  return error;
};


