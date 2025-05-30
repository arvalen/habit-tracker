import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { defaultColor } from "@/colors";

function Calendar() {
  return (
    <div className="flex mx-4 flex-col gap-6 justify-center items-center mt-10 bg-slate-50 rounded-xl p-5 pt-7">
      <DateCalendar
        slotProps={{
          day: {
            sx: {
              '&.Mui-selected': {
                backgroundColor: defaultColor.default,
                color: 'white',
                '&:hover': {
                  backgroundColor: defaultColor.default,
                },
                '&.Mui-focusVisible': {
                  backgroundColor: defaultColor.default,
                },
                '&:focus': {
                  backgroundColor: defaultColor.default,
                },
                '&:active': {
                  backgroundColor: defaultColor.default,
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

export default Calendar;
