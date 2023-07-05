const tabsContainer = document.querySelector('.tabs-container');
const tabsList = document.querySelector('ul');
const tabButtons = document.querySelectorAll('a');
const tabPanels = document.querySelectorAll('.tabs__panels > div');

// set roles
tabsList.setAttribute('role', 'tabList');

// Hide the tabs content except the one you want to be visible
tabButtons.forEach((tab, index) => {
  if (index === 0) {
    // we'll do nothing, so the first tab is visible, but we'll maybe do something later
  } else {
    tabPanels[index].setAttribute('hidden', '');
  }
});

// function to display the clicked tab, and hide the others
const switchTab = newTab => {
  // Get the href attribute from the clicked lins, and make that the active panel
  const activePanelId = newTab.getAttribute('href');
  const activePanel = tabsContainer.querySelector(activePanelId);

  // go through all the panels and set them to hidden
  tabPanels.forEach(panel => {
    panel.setAttribute('hidden', true);
  });
  //except the active panel
  activePanel.removeAttribute('hidden');
};

tabsContainer.addEventListener('click', e => {
  // Check to see if a link is clicked, else do nothing
  const clickedTab = e.target.closest('a');
  if (!clickedTab) return;

  // If a link is clicked, don't refresh the page
  e.preventDefault();

  // Switch to the clicked tab
  switchTab(clickedTab);
});
