let count = 0;
const value = document.querySelector('.number');
const btns = document.querySelectorAll('.btn')


btns.forEach(function (btn){
    btn.addEventListener('click',function(e){
        const styles = e.currentTarget.classList;
        if(styles.contains("decrease")){
            count --;
        }else if(styles.contains('increase')){
            count ++;
        }else{
            count = 0;
        }
        count > 0 ? value.style.color = 'green' : value.style.color = 'red';
        if (count == 0) value.style.color = 'black';
        value.textContent = count;
    })
});