'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkAndResolve() {
    if (leftClicked || rightClicked) {
      resolve('Second promise was resolved');
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

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkAndResolve() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
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
  .then((message) => {
    notifications('success', message);
  })
  .catch((message) => {
    notifications('error', message);
  });

secondPromise.then((message) => {
  notifications('success', message);
});

thirdPromise.then((message) => {
  notifications('success', message);
});

function notifications(type, text) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  notification.textContent = text;
  document.body.appendChild(notification);
}
