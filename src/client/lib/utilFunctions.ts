import axios from 'axios';
import XLSX from 'xlsx/xlsx.mini';
import { admin } from '../config/admin';
import { UpdatePayload as CovidUpdatePayload } from '../redux/modules/covids';
import { Event as EventType } from '../redux/modules/event';
import {
	CreatePayload as EventCreatePayload,
	UpdatePayload as EventUpdatePayload,
} from '../redux/modules/events';
import { User as UserType } from '../redux/modules/user';
import {
	CreatePayload as UserCreatePayload,
	UpdatePayload as UserUpdatePayload,
	DeletePayload as UserDeletePayload,
	RplePayload,
} from '../redux/modules/users';
import { UpdatePayload as PartsUpdatePayload } from '../redux/modules/parts';

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';

export const postEvent = (data: EventCreatePayload): Promise<void> => {
	return axios.post('/api/events', data);
};

export const putEvent = (data: EventUpdatePayload): Promise<void> => {
	return axios.put('/api/events', data);
};

export const deleteEvent = (id: number): Promise<void> => {
	return axios.delete(`/api/events/${id}`);
};

export const putCovid = (data: CovidUpdatePayload): Promise<void> => {
	return axios.put('/api/covids', data);
};

export const postUser = (data: UserCreatePayload): Promise<void> => {
	return axios.post('/api/users', data);
};

export const putUser = (data: UserUpdatePayload): Promise<void> => {
	return axios.put('/api/users', data);
};

export const putRoles = (data: RplePayload): Promise<void> => {
	return axios.put('/api/roles', data);
};

export const deleteUser = (data: UserDeletePayload): Promise<void> => {
	return axios.delete(
		`/api/users?eventId=${data.eventId}&userId=${data.userId}`,
	);
};

export const putParts = (data: PartsUpdatePayload): Promise<void> => {
	return axios.put('/api/parts', data);
};

type GenerateId = (name: string, index: number) => string;
type GetDayOfWeek = (day: string) => string;
type CalculateId = (state: EventType[] | UserType[]) => number;
type ToggleAriaHidden = (boolean: boolean) => void;
type ExportToExcel = (id: string, title: string) => void;

/**
 * idを生成する関数
 *
 * @param  name
 * @param  index
 * @returns id
 */
export const generateId: GenerateId = (name, index) => {
	return name + '-' + index;
};

/**
 * 日付から曜日を算出し日付を返す関数
 *
 * @param day
 * @returns yyyy-mm-dd(x)
 */
export const getDayOfWeek: GetDayOfWeek = (day) => {
	const dayOfWeek = ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)'];
	const date = new Date(day);
	const wday = date.getDay();
	return dayOfWeek[wday];
};

/**
 * state内のidを計算する関数
 *
 * @param state
 * @returns id
 */
export const calculateId: CalculateId = (state) => {
	let id = 1;
	let max = 1;
	if (state.length > 0) {
		state.forEach((item: EventType | UserType) => {
			if (item.id && max < item.id) {
				max = item.id as number;
			}
		});
		id = max + 1;
	}
	return id;
};

/**
 * aria-hidden属性をtoggleする関数
 * @param boolean
 */
export const toggleAriaHidden: ToggleAriaHidden = (boolean) => {
	document
		.getElementById('header')
		?.setAttribute('aria-hidden', boolean.toString());
	document.getElementById('setting') &&
		document
			.getElementById('setting')
			?.setAttribute('aria-hidden', boolean.toString());
	document
		.getElementById('event')
		?.setAttribute('aria-hidden', boolean.toString());
	document
		.getElementById('event_list')
		?.setAttribute('aria-hidden', boolean.toString());
	document
		.getElementById('event_header')
		?.setAttribute('aria-hidden', boolean.toString());
	document
		.getElementById('attendance')
		?.setAttribute('aria-hidden', boolean.toString());
	document
		.getElementById('covid_inquiry')
		?.setAttribute('aria-hidden', boolean.toString());
	document
		.getElementById('attendance_table')
		?.setAttribute('aria-hidden', boolean.toString());
	document
		.getElementById('covid_table')
		?.setAttribute('aria-hidden', boolean.toString());
	document
		.getElementById('footer')
		?.setAttribute('aria-hidden', boolean.toString());
};

/**
 * scrollの許可を制御する関数
 * @param boolean
 */
export const toggleScrollLock = (boolean: boolean): void => {
	const body = document.querySelector('body');
	body?.removeAttribute('style');
	boolean.toString() === 'true' &&
		body?.setAttribute('style', 'overflow:hidden;');
};

/**
 * tableをexcelに書き出す関数
 */
export const exportToExcel: ExportToExcel = (id, title) => {
	if (window.confirm('エクセルをダウンロードしますか？')) {
		const targetTable = document.querySelector(id);
		const workbook = XLSX.utils.table_to_book(targetTable);
		XLSX.writeFile(workbook, `${title}.xlsx`);
	}
};

/**
 * adminかどうかを判定する関数
 */
export const isAdmin = (currentUser: string): boolean => {
	return admin.some((mem) => mem.includes(currentUser));
};
