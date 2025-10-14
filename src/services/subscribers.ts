import axios_client from "./axios_client";

export const getSubscribersList = async () => {
  const endPoint = encodeURI("exec?action=get_subscribers");
  const { data } = await axios_client.get(endPoint);
  return data;
};

export const getOnSpotUserList = async () => {
  const endPoint = encodeURI("exec?action=get_onspot_users");
  const { data } = await axios_client.get(endPoint);
  return data;
};

export const getTotalReport = async () => {
  const endPoint = encodeURI("exec?action=get_subscribers_report");
  const { data } = await axios_client.get(endPoint);
  return data;
};


export const getSubscribersReport = async () => {
  const endPoint = encodeURI("exec?action=get_subscribers_report");
  const { data } = await axios_client.get(endPoint);
  return data;
};



export const getOnspotReport = async () => {
  const endPoint = encodeURI("exec?action=get_onspot_report");
  const { data } = await axios_client.get(endPoint);
  return data;
};


export const getonSpotMonthlyRecords = async (email: string) => { 
  const endPoint = encodeURI(
    "exec?action=get_onspot_by_email&email=" + email
  );
  const { data } = await axios_client.get(endPoint);
  return data;
};
