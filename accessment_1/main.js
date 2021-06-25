const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('input');
const todoCollection = document.querySelector('.todo-collection');

document.addEventListener('DOMContentLoaded', getTodosFromLS);

todoForm.addEventListener('submit', saveTodoToLS);

// function addTodo(e) {
// 	if (todoInput.value === '') {
// 		// shake form to indicate that the user must input something
// 		todoForm.classList.toggle('shake-horizontal');
// 		setTimeout(() => {
// 			todoForm.classList.toggle('shake-horizontal');
// 		}, 500);
// 	} else {
// 		// create elements
// 		const li = document.createElement('li');
// 		const todoTitle = document.createElement('span');
// 		const todoDate = document.createElement('span');
// 		const editableInput = document.createElement('input');
// 		const copyButton = document.createElement('button');
// 		const editButton = document.createElement('button');
// 		const saveButton = document.createElement('button');
// 		const deleteButton = document.createElement('button');

// 		li.classList.add('todo-collection__item');

// 		todoTitle.classList.add('todo-collection__item__title');
// 		todoTitle.innerText = todoInput.value;
// 		todoDate.innerText = formatDate(new Date(), 'dddd d MMM yyyy h:mmtt', 'yyyy');

// 		editableInput.classList.add('input');
// 		editableInput.classList.add('input--todo');
// 		editableInput.classList.add('hidden');
// 		editableInput.type = 'text';
// 		editableInput.value = todoInput.value;

// 		editButton.classList.add('button');
// 		editButton.classList.add('button--todo');
// 		editButton.classList.add('button--edit');
// 		editButton.innerText = 'Edit';

// 		copyButton.classList.add('button');
// 		copyButton.classList.add('button--todo');
// 		copyButton.classList.add('button--copy');
// 		copyButton.innerText = 'Copy';

// 		saveButton.classList.add('button');
// 		saveButton.classList.add('button--todo');
// 		saveButton.classList.add('button--save');
// 		saveButton.classList.add('hidden');
// 		saveButton.innerText = 'Save';

// 		deleteButton.classList.add('button');
// 		deleteButton.classList.add('button--todo');
// 		deleteButton.classList.add('button--delete');
// 		deleteButton.innerText = 'Delete';

// 		// add elements to todo list
// 		li.appendChild(todoTitle);
// 		li.appendChild(todoDate);
// 		li.appendChild(editableInput);
// 		li.appendChild(copyButton);
// 		li.appendChild(editButton);
// 		li.appendChild(saveButton);
// 		li.appendChild(deleteButton);
// 		todoCollection.appendChild(li);

// 		function toggleTodoEditForm() {
// 			todoTitle.classList.toggle('hidden');
// 			editableInput.classList.toggle('hidden');
// 			copyButton.classList.toggle('hidden');
// 			editButton.classList.toggle('hidden');
// 			saveButton.classList.toggle('hidden');
// 		}

// 		// button event listeners
// 		editButton.addEventListener('click', () => {
// 			toggleTodoEditForm();
// 			editableInput.focus();
// 		});

// 		// button event listeners
// 		copyButton.addEventListener('click', () => {
// 			// toggleTodoEditForm();
// 			// editableInput.focus();
// 		});

// 		saveButton.addEventListener('click', () => {
// 			todoTitle.innerText = editableInput.value;
// 			toggleTodoEditForm();
// 		});

// 		deleteButton.addEventListener('click', () => {
// 			setTimeout(() => {
// 				todoCollection.removeChild(li);
// 			}, 100);
// 		});
// 	}

// 	// clear input
// 	todoInput.value = '';

// 	e.preventDefault();
// }

function getTodosFromLS() {
	let todos;

	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.forEach((todo, index) => {
		// create elements
		const li = document.createElement('li');
		const editableInput = document.createElement('input');
		const todoTitle = document.createElement('span');
		const todoDate = document.createElement('span');
		const copyButton = document.createElement('button');
		const editButton = document.createElement('button');
		const saveButton = document.createElement('button');
		const deleteButton = document.createElement('button');

		li.classList.add('todo-collection__item');

		todoTitle.classList.add('todo-collection__item__title');
		todoTitle.innerText = todo.item;
		todoDate.innerText = todo.date;

		editableInput.classList.add('input');
		editableInput.classList.add('input--todo');
		editableInput.classList.add('hidden');
		editableInput.type = 'text';
		editableInput.value = todo.item;

		editButton.classList.add('button');
		editButton.classList.add('button--todo');
		editButton.classList.add('button--edit');
		editButton.innerText = 'Edit';

		copyButton.classList.add('button');
		copyButton.classList.add('button--todo');
		copyButton.classList.add('button--copy');
		copyButton.classList.add('button--copy');
		copyButton.innerText = 'Copy';

		saveButton.classList.add('button');
		saveButton.classList.add('button--todo');
		saveButton.classList.add('button--save');
		saveButton.classList.add('hidden');
		saveButton.innerText = 'Save';

		deleteButton.classList.add('button');
		deleteButton.classList.add('button--todo');
		deleteButton.classList.add('button--delete');
		deleteButton.innerText = 'Delete';

		// add elements to todo list
		li.appendChild(todoTitle);
		li.appendChild(todoDate);
		li.appendChild(editableInput);
		li.appendChild(copyButton);
		li.appendChild(editButton);
		li.appendChild(saveButton);
		li.appendChild(deleteButton);
		todoCollection.appendChild(li);

		function toggleTodoEditForm() {
			todoTitle.classList.toggle('hidden');
			editableInput.classList.toggle('hidden');
			editButton.classList.toggle('hidden');
			saveButton.classList.toggle('hidden');
		}

		// button event listeners
		editButton.addEventListener('click', () => {
			toggleTodoEditForm();
			editableInput.focus();
		});

		copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(todo.item);
      console.log(todo.item)
      copyButton.innerText = "Copied"
		});

		saveButton.addEventListener('click', () => {
      todos[index].item = editableInput.value
      localStorage.setItem('todos', JSON.stringify(todos));
			todoTitle.innerText = editableInput.value;
			toggleTodoEditForm();
		});

		deleteButton.addEventListener('click', () => {
			todos.splice(index, 1);
			localStorage.setItem('todos', JSON.stringify(todos));
      todoCollection.removeChild(li);
		});
	});
}

