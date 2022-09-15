import SomethingWentWrongImg from "../../assets/error.webp";

const SomethingWentWrong = () => {
  return (
    <div className="flex flex-col">
        <img src={SomethingWentWrongImg} alt="Something Went Wrong" height="300px" width="300px" />
        <h3>Sorry, something went wrong</h3>    
    </div>
  );
};

export default SomethingWentWrong;
