import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useQuery } from "@tanstack/react-query";

import Checkbox from "../../form/input/Checkbox";
import { getSubscribersList } from "../../../services/subscribers";
import Skeleton from "react-loading-skeleton";

interface User {
  name: string;
  email: number;
  team_or_id: number;
  snacks: number;
  lunch: number;
  breakfast: number;
}

export default function SubscribersTable() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getSubscribers"],
    queryFn: getSubscribersList,
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

  const subscribers = data?.data ?? [];
  console.log(subscribers);

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
                BreakFast (₹5)
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Lunch (₹10)
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Snacks (₹5)
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
            {subscribers.map((user: User) => (
              <TableRow key={user.email}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div
                    className="flex items-center gap-3"
                    onClick={(e) => {
                      e.preventDefault();
                      // navigate("/subscribers/" + user.id);
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
                      <div className="text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {user.name}{" "}
                      </div>
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
                  <Checkbox
                    checked={user.breakfast !== 0}
                    onChange={() => {}}
                    label=""
                  />
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Checkbox
                    checked={user.lunch !== 0}
                    onChange={() => {}}
                    label=""
                  />
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Checkbox
                    checked={user.snacks !== 0}
                    onChange={() => {}}
                    label=""
                  />
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 font-semibold">
                  ₹{user.breakfast * 150 + user.lunch * 300 + user.snacks * 150}  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
