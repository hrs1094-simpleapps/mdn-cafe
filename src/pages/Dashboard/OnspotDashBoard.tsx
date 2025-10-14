import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../types/common";
import { getOnspotReport } from "../../services/subscribers";
import { MonthlyReport } from "../../types/subscriptions";
import { monthNames } from "../../utils/constants";
import FoodMetricsSpot from "../../components/food/FoodMetricsSpot";
import StatisticsChart from "../../components/food/StatisticsChart";
import Skeleton from "react-loading-skeleton";
import MonthlyByCategory from "../../components/food/MonthlyByCategory";

export default function OnspotDashBoard() {
  const { data, isLoading, isError, error } = useQuery<
    ApiResponse<MonthlyReport>
  >({
    queryKey: ["getOnspotReport"],
    queryFn: getOnspotReport,
    //staleTime: 5 * 60 * 1000,
  });

  if (isLoading || !data) {
    return (
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 my-4">
          On Spot
        </h3>
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 space-y-6 xl:col-span-6">
            <div className="grid grid-cols-2  gap-4 md:gap-6">
              <Skeleton height={100} width={"100%"} />
              <Skeleton height={100} width={"100%"} />
            </div>
            <Skeleton height={100} width={"100%"} />
          </div>
          <div className="col-span-12 xl:col-span-6">
            <Skeleton height={228} width={"100%"} />
          </div>
        </div>
      </div>
    );
  }
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
  const today = new Date();
  const currentMonth = today.getMonth();
  const month = `${monthNames[currentMonth]}`;
  const report = data.data[month];

  const data1 = monthNames.map((month) => data.data[`${month}`]?.breakfast);
  const data2 = monthNames.map((month) => data.data[`${month}`]?.lunch);
  const data3 = monthNames.map((month) => data.data[`${month}`]?.snacks);
  const breakFast = data1?.reduce((acc, num) => acc + num, 0);
  const lunch = data2?.reduce((acc, num) => acc + num, 0);
  const snacks = data3?.reduce((acc, num) => acc + num, 0);

  const totalAmount = breakFast * 15 + lunch * 30 + snacks * 15;

  const prevMonth = currentMonth - 1;
  const prevMonthName = `${monthNames[prevMonth]}`;
  const prevReport =
    prevMonth < 0
      ? { total: 0, breakfast: 0, lunch: 0, snacks: 0 }
      : data?.data[prevMonthName];
  const prevMonthTotalSub = prevMonth < 0 ? 0 : prevReport.total;
  const prevMonthTotalAmt =
    prevReport.breakfast * 5 + prevReport.lunch * 10 + prevReport.snacks * 5;

  return (
    <div className="mt-5 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 my-4">
        On Spot
      </h3>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <FoodMetricsSpot
            subscriptions={report.total}
            total={totalAmount}
            prevSub={prevMonthTotalSub}
            prevTotal={prevMonthTotalAmt}
          />

          <StatisticsChart data1={data1} data2={data2} data3={data3} />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyByCategory
            title="Total meals "
            subtitle="Total plate of meals consumed in this month"
            breakfast={report.breakfast}
            lunch={report.lunch}
            snacks={report.snacks}
            prevBreakfast={prevReport.breakfast}
            prevLunch={prevReport.lunch}
            prevSnacks={prevReport.snacks}
          />
        </div>
      </div>
    </div>
  );
}
