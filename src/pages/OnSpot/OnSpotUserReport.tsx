import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PieReport from "../../components/tables/EmployeeTable/PieReport";
import Badge from "../../components/ui/badge/Badge";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getonSpotMonthlyRecords } from "../../services/subscribers";
import { decodeBase64, monthNames } from "../../utils/constants";
import Skeleton from "react-loading-skeleton";
import OnSpotReportTable from "../../components/tables/Onspot/OnspotReportTable";
import EmployeeMetaCard from "../../components/tables/Onspot/EmployeeMetaCard";
export interface UserDetails {
  name: string;
  email: string;
  team_or_id: string;
  date: string;
  snacks: number;
  lunch: number;
  breakfast: number;
}
export default function OnSpotUserReport() {
  const { id } = useParams();
  const email = decodeBase64(id as string);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getEmployeeMonthlyRecords", email],
    queryFn: () => getonSpotMonthlyRecords(email as string),
    staleTime: 5 * 60 * 1000,
  });
  if (isLoading || !data)
    return (
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 my-4">
          Report
        </h3>
        <Skeleton count={1} height={100} width={"100%"} />
        <div className="grid grid-cols-3 gap-4 md:gap-6 my-4">
          <Skeleton height={120} width={"100%"} />
          <Skeleton height={120} width={"100%"} />
          <Skeleton height={120} width={"100%"} />
        </div>
        <Skeleton count={6} height={30} width={"100%"} />
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

  const records: UserDetails[] = data?.data ?? [];
  const info = records[0] ?? ({} as UserDetails);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const breakFast =
    records?.reduce((acc, obj) => acc + (obj.breakfast || 0), 0) ?? 0;
  const lunch = records?.reduce((acc, obj) => acc + (obj.lunch || 0), 0) ?? 0;
  const snacks = records?.reduce((acc, obj) => acc + (obj.snacks || 0), 0) ?? 0;
  const report = [
    {
      name: "Breakfast",
      value: breakFast,
      percentage: breakFast / daysInMonth,
      expense: breakFast * 15,
    },
    {
      name: "Lunch",
      value: lunch,
      percentage: lunch / daysInMonth,
      expense: lunch * 30,
    },
    {
      name: "Snacks",
      value: snacks,
      percentage: snacks / daysInMonth,
      expense: snacks * 15,
    },
  ];
  const totalAmount = breakFast * 15 + lunch * 30 + snacks * 15;
  return (
    <>
      <PageBreadcrumb pageTitle={monthNames[month] + " month Report"} />
      <EmployeeMetaCard
        name={info?.name ?? ""}
        email={info?.email ?? ""}
        totalAmount={totalAmount}
      />
      <div className={` mt-6  grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6`}>
        {/* <!-- Metric Item Start --> */}
        {report?.map((r) => (
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
                  {r.value}/{daysInMonth}
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
          <OnSpotReportTable records={records ?? []} />
        </ComponentCard>
      </div>
    </>
  );
}
