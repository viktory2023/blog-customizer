import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	appliedState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	appliedState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const [formState, setFormState] = useState(appliedState);

	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isSidebarOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (!(event.target instanceof Node)) return;

			if (!sidebarRef.current?.contains(event.target)) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen]);

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	const handleFontFamilyChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, fontFamilyOption: option }));
	};

	const handleFontSizeChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, fontSizeOption: option }));
	};

	const handleFontColorChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, fontColor: option }));
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, backgroundColor: option }));
	};

	const handleContentWidthChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, contentWidth: option }));
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	return (
		<div ref={sidebarRef}>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}
			>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}
				>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<div className={styles.formContent}>
						<Select
							title='Шрифт'
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleFontFamilyChange}
						/>

						<RadioGroup
							title='Размер шрифта'
							name='fontSize'
							selected={formState.fontSizeOption}
							options={fontSizeOptions}
							onChange={handleFontSizeChange}
						/>

						<Select
							title='Цвет шрифта'
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleFontColorChange}
						/>

						<div className={styles.separator}>
							<Separator />
						</div>

						<Select
							title='Цвет фона'
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleBackgroundColorChange}
						/>

						<Select
							title='Ширина контента'
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleContentWidthChange}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};