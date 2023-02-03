import React from 'react';
import { shallow } from 'enzyme';
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { TouchableContent } from '../components/TouchableContent';

describe('TouchableContent', () => {
  it('should render TouchableNativeFeedback on Android', () => {
    Platform.OS = 'android';

    const wrapper = shallow(<TouchableContent />);

    expect(wrapper.find(TouchableNativeFeedback).exists()).toBeTruthy();
  });

  it('should render TouchableOpacity on iOS', () => {
    Platform.OS = 'ios';

    const wrapper = shallow(<TouchableContent />);

    expect(wrapper.find(TouchableOpacity).exists()).toBeTruthy();
  });
});
