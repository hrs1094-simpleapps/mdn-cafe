import { useMutation } from "@tanstack/react-query";
import { submitonSpot, submitonSubscription } from "../services/onspot";

export function useFoodManagement() {
  const onSpotMutation = useMutation({
    mutationFn: submitonSpot,
    //  onSuccess: (data) => {
    //   // Save token, update global auth state, etc.
    //   //localStorage.setItem("token", data.token);
    //   if (data?.data?.result === 0 && data?.data?.token !== "") {
    //     setLoggedIn(data?.data?.token);
    //     setData(data.data.data);
    //     navigate("/");
    //   }
    // },
  });

  const subscribeMutation = useMutation({
    mutationFn: submitonSubscription,
    // Optional: add onSuccess handler here
  });

  const onSpotCall = async (
    name: string,
    email: string,
    team_or_id: string,
    breakfast: string,
    lunch: string,
    snacks: string
  ) => {
    return onSpotMutation.mutateAsync({
      name,
      email,
      team_or_id,
      breakfast,
      lunch,
      snacks,
    });
  };

  const subscribeCall = async (
    name: string,
    email: string,
    team_or_id: string,
    breakfast: string,
    lunch: string,
    snacks: string
  ) => {
    return subscribeMutation.mutateAsync({
      name,
      email,
      team_or_id,
      breakfast,
      lunch,
      snacks,
    });
  };

  return {
    onSpot: onSpotCall,
    subscribe: subscribeCall,
    onSpotStatus: {
      isLoading: onSpotMutation.isPending,
      isError: onSpotMutation.isError,
      error: onSpotMutation.error,
      data: onSpotMutation.data,
    },
    subscribeStatus: {
      isLoading: subscribeMutation.isPending,
      isError: subscribeMutation.isError,
      error: subscribeMutation.error,
      data: subscribeMutation.data,
    },
  };
}
