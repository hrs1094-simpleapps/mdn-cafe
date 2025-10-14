import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
 
import Checkbox from "../../form/input/Checkbox";
import { UserDetails } from "../../../pages/OnSpot/OnSpotUserReport";

 
export default function OnSpotReportTable({
  records,
}: {
  records:UserDetails[] 
}) {
   

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
                Date
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
            {records?.map((r, i) => (
              ///employees-report
              <TableRow key={r.email+"-"+i}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    {/* <div className="w-10 h-10 overflow-hidden rounded-full">
                     {/*  <img
                        width={40}
                        height={40}
                        src={order.user.image}
                        alt={order.user.name}
                      /> *}
                    </div> */}
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {r.date.split("T")[0]}
                      </span>
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
                    checked={r.breakfast !== 0}
                    onChange={() => {}}
                    label=""
                  />
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Checkbox
                    checked={r.lunch !== 0}
                    onChange={() => {}}
                    label=""
                  />
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Checkbox
                    checked={r.snacks !== 0}
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
