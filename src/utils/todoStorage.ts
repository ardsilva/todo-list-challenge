import { toast } from 'sonner';

export function getToDoData() {
	return JSON.parse(localStorage.getItem('todoData') || '[]');
}

export function saveToDoData(data: any[]) {
	localStorage.setItem('todoData', JSON.stringify(data));
}

export function getUserEvents(author: string) {
	const data = getToDoData();
	return data.find((u: { name: string }) => u.name === author)?.ToDoList || [];
}

export function addEvent(author: string, eventText: string, date: Date) {
	const data = getToDoData();
	const userIndex = data.findIndex((d: { name: string }) => d.name === author);
	const newEvent = {
		id: Date.now(),
		event: eventText,
		author,
		createdAt: date.toISOString(),
		endDate: null,
	};

	if (userIndex >= 0) {
		data[userIndex].ToDoList.push(newEvent);
	} else {
		data.push({ name: author, ToDoList: [newEvent] });
	}
	saveToDoData(data);
}

export function completeEvent(author: string, id: number) {
	const data = getToDoData();
	const user = data.find((u: { name: string }) => u.name === author);
	if (user) {
		const target = user.ToDoList.find((e: any) => e.id === id);
		if (target) {
			const now = new Date();
			const start = new Date(target.createdAt);
			if (start > now) {
				toast.error('Você não pode concluir uma tarefa com data futura.');
				return;
			}
			target.endDate = now.toISOString();
			saveToDoData(data);
		}
	}
}

export function removeEvent(author: string, id: number) {
	const data = getToDoData();
	const user = data.find((u: { name: string }) => u.name === author);
	if (user) {
		user.ToDoList = user.ToDoList.filter((e: any) => e.id !== id);
		saveToDoData(data);
	}
}
