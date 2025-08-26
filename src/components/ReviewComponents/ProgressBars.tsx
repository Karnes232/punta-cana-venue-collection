import { useTranslations } from "next-intl";
import React from "react";

const ProgressBars = ({
  qualityOfServiceAvg,
  responsivenessAvg,
  professionalismAvg,
  valueAvg,
  flexibilityAvg,
}: {
  qualityOfServiceAvg: number
  responsivenessAvg: number
  professionalismAvg: number
  valueAvg: number
  flexibilityAvg: number
}) => {
    const t = useTranslations("RateVenue")
  return (
    <div className="flex flex-col gap-3 md:w-[22rem]">
      <div className="flex items-center justify-between">
        <p className="text-xs">{t("qualityOfService")}</p>
        <div className="flex gap-2">
          <progress
            max={5}
            value={isNaN(qualityOfServiceAvg) ? 4.8 : qualityOfServiceAvg}
            className="h-4 rounded-lg [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-gradient-to-r [&::-webkit-progress-value]:from-[#faedc3] [&::-webkit-progress-value]:to-golden [&::-moz-progress-bar]:bg-gradient-to-r [&::-moz-progress-bar]:from-[#faedc3] [&::-moz-progress-bar]:to-golden"
            style={{
              accentColor: '#D4AF37'
            }}
          />
          <p className="text-xs w-4 text-right">
            {isNaN(qualityOfServiceAvg) ? (
              <></>
            ) : (
              <>{qualityOfServiceAvg.toFixed(1)}</>
            )}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs">{t("responsiveness")}</p>
        <div className="flex gap-2">
          <progress
            max={5}
            value={isNaN(responsivenessAvg) ? 4.3 : responsivenessAvg}
            className="h-4 rounded-lg [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-gradient-to-r [&::-webkit-progress-value]:from-[#faedc3] [&::-webkit-progress-value]:to-golden [&::-moz-progress-bar]:bg-gradient-to-r [&::-moz-progress-bar]:from-[#faedc3] [&::-moz-progress-bar]:to-golden"
            style={{
              accentColor: '#D4AF37'
            }}
          />
          <p className="text-xs w-4 text-right">
            {isNaN(responsivenessAvg) ? (
              <></>
            ) : (
              <>{responsivenessAvg.toFixed(1)}</>
            )}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs">{t("professionalism")}</p>
        <div className="flex gap-2">
          <progress
            max={5}
            value={isNaN(professionalismAvg) ? 4.6 : professionalismAvg}
            className="h-4 rounded-lg [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-gradient-to-r [&::-webkit-progress-value]:from-[#faedc3] [&::-webkit-progress-value]:to-golden [&::-moz-progress-bar]:bg-gradient-to-r [&::-moz-progress-bar]:from-[#faedc3] [&::-moz-progress-bar]:to-golden"
            style={{
              accentColor: '#D4AF37'
            }}
          />
          <p className="text-xs w-4 text-right">
            {isNaN(professionalismAvg) ? (
              <></>
            ) : (
              <>{professionalismAvg.toFixed(1)}</>
            )}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs">{t("value")}</p>
        <div className="flex gap-2">
          <progress
            max={5}
            value={isNaN(valueAvg) ? 4.7 : valueAvg}
            className="h-4 rounded-lg [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-gradient-to-r [&::-webkit-progress-value]:from-[#faedc3] [&::-webkit-progress-value]:to-golden [&::-moz-progress-bar]:bg-gradient-to-r [&::-moz-progress-bar]:from-[#faedc3] [&::-moz-progress-bar]:to-golden"
            style={{
              accentColor: '#D4AF37'
            }}
          />
          <p className="text-xs w-4 text-right">
            {isNaN(valueAvg) ? <></> : <>{valueAvg.toFixed(1)}</>}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs">{t("flexibility")}</p>
        <div className="flex gap-2">
          <progress
            max={5}
            value={isNaN(flexibilityAvg) ? 4.5 : flexibilityAvg}
            className="h-4 rounded-lg [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-gradient-to-r [&::-webkit-progress-value]:from-[#faedc3] [&::-webkit-progress-value]:to-golden [&::-moz-progress-bar]:bg-gradient-to-r [&::-moz-progress-bar]:from-[#faedc3] [&::-moz-progress-bar]:to-golden"
            style={{
              accentColor: '#D4AF37'
            }}
          />
          <p className="text-xs w-4 text-right">
            {isNaN(flexibilityAvg) ? <></> : <>{flexibilityAvg.toFixed(1)}</>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBars;