// === IN PROGRESS ===

function saveTodoToLS() {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push({ item: todoInput.value, date: formatDate(new Date(), 'dddd d MMM yyyy h:mmtt', 'yyyy') });
	localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodoFromLS() {
	let todos;
	todos = localStorage.getItem('todos') === null ? [] : JSON.parse(localStorage.getItem('todos'));
	// todos.
}

function updateTodoInLS() {
	let todos;
	todos = localStorage.getItem('todos') === null ? [] : JSON.parse(localStorage.getItem('todos'));
}

function search() {
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById('myInput');
	filter = input.value.toUpperCase();
	ul = document.getElementsByClassName('todo-collection');
	li = document.getElementsByClassName('todo-collection__item');
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByTagName('span')[0];
		txtValue = a.textContent || a.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = '';
		} else {
			li[i].style.display = 'none';
		}
	}
}

function formatDate(date, format, utc) {
	var MMMM = [
		'\x00',
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	var MMM = [ '\x01', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
	var dddd = [ '\x02', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
	var ddd = [ '\x03', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
	function ii(i, len) {
		var s = i + '';
		len = len || 2;
		while (s.length < len) s = '0' + s;
		return s;
	}

	var y = utc ? date.getUTCFullYear() : date.getFullYear();
	format = format.replace(/(^|[^\\])yyyy+/g, '$1' + y);
	format = format.replace(/(^|[^\\])yy/g, '$1' + y.toString().substr(2, 2));
	format = format.replace(/(^|[^\\])y/g, '$1' + y);

	var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
	format = format.replace(/(^|[^\\])MMMM+/g, '$1' + MMMM[0]);
	format = format.replace(/(^|[^\\])MMM/g, '$1' + MMM[0]);
	format = format.replace(/(^|[^\\])MM/g, '$1' + ii(M));
	format = format.replace(/(^|[^\\])M/g, '$1' + M);

	var d = utc ? date.getUTCDate() : date.getDate();
	format = format.replace(/(^|[^\\])dddd+/g, '$1' + dddd[0]);
	format = format.replace(/(^|[^\\])ddd/g, '$1' + ddd[0]);
	format = format.replace(/(^|[^\\])dd/g, '$1' + ii(d));
	format = format.replace(/(^|[^\\])d/g, '$1' + d);

	var H = utc ? date.getUTCHours() : date.getHours();
	format = format.replace(/(^|[^\\])HH+/g, '$1' + ii(H));
	format = format.replace(/(^|[^\\])H/g, '$1' + H);

	var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
	format = format.replace(/(^|[^\\])hh+/g, '$1' + ii(h));
	format = format.replace(/(^|[^\\])h/g, '$1' + h);

	var m = utc ? date.getUTCMinutes() : date.getMinutes();
	format = format.replace(/(^|[^\\])mm+/g, '$1' + ii(m));
	format = format.replace(/(^|[^\\])m/g, '$1' + m);

	var s = utc ? date.getUTCSeconds() : date.getSeconds();
	format = format.replace(/(^|[^\\])ss+/g, '$1' + ii(s));
	format = format.replace(/(^|[^\\])s/g, '$1' + s);

	var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
	format = format.replace(/(^|[^\\])fff+/g, '$1' + ii(f, 3));
	f = Math.round(f / 10);
	format = format.replace(/(^|[^\\])ff/g, '$1' + ii(f));
	f = Math.round(f / 10);
	format = format.replace(/(^|[^\\])f/g, '$1' + f);

	var T = H < 12 ? 'AM' : 'PM';
	format = format.replace(/(^|[^\\])TT+/g, '$1' + T);
	format = format.replace(/(^|[^\\])T/g, '$1' + T.charAt(0));

	var t = T.toLowerCase();
	format = format.replace(/(^|[^\\])tt+/g, '$1' + t);
	format = format.replace(/(^|[^\\])t/g, '$1' + t.charAt(0));

	var tz = -date.getTimezoneOffset();
	var K = utc || !tz ? 'Z' : tz > 0 ? '+' : '-';
	if (!utc) {
		tz = Math.abs(tz);
		var tzHrs = Math.floor(tz / 60);
		var tzMin = tz % 60;
		K += ii(tzHrs) + ':' + ii(tzMin);
	}
	format = format.replace(/(^|[^\\])K/g, '$1' + K);

	var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
	format = format.replace(new RegExp(dddd[0], 'g'), dddd[day]);
	format = format.replace(new RegExp(ddd[0], 'g'), ddd[day]);

	format = format.replace(new RegExp(MMMM[0], 'g'), MMMM[M]);
	format = format.replace(new RegExp(MMM[0], 'g'), MMM[M]);

	format = format.replace(/\\(.)/g, '$1');

	return format;
}
