export default class UI {
  constructor(container) {
    this.container = container;
  }

  renderTickets(tickets) {
    const list = document.createElement('div');
    list.classList.add('tickets-list');

    tickets.forEach(ticket => {
      const item = document.createElement('div');
      item.classList.add('ticket-item');
      item.dataset.id = ticket.id;

      const status = document.createElement('span');
      status.classList.add('ticket-status');
      status.textContent = ticket.status ? '✓' : ' ';
      status.addEventListener('click', () => {
        this.onToggleStatus(ticket.id);
      });

      const name = document.createElement('span');
      name.classList.add('ticket-name');
      name.textContent = ticket.name;
      name.addEventListener('click', () => {
        this.onOpenTicket(ticket.id);
      });

      const date = document.createElement('span');
      date.classList.add('ticket-date');
      date.textContent = new Date(ticket.created).toLocaleString();

      const actions = document.createElement('span');
      actions.classList.add('ticket-actions');

      const editBtn = document.createElement('button');
      editBtn.textContent = '✎';
      editBtn.addEventListener('click', () => {
        this.onEditTicket(ticket.id);
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '✕';
      deleteBtn.addEventListener('click', () => {
        this.onDeleteTicket(ticket.id);
      });

      actions.append(editBtn, deleteBtn);
      item.append(status, name, date, actions);
      list.append(item);
    });

    this.container.innerHTML = '';
    this.container.append(list);
  }

  showAddForm() {
    this.showModal('Добавить тикет', '', '');
  }

  showEditForm(name, description) {
    this.showModal('Изменить тикет', name, description);
  }

  showModal(title, name, description) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
      <div class="modal-content">
        <h3>${title}</h3>
        <label>Краткое описание</label>
        <input type="text" class="modal-name" value="${name}">
        <label>Подробное описание</label>
        <textarea class="modal-description">${description}</textarea>
        <div class="modal-buttons">
          <button class="modal-save">Сохранить</button>
          <button class="modal-cancel">Отмена</button>
        </div>
      </div>
    `;

    modal.querySelector('.modal-cancel').addEventListener('click', () => {
      modal.remove();
    });

    modal.querySelector('.modal-save').addEventListener('click', () => {
      const newName = modal.querySelector('.modal-name').value;
      const newDesc = modal.querySelector('.modal-description').value;
      this.onSave(newName, newDesc);
      modal.remove();
    });

    document.body.append(modal);
  }

  showDeleteConfirm(id) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
      <div class="modal-content">
        <h3>Удалить тикет</h3>
        <p>Вы уверены, что хотите удалить этот тикет?</p>
        <div class="modal-buttons">
          <button class="modal-save">ОК</button>
          <button class="modal-cancel">Отмена</button>
        </div>
      </div>
    `;

    modal.querySelector('.modal-cancel').addEventListener('click', () => {
      modal.remove();
    });

    modal.querySelector('.modal-save').addEventListener('click', () => {
      this.onConfirmDelete(id);
      modal.remove();
    });

    document.body.append(modal);
  }
}