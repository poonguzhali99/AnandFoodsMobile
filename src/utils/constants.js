import { images } from './config';

export const constants = {
	userRole: {
		teacher: 'Teacher',
		admin: 'Admin',
		parent: 'Parent'
	}
};

export const staticVariables = {
	branchList: [
		{
			id: 'SLESBP',
			name: "St. Andrew's School, Bowenpally",
			url: images.logo,
			location: 'Hyderabad'
		},
		{
			id: 'LEETMP',
			name: "St. Andrew's School, Marredpally",
			url: images.logo,
			location: 'Hyderabad'
		},
		{
			id: 'SLESKS',
			name: "St. Andrew's School, Keesara",
			url: images.logo,
			location: 'Hyderabad'
		},
		{
			id: 'WMA',
			name: 'Winmore Academy',
			url: images.logo,
			location: 'Bangalore'
		},
		{
			id: 'SLESAK',
			name: 'Akira',
			url: images.logo,
			location: 'Hyderabad'
		}
	]
};
