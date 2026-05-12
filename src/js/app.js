import * as api from './api.js';
import UI from './ui.js';

export default class App {
  constructor(container) {
    this.ui = new UI(container);
    this.currentTicketId = null;
    this.init();
  }

  init() {
    const addBtn = document.createElement('button');
    addBtn.classList.add('add-ticket-btn');
    addBtn.textContent = 'Добавить тикет';
    addBtn.addEventListener('click', () => this.onAddTicket());
    
    this.ui.container.before(addBtn);

    this.ui.onToggleStatus = (id) => this.toggleStatus(id);
    this.ui.onOpenTicket = (id) => this.openTicket(id);
    this.ui.onEditTicket = (id) => this.editTicket(id);
    this.ui.onDeleteTicket = (id) => this.deleteTicket(id);
    this.ui.onSave = (name, description) => this.saveTicket(name, description);
    this.ui.onConfirmDelete = (id) => this.confirmDelete(id);

    this.loadTickets();
  }

  loadTickets() {
    api.getAllTickets().then(tickets => {
      this.ui.renderTickets(tickets);
    }).catch(console.error);
  }

  onAddTicket() {
    this.currentTicketId = null;
    this.ui.showAddForm();
  }

  saveTicket(name, description) {
    if (this.currentTicketId) {
      api.updateTicket(this.currentTicketId, { name, description }).then(() => {
        this.loadTickets();
      });
    } else {
      api.createTicket(name, description).then(() => {
        this.loadTickets();
      });
    }
  }

  toggleStatus(id) {
    api.getTicketById(id).then(ticket => {
      api.updateTicket(id, { status: !ticket.status }).then(() => {
        this.loadTickets();
      });
    });
  }

  openTicket(id) {
    api.getTicketById(id).then(ticket => {
      const item = document.querySelector(`[data-id="${id}"]`);
      const descBlock = item.nextElementSibling?.classList.contains('ticket-description') ? item.nextElementSibling : null;
      if (descBlock) {
        descBlock.remove();
        return;
      }
      const desc = document.createElement('div');
      desc.classList.add('ticket-description');
      desc.textContent = ticket.description || 'Нет описания';
      item.after(desc);
    });
  }

  editTicket(id) {
    api.getTicketById(id).then(ticket => {
      this.currentTicketId = id;
      this.ui.showEditForm(ticket.name, ticket.description);
    });
  }

  deleteTicket(id) {
    this.ui.showDeleteConfirm(id);
  }

  confirmDelete(id) {
    api.deleteTicket(id).then(() => {
      this.loadTickets();
    });
  }
}