#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'todos.json');

function loadTodos() {
  if (!fs.existsSync(dataFile)) return [];
  const content = fs.readFileSync(dataFile, 'utf8');
  try { return JSON.parse(content); } catch { return []; }
}

function saveTodos(todos) {
  fs.writeFileSync(dataFile, JSON.stringify(todos, null, 2));
}

function add(todoText) {
  let todos = loadTodos();
  const id = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  const todo = { id, text: todoText, done: false };
  todos.push(todo);
  saveTodos(todos);
  console.log(`Added todo #${id}: "${todoText}"`);
}

function list() {
  const todos = loadTodos();
  if (todos.length === 0) {
    console.log('No todos.');
  } else {
    console.log('Todos:');
    todos.forEach(t => {
      console.log(`${t.id}. [${t.done ? 'x' : ' '}] ${t.text}`);
    });
    const total = todos.length;
    const doneCount = todos.filter(t => t.done).length;
    console.log(`\nTotal: ${total}, Done: ${doneCount}`);
  }
}

function done(id) {
  const todos = loadTodos();
  const idx = todos.findIndex(t => t.id == id);
  if (idx === -1) { console.log(`Todo #${id} not found.`); return; }
  todos[idx].done = true;
  saveTodos(todos);
  console.log(`Marked todo #${id} as done.`);
}

function deleteTodo(id) {
  let todos = loadTodos();
  const before = todos.length;
  todos = todos.filter(t => t.id != id);
  const after = todos.length;
  if (before === after) {
    console.log(`Todo #${id} not found.`);
    return;
  }
  saveTodos(todos);
  console.log(`Deleted todo #${id}.`);
}

function clear() {
  if (fs.existsSync(dataFile)) {
    fs.unlinkSync(dataFile);
    console.log('All todos cleared.');
  } else {
    console.log('No todos to clear.');
  }
}

function help() {
  console.log(`Usage: node index.js <command> [args]
Commands:
  add <todo>          Add a new todo
  list                List all todos
  done <id>           Mark todo as done
  delete <id>         Delete a todo
  clear               Delete all todos
  help                Show this help message`);
}

const [,, command, ...args] = process.argv;
switch (command) {
  case 'add':
    const text = args.join(' ');
    if (!text) { console.log('Usage: node index.js add <todo>'); break; }
    add(text);
    break;
  case 'list':
    list();
    break;
  case 'done':
    if (!args[0]) { console.log('Usage: node index.js done <id>'); break; }
    done(parseInt(args[0]));
    break;
  case 'delete':
    if (!args[0]) { console.log('Usage: node index.js delete <id>'); break; }
    deleteTodo(parseInt(args[0]));
    break;
  case 'clear':
    clear();
    break;
  case 'help':
  case undefined:
    help();
    break;
  default:
    console.log('Unknown command. Use help to see available commands.');
}
