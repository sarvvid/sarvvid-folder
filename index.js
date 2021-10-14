/**
 * @format
 */

// import crypto from './ineed.js';  
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

// const crypto = require('crypto');
// import 'text-encoding-polyfill';
// import Joi from '@hapi/joi';
// // const string_decoder = require('string_decoder');
// const {TextEncoder,TextDecoder} = require("fastestsmallesttextencoderdecoder");
// import * as encoding from 'text-encoding';
// const TextEncodingPollyfill = require("text-encoding");
// TextEncoder = TextEncodingPollyfill.TextEncoder;
// TextDecoder = TextEncodingPollyfill.TextDecoder;
AppRegistry.registerComponent("main", () => App);
console.disableYellowBox = true;
