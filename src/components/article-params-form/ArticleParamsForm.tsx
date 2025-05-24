import { useState, useRef, useEffect } from 'react';
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
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(articleState);
	const formRef = useRef<HTMLFormElement>(null);

	const handleArrowClick = () => {
		setIsOpen(!isOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setFormState((prevState) => ({ ...prevState, [key]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(formState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					ref={formRef}
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={() => {
						setFormState(defaultArticleState);
						setArticleState(defaultArticleState);
					}}>
					<Text weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(value: OptionType) =>
							handleChange('fontFamilyOption', value)
						}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value: OptionType) =>
							handleChange('fontSizeOption', value)
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(value: OptionType) => handleChange('fontColor', value)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(value: OptionType) =>
							handleChange('backgroundColor', value)
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(value: OptionType) =>
							handleChange('contentWidth', value)
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
