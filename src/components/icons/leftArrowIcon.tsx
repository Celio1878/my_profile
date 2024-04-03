import { FC } from "react";

interface LeftArrowIconProps {
	width?: number;
	height?: number;
}

export const LeftArrowIcon: FC<LeftArrowIconProps> = ({ height = 50, width = 50 }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" {...{ width, height, viewBox: "1.3 0 20 20" }}>
			<path d="M14 17a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 1 1 1.414 1.414L11.414 12l3.293 3.293A1 1 0 0 1 14 17z" />
		</svg>
	);
};
