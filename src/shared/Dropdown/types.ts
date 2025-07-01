import { StyleProp, TextStyle, ViewStyle } from "react-native";
/**
 * A single option in the dropdown list.
 */
export interface DropdownItem {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}
/**
 * Props for the standalone, form‑agnostic dropdown component.
 *
 * 👉 **React Hook Form**: simply wrap this component in
 * `Controller` and pipe in `value` / `onChange` as usual —
 * no RHF‑specific props are needed.
 */
export interface DropdownProps<T = string | number> {
    /** Data list */
    items: DropdownItem[];
    /** Controlled selected value(s) */
    value?: T | T[];
    /** Change callback — fully controlled */
    onChange: (val: T | T[]) => void;
    /** Enable multi‑select */
    multiple?: boolean;
    /** Placeholder when nothing is selected */
    placeholder?: string;
    /** Enable search box */
    searchEnabled?: boolean;
    /** Placeholder inside search box */
    searchablePlaceholder?: string;

    // —— Visual customisation props ——
    dropdownStyle?: StyleProp<ViewStyle>;
    dropdownContainerStyle?: StyleProp<ViewStyle>;
    listStyle?: StyleProp<ViewStyle>;
    itemStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    chipStyle?: StyleProp<ViewStyle>;
    chipTextStyle?: StyleProp<TextStyle>;
    selectedItemIcon?: React.ReactNode;

    /** Optional custom renderer for a row */
    renderItem?: (item: DropdownItem, selected: boolean) => React.ReactNode;
    /** Disable interaction */
    disabled?: boolean;
}