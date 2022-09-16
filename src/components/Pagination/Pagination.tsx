import { useState } from 'react';
import './pagination.css';


const Pagination = ({ postsPerPage, totalPosts, currentPage , setCurrentPage }: {
    postsPerPage: number;
    totalPosts: number;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
} ) => {
    const pageNumbers = Math.ceil(totalPosts / postsPerPage);
    const [error, setError] = useState("");

    const setPage = (val : number) => {
        if (val > 0 && val <= pageNumbers) {
            setError("");
            // window.scrollTo({ top: 0, behavior: 'smooth' })
            setCurrentPage(val);
        } else {
            setError("Out of range");
        }
    }

    return (
        <div className='flex flex-col margin'>
            <div className='pagination'>
                <button 
                    className='page-button'
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}>
                   <i className="fas fa-chevron-left"></i>
                </button>
                    <input type="number" className='page-input'  
                    value={currentPage}
                    onChange={(e) => setPage(parseInt(e.target.value))} />
                <button 
                    className='page-button'
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === pageNumbers}>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
            {error && <p className='error-label'>{error}</p>}
        </div>
    );
};

export default Pagination;
