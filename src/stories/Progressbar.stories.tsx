import React from 'react';

import { ComponentStory } from '@storybook/react';

import ProgressBar from '@components/Progressbar/Progressbar';


const Template: ComponentStory<typeof ProgressBar> = (args) => <ProgressBar {...args} />;

export const Default = Template.bind({});

Default.args = {
	maxValue: 100,
	value: 50,
	label: 'Progressbar label',
	helperText: 'Progressbar helper text'
};

export default {
	title: 'ProgressBar',
	component: ProgressBar,
} as unknown as ComponentStory<typeof ProgressBar>;