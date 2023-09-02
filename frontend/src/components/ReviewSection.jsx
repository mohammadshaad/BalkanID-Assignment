import React, { useEffect, useState } from 'react';

const ReviewSection = ({ bookId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [newRating, setNewRating] = useState(0); // Initialize with a default rating
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        // Fetch reviews for the book with the given bookId
        const token = localStorage.getItem('token');

        fetch(`http://localhost:8080/user/book/${bookId}/reviews`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                return response.json();
            })
            .then((data) => {
                setReviews(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
                setIsLoading(false);
            });
    }, [bookId]);


    const handleReviewSubmit = () => {
        // Check if a rating has been selected
        if (newRating === '0') {
            console.error('Please select a rating.');
            return; // Don't submit the review without a rating
        }

        // Convert newRating to an integer
        const ratingAsNumber = parseInt(newRating, 10);

        // Submit a new review along with the rating
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/user/book/${bookId}/reviews`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rating: ratingAsNumber, // Include the rating as an integer in the request body
                comment: newReview,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Add the new review to the reviews state
                setReviews([...reviews, data]);
                // Clear the new review input and rating
                setNewReview('');
                setNewRating('0'); // Set it back to a string for the "Select Rating" option
            })
            .catch((error) => {
                console.error('Error submitting review:', error);
            });
    };

    // Function to format a date as 'YYYY-MM-DD'
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <h2 className="text-3xl font-semibold mt-4 mb-2 text-primary">Reviews</h2>
            {isLoading ? (
                <p>Loading reviews...</p>
            ) : (
                Array.isArray(reviews) && reviews.length === 0 ? (
                    <p>No reviews available for this book.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="border p-4 rounded-lg mb-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className='flex items-center justify-center gap-2 '>
                                    <div className='bg-white rounded-full p-1 text-accent'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </div>

                                    <p className="text-secondary">{review.first_name}</p>
                                </div>
                                <p className="text-secondary ">{formatDate(review.created_at)}</p>
                            </div>
                            <p key={review.id} className="text-primary text-lg">{review.comment}</p>
                        </div>
                    ))
                )
            )}

            <div className="mt-20 mb-20">
                <select
                    value={newRating}
                    onChange={(e) => setNewRating(e.target.value)}
                    className="w-full mb-6 p-2 border rounded-md bg-transparent text-secondary focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent caret-[#F59E0B]"
                >
                    <option value={0}>Select Rating</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Write your review..."
                    className="w-full p-2 border rounded-md bg-transparent text-secondary focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent caret-[#F59E0B]"
                />
                <button
                    onClick={handleReviewSubmit}
                    className="mt-2 bg-accent text-accent px-4 py-2 rounded-full hover:bg-primary-dark"
                >
                    Submit Review
                </button>
            </div>
        </div>
    );
};

export default ReviewSection;
