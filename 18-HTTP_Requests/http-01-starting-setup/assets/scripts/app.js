const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

function sendHttpRequest(method, url, data){
  const promise = new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    
    xhr.open(method, url); 
    
    xhr.responseType = 'json'; //Will parse automatically without below parse
    
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
        // const listOfPosts = JSON.parse(xhr.response) // Alternative if not using xhr built in json response type
      } else {
        reject(new Error('Something went wrong!'));
      }
            
    };

    xhr.onerror = function (){
      reject(new Error('Failed to send request!'));
      console.log(xhr.response);
      console.log(xhr.status);
    }

    xhr.send(JSON.stringify(data));

  });
  return promise;
}

function fetchPosts(){
  try {
    sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts').then(responseData =>{
      const listOfPosts = responseData;
      for (const post of listOfPosts){
        const postEl = document.importNode(postTemplate.content, true);//Editable = true
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        postEl.querySelector('li').id=post.id;
        listElement.append(postEl);
      }
    });
  } catch (error) {
    alert(error.message);
  }
  
};

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId
  };
  sendHttpRequest('POST','https://jsonplaceholder.typicode.com/posts', post);
}

fetchButton.addEventListener('click', ()=>{
  fetchPosts();
})
form.addEventListener('submit', event => {
  event.preventDefault(); // prevents browser from default submission
  const enteredTitle = event.currentTarget.querySelector('#title').value;
  const enteredContent = event.currentTarget.querySelector('#content').value;

  createPost(enteredTitle, enteredContent);
})
// fetchPosts();
// createPost('DUMMY', 'A dummy post!');

postList.addEventListener('click', event =>{
  if(event.target.tagName === "BUTTON"){
    const postId = event.target.closest('li').id;
    sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`)
  }
})