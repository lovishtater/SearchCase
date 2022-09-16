import React, { useState } from 'react';
import './pagination.css';
const Pagination = ({ postsPerPage, setPostsPerPage,  totalPosts, currentPage , setCurrentPage }: {
    postsPerPage: number;
    setPostsPerPage: React.Dispatch<React.SetStateAction<number>>;
    totalPosts: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const pageNumbers = Math.ceil(totalPosts / postsPerPage);
    const [error, setError] = useState("");
    const setPage = (val : number) => {
        if (val > 0 && val <= pageNumbers) {
            setError("");
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setCurrentPage(val);
        } else {
            setError("Out of range");
        }
    }
    return (

        <div className='page-flex margin'>
        <div className='flex'>
            {`Page ${currentPage} of ${pageNumbers}`}
        </div>
        <div className='flex flex-col'>
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
            <div className='dropdown'>
                <select
                    className='page-select'
                    value={postsPerPage}
                    onChange={(e) => {
                        setCurrentPage(1);
                        setPostsPerPage(parseInt(e.target.value));
                    }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>
        </div>
    );
};

export default Pagination;
