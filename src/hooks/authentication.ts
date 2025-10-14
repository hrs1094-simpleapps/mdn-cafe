import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authentication";
import { useNavigate } from "react-router";
import { userInfoStore } from "../stores/userStore";
import { useCallback } from "react";
import { navRoutes } from "../utils/constants";

export function useLogin() {
  const navigate = useNavigate();
  const { setLoggedIn, setData } = userInfoStore();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Save token, update global auth state, etc.
      //localStorage.setItem("token", data.token);
      if (data?.data?.result === 0 && data?.data?.token !== "") {
        setLoggedIn(data?.data?.token);
        setData(data.data.data);
        navigate("/");
      }
    },
  });

  const doLogin = async (username: string, password: string) => {
    return mutation.mutateAsync({ username, password });
  };

  return {
    login: doLogin, // exposed function
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
}

export const useLogout = () => {
  const navigate = useNavigate();
  const { reset } = userInfoStore();

  const logout = useCallback(() => {
    reset();
    navigate(navRoutes.Login);
  }, [navigate, reset]);

  return { logout };
};
