//navbar is active///

document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner tous les éléments navbar-item
    const navbarItems = document.querySelectorAll('.navbar-item');

    navbarItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Supprimer la classe is-active de tous les navbar-items
            navbarItems.forEach(navItem => navItem.classList.remove('is-active'));
            
            // Ajouter la classe is-active à l'élément cliqué
            event.currentTarget.classList.add('is-active');
        });
    });
});


//menu déroulant//

document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner tous les éléments .navbar-burger
    const burgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Si il y a des éléments navbar-burger
    if (burgers.length > 0) {
        burgers.forEach(el => {
            el.addEventListener('click', () => {
                // Récupérer la cible du burger (la div navbar-menu)
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Alterner les classes is-active pour le burger et le menu
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
});

