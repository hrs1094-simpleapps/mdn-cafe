import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router"; 
import { getOnSpotUserList } from "../../../services/subscribers";
import Skeleton from "react-loading-skeleton";
import { encodeBase64 } from "../../../utils/constants";

interface User {
  name: string;
  email: string;
  team_or_id: number;
  snacks: number;
  lunch: number;
  breakfast: number;
}

export default function OnSpotTable() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getOnSpotUserList"],
    queryFn: getOnSpotUserList,
    //staleTime: 5 * 60 * 1000,
  });

  if (isLoading || !data)
    return (
      <div className="grid grid-cols-4  gap-4 md:gap-6">
        <Skeleton height={40} count={4} width={"100%"} />
        <Skeleton height={40} count={4} width={"100%"} />
        <Skeleton height={40} count={4} width={"100%"} />
        <Skeleton height={40} count={4} width={"100%"} />
      </div>
    );
  if (isError) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-4">
        Error: {error.message}
      </div>
    );
  }
  if (data?.result === 1) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-4">
        Error: {data?.message}
      </div>
    );
  }

  const users = data?.data ?? [];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] font-semibold">
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
                Email
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
                BreakFast (₹ 15)
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Lunch (₹ 30)
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Snacks (₹ 15)
              </TableCell>
               <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Total Amount
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {users.map((user: User, i:number) => (
              <TableRow key={user.email+"-"+i}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div
                    className="flex items-center gap-3"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/onspot/" + encodeBase64(user.email));
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
                        href={"/onspot/" + user.email}
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
                  {user.email}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.team_or_id}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.breakfast}  
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.lunch}  
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.snacks}  
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 font-semibold">
                  ₹ {user.breakfast * 15 + user.lunch * 30 + user.snacks * 15}  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
