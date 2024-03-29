import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";
import * as Icon from "@expo/vector-icons";

import Text from "./Text";
import Block from "./Block";
import Button from "./Button";
import { colors, sizes } from "../Theme";

export default class Input extends Component
{
    state = {
        toggleSecure: false
    };

    renderLabel()
    {
        const { label, error } = this.props;

        return (
            <Block flex={ false }>
                { label ? (
                    <Text black={ !error } accent={ error }>
                        { label }
                    </Text>
                ) : null }
            </Block>
        );
    }

    renderToggle()
    {
        const { secure, rightLabel } = this.props;
        const { toggleSecure } = this.state;

        if (!secure) return null;

        return (
            <Button
                style={ styles.toggle }
                onPress={ () => this.setState({ toggleSecure: !toggleSecure }) }
            >
                { rightLabel ? (
                    rightLabel
                ) : (
                    <Icon.Ionicons
                        color={ colors.gray }
                        size={ sizes.font * 2 }
                        name={ !toggleSecure ? "md-eye" : "md-eye-off" }
                    />
                ) }
            </Button>
        );
    }

    renderRight()
    {
        const { rightLabel, rightStyle, onRightPress } = this.props;

        if (!rightLabel) return null;

        return (
            <Button
                style={ [styles.toggle, rightStyle] }
                onPress={ () => onRightPress && onRightPress() }
            >
                { rightLabel }
            </Button>
        );
    }

    render()
    {
        const { email, phone, number, secure, error, style, ...props } = this.props;

        const { toggleSecure } = this.state;
        const isSecure = toggleSecure ? false : secure;

        const inputStyles = [
            styles.input,
            error && { borderColor: colors.accent },
            style
        ];

        const inputType = email
            ? "email-address"
            : number
                ? "numeric"
                : phone
                    ? "phone-pad"
                    : "default";

        return (
            <Block flex={ false } margin={ [sizes.base, 0] }>
                { this.renderLabel() }
                <TextInput
                    style={ inputStyles }
                    secureTextEntry={ isSecure }
                    autoComplete="off"
                    autoCapitalize="none"
                    autoCorrect={ false }
                    keyboardType={ inputType }
                    { ...props }
                />
                { this.renderToggle() }
                { this.renderRight() }
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.black,
        borderRadius: sizes.radius,
        fontSize: sizes.font,
        fontWeight: "500",
        color: colors.black,
        height: sizes.base * 3
    },
    toggle: {
        position: "absolute",
        alignItems: "flex-end",
        width: sizes.base * 2,
        height: sizes.base * 2,
        top: sizes.base,
        right: 0
    }
});