import { FORMAT } from '@/utils/consts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function pad2(value: number): string {
	return value < 10 ? `0${value}` : String(value);
}

export function formatDate(date: Date | string): string {
	const d = new Date(date);
	if (Number.isNaN(d.getTime())) return '';
	// Supports only 'dd-MM-yyyy' pattern defined in FORMAT
	const dd = pad2(d.getDate());
	const mm = pad2(d.getMonth() + 1);
	const yyyy = String(d.getFullYear());
	if (FORMAT === 'dd-MM-yyyy') return `${dd}-${mm}-${yyyy}`;
	// Fallback: ISO-like
	return `${yyyy}-${mm}-${dd}`;
}
