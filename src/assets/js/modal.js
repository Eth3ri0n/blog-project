const body = document.querySelector('body');

let Calc;
let Modal;

// Create calc.
function Create_Calc() {
  Calc = document.createElement('div');
  Calc.classList.add('calc');
  Calc.addEventListener('click', (event) => {
    if (event.target.classList.contains('calc')) {
      Calc.remove();
    }
  });
}

// Create modal.
function Create_Modal(question) {
  Modal = document.createElement('div');
  Modal.classList.add('modal');
  Modal.innerHTML = `<h5>${question}</h5>`;

  // Create buttons.
  const CANCEL = document.createElement('button');
  CANCEL.textContent = 'Cancel';
  CANCEL.classList.add('btn', 'btn-danger');
  const CONFIRM = document.createElement('button');
  CONFIRM.textContent = 'Confirm';
  CONFIRM.classList.add('btn', 'btn-primary');

  // Append buttons.
  Modal.append(CANCEL, CONFIRM);
}

export function Confirm_Open_Modal(question) {
  Create_Calc();
  Create_Modal(question);

  Calc.append(Modal);
  body.append(Calc);
}
