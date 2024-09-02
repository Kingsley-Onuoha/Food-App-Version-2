const CheckoutSuccess = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-14 gap-y-3">
      <h1 className="text-green-600 font-bold">Checkout Successful</h1>
      <div className="flex flex-col justify-center items-center mt-3">
        <h3>Your order might take some time to process </h3>
        <h3> check your order status at your profile after 10 mins.</h3>
        <h3> Incase you have any enqury, contact us on :</h3>
        <h2 className="font-semibold">support@myshoppingonline.com</h2>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
