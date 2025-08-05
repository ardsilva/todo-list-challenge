import { render, screen, fireEvent } from '@testing-library/react';
import { ToDoDialog } from '@/components/ToDoDialog';
import { vi } from 'vitest';

describe('ToDoDialog component', () => {
	it('renders and allows adding event', () => {
		const setShowModal = vi.fn();
		render(
			<ToDoDialog
				open={true}
				setShowModal={setShowModal}
				author="Alexandre"
			/>
		);

		const input = screen.getByPlaceholderText(/digite o evento/i);
		fireEvent.change(input, { target: { value: 'Nova tarefa' } });

		const addButton = screen.getAllByText(/Adicionar/i);
		fireEvent.click(addButton[0]);

		expect(screen.getByText(/Fechar/)).toBeInTheDocument();
	});
});
