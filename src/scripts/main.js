'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    ev.preventDefault();

    if (ev.button === 0 || ev.button === 3) {
      resolve();
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkAndResolve() {
    if (leftClicked && rightClicked) {
      resolve();
    }
  }

  // Лівий клік
  document.addEventListener('click', (ev) => {
    leftClicked = true;
    checkAndResolve();
  });

  // Правий клік
  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClicked = true;
    checkAndResolve();
  });
});

firstPromise
  .then(() => {
    notifications('success', 'First promise was resolved');
  })
  .catch(() => {
    notifications('error', 'First promise was rejected');
  });

secondPromise.then(() => {
  notifications('success', 'Second promise was resolved');
});

thirdPromise.then(() => {
  notifications('success', 'Third promise was resolved');
});

function notifications(type, text) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  notification.textContent = text;
  document.body.appendChild(notification);
}
