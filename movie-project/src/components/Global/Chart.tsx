"use client";

import ChartJS from "chart.js/auto";
import React, { useRef, useEffect } from "react";

function Chart({
  labels,
  data,
  name,
}: {
  labels: Array<string>;
  data: Array<number>;
  name: string;
}) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      chartInstanceRef.current =
        ctx &&
        new ChartJS(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: name,
                data: data,
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <canvas ref={chartRef} />;
}

export default React.memo(Chart, (prevProps, nextProps) => {
  return (
    prevProps.labels.toString() === nextProps.labels.toString() &&
    prevProps.data.toString() === nextProps.data.toString() &&
    prevProps.name === nextProps.name
  );
});
