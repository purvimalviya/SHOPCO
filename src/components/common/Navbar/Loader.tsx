const Loader: React.FC = () => {
    console.log("loading")
    return (
      <div className="flex justify-center items-center bg-blue-500 h-40 w-40">
        <div className="loader">Loading...</div> {/* You can replace this with a spinner */}
      </div>
    );
  };
  
  export default Loader;
  