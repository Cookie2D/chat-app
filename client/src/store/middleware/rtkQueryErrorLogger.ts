import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface RejectedActionWithPayload {
  payload: {
    data?: {
      message?: string | string[];
    };
  };
}

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn("We got a rejected action!");

    if (isRejectedActionWithPayload(action)) {
      const messages = action.payload.data?.message;

      if (messages) {
        if (Array.isArray(messages)) {
          messages.forEach((message) => {
            toast.error(message);
          });
        } else {
          toast.error(messages);
        }
      }
    } else {
      const errorMessage =
        "data" in action.error
          ? (action.error.data as { message: string }).message
          : action.error.message;

      toast.error(errorMessage);
    }
  }

  return next(action);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isRejectedActionWithPayload(action: any): action is RejectedActionWithPayload {
  return action && action.payload && action.payload.data && action.payload.data.message;
}
