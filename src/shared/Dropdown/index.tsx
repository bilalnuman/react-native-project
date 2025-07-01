// File: src/types.ts
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import React from 'react';

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
    getRemovedItem?: (val:DropdownItem) => void;
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

// -------------------------------------------------------
// File: src/Dropdown.tsx
import { useCallback, useMemo, useState } from 'react';
import {
    Modal,
    Pressable,
    Text,
    TextInput,
    FlatList,
    View,
    StyleSheet,
} from 'react-native';
// import { DropdownItem, DropdownProps } from './types';

const isMulti = <T,>(val: T | T[] | undefined, enabled?: boolean): val is T[] => !!enabled;

export function Dropdown<T extends string | number = string>(props: DropdownProps<T>) {
    const {
        items,
        value,
        onChange,
        getRemovedItem=()=> {},
        multiple,
        placeholder = 'Select…',
        searchEnabled = true,
        searchablePlaceholder = 'Search…',
        dropdownStyle,
        dropdownContainerStyle,
        listStyle,
        itemStyle,
        labelStyle,
        chipStyle,
        chipTextStyle,
        selectedItemIcon,
        renderItem,
        disabled,
    } = props;

    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');

    const toggle = useCallback(() => {
        if (disabled) return;
        setVisible((v) => !v);
    }, [disabled]);

    const onItemPress = useCallback(
        (item: DropdownItem) => () => {
            if (multiple) {
                let next: T[] = [];
                if (isMulti<T>(value, multiple)) {
                    const exists = value.includes(item.value as T);
                    next = exists ? value.filter((v) => v !== item.value) : [...value, item.value as T];
                } else {
                    next = [item.value as T];
                }
                onChange(next);
            } else {
                onChange(item.value as T);
                setVisible(false);
            }
        },
        [multiple, onChange, value]
    );

    const onRemoveChip = useCallback(
        (item: DropdownItem) => () => {
            if (multiple && isMulti<T>(value, multiple)) {
                const next = value.filter((v) => v !== item.value);
                onChange(next);
                getRemovedItem(item)
            }
        },
        [multiple, onChange, value]
    );

    const selectedItems = useMemo(() => {
        if (multiple && isMulti<T>(value, multiple)) {
            return items.filter((i) => value?.includes(i.value as T));
        }
        if (!multiple && value !== undefined) {
            return items.find((i) => i.value === value) || null;
        }
        return multiple ? [] : [];
    }, [items, multiple, value]);

    const filtered = useMemo(() => {
        if (!search) return items;
        const lower = search.toLowerCase();
        return items.filter((i) => i.label.toLowerCase().includes(lower));
    }, [items, search]);

    const renderRow = useCallback(({ item }: { item: DropdownItem }): React.ReactElement | null => {
        const isSelected = multiple
            ? isMulti<T>(value, multiple) && value.includes(item.value as T)
            : value === item.value;

        if (renderItem) {
            const custom = renderItem(item, isSelected);
            return custom ? <>{custom}</> : null;
        }

        return (
            <Pressable
                onPress={onItemPress(item)}
                style={[styles.item, itemStyle]}
                android_ripple={{ color: '#eee' }}
            >
                {item.icon && <View style={styles.leftIcon}>{item.icon}</View>}
                <Text style={[styles.label, labelStyle]}>{item.label}</Text>
                {isSelected && (selectedItemIcon || <Text style={styles.check}>✓</Text>)}
            </Pressable>
        );
    },
        [itemStyle, labelStyle, multiple, onItemPress, renderItem, selectedItemIcon, value]
    );

    /** Chip list for multi‑select */
    const renderChips = () => {
        if (!multiple || !isMulti<T>(value, multiple)) return null;
        const chips = selectedItems as DropdownItem[]; // asserted non‑null in multi‑select mode
        return (
            <View style={styles.chipsContainer}>
                {chips.map((itm) => (
                    <View key={itm.value.toString()} style={[styles.chip, chipStyle]}>
                        <Text style={[styles.chipText, chipTextStyle]}>{itm.label}</Text>
                        <Pressable onPress={onRemoveChip(itm)}>
                            <Text style={styles.remove}>×</Text>
                        </Pressable>
                    </View>
                ))}
            </View>
        );
    };

    const displayLabel = useMemo(() => {
        if (multiple) {
            if (isMulti<T>(value, multiple) && value.length > 0) {
                return `${value.length} selected`;
            }
            return placeholder;
        }
        return (selectedItems as DropdownItem | null)?.label ?? placeholder;
    }, [multiple, placeholder, selectedItems, value]);

    return (
        <View style={[styles.container, dropdownContainerStyle]}>
            <Pressable
                style={[styles.dropdown, dropdownStyle, disabled && styles.disabled]}
                onPress={toggle}
            >
                <Text style={[styles.selectedText, !value && styles.placeholder]} numberOfLines={1}>
                    {displayLabel}
                </Text>
            </Pressable>

            {multiple && renderChips()}

            <Modal visible={visible} transparent animationType="fade" onRequestClose={toggle}>
                <Pressable style={styles.modalOverlay} onPress={toggle}>
                    <Pressable
                        style={[styles.modalContent, listStyle]}
                        onStartShouldSetResponder={() => true}
                    >
                        {searchEnabled && (
                            <TextInput
                                style={styles.searchInput}
                                placeholder={searchablePlaceholder}
                                value={search}
                                onChangeText={setSearch}
                                autoFocus
                            />
                        )}
                        {filtered?.length === 0 ? <Text style={{ textAlign: "center", paddingBottom: 5 }}>Nothing to match</Text> :
                            <FlatList
                                data={filtered}
                                keyExtractor={(i) => i.value.toString()}
                                renderItem={renderRow}
                                initialNumToRender={15}
                                maxToRenderPerBatch={20}
                                windowSize={10}
                                removeClippedSubviews
                                keyboardShouldPersistTaps="handled"
                            />}
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}


// export default React.memo(Dropdown) as typeof Dropdown;

// -------------------------------------------------------
// File: src/index.ts
// export * from './types';
// export { default as Dropdown } from '';

// -------------------------------------------------------
// KEY TAKEAWAY ➜ No RHF‑specific props — pass only `value` & `onChange` when you use a `Controller`. This keeps the dropdown completely standalone & framework‑agnostic.


const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 4,
        padding: 12,
        backgroundColor: '#fff',
    },
    selectedText: {
        fontSize: 16,
        color: '#212529',
    },
    placeholder: {
        color: '#6c757d',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        padding: 16,
    },
    modalContent: {
        backgroundColor: '#fff',
        maxHeight: '60%',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        elevation: 5,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 4,
        padding: 8,
        marginBottom: 10,
        fontSize: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    leftIcon: {
        marginRight: 8,
    },
    label: {
        flex: 1,
        fontSize: 16,
        color: '#212529',
    },
    check: {
        fontSize: 16,
        color: '#0d6efd',
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e9ecef',
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 8,
        margin: 4,
    },
    chipText: {
        marginRight: 6,
        fontSize: 14,
        color: '#212529',
    },
    remove: {
        fontSize: 16,
        color: '#6c757d',
    },
    disabled: {
        backgroundColor: '#e9ecef',
    },
});

