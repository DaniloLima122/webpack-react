import React, { ReactNode } from 'react';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
	disabled?: boolean;
	children?: ReactNode;
	onClick?: () => void;
	variant?: 'primary' | 'secondary' | 'text';
}

const Button = React.forwardRef((props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {

	const {
		disabled,
		children,
		onClick = () => null,
		variant: variation = 'primary' } = props;

	const dispatch = () => {
		!disabled && onClick();
	};

	const handdleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {

		const isValidKeys = event.code == 'Space' || event.code == 'Enter';

		if (isValidKeys) dispatch();

	};

	return <button
		className={`button ${variation}`}
		ref={ref}
		onClick={dispatch}
		onKeyDown={handdleKeyDown}
		aria-disabled={props.disabled}>{children}</button>;
});
export default Button;