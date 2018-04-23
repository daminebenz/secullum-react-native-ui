import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTheme } from '../modules/theme';

export interface HeaderButton {
  icon: string;
  disabled?: boolean;
  onPress: () => void;
}

export interface HeaderProperties {
  title: string;
  leftButton: HeaderButton;
  rightButton: HeaderButton;
}

export class Header extends React.Component<HeaderProperties> {
  static defaultProps = {
    leftButtonType: 'menu'
  };

  static height = 50;

  renderButton = (button: HeaderButton, type: 'left' | 'right') => {
    const icon = (
      <FontAwesome
        name={button.icon}
        size={20}
        color={button.disabled ? theme.textColor1 : theme.textColor4}
      />
    );

    const style = [
      styles.button,
      type === 'left' ? { marginRight: 'auto' } : { marginLeft: 'auto' }
    ];

    if (button.disabled) {
      return <View style={style}>{icon}</View>;
    }

    return (
      <TouchableOpacity onPress={button.onPress} style={style}>
        {icon}
      </TouchableOpacity>
    );
  };

  render() {
    const { title, leftButton, rightButton } = this.props;

    return (
      <View style={styles.header}>
        {this.renderButton(leftButton, 'left')}
        <Text style={styles.title}>{title}</Text>
        {this.renderButton(rightButton, 'right')}
      </View>
    );
  }
}

const theme = getTheme();

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.backgroundColor3,
    height: Header.height,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: theme.textColor4,
    fontFamily: 'Lato-Bold',
    fontSize: 18
  },
  button: {
    padding: 10
  }
});
