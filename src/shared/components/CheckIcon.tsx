import React, { ReactNode, memo, useMemo } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    ViewStyle,
    TextStyle,
    Insets,
} from 'react-native';

export interface CheckIconProps {
    checked: boolean;
    onToggle?: (next: boolean) => void;

    /* glyph settings */
    size?: number;
    checkedColor?: string;
    uncheckedColor?: string;
    checkedIcon?: ReactNode;
    uncheckedIcon?: ReactNode;

    /* hit‑slop */
    hitSlop?: Insets;

    /* NEW – conditional wrapper styles or colours */
    checkedStyle?: ViewStyle;
    uncheckedStyle?: ViewStyle;
    /** quick shortcut if you just want colours */
    checkedBgColor?: string;     // default 'red'
    uncheckedBgColor?: string;   // default 'transparent'

    /* generic styles */
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const CheckIcon: React.FC<CheckIconProps> = memo(
    ({
        checked,
        onToggle,
        size = 18,
        checkedColor = '#000',
        uncheckedColor = '#000',
        checkedIcon,
        uncheckedIcon,
        hitSlop = { top: 4, bottom: 4, left: 4, right: 4 },

        /* new */
        checkedStyle,
        uncheckedStyle,
        checkedBgColor = 'red',
        uncheckedBgColor = 'transparent',

        style,
        textStyle,
    }) => {
        /* which glyph? */
        const glyph = useMemo(() => {
            if (checked) {
                if (checkedIcon) return checkedIcon;
                return (
                    <Text
                        style={[
                            styles.text,
                            { fontSize: size, color: checkedColor },
                            textStyle,
                        ]}
                    >
                        ☑
                    </Text>
                );
            }
            if (uncheckedIcon) return uncheckedIcon;
            return (
                <Text
                    style={[
                        styles.text,
                        { fontSize: size, color: uncheckedColor },
                        textStyle,
                    ]}
                >
                    ☐
                </Text>
            );
        }, [
            checked,
            size,
            checkedColor,
            uncheckedColor,
            checkedIcon,
            uncheckedIcon,
            textStyle,
        ]);

        /* wrapper + interaction */
        const Wrapper = onToggle ? Pressable : View;
        const wrapperProps = onToggle
            ? { onPress: () => onToggle(!checked), hitSlop }
            : {};

        /* merge wrapper style with conditional BG or side styles */
        const wrapperStyle: ViewStyle = {
            backgroundColor: checked ? checkedBgColor : uncheckedBgColor,
            ...style,                 // generic style first
            ...(checked ? checkedStyle : uncheckedStyle),
        };

        return (
            <Wrapper
                {...wrapperProps}
                accessibilityRole="checkbox"
                accessibilityState={{ checked }}
                style={[styles.wrapper, wrapperStyle]}
            >
                {glyph}
            </Wrapper>
        );
    },
);

CheckIcon.displayName = 'CheckIcon';

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        includeFontPadding: false,
    },
});

export default CheckIcon;
