
$( document ).ready(function() {

    $('.alert-success').fadeIn().delay(10000).fadeOut();
    
    $('#myModal').on('shown.bs.modal', function () {
        $('#recipient_name').trigger('focus');
    });
    $('#form-customer-details').validate({ 
        rules: {
            name: {
                  required: true,
            },
            email: {
                  required: true,
            },
            phone: {
                required: true,
          },
        },
          errorElement: 'span',
          errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
          },
          highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
          },
          unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
          },
          submitHandler: function() {
            formSubmit();
          }
    });

    $("#tour_id").click(function(){
        var start_from = $('#exampleFormControlInput1').val();
        var start_to = $('#exampleFormControlInput2').val();
        var datepicker = $('#datepicker').val();

        if(start_from.length != 0 && start_to.length != 0 && datepicker.length != 0) {
            $('#starting_from').val(start_from);
            $('#starting_to').val(start_to);
            $('#date_of_plan').val(datepicker);
            $('#exampleModal').modal('toggle');
        }
        
    });

});
    function formSubmit()
    {
      var myform = document.getElementById("form-customer-details");
      var fd = new FormData(myform);
      $.ajax({
          url: WONDERLUST_FORM_SUBMIT_URL,
          type: 'POST',
          cache: false,
          processData: false,
          contentType: false,
          data: fd,
          dataType: 'JSON',
          beforeSend: function() {
            $('#exampleModal').modal('hide');
              $("#loader").show();
          },
          success: function (response) {
            $("#loader").hide();
            swal("Good job!", "Thank you for your request", "success");
          },
          error: function (error) {
              var err = JSON.parse(error.responseText);
          }
      });
    }