import React, { useState } from "react";
import App from '../App.js';
import ReactDom from 'react-dom';
import { render, screen, waitFor} from '@testing-library/react';
import AddExperienceModal from "./addTaskModal";
import userEvent from '@testing-library/user-event';

describe('AddTaskModal', () => {
    it('does not render the modal when isOpen is false', () => {
      render(<AddExperienceModal isOpen={false} setShowModal={() => {}} />);
      expect(screen.queryByText('Add Task')).not.toBeInTheDocument();
    })

    it('renders the modal when isOpen is true', () => {
        render(<AddExperienceModal isOpen={true} setShowModal={() => {}} />);
        const allTasks = screen.getAllByText('Add Task');
        expect(allTasks[0]).toBeInTheDocument();
    });

    it('allows input fields to be updated', async () => {
        const user = userEvent.setup();
        render(<AddExperienceModal isOpen={true} setShowModal={() => {}} />);
        await user.type(screen.getByPlaceholderText('Type task name'), 'New Task');
        expect(screen.getByPlaceholderText('Type task name')).toHaveValue('New Task');
    });

    it('submits the form with task details', async () => {
        const user = userEvent.setup();
        const mockSubmit = jest.fn();
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ message: "Task added" }),
          })
        );
    
        render(<AddExperienceModal isOpen={true} setShowModal={mockSubmit} />);
        await user.type(screen.getByPlaceholderText('Type task name'), 'New Task');
        
        await user.click(screen.getByRole('button', { name: 'Add Task' }));
    
        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        // Clean up fetch mock to avoid leaks
        global.fetch.mockClear();
        delete global.fetch;
    });

    it('updates task name on input change', async () => {
        const user = userEvent.setup();
        render(<AddExperienceModal isOpen={true} setShowModal={() => {}} />);
        await user.type(screen.getByPlaceholderText('Type task name'), 'New Task');
        expect(screen.getByPlaceholderText('Type task name')).toHaveValue('New Task');
    });

    it('processes task tags correctly- 3 tags', async () => {
        // Setup user event
        const user = userEvent.setup();
    
        // Mock global fetch
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Task successfully added' }),
            })
        );
    
        // Render the component
        render(<AddExperienceModal isOpen={true} setShowModal={() => {}} />);
    
        // Type in the task name and tags
        await user.type(screen.getByPlaceholderText('Type task name'), 'New Task');
        await user.type(screen.getByPlaceholderText('Task Tags (comma-separated)'), 'tag1, tag2,tag3');
    
        await user.click(screen.getByRole('button', { name: 'Add Task' }));
    
        // Wait for the fetch to be called
        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    
        const fetchCall = global.fetch.mock.calls[0];
        const body = JSON.parse(fetchCall[1].body);

        expect(body.task_tags).toEqual(['tag1', 'tag2', 'tag3']);

        global.fetch.mockClear();
        delete global.fetch;
    });

    it('displays success confirmation on successful form submission', async () => {
        // Mock global fetch
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true, 
            json: () => Promise.resolve({ message: "Task successfully added" })
        }));
    
        // Mock setShowModal
        const setShowModalMock = jest.fn();
    
        // Setup user event
        const user = userEvent.setup();
    
        // Render the component with setShowModal mock
        render(<AddExperienceModal isOpen={true} setShowModal={setShowModalMock} />);
    
        // Simulate filling the form
        await user.type(screen.getByPlaceholderText('Type task name'), 'New Task');
        await user.type(screen.getByPlaceholderText('Type userid'), 'user123');
        await user.type(screen.getByPlaceholderText('Task Tags (comma-separated)'), 'tag1, tag2');
        await user.type(screen.getByPlaceholderText('Describe the task'), ' a newThis is task description.');
    
        await user.click(screen.getByRole('button', { name: 'Add Task' }));
    
        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    
        expect(setShowModalMock).toHaveBeenCalledTimes(1);
        expect(setShowModalMock).toHaveBeenCalledWith(true); 

        global.fetch.mockClear();
        delete global.fetch;
    });
 
    
    it('toggles modal visibility based on isOpen prop and close button', async () => {
        const setShowModalMock = jest.fn();
        const { rerender } = render(<AddExperienceModal isOpen={false} setShowModal={setShowModalMock} />);
        expect(screen.queryByText('Add Task')).not.toBeInTheDocument();
      
        rerender(<AddExperienceModal isOpen={true} setShowModal={setShowModalMock} />);
        expect(screen.queryByText('Today')).not.toBeInTheDocument();
      
        const user = userEvent.setup();
        await user.click(screen.getByText('×'));
        expect(setShowModalMock).toHaveBeenCalledWith(false);
    });


    it('validates input fields before submission', async () => {
        const user = userEvent.setup();
        render(<AddExperienceModal isOpen={true} setShowModal={() => {}} />);
      
        await user.click(screen.getByRole('button', { name: 'Add Task' })); 

        // Check for validation messages
        expect(screen.queryByText('Fill out this field')).not.toBeInTheDocument();
    });

    it('resets form fields after unsuccessful submission', async () => {
        // Mocking fetch to simulate a failed submission
        global.fetch = jest.fn(() => Promise.resolve({
            ok: false,
            status: 400, // Simulating a bad request
            text: () => Promise.resolve("Validation error: Invalid input"), 
        }));
    
        const setShowModalMock = jest.fn();
        render(<AddExperienceModal isOpen={true} setShowModal={setShowModalMock} />);
        const taskNameInput = screen.getByPlaceholderText('Type task name');
        const userIdInput = screen.getByPlaceholderText('Type userid');
        await userEvent.type(taskNameInput, 'New Task');
        await userEvent.type(userIdInput, 'user123');
        userEvent.click(screen.getByRole('button', { name: 'Add Task' }));
    
        await waitFor(() => {
            // Ensure form fields are reset after unsuccessful submission
            expect(screen.getByPlaceholderText('Type task name')).toHaveValue('');
            expect(screen.getByPlaceholderText('Type userid')).toHaveValue('');
            expect(screen.getByPlaceholderText('Task Tags (comma-separated)')).toHaveValue('');
            expect(screen.getByPlaceholderText('Describe the task')).toHaveValue('');
        });

        global.fetch.mockClear();
        delete global.fetch;
    });
    
    





    afterEach(() => {
        jest.resetAllMocks();
    });
});
  