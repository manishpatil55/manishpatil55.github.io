import { Fragment } from "react";
import StarIcon from "../assets/icons/star.svg";

const words = [
  "Hello World!",
  "🌏",
  "Code",
  "Create",
  "Conquer",
  "Hello World!",
  "🌏",
  "Code",
  "Create",
  "Conquer",
];

export const TapeSection = () => {
  return (
    <div className="py-16 lg:py-24 overflow-x-clip">
      <div className="bg-gradient-to-r from-emerald-300 to-sky-400 -rotate-3 -mx-1">
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex flex-none gap-4 pr-4 py-3 animate-move-left [animation-duration:1000s]">
            {[...new Array(100)].fill(0).map((_, idx) => (
              <Fragment key={idx}>
                {words.map((word, i) => (
                  <div key={`${word}-${i}`} className="inline-flex gap-4 items-center">
                    <span className="text-gray-900 uppercase font-extrabold text-sm">
                      {word}
                    </span>
                    <StarIcon className="size-6 text-gray-900 -rotate-12" />
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};