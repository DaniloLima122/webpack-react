import * as React from 'react';
import { useId } from 'react';

export interface ProgressBarProps {
	maxValue?: number,
	value?: number,
	label?: string,
	helperText?: React.ReactNode,
	onChange?: () => void;
}

const ProgressBar = React.forwardRef((props: ProgressBarProps, ref: React.Ref<HTMLInputElement>) => {

	const labelId = `progressbar-label-${useId()}`;
	const labelhelperId = `progressbar-label-helper-${useId()}`;

	const { maxValue = 100, value = 0, label = '', helperText } = props;

	const width = value <= maxValue ? (value / maxValue) * 100 : 100;

	return <div
		className='progressbar'
		role='progressbar'
		ref={ref}
		max-value={maxValue}
		aria-valuemax={maxValue}
		aria-valuenow={value}>

		<label
			className={`progressbar_label ${label.trim().length == 0 && '--hidden'}`}
			aria-label={label}
			id={labelId}>{label}</label>

		<div
			className='progressbar_fill_container'
			aria-labelledby={labelId}>
			<div
				className='progressbar_fill'
				style={{ width: `${width}%` }}
				role='progressbar-fill'></div>
		</div>

		{helperText ? <label
			className='progressbar_helpertext'
			id={labelhelperId}>{helperText}</label>
			: null}
	</div>;

});

export default ProgressBar;