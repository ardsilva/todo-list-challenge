import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ToDoCalendar } from '@/components/ToDoCalendar';
import { Separator } from '../ui/separator';
import { ToDoTable } from '../ToDoTable';
import { useState, useEffect } from 'react';
import { addEvent, getUserEvents } from '@/utils/todoStorage';

interface ToDoDialogProps {
	open: boolean;
	setShowModal: () => void;
	author: string;
}

export function ToDoDialog({ open, setShowModal, author }: ToDoDialogProps) {
	console.log('ToDoDialog rendered with author:', author);
	const [eventText, setEventText] = useState('');
	const [startDate, setStartDate] = useState<Date>(new Date());
	const [events, setEvents] = useState([]);
	const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

	const handleSave = (e: React.MouseEvent) => {
		e.preventDefault();
		if (!eventText.trim()) return toast.error('Digite um nome para o evento');
		addEvent(author, eventText, startDate);
		setEventText('');
		setStartDate(new Date());
		toast.success('Evento criado!');
		loadEvents();
	};

	const loadEvents = () => {
		const data = getUserEvents(author);
		setEvents(data);
	};

	useEffect(() => {
		loadEvents();
	}, [author]);

	return (
		<Dialog open={open}>
			<form>
				<DialogContent
					className="sm:max-w-2xl"
					showCloseButton={false}
				>
					<DialogHeader>
						<DialogTitle>Adicionar Evento</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col sm:flex-row gap-4 justify-between mb-0">
						<Input
							placeholder="Digite o evento"
							value={eventText}
							onChange={(e) => setEventText(e.target.value)}
							maxLength={100}
						/>
						<ToDoCalendar
							value={startDate}
							onChange={setStartDate}
						/>
						<Button onClick={handleSave}>Adicionar</Button>
					</div>
					<Separator />
					<div className="flex gap-2 my-4">
						<Button
							variant={filter === 'all' ? 'default' : 'outline'}
							onClick={() => setFilter('all')}
						>
							Todos
						</Button>
						<Button
							variant={filter === 'pending' ? 'default' : 'outline'}
							onClick={() => setFilter('pending')}
						>
							Pendentes
						</Button>
						<Button
							variant={filter === 'completed' ? 'default' : 'outline'}
							onClick={() => setFilter('completed')}
						>
							Concluídos
						</Button>
					</div>
					<ToDoTable
						author={author}
						events={events}
						reload={loadEvents}
						filter={filter}
					/>
					<Separator />
					<DialogFooter>
						<Button
							variant="outline"
							onClick={setShowModal}
							className="w-full justify-center"
						>
							Fechar
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
export default ToDoDialog;
