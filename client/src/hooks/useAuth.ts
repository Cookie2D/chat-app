import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/slices/authSlice";
import { TypedUseMutationResult } from "@reduxjs/toolkit/query/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MutationFunction = (...args: any[]) => TypedUseMutationResult<any, any, any, any>;

export const useAuthentication = (authenticateMutation: MutationFunction) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [authenticate, { data, isSuccess }] = authenticateMutation();

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    dispatch(
      setUser({
        id: data.user.id,
        name: data.user.name,
        role: data.user.roleId,
        token: data.access_token,
        color: data.user.color,
      })
    );
    navigate("/chat");
  }, [isSuccess, navigate, dispatch, data]);

  return {
    authenticate,
  };
};
