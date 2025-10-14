import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function MonthlyByCategory({
  title = "Monthly Report",
  subtitle = "Total subscribers taken food",
  breakfast = 0,
  lunch = 0,
  snacks = 0,
  prevBreakfast = 0,
  prevLunch = 0,
  prevSnacks = 0,
}: {
  title?: string;
  subtitle?: string;
  breakfast?: number;
  lunch?: number;
  snacks?: number;
  prevBreakfast?: number;
  prevLunch?: number;
  prevSnacks?: number;
}) {
  const total = breakfast + lunch + snacks;
  const series = [breakfast,lunch,snacks 
  ]; // Example values
  const height = 250;
  const options: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "donut",
      height: height,
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#3641f5", "#7592ff", "#b6c9efff"],
    labels: ["Breakfast", "Lunch", "Snacks"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: false,
    },
    legend: {
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => `${total}`,
            },
          },
        },
      },
    },
  };

  const isBreakfastUp = breakfast > prevBreakfast;
  const isLunchUp = lunch > prevLunch;
  const isSnackUp = snacks > prevSnacks;

  const breakfastChange =
    prevBreakfast === 0
      ? 0
      : isBreakfastUp
      ? breakfast - prevBreakfast
      : prevBreakfast - breakfast;

  const lunchChange =
    prevLunch === 0 ? 0 : isLunchUp ? lunch - prevLunch : prevLunch - lunch;
  const snacksChange =
    prevSnacks === 0
      ? 0
      : isLunchUp
      ? snacks - prevSnacks
      : prevSnacks - snacks;
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {title}
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="relative ">
          <div className={`max-h-[${height}px]`} id="chartDarkStyle">
            <Chart
              options={options}
              series={series}
              type="donut"
              height={height}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Breakfast
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {breakfast}
            {breakfastChange !== 0 &&
              (isBreakfastUp ? <UpArrow /> : <DownArrow />)}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Lunch
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {lunch}
            {lunchChange !== 0 && (isLunchUp ? <UpArrow /> : <DownArrow />)}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Snacks
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {snacks}
            {snacksChange !== 0 && (isSnackUp ? <UpArrow /> : <DownArrow />)}
          </p>
        </div>
      </div>
    </div>
  );
}

const UpArrow = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.16475 2.08243 8.16516 2.08243 8.16556 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z"
        fill="#039855"
      />
    </svg>
  );
};

const DownArrow = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.26816 13.6632C7.4056 13.8192 7.60686 13.9176 7.8311 13.9176C7.83148 13.9176 7.83187 13.9176 7.83226 13.9176C8.02445 13.9178 8.21671 13.8447 8.36339 13.6981L12.3635 9.70076C12.6565 9.40797 12.6567 8.9331 12.3639 8.6401C12.0711 8.34711 11.5962 8.34694 11.3032 8.63973L8.5811 11.36L8.5811 2.5C8.5811 2.08579 8.24531 1.75 7.8311 1.75C7.41688 1.75 7.0811 2.08579 7.0811 2.5L7.0811 11.3556L4.36354 8.63975C4.07055 8.34695 3.59568 8.3471 3.30288 8.64009C3.01008 8.93307 3.01023 9.40794 3.30321 9.70075L7.26816 13.6632Z"
        fill="#D92D20"
      />
    </svg>
  );
};
