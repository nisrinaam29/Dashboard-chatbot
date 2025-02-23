
const Refresh: React.FC = ({}) => {
    const handleRefresh = () => {
        window.location.reload()
      }
    return (

    <button className='cursor-pointer self-center items-center rounded-sm bg-transparent' 
    onClick={handleRefresh}><i className='size-6 tabler-refresh'></i></button>

    );
  };
  
  export default Refresh;
  