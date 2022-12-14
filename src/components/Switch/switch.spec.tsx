import * as SwitchStories from '@stories/Switch.stories';
import { composeStories } from '@storybook/testing-react';
import { fireEvent, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import React, { useRef } from 'react';

const { Default } = composeStories(SwitchStories);

expect.extend(toHaveNoViolations);

describe('Switch component', () => {


	test('render the switch with unchecked status', () => {

		const { getByRole } = render(<Default checked={false} />);

		const component = getByRole('checkbox');

		expect(component).toBeInTheDocument();
		expect(component).not.toBeChecked();
	});

	test('render the switch with checked status', () => {

		const { getByRole } = render(<Default checked={true} />);

		const component = getByRole('checkbox');

		expect(component).toBeInTheDocument();
		expect(component).toBeChecked();
	});

	test('disabled switch should be readonly', () => {

		const { getByRole } = render(<Default disabled={true} checked={false} />);

		const component = getByRole('checkbox');

		fireEvent.change(component);

		expect(component).toBeInTheDocument();
		expect(component).not.toBeChecked();
	});

	test('should uncheck checked switch', () => {

		const { getByRole } = render(<Default checked={true} />);

		const component = getByRole('checkbox');

		fireEvent.click(component);

		expect(component).not.toBeChecked();
	});

	test('should check unchecked switch', () => {

		const { getByRole } = render(<Default checked={false} />);

		const component = getByRole('checkbox');

		fireEvent.click(component);

		expect(component).toBeChecked();
	});

	test('should not activate throught space key when its disabled', () => {

		const { getByRole } = render(<Default disabled={true} checked={true}/>);

		const component = getByRole('checkbox');

		component.focus();

		fireEvent.keyDown(component, { key: 'Space', code: 'Space' });

		expect(component).toBeChecked();
	});
	
	test('should call callback OnChange function when it changes', () => {

		const randomFucntion = jest.fn();
		
		const { getByRole } = render(<Default disabled={false} checked={false} onChange={randomFucntion}/>);

		const component = getByRole('checkbox');
		
		component.focus();
		
		fireEvent.click(component);
		
		expect(component).toBeChecked();
		expect(randomFucntion).toHaveBeenCalled();
	});
	
	test('should not call callback OnChange function when its disabled', () => {

		const randomFucntion = jest.fn();
		
		const { getByRole } = render(<Default disabled={true} checked={true} onChange={randomFucntion}/>);

		const component = getByRole('checkbox');
		
		component.focus();
		
		fireEvent.click(component);
		
		expect(component).toBeChecked();
		expect(randomFucntion).not.toHaveBeenCalled();
	});

	test('should not fail any accessibility test', async () => {

		const { getByRole } = render(<Default aria-label='default switch'/>);

		const component = getByRole('checkbox');

		expect(component).toBeInTheDocument();
		expect(await axe(component)).toHaveNoViolations();
	});

});
