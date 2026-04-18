import { useState, useRef, useEffect, FormEvent } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
	formState: ArticleStateType;
	setFormState: (state: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	formState,
	setFormState,
	onApply,
	onReset,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLDivElement | null>(null);

	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (asideRef.current && !asideRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onApply();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />

			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={onReset}>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(value) =>
							setFormState({ ...formState, fontFamilyOption: value })
						}
					/>

					<Select
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) =>
							setFormState({ ...formState, fontSizeOption: value })
						}
					/>

					<RadioGroup
						name='fontColor'
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(value) =>
							setFormState({ ...formState, fontColor: value })
						}
					/>

					<RadioGroup
						name='backgroundColor'
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(value) =>
							setFormState({ ...formState, backgroundColor: value })
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(value) =>
							setFormState({ ...formState, contentWidth: value })
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
