'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { formatDate } from '@/lib/utils';

interface ToDoCalendarProps {
	value: Date;
	onChange: (date: Date) => void;
}

export function ToDoCalendar({ value, onChange }: ToDoCalendarProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<div className="flex flex-col gap-3">
			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-full sm:w-48 justify-between font-normal"
					>
						{value ? formatDate(value) : 'Selecionar data'}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-auto overflow-hidden p-0"
					align="start"
				>
					<Calendar
						mode="single"
						selected={value}
						today={new Date()}
						captionLayout="dropdown"
						onSelect={(date) => {
							if (date) {
								onChange(date);
								setOpen(false);
							}
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}

export default ToDoCalendar;
