import { http } from './http';
import { ui } from './ui';

// DOM Load ile Postları Alma
document.addEventListener('DOMContentLoaded', getPosts);

document.querySelector('.post-submit').addEventListener('click', submitPost);

document.querySelector('#posts').addEventListener('click', deletePost);

document.querySelector('#posts').addEventListener('click', enableEdit);

document.querySelector('.card-form').addEventListener('click', cancelEdit);


function getPosts(){
  
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));

}

function submitPost(){

  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    
    title,
    body

  }

  if(title === '' || body === ''){
    
    ui.showAlert('Lütfen alanları doldurun.', 'alert alert-danger');

  } else {

    // Id Kontrolüne Göre Ekleme yada Güncelleme Yaptırtma

    if(id === ''){

      // Post Oluşturma
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          
          ui.showAlert('Post Eklendi.', 'alert alert-success');
          
          ui.clearFields();
          
          getPosts()
        })
        .catch(err => console.log(err));

    } else {
     
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          
          ui.showAlert('Post Güncellendi.', 'alert alert-success');
        
          ui.changeFormState('add');
        
          getPosts()
          
        })
        .catch(err => console.log(err));
    }
  }
}

function deletePost(e){
  
  if(e.target.parentElement.classList.contains('delete')){
    
    const id = e.target.parentElement.dataset.id;

    if(confirm('Emin misin?')){

      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {

          ui.showAlert('Post Kaldırıldı.', 'alert alert-success');
          getPosts();

        })
        .catch(err => console.log(err));
    }
  }

  e.preventDefault();

}

function enableEdit(e) {

  if(e.target.parentElement.classList.contains('edit')){

    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      
      id,
      title,
      body

    }

    ui.fillForm(data);

    }
    
  e.preventDefault();

  }

  function cancelEdit(e){

    if(e.target.classList.contains('post-cancel')){
      ui.changeFormState('add');
    }

    e.preventDefault();
  }
