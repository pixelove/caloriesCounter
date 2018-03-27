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
        console.log(lunchProduct, lunchWeight);
      }
    )
  }

  confirmLunchAddition();
  buttonAddProduct();
});
