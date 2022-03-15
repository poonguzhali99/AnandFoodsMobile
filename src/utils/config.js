import React from 'react';
import { Dimensions } from 'react-native';
import Andrew_logo from '../assets/images/Andrew_logo.png';
import Winmore_logo from '../assets/images/Winmore_logo.png';
import bus_icon from '../assets/images/bus_icon.png';

// Andrew School Images
export const images = {
	logo: Andrew_logo,
	bus: bus_icon
};

//Winmore School Images
// export const images = {
// 	logo: Winmore_logo
// };

// Viewport Width and Height
export const viewportWidth = Dimensions.get('screen').width;
export const viewportHeight = Dimensions.get('screen').height;

// Colors for Andrew_Schools
export const colors = {
	black: '#000',
	grey: '#b3b3b3',
	white: '#fff',
	primary: '#5c00e6', //'#167ccb',
	primaryMuted: '#75bbf0',
	secondary: '#783993',
	title: '#ff1a1a',
	link: '#0060c1',
	green: '#6dd400',
	error: '#d50000',
	placeHolderGrey: '#c2c2c9',
	imagePlaceHolder: '#e6e6ff',
	errorBg: '#f8d7da',
	muted: '#6c757d',
	orange: '#f0a50a',
	grey_2: '#f2f2f2',
	red: '#8c2332',
	darkGrey: '#404040',
	success: '#4bb453',
	warning: '#ffcc00',
	appBackground: '#f0f0f0',
	overlay: 'rgba(0, 0, 0, 0.7)',
	translucent: 'rgba(0, 0, 0, 0.2)',
	danger: '#eb5757',
	info: '#17a2b8'
};

//Development Environment
// export const client_info = {
// 	client_id: 'Ae-Erp-Api_DH',
// 	oneSignalID: 'c09f7a05-029a-4f1d-b6a8-695fc72a1b0e',
// 	paymentEnvironment: '1'
// };

// export const API_URL = `https://redirect-dev.ae-erp.in/${client_info.client_id}/`;
// export const TOKEN_URL = '';

// Production Environment
export const client_info = {
	client_id: 'Ae-Erp-Api_H',
	oneSignalID: 'aceb7bc1-8126-46c3-9f0b-c79f17358a21',
	paymentEnvironment: '0'
};

export const API_URL = `https://redirect-dev.ae-erp.in/Food/Api/Home/`;
export const TOKEN_URL = '';

// Andrew School location
export const locationData = [
	{
		id: 'Hyderabad',
		name: 'Hyderabad'
	}
];

// Winmore School location
// export const locationData = [
// 	{
// 		id: 'Bangalore',
// 		name: 'Bangalore'
// 	}
// ];

// export const sideBar = [
// 	{
// 		id: 'home',
// 		name: 'Dashboard',
// 		icon: 'home',
// 		navigation: 'HomePage',
// 		isActiveMenu: 'Yes',
// 		isHideMenu: 'No',
// 		url: require('../assets/icons/house.png')
// 	},
// 	{
// 		id: 'group',
// 		name: 'Group Notifications',
// 		icon: 'bell',
// 		navigation: 'NotificationGroups',
// 		isActiveMenu: 'Yes',
// 		isHideMenu: 'No',
// 		url: require('../assets/icons/bell.png')
// 	},
// 	{
// 		id: 'studentMaster',
// 		name: 'Student Master',
// 		icon: 'graduation-cap',
// 		navigation: 'StudentDetails',
// 		isActiveMenu: 'Yes',
// 		isHideMenu: 'No',
// 		url: require('../assets/icons/student.png')
// 	},
// 	{
// 		id: 'fee',
// 		name: 'Fee Management',
// 		icon: 'money',
// 		navigation: 'FeePayment',
// 		isActiveMenu: 'Yes',
// 		isHideMenu: 'No',
// 		url: require('../assets/icons/money.png')
// 	},
// 	{
// 		id: 'bus',
// 		name: 'Transport Management', //'Bus Transport',
// 		icon: 'bus',
// 		navigation: 'TransportManagement',
// 		isActiveMenu: 'Yes',
// 		isHideMenu: 'No',
// 		url: require('../assets/icons/bus.png')
// 	},
// 	{
// 		id: 'attendance',
// 		name: 'Attendance',
// 		icon: 'book',
// 		navigation: 'Attendance',
// 		isActiveMenu: 'Yes',
// 		isHideMenu: 'No',
// 		url: require('../assets/icons/attendance.png')
// 	},
// 	{
// 		id: 'class',
// 		name: 'Class Timetable',
// 		icon: 'table',
// 		navigation: 'TimeTable',
// 		isActiveMenu: 'Yes',
// 		isHideMenu: 'No',
// 		url: require('../assets/icons/timetable.png')
// 	},
// 	{
// 		id: 'transfercertificate',
// 		name: 'Transfer Certificate',
// 		icon: 'file',
// 		navigation: 'TransferCertificate',
// 		isActiveMenu: 'Yes',
// 		isHideMenu: 'No',
// 		url: require('../assets/icons/certificate.png')
// 	},
// 	{
// 		id: 'report',
// 		name: 'Report Card',
// 		icon: 'bar-chart',
// 		navigation: 'ReportCard',
// 		isActiveMenu: 'Yes',
// 		isHideMenu: 'No',
// 		url: require('../assets/icons/report-card.png')
// 	},
// 	{
// 		id: 'parent',
// 		name: 'Parent Query',
// 		icon: 'comments',
// 		navigation: 'Dashboard',
// 		isActiveMenu: 'No',
// 		isHideMenu: 'No',
// 		url: require('../assets/icons/query.png')
// 	},

// 	{
// 		id: 'homework',
// 		name: 'Home Work',
// 		icon: 'stack-overflow',
// 		navigation: 'Dashboard',
// 		isActiveMenu: 'No',
// 		isHideMenu: 'No',
// 		url: require('../assets/icons/home-work.png')
// 	},
// 	{
// 		id: 'policies',
// 		name: 'School Policies',
// 		icon: 'handshake-o',
// 		navigation: 'Policies',
// 		isActiveMenu: 'Yes',
// 		isHideMenu: 'No',
// 		url: require('../assets/icons/policy.png')
// 	},
// 	{
// 		id: 'feeDue',
// 		name: 'Fee Due Alerts',
// 		icon: 'bullhorn',
// 		navigation: 'Dashboard',
// 		isActiveMenu: 'No',
// 		isHideMenu: 'No',
// 		url: require('../assets/icons/due-alert.png')
// 	},
// 	{
// 		icon: 'calendar',
// 		id: 'ptmSchedule',
// 		isActiveMenu: 'Yes',
// 		name: 'PTM Schedule',
// 		navigation: 'PTMSchedule',
// 		isHideMenu: 'No',
// 		url: require('../assets/icons/calendar.png')
// 	}
// ];
