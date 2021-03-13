import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Setting from './Setting';
import { onClickAncor, onKeyDownAnchor } from '../../declarations/types';
import { selectSettingFormIsShown } from '../../redux/modules/boolean';

const Component: React.FC = React.memo(() => {
	const settingFormIsShown = useSelector(selectSettingFormIsShown);

	/**
	 * タブのクリックで表示を切り替える関数
	 *
	 * @param e イベントオブジェクト
	 */
	const changeTabpanel: onClickAncor = useCallback((e) => {
		e.preventDefault();
		const target = e.target as HTMLAnchorElement;
		const targetId = target.getAttribute('href') as string;
		const targetPanel = document.querySelector(targetId) as HTMLElement;
		const tabs = Array.from(document.querySelectorAll('[role=tab]'));
		const tabpanels = Array.from(
			document.querySelectorAll('[role=tabpanel]'),
		) as HTMLElement[];
		tabs.forEach((tab) => {
			tab.setAttribute('tabindex', '-1');
			tab.removeAttribute('aria-selected');
		});
		tabpanels.forEach((tabpanel) => {
			tabpanel.classList.add('isHidden');
			tabpanel.setAttribute('aria-hidden', 'true');
		});
		target.setAttribute('tabindex', '0');
		target.setAttribute('aria-selected', 'true');
		targetPanel.classList.remove('isHidden');
		targetPanel.removeAttribute('aria-hidden');
	}, []);

	/**
	 * タブをキーボード操作できるようにする関数
	 *
	 * @param eventオブジェクト
	 */
	const keyDownTablist: onKeyDownAnchor = useCallback((e) => {
		const tabs = Array.from(
			document.querySelectorAll('[role=tab]'),
		) as HTMLElement[];
		const checkedIndex = tabs.findIndex(
			(tab) => tab.getAttribute('aria-selected') === 'true',
		);
		const tabpanels = Array.from(
			document.querySelectorAll('[role=tabpanel]'),
		) as HTMLElement[];

		switch (e.keyCode) {
			case 39: // RIGHT
			case 40: // DOWN
				if (checkedIndex < tabs.length - 1) {
					e.preventDefault();
					tabs.forEach((tab) => {
						tab.setAttribute('tabindex', '-1');
						tab.removeAttribute('aria-selected');
					});
					tabpanels.forEach((tabpanel) => {
						tabpanel.style.display = 'none';
						tabpanel.setAttribute('aria-hidden', 'true');
					});
					tabs[checkedIndex + 1].setAttribute('tabindex', '0');
					tabs[checkedIndex + 1].setAttribute(
						'aria-selected',
						'true',
					);
					tabs[checkedIndex + 1].focus();
					tabpanels[checkedIndex + 1].style.display = 'block';
					tabpanels[checkedIndex + 1].removeAttribute('aria-hidden');
				}
				break;
			case 37: // LEFT
			case 38: // UP
				if (checkedIndex > 0) {
					e.preventDefault();
					tabs.forEach((tab) => {
						tab.setAttribute('tabindex', '-1');
						tab.removeAttribute('aria-selected');
					});
					tabpanels.forEach((tabpanel) => {
						tabpanel.style.display = 'none';
						tabpanel.setAttribute('aria-hidden', 'true');
					});
					tabs[checkedIndex - 1].setAttribute('tabindex', '0');
					tabs[checkedIndex - 1].setAttribute(
						'aria-selected',
						'true',
					);
					tabs[checkedIndex - 1].focus();
					tabpanels[checkedIndex - 1].style.display = 'block';
					tabpanels[checkedIndex - 1].removeAttribute('aria-hidden');
				}
				break;
			default:
				break;
		}
	}, []);
	return (
		<>
			{settingFormIsShown && (
				<Setting
					changeTabpanel={changeTabpanel}
					keyDownTablist={keyDownTablist}
				/>
			)}
		</>
	);
});

Component.displayName = 'Component';
export default Component;
