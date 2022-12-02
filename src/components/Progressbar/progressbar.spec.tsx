import React from 'react';
import ProgressBar from './Progressbar';

import { render } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Switch component', () => {


    test('render progress bar with max value as 150', () => {

        const { getByRole } = render(<ProgressBar maxValue={150} />);

        const progressbar = getByRole('progressbar');

        expect(progressbar).toBeInTheDocument();
        expect(progressbar).toHaveAttribute('max-value', '150');
    });

    test('progress bar with value greater than maxValue should consider maxValue for fill width', () => {

        const { getByRole } = render(<ProgressBar maxValue={100} value={150} />);

        const progressbar = getByRole('progressbar');
        const progressbarFill = getByRole('progressbar-fill');

        expect(progressbar).toBeInTheDocument();
        expect(progressbarFill).toHaveStyle({ width: '100%' });
    });

    test('progress bar label without value should be hidden', () => {

        const { container } = render(<ProgressBar maxValue={100} value={150} />);

        const label = container.querySelector('.progressbar_label');

        expect(label).toHaveClass('--hidden');
    });

    test('progressbar label without value should be hidden', () => {

        const { container } = render(<ProgressBar maxValue={100} value={150} />);

        const label = container.querySelector('.progressbar_label');

        expect(label).toBeEmptyDOMElement();
        expect(label).toHaveClass('--hidden');
    });

    test('progressbar label with value should be visible', () => {
        
        const { getByText } = render(<ProgressBar label='Progressbar label'/>);
        
        const label = getByText('Progressbar label');
        
        expect(label).toHaveTextContent('Progressbar label');
        expect(label).not.toHaveClass('--hidden');
    });

    
    test('progressbar should not render helper label when helperText is not defined', () => {

        const { container } = render(<ProgressBar maxValue={100} value={150} />);

        const label = container.querySelector('.progressbar_helpertext');

        expect(label).not.toBeInTheDocument();
    });
    
    test('progressbar should have label with helperText value', () => {

        const { getByText } = render(<ProgressBar maxValue={100} value={150} helperText={'Helper text label'}/>);

        const label = getByText('Helper text label');

        expect(label).toBeInTheDocument();
    });


});
