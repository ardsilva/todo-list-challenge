import { render, screen, fireEvent } from '@testing-library/react';
import { ToDoTable } from '@/components/ToDoTable';

const mockEvents = [
	{
		id: 1,
		event: 'Tarefa 1',
		author: 'Alexandre',
		createdAt: new Date().toISOString(),
		endDate: null,
	},
	{
		id: 2,
		event: 'Tarefa 2',
		author: 'Alexandre',
		createdAt: new Date().toISOString(),
		endDate: new Date().toISOString(),
	},
];
import { vi } from 'vitest';
describe('ToDoTable', () => {
	it('displays tasks and allows removing', () => {
		const reload = vi.fn();
		render(
			<ToDoTable
				author="Alexandre"
				events={mockEvents}
				reload={reload}
				filter="all"
			/>
		);
		expect(screen.getByText('Tarefa 1')).toBeInTheDocument();

		const removeButton = screen.getAllByText(/remover/i)[0];
		fireEvent.click(removeButton);
	});
});
