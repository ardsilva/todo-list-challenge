import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { describe, it, expect } from 'vitest';

describe('App component', () => {
	it('should render input and open ToDoDialog on button click', () => {
		render(<App />);
		const input = screen.getByPlaceholderText(
			/Put you name here to start .../i
		);
		fireEvent.change(input, { target: { value: 'Alexandre' } });
		const button = screen.getByText(/Visualizar Tarefas/i);
		expect(button).not.toBeDisabled();
		fireEvent.click(button);
		expect(screen.getByText(/adicionar evento/i)).toBeInTheDocument();
	});
});
