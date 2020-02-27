// data of bookmark
let itemsArray = []
var status
$("#bookmark-form").submit(function(e){
    if($("#sitename").val()!=="" && /^([A-Za-z])/.test($("#sitename").val())){
        if($("#url").val()!=="" && validURL($("#url").val() ) ){
            const data = JSON.parse(localStorage.getItem('items'))
            if(data!=null){
                itemsArray = data
            }
            itemsArray.push({sitename:$("#sitename").val(),url:$("#url").val()})
            localStorage.setItem('items', JSON.stringify(itemsArray))
            showstatus("Bookmark Added","green")
            return false;
        }else{
            showstatus("Please enter url","orange")
            return false;
        }
    }else{
        showstatus("Please enter site name","orange")
        return false;
    }
   });

//delete from local data
function deletefromlocal(id){
    console.log(id)
    data.splice(id,1)
    console.log(data)
    localStorage.setItem('items', JSON.stringify(data))
    showstatus("Bookmark Deleted","red")
}
// validate url
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

// show status tab
  function showstatus(str,color){
    document.querySelector("#status").innerHTML=`<p style="background-color: ${color};color:white;font-size:20px;padding:20px">${str}</p>`
    setInterval(()=>{
        location.reload()
    },1000)
  }

   // set to local storage
const data = JSON.parse(localStorage.getItem('items'))
data.forEach(doc=>{
           $("#bookmark-list").append(`<tr><td> ${doc.sitename} </td><td><a href=${doc.url} target="_blank">${doc.url}</a></td><td  style=" text-align: center;"><button onclick="deletefromlocal(${data.findIndex(x => x.sitename === doc.sitename)})" type="button" class="btn btn-danger"><i class="fa fa-times"></i></button></td></tr>`)
   })
