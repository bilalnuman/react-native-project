import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export interface DropdownItem {
    label: string;
    value: string | number;
}

interface DropdownProps {
    items: DropdownItem[];
    value: any;
    onChange: (value: any) => void;
    placeholder?: string;
    multiple?: boolean;
    disabled?: boolean;
    zIndex?: number;
    searchable?: boolean;
    searchPlaceholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
    items,
    value,
    onChange,
    placeholder = 'Select an option',
    multiple = false,
    disabled = false,
    zIndex = 10,
    searchable = true,
    searchPlaceholder = 'Search...',
}) => {
    const [open, setOpen] = useState(false);
    const [dropdownItems, setDropdownItems] = useState(items);

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={dropdownItems}
            setOpen={setOpen}
            setValue={onChange}
            setItems={setDropdownItems}
            multiple={multiple}
            mode={multiple ? 'BADGE' : 'SIMPLE'}
            placeholder={placeholder}
            disabled={disabled}
            searchable={searchable}
            searchPlaceholder={searchPlaceholder}
            style={{ zIndex }}
            dropDownContainerStyle={{ zIndex }}
        />
    );
};

export default Dropdown;
