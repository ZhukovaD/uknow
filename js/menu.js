var abonements;
var downList;

    window.onload = function () {
        abonements = document.querySelector('.abonement');
        downList = document.querySelector('.abonement-list');

       
        abonements.onmouseover = function () {
            if(document.body.clientWidth > 768) {
                downList.style.display = 'block';
                abonements.classList.add('abonement--opened');
                downList.classList.add('abonement-list--opened');
            }
        };

        abonements.onmouseout = function () {
            if(document.body.clientWidth > 768) {
                downList.style.display = 'none';
                abonements.classList.remove('abonement--opened');
                downList.classList.remove('abonement-list--opened');
            }
        }
    };





