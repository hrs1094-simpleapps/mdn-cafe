import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import EmployeeReportTable, {
  UserDetails,
} from "../../components/tables/EmployeeTable/EmployeeReportTable";
import { useState } from "react";
import PieReport from "../../components/tables/EmployeeTable/PieReport";
import Badge from "../../components/ui/badge/Badge";
import EmployeeMetaCard from "../../components/tables/EmployeeTable/EmployeeMetaCard";

export default function EmployeeDetails() {
  const [data, setData] = useState<UserDetails | null>(null);
  const today = new Date();
  const totalDays = today.getDate();
  const breakFast = data?.total.breakfast ?? 0;
  const lunch = data?.total.lunch ?? 0;
  const snacks = data?.total.snacks ?? 0;
  const report = [
    {
      name: "Breakfast",
      value: breakFast,
      percentage: breakFast / totalDays,
      expense: breakFast * 15,
    },
    {
      name: "Lunch",
      value: lunch,
      percentage: lunch / totalDays,
      expense: lunch * 30,
    },
    {
      name: "Snacks",
      value: snacks,
      percentage: snacks / totalDays,
      expense: snacks * 15,
    },
  ];
  return (
    <>
      <PageBreadcrumb pageTitle={"Report"} />
      <EmployeeMetaCard name={data?.name ?? ""} email={data?.email ?? ""} />
      <div className={` mt-6  grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6`}>
        {/* <!-- Metric Item Start --> */}
        {report.map((r) => (
          <div
            key={r.name}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
          >
            <PieReport series={[Math.ceil(r.percentage * 100)]} />

            <div className="flex items-end justify-between mt-4">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {r.name}
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {r.value}/{totalDays}
                </h4>
              </div>
              <Badge color="success">
                {/* <ArrowUpIcon /> */}₹ {r.expense}
              </Badge>
            </div>
          </div>
        ))}
        {/* <!-- Metric Item End --> */}
      </div>
      <div className="space-y-6 mt-6">
        <ComponentCard title={"Monthly Report"}>
          <EmployeeReportTable
            setReport={(d) => {
              setData(d);
            }}
          />
        </ComponentCard>
      </div>
    </>
  );
}
