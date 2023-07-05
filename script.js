const tabsContainer = document.querySelector('.tabs-container');
const tabsList = document.querySelector('ul');
const tabButtons = document.querySelectorAll('a');
const tabPanels = document.querySelectorAll('.tabs__panels > div');

// set roles
tabsList.setAttribute('role', 'tabList');
// Change the role for the `li` to presentation
tabsList.querySelectorAll('li').forEach(listItem => {
  listItem.setAttribute('role', 'presentation');
});
// Set the role of tab panel
tabPanels.forEach(panel => {
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('tabindex', '0');
});

// Hide the tabs content except the one you want to be visible
tabButtons.forEach((tab, index) => {
  // Set the role of tab on the .tabButtons
  tab.setAttribute('role', 'tab');
  if (index === 0) {
    tab.setAttribute('aria-selected', 'true');
  } else {
    // Change the tab-index to -1, so we can't use the tab to moving through the different tabs, but we have to use the arrow buttons
    tab.setAttribute('tabindex', '-1');
    // Hide the tabs we don't want to show.
    tabPanels[index].setAttribute('hidden', '');
  }
});

// function to display the clicked tab, and hide the others
const switchTab = newTab => {
  // Get the href attribute from the clicked lins, and make that the active panel
  const activePanelId = newTab.getAttribute('href');
  const activePanel = tabsContainer.querySelector(activePanelId);

  // Set active button to false and add tab index -1
  tabButtons.forEach(button => {
    button.setAttribute('aria-selected', 'false');
    button.setAttribute('tabindex', '-1');
  });

  // go through all the panels and set them to hidden
  tabPanels.forEach(panel => {
    panel.setAttribute('hidden', true);
  });
  //except the active panel
  activePanel.removeAttribute('hidden');

  // Change the active list item
  newTab.setAttribute('aria-selected', 'true');
  // Set the tab index to 0
  newTab.setAttribute('tabindex', '0');
  // move the focus to the new tab
  newTab.focus();
};

// Function for using the arrow keys to move left in the links
const moveLeft = () => {
  // find the active element in the dom
  const currentTab = document.activeElement;

  // If we are on the first element in the list, we want to go back to the last in the list
  // (This tab / parent / the element before)
  if (!currentTab.parentElement.previousElementSibling) {
    switchTab(tabButtons[tabButtons.length - 1]);
  } else {
    // Use the switch function to move to the next link to the left, using DOM traversing
    // (This tab / parent / the element before / find the link)
    switchTab(
      currentTab.parentElement.previousElementSibling.querySelector('a')
    );
  }
};

// Function to move right in the links
const moveRight = () => {
  const currentTab = document.activeElement;

  // If we are on the last element in the list, we move to the first
  if (!currentTab.parentElement.nextElementSibling) {
    switchTab(tabButtons[0]);
  } else {
    // Use the switch function to move to the next right link
    switchTab(currentTab.parentElement.nextElementSibling.querySelector('a'));
  }
};

// Event listener to use mouse click to see the tab
tabsContainer.addEventListener('click', e => {
  // Check to see if a link is clicked, else do nothing
  const clickedTab = e.target.closest('a');
  if (!clickedTab) return;

  // If a link is clicked, don't refresh the page
  e.preventDefault();

  // Switch to the clicked tab
  switchTab(clickedTab);
});

// Event listener to move between the tabs with the arrow keys
tabsContainer.addEventListener('keydown', e => {
  // Use the key that have been pushed
  switch (e.key) {
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'ArrowRight':
      moveRight();
      break;
    case 'Home':
      e.preventDefault();
      switchTab(tabButtons[0]);
      break;
    case 'End':
      e.preventDefault();
      switchTab(tabButtons[tabButtons.length - 1]);
      break;
  }
});
