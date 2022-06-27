import React, { useState } from 'react';
import { heatmapCount } from "../../../interfaces/index";
import ReactTooltip from 'react-tooltip';
import YearSelector from './YearSelector';
import Calendar from './Calendar';
import "../Info.css";
import "../Home.css";

const InfoHistory = ({
  country,
  heatmapDeathCount,
  heatmapConfirmedCount,
  extraClass,
  year,
  setYear
} : {
  country: string;
  heatmapDeathCount: heatmapCount;
  heatmapConfirmedCount: heatmapCount;
  extraClass?: string;
  year: string;
  setYear: (year: string) => void;
}) => {

  const [tooltip, showTooltip] = useState(true);
  
  const customTooltipDataAttrs = (date:string, count: number, label: string) => ({'data-tip': `The day ${date} are: ${count} of ${label} in total`});

  return (
    
    <div className={`card ${extraClass}`}>
      <h1>{country} - History</h1>
      <div className="margins">
        <div>
          <YearSelector year={year} setYear={setYear}/>
        </div>
        <Calendar label='Deaths' showTooltip={(b) => showTooltip(b)} heatmapCount={heatmapDeathCount} customTooltipDataAttrs={customTooltipDataAttrs}/>
        <Calendar label='Confirmed' showTooltip={(b) => showTooltip(b)} heatmapCount={heatmapConfirmedCount} customTooltipDataAttrs={customTooltipDataAttrs}/>
        {tooltip && <ReactTooltip />}
      </div>
    </div>
  );
}

export default InfoHistory;