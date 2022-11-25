import React from 'react';

import { ComponentStory } from '@storybook/react';

import Button from '@components/Button/Button';

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} >{args.children}</Button>;

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Text = Template.bind({});

const commonValues = {
	children: 'Button',
	disabled: false
};

Primary.args = {
	...commonValues,
	variant: 'primary',
};

Secondary.args = {
	...commonValues,
	variant: 'secondary',
};

Text.args = {
	variant: 'text',
	...commonValues,
};

export default {
	title: 'Button',
	component: Button,
	argTypes: {
		variant: {
			options: ['primary', 'secondary', 'text'],
			control: { type: 'select' },
		},
	},
	args: {
		variant: 'primary'
	}
} as unknown as ComponentStory<typeof Button>;