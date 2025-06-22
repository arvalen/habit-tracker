import { SuccessIcon } from "../Assets/SuccessIcon";

import { defaultColor } from "@/colors";

export default function WellDonePlaceHolder() {
  return (
    <div className="flex justify-center items-center p-5 flex-col">
      <SuccessIcon color={defaultColor.textColor50} />
      <span className="text-[13px] text-gray-600">
        {`You completed all your habits for today. Proud of you, King 👑. Let’s do it again tomorrow!`}
      </span>
    </div>
  );
}
