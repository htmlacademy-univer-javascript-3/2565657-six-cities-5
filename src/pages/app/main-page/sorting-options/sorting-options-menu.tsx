import {Dispatch, RefObject, SetStateAction, useEffect} from 'react';
import {SortingOption} from '../../../../components/enums/sorting-option.ts';

type SortingOptionsMenuProps = {
  options: SortingOption[];
  currentSortedOption: SortingOption;
  setCurrentSortedOption: Dispatch<SetStateAction<SortingOption>>;
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortedOptionsFormRef.current &&
        !sortedOptionsFormRef.current.contains(event.target as Node
        )) {
        setIsShowSortedOptionsMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsShowSortedOptionsMenu, sortedOptionsFormRef]);

  return (
    <ul className="places__options places__options--custom places__options--opened">
      {options.map((option: SortingOption) => {
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
