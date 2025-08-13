import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModeToggle } from '@/components/mode-toogle';
import { lazy, Suspense, useCallback, useState } from 'react';
const ToDoDialog = lazy(() => import('./components/ToDoDialog/ToDoDialog'));
const Toaster = lazy(() => import('@/components/ui/sonner').then((m) => ({ default: m.Toaster })));

function App() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');
	const setShowModal = () => {
		setOpen((prev) => !prev);
	};

	const prefetchDialog = useCallback(() => {
		void import('./components/ToDoDialog/ToDoDialog');
	}, []);
	return (
		<div>
			<Card className="max-w-7xl p-6 m-auto">
				<ModeToggle />
				<Label className="text-2xl font-bold mb-4 self-center">
					To-Do List
				</Label>
				<Separator className="mb-4" />
				<div className="flex flex-col md:flex-row gap-4">
					<Input
						placeholder="Put you name here to start ..."
						className="mb-4"
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
					<Button
						variant="outline"
						onClick={setShowModal}
						onMouseEnter={prefetchDialog}
						className="mb-4"
						disabled={name.trim() === ''}
					>
						Visualizar Tarefas
					</Button>
				</div>
			</Card>
			<Suspense fallback={null}>
				{open && (
					<Toaster
						position="top-right"
						duration={3000}
						richColors
					/>
				)}
				{open && (
					<ToDoDialog
						open={open}
						setShowModal={setShowModal}
						author={name}
					/>
				)}
			</Suspense>
		</div>
	);
}

export default App;
