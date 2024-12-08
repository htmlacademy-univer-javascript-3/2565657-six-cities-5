import {SortingOptionEnum} from './sorting-option-enum.ts';
import {Dispatch, RefObject, SetStateAction, useEffect} from 'react';

type SortingOptionsMenuProps = {
  options: SortingOptionEnum[];
  currentSortedOption: SortingOptionEnum;
  setCurrentSortedOption: Dispatch<SetStateAction<SortingOptionEnum>>;
  setIsShowSortedOptionsMenu: Dispatch<SetStateAction<boolean>>;
  sortedOptionsFormRef: RefObject<HTMLFormElement | null>;
}

function SortingOptionsMenu({
  options,
  currentSortedOption,
  setCurrentSortedOption,
  setIsShowSortedOptionsMenu,
  sortedOptionsFormRef
} : SortingOptionsMenuProps) {

  const handleClickOutside = (event: MouseEvent) => {
    if (sortedOptionsFormRef.current &&
      !sortedOptionsFormRef.current.contains(event.target as Node
      )) {
      setIsShowSortedOptionsMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ul className="places__options places__options--custom places__options--opened">
      {options.map((option: SortingOptionEnum) => {
        if (option === currentSortedOption) {
          return (
            <li key={option}
              className="places__option places__option--active"
              onClick={() => {
                setCurrentSortedOption(option);
                setIsShowSortedOptionsMenu(false);
              }}
              tabIndex={0}
            >
              {option}
            </li>
          );
        } else {
          return (
            <li
              key={option}
              className="places__option"
              onClick={() => {
                setCurrentSortedOption(option);
                setIsShowSortedOptionsMenu(false);
              }}
              tabIndex={0}
            >
              {option}
            </li>
          );
        }
      }
      )}
    </ul>
  );
}

export default SortingOptionsMenu;
