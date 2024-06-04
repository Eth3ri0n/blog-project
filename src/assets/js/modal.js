const body = document.querySelector('body');

let Calc;
let Modal;
let Confirm;
let Cancel;

// Create calc.
function Create_Calc() {
  Calc = document.createElement('div');
  Calc.classList.add('calc');
}

// Create modal.
function Create_Modal(question) {
  Modal = document.createElement('div');
  Modal.classList.add('modal');
  Modal.innerHTML = `<h5>${question}</h5>`;

  // Create buttons.
  Cancel = document.createElement('button');
  Cancel.textContent = 'Cancel';
  Cancel.classList.add('btn', 'btn-danger');
  Confirm = document.createElement('button');
  Confirm.textContent = 'Confirm';
  Confirm.classList.add('btn', 'btn-primary');

  Modal.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  // Append buttons.
  Modal.append(Cancel, Confirm);
}

export function Confirm_Open_Modal(question) {
  Create_Calc();
  Create_Modal(question);

  Calc.append(Modal);
  body.append(Calc);

  return new Promise((resolve, reject) => {
    // Resolve false if calc is clicked.
    Calc.addEventListener('click', (event) => {
      if (event.target.classList.contains('calc')) {
        Calc.remove();
        resolve(false);
      }
    });

    // Resolve false if cancel button is clicked.
    Cancel.addEventListener('click', () => {
      Calc.remove();
      resolve(false);
    });

    // Resolve true if confirm button is clicked.
    Confirm.addEventListener('click', () => {
      Calc.remove();
      resolve(true);
    });
  });
}
