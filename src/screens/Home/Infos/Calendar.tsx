import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { heatmapCount } from "../../../interfaces/index";

const Calendar = ({
  label,
  showTooltip,
  heatmapCount,
  customTooltipDataAttrs
} : {
  label: string;
  showTooltip: (b: boolean) => void;
  heatmapCount: heatmapCount;
  customTooltipDataAttrs: (date:string, count: number, label: string) => void
}) => {
  return (
    <div>
      <h3>{label}:</h3>
      <div 
        onMouseEnter={() => showTooltip(true)}
        onMouseLeave={() => {
          showTooltip(false);
          setTimeout(() => showTooltip(true), 50);
        }}
      >
        <CalendarHeatmap
          startDate={new Date(heatmapCount.startDate)}
          endDate={new Date(heatmapCount.finalDate)}
          values={heatmapCount.values}
          tooltipDataAttrs={(event: any) => customTooltipDataAttrs(event.date, event.count, label.toLowerCase())}
        />
        <p className="tooltipInfo">*Hover the mouse over the squares to see a tooltip with data</p>
      </div>
    </div>
  );
}

export default Calendar;