$(document).ready(function () {
  console.log('working');

  function buttonAddProduct() {
    $('.addProduct').click(
      function () {
        // console.log('click');
        $('#add-lunch-button').hide();
        $('.add-product-data').show();
      });
  };

  function confirmLunchAddition() {
    $('#add-lunch-confirm').click(
      function () {
        let lunchProduct = $('#add-lunch-product').val();
        let lunchWeight = $('#add-lunch-weight').val();

        $('#add-lunch-button').show();
        $('.add-product-data').hide();
        // console.log(lunchProduct, lunchWeight);

        // $('#add-lunch-product').val('');
        // $('#add-lunch-weight').val('');


        let payload = {
          Product: lunchProduct,
          Weight: lunchWeight,
          Meal: "lunch",
          Day: "2018-03-26"
        };

      fetch("/addFood",
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
          method: "POST",
          body: JSON.stringify(payload)
        })
      .then(function(res) {
        // return res;
        document.location = document.location;
      })
      // to do: złap errory
      }
    )
  }

  confirmLunchAddition();
  buttonAddProduct();
});
