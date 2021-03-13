export type onClickButton = (
	e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
) => void;

export type onClickRadioGroup = (
	e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
) => void;

export type onClickCell = (
	e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
) => void;

export type onClickAncor = (
	e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) => void;

export type onKeyDownRadioGroup = (
	e: React.KeyboardEvent<HTMLSpanElement>,
) => void;

export type onKeyDownModal = (e: React.KeyboardEvent<HTMLElement>) => void;

export type onKeyDownAnchor = (
	e: React.KeyboardEvent<HTMLAnchorElement>,
) => void;

export type AddPrefix = (name: string) => string;

export type HighlightRow = (e: React.MouseEvent<HTMLTableRowElement>) => void;

export type onChange = (e: React.ChangeEvent<HTMLInputElement>) => void;

export type onChangeOrTextArea = (
	e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;

export type onChangeTextArea = (
	e: React.ChangeEvent<HTMLTextAreaElement>,
) => void;

export type MovePart = (
	e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	dir: number,
) => void;
