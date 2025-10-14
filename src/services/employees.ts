import axios_client from "./axios_client";

export const getEmployees = async () => {
  const endPoint = encodeURI("exec?action=get_employees");
  const { data } = await axios_client.get(endPoint);
  return data;
};

export const getEmployeeMonthlyRecords = async (id: string) => {
  const endPoint = encodeURI(
    "exec?action=get_employee_monthly_report&userid=" + id
  );
  const { data } = await axios_client.get(endPoint);
  return data;
};

export const getTotalReport = async () => {
  const endPoint = encodeURI("exec?action=get_total_report");
  const { data } = await axios_client.get(endPoint);
  return data;
};
