import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function PieReport({
  series = [1],
}: {
  series: ApexNonAxisChartSeries;
}) {
  const height = 300;
  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: height,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5, // margin is in pixels
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "18px",
            fontWeight: "600",
            offsetY: -10,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  return (
    <div className="rounded-2xl bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-2">
        <div className="relative ">
          <div className={"max-h-[" + height + "px]"} id="chartDarkStyle">
            <Chart
              options={options}
              series={series}
              type="radialBar"
              height={height}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
