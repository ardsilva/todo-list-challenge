import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { formatDate } from '@/lib/utils';
import { CheckCircle2Icon } from 'lucide-react';
import { completeEvent, removeEvent } from '@/utils/todoStorage';
import { toast } from 'sonner';

interface ToDoTableProps {
	author: string;
	events: any[];
	reload: () => void;
	filter: 'all' | 'pending' | 'completed';
}

export function ToDoTable({ author, events, reload, filter }: ToDoTableProps) {
	const filtered = events.filter((event) => {
		if (filter === 'pending') return event.endDate === null;
		if (filter === 'completed') return event.endDate !== null;
		return true;
	});

	const handleComplete = (id: number) => {
		completeEvent(author, id);
		reload();
	};

	const handleRemove = (id: number) => {
		removeEvent(author, id);
		reload();
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Evento</TableHead>
					<TableHead>Autor</TableHead>
					<TableHead>Data Início</TableHead>
					<TableHead>Data Fim</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-center">Ação</TableHead>
				</TableRow>
			</TableHeader>
			{filtered.length > 0 ? (
				<TableBody>
					{filtered.map((event) => (
						<TableRow
							key={event.id}
							className="hover:bg-secondary/50 cursor-pointer"
							onClick={() => {
								event.endDate
									? toast.warning('O evento ja está concluído')
									: handleComplete(event.id);
							}}
						>
							<TableCell
								className="font-medium max-w-[200px] truncate"
								title={event.event}
							>
								{event.event}
							</TableCell>
							<TableCell>{event.author}</TableCell>
							<TableCell>{formatDate(new Date(event.createdAt))}</TableCell>
							<TableCell>
								{event.endDate ? formatDate(new Date(event.endDate)) : ''}
							</TableCell>
							<TableCell>
								{event.endDate && (
									<CheckCircle2Icon
										color="green"
										size={20}
									/>
								)}
							</TableCell>
							<TableCell>
								<div className="flex justify-end gap-2">
									<Button
										onClick={(e) => {
											e.stopPropagation();
											handleRemove(event.id);
										}}
									>
										Remover
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			) : (
				<TableCaption className="p-2">Nenhum evento encontrado.</TableCaption>
			)}
		</Table>
	);
}

export default ToDoTable;
