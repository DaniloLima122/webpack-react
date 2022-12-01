import React from 'react';

import { ComponentStory } from '@storybook/react';

import Switch from '@components/Switch/Switch';

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} >{args.children}</Switch>;

export const Default = Template.bind({});
export const SwitchLabeled = Template.bind({});

const commonValues = {
	disabled: false,
	checked: false
};

Default.args = {
	...commonValues,
};

SwitchLabeled.args = {
	...commonValues,
	children: 'Active card'
};

export default {
	title: 'Switch',
	component: Default,
} as unknown as ComponentStory<typeof Switch>;