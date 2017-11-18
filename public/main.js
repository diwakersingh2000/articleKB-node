$(document).ready(function(){
  $(".btn-danger").on('click',function(e){
    $target = $(e.target);
    var id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url: '/article/'+id,
      success: function(){
          alert("DELETE");
          window.location.href=('/');
      },
      error: function(err){
        console.log(err);
      }
    })
  });
});
