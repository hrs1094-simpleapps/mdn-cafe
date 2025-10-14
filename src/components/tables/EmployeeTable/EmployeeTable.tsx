import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useQuery } from "@tanstack/react-query";

import { getEmployees } from "../../../services/employees";
import { useNavigate } from "react-router";
import Checkbox from "../../form/input/Checkbox";

interface User {
  name: string;
  id: number;
  role: number;
  subscription: {
    snacks: number;
    lunch: number;
    breakfast: number;
  };
}

export default function EmployeeTable() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getEmployees"],
    queryFn: getEmployees,
    //staleTime: 5 * 60 * 1000,
  });

  if (isLoading || !data) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (data?.result === 1) return <p>Error: {data?.message}</p>;

  const { users } = data;
  console.log(users)

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Team
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                BreakFast
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Lunch
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Snacks
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {users.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div
                    className="flex items-center gap-3"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/subscribers/" + user.id);
                    }}
                  >
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-100">
                        <span className="text-xs font-semibold text-brand-500">
                          {user.name?.split("")[0]}
                        </span>
                      </div>
                    </div>
                    <div>
                      <a
                        className="block font-medium text-gray-800 text-theme-sm dark:text-white/90 link"
                        href={"/employees/" + user.id}
                      >
                        {user.name}
                      </a>
                      {/* <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {"order.user.role"}
                      </span> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {"KUMO"}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Checkbox
                    checked={user.subscription.breakfast !== 0}
                    onChange={() => {}}
                    label=""
                  />
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Checkbox
                    checked={user.subscription.lunch !== 0}
                    onChange={() => {}}
                    label=""
                  />
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Checkbox
                    checked={user.subscription.snacks !== 0}
                    onChange={() => {}}
                    label=""
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
