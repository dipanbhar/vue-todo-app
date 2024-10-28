import { mount } from '@vue/test-utils';
import TodoApp from '@/components/TodoApp.vue'; // Adjust the path according to your project structure
import todoSvc from '@/services/TodoSvc';

jest.mock('@/services/TodoSvc'); // Mock the service to avoid actual API calls

describe('TodoApp.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TodoApp);
    todoSvc.getAllTodos.mockResolvedValue([
      { id: 1, title: 'Test Todo', priority: '1' },
      { id: 2, title: 'Another Todo', priority: '2' },
    ]);
  });

  it('displays all todos from service on load', async () => {
    await wrapper.vm.getAllTodos(); // Trigger API call
    expect(wrapper.vm.todos).toHaveLength(2); // Expect 2 todos from mocked service
    expect(wrapper.html()).toContain('Test Todo');
  });

  it('adds a new todo when title is provided', async () => {
    wrapper.setData({ title: 'New Task', priority: '2' });
    todoSvc.saveTodo.mockResolvedValue({}); // Mock successful save response

    await wrapper.vm.addTodo();
    expect(todoSvc.saveTodo).toHaveBeenCalledWith({
      priority: '2',
      title: 'New Task',
    });
    expect(todoSvc.getAllTodos).toHaveBeenCalled(); // Ensure todos refresh after add
  });

  it('shows error message if title is empty when adding', async () => {
    wrapper.setData({ title: '', priority: '1' });

    await wrapper.vm.addTodo();
    expect(wrapper.vm.cls).toBe('msg');
    expect(wrapper.vm.msg).toBe('Please add value for title');
  });

  it('clears the message when removeMsg is called', () => {
    wrapper.setData({ cls: 'msg', msg: 'Some error message' });
    wrapper.vm.removeMsg();
    expect(wrapper.vm.cls).toBe('nomsg');
  });

  it('removes a todo when removeTodo is confirmed', async () => {
    window.confirm = jest.fn(() => true); // Mock user confirmation
    todoSvc.deleteTodo.mockResolvedValue({}); // Mock successful deletion

    await wrapper.vm.removeTodo(1); // Attempt to remove first todo
    expect(todoSvc.deleteTodo).toHaveBeenCalledWith(1);
    expect(todoSvc.getAllTodos).toHaveBeenCalled(); // Ensure todos refresh after delete
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
