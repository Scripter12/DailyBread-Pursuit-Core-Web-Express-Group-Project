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
    getUser()

    let post = document.querySelector('#post')
    post.addEventListener('dblclick', like_or_unlike())

})

document.addEventListener('submit', ()=>{
  submitPost()
})

async function getAllPosts() {
    let postContainer = document.querySelector(".post-feed");
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
        let body = document.createElement("p");

        post.setAttribute("class", "post")
        body.innerText = elem.body
        post.appendChild(body)
        //line.appendChild(comments)
        postContainer.appendChild(post)
      })
    
    }

    async function getUser(){
      let profilePic = document.querySelector('#profilePic')
      let name = document.querySelector('#name')
      let bio = document.querySelector('#bio')
      let response = await axios.get("http://localhost:3000/users/1");
      console.log(response.data.body.user);
      profilePic.src = response.data.body.user.propic
      bio.innerText = response.data.body.user.bio
      name.innerText = `${response.data.body.user.firstname} ${response.data.body.user.lastname} `
    }

    async function submitPost(){
      event.preventDefault()
      let num = 5
      let inputPost = document.querySelector("#post-input").value
      await axios.post('http://localhost:3000/posts', {
        post_id: num,
        body: inputPost
      })
        num ++
        getAllPosts() 
    }
    