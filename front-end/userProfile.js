const onClickMenu = () => {
  document.querySelector('#menu').classList.toggle('change');

  document.querySelector('#nav').classList.toggle('change');

  document.querySelector('#menu-text').classList.toggle('change');

  let menu_text = document.querySelector('#menu-text')

  if (menu_text.classList.value) {
    menu_text.innerText = ''
  } else {
    menu_text.innerText = 'Menu'
  }

}
                                                                                  
document.addEventListener('DOMContentLoaded', () => {
  getAllPosts();
  pushAlbums()
  let submitPost = document.querySelector("#submitPost");
  submitPost.addEventListener('click', createPost);
  let switchAlbum = document.querySelector('#albums');
  // switchAlbum.addEventListener("change", getPictures)
  let addPic = document.querySelector("#picSubmit")
  addPic.addEventListener("submit", addPicture)
})

async function getAllPosts() {
  let postContainer = document.querySelector("#posts");
  let response = await axios.get("http://localhost:3000/posts");
  while (postContainer.firstChild) {
    postContainer.removeChild(postContainer.firstChild)
  }

  response.data.posts.forEach(async (elem) => {
    let commentsData = await axios.get(`http://localhost:3000/posts/${elem.id}`)
    console.log(commentsData, 'cData')

    let comArr = commentsData.data.post.map(elem => {
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

async function pushAlbums() {
  let albums = document.querySelector("#albums")

  let response = await axios.get("http://localhost:3000/album/2");

  response.data.albums.forEach(elem => {
    let album = document.createElement("option")
    album.innerText = elem.album_title
    album.value = elem.id
    albums.appendChild(album)
  })

}

async function createPost(e) {
  e.preventDefault();
  let inputPost = document.querySelector("#inputPost").value
  await axios.post('http://localhost:3000/posts', {
    post_id: 1,
    body: inputPost
  })
  getAllPosts()
}

async function getPictures(e) {
  let pictureContainer = document.querySelector("#pictures");
  while (pictureContainer.firstChild) {
    pictureContainer.removeChild(pictureContainer.firstChild)
  }
  let albumId = document.querySelector("#albums").options
  let id = albumId[albumId.selectedIndex].value
  let response = await axios.get(`http://localhost:3000/pictures/albums/${id}`)
  response.data.data.forEach(elem => {
    let imgContainer = document.createElement("div")
    let image = document.createElement("img")
    image.src = elem.body
    let deleteBtn = document.createElement("button")
    deleteBtn.setAttribute('class', "deleteBtn")
    deleteBtn.value = elem.id
    imgContainer.appendChild(image)
    imgContainer.appendChild(deleteBtn)
    image.setAttribute("class", "picture")
    pictureContainer.appendChild(imgContainer)
  })
  let deleteBtnList = document.querySelectorAll(".deleteBtn")
  console.log(deleteBtnList)
  deleteBtnList.forEach(elem => {
    console.log(elem, elem.value)
    elem.addEventListener("click", deletePicture(elem.value))
  })
}

async function addPicture(e) {
  e.preventDefault()
  let inputPic = document.querySelector("#addPic").value
  console.log(inputPic)
  let albumId = document.querySelector("#albums").options
  let id = albumId[albumId.selectedIndex].value
  await axios.post(`http://localhost:3000/pictures/${id}`, {
    url: inputPic
  })
  getPictures()
}

async function deletePicture(id) {

  await axios.delete(`http://localhost:3000/pictures/${id}`)
}

