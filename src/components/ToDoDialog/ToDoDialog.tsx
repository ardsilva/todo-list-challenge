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
import { lazy, Suspense, useEffect, useState, type MouseEvent } from 'react';
const ToDoCalendar = lazy(() => import('@/components/ToDoCalendar/ToDoCalendar'));
import { Separator } from '../ui/separator';
const ToDoTable = lazy(() => import('../ToDoTable/ToDoTable'));
import { addEvent, getUserEvents } from '@/utils/todoStorage';

interface ToDoDialogProps {
	open: boolean;
	setShowModal: () => void;
	author: string;
}

export function ToDoDialog({ open, setShowModal, author }: ToDoDialogProps) {
	const [eventText, setEventText] = useState('');
	const [startDate, setStartDate] = useState<Date>(new Date());
	const [events, setEvents] = useState([]);
	const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

	const handleSave = (e: MouseEvent) => {
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
						<Suspense fallback={null}>
							<ToDoCalendar
								value={startDate}
								onChange={setStartDate}
							/>
						</Suspense>
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
					<Suspense fallback={null}>
						<ToDoTable
							author={author}
							events={events}
							reload={loadEvents}
							filter={filter}
						/>
					</Suspense>
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
