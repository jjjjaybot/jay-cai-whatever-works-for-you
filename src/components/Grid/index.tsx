import React, { useState, useEffect } from 'react';
import './Grid.css';

interface Cell {
	row: number;
	col: number;
}

const Grid: React.FC<{}> = () => {
	const [width, setWidth] = useState<number>(10);
	const [height, setHeight] = useState<number>(10);
	const [grid, setGrid] = useState<Cell[][]>([]);
	const [start, setStart] = useState<Cell | null>(null);
	const [end, setEnd] = useState<Cell | null>(null);
	const [blockedCells, setBlockedCells] = useState<Cell[]>([]);
	const [path, setPath] = useState<Cell[]>([]);

	const generateGrid = (height: number, width: number) => {
		const newGrid: Cell[][] = [];
		for (let row = 0; row < height; row++) {
			const currentRow: Cell[] = [];
			for (let col = 0; col < width; col++) {
				currentRow.push({ row, col });
			}
			newGrid.push(currentRow);
		}
		setGrid(newGrid);
		setStart(null);
		setEnd(null);
		setBlockedCells([]);
		setPath([]);
	};

	const handleClick = (row: number, col: number) => {
		if (!start) {
			setStart({ row, col });
		} else if (!end) {
			setEnd({ row, col });
		} else {
			const cell = { row, col };
			const index = blockedCells.findIndex(
				(blockedCell) => blockedCell.row === row && blockedCell.col === col
			);
			if (index === -1) {
				setBlockedCells([...blockedCells, cell]);
			} else {
				const newBlockedCells = [...blockedCells];
				newBlockedCells.splice(index, 1);
				setBlockedCells(newBlockedCells);
			}
		}
	};

	const findPath = () => {
		if (!start || !end) {
			alert('Please select start and end points');
			return;
		}

		const queue: Cell[] = [start];
		const visited: Cell[] = [];
		const predecessor: { [key: string]: Cell | null } = {};
		predecessor[`${start.row},${start.col}`] = null;
		while (queue.length > 0) {
			const currentCell = queue.shift()!;
			visited.push(currentCell);
			if (currentCell.row === end.row && currentCell.col === end.col) {
				let current = currentCell;
				let tempPath = [];
				while (current != null) {
					tempPath.push(current);
					current = predecessor[`${current.row},${current.col}`]!;
				}
				setPath(tempPath);
				return;
			}

			const neighbors = getNeighbors(currentCell);
			for (const neighbor of neighbors) {
				if (
					!visited.some(
						(visitedCell) =>
							visitedCell.row === neighbor.row &&
							visitedCell.col === neighbor.col
					) &&
					!blockedCells.some(
						(blockedCell) =>
							blockedCell.row === neighbor.row &&
							blockedCell.col === neighbor.col
					)
				) {
					queue.push(neighbor);
					predecessor[`${neighbor.row},${neighbor.col}`] = currentCell;
				}
			}
		}

		alert('No path found');
	};

	//helper function for Find Path
	const getNeighbors = (cell: Cell): Cell[] => {
		const neighbors: Cell[] = [];
		const { row, col } = cell;

		if (row > 0) {
			neighbors.push(grid[row - 1][col]);
		}

		if (row < height - 1) {
			neighbors.push(grid[row + 1][col]);
		}

		if (col > 0) {
			neighbors.push(grid[row][col - 1]);
		}

		if (col < width - 1) {
			neighbors.push(grid[row][col + 1]);
		}

		return neighbors;
	};

	useEffect(() => {
		generateGrid(height, width);
	}, [height, width]);

	return (
		<>
			<div className="controls">
				<label>
					Height:
					<input
						type="number"
						value={height}
						onChange={(e) => setHeight(e.target.valueAsNumber)}
					/>
				</label>
				<label>
					Width:
					<input
						type="number"
						value={width}
						onChange={(e) => setWidth(e.target.valueAsNumber)}
					/>
				</label>
				<button onClick={(e) => generateGrid(height, width)}>
					Generate Grid
				</button>
				<button onClick={findPath}>Find Path</button>
			</div>
			<div className="grid">
				{grid.map((row, rowIndex) => (
					<div className="row" key={rowIndex}>
						{row.map((_cell, colIndex) => (
							<div
								key={colIndex}
								className={`cell ${
									start?.row === rowIndex && start?.col === colIndex
										? 'start'
										: ''
								} ${
									end?.row === rowIndex && end?.col === colIndex ? 'end' : ''
								} ${
									blockedCells.some(
										(blockedCell) =>
											blockedCell?.row === rowIndex &&
											blockedCell?.col === colIndex
									)
										? 'blocked'
										: ''
								} ${
									path.some(
										(pathCell) =>
											pathCell?.row === rowIndex && pathCell?.col === colIndex
									)
										? 'path'
										: ''
								}`}
								onClick={() => handleClick(rowIndex, colIndex)}
							/>
						))}
					</div>
				))}
			</div>
		</>
	);
};

export default Grid;
