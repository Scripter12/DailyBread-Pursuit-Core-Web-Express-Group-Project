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

document.addEventListener('DOMContentLoaded', () => {
    getAllPosts();

})

async function getAllPosts() {
    let postContainer = document.querySelector("#photos");
    let response = await axios.get("http://localhost:3000/posts");
    while (postContainer.firstChild) {
      postContainer.removeChild(postContainer.firstChild)
    }

    response.data.posts.forEach(async (elem) => {
        let commentsData = await axios.get(`http://localhost:3000/comments/posts/${elem.id}`)
        console.log(commentsData, 'cData')
    
        let comArr = commentsData.data.data.map(elem => {
          let p = document.createElement("p")
          p.innerText = elem.body
          return p
        })
        console.log(comArr)
        let post = document.createElement("div");
        let line = document.createElement("div");
        let body = document.createElement("p");
        let like = document.createElement("span");
        let comments = document.createElement("div");
    
        comArr.forEach(elem => {
          comments.appendChild(elem)
        })
        let likebutton = document.createElement("button");
        post.setAttribute("class", "post")
        line.setAttribute("class", "line")
        comments.setAttribute("class", "comments")
        likebutton.setAttribute("class", "likeButton")
        body.innerText = elem.body
        post.appendChild(body)
        post.appendChild(line)
        line.appendChild(likebutton)
        line.appendChild(like)
        line.appendChild(comments)
        postContainer.appendChild(post)
      })
    
    }
    