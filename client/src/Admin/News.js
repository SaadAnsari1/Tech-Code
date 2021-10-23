import React from 'react'
import { NavLink } from 'react-router-dom';


function News({ image, title, subtitle, date, id, author, category}) {

  // const [likeData, setLikeData] = useState(Like);
  // console.log(likeData)
  // // const editNews = async () => {
  //     // let result = await fetch(`/news/${id}`, {
  //     //     method: "DELETE"
  //     // })
  //     // result = await result.json()
  //     // console.log()
  //     alert(id)
  // }

  const deleteNews = async () => {
    let result = await fetch(`/news/${id}`, {
      method: "DELETE"
    })
    result = await result.json()
    // console.log()
  }

  //   setLikeData(likeData + 1)
  // } const likeplus = () => {
 
  return (
    <>

      <div className="blog-post">
        <div className="blog-post__img">
          <img src={image} alt="" />
        </div>
        <div className="blog-post__info">
          <div className="blog-post__date">
            <span>Date: {date}</span>
            <span>Category: {category}</span>
            <span>author: {author}</span>
            {/* <span onClick={likeplus} >Like: {likeData}</span> */}
          </div>
          <h1 className="blog-post__title">{title}</h1>
          <p className="blog-post__text">{subtitle}</p>
          <NavLink className="blog-post__cta" to={"/Admin/Edit/" + id}>
            EDIT
          </NavLink>

          <button className="blog-post__delete" onClick={deleteNews}>DELETE!</button>

        </div>
      </div>
    </>
  )
}

export default News
{/* <div class="modal" tabindex="-1">
  <div class="modal-dialog"> {/* onClick={() => { updateNote() }} onClick={() => { deleteNote(_id) }} deleteNews
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */}
    // const deleteNews = (_id) => {
    //     axios.delete('/news' + _id)
    //         .then(() => {
    //             alert('Not in the Code');
    //             // loadList();
    //         })
    //         .catch(() => {
    //             alert('Error in the Code');
    //         });
    // };
    // const deleteNote = async (_id) => {
    //     // API Call
    //     const response = await fetch(`news${_id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     });
    //     // const json = result.data.reverse();

    // }