// This unit test file was written using jest 

import { mount } from '@vue/test-utils';
import TodoComponent from '@/components/TodoComponent.vue';
import todoSvc from '@/services/TodoSvc.js';
import messages from '@/messages/messages-en-En.js';

// Mock the todoSvc and messages
jest.mock('@/services/TodoSvc.js');
jest.mock('@/messages/messages-en-En.js', () => ({
  DATA_SAVE_MSG: 'Todo added successfully',
  ERROR_SAVE_MSG: 'Error saving todo',
  MANDATORY_MSG: 'Please add value for title',
  ERROR_DELETE_MSG: 'Error deleting todo',
  DELETE_CONFIRM_MSG: 'Are you sure you want to delete this todo?',
  ERROR_FETCH_MSG: 'Error fetching todos'
}));

describe('TodoComponent.vue', () => {
  let wrapper;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    wrapper = mount(TodoComponent, {
      global: {
        stubs: {
          TableComponent: true // Stub out TableComponent
        }
      }
    });
  });

  it('loads todos on mount', async () => {
    // Mock the getAllTodos response
    todoSvc.getAllTodos.mockResolvedValue([{ priority: 1, title: 'Test Todo' }]);

    await wrapper.vm.getAllTodos();
    expect(todoSvc.getAllTodos).toHaveBeenCalled();
    expect(wrapper.vm.todos).toEqual([{ priority: 1, title: 'Test Todo' }]);
  });

  it('shows success message when adding a todo', async () => {
    todoSvc.saveTodo.mockResolvedValue({});
    await wrapper.vm.addTodo(1, 'New Todo');

    expect(todoSvc.saveTodo).toHaveBeenCalledWith({ priority: 1, title: 'New Todo' });
    expect(wrapper.vm.msg).toBe(messages.DATA_SAVE_MSG);
    expect(wrapper.vm.cls).toBe('showSuccessMsgCls');
  });

  it('displays an error message if required fields are missing when adding a todo', async () => {
    await wrapper.vm.addTodo(1, undefined);

    expect(todoSvc.saveTodo).not.toHaveBeenCalled();
    expect(wrapper.vm.msg).toBe(messages.MANDATORY_MSG);
    expect(wrapper.vm.cls).toBe('showMsgCls');
  });

  it('removes a todo item after confirmation', async () => {
    todoSvc.deleteTodo.mockResolvedValue({});
    global.confirm = jest.fn(() => true); // Mock confirmation dialog to always return true

    await wrapper.vm.removeTodo(1);
    expect(global.confirm).toHaveBeenCalledWith(messages.DELETE_CONFIRM_MSG);
    expect(todoSvc.deleteTodo).toHaveBeenCalledWith(1);
  });

  it('shows an error message if deletion fails', async () => {
    todoSvc.deleteTodo.mockRejectedValue(new Error('Delete failed'));

    global.confirm = jest.fn(() => true);
    await wrapper.vm.removeTodo(1);

    expect(todoSvc.deleteTodo).toHaveBeenCalledWith(1);
    expect(wrapper.vm.msg).toBe(messages.ERROR_DELETE_MSG);
    expect(wrapper.vm.cls).toBe('showMsgCls');
  });

  it('clears the message when removeMsg is called', async () => {
    wrapper.vm.msg = 'Some message';
    wrapper.vm.cls = 'showMsgCls';

    await wrapper.vm.removeMsg();

    expect(wrapper.vm.msg).toBe('');
    expect(wrapper.vm.cls).toBe('hideMsg');
  });
});
