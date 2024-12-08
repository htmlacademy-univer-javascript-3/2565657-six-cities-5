import {Dispatch, SetStateAction, useRef, useState} from 'react';
import {SortingOptionEnum} from './sorting-option-enum.ts';
import SortingOptionsMenu from './sorting-options-menu.tsx';

type SortingOptionsProps = {
  currentSortedOption: SortingOptionEnum;
  setCurrentSortedOption: Dispatch<SetStateAction<SortingOptionEnum>>;
}

function SortingOptions({ currentSortedOption, setCurrentSortedOption } : SortingOptionsProps) {
  const options = [
    SortingOptionEnum.Popular,
    SortingOptionEnum.PriceLowToHigh,
    SortingOptionEnum.PriceHighToLow,
    SortingOptionEnum.TopRatedFirst
  ];

  const [isShowSortedOptionsMenu, setIsShowSortedOptionsMenu] = useState<boolean>(false);
  const sortedOptionsFormRef = useRef<HTMLFormElement | null>(null);
  return (
    <form ref={sortedOptionsFormRef} className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        onClick={() => setIsShowSortedOptionsMenu(!isShowSortedOptionsMenu)}
        tabIndex={0}
      >
        {currentSortedOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isShowSortedOptionsMenu &&
        <SortingOptionsMenu
          options={options}
          currentSortedOption={currentSortedOption}
          setCurrentSortedOption={setCurrentSortedOption}
          setIsShowSortedOptionsMenu={setIsShowSortedOptionsMenu}
          sortedOptionsFormRef={sortedOptionsFormRef}
        />}
    </form>
  );
}

export default SortingOptions;
