document.addEventListener('DOMContentLoaded', () => {
  getAllPosts();
})

async function getAllPosts() {
  let postContainer = document.querySelector("#posts");
  let response = await axios.get("http://localhost:3000/posts");

  response.data.posts.forEach(elem => {
    let post = document.createElement("div");
    let bar = document.createElement("div");
    let body = document.createElement("p");
    let like = document.createElement("span");
    let comments = document.createElement("div");
    let likebutton = document.createElement("button");
    body.innerText = elem.body
    post.appendChild(body)
    post.appendChild(bar)
    bar.appendChild(likebutton)
    bar.appendChild(like)
    bar.appendChild(comments)
    postContainer.appendChild(post)
  })

} 