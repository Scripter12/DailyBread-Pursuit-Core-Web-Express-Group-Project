const like_or_unlike = () =>{
    let post = document.querySelector('#post')

    if(post.style.backgroundColor !== 'dodgerblue'){
        post.style.backgroundColor = 'dodgerblue'
        post.style.color = 'white'
    }else{
        post.style.backgroundColor = 'transparent'
        post.style.color = 'black'
    }
}