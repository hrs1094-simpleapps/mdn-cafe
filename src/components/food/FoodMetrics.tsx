import {
  ArrowDownIcon,
  ArrowUpIcon,
  DollarLineIcon,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

export default function FoodMetrics({
  subscriptions,
  total,
  prevSub,
  prevTotal,
}: {
  subscriptions: number;
  total: number;
  prevSub: number;
  prevTotal: number;
}) {
  const isDownSub = prevSub > subscriptions;
  const isDownTotal = prevTotal > total;
  const subChange =
    prevSub === 0
      ? 0
      : isDownSub
      ? prevSub - subscriptions
      : subscriptions - prevSub;

  const amtChange =
    prevTotal === 0 ? 0 : isDownTotal ? prevTotal - total : total - prevTotal;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Subscribers
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {subscriptions}
            </h4>
          </div>
          {subChange !== 0 && (
            <Badge color={!isDownSub ? "success" : "error"}>
              {isDownSub ? <ArrowDownIcon /> : <ArrowUpIcon />}
              {subChange}
            </Badge>
          )}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <DollarLineIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Amount (Monthly)
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              ₹ {total}
            </h4>
          </div>
          {amtChange !== 0 && (
            <Badge color={!isDownTotal ? "success" : "error"}>
              {isDownTotal ? <ArrowDownIcon /> : <ArrowUpIcon />}
              ₹{amtChange}
            </Badge>
          )}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
