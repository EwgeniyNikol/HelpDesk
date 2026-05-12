const API_URL = 'http://localhost:7070';

export function getAllTickets() {
  return fetch(`${API_URL}/?method=allTickets`)
    .then(response => {
      if (!response.ok) throw new Error('Ошибка загрузки тикетов');
      return response.json();
    });
}

export function getTicketById(id) {
  return fetch(`${API_URL}/?method=ticketById&id=${id}`)
    .then(response => {
      if (!response.ok) throw new Error('Ошибка загрузки тикета');
      return response.json();
    });
}

export function createTicket(name, description) {
  return fetch(`${API_URL}/?method=createTicket`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, status: false }),
  }).then(response => {
    if (!response.ok) throw new Error('Ошибка создания тикета');
    return response.json();
  });
}

export function updateTicket(id, data) {
  return fetch(`${API_URL}/?method=updateById&id=${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(response => {
    if (!response.ok) throw new Error('Ошибка обновления тикета');
    return response.json();
  });
}

export function deleteTicket(id) {
  return fetch(`${API_URL}/?method=deleteById&id=${id}`)
    .then(response => {
      if (response.status === 204) return true;
      throw new Error('Ошибка удаления тикета');
    });
}