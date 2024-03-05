import './BackTop.css';
// import './BacktTopEffect';
const BackTop = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    }
    return (
        <div>
            <button id="scroll-top" className="backtotop show-scroll" href="#page-top" onClick={handleClick}>
                <svg className='backtotopsvg' xmlns="http://www.w3.org/2000/svg" width="24" fill='white' height="24" viewBox="0 0 24 24">
                    <path d="M12 3l-9 9h6v9h6v-9h6z" />
                </svg>
            </button>
        </div>
    );
}

export default BackTop;