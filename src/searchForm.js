export default () => {
    const form = document.createElement('form');
    form.id = 'search-form';

    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.name = 'city';
    searchInput.id = 'city';
    searchInput.placeholder = 'Enter a city name';
    form.appendChild(searchInput);

    const searchButton = document.createElement('input');
    searchButton.type = 'button';
    searchButton.value = 'Go';
    searchButton.id = 'search';
    form.appendChild(searchButton);

    return form;
};