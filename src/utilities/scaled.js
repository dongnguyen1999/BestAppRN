import {PixelRatio} from 'react-native';

export const pixcel = pixcel => PixelRatio.get() * pixcel;

export const fontSize = size => size / PixelRatio.getFontScale();
