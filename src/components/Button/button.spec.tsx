import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { composeStories } from '@storybook/testing-react';
import * as ButtonStories from '@stories/Button.stories';

const { Primary, Secondary, Text } = composeStories(ButtonStories);

import Button from '@components/Button/Button';

expect.extend(toHaveNoViolations);

describe('Button component', () => {

	const ref = React.createRef<HTMLButtonElement>();

	test('render the button with its basic view', () => {

		const { getByRole } = render(<Button ref={ref}>Signin</Button>);

		const button = getByRole('button');

		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('button');
	});

	test('render the button with with primary variation', () => {

		const { getByRole } = render(<Primary />);

		const button = getByRole('button');

		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('primary');
	});

	test('render the button with with secondary variation', () => {

		const { getByRole } = render(<Secondary />);

		const button = getByRole('button');

		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('secondary');
	});

	test('render the button with with text variation', () => {

		const { getByRole } = render(<Text />);

		const button = getByRole('button');

		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('text');
	});

	test('disabled button might not execute assigned events when clicked', () => {

		const randomFunction = jest.fn();

		const { getByRole } = render(<Primary disabled={true} onClick={randomFunction} />);

		const button = getByRole('button');

		fireEvent(button, new MouseEvent('click'));

		expect(randomFunction).not.toHaveBeenCalled();
	});

	test('disabled button might have aria-disabled atribute value as true', () => {

		const { getByRole } = render(<Primary disabled={true} />);

		const button = getByRole('button');

		expect(button).toHaveAttribute('aria-disabled', 'true');
	});

	test('disabled button might not execute assigned events when its activated throught Space key', () => {

		const randomFunction = jest.fn();

		const { getByRole } = render(<Primary disabled={true} onClick={randomFunction} />);

		const button = getByRole('button');

		button.focus();

		fireEvent.keyDown(button, { key: 'Space', code: 'Space' });

		expect(randomFunction).not.toHaveBeenCalled();
	});

	test('it might be possible use Space key to active button', () => {

		const randomFunction = jest.fn();

		const { getByRole } = render(<Primary onClick={randomFunction} />);

		const button = getByRole('button');

		button.focus();

		fireEvent.keyDown(button, { key: 'Space', code: 'Space' });

		expect(randomFunction).toHaveBeenCalled();
	});

	test('disabled button might not execute assigned events when its activated throught Enter key', () => {

		const randomFunction = jest.fn();

		const { getByRole } = render(<Primary disabled={true} onClick={randomFunction} />);

		const button = getByRole('button');

		button.focus();

		fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

		expect(randomFunction).not.toHaveBeenCalled();
	});

	test('it might be possible use Enter key to active button', () => {

		const randomFunction = jest.fn();

		const { getByRole } = render(<Primary onClick={randomFunction}/>);

		const button = getByRole('button');

		button.focus();

		fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

		expect(randomFunction).toHaveBeenCalled();
	});

	test('should not fail any accessibility test', async () => {

		const { getByRole } = render(<Primary />);

		const button = getByRole('button');

		expect(button).toBeInTheDocument();
		expect(await axe(button)).toHaveNoViolations();
	});
});
