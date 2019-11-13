const onClickMenu= () => {
    document.querySelector('#menu').classList.toggle('change');
    
    document.querySelector('#nav').classList.toggle('change');

    document.querySelector('#menu-text').classList.toggle('change');
    
    let menu_text = document.querySelector('#menu-text')
    
    if(menu_text.classList.value){
        menu_text.innerText = ''
    }else{
        menu_text.innerText = 'Menu'
    }
    
}

