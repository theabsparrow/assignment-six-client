"use client";
import { TcheckoutMeal, TCookingDay, TMealTime } from "@/types/mealType";
import { Dispatch, SetStateAction } from "react";

type TSelectDayTimeProps = {
  meal: TcheckoutMeal;
  selectedDays: TCookingDay[];
  selectedTimes: TMealTime[];
  setSelectedDays: Dispatch<SetStateAction<TCookingDay[]>>;
  setSelectedTimes: Dispatch<SetStateAction<TMealTime[]>>;
};

const SelectDayTime = ({
  meal,
  selectedDays,
  selectedTimes,
  setSelectedDays,
  setSelectedTimes,
}: TSelectDayTimeProps) => {
  const toggleDay = (day: TCookingDay) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleTime = (time: TMealTime) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Select Days</h3>
        <div className="flex flex-wrap gap-2">
          {meal?.availableDays.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`px-3 py-1 rounded-lg border cursor-pointer  ${
                selectedDays.includes(day)
                  ? "bg-primary text-white"
                  : "bg-secondary text-primary hover:bg-primary hover:text-white duration-500"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Select Times</h3>
        <div className="flex flex-wrap gap-2">
          {meal?.availableTime.map((time) => (
            <button
              key={time}
              onClick={() => toggleTime(time)}
              className={`px-3 py-1 rounded-lg border cursor-pointer ${
                selectedTimes.includes(time)
                  ? "bg-primary text-white"
                  : "bg-secondary text-primary hover:bg-primary hover:text-white duration-500"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectDayTime;
