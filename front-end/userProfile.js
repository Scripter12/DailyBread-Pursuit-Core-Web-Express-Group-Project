document.addEventListener('DOMContentLoaded', () => {
  getAllPosts();
  pushAlbums()
  let submitPost = document.querySelector("#submitPost");
  submitPost.addEventListener('click', createPost);
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

async function pushAlbums() {
  let albums = document.querySelector("#albums")

  let response = await axios.get("http://localhost:3000/album/3");

  response.data.albums.forEach(elem => {
    let album = document.createElement("option")
    album.innerText = elem.album_title
    albums.appendChild(album)
  })

}

async function createPost(e) {
  e.preventDefault();
  let inputPost = document.querySelector("#inputPost").value
  axios.post('http://localhost:3000/posts', {
    post_id: 1,
    body: inputPost
  })
}

